'use client';

import { useEffect } from 'react';

export default function Modal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = 'confirm', // 'confirm', 'alert', 'warning', 'danger'
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    showCancel = true,
    icon = null,
}) {
    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getIconAndColor = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: icon || (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                    ),
                    iconBg: 'bg-red-100',
                    iconColor: 'text-red-600',
                    buttonBg: 'bg-red-600 hover:bg-red-700',
                    buttonText: 'text-white',
                };
            case 'warning':
                return {
                    icon: icon || (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                    ),
                    iconBg: 'bg-yellow-100',
                    iconColor: 'text-yellow-600',
                    buttonBg: 'bg-yellow-600 hover:bg-yellow-700',
                    buttonText: 'text-white',
                };
            case 'alert':
                return {
                    icon: icon || (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>
                    ),
                    iconBg: 'bg-blue-100',
                    iconColor: 'text-blue-600',
                    buttonBg: 'bg-blue-600 hover:bg-blue-700',
                    buttonText: 'text-white',
                };
            default: // confirm
                return {
                    icon: icon || (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                    ),
                    iconBg: 'bg-sky-100',
                    iconColor: 'text-sky-600',
                    buttonBg: 'bg-sky-600 hover:bg-sky-700',
                    buttonText: 'text-white',
                };
        }
    };

    const { icon: displayIcon, iconBg, iconColor, buttonBg, buttonText } = getIconAndColor();

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-gray-900/20 backdrop-blur-md transition-all duration-200"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Modal Content */}
                <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-in fade-in zoom-in-95 duration-200">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Content */}
                    <div className="p-6">
                        {/* Icon */}
                        <div className={`mx-auto w-12 h-12 ${iconBg} rounded-full flex items-center justify-center mb-4`}>
                            <div className={iconColor}>
                                {displayIcon}
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                            {title}
                        </h3>

                        {/* Message */}
                        <p className="text-gray-600 text-center mb-6 whitespace-pre-line">
                            {message}
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            {showCancel && (
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                                >
                                    {cancelText}
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className={`${showCancel ? 'flex-1' : 'w-full'} px-4 py-2.5 text-sm font-medium ${buttonText} ${buttonBg} rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

