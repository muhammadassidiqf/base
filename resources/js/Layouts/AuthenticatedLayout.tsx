import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { ChevronDown, User } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import { Toaster } from "@/Components/ui/toaster";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/Components/ui/dropdown-menu";

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {

    const user = usePage().props.auth.user;

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger />
                        {header && <div className="flex items-center gap-4">{header}</div>}
                    </div>
                    <div className="flex items-center justify-between border-0">
                        <div className="flex items-center">

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="hidden md:block px-2">
                                    <div className="flex gap-2 items-center cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <User />
                                            <span>{user.name}</span>
                                            <ChevronDown />
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="start">

                                    <DropdownMenuItem className="cursor-pointer w-full">
                                        <Link href={route('profile.edit')} className="w-full">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="cursor-pointer w-full">
                                        <Link href={route('logout')} method="post" as="button"
                                            className="w-full text-start">Log Out</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="flex md:hidden mr-2 items-center gap-4">

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <User />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem className="cursor-pointer w-full">
                                            <Link href={route('profile.edit')} className="w-full">Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer w-full">
                                            <Link href={route('logout')} method="post" as="button"
                                                className="w-full text-start">Log Out</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>


                        </div>
                    </div>
                </div>
                {children}
                <Toaster />
            </div>
        </SidebarProvider>
    );
}
