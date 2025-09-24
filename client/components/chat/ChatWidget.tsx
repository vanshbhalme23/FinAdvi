import React, { useState } from "react";
import { ChatPanel } from "./ChatPanel";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";
import { isAdvisorOnline } from "@/lib/online";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // detect advisor id in path /advisors/:id
  let advisorId: string | undefined;
  const match = location.pathname.match(/^\/advisors\/(.+)$/);
  if (match) advisorId = match[1];

  const recipientOnline = isAdvisorOnline(advisorId);

  return (
    <div aria-live="polite">
      {open && (
        <div className="fixed right-4 bottom-24 z-50 w-96 max-w-full">
          <div className="rounded-lg shadow-lg bg-background p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">Support Chat</div>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
                <X />
              </Button>
            </div>
            <ChatPanel role={user?.role === "advisor" ? "advisor" : "client"} recipientOnline={recipientOnline} />
          </div>
        </div>
      )}

      <div className="fixed right-4 bottom-4 z-50">
        <Button onClick={() => setOpen((s) => !s)} aria-label="Open chat" className="flex items-center gap-2">
          <MessageSquare />
          <span className="hidden sm:inline">Chat</span>
        </Button>
      </div>
    </div>
  );
}
