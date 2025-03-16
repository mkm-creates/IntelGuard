
import { useState, useEffect } from "react";
import { FilterBar } from "@/components/FilterBar";
import { Threat, ThreatCard, ThreatSeverity } from "@/components/ThreatCard";
import { EmailThreatButton } from "@/components/EmailThreatButton";

// Mock data for threats
const mockThreats: Threat[] = [
  {
    id: "1",
    cveId: "CVE-2023-1234",
    title: "Remote Code Execution Vulnerability in Microsoft Exchange Server",
    description:
      "A remote code execution vulnerability exists in Microsoft Exchange Server when the server fails to properly validate authentication attempts. An attacker who successfully exploited this vulnerability could run arbitrary code in the context of the System user.",
    severity: "critical",
    aiSummary:
      "This critical vulnerability allows attackers to execute malicious code remotely on Microsoft Exchange Servers without authentication. It affects all Exchange Server versions from 2013 to 2019. Organizations should prioritize patching immediately as active exploitation has been detected.",
    datePublished: "2023-07-15",
    source: "Microsoft",
    cvssScore: 9.8,
    affectedProducts: [
      "Exchange Server 2019",
      "Exchange Server 2016",
      "Exchange Server 2013",
    ],
  },
  {
    id: "2",
    cveId: "CVE-2023-5678",
    title: "SQL Injection Vulnerability in Oracle Database",
    description:
      "A SQL injection vulnerability exists in Oracle Database that allows remote attackers to execute arbitrary SQL commands via specially crafted input parameters. This vulnerability affects the authentication component of Oracle Database.",
    severity: "high",
    aiSummary:
      "This high-severity SQL injection vulnerability affects Oracle Database versions 12c, 19c, and 21c. It allows attackers to bypass authentication, access sensitive data, or execute database commands. Oracle has released patches in their July Critical Patch Update.",
    datePublished: "2023-07-18",
    source: "Oracle",
    cvssScore: 8.4,
    affectedProducts: ["Oracle Database 21c", "Oracle Database 19c", "Oracle Database 12c"],
  },
  {
    id: "3",
    cveId: "CVE-2023-9012",
    title: "Authentication Bypass in Cisco IOS XE Software",
    description:
      "A vulnerability in the authentication mechanism of Cisco IOS XE Software could allow an unauthenticated, remote attacker to bypass authentication and gain unauthorized access to the affected system.",
    severity: "critical",
    aiSummary:
      "This critical vulnerability allows attackers to bypass authentication in Cisco IOS XE Software without requiring credentials. It affects multiple Cisco router and switch product lines. Cisco has confirmed active exploitation in the wild, making immediate patching essential.",
    datePublished: "2023-07-12",
    source: "Cisco",
    cvssScore: 9.6,
    affectedProducts: [
      "Cisco IOS XE Software",
      "Cisco Catalyst 9000 Series Switches",
      "Cisco ASR 1000 Series Routers",
    ],
  },
  {
    id: "4",
    cveId: "CVE-2023-3456",
    title: "Kernel Vulnerability in Linux Systems",
    description:
      "A vulnerability in the Linux kernel could allow a local attacker to escalate privileges. This vulnerability affects the memory management subsystem and can lead to complete system compromise.",
    severity: "high",
    aiSummary:
      "This high-severity vulnerability in the Linux kernel's memory management subsystem allows local users to escalate privileges to root. It affects all Linux kernels from version 5.4 to 6.1. Various distributions have released patches, and users should update immediately.",
    datePublished: "2023-07-05",
    source: "Linux",
    cvssScore: 7.8,
    affectedProducts: [
      "Linux Kernel 6.1",
      "Linux Kernel 5.15",
      "Linux Kernel 5.10",
      "Linux Kernel 5.4",
    ],
  },
  {
    id: "5",
    cveId: "CVE-2023-7890",
    title: "Cross-site Scripting Vulnerability in WordPress Plugin",
    description:
      "A cross-site scripting (XSS) vulnerability in the popular WordPress plugin 'Contact Form 7' allows attackers to inject malicious scripts that execute when users view the affected page.",
    severity: "medium",
    aiSummary:
      "This medium-severity XSS vulnerability affects the Contact Form 7 WordPress plugin versions prior to 5.7.2. It allows attackers to inject JavaScript that executes in users' browsers, potentially stealing cookies or performing actions on behalf of authenticated users.",
    datePublished: "2023-07-20",
    source: "WordPress",
    cvssScore: 6.1,
    affectedProducts: ["WordPress", "Contact Form 7 Plugin"],
  },
  {
    id: "6",
    cveId: "CVE-2023-2468",
    title: "Buffer Overflow in Adobe Acrobat Reader",
    description:
      "A buffer overflow vulnerability in Adobe Acrobat Reader allows attackers to execute arbitrary code via a specially crafted PDF document.",
    severity: "critical",
    aiSummary:
      "This critical buffer overflow vulnerability affects all versions of Adobe Acrobat Reader prior to 2023.003.20244. When a user opens a malicious PDF, attackers can execute arbitrary code with the privileges of the current user. Adobe recommends immediate updating.",
    datePublished: "2023-07-11",
    source: "Adobe",
    cvssScore: 9.3,
    affectedProducts: ["Adobe Acrobat Reader DC", "Adobe Acrobat Reader 2020", "Adobe Acrobat Reader 2017"],
  },
  {
    id: "7",
    cveId: "CVE-2023-6543",
    title: "API Authentication Flaw in Salesforce Commerce Cloud",
    description:
      "An authentication flaw in the Salesforce Commerce Cloud API could allow attackers to access sensitive customer data without proper authentication.",
    severity: "high",
    aiSummary:
      "This high-severity vulnerability in Salesforce Commerce Cloud's API authentication system could allow attackers to access customer data, including personal and payment information. The flaw affects versions prior to Summer '23 Release. Salesforce has released patches and recommends immediate updating.",
    datePublished: "2023-07-08",
    source: "Salesforce",
    cvssScore: 8.2,
    affectedProducts: ["Salesforce Commerce Cloud"],
  },
  {
    id: "8",
    cveId: "CVE-2023-8765",
    title: "Denial of Service Vulnerability in Apache Tomcat",
    description:
      "A denial of service vulnerability in Apache Tomcat allows attackers to cause resource exhaustion via specially crafted HTTP requests.",
    severity: "medium",
    aiSummary:
      "This medium-severity DoS vulnerability affects Apache Tomcat versions 9.0.0 through 9.0.73. Attackers can send specially crafted HTTP requests that cause resource exhaustion, making the server unresponsive. Apache has released a patch in version 9.0.74 and recommends updating.",
    datePublished: "2023-07-17",
    source: "Apache",
    cvssScore: 6.5,
    affectedProducts: ["Apache Tomcat 9.0", "Apache Tomcat 8.5", "Apache Tomcat 7.0"],
  },
];

