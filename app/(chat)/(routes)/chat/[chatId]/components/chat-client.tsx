"use client"

import { ChatHeader } from "@/components/chat-header";
import { Message, Person } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import  { useCompletion }  from "ai/react"
import { ChatForm } from "@/components/chat-form";
import { ChatMessages } from "@/components/chat-messages";

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

    const router = useRouter();
    const [messages, setMessages] = useState<any[]>(person.messages)

    const {
      input,
      isLoading,
      handleInputChange,
      handleSubmit,
      setInput,
    } = useCompletion({
      api: `/api/chat/${person.id}`,
      onFinish(prompt, completion) {
        const systemMessage = {
          role: "system",
          content: completion
        }

        setMessages((current => [...current, systemMessage]))
        setInput("");

        router.refresh();
      }
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      const userMessage = {
        role: "user",
        content: input,
      }

      setMessages((current) => [...current, userMessage])
      handleSubmit(e);
    }


  return (
    <div className="flex flex-col h-full p-4 space-y-2">
      <ChatHeader person={person} />
      <ChatMessages 
        person={person}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm 
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
 
export default ChatClient;