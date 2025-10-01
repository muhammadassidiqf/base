import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import PrimaryButton from "@/Components/PrimaryButton";
import { Edit2, Plus, Trash2 } from "lucide-react";
import DialogCreate from "@/Pages/Roles/dialog-create";
import { toast } from '@/hooks/use-toast';
import DialogEdit from "@/Pages/Roles/dialog-edit";
import { DialogDelete } from "@/Pages/Roles/dialog-delete";


export default function Roles() {
    const roles = usePage().props.roles;
    const flash = usePage().props.flash;

    useEffect(() => {
        if (flash && flash.success) {
            toast({
                title: "Success",
                variant: "success",
                description: flash.success,
            })
        }
        if (flash && flash.error) {
            toast({
                title: "Error",
                variant: "destructive",
                description: flash.error
            })
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Roles
                </h2>
            }
        >
            <Head title="Roles" />

            <div className="py-6">
                <div className={'grid gap-4 py-6 sm:px-6 lg:px-8'}>
                    <div className={'flex items-center justify-end'}>
                        <DialogCreate>
                            <PrimaryButton><Plus className={'me-2'} /> Add Role</PrimaryButton>
                        </DialogCreate>
                    </div>
                    <div className={'rounded-md border border-gray-200'}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className={'text-center w-1/3'}>Roles</TableHead>
                                    <TableHead className={'text-center w-1/3'}>Permissions</TableHead>
                                    <TableHead className={'text-center'}>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    roles.map((role: any) => (
                                        <TableRow key={role.id} className={'text-center'}>
                                            <TableCell>{role.name}</TableCell>
                                            <TableCell>{role.permissions.map((permission: any) => permission.name).join(', ')}</TableCell>
                                            <TableCell className={'flex justify-center gap-3'}>
                                                <DialogEdit roles={role}>
                                                    <PrimaryButton><Edit2 size={'20'} /></PrimaryButton>
                                                </DialogEdit>
                                                <DialogDelete roles={role}>
                                                    <PrimaryButton><Trash2 size={'20'} /></PrimaryButton>
                                                </DialogDelete>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
