'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/lib/contexts/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export default function AdminLoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const { signIn, user } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        setValue,
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });

    // Load remembered email on mount
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            setValue('email', rememberedEmail);
            setValue('rememberMe', true);
        }
    }, [setValue]);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push('/admin');
        }
    }, [user, router]);

    const onSubmit = async (data) => {
        console.log('Starting login process...');

        // Handle remember me
        if (data.rememberMe) {
            localStorage.setItem('rememberedEmail', data.email);
        } else {
            localStorage.removeItem('rememberedEmail');
        }

        const result = await signIn(data.email, data.password);
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
            const errorMessage = result.error || 'Login failed';
            toast.error(errorMessage);

            // Set form-level error for better UX
            setError('root', {
                type: 'manual',
                message: errorMessage,
            });
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
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Global Error Message */}
                            {errors.root && (
                                <div className="alert alert-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{errors.root.message}</span>
                                </div>
                            )}

                            {/* Email Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Email Address</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="admin@esmbt.com"
                                    className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    disabled={isSubmitting}
                                    autoComplete="email"
                                />
                                {errors.email && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.email.message}</span>
                                    </label>
                                )}
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
                                        className={`input input-bordered w-full pr-12 ${errors.password ? 'input-error' : ''}`}
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be at least 6 characters',
                                            },
                                        })}
                                        disabled={isSubmitting}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                        disabled={isSubmitting}
                                        title={showPassword ? 'Hide password' : 'Show password'}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.password.message}</span>
                                    </label>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="form-control">
                                <label className="label cursor-pointer justify-start space-x-3">
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-primary checkbox-sm"
                                        {...register('rememberMe')}
                                        disabled={isSubmitting}
                                    />
                                    <span className="label-text text-base-300">Remember my email</span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center space-x-2 text-white">
                                            <span className="loading loading-spinner"></span>
                                            <span>Signing in...</span>
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

