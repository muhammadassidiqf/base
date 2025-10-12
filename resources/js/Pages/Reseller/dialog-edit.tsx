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
import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Reseller } from "@/types";

interface Props {
    children: React.ReactNode,
    reseller: Reseller
}

export default function DialogEdit({ children, reseller }: Props) {
    const [open, setOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        facebook: '',
        whatsapp: '',
        telegram: '',
        image: null as File | null,
    });

    useEffect(() => {
        setData('name', reseller.name)
        setData('description', reseller.description)
        setData('facebook', reseller.facebook)
        setData('whatsapp', reseller.whatsapp)
        setData('telegram', reseller.telegram)
    }, [reseller]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('resellers.update', reseller.id), {
            onSuccess: () => {
                reset('description', 'name', 'facebook', 'whatsapp', 'telegram', 'image');
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
                        <DialogTitle>Edit Reseller</DialogTitle>
                        <DialogDescription>
                            Update reseller to page reseller.
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
                                id="username"
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
                    <div>
                        <div className="grid grid-cols-5 items-center gap-4 my-4">
                            <Label htmlFor="facebook" className="text-left">
                                Facebook
                            </Label>
                            <Input
                                id="facebook"
                                value={data.facebook}
                                className="col-span-4"
                                onChange={(e) => setData('facebook', e.target.value)}
                                type="url"
                            />
                        </div>
                        <InputError
                            message={errors.facebook}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <div className="grid grid-cols-5 items-center gap-4 my-4">
                            <Label htmlFor="whatsapp" className="text-left">
                                Whatsapp
                            </Label>
                            <Input
                                id="whatsapp"
                                value={data.whatsapp}
                                className="col-span-4"
                                onChange={(e) => setData('whatsapp', e.target.value)}
                                type="url"
                            />
                        </div>
                        <InputError
                            message={errors.whatsapp}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <div className="grid grid-cols-5 items-center gap-4 my-4">
                            <Label htmlFor="telegram" className="text-left">
                                Telegram
                            </Label>
                            <Input
                                id="telegram"
                                value={data.telegram}
                                className="col-span-4"
                                onChange={(e) => setData('telegram', e.target.value)}
                                type="url"
                            />
                        </div>
                        <InputError
                            message={errors.telegram}
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <div className="grid grid-cols-5 items-center gap-4 my-4">
                            <Label htmlFor="image" className="text-left">
                                Telegram
                            </Label>
                            <Input
                                id="image"
                                type={'file'}
                                value={undefined}
                                className="col-span-4"
                                max={1}
                                onChange={(e) => setData('image', e.target.files![0] ?? null)}
                            />
                        </div>
                        <InputError
                            message={errors.image}
                            className="mt-2"
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={processing}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
