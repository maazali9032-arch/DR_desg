import { OrnamentStage, DrawCircle, DrawGroup, DrawPath } from "@/components/animation/Draw";

type ArtProps = { className?: string; immediate?: boolean };

const leaf = (x: number, y: number, s: number, flip = false) => {
  const dir = flip ? -1 : 1;
  return `M ${x} ${y} C ${x + dir * 10 * s} ${y - 14 * s} ${x + dir * 19 * s} ${y - 14 * s} ${x + dir * 22 * s} ${y - 1 * s} C ${x + dir * 18 * s} ${y + 11 * s} ${x + dir * 7 * s} ${y + 13 * s} ${x} ${y}`;
};

function Lantern({ x, y, scale = 1, delay = 0, glow = false }: { x: number; y: number; scale?: number; delay?: number; glow?: boolean }) {
  const w = 18 * scale;
  const h = 34 * scale;
  return (
    <DrawGroup delay={delay}>
      <DrawPath d={`M ${x} ${y - h * 0.55} V ${y - h * 0.72} M ${x} ${y - h * 0.55} L ${x - 4 * scale} ${y - h * 0.42} M ${x} ${y - h * 0.55} L ${x + 4 * scale} ${y - h * 0.42}`} duration={0.35} strokeWidth={0.45} />
      <DrawPath d={`M ${x} ${y - h * 0.72} V ${y - h * 1.45}`} duration={0.45} strokeWidth={0.45} />
      <DrawPath d={`M ${x - w * 0.34} ${y - h * 0.38} L ${x - w * 0.22} ${y - h * 0.52} H ${x + w * 0.22} L ${x + w * 0.34} ${y - h * 0.38} V ${y + h * 0.45} L ${x} ${y + h * 0.7} L ${x - w * 0.34} ${y + h * 0.45} Z`} duration={0.75} strokeWidth={0.65} />
      <DrawPath d={`M ${x - w * 0.27} ${y - h * 0.18} H ${x + w * 0.27} M ${x - w * 0.29} ${y + h * 0.22} H ${x + w * 0.29}`} duration={0.45} strokeWidth={0.4} opacity={0.75} />
      <DrawPath d={`M ${x - w * 0.27} ${y - h * 0.3} L ${x} ${y - h * 0.02} L ${x + w * 0.27} ${y - h * 0.3} M ${x - w * 0.27} ${y + h * 0.28} L ${x} ${y} L ${x + w * 0.27} ${y + h * 0.28}`} duration={0.5} strokeWidth={0.35} opacity={0.72} />
      <DrawCircle cx={x} cy={y + h * 0.03} r={2.1 * scale} mode="dot" delay={0.7} fill="currentColor" stroke="none" />
      {glow && <DrawCircle cx={x} cy={y + h * 0.03} r={7.5 * scale} delay={0.78} duration={0.6} strokeWidth={0.25} opacity={0.18} />}
    </DrawGroup>
  );
}

function CornerFlourish({ x, y, flipX = false, flipY = false, delay = 0 }: { x: number; y: number; flipX?: boolean; flipY?: boolean; delay?: number }) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <DrawGroup delay={delay} className="origin-center">
      <DrawPath d={`M ${x} ${y} C ${x + sx * 18} ${y + sy * 2} ${x + sx * 23} ${y + sy * 18} ${x + sx * 30} ${y + sy * 25} C ${x + sx * 38} ${y + sy * 31} ${x + sx * 45} ${y + sy * 25} ${x + sx * 48} ${y + sy * 14}`} duration={0.9} strokeWidth={0.62} />
      <DrawPath d={`M ${x + sx * 7} ${y + sy * 6} C ${x + sx * 14} ${y + sy * 9} ${x + sx * 16} ${y + sy * 16} ${x + sx * 18} ${y + sy * 23}`} duration={0.5} strokeWidth={0.42} />
      {[0, 1, 2].map((i) => <DrawPath key={i} d={leaf(x + sx * (18 + i * 10), y + sy * (5 + i * 7), 0.58, flipX)} duration={0.45} delay={0.35 + i * 0.1} strokeWidth={0.48} />)}
      <DrawCircle cx={x + sx * 9} cy={y + sy * 3} r={1.8} mode="dot" delay={0.75} fill="currentColor" stroke="none" />
    </DrawGroup>
  );
}

