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
        <DrawCircle cx={50} cy={50} r={43} delay={delay} duration={1.05} strokeWidth={0.62} />
        <DrawCircle cx={50} cy={50} r={38.5} delay={delay + 0.18} duration={0.72} strokeWidth={0.3} opacity={0.58} />
        <DrawPath d="M 50 6 L 54 10 L 50 14 L 46 10 Z" delay={delay + 0.35} duration={0.35} strokeWidth={0.46} />
        <DrawPath d="M 50 86 L 54 90 L 50 94 L 46 90 Z" delay={delay + 0.45} duration={0.35} strokeWidth={0.46} />
        <DrawPath d="M 12 50 H 18 M 82 50 H 88" delay={delay + 0.52} duration={0.25} strokeWidth={0.28} opacity={0.55} />
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
    <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-x-8 sm:gap-y-10">
      {units.map((u, i) => (
        <motion.div
          key={u.label}
          className="relative mx-auto aspect-square w-full max-w-[142px]"
          initial={{ opacity: 0, scale: 0.94, y: 14 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.12 * i, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <CountFrame delay={0.18 * i} />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div>
              <div className="reference-count-number text-[2.45rem] sm:text-[3rem]">
                {String(u.value).padStart(2, "0")}
              </div>
              <div className="reference-count-label">{u.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
