import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { wedding, type WeddingData } from "@/data/wedding";
import { createAmbience } from "@/lib/ambient-music";
import { Countdown } from "@/components/invitation/Countdown";
import { OpenGate } from "@/components/invitation/OpenGate";
import { MusicToggle } from "@/components/invitation/MusicToggle";
import { Rsvp } from "@/components/invitation/Rsvp";
import { LanguageSwitcher } from "@/components/invitation/LanguageSwitcher";
import { LanguageProvider, useLanguage, type Language } from "@/lib/language";
import { OrnamentStage, DrawPath, DrawCircle } from "@/components/animation/Draw";
import { IntroArchitecture, CountdownArchitecture, EventsArchitecture, VenueArchitecture, FinaleArchitecture, RsvpFrame } from "@/components/doorway/ReferenceArchitecture";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZAR Wedding Invitation" },
      { name: "description", content: "A cinematic architectural wedding invitation." },
      { property: "og:title", content: "ZAR Wedding Invitation" },
      { property: "og:description", content: "Open a private wedding invitation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RootLanding,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const WeddingContext = createContext<WeddingData>(wedding);
const useWedding = () => useContext(WeddingContext);

function RootLanding() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
      <div>
        <p className="eyebrow">ZAR</p>
        <h1 className="display-name mt-4 text-4xl">Your invitation awaits</h1>
        <p className="mt-3 text-sm text-muted-foreground">Open the invitation using its private link.</p>
      </div>
    </main>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-[430px] px-7 ${className}`}>
      {children}
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Reveal>
      <p className="eyebrow text-center">{children}</p>
    </Reveal>
  );
}

function ArchitecturalRule({ flip = false }: { flip?: boolean }) {
  return (
    <OrnamentStage className={`mx-auto h-14 w-full max-w-[280px] ink-line ${flip ? "rotate-180" : ""}`} viewBox="0 0 280 56">
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 20 28 H 108 Q 140 4 172 28 H 260" duration={1.3} strokeWidth={0.7} />
        <DrawPath d="M 54 28 L 68 17 L 82 28 L 68 39 Z" delay={0.5} duration={0.5} strokeWidth={0.55} />
        <DrawCircle cx={140} cy={28} r={4} delay={0.8} duration={0.4} strokeWidth={0.6} />
        <DrawPath d="M 106 28 L 118 16 L 130 28 L 118 40 Z M 150 28 L 162 16 L 174 28 L 162 40 Z" delay={0.7} duration={0.8} strokeWidth={0.45} opacity={0.65} />
      </g>
    </OrnamentStage>
  );
}

export function Invitation({ data = wedding }: { data?: WeddingData }) {
  const d = data;
  const reduced = useReducedMotion() ?? false;
  const [language, setLanguage] = useState<Language>("en");
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const ambience = useMemo(() => createAmbience(), []);
  const audio = useMemo(() => (d.music.url ? new Audio(d.music.url) : null), [d.music.url]);

  useEffect(() => () => {
    ambience.dispose();
    if (audio) {
      audio.pause();
      audio.src = "";
    }
  }, [ambience, audio]);

  const startMusic = async () => {
    if (audio) return audio.play();
    return ambience.start();
  };

  const stopMusic = () => {
    if (audio) audio.pause();
    else ambience.stop();
  };

  const onOpen = () => {
    setOpened(true);
    if (d.music.enabled) {
      void startMusic().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const toggleMusic = () => {
    if (playing) {
      stopMusic();
      setPlaying(false);
    } else {
      void startMusic().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  return (
    <LanguageProvider language={language} setLanguage={setLanguage}>
      <WeddingContext.Provider value={d}>
        <main className="paper-grain paper-vignette relative min-h-screen overflow-x-hidden bg-background">
          <OpenGate groom={d.couple.groom} bride={d.couple.bride} date={d.headlineDate} city={d.venue.city} onOpen={onOpen} />

          {opened && (
            <>
              <LanguageSwitcher />
              {d.music.enabled && <MusicToggle playing={playing} onToggle={toggleMusic} label={d.music.label} />}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <Hero />
                <CountdownSection />
                {d.events.length > 0 && <EventsSection />}
                <VenueSection />
                {d.gallery.length > 0 && <GallerySection reduced={reduced} />}
                <RsvpSection />
                {d.contacts.length > 0 && <ContactSection />}
                <Finale />
              </motion.div>
            </>
          )}
        </main>
      </WeddingContext.Provider>
    </LanguageProvider>
  );
}

function Hero() {
  const d = useWedding();
  const { t } = useLanguage();
  return (
    <section className="reference-section relative min-h-[100svh] overflow-hidden px-5 py-16">
      <div className="reference-panel mx-auto min-h-[calc(100svh-3rem)] max-w-[430px]">
        <IntroArchitecture className="pointer-events-none absolute inset-0 h-full w-full gold-line" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-3rem)] max-w-[320px] flex-col items-center px-5 pt-[23svh] text-center pb-20">
          <Reveal><p className="reference-eyebrow">Together with their families</p></Reveal>
          <Reveal delay={0.15}><h1 className="reference-name mt-8">{d.couple.groom} <span>&amp;</span> {d.couple.bride}</h1></Reveal>
          <Reveal delay={0.3}><p className="mt-12 max-w-[17rem] font-display text-[1.25rem] leading-[1.65] text-foreground/80">{d.message.body || "invite you to celebrate their special day"}</p></Reveal>
          <div className="mt-12 w-24"><ArchitecturalRule /></div>
        </div>
      </div>
    </section>
  );
}

function CountdownSection() {
  const d = useWedding();
  const { t } = useLanguage();
  return (
    <section className="reference-section relative overflow-hidden px-5 py-20">
      <div className="reference-panel mx-auto min-h-[800px] max-w-[430px]">
        <CountdownArchitecture className="pointer-events-none absolute inset-0 h-full w-full gold-line" />
        <div className="relative z-10 mx-auto max-w-[330px] px-4 pt-36 text-center">
          <Eyebrow>{t.counting}</Eyebrow>
          <Reveal delay={0.1}><p className="reference-script mt-5">{t.untilNikah}</p></Reveal>
          <div className="mt-14"><Countdown iso={d.weddingISO} /></div>
          <div className="mt-14 w-24 mx-auto"><ArchitecturalRule /></div>
        </div>
      </div>
    </section>
  );
}

function EventIcon({ index }: { index: number }) {
  const delay = index * 0.08;
  if (index % 3 === 0) {
    return (
      <OrnamentStage className="h-[76px] w-[76px] gold-line" viewBox="0 0 76 76" immediate>
        <g stroke="currentColor" fill="none">
          <DrawPath d="M 38 64 C 24 53 17 38 23 25 C 27 16 36 13 44 19 C 53 26 51 43 38 64 Z" delay={delay} duration={0.65} strokeWidth={1.05} />
          <DrawPath d="M 38 64 C 37 47 39 31 46 18 M 38 50 L 27 39 M 39 42 L 51 32 M 38 56 L 30 49" delay={delay + 0.25} duration={0.6} strokeWidth={0.7} />
          <DrawPath d="M 26 27 C 30 23 34 22 38 24 M 42 24 C 45 25 48 28 49 31" delay={delay + 0.5} duration={0.4} strokeWidth={0.42} opacity={0.75} />
        </g>
      </OrnamentStage>
    );
  }
  if (index % 3 === 1) {
    return (
      <OrnamentStage className="h-[76px] w-[76px] gold-line" viewBox="0 0 76 76" immediate>
        <g stroke="currentColor" fill="none">
          <DrawPath d="M 18 42 H 58 M 22 35 H 54 M 25 49 H 51" delay={delay} duration={0.45} strokeWidth={0.85} />
          <DrawPath d="M 27 35 Q 38 22 49 35 V 39 H 27 Z" delay={delay + 0.18} duration={0.5} strokeWidth={0.72} />
          <DrawPath d="M 31 39 V 48 M 38 39 V 48 M 45 39 V 48" delay={delay + 0.35} duration={0.4} strokeWidth={0.38} />
          <DrawCircle cx={38} cy={25} r={2.4} mode="dot" fill="currentColor" stroke="none" delay={delay + 0.55} />
          <DrawPath d="M 31 49 Q 38 58 45 49" delay={delay + 0.6} duration={0.4} strokeWidth={0.46} />
        </g>
      </OrnamentStage>
    );
  }
  return (
    <OrnamentStage className="h-[76px] w-[76px] gold-line" viewBox="0 0 76 76" immediate>
      <g stroke="currentColor" fill="none">
        <DrawCircle cx={30} cy={43} r={13} delay={delay} duration={0.65} strokeWidth={1.0} />
        <DrawCircle cx={45} cy={31} r={13} delay={delay + 0.16} duration={0.65} strokeWidth={1.0} />
        <DrawCircle cx={30} cy={43} r={3} delay={delay + 0.42} duration={0.35} strokeWidth={0.55} />
        <DrawCircle cx={45} cy={31} r={3} delay={delay + 0.5} duration={0.35} strokeWidth={0.55} />
        <DrawPath d="M 39 20 Q 45 13 51 20" delay={delay + 0.58} duration={0.4} strokeWidth={0.5} />
      </g>
    </OrnamentStage>
  );
}
function EventsSection() {
  const d = useWedding();
  const { t } = useLanguage();
  return (
    <section className="reference-section relative overflow-hidden px-5 py-20">
      <div className="reference-panel mx-auto min-h-[760px] max-w-[430px]">
        <EventsArchitecture className="pointer-events-none absolute inset-0 h-full w-full gold-line" />
        <div className="relative z-10 mx-auto max-w-[326px] px-5 pt-32 pb-28 text-center">
          <Eyebrow>{t.celebrations}</Eyebrow>
          <Reveal delay={0.1}><h2 className="reference-script mt-5">{t.events}</h2></Reveal>
          <ul className="mt-16 space-y-12">
            {d.events.map((ev, i) => (
              <li key={ev.id}>
                <Reveal delay={0.08 * i}>
                  <div className="flex items-center gap-5 text-left">
                    <EventIcon index={i} />
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[1.75rem] leading-tight text-primary">{ev.name}</p>
                      <p className="mt-2 font-sans text-[0.72rem] tracking-[0.28em] text-foreground uppercase">{ev.date}</p>
                      {ev.time && <p className="mt-1 font-display text-sm text-foreground/75">{ev.time}</p>}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mx-auto mt-12 w-24"><ArchitecturalRule /></div>
        </div>
      </div>
    </section>
  );
}

function VenueSection() {
  const d = useWedding();
  const { t } = useLanguage();
  return (
    <section className="reference-section relative overflow-hidden px-5 py-20">
      <div className="reference-panel mx-auto min-h-[760px] max-w-[430px]">
        <VenueArchitecture className="pointer-events-none absolute inset-0 h-full w-full gold-line" />
        <div className="relative z-10 mx-auto max-w-[315px] px-5 pt-44 pb-28 text-center">
          <Eyebrow>{t.venue}</Eyebrow>
          <Reveal delay={0.12}><h2 className="reference-name mt-8 text-[2.4rem]">{d.venue.name}</h2></Reveal>
          <Reveal delay={0.25}><p className="mt-8 font-display text-[1.2rem] leading-[1.7] text-foreground/80">{d.venue.address}</p><p className="mt-1 font-sans text-[0.68rem] tracking-[0.26em] text-foreground uppercase">{d.venue.city}</p></Reveal>
          {d.venue.mapsUrl && <Reveal delay={0.35}><a href={d.venue.mapsUrl} target="_blank" rel="noreferrer noopener" className="reference-map-button mt-10 inline-flex items-center gap-3">⌖ <span>{t.directions}</span></a></Reveal>}
        </div>
      </div>
    </section>
  );
}

function GalleryImage({ image, index, reduced }: { image: WeddingData["gallery"][number]; index: number; reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [26, -26]);
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1.06, 1.14]);
  const odd = index % 2 === 1;

  return (
    <div ref={ref} className={`relative ${image.span === "tall" ? "w-[78%]" : "w-[88%]"} ${odd ? "ml-auto" : "mr-auto"}`}>
      <motion.div style={{ y }} className="relative overflow-hidden border border-border">
        <motion.img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" style={{ scale }} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-primary/5 mix-blend-multiply" />
      </motion.div>
    </div>
  );
}

function GallerySection({ reduced }: { reduced: boolean }) {
  const d = useWedding();
  const { t } = useLanguage();
  return (
    <Section className="relative py-20">
      <div className="text-center"><Eyebrow>{t.moments}</Eyebrow><Reveal delay={0.1}><h2 className="display-name mt-4 text-4xl">{t.gallery}</h2></Reveal></div>
      <div className="mt-16 space-y-20">{d.gallery.map((img, i) => <GalleryImage key={img.src} image={img} index={i} reduced={reduced} />)}</div>
      <ArchitecturalRule />
    </Section>
  );
}

function RsvpSection() {
  const d = useWedding();
  const { t } = useLanguage();
  return (
    <section className="reference-section relative overflow-hidden px-5 py-20">
      <div className="relative mx-auto min-h-[680px] max-w-[430px]">
        <RsvpFrame className="pointer-events-none absolute inset-0 h-full w-full gold-line" />
        <div className="relative z-10 mx-auto max-w-[315px] px-5 pt-28 pb-24 text-center">
          <Eyebrow>{t.respond}</Eyebrow>
          <Reveal delay={0.1}><h2 className="reference-rsvp-title mt-7">{t.rsvp}</h2></Reveal>
          <Reveal delay={0.2}><p className="reference-script mt-5">A beautiful line</p></Reveal>
          <div className="mt-6"><Rsvp deadline={d.rsvpDeadline} /></div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const d = useWedding();
  return (
    <Section className="relative py-16">
      <div className="text-center"><Eyebrow>For any queries</Eyebrow><Reveal delay={0.1}><h2 className="display-name mt-4 text-4xl">Contact</h2></Reveal></div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {d.contacts.map((contact, index) => {
          const phoneDigits = contact.phone.replace(/\D/g, "");
          const whatsappUrl = contact.whatsappUrl || (phoneDigits ? `https://wa.me/${phoneDigits}` : "");
          return (
            <Reveal key={`${contact.phone}-${index}`} className="border border-border px-5 py-6 text-center" delay={0.1 * index}>
              {contact.name && <p className="display-name text-2xl">{contact.name}</p>}
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a href={`tel:${contact.phone}`} className="border border-accent px-5 py-3 font-sans text-[0.6rem] tracking-[0.28em] text-primary uppercase">Call</a>
                {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" className="border border-accent px-5 py-3 font-sans text-[0.6rem] tracking-[0.28em] text-primary uppercase">WhatsApp</a>}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Finale() {
  const d = useWedding();
  return (
    <section className="reference-section relative overflow-hidden px-5 pt-20 pb-28">
      <div className="relative mx-auto min-h-[760px] max-w-[430px]">
        <FinaleArchitecture className="pointer-events-none absolute inset-0 h-full w-full gold-line" />
        <div className="relative z-10 mx-auto max-w-[315px] px-5 pt-56 text-center">
          <Reveal><p className="reference-name text-[2.2rem]">{d.couple.groom} <span>&amp;</span> {d.couple.bride}</p></Reveal>
          <div className="mx-auto mt-10 w-24"><ArchitecturalRule /></div>
          <Reveal delay={0.2}><p className="mt-10 font-sans text-[0.8rem] tracking-[0.34em] text-foreground uppercase">{d.finale.title}</p></Reveal>
          <Reveal delay={0.35}><p className="reference-script mt-12 text-[1.7rem] leading-[1.45]">{d.finale.note}</p></Reveal>
        </div>
      </div>
    </section>
  );
}
