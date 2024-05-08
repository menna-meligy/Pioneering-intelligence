// // "use client";

// // import toast from "react-hot-toast";
// // import * as z from "zod";
// // import { Heading } from "@/components/heading";
// // import { MessageSquare } from "lucide-react";
// // import { useForm } from "react-hook-form";
// // import { formSchema } from "./constants";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import { cn } from "@/lib/utils";

// // import axios from "axios";
// // import { useRouter } from "next/navigation";
// // import { ChatCompletionRequestMessage } from "openai";
// // import { useState, useEffect, SetStateAction } from "react";
// // import { Empty } from "@/components/empty";
// // import { Loader } from "@/components/loader";
// // import { UserAvatar } from "@/components/user-avatar";
// // import { BotAvatar } from "@/components/bot-avatar";
// // import { useProModal } from "@/hooks/use-pro-modal";
// // import ImageClassifier from "@/components/object-detector/index";
// // import TextExtractor from "@/components/object-detector/textExtraction/index";

// // const ConversationPage = () => {
// //   // var messageWithOutputs;
// //   const proModal = useProModal();
// //   const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
// //   const searchParams = new URLSearchParams(window.location.search);
// //   const chatId = searchParams.get("chatId");

// //   const [textOutput, setTextOutput] = useState("");
// //   const [graphOutput, setGraphOutput] = useState("");
// //   const [question, setQuestion] = useState("");
// //   const [formLoading, setFormLoading] = useState(false);

// //   const handleOutputsReceived = (
// //     textOutput: SetStateAction<string>,
// //     graphOutput: SetStateAction<string>
// //   ) => {
// //     setTextOutput(textOutput);
// //     setGraphOutput(graphOutput);
// //     setFormLoading(true);
// //   };

// //   const router = useRouter();
// //   console.log("chatId:", chatId);
// //   const form = useForm<z.infer<typeof formSchema>>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       prompt: "",
// //     },
// //   });

// //   useEffect(() => {
// //     const searchParams = new URLSearchParams(window.location.search);
// //     const chatId = searchParams.get("chatId");
// //     console.log("chatId:", chatId);
// //     // setQuestion(`${prompt} ${textOutput} ${graphOutput}`);
// //     if (textOutput && graphOutput) {
// //       // handleSubmit(onSubmit)();
// //       setFormLoading(false);
// //       onSubmit();
// //     }
// //   }, [textOutput, graphOutput]);

// //   const isLoading = form.formState.isSubmitting;

// //   const onSubmit = async (values: z.infer<typeof formSchema>) => {
// //     if (formLoading) {
// //       return;
// //     }
// //     setFormLoading(true);
// //     try {
// //       const userMessage: ChatCompletionRequestMessage = {
// //         role: "user",
// //         content: values.prompt,
// //       };
// //       const newMessages = [...messages, userMessage];
// //       const { prompt } = values;
// //       // const question = prompt;
// //       // const question = `${prompt} ${textOutput} ${graphOutput}`;
// //       console.log("chatId before condition check:", chatId);
// //       if (!chatId) {
// //         // If chatId is not available, display an error message and return
// //         toast.error("Please select a chat or create a new one.");
// //         return;
// //       }
// //       // if (predictedClassIndex === 2) {
// //       //   // If predictedClassIndex is 2, concatenate the outputs of TextExtractor and ImageRevealer
// //       //   const textExtractorOutput = await TextExtractor(imageFile);
// //       //   const imageRevealerOutput = await ImageRevealer(imageFile);
// //       //   newMessages   = ` ${textExtractorOutput} ${imageRevealerOutput}`;
// //       // }

// //       // Concatenate textOutput and graphOutput with the user's message
// //       // const userMessageContent = values.prompt;
// //       // messageWithOutputs = `${userMessageContent} ${textOutput} ${graphOutput}`;
// //       // Concatenate textOutput and graphOutput with the user's message
// //       // const userMessageContent = values.prompt;
// //       // const messageWithOutputs = `${userMessageContent} ${textOutput} ${graphOutput}`;
// //       if (textOutput && graphOutput) {
// //         const response = await axios.post("/api/conversation", {
// //           messages: newMessages,
// //           textOutput,
// //           graphOutput,
// //           chatId,
// //         });
// //         // const response = await axios.post('/api/conversation', { messages: newMessages , question});
// //         const responseData: string = response.data.content as string;

// //         // setMessages((current) => [...current, { ...userMessage, chatId }, response.data]);
// //         setMessages((current) => [
// //           ...current,
// //           { ...userMessage, chatId },
// //           response.data,
// //         ]);

// //         console.log(question, "question before post");
// //         console.log(responseData, "responseData before post");
// //         // setMessages((current) => [...current, userMessage, response.data]);
// //         console.log("chatId from onSubmit", chatId);
// //         // const createResponseData = await saveResponse(question, responseData , chatId);
// //         // console.log("messageId", createResponseData);

// //         // await saveMessageToChat(chatId , createResponseData );
// //         // const createResponseData = await saveResponse(question, response.data.content, chatId);
// //         const createResponseData = await saveResponse(
// //           prompt,
// //           responseData,
// //           chatId
// //         );

// //         await saveMessageToChat(chatId, createResponseData);
// //         // console.log("messageId", createResponseData);

// //         console.log("question after", question);
// //         console.log("response after", responseData);

// //         await fetchMessages();

