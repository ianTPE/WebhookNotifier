import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Send } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const triggerWebhook = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to send webhook');
      }

      toast({
        title: "Success!",
        description: "Message sent to Make.com",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message to Make.com",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Webhook Trigger</CardTitle>
          <CardDescription>
            Click the button below to send "Hello World!" to Make.com
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            size="lg"
            onClick={triggerWebhook}
            disabled={isLoading}
            className="w-48"
          >
            <Send className="mr-2 h-5 w-5" />
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}