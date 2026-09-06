import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DoorwayStage } from "@/components/doorway/DoorwayStage";
import { useLanguage } from "@/lib/language";

export function OpenGate({
  groom,
  bride,
  onOpen,
}: {
  groom: string;
  bride: string;
  onOpen: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          className="paper-grain fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background px-5"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 1.1, ease: [0.5, 0, 0.2, 1] }}
        >
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-secondary/45 to-transparent" />

          <div className="relative h-[min(68svh,570px)] w-[min(88vw,350px)]">
            <DoorwayStage className="absolute inset-0 h-full w-full ink-line" immediate />
            <div className="absolute inset-x-7 bottom-[13%] flex flex-col items-center text-center">
              <motion.p
                className="eyebrow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 7.8, duration: 0.9 }}
              >
                {t.weddingOf}
              </motion.p>

              <motion.h2
                className="display-name mt-3 max-w-[17rem] text-3xl leading-tight sm:text-4xl"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 8.15, duration: 1.2 }}
              >
                {groom} <span className="text-accent">&</span> {bride}
              </motion.h2>
            </div>
          </div>

          <motion.button
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 9.2, duration: 0.9 }}
            onClick={() => {
              onOpen();
              setOpen(true);
            }}
            className="relative mt-1 border border-accent px-8 py-3.5 font-sans text-[0.65rem] tracking-[0.45em] text-foreground uppercase transition-colors hover:bg-secondary"
          >
            {t.open}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
