
import { cn } from "@/lib/utils";

type SeverityLevel = "critical" | "high" | "medium" | "low";

interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
}

export function SeverityBadge({ severity, className }: SeverityBadgeProps) {
  const baseClasses = 
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors";
  
  const severityClasses = {
    critical: "bg-severity-critical/10 text-severity-critical border-severity-critical/30",
    high: "bg-severity-high/10 text-severity-high border-severity-high/30",
    medium: "bg-severity-medium/10 text-severity-medium border-severity-medium/30",
    low: "bg-severity-low/10 text-severity-low border-severity-low/30",
  };
  
  return (
    <span className={cn(baseClasses, severityClasses[severity], className)}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}
