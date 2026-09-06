import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { OpeningArchitecture } from "@/components/doorway/ReferenceArchitecture";
import { useLanguage } from "@/lib/language";

export function OpenGate({ groom, bride, date, city, onOpen }: { groom: string; bride: string; date?: string; city?: string; onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="reference-gold-screen fixed inset-0 z-50 flex items-center justify-center overflow-hidden px-4"
          exit={{ opacity: 0, filter: "blur(7px)" }}
          transition={{ duration: 1.0, ease: [0.5, 0, 0.2, 1] }}
        >
          <div className="relative h-[min(96svh,760px)] w-[min(92vw,430px)]">
            <OpeningArchitecture className="absolute inset-0 h-full w-full gold-line" />
            <div className="absolute inset-x-8 top-[48%] -translate-y-1/2 text-center sm:inset-x-10">
              <motion.p className="reference-eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.0, duration: 0.8 }}>{t.weddingOf}</motion.p>
              <motion.h1 className="reference-name mt-6" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ delay: 6.25, duration: 1.1 }}>{groom} <span>&amp;</span> {bride}</motion.h1>
              <motion.div className="mt-9" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 6.8, duration: 0.8 }}><p className="reference-date font-sans text-[0.72rem] tracking-[0.3em] uppercase">{date}</p>{city && <p className="reference-date mt-2 font-sans text-[0.72rem] tracking-[0.24em] uppercase">{city.split(",")[0]}</p>}</motion.div>
            </div>
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 7.2, duration: 0.8 }}
              onClick={() => { onOpen(); setOpen(true); }}
              className="reference-open-button absolute bottom-[10%] left-1/2 w-[72%] -translate-x-1/2"
            >
              <span>{t.open}</span><span aria-hidden="true" className="text-2xl leading-none">›</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
