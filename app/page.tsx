import { checkUser } from "@/components/checkUser";
import Dashboard from "@/components/dashboard";
import GuestHomePage from "@/components/Guest";
import BlurLoader from "@/components/LoadingScreen";
import { Suspense } from "react";

export default async function Home() {
  const user = await checkUser();
  if(!user)
    return <GuestHomePage/>
  return (
   <>
    <Dashboard user={user} />
   
   </>
  );
}