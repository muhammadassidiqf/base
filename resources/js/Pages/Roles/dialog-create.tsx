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

interface Props {
    children: React.ReactNode
}

export default function DialogCreate({ children }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [optionsPermission, setOptionsPermission] = useState<{ label: string; value: string }[]>([]);
    const permissions = usePage().props.permissions;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        permissions: selectedItems
    });

    useEffect(() => {
        let option = permissions.map((permission: any) => {
            return { label: permission.name, value: String(permission.name) };
        });
        setOptionsPermission(option);
    }, [permissions]);

    useEffect(() => {
        setData('permissions', selectedItems);
    }, [selectedItems]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('roles'), {
            onSuccess: () => {
                reset('name', 'permissions');
                setOpen(false)
                setOptionsPermission([])
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
                        <DialogTitle>Add Role</DialogTitle>
                        <DialogDescription>
                            Add a new role to the system.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <div className="grid grid-cols-5 items-center gap-4 my-4">
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
                    <div>
                        <div className="grid grid-cols-5 items-center gap-4 my-4">
                            <Label htmlFor="permission" className="text-left">
                                Permission
                            </Label>
                            <MultiSelect placeholder={'Select Permission'} options={optionsPermission}
                                selectedOptions={selectedItems}
                                setSelectedOptions={setSelectedItems}></MultiSelect>
                        </div>
                        <InputError className="mt-2" message={errors.permissions} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