// //         form.reset();
// //       }
// //     } catch (error: any) {
// //       if (error?.response?.status === 403) {
// //         proModal.onOpen();
// //       } else {
// //         // toast.error("Something went wrong");
// //       }
// //     } finally {
// //       setFormLoading(false);
// //       router.refresh();
// //     }
// //   };

// //   const saveResponse = async (
// //     question: string,
// //     responseData: string,
// //     chatId: string
// //   ) => {
// //     try {
// //       const createResponse = await fetch("http://localhost:3000/api/message", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ question, responseData, chatId }),
// //       });

// //       const createResponseData = await createResponse.json();
// //       // return createResponseData.data;
// //       return createResponseData;
// //       if (!createResponse.ok) {
// //         const data = await createResponse.json();
// //         alert("Unable to create Message" || data.message);

// //         console.log("data", data);
// //       }
// //     } catch (error) {
// //       console.error("Error creating message:", error);
// //       toast.error("Failed to save message");
// //     }
// //   };

// //   const saveMessageToChat = async (id: string, messageObject: any) => {
// //     try {
// //       const createResponse = await fetch(
// //         `http://localhost:3000/api/chat/${id}`,
// //         {
// //           method: "PUT",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ messageObject }),
// //         }
// //       );
// //       if (!createResponse.ok) {
// //         const data = await createResponse.json();
// //         alert("Unable to create Message" || data.message);
// //         console.log("data", data);
// //       }
// //     } catch (error) {
// //       console.error("Error creating message:", error);
// //       toast.error("Failed to save message");
// //     }
// //   };

// //   const getMessageById = async (id: string) => {
// //     try {
// //       const res = await fetch(`http://localhost:3001/api/message/${id}`, {
// //         cache: "no-store",
// //       });
// //       if (!res.ok) {
// //         throw new Error("Failed to fetch topic");
// //       }
// //       return res.json();
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
// //   const [chatsData, setChatsData] = useState<any[]>([]);

// //   const fetchMessages = async () => {
// //     try {
// //       const response = await fetch("http://localhost:3000/api/message", {
// //         cache: "no-store",
// //       });
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch messages");
// //       }
// //       const responseData = await response.json();
// //       console.log("chats", responseData);
// //       if (Array.isArray(responseData.chats)) {
// //         setChatsData(responseData.chats.reverse()); // Reversing to show the latest chats first
// //       } else {
// //         console.error('Invalid data format: "chats" is not an array');
// //       }
// //     } catch (error) {
// //       console.error("Error fetching chats:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       {/* <ChatApp/> */}
// //       <div>
// //         <Heading
// //           title="conversation"
// //           description="our most advanced conversation model."
// //           icon={MessageSquare}
// //           iconColor="text-violet-500"
// //           bgColor="bg-violet-500/10"
// //         />
// //       </div>

// //       <div className="px-4 lg:px-8">
// //         <div>
// //           <Form {...form}>
// //             <form
// //               onSubmit={form.handleSubmit(onSubmit)}
// //               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within-shadow-sm grid grid-cols-12 gap-2"
// //             >
// //               <FormField
// //                 name="prompt"
// //                 render={({ field }) => (
// //                   <FormItem className="col-span-12 lg:col-span-10">
// //                     <FormControl className="m-0 p-0">
// //                       <Input
// //                         className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-3 pr-3 py-1 text-sm"
// //                         disabled={isLoading}
// //                         placeholder="Ask Anything"
// //                         {...field}
// //                       />
// //                     </FormControl>
// //                   </FormItem>
// //                 )}
// //               />
// //               <Button
// //                 variant="destructive"
// //                 className="col-span-12 lg:col-span-2 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50"
// //                 type="submit"
// //                 disabled={isLoading}
// //                 size="icon"
// //               >
// //                 Generate
// //               </Button>
// //               <ImageClassifier onOutputsReceived={handleOutputsReceived} />
// //               {/* <TextExtractor/> */}
// //               {/* {messageWithOutputs} */}
// //             </form>
// //           </Form>
// //         </div>

// //         <div className="space-y-4 mt-4">
// //           {isLoading && (
// //             <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
// //               <Loader />
// //             </div>
// //           )}
// //           {/* if there is no messages */}
// //           {messages.length === 0 && !isLoading && (
// //             <Empty label="No conversation started." />
// //           )}
// //           <div className="flex flex-col-reverse gap-y-4">
// //             {messages.map((message) => (
// //               <div
// //                 key={message.content}
// //                 className={cn(
// //                   "p-8 w-full flex items-start gap-x-8 rounded-lg",
// //                   message.role === "user"
// //                     ? "bg-white border bodrder-black/10 "
// //                     : "bg-muted"
// //                 )}
// //               >
// //                 {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
// //                 <p className="text-sm">{message.content}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ConversationPage;
// "use client";

// import toast from "react-hot-toast";
// import * as z from "zod";
// import { Heading } from "@/components/heading";
// import { MessageSquare } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { formSchema } from "./constants";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { ChatCompletionRequestMessage } from "openai";
// import { useState, useEffect, SetStateAction } from "react";
// import { Empty } from "@/components/empty";
// import { Loader } from "@/components/loader";
// import { UserAvatar } from "@/components/user-avatar";
// import { BotAvatar } from "@/components/bot-avatar";
// import { useProModal } from "@/hooks/use-pro-modal";
// import ImageClassifier from "@/components/object-detector/index";
// import TextExtractor from "@/components/object-detector/textExtraction/index";
// import { getFilteredNodesXToY } from "@tensorflow/tfjs-core/dist/tape";

