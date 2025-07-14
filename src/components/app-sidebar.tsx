import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarItemObject } from "@/types/sidebar-types";
import { FileUp, Home, ImagePlus } from "lucide-react";

const instructionMenuItems : SidebarItemObject[] = [
  {
    name: "Current Manual",
    url: "#",
    icon: Home
  },
  {
    name: "Load Gaze Data",
    url: "#",
    icon: FileUp
  }
];

const setupMenuItems : SidebarItemObject[] = [
  {
    name: "Create Manual",
    url: "/create",
    icon: ImagePlus
  },
];

export default function AppSidebar() {
  return (
    <Sidebar side="left" variant="sidebar" className="shadow-md">
        <SidebarHeader className="bg-white flex flex-row justify-between">
          <h1 className="text-xl mt-2"> Gaze Heatmap </h1>
          <SidebarTrigger className="align-center justify-self-center"/>
        </SidebarHeader>
        
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel> Instruction </SidebarGroupLabel>
          {instructionMenuItems.map((item) => (
            <SidebarMenuItem key={item.name} style={{ listStyleType: "none" }}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span> {item.name} </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
        <hr className="border-b border-gray-200 mx-3" />
        <SidebarGroup>
          <SidebarGroupLabel> Setup </SidebarGroupLabel>
          {setupMenuItems.map((item) => (
            <SidebarMenuItem key={item.name} style={{ listStyleType: "none" }}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span> {item.name} </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}