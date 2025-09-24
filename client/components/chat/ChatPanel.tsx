import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ChatMessage {
  id: string;
  from: "client" | "advisor";
  text: string;
  ts: number;
}

interface Props {
  role: "client" | "advisor";
  initial?: ChatMessage[];
  recipientOnline?: boolean; // if false, auto-reply that advisor is offline
}

export function ChatPanel({ role, initial = [], recipientOnline = true }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initial);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  function send() {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), from: role, text: text.trim(), ts: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setText("");

    // If client sends to an offline advisor, add an automatic system reply
    if (role === "client" && !recipientOnline) {
      const sysMsg: ChatMessage = {
        id: crypto.randomUUID(),
        from: "advisor",
        text: "Advisor is currently offline. They will respond when available.",
        ts: Date.now() + 1,
      };
      // slight delay to simulate reply
      setTimeout(() => setMessages((prev) => [...prev, sysMsg]), 500);
    }
  }

  return (
    <div className="flex h-[400px] flex-col rounded-lg border">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === role ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[70%] rounded-md px-3 py-2 text-sm ${m.from === role ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex gap-2 border-t p-3">
        <Input placeholder="Type a message" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} />
        <Button onClick={send}>Send</Button>
      </div>
    </div>
  );
}
