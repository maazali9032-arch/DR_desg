import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { OrnamentStage, DrawCircle, DrawPath } from "@/components/animation/Draw";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

function CountFrame({ delay = 0 }: { delay?: number }) {
  return (
    <OrnamentStage className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" immediate>
      <g stroke="currentColor" fill="none">
        <DrawCircle cx={50} cy={50} r={45} delay={delay} duration={1.1} strokeWidth={0.6} />
        <DrawCircle cx={50} cy={50} r={39} delay={delay + 0.25} duration={0.8} strokeWidth={0.35} opacity={0.55} />
        <DrawPath d="M 50 5 L 53 10 L 50 15 L 47 10 Z" delay={delay + 0.45} duration={0.45} strokeWidth={0.5} />
        <DrawPath d="M 50 85 L 53 90 L 50 95 L 47 90 Z" delay={delay + 0.55} duration={0.45} strokeWidth={0.5} />
      </g>
    </OrnamentStage>
  );
}

export function Countdown({ iso }: { iso: string }) {
  const target = new Date(iso).getTime();
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setT(diff(target));
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: t.days },
    { label: "Hours", value: t.hours },
    { label: "Minutes", value: t.minutes },
    { label: "Seconds", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-1.5 sm:gap-5">
      {units.map((u, i) => (
        <motion.div
          key={u.label}
          className="relative flex aspect-square items-center justify-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.15 * i, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <CountFrame delay={0.2 * i} />
          <div className="relative text-center">
            <div className="display-name text-[1.6rem] tabular-nums sm:text-4xl">
              {String(u.value).padStart(2, "0")}
            </div>
            <div className="eyebrow mt-0.5 text-[0.5rem] sm:text-[0.6rem]">{u.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
