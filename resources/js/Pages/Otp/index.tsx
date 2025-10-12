import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import PrimaryButton from "@/Components/PrimaryButton";
import { Edit2, Plus, Trash2, Copy } from "lucide-react";
import DialogCreate from "./dialog-create";
import { toast } from "@/hooks/use-toast";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";

const columnHelper = createColumnHelper<any>()

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
    columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ row }) => (
            <div className={'text-center'}>{row.original.description}</div>
        )
    }),
    columnHelper.accessor('created_by', {
        header: 'Created By',
        cell: ({ row }) => (
            <div className={'text-center'}>{row.original.created_by ? row.original.create_by.name : ''}</div>
        )
    }),
    columnHelper.accessor('assign_to', {
        header: 'Assigned To',
        cell: ({ row }) => (
            <div className={'text-center'}>{row.original.assign_to ? row.original.assign_to.name : ''}</div>
        )
    }),
    columnHelper.accessor('otp', {
        header: 'OTP',
        cell: ({ row }) => (
            <div className={'text-center'}>{row.original.otp}</div>
        )
    }),
    columnHelper.accessor(() => 'actions', {
        header: 'Actions',
        cell: ({ row }) => (
            <div className={'flex justify-center gap-3'}>
                <PrimaryButton
                    onClick={() => {
                        navigator.clipboard.writeText(row.original.otp);
                        toast({
                            title: "Success",
                            variant: "success",
                            description: "OTP copied to clipboard!",
                        });
                    }}
                >
                    <Copy size={'20'} />
                </PrimaryButton>
            </div>
        )
    })
]

export default function OtpIndex() {
    const otp = usePage().props.otp;
    const flash = usePage().props.flash;
    const users = usePage().props.users;
    const auth = usePage().props.auth.user;
    const [data, _setData] = useState(() => otp)
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
        _setData(otp);
    }, [otp]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    OTP Sources
                </h2>
            }
        >
            <Head title="OTP" />

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
                        {
                            // auth?.roles && (auth.roles[0].name === 'superadmin') || (auth.roles[0].name === 'admin') &&
                            // (
                            <DialogCreate users={users}>
                                <PrimaryButton><Plus className={'me-2'} /> Add OTP</PrimaryButton>
                            </DialogCreate>
                            // )
                        }
                    </div>
                    <div className={'rounded-md border border-gray-300'}>
                        <Table className="rounded-md overflow-hidden">
                            <TableHeader className="text-sm uppercase">
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
                            <TableBody>
                                {
                                    otp.length > 0 ?
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
