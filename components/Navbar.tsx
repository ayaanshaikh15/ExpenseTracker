"use client"
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import {

  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from "next/link";
export default function Navbar() {

  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [{
    "name": "Home",
    "path": "/"
  }, {"name": "About", "path": "/about"}, {"name": "Contact", "path": "/contact"}];

  return (
    <div>
      {/* Main Navbar */}
      <nav className=" border-b border-gray-250 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Left - Logo */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">
              💸
            </div>
            <div className="leading-tight hidden sm:flex flex-col ">
              <p className="font-bold text-sm tracking-tight">
                Expense Tracker
              </p>
              <p className="text-emerald-400 text-xs font-medium tracking-widest uppercase">
                AI Powered
              </p>
            </div>
          </div>

          {/* Center - Nav Links (desktop) */}
          <ul className="hidden md:flex items-center gap-5 flex-1 justify-center list-none">
            {navLinks.map((link,index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  onClick={() => setActive(link.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative
                    ${active === link.name
                      ? " bg-emerald-500/10"
                      : " hover:text-green-300 hover:bg-white/5"
                    }`}
                >
                  {link.name}
                  {active === link.name && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right - Sign Up Button (desktop) */}
          <div className="hidden md:flex flex-1 justify-end gap-4 ">
            <ModeToggle/>
             <SignedOut>
              
              
              <Link href={'/sign-in'} className="bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-950 font-semibold text-sm px-5 py-2 rounded-lg hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 shadow-md shadow-emerald-500/20">
              Sign in 
            </Link>
             
            </SignedOut>
            {/* Show the user button when the user is signed in */}
            <SignedIn>
              <UserButton />
            </SignedIn>
            
          </div>

          {/* Hamburger (mobile) */}
          <div className="flex  md:hidden mx-2">
            <ModeToggle />
           
          </div>
            
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-400 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-400 rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-400 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile Menu */}
       
        {menuOpen && (
          <div className="md:hidden  border-t border-gray-800 px-6 py-4 flex flex-col gap-2">
            
            {navLinks.map((link,index) => (
              <Link
                  href={link.path}
                key={index}
                onClick={() => { setActive(link.name); setMenuOpen(false); }}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${active === link.name  
                   ? " bg-emerald-500/10"
                      : " hover:text-green-300 hover:bg-white/5"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <SignedOut>
              
              
              <Link href={'/sign-in'} className="bg-gradient-to-r from-emerald-400 to-blue-500 text-gray-950 font-semibold text-sm px-5 py-2 rounded-lg hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 shadow-md shadow-emerald-500/20">
              Sign in 
            </Link>
             
            </SignedOut>
            {/* Show the user button when the user is signed in */}
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        )}
      </nav>
    </div>
  );
}