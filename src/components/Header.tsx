import React from 'react'

import Link from "next/link"
import {
  ArrowUpRight,
  Globe,
} from "lucide-react"

import { Button } from "@/components/ui/button"


function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Globe className="h-6 w-6" />
          <span>Dynamic API Router</span>
        </Link>
        <nav className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" asChild>
                <Link href="/documentation">
                Documentation
                <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
            </Button>
            {/* <Button variant="outline" size="sm" asChild>
                <Link href="/settings">
                <Settings className="mr-1 h-4 w-4" />
                Settings
                </Link>
            </Button> */}
        </nav>
    </header>
  )
}

export default Header