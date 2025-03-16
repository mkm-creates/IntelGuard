
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { 
  Database, 
  Server, 
  RefreshCw, 
  ExternalLink, 
  Search,
  Info,
  Plus,
  Calendar,
  CheckCircle,
  XCircle,
  Shield,
  AlertCircle,
  Globe,
  FileText,
  Code
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

// Data source type definition
interface DataSource {
  id: string;
  name: string;
  type: "government" | "vendor" | "research" | "exploit" | "custom";
  description: string;
  enabled: boolean;
  updateFrequency: "hourly" | "daily" | "weekly";
  lastUpdated: string;
  status: "online" | "offline" | "error";
  threatCount: number;
  reliability: number; // 0-100
}

export default function DataSources() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Sample data sources
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "ds-001",
      name: "CISA Known Exploited Vulnerabilities",
      type: "government",
      description: "Official feed of vulnerabilities being actively exploited in the wild",
      enabled: true,
      updateFrequency: "daily",
      lastUpdated: "2023-10-15T08:30:00Z",
      status: "online",
      threatCount: 872,
      reliability: 98
    },
    {
      id: "ds-002",
      name: "Microsoft Security Advisories",
      type: "vendor",
      description: "Official security bulletins and patch information for Microsoft products",
      enabled: true,
      updateFrequency: "daily",
      lastUpdated: "2023-10-15T06:15:00Z",
      status: "online",
      threatCount: 645,
      reliability: 95
    },
    {
      id: "ds-003",
      name: "ExploitDB",
      type: "exploit",
      description: "Archive of public exploits and corresponding vulnerable software",
      enabled: true,
      updateFrequency: "hourly",
      lastUpdated: "2023-10-15T12:45:00Z",
      status: "online",
      threatCount: 1283,
      reliability: 92
    },
    {
      id: "ds-004",
      name: "Krebs on Security",
      type: "research",
      description: "In-depth security news and investigation by Brian Krebs",
      enabled: false,
      updateFrequency: "daily",
      lastUpdated: "2023-10-14T15:20:00Z",
      status: "offline",
      threatCount: 156,
      reliability: 90
    },
    {
      id: "ds-005",
      name: "Cisco Security Advisories",
      type: "vendor",
      description: "Security advisories, alerts, and vulnerabilities for Cisco products",
      enabled: true,
      updateFrequency: "daily",
      lastUpdated: "2023-10-15T07:10:00Z",
      status: "online",
      threatCount: 412,
      reliability: 94
    },
    {
      id: "ds-006",
      name: "MITRE ATT&CK",
      type: "research",
      description: "Globally-accessible knowledge base of adversary tactics and techniques",
      enabled: true,
      updateFrequency: "weekly",
      lastUpdated: "2023-10-12T11:30:00Z",
      status: "online",
      threatCount: 756,
      reliability: 97
    },
    {
      id: "ds-007",
      name: "GitHub Security Lab",
      type: "exploit",
      description: "Collection of proof-of-concept exploits and security research",
      enabled: true,
      updateFrequency: "daily",
      lastUpdated: "2023-10-15T10:05:00Z",
      status: "online",
      threatCount: 498,
      reliability: 88
    },
    {
      id: "ds-008",
      name: "Custom RSS Feed",
      type: "custom",
      description: "Custom security feed from internal security team",
      enabled: true,
      updateFrequency: "hourly",
      lastUpdated: "2023-10-15T13:40:00Z",
      status: "error",
      threatCount: 64,
      reliability: 85
    },
  ]);

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Filter data sources based on search and active tab
  const filteredDataSources = dataSources.filter(source => {
    const matchesSearch = source.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          source.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "enabled") return matchesSearch && source.enabled;
    if (activeTab === "government") return matchesSearch && source.type === "government";
    if (activeTab === "vendor") return matchesSearch && source.type === "vendor";
    if (activeTab === "research") return matchesSearch && source.type === "research";
    if (activeTab === "exploit") return matchesSearch && source.type === "exploit";
    
    return matchesSearch;
  });

  const handleToggleSource = (sourceId: string) => {
    setDataSources(dataSources.map(source => 
      source.id === sourceId 
        ? { ...source, enabled: !source.enabled } 
        : source
    ));
    
    const source = dataSources.find(s => s.id === sourceId);
    if (source) {
      toast({
        title: source.enabled ? `${source.name} disabled` : `${source.name} enabled`,
        description: source.enabled 
          ? "This source will no longer be used for threat intelligence" 
          : "This source will now be used for threat intelligence",
      });
    }
  };

  const handleRefreshSource = (sourceId: string) => {
    toast({
      title: "Refreshing data source",
      description: "Fetching the latest data from this source",
    });
  };

  const handleAddDataSource = () => {
    toast({
      title: "Add custom data source",
      description: "Modal opens to configure a new threat intelligence feed",
    });
  };

  // Function to render status indicator
  const renderStatusIndicator = (status: DataSource["status"]) => {
    if (status === "online") {
      return (
        <span className="flex items-center text-green-600">
          <CheckCircle className="h-4 w-4 mr-1" />
          Online
        </span>
      );
    }
    if (status === "offline") {
      return (
        <span className="flex items-center text-gray-600">
          <XCircle className="h-4 w-4 mr-1" />
          Offline
        </span>
      );
    }
    return (
      <span className="flex items-center text-orange-600">
        <AlertCircle className="h-4 w-4 mr-1" />
        Error
      </span>
    );
  };

  // Function to render source type icon
  const renderSourceTypeIcon = (type: DataSource["type"]) => {
    const icons = {
      government: <Shield className="h-5 w-5 text-blue-500" />,
      vendor: <Server className="h-5 w-5 text-purple-500" />,
      research: <FileText className="h-5 w-5 text-green-500" />,
      exploit: <Code className="h-5 w-5 text-red-500" />,
      custom: <Globe className="h-5 w-5 text-gray-500" />
    };
    return icons[type];
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Threat Intelligence Sources</h1>
        <p className="text-muted-foreground">
          Manage and monitor the sources of your threat intelligence data
        </p>
      </div>
      
      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Data Source Manager</CardTitle>
                <CardDescription>
                  View, enable, and configure your threat intelligence feeds
                </CardDescription>
              </div>
              <Button onClick={handleAddDataSource}>
                <Plus className="mr-2 h-4 w-4" />
                Add Source
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search data sources..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="all" className="w-[500px]" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="enabled">Enabled</TabsTrigger>
                    <TabsTrigger value="government">Government</TabsTrigger>
                    <TabsTrigger value="vendor">Vendor</TabsTrigger>
                    <TabsTrigger value="research">Research</TabsTrigger>
                    <TabsTrigger value="exploit">Exploit DB</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-4">
                {filteredDataSources.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No data sources found. Try adjusting your search criteria.
                  </div>
                ) : (
                  filteredDataSources.map((source) => (
                    <div key={source.id} className="bg-card border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {renderSourceTypeIcon(source.type)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{source.name}</h3>
                              <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                {source.type.charAt(0).toUpperCase() + source.type.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{source.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>Updated: {formatTimestamp(source.lastUpdated)}</span>
                              </div>
                              <div className="flex items-center">
                                <Database className="h-3.5 w-3.5 mr-1" />
                                <span>{source.threatCount} threats</span>
                              </div>
                              <div>
                                {renderStatusIndicator(source.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-end gap-1">
                            <div className="text-xs text-muted-foreground">Reliability</div>
                            <div className="flex items-center gap-2">
                              <Progress value={source.reliability} className="w-24 h-2" />
                              <span className="text-xs font-medium">{source.reliability}%</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch 
                              checked={source.enabled} 
                              onCheckedChange={() => handleToggleSource(source.id)}
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleRefreshSource(source.id)}
                              disabled={!source.enabled}
                            >
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Refresh
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Feed Analytics</CardTitle>
              <CardDescription>
                View performance metrics for your data sources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="font-medium">Data Freshness (minutes since last update)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-500" />
                        <span>Government Sources</span>
                      </div>
                      <span className="font-medium">35</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-purple-500" />
                        <span>Vendor Sources</span>
                      </div>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        <span>Research Sources</span>
                      </div>
                      <span className="font-medium">76</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-red-500" />
                        <span>Exploit DBs</span>
                      </div>
                      <span className="font-medium">18</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="text-sm font-medium mb-1">Top Data Sources by Threats</div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>CISA Known Exploited Vulnerabilities</span>
                        <span>872 threats</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>ExploitDB</span>
                        <span>1283 threats</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span>Microsoft Security Advisories</span>
                        <span>645 threats</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>
                Monitor the status of your data integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">API Integrations</p>
                      <p className="text-xs text-muted-foreground">12 connections active</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="font-medium">Web Scrapers</p>
                      <p className="text-xs text-muted-foreground">3 of 5 active, 2 with errors</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">RSS Feeds</p>
                      <p className="text-xs text-muted-foreground">8 feeds syncing normally</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="p-3 border rounded-md bg-red-50">
                <div className="flex items-start gap-2">
                  <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800">Error: Custom RSS Feed</p>
                    <p className="text-sm text-red-600 mb-2">Connection timed out after 30 seconds</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive">Retry</Button>
                      <Button size="sm" variant="outline" className="bg-white">Configure</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-center text-muted-foreground pt-2">
                Last system check: Today at 14:30
                <Button size="sm" variant="link" className="px-1 h-auto">
                  Run check now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
