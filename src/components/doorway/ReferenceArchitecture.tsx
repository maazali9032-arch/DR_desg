import { OrnamentStage, DrawCircle, DrawGroup, DrawPath } from "@/components/animation/Draw";

type ArtProps = { className?: string; immediate?: boolean };

const leaf = (x: number, y: number, s = 1, flip = false) => {
  const d = flip ? -1 : 1;
  return `M ${x} ${y} C ${x + d * 9 * s} ${y - 14 * s} ${x + d * 18 * s} ${y - 15 * s} ${x + d * 22 * s} ${y - 2 * s} C ${x + d * 18 * s} ${y + 10 * s} ${x + d * 7 * s} ${y + 12 * s} ${x} ${y}`;
};

const petal = (x: number, y: number, rx: number, ry: number, flip = false) => {
  const d = flip ? -1 : 1;
  return `M ${x} ${y} C ${x + d * rx} ${y - ry} ${x + d * rx} ${y + ry} ${x} ${y}`;
};

function Chain({ x, top, bottom, delay = 0 }: { x: number; top: number; bottom: number; delay?: number }) {
  const count = Math.max(4, Math.floor((bottom - top) / 10));
  return (
    <DrawGroup delay={delay}>
      {Array.from({ length: count }).map((_, i) => {
        const y = top + i * ((bottom - top) / (count - 1));
        return <DrawCircle key={i} cx={x} cy={y} r={1.9} strokeWidth={0.32} duration={0.18} />;
      })}
    </DrawGroup>
  );
}

function Lantern({ x, y, scale = 1, delay = 0, glow = false }: { x: number; y: number; scale?: number; delay?: number; glow?: boolean }) {
  const w = 26 * scale;
  const h = 54 * scale;
  return (
    <DrawGroup delay={delay}>
      {glow && <DrawCircle cx={x} cy={y + h * 0.08} r={18 * scale} strokeWidth={0.25} opacity={0.18} />}
      <DrawPath d={`M ${x} ${y - h * 1.05} V ${y - h * 0.82} M ${x - 4 * scale} ${y - h * 0.9} Q ${x} ${y - h * 1.02} ${x + 4 * scale} ${y - h * 0.9}`} duration={0.3} strokeWidth={0.42} />
      <DrawPath d={`M ${x} ${y - h * 0.82} V ${y - h * 0.58}`} duration={0.28} strokeWidth={0.38} />
      <DrawCircle cx={x} cy={y - h * 0.55} r={2.5 * scale} mode="dot" fill="currentColor" stroke="none" delay={delay + 0.2} />
      <DrawPath d={`M ${x - w * 0.28} ${y - h * 0.48} L ${x - w * 0.48} ${y - h * 0.26} H ${x + w * 0.48} L ${x + w * 0.28} ${y - h * 0.48} Z`} duration={0.45} strokeWidth={0.52} />
      <DrawPath d={`M ${x - w * 0.48} ${y - h * 0.26} V ${y + h * 0.43} L ${x} ${y + h * 0.7} L ${x + w * 0.48} ${y + h * 0.43} V ${y - h * 0.26}`} duration={0.65} strokeWidth={0.68} />
      <DrawPath d={`M ${x - w * 0.38} ${y - h * 0.02} H ${x + w * 0.38} M ${x - w * 0.39} ${y + h * 0.24} H ${x + w * 0.39}`} duration={0.38} strokeWidth={0.34} opacity={0.8} />
      <DrawPath d={`M ${x - w * 0.22} ${y - h * 0.25} L ${x - w * 0.08} ${y - h * 0.05} L ${x - w * 0.2} ${y + h * 0.18} M ${x + w * 0.22} ${y - h * 0.25} L ${x + w * 0.08} ${y - h * 0.05} L ${x + w * 0.2} ${y + h * 0.18}`} duration={0.5} strokeWidth={0.3} opacity={0.8} />
      <DrawPath d={`M ${x - w * 0.18} ${y + h * 0.58} H ${x + w * 0.18}`} duration={0.25} strokeWidth={0.36} />
      {glow && <DrawCircle cx={x} cy={y + h * 0.12} r={7 * scale} mode="dot" fill="currentColor" stroke="none" delay={delay + 0.55} opacity={0.34} />}
    </DrawGroup>
  );
}

