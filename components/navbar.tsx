'use client'

import { Sparkles} from "lucide-react"
import Link from "next/link"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/theme-toggle"
import { MobileSidebar } from "@/components/mobile-sidebar"

const font = Poppins({
  weight: "600",
  subsets: ["latin"]
})

export const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href={'/'}>
          <h1 className={cn(
            "hidden md:block text-xl md:text-3xl font-bold text-primary",
            font.className
          )}>
            chat.ai
          </h1>
        </Link>
      </div>
      <div>
        <p className="text-muted-foreground">
          This is a Portfolio Project by Rafael Jesus
        </p>
      </div>
      <div className="flex items-center gap-x-3">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}