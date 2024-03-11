"use client";
import React, { useState, useEffect } from 'react';
import RemoveBtn from '../../../../components/RemoveBtn';
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/router';
import { HiPencilAlt } from "react-icons/hi";
import EditBtn from '../../../../components/EditBtn';
import ConversationPage from '../conversation/page';
interface Chat {
  _id: string;
  name: string;
}

const ChatApp: React.FC = () => {
  const [chatsData, setChatsData] = useState<Chat[]>([]);
  const [newChatName, setNewChatName] = useState<string>('');
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const router = useRouter();
  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const chatsResponse = await fetch('http://localhost:3000/api/chat', {
        cache: "no-store",
      });
      const responseData = await chatsResponse.json();
      console.log("chats", responseData);
      if (chatsResponse.ok) {
        if (Array.isArray(responseData.chats)) {
          setChatsData(responseData.chats.reverse()); // Reverseing to show the latest chats first 
        } else {
          console.error('Invalid data format: "chats" is not an array');
        }
      } else {
        console.error('Failed to fetch chats:', responseData.message);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const createChat = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: "POST",
        body: JSON.stringify({ newChatName }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (!response.ok) {
        return alert("Unable to create chat" || data.message);
      }
  
      setNewChatName('');
      
      // Fetching chats after creating a new chat
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

  if (loading) {
    return <div>Loading...</div>;
  }
  // setChatsData(await fetchChats());

  const handleUpdateChatName = (newName: string) => {
    setNewChatName(newName);
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
        {Array.isArray(chatsData) && chatsData.map((chat) => (
  <li key={chat._id}>
    <div className="flex items-center">
      <button
        onClick={() => selectChat(chat)}
        className={`rounded-md mr-2 mb-2 py-2 px-4 ${currentChat === chat ? 'bg-blue-200' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        {chat.name}
      </button>
      <RemoveBtn id={chat._id} />
      <EditBtn id={chat._id} name={newChatName} onUpdate={handleUpdateChatName}/>
{/* 
      <button onClick={() => router.push(`/editChat/${chat._id}`)} className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
                <HiPencilAlt size={24} />
      </button> */}
      {/* <button onClick={() => editChat(chat.id, prompt('Enter new name'))} className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Edit</button> */}
      {/* <button onClick={() => deleteChat(chat.id)} className="bg-red-500 text-white px-4 py-2 rounded-md ml-2">Delete</button> */}


    </div>
  </li>
))}

        </ul>
      </div>

      {currentChat && ( 
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-semibold">{currentChat.name}</h2>
          <ConversationPage chatId={currentChat._id}/>
        </div>
      )}
    </div>

  );
};

export default ChatApp;
