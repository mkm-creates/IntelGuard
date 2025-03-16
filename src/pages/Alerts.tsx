
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Bell, 
  AlertTriangle, 
  Clock, 
  Check, 
  X, 
  ExternalLink, 
  AlertCircle,
  ChevronDown,
  Plus,
  Mail,
  MessageSquare,
  BellRing,
  BellOff,
  Filter
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Alert type definition
interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "unread" | "read" | "muted";
  timestamp: string;
  source: string;
  relatedCVE?: string;
}

export default function Alerts() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample alerts data
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "alert-001",
      title: "Critical Zero-Day Vulnerability in Apache Log4j",
      description: "Active exploitation detected for CVE-2021-44228. Immediate patching required.",
      severity: "critical",
      status: "unread",
      timestamp: "2023-10-15T14:20:00Z",
      source: "CISA Advisory",
      relatedCVE: "CVE-2021-44228"
    },
    {
      id: "alert-002",
      title: "Microsoft Exchange Server RCE Vulnerability",
      description: "Multiple vulnerabilities that could allow remote code execution discovered in Exchange Server.",
      severity: "high",
      status: "read",
      timestamp: "2023-10-14T09:15:00Z",
      source: "Microsoft Security Advisory",
      relatedCVE: "CVE-2023-21529"
    },
    {
      id: "alert-003",
      title: "Cisco IOS XE Web UI Authentication Bypass",
      description: "Vulnerability allows unauthenticated attackers to create administrator accounts.",
      severity: "critical",
      status: "unread",
      timestamp: "2023-10-12T16:40:00Z",
      source: "Cisco PSIRT",
      relatedCVE: "CVE-2023-20198"
    },
    {
      id: "alert-004",
      title: "VMware vCenter Server Authentication Bypass",
      description: "Authentication bypass vulnerability in VMware vCenter Server.",
      severity: "high",
      status: "read",
      timestamp: "2023-10-10T11:30:00Z",
      source: "VMware Security Advisory",
      relatedCVE: "CVE-2023-20887"
    },
    {
      id: "alert-005",
      title: "New Backdoor Malware Targeting Linux Systems",
      description: "Emerging threat actor deploying sophisticated Linux backdoor with kernel-level persistence.",
      severity: "medium",
      status: "muted",
      timestamp: "2023-10-09T08:45:00Z",
      source: "Threat Intelligence Feed"
    },
  ]);

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Filter alerts based on search and active tab
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (alert.relatedCVE && alert.relatedCVE.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "unread") return matchesSearch && alert.status === "unread";
    if (activeTab === "critical") return matchesSearch && alert.severity === "critical";
    if (activeTab === "muted") return matchesSearch && alert.status === "muted";
    
    return matchesSearch;
  });

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: "read" } 
        : alert
    ));
    
    toast({
      title: "Alert marked as read",
      description: "This alert will be moved to your read items",
    });
  };

  const handleMuteAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: "muted" } 
        : alert
    ));
    
    toast({
      title: "Alert muted",
      description: "You won't receive notifications for this alert type",
    });
  };

  const handleCreateCustomAlert = () => {
    toast({
      title: "Create custom alert",
      description: "Open configuration panel to set up a new alert rule",
    });
  };

  // Render severity badge
  const renderSeverityBadge = (severity: Alert["severity"]) => {
    const colors = {
      critical: "bg-red-100 text-red-800",
      high: "bg-orange-100 text-orange-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };

    return (
      <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[severity]}`}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </span>
    );
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Security Alerts</h1>
        <p className="text-muted-foreground">
          Monitor and manage real-time security notifications and custom alerts
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Alert Center</CardTitle>
                <CardDescription>
                  View and manage your security notifications
                </CardDescription>
              </div>
              <Button onClick={handleCreateCustomAlert}>
                <Plus className="mr-2 h-4 w-4" />
                New Alert Rule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Filter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search alerts..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="all" className="w-[400px]" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                    <TabsTrigger value="critical">Critical</TabsTrigger>
                    <TabsTrigger value="muted">Muted</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-4">
                {filteredAlerts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No alerts found. Adjust your search or filters to see more results.
                  </div>
                ) : (
                  filteredAlerts.map((alert) => (
                    <div key={alert.id} className={`border rounded-lg p-4 shadow-sm ${alert.status === "unread" ? "bg-primary/5" : "bg-card"}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            {alert.status === "unread" && (
                              <div className="h-2 w-2 rounded-full bg-blue-500 mt-1"></div>
                            )}
                            <h3 className="font-medium flex items-center">
                              {alert.title}
                            </h3>
                            {renderSeverityBadge(alert.severity)}
                            {alert.status === "muted" && (
                              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
                                Muted
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                          {alert.relatedCVE && (
                            <a 
                              href={`https://nvd.nist.gov/vuln/detail/${alert.relatedCVE}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-xs text-primary flex items-center mt-1 hover:underline"
                            >
                              {alert.relatedCVE}
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          {alert.status === "unread" && (
                            <Button variant="outline" size="sm" onClick={() => handleMarkAsRead(alert.id)}>
                              <Check className="h-4 w-4 mr-2" />
                              Mark Read
                            </Button>
                          )}
                          {alert.status !== "muted" && (
                            <Button variant="outline" size="sm" onClick={() => handleMuteAlert(alert.id)}>
                              <BellOff className="h-4 w-4 mr-2" />
                              Mute
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Send
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-3 gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{formatTimestamp(alert.timestamp)}</span>
                        <span>•</span>
                        <span>Source: {alert.source}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Alert Subscriptions</CardTitle>
              <CardDescription>
                Manage which types of alerts you receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="font-medium">Critical Vulnerabilities</p>
                      <p className="text-sm text-muted-foreground">All CVSS 9.0+ vulnerabilities</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <BellRing className="h-4 w-4 mr-2" />
                    Subscribed
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Microsoft Products</p>
                      <p className="text-sm text-muted-foreground">Windows, Office, Azure</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <BellRing className="h-4 w-4 mr-2" />
                    Subscribed
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Linux Kernel</p>
                      <p className="text-sm text-muted-foreground">High and critical severity only</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <BellRing className="h-4 w-4 mr-2" />
                    Subscribed
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Preferences</CardTitle>
              <CardDescription>
                Configure how you receive alert notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alert Severity</label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="criticalHigh">Critical & High Only</SelectItem>
                        <SelectItem value="critical">Critical Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Update Frequency</label>
                    <Select defaultValue="realtime">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly Digest</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email Alerts</p>
                      <p className="text-sm text-muted-foreground">security-team@company.com</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">In-App Notifications</p>
                      <p className="text-sm text-muted-foreground">Browser pop-ups and dashboard</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