// interface Message {
//   question: string;
//   answer: string;
//   chatId: string;
// }

// const ConversationPage = () => {
//   // var messageWithOutputs;
//   const proModal = useProModal();
//   const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
//   const searchParams = new URLSearchParams(window.location.search);
//   const chatId = searchParams.get("chatId");

//   const [textOutput, setTextOutput] = useState("");
//   const [graphOutput, setGraphOutput] = useState("");
//   const [question, setQuestion] = useState("");
//   const [formLoading, setFormLoading] = useState(false);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [chatMessages, setChatMessages] = useState<Message[]>([]);

//   const handleOutputsReceived = (
//     textOutput: SetStateAction<string>,
//     graphOutput: SetStateAction<string>
//   ) => {
//     setTextOutput(textOutput);
//     setGraphOutput(graphOutput);
//     setFormLoading(true);
//   };

//   const router = useRouter();
//   console.log("chatId:", chatId);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       prompt: "",
//     },
//   });

//   const fetchChatMessages = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/message", {
//         cache: "no-store",
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch messages");
//       }
//       const responseData = await response.json();

//       // Check if responseData is an array before reversing it
//       if (Array.isArray(responseData.messages)) {
//         // Assuming that the messages are under the 'messages' key
//         setChatMessages(responseData.messages.reverse());
//       } else {
//         console.error('Invalid data format: "messages" is not an array');
//         setChatMessages([]); // Initialize with an empty array if not in the expected format
//       }
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       setChatMessages([]); // Set to empty array on error
//     }
//   };

//   // Additionally, ensure other parts of the code are also updated to handle the new structure:
//   const fetchChats = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/message", {
//         cache: "no-store",
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch messages");
//       }
//       const responseData = await response.json();
//       if (Array.isArray(responseData.chats)) {
//         setChatsData(responseData.chats.reverse()); // Reversing to show the latest chats first
//       } else {
//         console.error('Invalid data format: "chats" is not an array');
//         setChatsData([]); // Set to empty array if not in the expected format
//       }
//     } catch (error) {
//       console.error("Error fetching chats:", error);
//       setChatsData([]); // Set to empty array on error
//     }
//   };

//   console.log("from conversation", chatMessages);

//   useEffect(() => {
//     if (chatId) {
//       fetchChatMessages();
//     }
//   }, [chatId]);

//   useEffect(() => {
//     const searchParams = new URLSearchParams(window.location.search);
//     const chatId = searchParams.get("chatId");
//     console.log("chatId:", chatId);
//     setQuestion(`${form.watch("prompt")} ${textOutput} ${graphOutput}`);
//     if (textOutput && graphOutput) {
//       setFormLoading(false);
//     }
//     // fetchChatMessages();
//   }, [form.watch("prompt"), textOutput, graphOutput]);

//   const isLoading = form.formState.isSubmitting;
//   const saveMessageToChat = async (id: string, messageObject: any) => {
//     try {
//       const createResponse = await fetch(
//         `http://localhost:3000/api/chat/${id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ messageObject }),
//         }
//       );
//       if (!createResponse.ok) {
//         const data = await createResponse.json();
//         alert("Unable to create Message" || data.message);
//         console.log("data", data);
//       }
//     } catch (error) {
//       console.error("Error creating message:", error);
//       toast.error("Failed to save message");
//     }
//   };
//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (formLoading) {
//       return;
//     }
//     setFormLoading(true);
//     try {
//       const userMessage: ChatCompletionRequestMessage = {
//         role: "user",
//         content: values.prompt,
//       };
//       const newMessages = [...messages, userMessage];
//       const { prompt } = values;
//       // const question = prompt;
//       // const question = `${prompt} ${textOutput} ${graphOutput}`;
//       console.log("chatId before condition check:", chatId);
//       if (!chatId) {
//         // If chatId is not available, display an error message and return
//         toast.error("Please select a chat or create a new one.");
//         return;
//       }
//       // if (predictedClassIndex === 2) {
//       //   // If predictedClassIndex is 2, concatenate the outputs of TextExtractor and ImageRevealer
//       //   const textExtractorOutput = await TextExtractor(imageFile);
//       //   const imageRevealerOutput = await ImageRevealer(imageFile);
//       //   newMessages   = ` ${textExtractorOutput} ${imageRevealerOutput}`;
//       // }

//       // Concatenate textOutput and graphOutput with the user's message
//       // const userMessageContent = values.prompt;
//       // messageWithOutputs = `${userMessageContent} ${textOutput} ${graphOutput}`;
//       // Concatenate textOutput and graphOutput with the user's message
//       // const userMessageContent = values.prompt;
//       // const messageWithOutputs = `${userMessageContent} ${textOutput} ${graphOutput}`;
//       // if (textOutput && graphOutput) {
//       // const response = await axios.post('/api/conversation', { messages:newMessages,
//       //   textOutput,
//       //   graphOutput,
//       //   chatId });
//       let requestBody: any = { messages: newMessages, chatId };

//       // Check if textOutput and graphOutput are available
//       if (textOutput && graphOutput) {
//         // If both textOutput and graphOutput are available, include them in the request
//         requestBody = { ...requestBody, textOutput, graphOutput };
//       }

//       const response = await axios.post("/api/conversation", requestBody);

//       // const response = await axios.post('/api/conversation', { messages: newMessages , question});
//       const responseData: string = response.data.content as string;

