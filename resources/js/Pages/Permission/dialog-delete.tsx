import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog"
import React, { useState } from "react";
import { Permission } from "@/types";
import { router, useForm } from "@inertiajs/react";

interface Props {
    children: React.ReactNode,
    permission: Permission;
}

export function DialogDelete({ children, permission }: Props) {
    const [open, setOpen] = useState(false);
    const { post, processing, errors } = useForm();
    const submit = () => {
        router.delete(route('permissions.destroy', permission?.id), {
            onSuccess: () => {
                setOpen(false)
            }
        });
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={submit} disabled={processing}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
