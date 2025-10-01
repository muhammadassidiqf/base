import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import PrimaryButton from "@/Components/PrimaryButton";
import { Edit2, Plus, Trash2 } from "lucide-react";
import DialogCreate from "@/Pages/User/dialog-create";
import DialogEdit from "@/Pages/User/dialog-edit";
import { toast } from "@/hooks/use-toast";
import { DialogDelete } from "@/Pages/User/dialog-delete";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import { User } from "@/types";
// @ts-ignore
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

const columnHelper = createColumnHelper<User>()

interface ColumnFilter {
    id: string
    value: unknown
}

type ColumnFiltersState = ColumnFilter[]

const columns = [
    columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => (
            <div className={'text-center'}>{row.original.name}</div>
        ),
        filterFn: 'includesString',
    }),
    columnHelper.accessor('username', {
        header: 'Username',
        cell: ({ row }) => (
            <div className={'text-center'}>{row.original.username}</div>
        ),
        filterFn: 'includesString',
    }),
    columnHelper.accessor('roles', {
        header: 'Roles',
        cell: ({ row }) => (
            <div className={'text-center'}>{row.original.roles.map((role: any) => role.name)}</div>
        )
    }),
    columnHelper.accessor(() => 'actions', {
        header: 'Actions',
        cell: ({ row }) => (
            <div className={'flex justify-center gap-3'}>
                <DialogEdit users={row.original}>
                    <PrimaryButton><Edit2 size={'20'} /></PrimaryButton>
                </DialogEdit>
                <DialogDelete users={row.original}>
                    <PrimaryButton><Trash2 size={'20'} /></PrimaryButton>
                </DialogDelete>
            </div>
        )
    })
]

export default function Users() {
    const users = usePage().props.users;
    const flash = usePage().props.flash;
    const [data, _setData] = useState(() => users)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
    })

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

    useEffect(() => {
        _setData(users);
    }, [users]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-6">
                <div className={'grid gap-4 py-6 sm:px-6 lg:px-8'}>
                    <div className={'flex items-center justify-between'}>
                        <div>
                            <div className="grid grid-rows-2 items-center">
                                <Label htmlFor="name" className="text-left">
                                    Search
                                </Label>
                                <Input
                                    id="search"
                                    type={'text'}
                                    className="w-64"
                                    onChange={e => table.setGlobalFilter(String(e.target.value))}
                                    placeholder="Search..."
                                />
                            </div>
                        </div>
                        <DialogCreate>
                            <PrimaryButton><Plus className={'me-2'} /> Add User</PrimaryButton>
                        </DialogCreate>
                    </div>
                    <div className={'rounded-md border'}>
                        <Table className=" rounded-md overflow-hidden">
                            <TableHeader className=" text-sm uppercase">
                                {table.getHeaderGroups().map(headerGroup => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <TableHead key={header.id} className={'text-center'}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody className={'text-center '}>
                                {
                                    users.length > 0 ?
                                        table.getRowModel().rows.map(row => (
                                            <TableRow key={row.id}>
                                                {row.getVisibleCells().map(cell => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                        :
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className={'text-center'}>
                                                No data available
                                            </TableCell>
                                        </TableRow>
                                }
                            </TableBody>
                        </Table>
                        <div className={'flex justify-end gap-3 m-3'}>
                            <Button
                                onClick={() => table.firstPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<<'}
                            </Button>
                            <Button
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {'<'}
                            </Button>
                            <Button
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>'}
                            </Button>
                            <Button
                                onClick={() => table.lastPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {'>>'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