//       // setMessages((current) => [...current, { ...userMessage, chatId }, response.data]);
//       setMessages((current) => [
//         ...current,
//         { ...userMessage, chatId },
//         response.data,
//       ]);
//       console.log("chatId from onSubmit", chatId);
//       const createResponseData = await saveResponse(
//         question,
//         responseData,
//         chatId
//       );
//       // const { message } = await getMessageById(messageId);
//       console.log("messageId", createResponseData);
//       // console.log("messageId question", createdMessage.question);
//       // console.log("messageId answer", createdMessage.answer);

//       const messageObject = {
//         question: question,
//         responseData: responseData,
//         messageId: createResponseData._id, // Assuming the ID is returned in the createdMessage object
//         // Add any other relevant fields here
//       };

//       await saveMessageToChat(chatId, createResponseData);
//       console.log("question after", question);
//       console.log("response after", responseData);
//       await fetchChats();

//       // form.reset();
//     } catch (error: any) {
//       if (error?.response?.status === 403) {
//         proModal.onOpen();
//       } else {
//         toast.error("Something went wrong");
//       }
//     } finally {
//       setFormLoading(false);
//       router.refresh();
//     }
//   };

//   const saveResponse = async (
//     question: string,
//     responseData: string,
//     chatId: string
//   ) => {
//     try {
//       const createResponse = await fetch("http://localhost:3000/api/message", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ question, responseData, chatId }),
//       });
//       // const createdMessage = await createResponse.json();
//       // const messageId = createdMessage._id;

//       const createResponseData = await createResponse.json();
//       return createResponseData.data;

//       if (!createResponse.ok) {
//         const data = await createResponse.json();
//         alert("Unable to create Message" || data.message);

//         console.log("data", data);
//       }
//     } catch (error) {
//       console.error("Error creating message:", error);
//       toast.error("Failed to save message");
//     }
//   };

//   const getMessageById = async (id: string) => {
//     try {
//       const res = await fetch(`http://localhost:3001/api/message/${id}`, {
//         cache: "no-store",
//       });
//       if (!res.ok) {
//         throw new Error("Failed to fetch topic");
//       }
//       return res.json();
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const [chatsData, setChatsData] = useState<any[]>([]);

//   // const fetchChats = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:3000/api/message", {
//   //       cache: "no-store",
//   //     });
//   //     if (!response.ok) {
//   //       throw new Error("Failed to fetch messages");
//   //     }
//   //     const responseData = await response.json();
//   //     console.log("chats", responseData);
//   //     if (Array.isArray(responseData.chats)) {
//   //       // setChatsData(responseData.chats.reverse()); // Reversing to show the latest chats first
//   //     } else {
//   //       console.error('Invalid data format: "chats" is not an array');
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching chats:", error);
//   //   } finally {
//   //     // setLoading(false);
//   //   }
//   // };

//   return (
//     <div>
//       {/* ChatApp */}
//       <div>
//         <Heading
//           title="conversation"
//           description="our most advanced conversation model."
//           icon={MessageSquare}
//           iconColor="text-violet-500"
//           bgColor="bg-violet-500/10"
//         />
//       </div>

//       <div className="px-4 lg:px-8">
//         <div>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within-shadow-sm grid grid-cols-12 gap-2"
//             >
//               <FormField
//                 name="prompt"
//                 render={({ field }) => (
//                   <FormItem className="col-span-12 lg:col-span-10">
//                     <FormControl className="m-0 p-0">
//                       <Input
//                         className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-3 pr-3 py-1 text-sm"
//                         disabled={isLoading}
//                         placeholder="Ask Anything"
//                         {...field}
//                       />
//                     </FormControl>
//                   </FormItem>
//                 )}
//               />
//               <Button
//                 variant="destructive"
//                 className="col-span-12 lg:col-span-2 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50"
//                 type="submit"
//                 disabled={isLoading}
//                 size="icon"
//               >
//                 Generate
//               </Button>
//               <ImageClassifier onOutputsReceived={handleOutputsReceived} />
//             </form>
//           </Form>
//         </div>

//         <div className="space-y-4 mt-4">
//           {isLoading && (
//             <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
//               {/* Loader component */}
//               <Loader />
//             </div>
//           )}
//           {messages.length === 0 && !isLoading && (
//             <Empty label="No conversation started." />
//           )}
//           <div className="flex gap-y-4">
//             {/* Map over messages */}
//             {messages.map((message) => (
//               <div
//                 key={message.content}
//                 className={cn(
//                   "p-8 w-full flex items-start gap-x-8 rounded-lg",
//                   message.role === "user"
//                     ? "bg-white border border-black/10"
//                     : "bg-muted"
//                 )}
//               >
//                 {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
//                 <p className="text-sm">{message.content}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Map over chatMessages */}
//         {chatMessages.map((message, index) => (
//           <div key={index} className="mb-4">
//             {/* Question Section */}
//             <div className="flex items-center gap-x-2 mb-2">
//               <div className="flex-shrink-0 w-6 h-6 rounded-full ml-6">
//                 {/* User avatar */}
//                 <UserAvatar />
//               </div>
//               <div className="bg-gray-100 p-4 rounded-lg flex-1">
//                 {/* Question block */}
//                 <strong className="text-gray-800">Question:</strong>
//                 <p className="text-gray-700">{message.question}</p>
//               </div>
//             </div>
//             {/* Answer Section */}
//             <div className="flex items-center gap-x-2">
//               <div className="flex-shrink-0 w-6 h-6 rounded-full ml-6">
//                 {/* Bot avatar */}
//                 <BotAvatar />
//               </div>
//               <div className="bg-white p-4 rounded-lg flex-1">
//                 {/* Answer block */}
//                 <strong className="text-gray-800">Answer:</strong>
//                 <p className="text-gray-700">{message.answer}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default ConversationPage;

