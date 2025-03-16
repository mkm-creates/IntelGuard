
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AlertSettings() {
  const [emailSettings, setEmailSettings] = useState({
    enableAlerts: true,
    criticalOnly: false,
    dailyDigest: true,
    emailRecipients: "security-team@company.com, ciso@company.com",
    emailTemplate: "Dear {recipient},\n\nThis is an automated security alert from ThreatBeam.\n\n{threatDetails}\n\nSeverity: {severity}\nCVSS Score: {cvssScore}\nAffected Products: {affectedProducts}\n\nRecommended Actions:\n{recommendations}\n\nRegards,\nThreatBeam Security Intelligence"
  });

  const handleEmailSettingsChange = (key: string, value: string | boolean) => {
    setEmailSettings({
      ...emailSettings,
      [key]: value
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Email Alert Settings</CardTitle>
          <CardDescription>
            Configure how and when you receive alerts about new threats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-alerts">Enable Email Alerts</Label>
              <Switch 
                id="enable-alerts" 
                checked={emailSettings.enableAlerts}
                onCheckedChange={(checked) => handleEmailSettingsChange("enableAlerts", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="critical-only">Critical Vulnerabilities Only</Label>
              <Switch 
                id="critical-only" 
                checked={emailSettings.criticalOnly}
                onCheckedChange={(checked) => handleEmailSettingsChange("criticalOnly", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="daily-digest">Daily Summary Digest</Label>
              <Switch 
                id="daily-digest" 
                checked={emailSettings.dailyDigest}
                onCheckedChange={(checked) => handleEmailSettingsChange("dailyDigest", checked)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email-recipients">Email Recipients (comma separated)</Label>
            <Textarea 
              id="email-recipients" 
              value={emailSettings.emailRecipients}
              onChange={(e) => handleEmailSettingsChange("emailRecipients", e.target.value)}
              placeholder="email1@example.com, email2@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email-template">Email Template</Label>
            <div className="text-xs text-muted-foreground mb-2">
              Use placeholders: {"{recipient}"}, {"{threatDetails}"}, {"{severity}"}, {"{cvssScore}"}, {"{affectedProducts}"}, {"{recommendations}"}
            </div>
            <Textarea 
              id="email-template" 
              value={emailSettings.emailTemplate}
              onChange={(e) => handleEmailSettingsChange("emailTemplate", e.target.value)}
              placeholder="Email template with placeholders"
              rows={10}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Alert Rules</CardTitle>
          <CardDescription>
            Create custom alert rules for specific products or vendors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor-rule">Vendor/Product</Label>
                <Select defaultValue="microsoft">
                  <SelectTrigger id="vendor-rule">
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="microsoft">Microsoft</SelectItem>
                    <SelectItem value="cisco">Cisco</SelectItem>
                    <SelectItem value="adobe">Adobe</SelectItem>
                    <SelectItem value="oracle">Oracle</SelectItem>
                    <SelectItem value="linux">Linux</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="severity-rule">Minimum Severity</Label>
                <Select defaultValue="high">
                  <SelectTrigger id="severity-rule">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 flex items-end">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium w-full">
                  Add Rule
                </button>
              </div>
            </div>
            
            <div className="border rounded-md divide-y">
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">Microsoft Windows</p>
                  <p className="text-sm text-muted-foreground">Critical & High severity</p>
                </div>
                <button className="text-destructive text-sm hover:underline">Remove</button>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">Adobe Acrobat</p>
                  <p className="text-sm text-muted-foreground">Critical severity only</p>
                </div>
                <button className="text-destructive text-sm hover:underline">Remove</button>
              </div>
              <div className="p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">Linux Kernel</p>
                  <p className="text-sm text-muted-foreground">All severities</p>
                </div>
                <button className="text-destructive text-sm hover:underline">Remove</button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
