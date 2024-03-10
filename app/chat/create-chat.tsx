import React, { useState, useEffect } from 'react';
import axios from 'axios';
import prismadb from "@/lib/prismadb";

interface Chat {
  id: string;
  name: string;
}

type Props = {
  chats: Chat[];
}

const ChatApp: React.FC<Props> = ({ chats }) => {
  const [newChatName, setNewChatName] = useState<string>('');
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      console.log("fetching");
      const chatsResponse = await fetch('http://localhost:3000/api/chat' , {
        cache: "no-store",
      });
      const chatsData = await chatsResponse.json();
      if (chatsResponse.ok) {
        setCurrentChat(chatsData);
      } else {
        console.error('Failed to fetch chats:', chatsData.message);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const createChat = async () => {
    try {
      console.log("newChatName from frontend", newChatName);
      const response = await fetch('http://localhost:3000/api/chat', {
        method: "POST",
        body: JSON.stringify({ newChatName }),
        headers: { "Content-Type": "application/json" }
      });
      console.log(newChatName, "newChatName create function")
      const data = await response.json();
      if (!response.ok) {
        return alert("Unable to create chat" || data.message);
      }
  
      setNewChatName('');
      
      // Fetch chats after creating a new chat
      await fetchChats();
    } catch (error: any) {
      console.error('Error creating chat:', error);
      if (error.response) {
        console.error('Server responded with status:', error.response.status);
      } else {
        console.error('Error details:', error.message);
      }
    }
  };

  const selectChat = (chat: Chat) => {
    setCurrentChat(chat);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Chat App</h1>
      <div>
        <h2 className="text-xl font-semibold">Chats</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            placeholder="Enter chat name"
            className="bg-transparent border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button onClick={createChat} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">Create Chat</button>
        </div>
        <ul>
          {chats && chats.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => selectChat(chat)}
                className={`rounded-md mr-2 mb-2 py-2 px-4 ${currentChat === chat ? 'bg-blue-200' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {chat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>


      
      {currentChat && (
        <div>
          <h2 className="text-xl font-semibold">{currentChat.name}</h2>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
