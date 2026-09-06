import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { OrnamentStage, DrawCircle, DrawPath } from "@/components/animation/Draw";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return { days: Math.floor(ms / 86400000), hours: Math.floor(ms / 3600000) % 24, minutes: Math.floor(ms / 60000) % 60, seconds: Math.floor(ms / 1000) % 60 };
}

function CountFrame({ delay = 0 }: { delay?: number }) {
  return (
    <OrnamentStage className="absolute inset-0 h-full w-full gold-line" viewBox="0 0 100 100" immediate>
      <g stroke="currentColor" fill="none">
        <DrawCircle cx={50} cy={50} r={43} delay={delay} duration={1.0} strokeWidth={0.62} />
        <DrawCircle cx={50} cy={50} r={39} delay={delay + 0.2} duration={0.75} strokeWidth={0.28} opacity={0.48} />
        <DrawPath d="M 50 7 L 54 11 L 50 15 L 46 11 Z" delay={delay + 0.35} duration={0.4} strokeWidth={0.5} />
        <DrawPath d="M 50 85 L 54 89 L 50 93 L 46 89 Z" delay={delay + 0.45} duration={0.4} strokeWidth={0.5} />
      </g>
    </OrnamentStage>
  );
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => { setT(diff(target)); const id = window.setInterval(() => setT(diff(target)), 1000); return () => window.clearInterval(id); }, [target]);
  const units = [{ label: "Days", value: t.days }, { label: "Hours", value: t.hours }, { label: "Minutes", value: t.minutes }, { label: "Seconds", value: t.seconds }];
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-10 px-3 sm:gap-x-12 sm:gap-y-12">
      {units.map((u, i) => (
        <motion.div key={u.label} className="relative mx-auto flex aspect-square w-full max-w-[142px] items-center justify-center" initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: 0.12 * i, duration: 0.8 }}>
          <CountFrame delay={0.18 * i} />
          <div className="relative z-10 text-center">
            <div className="reference-count-number tabular-nums">{String(u.value).padStart(2, "0")}</div>
            <div className="reference-count-label">{u.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
