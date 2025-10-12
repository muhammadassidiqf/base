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
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { User } from "@/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/Components/ui/command";
import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode,
    users: User[]
}

export default function DialogCredit({ children, users }: Props) {
    const [open, setOpen] = useState(false);
    const [openSelect, setOpenSelect] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{ id: number; username: string } | null>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: '',
        credit_amount: '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('dashboard.store_credit'), {
            onSuccess: () => {
                reset('user_id', 'credit_amount');
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
                        <DialogTitle>Store Credit</DialogTitle>
                        <DialogDescription>
                            Store credit for other user.
                        </DialogDescription>
                    </DialogHeader>

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
                                                            setData('user_id', String(users.find((user) => user.username === currentValue)?.id ?? 0))
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
                        <InputError className="mt-2" message={errors.user_id} />
                    </div>
                    <div>
                        <div className="grid grid-cols-5 items-center gap-4 my-4">
                            <Label htmlFor="name" className="text-left">
                                Credit
                            </Label>
                            <Input
                                id="credit_amount"
                                type={'number'}
                                value={data.credit_amount}
                                className="col-span-4"
                                onChange={(e) => setData('credit_amount', e.target.value)}
                            />
                        </div>
                        <InputError className="mt-2" message={errors.credit_amount} />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}