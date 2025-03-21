"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, FileText, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuItemLink,
} from "@/components/other-sidebar"

const dashboardNavItems = [
  {
    title: "Statistics",
    href: "/dashboard",
    icon: BarChart2,
  },
  {
    title: "Matches",
    href: "/dashboard/matches",
    icon: FileText,
  },

  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-zinc-800">
      <SidebarContent>
        <SidebarMenu>
          {dashboardNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuItemLink asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-400 transition-colors hover:text-white",
                    pathname === item.href && "bg-zinc-800 text-white",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              </SidebarMenuItemLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
