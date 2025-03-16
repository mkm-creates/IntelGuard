
import { Activity, AlertTriangle, ArrowRight, ExternalLink, FileText, Mail, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThreatCard, Threat } from "@/components/ThreatCard";

// Sample featured threats
const featuredThreats: Threat[] = [
  {
    id: "1",
    cveId: "CVE-2023-1234",
    title: "Remote Code Execution Vulnerability in Microsoft Exchange Server",
    description: "A remote code execution vulnerability exists in Microsoft Exchange Server...",
    severity: "critical",
    aiSummary: "This critical vulnerability allows attackers to execute malicious code remotely...",
    datePublished: "2023-07-15",
    source: "Microsoft",
    cvssScore: 9.8,
    affectedProducts: ["Exchange Server 2019", "Exchange Server 2016", "Exchange Server 2013"],
  },
  {
    id: "3",
    cveId: "CVE-2023-9012",
    title: "Authentication Bypass in Cisco IOS XE Software",
    description: "A vulnerability in the authentication mechanism of Cisco IOS XE Software...",
    severity: "critical",
    aiSummary: "This critical vulnerability allows attackers to bypass authentication in Cisco IOS XE Software...",
    datePublished: "2023-07-12",
    source: "Cisco",
    cvssScore: 9.6,
    affectedProducts: ["Cisco IOS XE Software", "Cisco Catalyst 9000 Series Switches", "Cisco ASR 1000 Series Routers"],
  },
];

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="glass-panel rounded-xl p-6 hover:shadow-lg transition-all duration-300"
  >
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium mb-2">
              <span className="flex h-2 w-2 rounded-full bg-severity-critical mr-2"></span>
              <span>Monitoring 1,387 active threats</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Stay Ahead of Emerging <span className="text-primary">Cyber Threats</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by AI, ThreatBeam aggregates and analyzes threat intelligence from trusted sources, delivering actionable insights for your security team.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Activity size={18} />
                <span>Go to Dashboard</span>
              </Link>
              
              <Link
                to="/threats"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <AlertTriangle size={18} />
                <span>View Threat Feed</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Key Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-3xl font-bold mb-4"
            >
              Key Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xl text-muted-foreground"
            >
              Everything you need to monitor and respond to cyber threats
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={AlertTriangle}
              title="Aggregated Intelligence"
              description="Collect and normalize threat data from vendor advisories, government feeds, and security researchers."
            />
            
            <FeatureCard
              icon={Activity}
              title="Real-time Monitoring"
              description="Stay informed with continuous updates and alerts for emerging threats affecting your technology stack."
            />
            
            <FeatureCard
              icon={Shield}
              title="AI-Powered Analysis"
              description="Get context and risk assessments with AI-generated summaries tailored to your environment."
            />
            
            <FeatureCard
              icon={FileText}
              title="Custom Reports"
              description="Generate detailed reports for executives, compliance, and security teams with one click."
            />
            
            <FeatureCard
              icon={Mail}
              title="Automated Alerts"
              description="Configure notifications based on severity, affected products, or custom parameters."
            />
            
            <FeatureCard
              icon={ExternalLink}
              title="Vendor Integration"
              description="Connect directly with your security tools for streamlined workflows and remediation."
            />
          </div>
        </div>
      </section>
      
      {/* Featured Threats */}
      <section className="py-20">
        <div className="container px-4 max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold mb-2"
              >
                Critical Threats
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-muted-foreground"
              >
                The most severe vulnerabilities requiring immediate attention
              </motion.p>
            </div>
            
            <Link
              to="/threats"
              className="inline-flex items-center text-primary hover:underline"
            >
              <span>View all threats</span>
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredThreats.map((threat) => (
              <ThreatCard
                key={threat.id}
                threat={threat}
                onClick={() => {}}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container px-4 max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold mb-4"
          >
            Ready to secure your organization?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xl mb-8 opacity-90"
          >
            Start monitoring and analyzing threats with ThreatBeam today
          </motion.p>
          
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-medium transition-colors hover:bg-white/90"
          >
            <Shield size={18} />
            <span>Get Started</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
