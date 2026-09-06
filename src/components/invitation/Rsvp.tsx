import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { OrnamentStage, DrawCircle, DrawPath } from "@/components/animation/Draw";

type Attendance = "joyfully" | "regretfully";

function ResponseSeal() {
  return (
    <OrnamentStage className="mx-auto h-16 w-16 ink-line" viewBox="0 0 80 80" immediate>
      <g stroke="currentColor" fill="none">
        <DrawCircle cx={40} cy={40} r={29} delay={0.05} duration={0.8} strokeWidth={0.8} />
        <DrawCircle cx={40} cy={40} r={22} delay={0.2} duration={0.6} strokeWidth={0.45} opacity={0.65} />
        <DrawPath d="M 31 40 L 37 46 L 50 33" delay={0.55} duration={0.65} strokeWidth={1.2} />
      </g>
    </OrnamentStage>
  );
}

export function Rsvp({ deadline }: { deadline: string }) {
  const [attendance, setAttendance] = useState<Attendance | null>(null);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {attendance ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-10 text-center"
          >
            <ResponseSeal />
            <p className="display-name mt-5 text-2xl">
              {attendance === "joyfully" ? "We’ll see you there" : "Thank you for letting us know"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {attendance === "joyfully"
                ? "Your presence will make our celebration even more special."
                : "You will be dearly missed, and held in our warmest thoughts."}
            </p>
            <button
              type="button"
              onClick={() => setAttendance(null)}
              className="mt-7 border-b border-accent pb-1 font-sans text-[0.6rem] tracking-[0.3em] text-primary uppercase"
            >
              Change response
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-7 text-center"
          >
            <p className="mx-auto max-w-[18rem] font-display text-lg leading-relaxed text-muted-foreground">
              We would be honoured to celebrate this beautiful day with you.
            </p>
            <div className="flex gap-3">
              {(
                [
                  ["joyfully", "Will Be There"],
                  ["regretfully", "Regretfully Decline"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAttendance(value)}
                  className="flex-1 border border-border px-3 py-2.5 font-display text-sm tracking-wide text-muted-foreground transition-colors hover:border-accent hover:bg-secondary/50"
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Kindly respond by {deadline}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