export function OpeningArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 620" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 9 9 H 351 V 611 H 9 Z" delay={0.1} duration={1.2} strokeWidth={1.1} />
        <DrawPath d="M 14 14 H 346 V 606 H 14 Z" delay={0.45} duration={1.1} strokeWidth={0.32} opacity={0.72} />
        <CornerFlourish x={26} y={32} delay={1.1} />
        <CornerFlourish x={334} y={32} flipX delay={1.22} />
        <CornerFlourish x={26} y={588} flipY delay={1.35} />
        <CornerFlourish x={334} y={588} flipX flipY delay={1.48} />
        {[62, 94, 132, 228, 266, 298].map((x, i) => (
          <DrawPath key={`chain-${x}`} d={`M ${x} 14 V ${i === 2 || i === 3 ? 106 : 78}`} delay={1.7 + i * 0.08} duration={0.55} strokeWidth={0.4} />
        ))}
        <Lantern x={62} y={94} scale={0.62} delay={2.3} />
        <Lantern x={94} y={138} scale={0.95} delay={2.45} glow />
        <Lantern x={132} y={90} scale={0.58} delay={2.55} />
        <Lantern x={228} y={90} scale={0.58} delay={2.65} />
        <Lantern x={266} y={138} scale={0.95} delay={2.75} glow />
        <Lantern x={298} y={94} scale={0.62} delay={2.9} />
        <DrawPath d="M 180 14 V 84" delay={3.15} duration={0.6} strokeWidth={0.48} />
        <DrawPath d="M 180 84 C 164 93 158 107 168 116 C 177 124 185 111 180 103 C 175 111 183 124 192 116 C 202 107 196 93 180 84 Z" delay={3.7} duration={1.1} strokeWidth={0.6} />
        <DrawPath d="M 180 124 V 156 M 180 156 C 164 166 162 181 173 188 C 180 193 187 193 194 188 C 198 181 196 166 180 156 Z" delay={4.45} duration={0.9} strokeWidth={0.62} />
        <DrawPath d="M 180 193 V 230 M 180 230 C 170 237 170 249 180 255 C 190 249 190 237 180 230 Z" delay={5.1} duration={0.75} strokeWidth={0.52} />
        <DrawCircle cx={180} cy={265} r={2} mode="dot" delay={5.75} fill="currentColor" stroke="none" />
        <DrawPath d="M 35 572 C 53 548 65 548 80 563 C 92 575 104 577 116 568" delay={6.0} duration={0.9} strokeWidth={0.55} />
        <DrawPath d="M 325 572 C 307 548 295 548 280 563 C 268 575 256 577 244 568" delay={6.1} duration={0.9} strokeWidth={0.55} />
        {[0,1,2,3].map(i => <DrawPath key={`bottom-l-${i}`} d={leaf(34 + i*18, 574 - i*4, 0.8)} delay={6.3 + i*0.1} duration={0.45} strokeWidth={0.48} />)}
        {[0,1,2,3].map(i => <DrawPath key={`bottom-r-${i}`} d={leaf(326 - i*18, 574 - i*4, 0.8, true)} delay={6.35 + i*0.1} duration={0.45} strokeWidth={0.48} />)}
      </g>
    </OrnamentStage>
  );
}

export function IntroArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 620" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 12 608 V 174 Q 12 70 180 24 Q 348 70 348 174 V 608" delay={0.1} duration={1.5} strokeWidth={0.9} />
        <DrawPath d="M 23 608 V 178 Q 23 84 180 39 Q 337 84 337 178 V 608" delay={0.5} duration={1.4} strokeWidth={0.38} opacity={0.72} />
        <DrawPath d="M 34 608 V 188 H 68 V 608 M 292 608 V 188 H 326 V 608" delay={1.05} duration={1.0} strokeWidth={0.68} />
        <DrawPath d="M 28 188 H 74 L 68 173 H 34 Z M 286 173 H 326 L 332 188 H 286 Z" delay={1.55} duration={0.7} strokeWidth={0.62} />
        <DrawPath d="M 25 598 H 75 M 285 598 H 335" delay={1.9} duration={0.55} strokeWidth={0.55} />
        <DrawPath d="M 30 88 C 53 70 70 60 92 52 M 330 88 C 307 70 290 60 268 52" delay={2.2} duration={0.75} strokeWidth={0.45} />
        <Lantern x={70} y={110} scale={0.52} delay={2.55} />
        <Lantern x={180} y={86} scale={0.62} delay={2.7} glow />
        <Lantern x={290} y={110} scale={0.52} delay={2.85} />
        <DrawPath d="M 180 25 V 49" delay={3.15} duration={0.35} strokeWidth={0.42} />
        <DrawPath d="M 80 546 Q 180 470 280 546" delay={3.3} duration={0.9} strokeWidth={0.46} opacity={0.7} />
        <DrawPath d="M 56 606 C 72 584 82 565 90 538 M 304 606 C 288 584 278 565 270 538" delay={3.8} duration={0.7} strokeWidth={0.5} />
        {/* stylised Hyderabad / palace skyline */}
        <DrawPath d="M 76 606 V 568 H 92 V 552 H 104 V 574 H 118 V 536 H 132 V 552 H 144 V 522 H 158 V 550 H 168 V 508 H 180 V 550 H 192 V 522 H 206 V 552 H 218 V 536 H 232 V 574 H 246 V 552 H 258 V 568 H 284 V 606" delay={4.15} duration={1.6} strokeWidth={0.7} />
        <DrawPath d="M 150 606 V 558 Q 150 540 168 532 Q 180 524 192 532 Q 210 540 210 558 V 606" delay={5.55} duration={0.9} strokeWidth={0.62} />
        <DrawPath d="M 164 606 V 566 Q 180 548 196 566 V 606" delay={6.1} duration={0.7} strokeWidth={0.45} />
        <DrawPath d="M 170 532 V 508 M 190 532 V 508 M 164 508 H 196" delay={6.55} duration={0.55} strokeWidth={0.48} />
        {[0,1,2,3,4,5].map(i => <DrawPath key={i} d={`M ${54+i*42} ${603-(i%2)*10} C ${62+i*42} ${586-(i%2)*8} ${72+i*42} ${584-(i%2)*6} ${82+i*42} ${603-(i%2)*10}`} delay={6.8+i*0.08} duration={0.45} strokeWidth={0.35} opacity={0.55} />)}
      </g>
    </OrnamentStage>
  );
}

