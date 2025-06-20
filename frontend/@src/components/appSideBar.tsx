"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/@src/components/ui/sidebar";
import { NavMain } from "./navMain";
import Logo from "./logo";

const data = {
  navMain: [
    {
      title: "Contests",
      url: "/dashboard/contests",
    },
    /*
    {
      title: "Voucher",
      url: "/dashboard/voucher",
    },
    {
      title: "Stats",
      url: "/dashboard/stats",
    },
    */
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Logo />
                  <span className="font-bold text-xl">Vibe Connect</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
