import { describe, expect, test } from "bun:test";
import {
  getSlugFromPathname,
  mapInvitation,
  mapShopFallback,
  normalizePublicInvitation,
  publicUrl,
} from "../src/lib/invitation-content";

const live = (content: Record<string, unknown> = {}) =>
  normalizePublicInvitation({ state: "live", content });

describe("Public invitation contract", () => {
  test("selects only the safely decoded final pathname segment", () => {
    expect(getSlugFromPathname("/arian-elara-10/")).toBe("arian-elara-10");
    expect(getSlugFromPathname("/prefix/Arian%20Elara")).toBe("Arian Elara");
    for (const path of ["/", "/%", "/bad%2Fslug", "/bad%5Cslug", "/%20"]) {
      expect(getSlugFromPathname(path)).toBeNull();
    }
  });

  test("normalizes direct and enveloped responses once", () => {
    expect(
      normalizePublicInvitation({ data: { state: "live", content: { groom_name: "Arian" } } }),
    ).toEqual(live({ groom_name: "Arian" }));
    for (const value of [
      null,
      [],
      "live",
      {},
      { state: "draft" },
      { data: null, state: "live" },
      { data: { data: { state: "live" } } },
    ]) {
      expect(() => normalizePublicInvitation(value)).toThrow();
    }
  });

  test("fallback and not-found discard all wedding fields", () => {
    const content = { groom_name: "Must never appear", events: [{ name: "Private event" }] };
    const fallback = normalizePublicInvitation({
      state: "fallback",
      content,
      invitation: { public_url: "https://example.test/private" },
      shop: { name: "Approved shop" },
    });
    expect(fallback).toEqual({ state: "fallback", shop: { name: "Approved shop" } });
    expect(() => mapInvitation(fallback)).toThrow();
    expect(
      normalizePublicInvitation({ state: "not_found", content, shop: { name: "Other shop" } }),
    ).toEqual({ state: "not_found" });
  });

  test("empty and malformed optional values never produce sample content", () => {
    const data = mapInvitation(
      live({
        groom_name: 42,
        bride_name: null,
        gallery: {},
        events: "bad",
        contacts: [null, {}],
        invocation: {},
      }),
    );
    expect(data.couple.groom).toBe("");
    expect(data.couple.bride).toBe("");
    expect(data.gallery).toEqual([]);
    expect(data.events).toEqual([]);
    expect(data.contacts).toEqual([]);
    expect(data.weddingISO).toBe("");
    expect(data.publicUrl).toBe("");
    expect(data.brandName).toBe("");
  });

  test("contacts use at most the first two objects, require phones, and reject unsafe links", () => {
    const data = mapInvitation(
      live({
        contacts: [
          { name: "No phone" },
          { name: "Host", phone: "+91 90000 00000", whatsapp_url: "javascript:alert(1)" },
          { phone: "Not selected" },
        ],
      }),
    );
    expect(data.contacts).toEqual([{ name: "Host", phone: "+91 90000 00000", whatsappUrl: "" }]);
    expect(
      mapInvitation(live({ contacts: [{ phone: "123", whatsapp_url: "https://wa.me/123" }] }))
        .contacts[0]?.whatsappUrl,
    ).toBe("https://wa.me/123");
  });

  test("unsafe URLs and malformed media are ignored", () => {
    const data = mapInvitation(
      live({
        groom_photo_url: "data:image/png;base64,bad",
        bride_photo_url: "https://example.test/bride.png",
        venue_image_url: "javascript:bad",
        maps_url: "javascript:bad",
        gallery: [
          null,
          {},
          "javascript:bad",
          { src: "https://example.test/bride.png" },
          { image_url: "https://example.test/gallery.png", width: -1, height: "bad" },
        ],
        events: [null, {}, { title: "Reception", mapsUrl: "javascript:bad" }],
      }),
    );
    expect(data.gallery).toHaveLength(2);
    expect(data.gallery[0]?.alt).toBe("Bride");
    expect(data.gallery[1]?.width).toBe(800);
    expect(data.venue.mapsUrl).toBe("");
    expect(data.events[0]?.mapsUrl).toBe("");
    expect(publicUrl("javascript:alert(1)")).toBe("");
  });

  test("countdown combines the supplied date and time without guessing a start time", () => {
    expect(
      mapInvitation(live({ wedding_date: "2027-09-20", start_time: "11:30:00", end_time: "13:00" }))
        .weddingISO,
    ).toBe("2027-09-20T11:30:00");
    expect(mapInvitation(live({ wedding_date: "2027-09-20" })).weddingISO).toBe("");
    expect(mapInvitation(live({ wedding_date: "bad", start_time: "11:30" })).weddingISO).toBe("");
    expect(mapInvitation(live({ wedding_date: "2027-09-20T11:30:00+05:30" })).weddingISO).toBe(
      "2027-09-20T11:30:00+05:30",
    );
  });

  test("canonical URL is exactly RPC-provided; QR is disabled", () => {
    const result = normalizePublicInvitation({
      state: "live",
      invitation: { public_url: "https://example.test/exact?x=1&y=2" },
      content: { qr_text: "Not a URL" },
    });
    const data = mapInvitation(result);
    expect(data.publicUrl).toBe("https://example.test/exact?x=1&y=2");
    expect(data.finale.qr).toBe(false);
  });

  test("live brand exposes only the approved shop name", () => {
    const result = normalizePublicInvitation({
      state: "live",
      content: {},
      shop: { name: "WEDORA", phone: "Private shop phone", whatsapp: "Private shop contact" },
    });
    expect(result.shop).toEqual({ name: "WEDORA" });
    expect(mapInvitation(result).brandName).toBe("WEDORA");
    expect(mapInvitation(result).contacts).toEqual([]);
  });

  test("music requires true enablement and a valid remote URL", () => {
    expect(
      mapInvitation(live({ music_enabled: "true", music_url: "https://example.test/music.mp3" }))
        .music.enabled,
    ).toBe(false);
    expect(
      mapInvitation(live({ music_enabled: true, music_url: "javascript:bad" })).music.url,
    ).toBe("");
  });

  test("fallback ignores unknown and malformed shop fields", () => {
    expect(
      mapShopFallback({
        name: "Shop",
        phone: {},
        business_contact: "Support",
        secret: "Never render",
      }),
    ).toEqual({
      name: "Shop",
      phone: "",
      whatsapp: "",
      address: "",
      city: "",
      businessContact: "Support",
    });
  });
});