function CornerFlourish({ x, y, flipX = false, flipY = false, delay = 0 }: { x: number; y: number; flipX?: boolean; flipY?: boolean; delay?: number }) {
  const sx = flipX ? -1 : 1;
  const sy = flipY ? -1 : 1;
  return (
    <DrawGroup delay={delay} className="origin-center">
      <DrawPath d={`M ${x} ${y} C ${x + sx * 26} ${y + sy * 2} ${x + sx * 44} ${y + sy * 18} ${x + sx * 57} ${y + sy * 38}`} duration={0.65} strokeWidth={0.58} />
      <DrawPath d={`M ${x + sx * 5} ${y + sy * 7} C ${x + sx * 24} ${y + sy * 13} ${x + sx * 35} ${y + sy * 26} ${x + sx * 38} ${y + sy * 46}`} duration={0.55} strokeWidth={0.34} opacity={0.78} />
      {[0, 1, 2].map(i => (
        <DrawPath key={i} d={leaf(x + sx * (18 + i * 13), y + sy * (10 + i * 11), 0.48, flipX)} duration={0.35} delay={0.12 * i} strokeWidth={0.38} />
      ))}
      <DrawCircle cx={x + sx * 5} cy={y + sy * 5} r={2.4} mode="dot" fill="currentColor" stroke="none" />
    </DrawGroup>
  );
}

function ArchFiligree({ delay = 0 }: { delay?: number }) {
  return (
    <>
      <DrawPath d="M 28 180 Q 44 96 116 54 Q 150 35 180 28 Q 210 35 244 54 Q 316 96 332 180" delay={delay} duration={1.15} strokeWidth={0.72} />
      <DrawPath d="M 40 180 Q 58 112 120 73 Q 151 54 180 48 Q 209 54 240 73 Q 302 112 320 180" delay={delay + 0.25} duration={1.0} strokeWidth={0.34} opacity={0.78} />
      <DrawPath d="M 57 132 Q 78 102 106 86 M 303 132 Q 282 102 254 86" delay={delay + 0.5} duration={0.6} strokeWidth={0.36} />
      <DrawPath d="M 82 94 Q 92 112 108 122 Q 118 98 132 80 M 278 94 Q 268 112 252 122 Q 242 98 228 80" delay={delay + 0.7} duration={0.65} strokeWidth={0.32} />
      <DrawCircle cx={180} cy={49} r={4.5} delay={delay + 0.9} duration={0.4} strokeWidth={0.42} />
      <DrawCircle cx={180} cy={49} r={1.4} mode="dot" fill="currentColor" stroke="none" delay={delay + 1.05} />
    </>
  );
}

function BotanicalBase({ delay = 0, height = 610 }: { delay?: number; height?: number }) {
  return (
    <>
      <DrawPath d={`M 24 ${height} C 36 ${height - 45} 51 ${height - 80} 78 ${height - 112} C 100 ${height - 137} 116 ${height - 151} 136 ${height - 170}`} delay={delay} duration={0.8} strokeWidth={0.55} />
      <DrawPath d={`M 336 ${height} C 324 ${height - 45} 309 ${height - 80} 282 ${height - 112} C 260 ${height - 137} 244 ${height - 151} 224 ${height - 170}`} delay={delay + 0.1} duration={0.8} strokeWidth={0.55} />
      {[0,1,2,3,4,5,6].map(i => (
        <DrawPath key={`bl-${i}`} d={leaf(32 + i * 15, height - 18 - i * 20, 0.68)} delay={delay + 0.18 + i * 0.07} duration={0.32} strokeWidth={0.4} />
      ))}
      {[0,1,2,3,4,5,6].map(i => (
        <DrawPath key={`br-${i}`} d={leaf(328 - i * 15, height - 18 - i * 20, 0.68, true)} delay={delay + 0.22 + i * 0.07} duration={0.32} strokeWidth={0.4} />
      ))}
      <DrawPath d={`M 32 ${height - 18} Q 56 ${height - 48} 72 ${height - 80} M 328 ${height - 18} Q 304 ${height - 48} 288 ${height - 80}`} delay={delay + 0.65} duration={0.55} strokeWidth={0.34} opacity={0.72} />
    </>
  );
}

