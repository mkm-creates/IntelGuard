
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { AlertSettings } from "@/components/AlertSettings";
import { Sliders, User, Mail, Bell, Shield, Eye } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [dashboardSettings, setDashboardSettings] = useState({
    showCriticalThreats: true,
    showActiveExploits: true,
    showResolvedThreats: true,
    showDataSources: true,
    threatActivityPeriod: "30",
    refreshInterval: "5",
  });
  
  const [threatFeedSettings, setThreatFeedSettings] = useState({
    defaultSeverityFilter: "all",
    defaultSourceFilter: "all",
    defaultTimeFilter: "all",
    cardsPerPage: "9",
    expandedView: false,
  });
  
  const [profileSettings, setProfileSettings] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    organization: "Acme Inc.",
    role: "Security Analyst",
  });

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to a database
    localStorage.setItem("dashboardSettings", JSON.stringify(dashboardSettings));
    localStorage.setItem("threatFeedSettings", JSON.stringify(threatFeedSettings));
    localStorage.setItem("profileSettings", JSON.stringify(profileSettings));
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleResetSettings = () => {
    // Reset to defaults
    setDashboardSettings({
      showCriticalThreats: true,
      showActiveExploits: true,
      showResolvedThreats: true,
      showDataSources: true,
      threatActivityPeriod: "30",
      refreshInterval: "5",
    });
    
    setThreatFeedSettings({
      defaultSeverityFilter: "all",
      defaultSourceFilter: "all",
      defaultTimeFilter: "all",
      cardsPerPage: "9",
      expandedView: false,
    });
    
    toast({
      title: "Settings reset",
      description: "Your preferences have been reset to default values.",
    });
  };

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-3 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Customize your threat intelligence dashboard experience
        </p>
      </div>
      
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full max-w-2xl">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="threats" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Threat Feed</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="visibility" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Visibility</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard Layout</CardTitle>
              <CardDescription>
                Control which metrics and charts appear on your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="critical-threats">Show Critical Threats</Label>
                  <Switch 
                    id="critical-threats" 
                    checked={dashboardSettings.showCriticalThreats}
                    onCheckedChange={(checked) => 
                      setDashboardSettings({...dashboardSettings, showCriticalThreats: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="active-exploits">Show Active Exploits</Label>
                  <Switch 
                    id="active-exploits" 
                    checked={dashboardSettings.showActiveExploits}
                    onCheckedChange={(checked) => 
                      setDashboardSettings({...dashboardSettings, showActiveExploits: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="resolved-threats">Show Resolved Threats</Label>
                  <Switch 
                    id="resolved-threats" 
                    checked={dashboardSettings.showResolvedThreats}
                    onCheckedChange={(checked) => 
                      setDashboardSettings({...dashboardSettings, showResolvedThreats: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-sources">Show Data Sources</Label>
                  <Switch 
                    id="data-sources" 
                    checked={dashboardSettings.showDataSources}
                    onCheckedChange={(checked) => 
                      setDashboardSettings({...dashboardSettings, showDataSources: checked})
                    }
                  />
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="activity-period">Threat Activity Period (Days)</Label>
                    <Select 
                      value={dashboardSettings.threatActivityPeriod}
                      onValueChange={(value) => 
                        setDashboardSettings({...dashboardSettings, threatActivityPeriod: value})
                      }
                    >
                      <SelectTrigger id="activity-period">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refresh-interval">Auto-refresh Interval (minutes)</Label>
                    <Select 
                      value={dashboardSettings.refreshInterval}
                      onValueChange={(value) => 
                        setDashboardSettings({...dashboardSettings, refreshInterval: value})
                      }
                    >
                      <SelectTrigger id="refresh-interval">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 minute</SelectItem>
                        <SelectItem value="5">5 minutes</SelectItem>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="threats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Threat Feed Preferences</CardTitle>
              <CardDescription>
                Customize how threats are displayed in your feed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-severity">Default Severity Filter</Label>
                  <Select 
                    value={threatFeedSettings.defaultSeverityFilter}
                    onValueChange={(value) => 
                      setThreatFeedSettings({...threatFeedSettings, defaultSeverityFilter: value})
                    }
                  >
                    <SelectTrigger id="default-severity">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical Only</SelectItem>
                      <SelectItem value="high">High & Critical</SelectItem>
                      <SelectItem value="medium">Medium & Above</SelectItem>
                      <SelectItem value="low">Low & Above</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-source">Default Source Filter</Label>
                  <Select 
                    value={threatFeedSettings.defaultSourceFilter}
                    onValueChange={(value) => 
                      setThreatFeedSettings({...threatFeedSettings, defaultSourceFilter: value})
                    }
                  >
                    <SelectTrigger id="default-source">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sources</SelectItem>
                      <SelectItem value="microsoft">Microsoft</SelectItem>
                      <SelectItem value="cisco">Cisco</SelectItem>
                      <SelectItem value="oracle">Oracle</SelectItem>
                      <SelectItem value="adobe">Adobe</SelectItem>
                      <SelectItem value="linux">Linux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-time">Default Time Filter</Label>
                  <Select 
                    value={threatFeedSettings.defaultTimeFilter}
                    onValueChange={(value) => 
                      setThreatFeedSettings({...threatFeedSettings, defaultTimeFilter: value})
                    }
                  >
                    <SelectTrigger id="default-time">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cards-per-page">Cards Per Page</Label>
                  <Select 
                    value={threatFeedSettings.cardsPerPage}
                    onValueChange={(value) => 
                      setThreatFeedSettings({...threatFeedSettings, cardsPerPage: value})
                    }
                  >
                    <SelectTrigger id="cards-per-page">
                      <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 cards</SelectItem>
                      <SelectItem value="9">9 cards</SelectItem>
                      <SelectItem value="12">12 cards</SelectItem>
                      <SelectItem value="15">15 cards</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <Label htmlFor="expanded-view">Use Expanded View by Default</Label>
                <Switch 
                  id="expanded-view" 
                  checked={threatFeedSettings.expandedView}
                  onCheckedChange={(checked) => 
                    setThreatFeedSettings({...threatFeedSettings, expandedView: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="space-y-6">
          <AlertSettings />
        </TabsContent>
        
        <TabsContent value="visibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visibility & Data Access</CardTitle>
              <CardDescription>
                Control which threat intelligence sources are visible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">CISA Feeds</Label>
                    <p className="text-sm text-muted-foreground">U.S. Cybersecurity & Infrastructure Security Agency</p>
                  </div>
                  <Switch defaultChecked id="cisa-feeds" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">NVD Database</Label>
                    <p className="text-sm text-muted-foreground">National Vulnerability Database</p>
                  </div>
                  <Switch defaultChecked id="nvd-database" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">MS-ISAC</Label>
                    <p className="text-sm text-muted-foreground">Multi-State Information Sharing & Analysis Center</p>
                  </div>
                  <Switch defaultChecked id="ms-isac" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Vendor Advisories</Label>
                    <p className="text-sm text-muted-foreground">Direct feeds from Microsoft, Cisco, Adobe, etc.</p>
                  </div>
                  <Switch defaultChecked id="vendor-advisories" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Security Research Blogs</Label>
                    <p className="text-sm text-muted-foreground">Curated content from major security researchers</p>
                  </div>
                  <Switch defaultChecked id="research-blogs" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile and organization details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings({...profileSettings, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({...profileSettings, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input 
                    id="organization"
                    value={profileSettings.organization}
                    onChange={(e) => setProfileSettings({...profileSettings, organization: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input 
                    id="role"
                    value={profileSettings.role}
                    onChange={(e) => setProfileSettings({...profileSettings, role: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-4 mt-8">
        <Button variant="outline" onClick={handleResetSettings}>
          Reset to Default
        </Button>
        <Button onClick={handleSaveSettings}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;
