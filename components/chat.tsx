"use client";
import React, { useState, useEffect } from 'react';
import RemoveBtn from './RemoveBtn'
import { Button } from '@/components/ui/button';
import { HiPencilAlt } from "react-icons/hi";
import EditBtn from './EditBtn';
import Link from 'next/link';
import ConversationPage from '@/app/(dashboard)/(routes)/conversation/page';
import { saveAs } from 'file-saver';

interface Chat {
  _id: string;
  name: string;
  messages: Message[]; 
}

interface Message {
  question: string;
  answer: string;
}

interface ChatAppProps {
    setChatId: (id: string) => void;
  }

const ChatApp: React.FC<ChatAppProps> = ({ setChatId }) => {
  const [chatsData, setChatsData] = useState<Chat[]>([]);
  const [newChatName, setNewChatName] = useState<string>('');
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = new URLSearchParams(window.location.search);
  const queryChatId = searchParams.get('chatId');

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
          const chatsWithData = responseData.chats.map((chat: { messages: any; })=> ({
            ...chat,
            messages: chat.messages || []
          }));
          setChatsData(chatsWithData.reverse());
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
        throw new Error("Failed to create chat");
      }
  
      const newChatId = data._id;
  
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('chatId', newChatId);
      window.history.replaceState({}, '', newUrl);

      setNewChatName('');
      

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
    setChatId(chat._id);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const handleUpdateChatName = async (newName: string) => {
    setNewChatName(newName);
    await fetchChats();
  };

  if (!selectChat && !queryChatId){
    createChat();
  }

  const handleDownloadChat = (chat: Chat) => {
    const chatData = `
      Chat Name: ${chat.name}\n\n
      Messages:\n
      ${chat.messages.map((message, index) => `Question ${index + 1}: ${message.question}\nAnswer ${index + 1}: ${message.answer}\n`).join('\n')}
    `;
    const blob = new Blob([chatData], { type: 'text/plain;charset=utf-8' });

    saveAs(blob, `${chat.name}.txt`);
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
        onClick={() => {
            setCurrentChat(chat);
            setChatId(chat._id);
            selectChat(chat)
            window.history.pushState({}, '', `?chatId=${chat._id}`);
          }}
        className={`rounded-md mr-2 mb-2 py-2 px-4 ${currentChat === chat ? 'bg-blue-200' : 'bg-gray-200 hover:bg-gray-300'}`}
      >
        {chat.name}
      </button>
       <div className="relative">
                <button className="ml-2" onClick={() => handleDownloadChat(chat)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zM4 5a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2h3v8H5V7h3a1 1 0 1 0 0-2H4z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
      <RemoveBtn id={chat._id} />
      <EditBtn id={chat._id} name={newChatName} onUpdate={handleUpdateChatName}/>
    </div>
  </li>
))}

        </ul>
      </div>

      {currentChat && currentChat.messages && ( 
  <div className="flex items-center justify-center">
    <h2 className="text-xl font-semibold"></h2>
    <ul>
      {currentChat.messages.map((message: any, index: number) => (
        <li key={index} className="border-b py-4">
          <div className="mb-2">
            <strong>Question:</strong> {message.question}
          </div>
          <div>
            <strong>Answer:</strong> {message.answer}
          </div>
        </li>
      ))}
    </ul>
              
        </div>
      )}
    </div>

  );
};

export default ChatApp;
