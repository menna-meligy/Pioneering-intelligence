// "use client";
// import React, { useState, useEffect } from "react";
// import RemoveBtn from "./RemoveBtn";
// import { Button } from "@/components/ui/button";
// import { HiPencilAlt } from "react-icons/hi";
// import EditBtn from "./EditBtn";
// import Link from "next/link";
// import ConversationPage from "@/app/(dashboard)/(routes)/conversation/page";
// import { saveAs } from "file-saver";

// interface Chat {
//   _id: string;
//   name: string;
//   messages: Message[];
// }

// interface Message {
//   question: string;
//   answer: string;
// }

// interface ChatAppProps {
//   setChatId: (id: string) => void;
// }

// const ChatApp: React.FC<ChatAppProps> = ({ setChatId }) => {
//   const [chatsData, setChatsData] = useState<Chat[]>([]);
//   const [newChatName, setNewChatName] = useState<string>("");
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const searchParams = new URLSearchParams(window.location.search);
//   const queryChatId = searchParams.get("chatId");

//   useEffect(() => {
//     fetchChats();
//   }, []);

//   const fetchChats = async () => {
//     try {
//       const chatsResponse = await fetch("http://localhost:3000/api/chat", {
//         cache: "no-store",
//       });
//       const responseData = await chatsResponse.json();
//       console.log("chats", responseData);
//       if (chatsResponse.ok) {
//         if (Array.isArray(responseData.chats)) {
//           const chatsWithData = responseData.chats.map(
//             (chat: { messages: any }) => ({
//               ...chat,
//               messages: chat.messages || [],
//             })
//           );
//           setChatsData(chatsWithData.reverse());
//         } else {
//           console.error('Invalid data format: "chats" is not an array');
//         }
//       } else {
//         console.error("Failed to fetch chats:", responseData.message);
//       }
//     } catch (error) {
//       console.error("Error fetching chats:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createChat = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/chat", {
//         method: "POST",
//         body: JSON.stringify({ newChatName }),
//         headers: { "Content-Type": "application/json" },
//       });
//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error("Failed to create chat");
//       }

//       const newChatId = data._id;

//       const newUrl = new URL(window.location.href);
//       newUrl.searchParams.set("chatId", newChatId);
//       window.history.replaceState({}, "", newUrl);

//       setNewChatName("");

//       await fetchChats();
//     } catch (error: any) {
//       console.error("Error creating chat:", error);
//       if (error.response) {
//         console.error("Server responded with status:", error.response.status);
//       } else {
//         console.error("Error details:", error.message);
//       }
//     }
//   };

//   const selectChat = (chat: Chat) => {
//     setCurrentChat(chat);
//     setChatId(chat._id);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );
//   }

//   const handleUpdateChatName = async (newName: string) => {
//     setNewChatName(newName);
//     await fetchChats();
//   };

//   if (!selectChat && !queryChatId) {
//     createChat();
//   }

//   const handleDownloadChat = (chat: Chat) => {
//     const chatData = `
//       Chat Name: ${chat.name}\n\n
//       Messages:\n
//       ${chat.messages
//         .map(
//           (message, index) =>
//             `Question ${index + 1}: ${message.question}\nAnswer ${index + 1}: ${
//               message.answer
//             }\n`
//         )
//         .join("\n")}
//     `;
//     const blob = new Blob([chatData], { type: "text/plain;charset=utf-8" });

//     saveAs(blob, `${chat.name}.txt`);
//   };

//   return (
//     <div>
//       {/* <h1 className="text-2xl font-bold">Chat App</h1> */}
//       <div>
//         {/* <h2 className="text-xl font-semibold">Chats</h2> */}
//         <div className="mb-4">
//           <input
//             type="text"
//             value={newChatName}
//             onChange={(e) => setNewChatName(e.target.value)}
//             placeholder="Enter chat name"
//             className="bg-transparent border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
//           />
//           <button
//             onClick={createChat}
//             className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
//           >
//             Create Chat
//           </button>
//         </div>
//         <ul>
//           {Array.isArray(chatsData) &&
//             chatsData.map((chat) => (
//               <li key={chat._id}>
//                 <div className="flex items-center">
//                   <button
//                     onClick={() => selectChat(chat)}
//                     className={`rounded-md mr-2 mb-2 py-2 px-4 ${
//                       currentChat === chat
//                         ? "bg-blue-200"
//                         : "bg-gray-200 hover:bg-gray-300"
//                     }`}
//                   >
//                     {chat.name}
//                   </button>
//                   {/* <RemoveBtn id={chat._id} />
//                   <EditBtn
//                     id={chat._id}
//                     name={newChatName}
//                     onUpdate={handleUpdateChatName}
//                   /> */}
//                   <div className="relative">
//                     <button
//                       className="ml-2"
//                       onClick={() => handleDownloadChat(chat)}
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 text-gray-500 hover:text-gray-700"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10 3a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zM4 5a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2h3v8H5V7h3a1 1 0 1 0 0-2H4z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                   <RemoveBtn id={chat._id} />
//                   <EditBtn
//                     id={chat._id}
//                     name={newChatName}
//                     onUpdate={handleUpdateChatName}
//                   />
//                 </div>
//               </li>
//             ))}
//         </ul>
//       </div>