function PendantOrnament({ delay = 0 }: { delay?: number }) {
  return (
    <DrawGroup delay={delay}>
      <DrawPath d="M 180 20 V 82" duration={0.55} strokeWidth={0.4} />
      <DrawCircle cx={180} cy={88} r={3.4} duration={0.3} strokeWidth={0.45} />
      <DrawPath d="M 180 92 C 166 102 164 116 174 124 C 180 129 186 129 192 124 C 196 116 194 102 180 92 Z" duration={0.65} strokeWidth={0.58} />
      <DrawPath d="M 180 129 V 155 M 180 155 C 164 165 163 181 174 188 C 180 192 186 192 192 188 C 197 181 196 165 180 155 Z" duration={0.7} strokeWidth={0.56} />
      <DrawPath d="M 180 193 V 221 M 180 221 C 170 228 170 241 180 248 C 190 241 190 228 180 221 Z" duration={0.55} strokeWidth={0.46} />
      <DrawCircle cx={180} cy={257} r={2} mode="dot" fill="currentColor" stroke="none" delay={delay + 1.5} />
    </DrawGroup>
  );
}

function PalaceSilhouette({ delay = 0, y = 610 }: { delay?: number; y?: number }) {
  return (
    <DrawGroup delay={delay}>
      <DrawPath d={`M 48 ${y} V ${y-42} H 67 V ${y-62} H 81 V ${y-46} H 99 V ${y-76} H 111 V ${y-52} H 126 V ${y-106} H 139 V ${y-78} H 151 V ${y-122} H 163 V ${y-86} H 197 V ${y-122} H 209 V ${y-78} H 221 V ${y-106} H 234 V ${y-76} H 249 V ${y-52} H 261 V ${y-76} H 279 V ${y-46} H 293 V ${y-62} H 313 V ${y-42} H 312 V ${y}`} duration={1.35} strokeWidth={0.62} />
      <DrawPath d={`M 116 ${y} V ${y-76} Q 116 ${y-112} 180 ${y-145} Q 244 ${y-112} 244 ${y-76} V ${y}`} duration={0.95} strokeWidth={0.7} />
      <DrawPath d={`M 138 ${y} V ${y-86} Q 138 ${y-112} 180 ${y-132} Q 222 ${y-112} 222 ${y-86} V ${y}`} duration={0.72} strokeWidth={0.45} />
      <DrawPath d={`M 165 ${y} V ${y-60} Q 165 ${y-78} 180 ${y-89} Q 195 ${y-78} 195 ${y-60} V ${y}`} duration={0.65} strokeWidth={0.52} />
      <DrawPath d={`M 174 ${y-89} V ${y-119} H 186 V ${y-89} M 170 ${y-119} H 190`} duration={0.5} strokeWidth={0.42} />
      {[128,146,214,232].map((x, i) => <DrawPath key={x} d={`M ${x} ${y} V ${y-34} H ${x+10} V ${y} M ${x+3} ${y-34} V ${y-49} M ${x+7} ${y-34} V ${y-49}`} delay={0.15*i} duration={0.4} strokeWidth={0.38} />)}
      {[0,1,2,3,4,5,6].map(i => <DrawPath key={`w${i}`} d={`M ${104+i*22} ${y-10} V ${y-28} H ${114+i*22} V ${y-10}`} delay={0.55+i*0.05} duration={0.28} strokeWidth={0.32} />)}
      <DrawPath d={`M 95 ${y} Q 180 ${y+18} 265 ${y}`} duration={0.5} strokeWidth={0.42} opacity={0.7} />
    </DrawGroup>
  );
}

