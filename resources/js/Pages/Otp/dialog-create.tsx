import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { User } from "@/types";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode,
    users: User[]
}

export default function DialogCreate({ children, users }: Props) {
    const [open, setOpen] = useState(false);
    const [openSelect, setOpenSelect] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{ id: number; username: string } | null>(null);
    const auth = usePage().props.auth.user;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        assign_to: '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('otp'), {
            onSuccess: () => {
                reset('name', 'description', 'assign_to');
                setOpen(false)
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
                        <DialogTitle>Add OTP Source</DialogTitle>
                        <DialogDescription>
                            Add a new OTP source.
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
                            <Label htmlFor="description" className="text-left">
                                Description
                            </Label>
                            <Input
                                id="description"
                                value={data.description}
                                className="col-span-4"
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>
                    {
                        (auth?.roles && (auth.roles[0].name === 'superadmin') || (auth.roles[0].name === 'admin')) &&
                        (

                            <div>
                                <div className="grid grid-cols-5 items-center gap-4 my-4">
                                    <Label htmlFor="roles" className="text-left">
                                        User
                                    </Label>
                                    <Popover open={openSelect} onOpenChange={setOpenSelect}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-[200px] justify-between"
                                            >
                                                {selectedUser
                                                    ? users.find((user) => user.id === selectedUser.id)?.name
                                                    : "Select user..."}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search user..." />
                                                <CommandList>
                                                    <CommandEmpty>No user found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {users.map((user) => (
                                                            <CommandItem
                                                                key={user.username}
                                                                value={user.username}
                                                                onSelect={(currentValue) => {
                                                                    setSelectedUser({
                                                                        id: users.find((user) => user.username === currentValue)?.id ?? 0,
                                                                        username: currentValue
                                                                    })
                                                                    setData('assign_to', String(users.find((user) => user.username === currentValue)?.id ?? 0))
                                                                    setOpenSelect(false)
                                                                }}
                                                            >
                                                                {user.username}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        selectedUser?.id === user.id ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <InputError className="mt-2" message={errors.assign_to} />
                            </div>
                        )
                    }
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