export function CountdownArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 620" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 12 608 V 170 Q 12 70 180 24 Q 348 70 348 170 V 608" delay={0.1} duration={1.4} strokeWidth={0.9} />
        <DrawPath d="M 22 608 V 174 Q 22 86 180 42 Q 338 86 338 174 V 608" delay={0.45} duration={1.2} strokeWidth={0.34} opacity={0.68} />
        <Lantern x={180} y={82} scale={0.58} delay={1.0} glow />
        <DrawPath d="M 180 24 V 49" delay={0.75} duration={0.35} strokeWidth={0.42} />
        <DrawPath d="M 30 608 C 52 586 63 560 74 535 M 330 608 C 308 586 297 560 286 535" delay={1.8} duration={0.75} strokeWidth={0.5} />
        {[0,1,2].map(i => <DrawPath key={`l-${i}`} d={leaf(34+i*15, 595-i*18, 0.78)} delay={2.15+i*0.1} duration={0.45} strokeWidth={0.45} />)}
        {[0,1,2].map(i => <DrawPath key={`r-${i}`} d={leaf(326-i*15, 595-i*18, 0.78, true)} delay={2.2+i*0.1} duration={0.45} strokeWidth={0.45} />)}
        <DrawPath d="M 70 515 H 290" delay={2.65} duration={0.7} strokeWidth={0.38} opacity={0.55} />
      </g>
    </OrnamentStage>
  );
}

export function EventsArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 700" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 12 690 V 164 Q 12 70 180 24 Q 348 70 348 164 V 690" delay={0.1} duration={1.4} strokeWidth={0.9} />
        <DrawPath d="M 24 690 V 170 Q 24 88 180 43 Q 336 88 336 170 V 690" delay={0.45} duration={1.2} strokeWidth={0.34} opacity={0.7} />
        <CornerFlourish x={24} y={52} delay={1.0} />
        <CornerFlourish x={336} y={52} flipX delay={1.12} />
        <CornerFlourish x={24} y={660} flipY delay={1.25} />
        <CornerFlourish x={336} y={660} flipX flipY delay={1.37} />
        {[0,1,2].map(i => <DrawPath key={`divider-${i}`} d={`M 64 ${300+i*112} H 296`} delay={1.65+i*0.12} duration={0.7} strokeWidth={0.36} opacity={0.5} />)}
      </g>
    </OrnamentStage>
  );
}

