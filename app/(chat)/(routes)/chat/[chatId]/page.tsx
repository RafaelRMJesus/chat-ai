import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatClient from "./components/chat-client";

interface ChatIdPageProps {
  params: {
    chatId: string
  }
}

const ChatIdPage = async ({
  params
}: ChatIdPageProps) => {

  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const person = await prismadb.person.findUnique({
    where: {
      id: params.chatId
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc"
        },
        where: {
          userId
        }
      },
      _count: {
        select: {
          messages: true
        }
      }
    }
  });

  if (!person) {
    return redirect("/")
  }

  return (
    <ChatClient person={person} />
  );
}
 
export default ChatIdPage;