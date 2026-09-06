import { OpeningArchitecture } from "./ReferenceArchitecture";

type DoorwayMode = "opening" | "frame" | "finale";
export function DoorwayStage({ className = "", immediate = false, compact = false, mode = "opening" }: { className?: string; immediate?: boolean; compact?: boolean; mode?: DoorwayMode }) {
  return <OpeningArchitecture className={className} immediate={immediate} />;
}
