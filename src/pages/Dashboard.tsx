
import { Activity, AlertTriangle, Database, Shield, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { useState } from "react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-3 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor the latest threat intelligence and key metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 grid-animate">
        <MetricCard
          title="Critical Threats"
          value={27}
          subtitle="Last 30 days"
          icon={AlertTriangle}
          trend={{ value: 12, direction: "up" }}
        />
        
        <MetricCard
          title="Active Exploits"
          value={153}
          subtitle="Under monitoring"
          icon={Activity}
          trend={{ value: 8, direction: "up" }}
        />
        
        <MetricCard
          title="Resolved Threats"
          value={42}
          subtitle="Last 30 days"
          icon={Shield}
          trend={{ value: 5, direction: "up" }}
        />
        
        <MetricCard
          title="Data Sources"
          value={8}
          subtitle="Connected feeds"
          icon={Database}
          trend={{ value: 0, direction: "neutral" }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-5 rounded-lg lg:col-span-2">
          <h2 className="text-lg font-medium mb-4">Threat Activity (30 Days)</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground text-sm">
              Chart placeholder - Historical threat data visualization
            </div>
          </div>
        </div>
        
        <div className="glass-panel p-5 rounded-lg">
          <h2 className="text-lg font-medium mb-4">Top Affected Vendors</h2>
          <div className="space-y-4">
            {[
              { name: "Microsoft", count: 34, percentage: 75 },
              { name: "Adobe", count: 22, percentage: 55 },
              { name: "Oracle", count: 18, percentage: 45 },
              { name: "Google", count: 15, percentage: 38 },
              { name: "Apple", count: 11, percentage: 28 },
            ].map((vendor) => (
              <div key={vendor.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{vendor.name}</span>
                  <span>{vendor.count}</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${vendor.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-5 rounded-lg">
          <h2 className="text-lg font-medium mb-4">Recently Added Threats</h2>
          <div className="space-y-3">
            {[
              { id: "CVE-2023-1234", severity: "critical", title: "Remote Code Execution in Windows Server" },
              { id: "CVE-2023-5678", severity: "high", title: "SQL Injection Vulnerability in Oracle Database" },
              { id: "CVE-2023-9012", severity: "medium", title: "Authentication Bypass in Cisco Routers" },
              { id: "CVE-2023-3456", severity: "critical", title: "Kernel Vulnerability in Linux Systems" },
            ].map((threat) => (
              <div
                key={threat.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-md hover:bg-secondary transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      threat.severity === "critical"
                        ? "bg-severity-critical"
                        : threat.severity === "high"
                        ? "bg-severity-high"
                        : "bg-severity-medium"
                    }`}
                  />
                  <div>
                    <div className="text-sm font-medium">{threat.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {threat.title}
                    </div>
                  </div>
                </div>
                <div className="text-xs">View →</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-panel p-5 rounded-lg">
          <h2 className="text-lg font-medium mb-4">Trending Attack Vectors</h2>
          <div className="space-y-4">
            {[
              { name: "Supply Chain Attacks", count: 128, trend: "up" },
              { name: "Zero-Day Exploits", count: 76, trend: "up" },
              { name: "Ransomware", count: 54, trend: "down" },
              { name: "API Vulnerabilities", count: 42, trend: "up" },
              { name: "Social Engineering", count: 33, trend: "neutral" },
            ].map((vector) => (
              <div key={vector.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-primary" />
                  <span className="text-sm">{vector.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{vector.count}</span>
                  <span
                    className={
                      vector.trend === "up"
                        ? "text-severity-critical"
                        : vector.trend === "down"
                        ? "text-severity-low"
                        : "text-muted-foreground"
                    }
                  >
                    {vector.trend === "up" ? "↑" : vector.trend === "down" ? "↓" : "–"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
