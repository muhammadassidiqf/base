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
import React, {useState} from "react";
import {router, useForm} from "@inertiajs/react";
import {Reseller} from "@/types";

interface Props {
    children: React.ReactNode,
    reseller: Reseller
}

export function DialogDelete({children, reseller}: Props) {
    const [open, setOpen] = useState(false);
    const {processing, errors} = useForm();
    const submit = () => {
        router.delete(route('resellers.destroy', reseller?.id), {
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