// //
// // "use client";

// //   import toast from "react-hot-toast";
// //   import * as z from "zod";
// //   import { Heading } from "@/components/heading";
// //   import { MessageSquare } from "lucide-react";
// //   import { useForm } from "react-hook-form";
// //   import { formSchema } from "./constants";
// //   import { zodResolver } from "@hookform/resolvers/zod";
// //   import { Form , FormField , FormItem , FormControl} from "@/components/ui/form";
// //   import { Input } from "@/components/ui/input";
// //   import { Button } from "@/components/ui/button";
// //   import { cn } from "@/lib/utils";

// //   import axios from "axios";
// //   import {useRouter } from "next/navigation"
// //   import {ChatCompletionRequestMessage} from "openai";
// //   import { useState , useEffect, SetStateAction} from "react";
// //   import { Empty } from "@/components/empty";
// //   import { Loader } from "@/components/loader";
// //   import { UserAvatar } from "@/components/user-avatar";
// //   import { BotAvatar } from "@/components/bot-avatar";
// //   import { useProModal } from "@/hooks/use-pro-modal";
// //   import  ImageClassifier  from "@/components/object-detector/index";
// //   import TextExtractor from "@/components/object-detector/textExtraction/index"

// //   interface Message {
// //     question: string;
// //     answer: string;
// //   }

// //   const ConversationPage = ()=> {
// //     // var messageWithOutputs;
// //       const proModal = useProModal();
// //       const [messages , setMessages] = useState<ChatCompletionRequestMessage[]>([]);
// //       const searchParams = new URLSearchParams(window.location.search);
// //       const chatId = searchParams.get('chatId');

// //       const [textOutput, setTextOutput] = useState("");
// //       const [graphOutput, setGraphOutput] = useState("");
// //       const [question, setQuestion] = useState("");
// //       const [formLoading, setFormLoading] = useState(false);
// //       const [currentChat, setCurrentChat] = useState<Chat | null>(null);
// //       const [chatmessages, setChatMessages] = useState<Message | null>([]);

// //       const fetchChatMessages = async () => {
// //         try {
// //           const response = await fetch('http://localhost:3000/api/message', {
// //             cache: 'no-store',
// //           });
// //           if (!response.ok) {
// //             throw new Error('Failed to fetch messages');
// //           }
// //           const responseData = await response.json();
// //           console.log('chats', responseData);
// //           if (Array.isArray(responseData.messages)) {
// //             // Filter messages to display only those belonging to the current chat
// //             // const currentChatId = getCurrentChatId(); // Implement this function to get the current chatId
// //             const filteredMessages = responseData.chatmessages.filter(
// //               (message) => message.chatId === chadId
// //             );
// //             // Update the messages state with the filtered messages in reverse order to show recent messages first
// //             setChatMessages(filteredMessages.reverse());
// //           } else {
// //             console.error('Invalid data format: "messages" is not an array');
// //           }
// //         } catch (error) {
// //           console.error('Error fetching messages:', error);
// //         } finally {
// //           setLoading(false);
// //         }
// //       };

// //       const handleOutputsReceived = (textOutput: SetStateAction<string>, graphOutput: SetStateAction<string>) => {
// //         setTextOutput(textOutput);
// //         setGraphOutput(graphOutput);
// //         setFormLoading(true);
// //       };

// //       const router = useRouter();
// //       console.log('chatId:', chatId);
// // const form = useForm<z.infer<typeof formSchema>>({
// //           resolver : zodResolver(formSchema),
// //           defaultValues:{
// //               prompt : ""
// //           }
// //       });

// //       useEffect(() => {
// //         const searchParams = new URLSearchParams(window.location.search);
// //         const chatId = searchParams.get('chatId');
// //         console.log('chatId:', chatId);
// //         setQuestion(`${form.watch('prompt')} ${textOutput} ${graphOutput}`);
// //             if (textOutput && graphOutput) {
// //       // handleSubmit(onSubmit)();
// //       setFormLoading(false);
// //       fetchChatMessages();
// //       // onSubmit();
// //     }

// //       }, [form.watch('prompt'), textOutput, graphOutput]);

// //       const isLoading = form.formState.isSubmitting;
// //       const saveMessageToChat = async (id: string, messageObject : any) => {
// //         try {
// //           const createResponse = await fetch(`http://localhost:3000/api/chat/${id}`, {
// //             method: "PUT",
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ messageObject}),
// //           });
// //           if (!createResponse.ok) {
// //             const data = await createResponse.json();
// //             alert("Unable to create Message" || data.message);
// //             console.log("data", data);
// //           }
// //         } catch (error) {
// //           console.error("Error creating message:", error);
// //           toast.error("Failed to save message");
// //         }
// //       };
// //       const onSubmit = async (values: z.infer<typeof formSchema>) => {
// //         if (formLoading) {
// //           return;
// //         }
// //         setFormLoading(true);
// //           try {
// //           const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
// //           const newMessages = [...messages, userMessage];
// //           const { prompt } = values;
// //           // const question = prompt;
// //           // const question = `${prompt} ${textOutput} ${graphOutput}`;
// //           console.log('chatId before condition check:', chatId);
// //           if (!chatId) {
// //             // If chatId is not available, display an error message and return
// //             toast.error("Please select a chat or create a new one.");
// //             return;
// //           }
// //           // if (predictedClassIndex === 2) {
// //           //   // If predictedClassIndex is 2, concatenate the outputs of TextExtractor and ImageRevealer
// //           //   const textExtractorOutput = await TextExtractor(imageFile);
// //           //   const imageRevealerOutput = await ImageRevealer(imageFile);
// //           //   newMessages += ` ${textExtractorOutput} ${imageRevealerOutput}`;
// //           // }