export function VenueArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 700" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 12 690 V 116 Q 12 68 74 28 Q 180 -10 286 28 Q 348 68 348 116 V 690" delay={0.1} duration={1.4} strokeWidth={0.88} />
        <DrawPath d="M 24 690 V 122 Q 24 78 82 40 Q 180 4 278 40 Q 336 78 336 122 V 690" delay={0.45} duration={1.2} strokeWidth={0.34} opacity={0.68} />
        <DrawPath d="M 44 64 C 72 88 86 100 112 112 M 316 64 C 288 88 274 100 248 112" delay={1.0} duration={0.65} strokeWidth={0.42} />
        <Lantern x={76} y={130} scale={0.48} delay={1.35} />
        <Lantern x={180} y={94} scale={0.68} delay={1.5} glow />
        <Lantern x={284} y={130} scale={0.48} delay={1.65} />
        <DrawPath d="M 180 10 V 52" delay={1.1} duration={0.45} strokeWidth={0.4} />
        {[0,1,2,3,4].map(i => <DrawPath key={`vine-l-${i}`} d={leaf(32+i*15, 88+i*18, 0.72)} delay={1.9+i*0.1} duration={0.42} strokeWidth={0.42} />)}
        {[0,1,2,3,4].map(i => <DrawPath key={`vine-r-${i}`} d={leaf(328-i*15, 88+i*18, 0.72, true)} delay={1.95+i*0.1} duration={0.42} strokeWidth={0.42} />)}
        {/* Palace silhouette */}
        <DrawPath d="M 52 690 V 610 H 76 V 588 H 94 V 572 H 112 V 590 H 132 V 548 H 148 V 526 H 162 V 548 H 198 V 526 H 212 V 548 H 228 V 590 H 248 V 572 H 266 V 588 H 284 V 610 H 308 V 690" delay={2.7} duration={1.5} strokeWidth={0.75} />
        <DrawPath d="M 124 690 V 606 Q 124 570 180 540 Q 236 570 236 606 V 690" delay={4.05} duration={1.0} strokeWidth={0.7} />
        <DrawPath d="M 144 690 V 618 Q 144 590 180 570 Q 216 590 216 618 V 690" delay={4.85} duration={0.9} strokeWidth={0.5} />
        <DrawPath d="M 180 570 V 524 M 166 524 H 194 M 172 524 V 508 M 188 524 V 508" delay={5.65} duration={0.65} strokeWidth={0.48} />
        <DrawPath d="M 72 690 C 62 664 48 648 34 636 M 288 690 C 298 664 312 648 326 636" delay={6.35} duration={0.7} strokeWidth={0.55} />
        {[0,1,2,3].map(i => <DrawPath key={`palm-l-${i}`} d={leaf(42+i*8, 646-i*14, 0.75)} delay={6.55+i*0.08} duration={0.4} strokeWidth={0.42} />)}
        {[0,1,2,3].map(i => <DrawPath key={`palm-r-${i}`} d={leaf(318-i*8, 646-i*14, 0.75, true)} delay={6.6+i*0.08} duration={0.4} strokeWidth={0.42} />)}
      </g>
    </OrnamentStage>
  );
}

export function FinaleArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 680" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 12 668 V 152 Q 12 60 180 22 Q 348 60 348 152 V 668" delay={0.1} duration={1.35} strokeWidth={0.9} />
        <DrawPath d="M 23 668 V 156 Q 23 76 180 40 Q 337 76 337 156 V 668" delay={0.45} duration={1.2} strokeWidth={0.34} opacity={0.68} />
        <DrawPath d="M 50 56 C 94 82 112 86 134 88 M 310 56 C 266 82 248 86 226 88" delay={0.9} duration={0.7} strokeWidth={0.42} />
        <Lantern x={88} y={118} scale={0.48} delay={1.3} />
        <Lantern x={180} y={112} scale={0.72} delay={1.45} glow />
        <Lantern x={272} y={118} scale={0.48} delay={1.6} />
        <DrawPath d="M 88 22 V 72 M 180 22 V 64 M 272 22 V 72" delay={1.05} duration={0.55} strokeWidth={0.38} />
        <DrawPath d="M 38 668 C 54 640 70 612 82 584 M 322 668 C 306 640 290 612 278 584" delay={2.05} duration={0.8} strokeWidth={0.52} />
        {[0,1,2,3,4].map(i => <DrawPath key={`f-l-${i}`} d={leaf(38+i*11, 646-i*15, 0.76)} delay={2.35+i*0.1} duration={0.42} strokeWidth={0.42} />)}
        {[0,1,2,3,4].map(i => <DrawPath key={`f-r-${i}`} d={leaf(322-i*11, 646-i*15, 0.76, true)} delay={2.4+i*0.1} duration={0.42} strokeWidth={0.42} />)}
      </g>
    </OrnamentStage>
  );
}

export function RsvpFrame({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 620" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 12 10 H 348 V 610 H 12 Z" delay={0.1} duration={1.2} strokeWidth={0.9} />
        <DrawPath d="M 19 17 H 341 V 603 H 19 Z" delay={0.4} duration={1.1} strokeWidth={0.38} opacity={0.72} />
        <DrawPath d="M 28 26 H 332 V 594 H 28 Z" delay={0.7} duration={1.0} strokeWidth={0.22} opacity={0.5} />
        <CornerFlourish x={30} y={32} delay={1.15} />
        <CornerFlourish x={330} y={32} flipX delay={1.25} />
        <CornerFlourish x={30} y={588} flipY delay={1.35} />
        <CornerFlourish x={330} y={588} flipX flipY delay={1.45} />
        <DrawPath d="M 48 570 C 108 584 252 584 312 570" delay={1.8} duration={0.9} strokeWidth={0.45} />
      </g>
    </OrnamentStage>
  );
}
