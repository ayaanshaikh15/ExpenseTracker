import React from 'react'
import { ModeToggle } from './ModeToggle'

export default function Navbar() {
  return (
    <nav className="border-2 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-lg font-bold">Expense Tracker</div>
        <div>
            <ModeToggle/>
        </div>
      </div>
    </nav>  
  )
}
