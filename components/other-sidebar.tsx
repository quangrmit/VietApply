"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export const SidebarTrigger = ({ children }: { children: ReactNode }) => {
  return <button>{children}</button>
}

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>
}

export function Sidebar({ children, className }: { children: ReactNode; className?: string }) {
  return <aside className={cn("flex flex-col sticky top-20 self-start", className)}>{children}</aside>
}

export function SidebarHeader({ children }: { children: ReactNode }) {
  return <header className="px-6 py-4">{children}</header>
}

export function SidebarContent({ children }: { children: ReactNode }) {
  return <div className="flex-1">{children}</div>
}

export function SidebarMenu({ children }: { children: ReactNode }) {
  return <ul className="space-y-2 p-6 ">{children}</ul>
}

export function SidebarMenuItem({ children }: { children: ReactNode }) {
  return <li>{children}</li>
}

export function SidebarMenuItemButton({ children }: { children: ReactNode }) {
  return <button>{children}</button>
}

export function SidebarMenuItemLink({ children, asChild }: { children: ReactNode; asChild?: boolean }) {
  return asChild ? children : <a>{children}</a>
}

