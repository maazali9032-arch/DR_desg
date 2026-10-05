import { describe, expect, test } from "bun:test";
import server from "../src/server";

describe("Malformed public routes", () => {
  test("returns a branded not-found screen before the router decodes bad paths", async () => {
    for (const path of ["/%", "/%E0%A4%A", "/bad%2Fslug", "/bad%5Cslug"]) {
      const response = await server.fetch(
        new Request(`https://example.test${path}`),
        undefined,
        undefined,
      );
      expect(response.status).toBe(404);
      const html = await response.text();
      expect(html).toContain("Invitation not found");
      expect(html).toContain('href="/favicon.ico"');
      expect(html).not.toContain("Loading invitation");
    }
  });
});
