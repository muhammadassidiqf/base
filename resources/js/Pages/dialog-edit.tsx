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
import { User } from '@/types';

interface Props {
    children: React.ReactNode,
    users: User
}

export default function DialogEdit({ children, users }: Props) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: users.id,
        credit_amount: '',
    });
    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('dashboard.edit_credit'), {
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
                        <DialogTitle>Edit Credit</DialogTitle>
                        <DialogDescription>
                            Edit credit for other user.
                        </DialogDescription>
                    </DialogHeader>
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