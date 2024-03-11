"use client";

import toast from "react-hot-toast";
import * as z from "zod";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form , FormField , FormItem , FormControl} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import axios from "axios";
import {useRouter } from "next/navigation"
import {ChatCompletionRequestMessage} from "openai";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-modal";
import  ImageClassifier  from "@/components/object-detector/index";

const ConversationPage = ({ chatId }: { chatId: string }) => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages , setMessages] = useState<ChatCompletionRequestMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues:{
            prompt : ""
        }
    }); 

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        // throw new Error("something")
        const userMessage: ChatCompletionRequestMessage = { role: "user", content: values.prompt };
        const newMessages = [...messages, userMessage];
        const { prompt } = values;
        const question = prompt;

        const response = await axios.post('/api/conversation', { messages: newMessages});
        const responseData: string = response.data.content as string;
        setMessages((current) => [...current, { ...userMessage, chatId }, response.data]);

        // await saveQuestion(question);
        // await saveAnswer(responseData);
        console.log(question , "question before post");
        console.log(responseData , "responseData before post");

        // const createResponse = await fetch('http://localhost:3000/api/message', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ question, responseData }),
        // });
    
        // if (!createResponse.ok) {
        //   const data = await createResponse.json();
        //   return alert('Unable to create Message' || data.message);
        //   console.log("data" , data);
        // }
    
        // // Fetch messages after creating a new message
        // await fetchMessages();

        // console.log("question" , question);
        // console.log("response" , response);
        setMessages((current) => [...current, userMessage, response.data]);
        console.log("chatId from onSubmit" , chatId);
        const createResponseData = await saveResponse(question, responseData , chatId);
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


        await saveMessageToChat(chatId , createResponseData );
        console.log("question after" , question);
        console.log("response after" , responseData);
        await fetchMessages();

        // await saveMessageData(question , response.data.content);
        // const ans = await saveMessageData(";;;", "qqqq");
        // console.log("anss" , ans);
        // if (response){
          // await saveMessageData();
        //   console.log("from conversation")
        // }
        //saving chat to prisma db
        // const messageData = {
        //   question : values.prompt,
        //   answer : response.data
        // }
        // prisma.stripe
        form.reset();
      } catch (error: any) {
        if (error?.response?.status === 403) {
          proModal.onOpen();
        }else {
          toast.error("Something went wrong");
        }
      }
       finally {
        router.refresh();
      }
    }
  
    const saveResponse = async (question: string, responseData: string , chatId : string) => {
      try {
        const createResponse = await fetch("http://localhost:3000/api/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, responseData , chatId}),
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


    // const getChatById = async (id: string): Promise<Chat> => {
    //   try {
    //     const res = await fetch(`http://localhost:3001/api/chats/${id}`, {
    //       cache: "no-store",
    //     });
    
    //     if (!res.ok) {
    //       throw new Error("Failed to fetch chat");
    //     }
    
    //     return res.json();
    //   } catch (error) {
    //     console.log(error);
    //     return { name: "" }; // Return empty name in case of error
    //   }
    // };

    const saveMessageToChat = async (id: string, messageObject : any) => {
      try {
        const createResponse = await fetch(`http://localhost:3000/api/chat/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messageObject}),
        });
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
    

    const getMessageById = async (id : string) => {
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


    // const createMessage = async () => {
    //   try {
    //     const response = await fetch('/api/message', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ question, responseData }),
    //     });
    //     if (!response.ok) {
    //       const data = await response.json();
    //       return alert('Unable to create Message' || data.message);
    //     }
        
    //     // Fetching messages after creating a new message
    //     await fetchMessages();
    //   } catch (error: any) {
    //     console.error('Error creating message:', error);
    //     if (error.response) {
    //       console.error('Server responded with status:', error.response.status);
    //     } else {
    //       console.error('Error details:', error.message);
    //     }
    //   }
    // };
    
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/message', {
          cache: 'no-store',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const responseData = await response.json();
        console.log('chats', responseData);
        if (Array.isArray(responseData.chats)) {
          // setChatsData(responseData.chats.reverse()); // Reversing to show the latest chats first
        } else {
          console.error('Invalid data format: "chats" is not an array');
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    return ( 
        <div>   
          {/* <ChatApp/> */}
        <div>
            <Heading title="conversation" description="our most advanced conversation model." icon={MessageSquare} iconColor="text-violet-500" bgColor="bg-violet-500/10" />
        </div>

        <div className="px-4 lg:px-8">
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}  className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within-shadow-sm grid grid-cols-12 gap-2">
                        <FormField name="prompt" render={({field}) => (
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
<ImageClassifier/>

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
                          {messages.length === 0 && !isLoading && (
                            <Empty label="No conversation started."/>
                          )}
                                <div className="flex flex-col-reverse gap-y-4">
                                    {messages.map((message) => (
                                    <div key={message.content}
                                    className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border bodrder-black/10 " : "bg-muted" )}
                                    >
                                      {message.role === "user" ? <UserAvatar/> : <BotAvatar/>}
                                      <p className="text-sm">  
                                        {message.content}
                                      </p>

                                    </div>
                          ))}
                  </div>
            </div>
        </div>
        </div>
     );
}
 
export default ConversationPage;