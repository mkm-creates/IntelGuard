
import { 
  Activity, 
  AlertTriangle, 
  FileText, 
  Home, 
  List, 
  Mail,
  Server,
  Settings, 
  Shield,
  BellRing
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "./Logo";

export function SideBar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Threat Feed", path: "/threats", icon: AlertTriangle },
    { name: "Dashboard", path: "/dashboard", icon: Activity },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Data Sources", path: "/sources", icon: Server },
    { name: "Alerts", path: "/alerts", icon: BellRing },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col border-r bg-sidebar h-screen sticky top-0 w-64 px-3 py-4">
      <div className="mb-6 px-3">
        <Logo />
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive(item.path) ? "active" : ""}`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-6 border-t">
        <div className="glass-panel p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Pro Tier</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Upgrade to access advanced AI reports, custom alerts, and more.
          </p>
          <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium py-1.5 rounded-md transition-colors">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
