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
import {saveMessageData} from "@/lib/message";

const ConversationPage = () => {
    const proModal = useProModal();
    const router = useRouter();
    const [messages , setMessages] = useState<ChatCompletionRequestMessage[]>([]);

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
        const response = await axios.post('/api/conversation', { messages: newMessages });
        console.log("question" , question);
        console.log("response" , response);
        setMessages((current) => [...current, userMessage, response.data]);
        // await saveMessageData(question , response.data.content);
        // const ans = await saveMessageData(";;;", "qqqq");
        console.log("anss" , ans);
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
  

    return ( 
        <div>   
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