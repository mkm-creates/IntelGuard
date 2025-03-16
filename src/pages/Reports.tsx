
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
  FileText, 
  Download, 
  Calendar, 
  BarChart, 
  Clock, 
  Plus, 
  Mail, 
  RefreshCcw, 
  Search 
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Report type definition
interface Report {
  id: string;
  title: string;
  description: string;
  type: "ai" | "custom";
  createdAt: string;
  format: "weekly" | "monthly" | "custom";
  status: "generated" | "scheduled";
}

export default function Reports() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Sample reports data
  const [reports, setReports] = useState<Report[]>([
    {
      id: "rep-001",
      title: "Weekly Threat Intelligence Summary",
      description: "AI-generated overview of critical and high severity threats from the past week",
      type: "ai",
      createdAt: "2023-10-15",
      format: "weekly",
      status: "generated"
    },
    {
      id: "rep-002",
      title: "Finance Industry Risk Report",
      description: "Industry-specific vulnerability analysis for financial organizations",
      type: "ai",
      createdAt: "2023-10-10",
      format: "monthly",
      status: "generated"
    },
    {
      id: "rep-003",
      title: "Microsoft Windows Vulnerabilities",
      description: "Custom report focusing on recent Windows Server and Desktop vulnerabilities",
      type: "custom",
      createdAt: "2023-10-05",
      format: "custom",
      status: "generated"
    },
    {
      id: "rep-004",
      title: "Emerging Ransomware Threats",
      description: "Analysis of new ransomware variants and attack vectors",
      type: "ai",
      createdAt: "2023-10-01",
      format: "monthly",
      status: "scheduled"
    },
  ]);

  // Filter reports based on search and active tab
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "ai") return matchesSearch && report.type === "ai";
    if (activeTab === "custom") return matchesSearch && report.type === "custom";
    if (activeTab === "scheduled") return matchesSearch && report.status === "scheduled";
    
    return matchesSearch;
  });

  const handleGenerateReport = () => {
    // In a real app, this would open a modal to configure the report
    toast({
      title: "Generating new report",
      description: "Your custom report is being prepared",
    });
  };

  const handleExportReport = (reportId: string, format: string) => {
    toast({
      title: `Exporting report as ${format.toUpperCase()}`,
      description: "Your report will be downloaded shortly",
    });
  };

  const handleEmailReport = (reportId: string) => {
    toast({
      title: "Report shared via email",
      description: "Your report has been sent to the security team",
    });
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Threat Intelligence Reports</h1>
        <p className="text-muted-foreground">
          Generate, customize, and export security reports for your organization
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Report Library</CardTitle>
                <CardDescription>
                  Access your generated and scheduled reports
                </CardDescription>
              </div>
              <Button onClick={handleGenerateReport}>
                <Plus className="mr-2 h-4 w-4" />
                New Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Tabs defaultValue="all" className="w-[400px]" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="ai">AI Generated</TabsTrigger>
                    <TabsTrigger value="custom">Custom</TabsTrigger>
                    <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-4">
                {filteredReports.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No reports found. Try adjusting your search or create a new report.
                  </div>
                ) : (
                  filteredReports.map((report) => (
                    <div key={report.id} className="bg-card border rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium flex items-center">
                            {report.type === "ai" ? (
                              <FileText className="h-4 w-4 mr-2 text-blue-500" />
                            ) : (
                              <FileText className="h-4 w-4 mr-2 text-green-500" />
                            )}
                            {report.title}
                            {report.status === "scheduled" && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                                Scheduled
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleExportReport(report.id, 'pdf')}>
                            <Download className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEmailReport(report.id)}>
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>Created: {report.createdAt}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {report.format === "weekly" ? "Weekly Report" : 
                           report.format === "monthly" ? "Monthly Report" : "Custom Report"}
                        </span>
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
              <CardTitle>Predefined AI Reports</CardTitle>
              <CardDescription>
                Auto-generated intelligence reports based on latest threats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 border rounded-lg p-4 shadow-sm flex gap-3">
                <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <BarChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Weekly Threat Summary</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive analysis of threats from the past week</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <RefreshCcw className="h-3.5 w-3.5 mr-2" />
                    Generate Now
                  </Button>
                </div>
              </div>
              
              <div className="bg-primary/5 border rounded-lg p-4 shadow-sm flex gap-3">
                <div className="bg-primary/10 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Monthly Industry Report</h3>
                  <p className="text-sm text-muted-foreground">Industry-specific vulnerability analysis and trends</p>
                  <Button size="sm" variant="outline" className="mt-2">
                    <RefreshCcw className="h-3.5 w-3.5 mr-2" />
                    Generate Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Report Builder</CardTitle>
              <CardDescription>
                Create tailored reports with specific threats and timeframes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center">
                <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium mb-2">Create Custom Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Select specific threats, vendors, and timeframes to generate a custom report
                </p>
                <Button onClick={handleGenerateReport}>Start Building</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
