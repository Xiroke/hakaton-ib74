import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

// Menu items.
const items = [
  {
    icon: Home,
    title: 'Дашбоард',
    url: '#',
  },
  {
    icon: Inbox,
    title: 'Inbox',
    url: '#',
  },
  {
    icon: Calendar,
    title: 'Calendar',
    url: '#',
  },
  {
    icon: Search,
    title: 'Search',
    url: '#',
  },
  {
    icon: Settings,
    title: 'Выйти',
    url: '#',
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Навигация</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
