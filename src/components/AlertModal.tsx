
import { useState, useEffect } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Threat } from "@/components/ThreatCard";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail } from "lucide-react";

interface AlertModalProps {
  threat: Threat | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AlertModal({ threat, open, onOpenChange }: AlertModalProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recipients, setRecipients] = useState("security-team@company.com, ciso@company.com");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [includeActions, setIncludeActions] = useState(true);
  const [includeRecommendations, setIncludeRecommendations] = useState(true);

  // Generate AI email content when threat changes or modal opens
  useEffect(() => {
    if (threat) {
      // In a real app, this would be an AI-generated email based on the threat
      setEmailSubject(`[SECURITY ALERT] ${threat.severity.toUpperCase()}: ${threat.title}`);
      
      const recommendations = 
        threat.severity === "critical" 
          ? "1. Apply vendor patch immediately\n2. Implement temporary mitigations\n3. Monitor for suspicious activity\n4. Consider isolating affected systems"
          : "1. Plan for patching within the next maintenance window\n2. Monitor for suspicious activity\n3. Update threat signatures";
      
      setEmailContent(
        `Dear Team,\n\nA ${threat.severity} security vulnerability has been identified that affects our systems:\n\n` +
        `${threat.cveId}: ${threat.title}\n\n` +
        `${threat.aiSummary}\n\n` +
        `Affected Products: ${threat.affectedProducts.join(", ")}\n` +
        `CVSS Score: ${threat.cvssScore}\n` +
        `Source: ${threat.source}\n` +
        `Published: ${threat.datePublished}\n\n` +
        `Recommended Actions:\n${recommendations}\n\n` +
        `For more details, please reference the full advisory in our ThreatBeam platform.\n\n` +
        `Regards,\nSecurity Operations Team`
      );
    }
  }, [threat, open]);

  const handleSendAlert = async () => {
    setIsLoading(true);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    onOpenChange(false);
    
    toast({
      title: "Alert sent successfully",
      description: `Email alert about ${threat?.cveId} sent to ${recipients.split(",").length} recipient(s)`,
    });
  };

  if (!threat) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[635px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Send Security Alert</DialogTitle>
          <DialogDescription>
            Send an AI-generated email alert about this vulnerability to your team
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-3">
          <div className="grid gap-2">
            <Label htmlFor="recipients">Recipients (comma separated)</Label>
            <Input
              id="recipients"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              placeholder="email1@example.com, email2@example.com"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="content">Email Content</Label>
            <Textarea
              id="content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              rows={12}
              className="resize-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-actions" 
                checked={includeActions}
                onCheckedChange={(checked) => setIncludeActions(!!checked)}
              />
              <Label htmlFor="include-actions">Include action items</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="include-recommendations" 
                checked={includeRecommendations}
                onCheckedChange={(checked) => setIncludeRecommendations(!!checked)}
              />
              <Label htmlFor="include-recommendations">Include recommendations</Label>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSendAlert} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Alert
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
