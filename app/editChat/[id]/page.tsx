import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditChatForm from "@/components/ui/EditChatForm";

interface Chat {
  name: string;
}

interface EditTopicProps {
  params: {
    id: string;
  };
}

const getChatById = async (id: string): Promise<Chat> => {
  try {
    const res = await fetch(`http://localhost:3001/api/chats/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch chat");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return { name: "" }; // Return empty name in case of error
  }
};

export default function EditTopic({ params }: EditTopicProps) {
  const { id } = params;
  const [chat, setChat] = useState<Chat>({ name: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchChat = async () => {
      const chatData = await getChatById(id);
      setChat(chatData);
    };

    fetchChat();
  }, [id]);

  return <EditChatForm id={id} name={chat.name} />;
}
