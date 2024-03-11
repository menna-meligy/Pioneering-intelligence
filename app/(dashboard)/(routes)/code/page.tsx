"use client";

import * as z from "zod";
import { Heading} from "@/components/heading";
import { Code, Divide } from "lucide-react";
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
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";


const CodePage = () => {
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

    const onSubmit = async (values : z.infer<typeof formSchema>) => {
        console.log("valuees" , values);

        try{
            //modifications with the local messages and post req new api routes 
            const userMessage : ChatCompletionRequestMessage = {
                role : "user",
                content : values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const { prompt } = values;
            const question = prompt;
            const response = await axios.post("/api/code" , {messages : newMessages});
            setMessages((current) => [...current , userMessage , response.data]); 
            
            console.log("questionnnnnn" , question);
            console.log("response" , response.data.content);
            
            // await saveMessageData(question , response.data.content);
            // if (ans === undefined || ans === null) {
            //   console.log("f");
            // }else {
            //   console.log("t");
            // }
            // console.log("anssssssssssssssss" , ans);
            form.reset();
        }catch(err : any){
            // console.log(err);
            //TO_DO : OPEN PREMIUM MODEL
            if(err?.response?.status === 403){
              proModal.onOpen();
            }else {
                toast.error("Something went wrong");       
                console.log("error" , err);    
            }
        }

        finally{
            router.refresh();
        }
    };

    return ( 
        <div>   
        <div>
            {/* Hello conversation */}
            <Heading title="Code Generation" description="Generate code by description text." icon={Code} iconColor="text-green-700" bgColor="bg-violet-500/10" />
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
                   placeholder="implement a toggle button using react hooks." 
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
                                      {/* <p className="text-sm">  
                                        {message.content}
                                      </p> */}
                                        <ReactMarkdown 
                                        components={{pre : ({node , ...props}) => 
                                        (
                                          <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                              <pre {...props}/>
                                          </div>
                                        ),
                                        code : ({node , ...props}) =>(
                                          <code  className="bg-black/10 rounded-lg p-1" {...props}/>
                                        )
                                        }}
                                        className="text-sm overflow-hidden leading-7"
                                        
                                        >
                                          {message.content || ""}
                                        </ReactMarkdown>
                                    </div>
                          ))}
                  </div>
            </div>
        </div>
        </div>
     );
}
 
export default CodePage;