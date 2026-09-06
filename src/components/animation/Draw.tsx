import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type StageProps = {
  children: ReactNode;
  className?: string;
  viewBox?: string;
  immediate?: boolean;
  delay?: number;
};

export function OrnamentStage({
  children,
  className = "",
  viewBox = "0 0 320 320",
  immediate = false,
  delay = 0,
}: StageProps) {
  const reduced = useReducedMotion();

  return (
    <motion.svg
      className={className}
      viewBox={viewBox}
      fill="none"
      initial={immediate || reduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: reduced ? 0 : 0.7 }}
      aria-hidden="true"
    >
      {children}
    </motion.svg>
  );
}

/** Backwards-compatible alias while the remaining invitation code is migrated. */
export const HennaStage = OrnamentStage;

type DrawPathProps = {
  d: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  opacity?: number;
  fill?: string;
  stroke?: string;
  linecap?: "round" | "square" | "butt";
  linejoin?: "round" | "miter" | "bevel";
  className?: string;
};

export function DrawPath({
  d,
  delay = 0,
  duration = 1.2,
  strokeWidth = 1,
  opacity = 1,
  fill = "none",
  stroke = "currentColor",
  linecap = "round",
  linejoin = "round",
  className,
}: DrawPathProps) {
  const reduced = useReducedMotion();

  return (
    <motion.path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap={linecap}
      strokeLinejoin={linejoin}
      vectorEffect="non-scaling-stroke"
      className={className}
      initial={reduced ? { pathLength: 1, opacity } : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity }}
      transition={{
        delay: reduced ? 0 : delay,
        duration: reduced ? 0 : duration,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  );
}

type DrawCircleProps = {
  cx: number;
  cy: number;
  r: number;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  opacity?: number;
  fill?: string;
  stroke?: string;
  mode?: "draw" | "dot";
  className?: string;
};

export function DrawCircle({
  cx,
  cy,
  r,
  delay = 0,
  duration = 1,
  strokeWidth = 1,
  opacity = 1,
  fill = "none",
  stroke = "currentColor",
  mode = "draw",
  className,
}: DrawCircleProps) {
  const reduced = useReducedMotion();

  if (mode === "dot") {
    return (
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
        className={className}
        initial={reduced ? { opacity } : { opacity: 0, scale: 0.25 }}
        animate={{ opacity, scale: 1 }}
        transition={{
          delay: reduced ? 0 : delay,
          duration: reduced ? 0 : Math.min(duration, 0.5),
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
    );
  }

  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r={r}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      vectorEffect="non-scaling-stroke"
      className={className}
      initial={reduced ? { pathLength: 1, opacity } : { pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity }}
      transition={{
        delay: reduced ? 0 : delay,
        duration: reduced ? 0 : duration,
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  );
}

export function DrawGroup({
  children,
  delay = 0,
  duration = 0.7,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.g
      className={className}
      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: reduced ? 0 : delay,
        duration: reduced ? 0 : duration,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    >
      {children}
    </motion.g>
  );
}
