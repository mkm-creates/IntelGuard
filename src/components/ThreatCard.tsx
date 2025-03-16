
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SeverityBadge } from "./SeverityBadge";

export type ThreatSeverity = "critical" | "high" | "medium" | "low";

export interface Threat {
  id: string;
  cveId: string;
  title: string;
  description: string;
  severity: ThreatSeverity;
  aiSummary: string;
  datePublished: string;
  source: string;
  cvssScore: number;
  affectedProducts: string[];
}

interface ThreatCardProps {
  threat: Threat;
  className?: string;
  expanded?: boolean;
  onClick?: () => void;
}

export function ThreatCard({ 
  threat, 
  className, 
  expanded = false, 
  onClick 
}: ThreatCardProps) {
  const dateFormatted = new Date(threat.datePublished).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "glass-panel rounded-lg overflow-hidden cursor-pointer transition-all duration-300",
        expanded ? "shadow-xl" : "hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <SeverityBadge severity={threat.severity} />
              <span className="text-xs text-muted-foreground">{dateFormatted}</span>
            </div>
            <h3 className="font-medium">{threat.cveId}</h3>
          </div>
          
          <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            CVSS {threat.cvssScore.toFixed(1)}
          </div>
        </div>
        
        <p className="text-sm mb-4 line-clamp-2">{threat.title}</p>
        
        {expanded ? (
          <>
            <div className="mb-4">
              <h4 className="text-xs font-medium text-muted-foreground mb-1">
                AI-Generated Summary
              </h4>
              <p className="text-sm">{threat.aiSummary}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xs font-medium text-muted-foreground mb-1">
                Full Description
              </h4>
              <p className="text-sm">{threat.description}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-xs font-medium text-muted-foreground mb-1">
                Affected Products
              </h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {threat.affectedProducts.map((product) => (
                  <span
                    key={product}
                    className="text-xs bg-secondary px-2 py-0.5 rounded"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t">
              <span className="text-xs text-muted-foreground">
                Source: {threat.source}
              </span>
              <a
                href={`https://nvd.nist.gov/vuln/detail/${threat.cveId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View Original</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Source: {threat.source}</span>
            <span>View Details →</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
