"use client";
import React, { useState } from 'react';

export default function RichTextEditor({ value, onChange, placeholder, maxLength, rows = 6 }) {
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);

    const handleFormat = (command) => {
        document.execCommand(command, false, null);

        // Update button states
        if (command === 'bold') setIsBold(!isBold);
        if (command === 'italic') setIsItalic(!isItalic);
    };

    const handleInput = (e) => {
        const content = e.target.innerHTML;
        onChange(content);
    };

    const handlePaste = (e) => {
        // Prevent formatted paste, only allow plain text
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const getCharCount = () => {
        const div = document.createElement('div');
        div.innerHTML = value || '';
        return div.textContent.length;
    };

    const charCount = getCharCount();

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-300 px-3 py-2 flex gap-2">
                <button
                    type="button"
                    onClick={() => handleFormat('bold')}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${isBold ? 'bg-gray-200' : ''
                        }`}
                    title="Bold"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={() => handleFormat('italic')}
                    className={`p-2 rounded hover:bg-gray-200 transition-colors ${isItalic ? 'bg-gray-200' : ''
                        }`}
                    title="Italic"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </button>

                <div className="w-px bg-gray-300 mx-1"></div>

                <button
                    type="button"
                    onClick={() => handleFormat('insertUnorderedList')}
                    className="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Bullet List"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={() => handleFormat('insertOrderedList')}
                    className="p-2 rounded hover:bg-gray-200 transition-colors"
                    title="Numbered List"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                </button>
            </div>

            {/* Editor */}
            <div
                contentEditable
                onInput={handleInput}
                onPaste={handlePaste}
                dangerouslySetInnerHTML={{ __html: value || '' }}
                className="p-4 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-indigo-500 prose prose-sm max-w-none"
                style={{ height: `${rows * 24}px` }}
                data-placeholder={placeholder}
            />

            {/* Character Count */}
            {maxLength && (
                <div className="bg-gray-50 border-t border-gray-300 px-3 py-2 text-right">
                    <span className={`text-sm ${charCount > maxLength ? 'text-red-600' : 'text-gray-500'}`}>
                        {charCount} / {maxLength}
                    </span>
                </div>
            )}

            <style jsx>{`
                [contentEditable][data-placeholder]:empty:before {
                    content: attr(data-placeholder);
                    color: #9CA3AF;
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
}

