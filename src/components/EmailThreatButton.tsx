
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/AlertModal";
import { Threat } from "@/components/ThreatCard";
import { Mail } from "lucide-react";
import { useState } from "react";

interface EmailThreatButtonProps {
  threat: Threat;
}

export function EmailThreatButton({ threat }: EmailThreatButtonProps) {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        className="w-full"
        onClick={() => setAlertModalOpen(true)}
      >
        <Mail className="mr-2 h-4 w-4" />
        Send Alert
      </Button>
      
      <AlertModal 
        threat={threat}
        open={alertModalOpen}
        onOpenChange={setAlertModalOpen}
      />
    </>
  );
}
