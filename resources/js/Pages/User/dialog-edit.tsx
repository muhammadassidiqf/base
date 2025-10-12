import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
// @ts-ignore
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
// @ts-ignore
import { Input } from "@/Components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { User } from '@/types';

interface Props {
    children: React.ReactNode,
    users: User
}

export default function DialogEdit({ children, users }: Props) {
    const [open, setOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<{ id: number; name: string } | null>(null);
    const [serverError, setServerError] = useState<string>('');
    const roles = usePage().props.roles;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        roles: '',
        password: '',
    });

    useEffect(() => {
        setData('name', users.name);
        setData('username', users.username);
        setSelectedRole(users.roles[0]);
        setData('roles', users.roles[0]?.name || '');
    }, [users]);
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('users.update', users?.id), {
            onSuccess: () => {
                reset('name', 'username', 'roles', 'password');
                setOpen(false);
                setServerError('');
            },
            onError: (errors) => {
                if (errors.message) {
                    setServerError(errors.message);
                }

                if (errors.error) {
                    setServerError(errors.error);
                }
            },
            onFinish: () => {
                reset('name', 'username', 'roles', 'password');
                setOpen(false);
                setServerError('');
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
                        <DialogTitle>Edit User</DialogTitle>
                        <DialogDescription>
                            Update user data.
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
                            <Label htmlFor="username" className="text-left">
                                Username
                            </Label>
                            <Input
                                id="username"
                                value={data.username}
                                className="col-span-4"
                                onChange={(e) => setData('username', e.target.value)}
                            />
                        </div>
                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <div className="grid grid-cols-5 items-center gap-4 my-4">
                            <Label htmlFor="password" className="text-left">
                                Password
                            </Label>
                            <Input
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                type="password"
                                className="col-span-4"
                                autoComplete="password"
                            />
                        </div>
                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <div className="grid grid-cols-5 items-center gap-4 my-4">
                            <Label htmlFor="roles" className="text-left">
                                Roles
                            </Label>
                            <Select onValueChange={(value) => {
                                const role = roles.find((r) => r.name === value);
                                setData('roles', value)
                                setSelectedRole(role || null);
                            }}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue
                                        placeholder={selectedRole ? selectedRole?.name : "Select Roles"}>{selectedRole ? selectedRole?.name : "Select Roles"}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        roles.map((role: any) => {
                                            return (
                                                <SelectItem key={role.id} value={role.name}>
                                                    {role.name}
                                                </SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        <InputError className="mt-2" message={errors.roles} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
