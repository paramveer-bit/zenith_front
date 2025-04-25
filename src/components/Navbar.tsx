"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { BarChart3, ChevronDown, Globe, LayoutDashboard, LogOut, Menu, Settings, Shield, Users } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useMobile } from "@/components/hooks/use-mobile"

function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [active, setActive] = useState("/dashboard")
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()
  const { toast } = useToast()

  useEffect(() => {
    setActive(pathname.split("/")[1])
  }, [pathname])

  const logout = async () => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signout`, {}, { withCredentials: true })
      await axios.get("/api/logout", { withCredentials: true })
      router.push("/")
      console.log(res)
    } catch (error) {
      console.error("Error fetching API usage data:", error)
      toast({
        title: "Error",
        description: "Error logging out",
        variant: "destructive",
      })
    }
  }

  const hover = "hover:bg-muted hover:text-foreground text-muted-foreground"
  const activeClass = "bg-primary text-primary-foreground"

  const navLinks = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/api-routes", icon: Globe, label: "API Routes" },
    { href: "/api-analytics", icon: BarChart3, label: "Analytics" },
    { href: "/authentication", icon: Shield, label: "Authentication" },
    { href: "/team", icon: Users, label: "Team" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ]

  // Desktop sidebar navigation
  if (!isMobile) {
    return (
      <nav className="grid gap-2 p-4 text-sm h-full">
        <div className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active === link.href.substring(1) ? activeClass : hover}`}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Logout Button at Bottom */}
        <button
          className="flex gap-2 rounded-lg mt-auto px-3 py-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>
    )
  }

  // Mobile top navigation with dropdown
  return (
    <nav className="w-full p-2 border-b">
      <div className="flex items-center justify-between">
        <Link href="/dashboard" className="font-semibold text-lg">
          Dashboard
        </Link>

        {/* Mobile dropdown menu */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="pt-10">
              <div className="grid gap-2 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active === link.href.substring(1) ? activeClass : hover}`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
                <button
                  className="flex gap-2 rounded-lg mt-4 px-3 py-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Alternative dropdown implementation */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="hidden md:block">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                Menu
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg border z-50">
              <div className="py-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2 text-sm ${active === link.href.substring(1) ? "bg-muted font-medium" : "hover:bg-muted"}`}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                ))}
                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-muted"
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
