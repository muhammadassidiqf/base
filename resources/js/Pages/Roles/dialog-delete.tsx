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
import { Roles } from "@/types";
import { router, useForm } from "@inertiajs/react";

interface Props {
    children: React.ReactNode,
    roles: Roles;
}

export function DialogDelete({ children, roles }: Props) {
    const [open, setOpen] = useState(false);
    const { post, processing, errors } = useForm();
    const submit = () => {
        router.delete(route('roles.destroy', roles?.id), {
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