//       {currentChat && currentChat.messages && (
//         <div className="flex items-center justify-center">
//           <h2 className="text-xl font-semibold">{currentChat.name}</h2>
//           {/* <ConversationPage chatId={currentChat._id}/> */}
//           <Link
//             href={`/conversation?chatId=${currentChat._id}`}
//             passHref
//           ></Link>
//           <ul>
//             {currentChat.messages.map((message: any, index: number) => (
//               <li key={index}>
//                 <div>
//                   <strong>Question:</strong> {message.question}
//                 </div>
//                 <div>
//                   <strong>Answer:</strong> {message.answer}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatApp;
"use client";
import React, { useState, useEffect } from "react";
import RemoveBtn from "./RemoveBtn";
import { Button } from "@/components/ui/button";
import { HiPencilAlt } from "react-icons/hi";
import EditBtn from "./EditBtn";
import Link from "next/link";
import ConversationPage from "@/app/(dashboard)/(routes)/conversation/page";
import { saveAs } from "file-saver";
import { HiTrash } from "react-icons/hi";
import { cn } from "@/lib/utils";

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
  const [newChatName, setNewChatName] = useState<string>("");
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<{
    [key: string]: boolean;
  }>({});
  const [renamingChatId, setRenamingChatId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = new URLSearchParams(window.location.search);
  const queryChatId = searchParams.get("chatId");
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isDropdownButton = target.classList.contains("dropdown-button");
      const isDropdownContent = target.closest(".dropdown-content");
      if (!isDropdownButton && !isDropdownContent) {
        // Close all dropdowns
        setIsDropdownOpen({});
      }
    };
    fetchChats();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const fetchChats = async () => {
  //   try {
  //     const chatsResponse = await fetch('http://localhost:3000/api/chat', {
  //       cache: "no-store",
  //     });
  //     const responseData = await chatsResponse.json();
  //     console.log("chats", responseData);
  //     if (chatsResponse.ok) {
  //       if (Array.isArray(responseData.chats)) {
  //         const chatsWithData = responseData.chats.map((chat: { messages: any; })=> ({
  //           ...chat,
  //           messages: chat.messages || []
  //         }));
  //         setChatsData(chatsWithData.reverse());
  //       } else {
  //         console.error('Invalid data format: "chats" is not an array');
  //       }
  //     } else {
  //       console.error('Failed to fetch chats:', responseData.message);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching chats:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchChats = async () => {
    try {
      const chatsResponse = await fetch("http://localhost:3000/api/chat", {
        cache: "no-store",
      });
      const responseData = await chatsResponse.json();
      console.log("chatssssss", responseData); // Log the response data to inspect its structure
      if (chatsResponse.ok) {
        if (Array.isArray(responseData.chats)) {
          const chatsWithData = responseData.chats.map(
            (chat: { messages: any }) => ({
              ...chat,
              messages: chat.messages || [],
            })
          );
          setChatsData(chatsWithData.reverse());
        } else if (responseData.chat) {
          // If the response has a single chat object instead of an array, convert it to an array
          setChatsData([
            {
              ...responseData.chat,
              messages: responseData.chat.messages || [],
            },
          ]);
        } else {
          console.error('Invalid data format: "chats" is not an array');
        }
      } else {
        console.error("Failed to fetch chats:", responseData.message);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoading(false);
    }
  };

  const createChat = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        body: JSON.stringify({ newChatName }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to create chat");
      }

      const newChatId = data._id;

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set("chatId", newChatId);
      window.history.replaceState({}, "", newUrl);

      setNewChatName("");

      await fetchChats();
    } catch (error: any) {
      console.error("Error creating chat:", error);
      if (error.response) {
        console.error("Server responded with status:", error.response.status);
      } else {
        console.error("Error details:", error.message);
      }
    }
  };
  const selectChat = (chat: Chat) => {
    // Clear the current selected chat
    setCurrentChat(chat._id === currentChat ? null : chat);
    setChatId(chat._id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // const handleUpdateChatName = async (newName: string) => {
  //   setNewChatName(newName);
  //   await fetchChats();
  // };
  const handleUpdateChatName = async (chatId, newName) => {
    // Update chat name in the state
    setChatsData(
      chatsData.map((chat) =>
        chat._id === chatId ? { ...chat, name: newName } : chat
      )
    );

    // Call the API to update the chat name in the database
    const response = await fetch(`http://localhost:3000/api/chat/${chatId}`, {
      method: "PUT",
      body: JSON.stringify({ name: newName }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      // Handle errors here
      console.error("Failed to update chat name");
    }
  };

  const handleChatRemoved = () => {
    fetchChats(); // Call fetchChats to refresh the list after deletion
  };

  if (!selectChat && !queryChatId) {
    createChat();
  }

  const handleDownloadChat = (chat: Chat) => {
    const chatData = `
      Chat Name: ${chat.name}\n\n
      Messages:\n
      ${chat.messages
        .map(
          (message, index) =>
            `Question ${index + 1}: ${message.question}\nAnswer ${index + 1}: ${
              message.answer
            }\n`
        )
        .join("\n")}
    `;
    const blob = new Blob([chatData], { type: "text/plain;charset=utf-8" });

    saveAs(blob, `${chat.name}.txt`);
  };

  const handleRenameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewChatName(e.target.value);
  };

  const toggleDropdown = (chatId: string) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [chatId]: !prevState[chatId],
    }));
  };
  if (currentChat && currentChat.messages) {
    console.log("answerr", currentChat.messages);
    currentChat.messages.map((message: Message, index: number) => {
      console.log(message.question);
      console.log(message.answer);
    });
  }

  return (
    <div className="">
      <div className="flex items-center">
        <input
          type="text"
          value={newChatName}
          onChange={handleRenameInputChange}
          placeholder="new chat"
          className="bg-transparent border border-gray-300 rounded-md pr-100 pl-5 py-1 focus:outline-none focus:border-gray-400-500 w-64 h-8 transition-colors duration-300 hover:bg-gray-800"
          style={{ width: "350px" }}
        />
        <button
          onClick={createChat}
          className="p-2 rounded-full bg-transparent hover:bg-transparent focus:outline-none transition-colors duration-300 mr-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-beige hover:text-light-beige absolute top-123 left-25"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.293 5.293a1 1 0 1 0-1.414-1.414L9 8.586 6.121 5.707a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l5-5z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <ul style={{ background: "transparent", width: "100%" }}>
        {Array.isArray(chatsData) &&
          chatsData.map((chat) => (
            <li key={chat._id} className="flex items-center mb-2">
              <div
                className={cn("flex items-center justify-between w-full", {
                  // Style for unselected chats
                  " hover:bg-white/10 text-zinc-400":
                    !currentChat || currentChat._id !== chat._id,
                  // Style for selected chat
                  "bg-gray-600 hover:text-white hover:bg-white/10 transition":
                    currentChat && currentChat._id === chat._id,
                  "pl-4 pr-4": currentChat && currentChat._id === chat._id,
                })}
              >
                <div className="flex items-center w-full">
                  {renamingChatId === chat._id ? (
                    <input
                      type="text"
                      value={newChatName}
                      onChange={(e) => setNewChatName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRenameChat(chat._id, newChatName);
                          setRenamingChatId(null);
                        }
                      }}
                      autoFocus
                      // className="bg-transparent border-b border-gray-300 outline-none"
                      // className={cn(
                      //   "text-sm group flex w-full justify-start font-medium cursor-pointer transition",
                      //   {
                      //     // Style for unselected chats
                      //     "text-zinc-400  hover:bg-gray-800": !currentChat || currentChat._id !== chat._id,
                      //     // Style for selected chat
                      //     "text-white bg-gray-600 hover:bg-gray-700": currentChat && currentChat._id === chat._id,
                      //   }
                      // )}
                    />
                  ) : (
                    <React.Fragment>
                      <button
                        onClick={() => {
                          setCurrentChat(chat);
                          setChatId(chat._id);
                          selectChat(chat);
                          window.history.pushState(
                            {},
                            "",
                            `?chatId=${chat._id}`
                          );
                        }}
                        className={cn(
                          "text-sm group flex w-full justify-start font-medium cursor-pointer transition"
                        )}
                      >
                        {chat.name}
                      </button>
                    </React.Fragment>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-1 rounded-full hover:bg-gray-200"
                    onClick={() => toggleDropdown(chat._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={cn("h-5 w-5", {
                        "text-gray-500 hover:text-white":
                          !currentChat || currentChat._id !== chat._id,
                        "text-white hover:text-white":
                          currentChat && currentChat._id === chat._id,
                      })}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/* Dropdown Content */}
                  <div className="relative">
                    <button
                      className="mt-2"
                      onClick={() => handleDownloadChat(chat)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={cn("h-5 w-5", {
                          "text-gray-500 hover:text-white":
                            !currentChat || currentChat._id !== chat._id,
                          "text-white hover:text-white":
                            currentChat && currentChat._id === chat._id,
                        })}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zM4 5a1 1 0 0 0-1 1v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2h3v8H5V7h3a1 1 0 1 0 0-2H4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {isDropdownOpen[chat._id] && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md z-10">
                      {/* Dropdown content */}
                      <div className="py-1">
                        <EditBtn
                          id={chat._id}
                          currentName={chat.name}
                          onSave={handleUpdateChatName}
                        />
                        <RemoveBtn
                          id={chat._id}
                          onChatRemoved={handleChatRemoved}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
      </ul>

      {/* {currentChat && currentChat.messages && (
        <div className="flex items-center justify-center">
          <h2 className="text-xl font-semibold">Messages</h2>
          <ul>
            {currentChat.messages.map((message: Message, index: number) => (
              <li key={index} className="border-b py-4">
                <div className="absolute top-0 right-0">
                  <strong>Question:</strong> {message.question}
                </div>
                <div className="absolute top-0 left-0">{message.answer}</div>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default ChatApp;
