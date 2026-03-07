// components/NavbarWrapper.tsx  ← Server Component (no "use client")
import { checkUser } from "./checkUser";
import Navbar from "./Navbar";

export default async function NavbarWrapper() {
  const user = await checkUser(); // runs on server only ✅
  return <Navbar  />;
}