// //         // Concatenate textOutput and graphOutput with the user's message
// //       // const userMessageContent = values.prompt;
// //       // messageWithOutputs = `${userMessageContent} ${textOutput} ${graphOutput}`;
// // // Concatenate textOutput and graphOutput with the user's message
// // // const userMessageContent = values.prompt;
// // // const messageWithOutputs = `${userMessageContent} ${textOutput} ${graphOutput}`;
// // // if (textOutput && graphOutput) {
// // // const response = await axios.post('/api/conversation', { messages:newMessages,
// // //   textOutput,
// // //   graphOutput,
// // //   chatId });
// // let requestBody: any = { messages: newMessages, chatId };

// // // Check if textOutput and graphOutput are available
// // if (textOutput && graphOutput) {
// //     // If both textOutput and graphOutput are available, include them in the request
// //     requestBody = { ...requestBody, textOutput, graphOutput };
// // }

// // const response = await axios.post('/api/conversation', requestBody);

// //   // const response = await axios.post('/api/conversation', { messages: newMessages , question});
// //   const responseData: string = response.data.content as string;

// //   // setMessages((current) => [...current, { ...userMessage, chatId }, response.data]);
// //   setMessages((current) => [...current, { ...userMessage, chatId }, response.data]);
// //   console.log("chatId from onSubmit" , chatId);
// //   const createResponseData = await saveResponse(question, responseData , chatId);
// //   // const { message } = await getMessageById(messageId);
// //   console.log("messageId", createResponseData);
// //   // console.log("messageId question", createdMessage.question);
// //   // console.log("messageId answer", createdMessage.answer);

// //   const messageObject = {
// //     question: question,
// //     responseData: responseData,
// //     messageId: createResponseData._id, // Assuming the ID is returned in the createdMessage object
// //     // Add any other relevant fields here
// //   };

// //   await saveMessageToChat(chatId , createResponseData );
// //   console.log("question after" , question);
// //   console.log("response after" , responseData);
// //   await fetchChats();

// //   // form.reset();
// // }
// //      catch (error: any) {
// //           if (error?.response?.status === 403) {
// //             proModal.onOpen();
// //           }else {
// //             toast.error("Something went wrong");
// //           }
// //         }
// //         finally {
// //           setFormLoading(false);
// //           router.refresh();
// //         }
// //       }

// //       const saveResponse = async (question: string, responseData: string , chatId : string) => {
// //         try {
// //           const createResponse = await fetch("http://localhost:3000/api/message", {
// //             method: "POST",
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ question, responseData , chatId}),
// //           });
// //           // const createdMessage = await createResponse.json();
// //           // const messageId = createdMessage._id;

// //           const createResponseData = await createResponse.json();
// //           return createResponseData.data;

// //           if (!createResponse.ok) {
// //             const data = await createResponse.json();
// //             alert("Unable to create Message" || data.message);

// //             console.log("data", data);
// //           }
// //         } catch (error) {
// //           console.error("Error creating message:", error);
// //           toast.error("Failed to save message");
// //         }
// //       };

// //    const getMessageById = async (id : string) => {
// //       try {
// //         const res = await fetch(`http://localhost:3001/api/message/${id}`, {
// //           cache: "no-store",
// //         });
// //         if (!res.ok) {
// //           throw new Error("Failed to fetch topic");
// //         }
// //         return res.json();
// //       } catch (error) {
// //         console.log(error);
// //       }
// //     };
// //       const [chatsData, setChatsData] = useState<any[]>([]);

// //     const fetchChats = async () => {
// //       try {
// //         const response = await fetch('http://localhost:3000/api/message', {
// //           cache: 'no-store',
// //         });
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch messages');
// //         }
// //         const responseData = await response.json();
// //         console.log('chats', responseData);
// //         if (Array.isArray(responseData.chats)) {
// //           // setChatsData(responseData.chats.reverse()); // Reversing to show the latest chats first
// //         } else {
// //           console.error('Invalid data format: "chats" is not an array');
// //         }
// //       } catch (error) {
// //         console.error('Error fetching chats:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //       return (
// //           <div>
// //             {/* <ChatApp/> */}
// //           <div>
// //               <Heading title="conversation" description="our most advanced conversation model." icon={MessageSquare} iconColor="text-violet-500" bgColor="bg-violet-500/10" />
// //           </div>

// //           <div className="px-4 lg:px-8">
// //               <div>
// //                   <Form {...form}>
// //                       <form onSubmit={form.handleSubmit(onSubmit)}  className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within-shadow-sm grid grid-cols-12 gap-2">
// //                           <FormField name="prompt" render={({field}) => (
// //                 <FormItem className="col-span-12 lg:col-span-10">
// //                 <FormControl className="m-0 p-0">
// //                   <Input
// //       className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-3 pr-3 py-1 text-sm"
// //       disabled={isLoading}
// //                     placeholder="Ask Anything"
// //                     {...field}
// //                   />
// //                 </FormControl>
// //               </FormItem>
// //             )}
// //           />
// //   <Button
// //       variant="destructive"
// //       className="col-span-12 lg:col-span-2 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50"
// //       type="submit"
// //       disabled={isLoading}
// //       size="icon"
// //   >
// //       Generate
// //   </Button>
// //   <ImageClassifier onOutputsReceived={handleOutputsReceived}/>
// //   {/* <TextExtractor/> */}
// // {/* {messageWithOutputs} */}
// //                       </form>
// //                   </Form>
// //               </div>

