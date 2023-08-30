"use client"

import { ChatHeader } from "@/components/chat-header";
import { Message, Person } from "@prisma/client";

interface ChatClientProps {
  person: Person & {
    messages: Message[];
    _count: {
      messages: number
    },
  };
}

const ChatClient = ({
  person
}: ChatClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader person={person} />
    </div>
  );
}
 
export default ChatClient;