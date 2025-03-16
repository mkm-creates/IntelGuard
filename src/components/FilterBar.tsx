
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ThreatSeverity } from "./ThreatCard";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  title: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({ title, options, value, onChange }: FilterDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-md bg-secondary/50 hover:bg-secondary transition-colors"
      >
        <span>{title}</span>
        <ChevronDown size={14} className={open ? "rotate-180" : ""} />
      </button>
      
      {open && (
        <div className="absolute z-10 mt-1 w-48 origin-top-right glass-panel rounded-md shadow-lg">
          <div className="py-1 max-h-56 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-secondary/50 transition-colors",
                  value === option.value && "font-medium"
                )}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {value === option.value && <Check size={16} className="text-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface FilterBarProps {
  severityFilter: ThreatSeverity | "all";
  sourceFilter: string;
  timeFilter: string;
  onSeverityChange: (severity: ThreatSeverity | "all") => void;
  onSourceChange: (source: string) => void;
  onTimeChange: (time: string) => void;
}

export function FilterBar({
  severityFilter,
  sourceFilter,
  timeFilter,
  onSeverityChange,
  onSourceChange,
  onTimeChange,
}: FilterBarProps) {
  const severityOptions = [
    { value: "all", label: "All Severities" },
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const sourceOptions = [
    { value: "all", label: "All Sources" },
    { value: "nvd", label: "NVD" },
    { value: "cisa", label: "CISA" },
    { value: "microsoft", label: "Microsoft" },
    { value: "google", label: "Google" },
    { value: "apple", label: "Apple" },
  ];
  
  const timeOptions = [
    { value: "all", label: "All Time" },
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <FilterDropdown
        title="Severity"
        options={severityOptions}
        value={severityFilter}
        onChange={(value) => onSeverityChange(value as ThreatSeverity | "all")}
      />
      
      <FilterDropdown
        title="Source"
        options={sourceOptions}
        value={sourceFilter}
        onChange={onSourceChange}
      />
      
      <FilterDropdown
        title="Time Range"
        options={timeOptions}
        value={timeFilter}
        onChange={onTimeChange}
      />
    </div>
  );
}