const ThreatFeed = () => {
  // Load settings from localStorage if they exist
  const loadSettings = () => {
    try {
      const settings = localStorage.getItem("threatFeedSettings");
      if (settings) {
        const parsedSettings = JSON.parse(settings);
        setSeverityFilter(parsedSettings.defaultSeverityFilter);
        setSourceFilter(parsedSettings.defaultSourceFilter);
        setTimeFilter(parsedSettings.defaultTimeFilter);
        return parsedSettings;
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
    return null;
  };

  const [severityFilter, setSeverityFilter] = useState<ThreatSeverity | "all">("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedView, setExpandedView] = useState(false);

  useEffect(() => {
    const settings = loadSettings();
    if (settings) {
      setExpandedView(settings.expandedView);
    }
  }, []);

  // Filter threats based on selected filters
  const filteredThreats = mockThreats.filter((threat) => {
    // Apply severity filter
    if (severityFilter !== "all" && threat.severity !== severityFilter) {
      return false;
    }
    
    // Apply source filter
    if (sourceFilter !== "all" && threat.source.toLowerCase() !== sourceFilter) {
      return false;
    }
    
    // Apply time filter (for demo, we're not actually filtering by time)
    // In a real app, you would compare dates
    
    return true;
  });

  return (
    <div className="container px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-3 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Threat Feed</h1>
        <p className="text-muted-foreground">
          Browse and analyze the latest security threats and vulnerabilities
        </p>
      </div>
      
      <FilterBar
        severityFilter={severityFilter}
        sourceFilter={sourceFilter}
        timeFilter={timeFilter}
        onSeverityChange={setSeverityFilter}
        onSourceChange={setSourceFilter}
        onTimeChange={setTimeFilter}
      />
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-muted/30 h-64 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {selectedThreat ? (
            <div className="mb-6">
              <button
                onClick={() => setSelectedThreat(null)}
                className="text-sm hover:underline mb-4 inline-flex items-center"
              >
                ← Back to all threats
              </button>
              <div className="mb-4">
                <EmailThreatButton 
                  threat={mockThreats.find((t) => t.id === selectedThreat)!} 
                />
              </div>
              <ThreatCard
                threat={mockThreats.find((t) => t.id === selectedThreat)!}
                expanded={true}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-animate">
              {filteredThreats.length > 0 ? (
                filteredThreats.map((threat) => (
                  <div key={threat.id} className="flex flex-col">
                    <ThreatCard
                      threat={threat}
                      onClick={() => setSelectedThreat(threat.id)}
                      expanded={expandedView}
                    />
                    {expandedView && (
                      <div className="mt-2">
                        <EmailThreatButton threat={threat} />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">
                    No threats found matching your filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ThreatFeed;