// //               <div className="space-y-4 mt-4">
// //                 {isLoading && (
// //                   <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
// //                     <Loader />
// //                   </div>
// //                 )}
// //                             {/* if there is no messages */}
// //                             {messages.length === 0 && !isLoading && (
// //                               <Empty label="No conversation started."/>
// //                             )}
// //                                   <div className="flex flex-col-reverse gap-y-4">
// //                                       {messages.map((message) => (
// //                                       <div key={message.content}
// //                                       className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border bodrder-black/10 " : "bg-muted" )}
// //                                       >
// //                                         {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
// //                                         <p className="text-sm">
// //                                           {message.content}
// //                                         </p>

// //                                       </div>
// //                             ))}
// //                     </div>
// //               </div>
// //           </div>
// //           <ul>
// //         {/* Render existing messages */}
// //         {chatmessages && chatmessages.map((message, index) => (
// //           <li key={index} className="border-b py-4">
// //             <div className="absolute top-0 right-0">
// //               <strong>Question:</strong> {message.question}
// //             </div>
// //             <div className="absolute top-0 left-0">{message.answer}</div>
// //           </li>
// //         ))}
// //       </ul>
// //           </div>
// //       );
// //   }

// //   export default ConversationPage;
"use client";

import toast from "react-hot-toast";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState, useEffect, SetStateAction, useRef } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import ImageClassifier from "@/components/object-detector/index";
import TextExtractor from "@/components/object-detector/textExtraction/index";
import { getFilteredNodesXToY } from "@tensorflow/tfjs-core/dist/tape";

interface Message {
  question: string;
  answer: string;
  chatId: string;
}

