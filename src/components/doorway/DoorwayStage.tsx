import { OrnamentStage, DrawPath } from "@/components/animation/Draw";
import { DoorwayArch } from "./DoorwayArch";
import { DoorwayCarving } from "./DoorwayCarving";
import { DoorwayColumns } from "./DoorwayColumns";
import { DoorwayDoors } from "./DoorwayDoors";
import { DoorwayFinale } from "./DoorwayFinale";
import { DoorwayFrame } from "./DoorwayFrame";
import { DoorwayLattice } from "./DoorwayLattice";
import { DoorwayOrnaments } from "./DoorwayOrnaments";
import { doorwayPaths } from "@/lib/doorway/paths";
import { doorwayConstruction } from "@/lib/doorway/construction";

type DoorwayMode = "opening" | "frame" | "finale";

export function DoorwayStage({ className = "", immediate = false, compact = false, mode = "opening" }: { className?: string; immediate?: boolean; compact?: boolean; mode?: DoorwayMode }) {
  const c = doorwayConstruction;
  const showConstruction = mode === "opening";
  const showFrame = mode === "opening" || mode === "frame";
  const showFinale = mode === "opening" || mode === "finale";

  return (
    <OrnamentStage className={className} viewBox="0 0 360 620" immediate={immediate}>
      <g stroke="currentColor" fill="none">
        <DrawPath d={doorwayPaths.foundation.floor} delay={c.foundation.delay} duration={c.foundation.duration} strokeWidth={0.8} opacity={showConstruction ? 1 : 0.65} />
        {showFrame && <><DoorwayFrame /><DoorwayColumns /><DoorwayArch /></>}
        {showConstruction && <>
          <DrawPath d={doorwayPaths.foundation.leftBase} delay={c.foundation.delay + 0.18} duration={0.55} strokeWidth={0.65} />
          <DrawPath d={doorwayPaths.foundation.rightBase} delay={c.foundation.delay + 0.28} duration={0.55} strokeWidth={0.65} />
          <DoorwayCarving /><DoorwayLattice /><DoorwayOrnaments /><DoorwayDoors />
        </>}
        {showFinale && <DoorwayFinale />}
        {compact && <path d="M 104 520 V 220 Q 104 116 180 84 Q 256 116 256 220 V 520" stroke="currentColor" strokeWidth="0.25" opacity="0.11" vectorEffect="non-scaling-stroke" />}
      </g>
    </OrnamentStage>
  );
}
