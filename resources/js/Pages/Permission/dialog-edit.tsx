import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
// @ts-ignore
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
// @ts-ignore
import { Input } from "@/Components/ui/input";
import MultiSelect from "@/Components/MultiSelect";
import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Permission } from '@/types';

interface Props {
    children: React.ReactNode,
    permission: Permission;
}

export default function DialogEdit({ children, permission }: Props) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: permission.name,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('permissions.update', permission?.id), {
            onSuccess: () => {
                reset('name');
                setOpen(false);
            },
            onError: (errors) => {
                console.error('Update errors:', errors);
            },
            onFinish: () => {
                console.log('Request finished');
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                {children}
            </DialogTrigger>
            <DialogContent>
                <form onSubmit={submit}>
                    <DialogHeader>
                        <DialogTitle>Edit Role</DialogTitle>
                        <DialogDescription>
                            Update role data
                        </DialogDescription>
                    </DialogHeader>
                    <div className={'grid grid-rows-2 mt-4'}>
                        <div className="grid grid-cols-5 items-center gap-4">
                            <Label htmlFor="name" className="text-left">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                className="col-span-4"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                        </div>
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