const ConversationPage = () => {
  // var messageWithOutputs;
  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const searchParams = new URLSearchParams(window.location.search);
  // const chatId = ;

  const [textOutput, setTextOutput] = useState("");
  const [graphOutput, setGraphOutput] = useState("");
  const [question, setQuestion] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [chatId, setChatId] = useState(searchParams.get("chatId"));
  const prevChatIdRef = useRef();
  // const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleOutputsReceived = (
    textOutput: SetStateAction<string>,
    graphOutput: SetStateAction<string>
  ) => {
    setTextOutput(textOutput);
    setGraphOutput(graphOutput);
    setFormLoading(true);
  };

  const router = useRouter();
  console.log("chatId:", chatId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const fetchChatMessages = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/message", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const responseData = await response.json();

      // Check if responseData is an array before reversing it
      if (Array.isArray(responseData.messages)) {
        // Assuming that the messages are under the 'messages' key
        setChatMessages(responseData.messages.reverse());
      } else {
        console.error('Invalid data format: "messages" is not an array');
        setChatMessages([]); // Initialize with an empty array if not in the expected format
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setChatMessages([]); // Set to empty array on error
    }
  };

  // Additionally, ensure other parts of the code are also updated to handle the new structure:
  const fetchChats = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/message", {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const responseData = await response.json();
      if (Array.isArray(responseData.chats)) {
        setChatsData(responseData.chats.reverse()); // Reversing to show the latest chats first
      } else {
        console.error('Invalid data format: "chats" is not an array');
        setChatsData([]); // Set to empty array if not in the expected format
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
      setChatsData([]); // Set to empty array on error
    }
  };

  console.log("from conversation", chatMessages);

  const updateUrlWithChatId = (id) => {
    const url = new URL(window.location.href);
    url.searchParams.set("chatId", id);
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    const prevChatId = prevChatIdRef.current;
    if (chatId && chatId !== prevChatId) {
      fetchChatMessages();
      updateUrlWithChatId(chatId);
      // window.location.reload();
    }
    prevChatIdRef.current = chatId;
  }, [chatId]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const chatId = searchParams.get("chatId");
    console.log("chatId:", chatId);
    setQuestion(`${form.watch("prompt")} ${textOutput} ${graphOutput}`);
    if (textOutput && graphOutput) {
      setFormLoading(false);
    }
    // fetchChatMessages();
  }, [form.watch("prompt"), textOutput, graphOutput]);

  const isLoading = form.formState.isSubmitting;
  const saveMessageToChat = async (id: string, messageObject: any) => {
    try {
      const createResponse = await fetch(
        `http://localhost:3000/api/chat/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messageObject }),
        }
      );
      if (!createResponse.ok) {
        const data = await createResponse.json();
        alert("Unable to create Message" || data.message);
        console.log("data", data);
      }
    } catch (error) {
      console.error("Error creating message:", error);
      toast.error("Failed to save message");
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (formLoading) {
      return;
    }
    setFormLoading(true);
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const { prompt } = values;
      // const question = prompt;
      // const question = `${prompt} ${textOutput} ${graphOutput}`;
      console.log("chatId before condition check:", chatId);
      if (!chatId) {
        // If chatId is not available, display an error message and return
        toast.error("Please select a chat or create a new one.");
        return;
      }
      // if (predictedClassIndex === 2) {
      //   // If predictedClassIndex is 2, concatenate the outputs of TextExtractor and ImageRevealer
      //   const textExtractorOutput = await TextExtractor(imageFile);
      //   const imageRevealerOutput = await ImageRevealer(imageFile);
      //   newMessages += ` ${textExtractorOutput} ${imageRevealerOutput}`;
      // }

      // Concatenate textOutput and graphOutput with the user's message
      // const userMessageContent = values.prompt;
      // messageWithOutputs = `${userMessageContent} ${textOutput} ${graphOutput}`;
      // Concatenate textOutput and graphOutput with the user's message
      // const userMessageContent = values.prompt;
      // const messageWithOutputs = `${userMessageContent} ${textOutput} ${graphOutput}`;
      // if (textOutput && graphOutput) {
      // const response = await axios.post('/api/conversation', { messages:newMessages,
      //   textOutput,
      //   graphOutput,
      //   chatId });
      let requestBody: any = { messages: newMessages, chatId };

      // Check if textOutput and graphOutput are available
      if (textOutput && graphOutput) {
        // If both textOutput and graphOutput are available, include them in the request
        requestBody = { ...requestBody, textOutput, graphOutput };
      }

      const response = await axios.post("/api/conversation", requestBody);

      // const response = await axios.post('/api/conversation', { messages: newMessages , question});
      const responseData: string = response.data.content as string;

      // setMessages((current) => [...current, { ...userMessage, chatId }, response.data]);
      setMessages((current) => [
        ...current,
        { ...userMessage, chatId },
        response.data,
      ]);
      console.log("chatId from onSubmit", chatId);
      const createResponseData = await saveResponse(
        question,
        responseData,
        chatId
      );
      // const { message } = await getMessageById(messageId);
      console.log("messageId", createResponseData);
      // console.log("messageId question", createdMessage.question);
      // console.log("messageId answer", createdMessage.answer);

      const messageObject = {
        question: question,
        responseData: responseData,
        messageId: createResponseData._id, // Assuming the ID is returned in the createdMessage object
        // Add any other relevant fields here
      };

      await saveMessageToChat(chatId, createResponseData);
      console.log("question after", question);
      console.log("response after", responseData);
      await fetchChats();

      // form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setFormLoading(false);
      router.refresh();
    }
  };

  const saveResponse = async (
    question: string,
    responseData: string,
    chatId: string
  ) => {
    try {
      const createResponse = await fetch("http://localhost:3000/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, responseData, chatId }),
      });
      // const createdMessage = await createResponse.json();
      // const messageId = createdMessage._id;

      const createResponseData = await createResponse.json();
      return createResponseData.data;

      if (!createResponse.ok) {
        const data = await createResponse.json();
        alert("Unable to create Message" || data.message);

        console.log("data", data);
      }
    } catch (error) {
      console.error("Error creating message:", error);
      toast.error("Failed to save message");
    }
  };

  const getMessageById = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/api/message/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch topic");
      }
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  const [chatsData, setChatsData] = useState<any[]>([]);

  // const fetchChats = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/message", {
  //       cache: "no-store",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch messages");
  //     }
  //     const responseData = await response.json();
  //     console.log("chats", responseData);
  //     if (Array.isArray(responseData.chats)) {
  //       setChatsData(responseData.chats.reverse()); // Reversing to show the latest chats first
  //     } else {
  //       console.error('Invalid data format: "chats" is not an array');
  //     }
  //   } catch (error) {
  //     console.error("Error fetching chats:", error);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  return (
    <div>
      {/* <ChatApp/> */}
      <div>
        <Heading
          title="conversation"
          description="our most advanced conversation model."
          icon={MessageSquare}
          iconColor="text-violet-500"
          bgColor="bg-violet-500/10"
        />
      </div>

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within-shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="w-full border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pl-3 pr-3 py-1 text-sm"
                        disabled={isLoading}
                        placeholder="Ask Anything"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                variant="destructive"
                className="col-span-12 lg:col-span-2 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
              <ImageClassifier onOutputsReceived={handleOutputsReceived} />
              {/* <TextExtractor/> */}
              {/* {messageWithOutputs} */}
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {/* if there is no messages */}
          {chatMessages.length === 0 && messages.length === 0 && !isLoading && (
            <Empty label="No conversation started." />
          )}
          <div className="flex gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  message.role === "user"
                    ? "bg-white border bodrder-black/10 "
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {chatMessages.map((message, index) => (
        <div key={index} className="mb-4">
          {" "}
          {/* Add margin-bottom to each chat message */}
          {/* Question Section */}
          <div className="flex items-center gap-x-2 mb-2">
            {" "}
            {/* Add gap and margin-bottom */}
            <div className="flex-shrink-0 w-6 h-6 rounded-full ml-6">
              {" "}
              {/* User avatar */}
              <UserAvatar />
            </div>
            <div className="bg-gray-100 p-4 rounded-lg flex-1">
              {" "}
              {/* Question block */}
              <strong className="text-gray-800">Question:</strong>
              <p className="text-gray-700">{message.question}</p>
            </div>
          </div>
          {/* Answer Section */}
          <div className="flex items-center gap-x-2">
            {" "}
            {/* Add gap */}
            <div className="flex-shrink-0 w-6 h-6 rounded-full ml-6">
              {" "}
              {/* Bot avatar */}
              <BotAvatar />
            </div>
            <div className="bg-white p-4 rounded-lg flex-1">
              {" "}
              {/* Answer block */}
              <strong className="text-gray-800">Answer:</strong>
              <p className="text-gray-700">{message.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationPage;
