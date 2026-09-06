import { OrnamentStage, DrawCircle, DrawPath } from "@/components/animation/Draw";

export function VenueStage({ className = "", immediate = false }: { className?: string; immediate?: boolean }) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 210" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 34 168 H 326" delay={0.1} duration={0.8} strokeWidth={0.7} />
        <DrawPath d="M 58 160 V 116 H 302 V 160" delay={0.35} duration={0.9} strokeWidth={0.72} />
        <DrawPath d="M 76 116 V 103 H 284 V 116" delay={1.05} duration={0.7} strokeWidth={0.6} />
        <DrawPath d="M 112 103 V 82 Q 180 34 248 82 V 103" delay={1.45} duration={1.3} strokeWidth={0.82} />
        <DrawPath d="M 126 82 Q 180 48 234 82" delay={2.8} duration={0.9} strokeWidth={0.48} opacity={0.7} />
        <DrawPath d="M 102 160 V 124 M 126 160 V 124 M 234 160 V 124 M 258 160 V 124" delay={3.25} duration={0.8} strokeWidth={0.52} opacity={0.72} />
        <DrawPath d="M 70 136 H 290" delay={4.2} duration={0.7} strokeWidth={0.4} opacity={0.55} />
        <DrawCircle cx={180} cy={82} r={4.2} delay={4.75} duration={0.45} strokeWidth={0.5} />
        <DrawCircle cx={180} cy={82} r={1.4} delay={5.1} duration={0.35} mode="dot" fill="currentColor" stroke="none" />
        <DrawPath d="M 96 103 L 106 94 L 116 103 M 244 103 L 254 94 L 264 103" delay={5.45} duration={0.55} strokeWidth={0.42} opacity={0.65} />
        <DrawPath d="M 42 178 H 318" delay={6.1} duration={0.65} strokeWidth={0.35} opacity={0.42} />
      </g>
    </OrnamentStage>
  );
}