export function OpeningArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 700" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 12 16 H 348 V 684 H 12 Z" duration={1.1} strokeWidth={0.9} />
        <DrawPath d="M 20 24 H 340 V 676 H 20 Z" delay={0.25} duration={1.0} strokeWidth={0.32} opacity={0.75} />
        <DrawPath d="M 28 32 H 332 V 668 H 28 Z" delay={0.48} duration={0.9} strokeWidth={0.2} opacity={0.45} />
        <CornerFlourish x={30} y={38} delay={0.9} />
        <CornerFlourish x={330} y={38} flipX delay={1.0} />
        <CornerFlourish x={30} y={662} flipY delay={1.1} />
        <CornerFlourish x={330} y={662} flipX flipY delay={1.2} />
        <Chain x={58} top={26} bottom={230} delay={1.35} />
        <Chain x={104} top={26} bottom={310} delay={1.48} />
        <Chain x={256} top={26} bottom={310} delay={1.6} />
        <Chain x={302} top={26} bottom={230} delay={1.72} />
        <Lantern x={58} y={246} scale={0.62} delay={1.9} glow />
        <Lantern x={104} y={326} scale={0.82} delay={2.05} glow />
        <Lantern x={256} y={326} scale={0.82} delay={2.18} glow />
        <Lantern x={302} y={246} scale={0.62} delay={2.3} glow />
        <PendantOrnament delay={2.5} />
        <DrawPath d="M 76 360 H 284" delay={4.2} duration={0.7} strokeWidth={0.34} opacity={0.45} />
        <DrawPath d="M 82 612 C 112 590 136 580 180 580 C 224 580 248 590 278 612" delay={4.5} duration={0.7} strokeWidth={0.34} opacity={0.55} />
        <BotanicalBase delay={4.8} height={660} />
      </g>
    </OrnamentStage>
  );
}

export function IntroArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 700" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 14 680 V 174 Q 14 72 180 24 Q 346 72 346 174 V 680" duration={1.35} strokeWidth={0.88} />
        <DrawPath d="M 24 680 V 178 Q 24 86 180 40 Q 336 86 336 178 V 680" delay={0.35} duration={1.15} strokeWidth={0.34} opacity={0.72} />
        <DrawPath d="M 38 680 V 184 H 66 V 680 M 294 680 V 184 H 322 V 680" delay={0.7} duration={0.9} strokeWidth={0.62} />
        <DrawPath d="M 30 184 H 72 L 66 168 H 36 Z M 288 168 H 324 L 330 184 H 288 Z" delay={1.05} duration={0.55} strokeWidth={0.55} />
        <ArchFiligree delay={1.35} />
        <Chain x={78} top={28} bottom={152} delay={2.55} />
        <Chain x={180} top={28} bottom={106} delay={2.65} />
        <Chain x={282} top={28} bottom={152} delay={2.75} />
        <Lantern x={78} y={170} scale={0.5} delay={2.9} />
        <Lantern x={180} y={126} scale={0.62} delay={3.02} glow />
        <Lantern x={282} y={170} scale={0.5} delay={3.14} />
        <CornerFlourish x={38} y={50} delay={3.3} />
        <CornerFlourish x={322} y={50} flipX delay={3.4} />
        <DrawPath d="M 72 612 C 100 590 128 574 154 566 M 288 612 C 260 590 232 574 206 566" delay={3.75} duration={0.7} strokeWidth={0.42} />
        <PalaceSilhouette delay={4.05} y={666} />
        <BotanicalBase delay={5.8} height={676} />
      </g>
    </OrnamentStage>
  );
}

