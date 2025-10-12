import { Head, Link, usePage } from '@inertiajs/react';
import React from "react";
// @ts-ignore
import { Button } from "@/Components/ui/button";
import { FacebookIcon, Menu } from "lucide-react";
import { Card } from "@/Components/ui/card";

export default function Home() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const reseller = usePage().props.reseller;

    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-[#1E1E1E]  text-white">
                <header className="flex justify-center items-center p-6 relative">
                    <div className="absolute left-6 flex items-center space-x-2">
                        <Link href={route('home')}>
                            {/* <img src="/image/icon(purple).png" className={'w-52'} alt="logo" /> */}
                            <span className="text-3xl font-bold text-[#9EFF00]"
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>OTP TOOL</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-6 text-white">
                        <Link href={route('reseller')} aria-current={route().current('reseller') ? "page" : undefined}
                            className="text-white text-2xl hover:text-[#7ED957] aria-[current=page]:text-teal-400 font-bold"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}>Reseller</Link>
                        <a href={'https://t.me/pkauthtool'} target="_blank" rel="noopener noreferrer"
                            className="block text-2xl text-white hover:text-[#7ED957] font-bold"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}>Telegram</a>
                        <Link href={route('login')}
                            className="text-white text-2xl hover:text-[#7ED957] aria-[current=page]:text-teal-400 font-bold"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}>Login</Link>
                        <Link href={route('register')}
                            className="text-white text-2xl hover:text-[#7ED957] aria-[current=page]:text-teal-400 font-bold"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}>Register</Link>
                    </nav>
                    <nav className="absolute right-6 flex md:hidden">
                        <button className="text-white" onClick={() => setMenuOpen(!menuOpen)}>
                            <Menu />
                        </button>
                        {menuOpen && (
                            <div className="absolute top-16 right-0 bg-gray-800 p-4 rounded-lg space-y-2">
                                <Link href={route('reseller')} className="block text-white">Reseller</Link>
                                <a href={'https://t.me/pkauthtool'} target="_blank" rel="noopener noreferrer"
                                    className="block text-white">Telegram</a>
                                <Link href={route('login')} className="block text-white">Login</Link>
                                <Link href={route('register')} className="block text-white">Register</Link>
                            </div>
                        )}
                    </nav>
                </header>
                <div className="flex flex-col justify-center items-center space-y-4 mx-auto pt-[80px]">
                    <h2 className="text-6xl font-bold text-[#15ff00]"
                        style={{
                            textShadow: "0 0 8px #15ff00, 0 0 16px #15ff00",
                            fontFamily: "'Orbitron', sans-serif"
                        }}>Official Resellers & Distributors</h2>
                </div>
                <div className={'grid lg:grid-cols-3 gap-6 py-[80px] sm:px-6 lg:px-[100px]'}>
                    {
                        reseller.length === 0 ? <h1 className="text-center text-white">No Reseller</h1>
                            :
                            reseller.map((item, index) => (
                                <Card
                                    className={'bg-dark border border-gray-500 rounded-md p-6 shadow-md hover:shadow-lg transition-shadow duration-300'}>
                                    <div className={'flex flex-col items-center'}>
                                        <div className="w-24 h-24 animate-[blink_1.2s_infinite] mb-5"><img
                                            src={`storage/uploads/${item.image}`} alt="logo" /></div>
                                        <style>
                                            {`
                                                @keyframes blink {
                                                  0%, 100% { opacity: 1; }
                                                  50% { opacity: 0.4; }
                                                }
                                            `}
                                        </style>
                                        <h3 className={'text-center text-[#9EFF00] text-4xl font-bold mt-4'}
                                            style={{ fontFamily: "'Orbitron', sans-serif" }}>{item.name}</h3>
                                        <h3 className={'text-center text-[#9EFF00] text-2xl font-bold mt-4'}
                                            style={{ fontFamily: "'Orbitron', sans-serif" }}>{item.description}</h3>
                                        <div>
                                            <div className="flex space-x-4 mt-2">
                                                <a href={item.facebook}
                                                    target="_blank" rel="noopener noreferrer">
                                                    <FacebookIcon
                                                        className="text-white w-6 h-6 hover:text-blue-500" />
                                                </a>
                                                <a href={item.whatsapp} target="_blank" rel="noopener noreferrer">
                                                    <img src="/img/whatsapp.svg" alt="whatsapp"
                                                        className="w-6 h-6" />
                                                </a>
                                                <a href={item.telegram} target="_blank" rel="noopener noreferrer">
                                                    <img src="/img/telegram.svg" alt="telegram"
                                                        className="w-6 h-6" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))
                    }
                </div>
                <footer className="bg-gray-900 text-white py-6">
                    <div className="container mx-auto text-center">
                        <p className="text-sm">© 2025 OTP TOOL. All rights reserved.</p>
                        <p className="text-sm">Developed by <a href={'#'}
                            target="_blank" rel="noopener noreferrer"
                            className="text-green-200">OTP TEAM</a></p>
                    </div>
                </footer>
            </div >
        </>
    );
}