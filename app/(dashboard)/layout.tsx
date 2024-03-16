import Navbar from "@/components/Navbar";
import {Sidebar} from "@/components/Sidebar";
import ChatApp from "@/components/chat";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children } : {children : React.ReactNode}) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  
    return (
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
          {/* <ChatApp/> */}
          <Sidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
        </div>
        <main className="h-full md:pl-72">
          <Navbar />
          {children}
        </main>
      </div>
    );
  };
  
  export default DashboardLayout;
  