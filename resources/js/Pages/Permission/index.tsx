import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import PrimaryButton from "@/Components/PrimaryButton";
import { Edit2, Plus, Trash2 } from "lucide-react";
import DialogCreate from "@/Pages/Permission/dialog-create";
import { toast } from '@/hooks/use-toast';
import DialogEdit from "@/Pages/Permission/dialog-edit";
import { DialogDelete } from "@/Pages/Permission/dialog-delete";


export default function Permissions() {
    const permissions = usePage().props.permissions;
    const flash = usePage().props.flash;
    console.log(permissions);
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
                    Permission
                </h2>
            }
        >
            <Head title="Permissions" />

            <div className="py-6">
                <div className={'grid gap-4 py-6 sm:px-6 lg:px-8'}>
                    <div className={'flex items-center justify-end'}>
                        <DialogCreate>
                            <PrimaryButton><Plus className={'me-2'} /> Add Permission</PrimaryButton>
                        </DialogCreate>
                    </div>
                    <div className={'rounded-md border border-gray-200'}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className={'text-center w-1/3'}>Permission</TableHead>
                                    <TableHead className={'text-center w-1/3'}>Roles</TableHead>
                                    <TableHead className={'text-center'}>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    permissions.map((permission: any) => (
                                        <TableRow key={permission.id} className={'text-center'}>
                                            <TableCell>{permission.name}</TableCell>
                                            <TableCell>{permission.roles.map((role: any) => role.name).join(', ')}</TableCell>
                                            <TableCell className={'flex justify-center gap-3'}>
                                                <DialogEdit permission={permission}>
                                                    <PrimaryButton><Edit2 size={'20'} /></PrimaryButton>
                                                </DialogEdit>
                                                <DialogDelete permission={permission}>
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
