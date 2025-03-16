
import { Shield } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Shield className="h-6 w-6 text-primary" />
      <span className="font-medium text-lg">ThreatBeam</span>
    </div>
  );
}
