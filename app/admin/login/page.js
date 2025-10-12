'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, user } = useAuth();
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please enter both email and password');
            return;
        }

        setLoading(true);
        console.log('Starting login process...');

        const result = await signIn(email, password);
        console.log('Sign in result:', result);

        if (result.success) {
            console.log('Login successful, redirecting to /admin...');
            toast.success('Login successful! Redirecting...');
            // Use window.location for full page reload to trigger middleware cookie check
            setTimeout(() => {
                window.location.href = '/admin';
            }, 800);
        } else {
            console.error('Login failed:', result.error);
            toast.error(result.error || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
                <div className="card w-full max-w-md bg-gray-800 shadow-xl">
                    <div className="card-body">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <div className="text-center">
                                <div className="relative w-24 h-24 mb-4 mx-auto">
                                    <Image
                                        src="/images/outlined-logo.webp"
                                        alt="ESM Logo"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <h1 className="text-2xl font-bold text-white">ESM Admin Panel</h1>
                                <p className="text-sm text-gray-400 mt-1">Content Management System</p>
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="admin@esmbt.com"
                                    className="input input-bordered w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    autoComplete="email"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className="input input-bordered w-full pr-12"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        autoComplete="current-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-sm btn-square"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center space-x-2 text-white">
                                            <span className="loading loading-spinner"></span>
                                            Signing in...
                                        </div>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

