import { Head, Link } from '@inertiajs/react';
import React from "react";
// @ts-ignore
import { Button } from "@/Components/ui/button";
import { Menu } from "lucide-react";
import { Card } from "@/Components/ui/card";

export default function Home() {
    const [menuOpen, setMenuOpen] = React.useState(false);

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
                <div className="flex flex-col justify-center items-center space-y-4 mx-auto py-[80px]">
                    <span className="text-5xl font-bold text-white">
                        OTP TOOL, Generate OTP for Authentication & Integrated
                    </span>
                    <h2 className="text-6xl font-bold text-[#9EFF00]">Bypass & Authentication Tool for
                        Integrated</h2>
                    <div className="text-2xl text-center text-[#ccc] mt-4 max-w-4xl"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        OTP TOOL is a software generate OTP for authentication & integrated services.
                    </div>
                    <div className="mt-6 flex justify-center space-x-4">
                        <a href={'https://mega.nz/folder/mfp0HQDC#z5xObQSsKAM-LOHz7if-6Q'}
                            target="_blank" rel="noopener noreferrer">
                            <Button className={'text-2xl mt-4 p-6 bg-[#9EFF00] hover:bg-[#7ED957] text-black'}>
                                Download Tools
                            </Button>
                        </a>
                    </div>
                </div>
                <div className='grid grid-flow-col lg:grid-cols-2 gap-4 py-[80px] sm:px-6 lg:px-12'>
                    <div className='flex justify-center items-center'>
                        <div className="text-4xl font-bold text-white text-left w-full max-w-lg">
                            Unlock the Power of tools:
                            <br />
                            <span className='text-[#9EFF00]'>Your Ultimate Solution for Seamless Authentication and Integrated Services!</span>
                        </div>
                    </div>
                    <img src="/img/tools.jpeg" className={'w-100 mx-auto'} alt="logo" />
                </div>
                <div className={'grid lg:grid-cols-3 gap-4 py-[80px] sm:px-6 lg:px-8'}>
                    <Card
                        className={'bg-dark border border-gray-400 rounded-md p-6 shadow-md hover:shadow-lg transition-shadow duration-300'}>
                        <div className={'flex flex-col items-center'}>
                            <div className="text-5xl animate-[blink_1.2s_infinite] mb-5">🚀</div>
                            <style>
                                {`
                @keyframes blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.4; }
                }
                `}
                            </style>
                            <h3 className={'text-center text-4xl text-[#9EFF00] font-bold mt-4'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>Generate OTP</h3>
                            <p className={'text-xl text-center text-gray-400 mt-2'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>Real-time updates of global flash
                                activities,
                                synced with our servers.</p>
                        </div>
                    </Card>
                    <Card
                        className={'bg-dark border border-gray-400 rounded-md p-6 shadow-md hover:shadow-lg transition-shadow duration-300'}>
                        <div className={'flex flex-col items-center'}>
                            <div className="text-5xl animate-[blink_1.2s_infinite] mb-5">🎯</div>
                            <style>
                                {`
                @keyframes blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.4; }
                }
                `}
                            </style>
                            <h3 className={'text-center text-4xl text-[#9EFF00] font-bold mt-4'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>Connected Integrated</h3>
                            <p className={'text-xl text-center text-gray-400 mt-2'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>All Device & Application Support</p>
                        </div>
                    </Card>
                    <Card
                        className={'bg-dark border border-gray-400 rounded-md p-6 shadow-md hover:shadow-lg transition-shadow duration-300'}>
                        <div className={'flex flex-col items-center'}>
                            <div className="text-5xl animate-[blink_1.2s_infinite] mb-5">🧩</div>
                            <style>
                                {`
                @keyframes blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0.4; }
                }
                `}
                            </style>
                            <h3 className={'text-center text-4xl text-[#9EFF00] font-bold mt-4'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>Repair Devices</h3>
                            <p className={'text-xl text-center text-gray-400 mt-2'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>We provide the best flashing,
                                unlocking, and repairing services.</p>
                        </div>
                    </Card>
                </div>
                <div className="overflow-hidden whitespace-nowrap  py-[50px] mb-4">
                    <div
                        className="inline-block animate-marquee text-6xl font-bold  text-[#9EFF00]"
                        style={{
                            animation: "marquee 10s linear infinite",
                            textShadow: "0 0 8px #7ED957, 0 0 10px #7ED957",
                            fontFamily: "'Orbitron', sans-serif"
                        }}
                    >
                        Server On 24 / 7 &nbsp; • &nbsp; Server On 24 / 7 &nbsp; • &nbsp; Server On 24 / 7
                    </div>
                    <style>
                        {`
                @keyframes marquee {
                    0% { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                `}
                    </style>
                </div>
                <h2 className="text-center text-5xl font-bold  text-[#9EFF00] mt-[50px]"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>Pricing</h2>
                <div className={'flex justify-center py-[30px] sm:px-6 lg:px-8'}>
                    <Card
                        className={'max-w-sm bg-dark border border-gray-700 rounded-md p-8 shadow-md hover:shadow-lg transition-shadow duration-300'}>
                        <div className={'flex flex-col items-center'}>
                            <h3 className={'text-center text-4xl font-bold  text-[#9EFF00] mt-4'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>1 Credit</h3>
                            <p className={'text-3xl text-center text-gray-400 my-6'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>Get started with 1 credit for
                                quick access to our tool.</p>
                            <Link href={route('register')}>
                                <Button className={'text-2xl mt-4 p-6 bg-[#9EFF00] hover:bg-[#7ED957] text-black'}>Get Started</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
                <h2 className="text-center text-5xl font-bold  text-[#9EFF00] mt-[50px]"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>Frequently Asked Questions</h2>
                <div className={'flex flex-col justify-center gap-4 py-[30px] sm:px-6 lg:px-8'}>
                    <Card
                        className={'w-full bg-dark border border-gray-700 rounded-md p-8 shadow-md hover:shadow-lg transition-shadow duration-300'}>
                        <div className={'flex flex-col items-start'}>
                            <h3 className={'text-start text-4xl font-bold  text-[#9EFF00] mt-4'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>What is OTP
                                TOOL?</h3>
                            <p className={'text-xl text-start text-gray-400 my-6'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>OTP TOOL is a powerful software
                                utility designed specifically for generate OTP. It helps users bypass authentication
                                and perform advanced tasks like flashing, unlocking, and repairing.</p>
                        </div>
                    </Card>
                    <Card
                        className={'w-full bg-dark border border-gray-700 rounded-md p-8 shadow-md hover:shadow-lg transition-shadow duration-300'}>
                        <div className={'flex flex-col items-start'}>
                            <h3 className={'text-start text-4xl font-bold  text-[#9EFF00] mt-4'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>How does OTP TOOL
                                work?</h3>
                            <p className={'text-xl text-start text-gray-400 my-6'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>It bypasses with generate OTP and Integrated application & services to provide a seamless experience for users.</p>
                        </div>
                    </Card>
                    <Card
                        className={'w-full bg-dark border border-gray-700 rounded-md p-8 shadow-md hover:shadow-lg transition-shadow duration-300'}>
                        <div className={'flex flex-col items-start'}>
                            <h3 className={'text-start text-4xl font-bold  text-[#9EFF00] mt-4'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>Is it safe to use?</h3>
                            <p className={'text-xl text-start text-gray-400 my-6'}
                                style={{ fontFamily: "'Orbitron', sans-serif" }}>Yes, OTP TOOL is built with
                                security in mind. As long as it's used correctly on supported all application & service, it ensures
                                a smooth and reliable process without harming your device.</p>
                        </div>
                    </Card>
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