export function CountdownArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 700" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 14 682 V 174 Q 14 72 180 24 Q 346 72 346 174 V 682" duration={1.3} strokeWidth={0.86} />
        <DrawPath d="M 24 682 V 178 Q 24 86 180 40 Q 336 86 336 178 V 682" delay={0.35} duration={1.15} strokeWidth={0.34} opacity={0.7} />
        <ArchFiligree delay={0.8} />
        <Chain x={180} top={28} bottom={112} delay={1.9} />
        <Lantern x={180} y={128} scale={0.62} delay={2.05} glow />
        <CornerFlourish x={38} y={52} delay={2.35} />
        <CornerFlourish x={322} y={52} flipX delay={2.45} />
        <DrawPath d="M 34 680 C 55 648 68 622 84 594 M 326 680 C 305 648 292 622 276 594" delay={2.75} duration={0.75} strokeWidth={0.48} />
        {[0,1,2,3,4].map(i => <DrawPath key={`cl${i}`} d={leaf(36+i*15, 666-i*17, 0.72)} delay={3+i*0.08} duration={0.35} strokeWidth={0.4} />)}
        {[0,1,2,3,4].map(i => <DrawPath key={`cr${i}`} d={leaf(324-i*15, 666-i*17, 0.72, true)} delay={3.05+i*0.08} duration={0.35} strokeWidth={0.4} />)}
        <DrawPath d="M 72 548 H 288" delay={3.55} duration={0.6} strokeWidth={0.32} opacity={0.48} />
      </g>
    </OrnamentStage>
  );
}

export function EventsArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 760" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 14 742 V 174 Q 14 72 180 24 Q 346 72 346 174 V 742" duration={1.35} strokeWidth={0.88} />
        <DrawPath d="M 24 742 V 178 Q 24 86 180 40 Q 336 86 336 178 V 742" delay={0.35} duration={1.15} strokeWidth={0.34} opacity={0.72} />
        <ArchFiligree delay={0.85} />
        <CornerFlourish x={36} y={50} delay={1.95} />
        <CornerFlourish x={324} y={50} flipX delay={2.05} />
        <CornerFlourish x={36} y={710} flipY delay={2.15} />
        <CornerFlourish x={324} y={710} flipX flipY delay={2.25} />
        {[0,1,2].map(i => (
          <DrawGroup key={i} delay={2.5 + i * 0.18}>
            <DrawPath d={`M 58 ${332 + i*128} H 302`} duration={0.7} strokeWidth={0.35} opacity={0.5} />
            <DrawPath d={`M 166 ${332 + i*128} L 180 ${320 + i*128} L 194 ${332 + i*128} L 180 ${344 + i*128} Z`} duration={0.4} strokeWidth={0.4} />
            <DrawCircle cx={180} cy={332 + i*128} r={2.2} mode="dot" fill="currentColor" stroke="none" delay={0.3} />
          </DrawGroup>
        ))}
        <BotanicalBase delay={3.1} height={728} />
      </g>
    </OrnamentStage>
  );
}

