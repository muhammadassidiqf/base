import { Cog, Key, LayoutDashboard, User2Icon, Zap } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { Link, usePage } from "@inertiajs/react"

export function AppSidebar() {
    const auth = usePage().props.auth.user;
    console.log(auth);
    const items = [
        {
            title: "Dashboard",
            url: "dashboard",
            icon: LayoutDashboard,
            status: auth?.roles?.some(r => r.permissions?.some(p => p.name === 'dashboard')) ? 'active' : 'inactive',
        },
        {
            title: "Manajemen Akun",
            url: "users",
            icon: User2Icon,
            status: auth?.roles?.some(r => r.permissions?.some(p => p.name === 'user')) ? 'active' : 'inactive',
        },
        {
            title: "Roles",
            url: "roles",
            icon: Cog,
            status: auth?.roles?.some(r => r.permissions?.some(p => p.name === 'role')) ? 'active' : 'inactive',
        },
        {
            title: "Permissions",
            url: "permissions",
            icon: Key,
            status: auth?.roles?.some(r => r.permissions?.some(p => p.name === 'permission')) ? 'active' : 'inactive',
        },
    ]

    return (
        <Sidebar>
            <SidebarContent className="bg-gradient-to-b from-slate-800 to-gray-900">
                <SidebarGroup>
                    <SidebarGroupLabel className="mt-4 mb-8 p-0">
                        <div className="flex items-center gap-4">
                            <Zap className="text-white cursor-pointer" />
                            <span className="text-xl text-white font-bold">Base App</span>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                item.status == 'active' &&
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="hover:bg-slate-700 active:bg-slate-700 my-2 text-lg">
                                        <Link href={item.url ? route(item.url) : "#"}>
                                            <item.icon className="text-white" width={32} height={32} />
                                            <span className="text-white">{item.title}</span>
                                        </Link>
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
