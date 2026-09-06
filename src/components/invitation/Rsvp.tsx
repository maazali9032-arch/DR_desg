import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { OrnamentStage, DrawCircle, DrawPath } from "@/components/animation/Draw";

type Attendance = "joyfully" | "regretfully";

function ResponseSeal() {
  return <OrnamentStage className="mx-auto h-14 w-14 gold-line" viewBox="0 0 80 80" immediate><g stroke="currentColor" fill="none"><DrawCircle cx={40} cy={40} r={29} duration={0.8} strokeWidth={0.8} /><DrawCircle cx={40} cy={40} r={22} delay={0.2} duration={0.6} strokeWidth={0.4} opacity={0.6} /><DrawPath d="M 31 40 L 37 46 L 50 33" delay={0.45} duration={0.55} strokeWidth={1.1} /></g></OrnamentStage>;
}

export function Rsvp({ deadline }: { deadline: string }) {
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  return <div className="relative">
    <AnimatePresence mode="wait">
      {attendance ? <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center">
        <ResponseSeal />
        <p className="reference-rsvp-heading mt-5">{attendance === "joyfully" ? "We’ll see you there" : "Thank you for letting us know"}</p>
        <p className="mt-3 font-display text-base text-foreground/75">{attendance === "joyfully" ? "Your presence will make our celebration even more special." : "You will be dearly missed, and held in our warmest thoughts."}</p>
        <button type="button" onClick={() => setAttendance(null)} className="mt-7 border-b border-accent pb-1 font-sans text-[0.6rem] tracking-[0.3em] text-primary uppercase">Change response</button>
      </motion.div> : <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
        <p className="mx-auto max-w-[18rem] font-display text-[1.15rem] leading-relaxed text-foreground/80">We would be honoured to celebrate this beautiful day with you.</p>
        <div className="mt-8 flex gap-3">
          <button type="button" onClick={() => setAttendance("joyfully")} className="reference-rsvp-primary flex-1">Will Be There</button>
          <button type="button" onClick={() => setAttendance("regretfully")} className="reference-rsvp-secondary flex-1">Regretfully Decline</button>
        </div>
        <p className="mt-8 font-display text-lg text-foreground/80">Kindly respond by</p>
        <p className="reference-rsvp-date mt-1">{deadline}</p>
      </motion.div>}
    </AnimatePresence>
  </div>;
}