export function VenueArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 760" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 14 742 V 136 Q 14 72 70 38 Q 180 -6 290 38 Q 346 72 346 136 V 742" duration={1.35} strokeWidth={0.88} />
        <DrawPath d="M 24 742 V 140 Q 24 88 78 50 Q 180 12 282 50 Q 336 88 336 140 V 742" delay={0.35} duration={1.15} strokeWidth={0.34} opacity={0.72} />
        <CornerFlourish x={34} y={54} delay={0.9} />
        <CornerFlourish x={326} y={54} flipX delay={1.0} />
        <DrawPath d="M 58 56 Q 86 76 112 104 M 302 56 Q 274 76 248 104" delay={1.2} duration={0.6} strokeWidth={0.38} />
        <Chain x={78} top={38} bottom={178} delay={1.45} />
        <Chain x={180} top={20} bottom={132} delay={1.55} />
        <Chain x={282} top={38} bottom={178} delay={1.65} />
        <Lantern x={78} y={196} scale={0.46} delay={1.85} />
        <Lantern x={180} y={150} scale={0.68} delay={1.98} glow />
        <Lantern x={282} y={196} scale={0.46} delay={2.1} />
        {[0,1,2,3,4].map(i => <DrawPath key={`vl${i}`} d={leaf(34+i*14, 112+i*16, 0.62)} delay={2.35+i*0.07} duration={0.3} strokeWidth={0.38} />)}
        {[0,1,2,3,4].map(i => <DrawPath key={`vr${i}`} d={leaf(326-i*14, 112+i*16, 0.62, true)} delay={2.4+i*0.07} duration={0.3} strokeWidth={0.38} />)}
        <PalaceSilhouette delay={2.9} y={716} />
        <DrawPath d="M 78 714 Q 180 660 282 714" delay={4.7} duration={0.65} strokeWidth={0.36} opacity={0.65} />
        <DrawPath d="M 110 716 L 92 742 M 250 716 L 268 742" delay={4.9} duration={0.45} strokeWidth={0.34} />
        <BotanicalBase delay={5.1} height={742} />
      </g>
    </OrnamentStage>
  );
}

export function FinaleArchitecture({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 720" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 14 704 V 154 Q 14 62 180 22 Q 346 62 346 154 V 704" duration={1.35} strokeWidth={0.88} />
        <DrawPath d="M 24 704 V 158 Q 24 76 180 40 Q 336 76 336 158 V 704" delay={0.35} duration={1.15} strokeWidth={0.34} opacity={0.72} />
        <ArchFiligree delay={0.8} />
        <Chain x={92} top={28} bottom={132} delay={1.9} />
        <Chain x={180} top={28} bottom={112} delay={2.0} />
        <Chain x={268} top={28} bottom={132} delay={2.1} />
        <Lantern x={92} y={150} scale={0.46} delay={2.25} />
        <Lantern x={180} y={132} scale={0.72} delay={2.38} glow />
        <Lantern x={268} y={150} scale={0.46} delay={2.5} />
        <BotanicalBase delay={2.85} height={700} />
        <DrawPath d="M 64 646 Q 104 610 138 594 M 296 646 Q 256 610 222 594" delay={3.55} duration={0.7} strokeWidth={0.38} />
        <DrawPath d="M 118 544 H 242" delay={3.85} duration={0.55} strokeWidth={0.32} opacity={0.45} />
      </g>
    </OrnamentStage>
  );
}

export function RsvpFrame({ className = "", immediate = false }: ArtProps) {
  return (
    <OrnamentStage className={className} viewBox="0 0 360 680" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d="M 12 12 H 348 V 668 H 12 Z" duration={1.05} strokeWidth={0.9} />
        <DrawPath d="M 19 19 H 341 V 661 H 19 Z" delay={0.25} duration={0.95} strokeWidth={0.38} opacity={0.74} />
        <DrawPath d="M 27 27 H 333 V 653 H 27 Z" delay={0.48} duration={0.9} strokeWidth={0.2} opacity={0.5} />
        <CornerFlourish x={31} y={34} delay={0.85} />
        <CornerFlourish x={329} y={34} flipX delay={0.95} />
        <CornerFlourish x={31} y={646} flipY delay={1.05} />
        <CornerFlourish x={329} y={646} flipX flipY delay={1.15} />
        <DrawPath d="M 46 612 Q 180 640 314 612" delay={1.5} duration={0.75} strokeWidth={0.38} />
        <DrawPath d="M 76 618 Q 180 632 284 618" delay={1.7} duration={0.6} strokeWidth={0.22} opacity={0.55} />
      </g>
    </OrnamentStage>
  );
}
