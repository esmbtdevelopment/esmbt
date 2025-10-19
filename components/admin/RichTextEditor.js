"use client";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useCallback } from 'react';

export default function RichTextEditor({ value, onChange, placeholder }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-sky-600 underline cursor-pointer',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full h-auto',
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: value || '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[300px] max-w-none p-4',
                dir: 'ltr',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('Enter URL:', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('Enter image URL:');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r border-gray-300 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        disabled={!editor.can().chain().focus().toggleBold().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('bold') ? 'bg-gray-300' : ''
                            }`}
                        title="Bold (Ctrl+B)"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 4v12h4.5c2.5 0 4.5-1.5 4.5-4 0-1.5-.5-2.5-1.5-3 .5-.5 1-1.5 1-2.5 0-2-1.5-3.5-4-3.5H6zm3 2h1.5c1 0 1.5.5 1.5 1.5S11.5 9 10.5 9H9V6zm0 5h2c1 0 1.5.5 1.5 1.5S12 14 11 14H9v-3z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        disabled={!editor.can().chain().focus().toggleItalic().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('italic') ? 'bg-gray-300' : ''
                            }`}
                        title="Italic (Ctrl+I)"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 4v2h1.5l-2 8H8v2h6v-2h-1.5l2-8H16V4h-6z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('underline') ? 'bg-gray-300' : ''
                            }`}
                        title="Underline (Ctrl+U)"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 3v7c0 2.21 1.79 4 4 4s4-1.79 4-4V3h-2v7c0 1.1-.9 2-2 2s-2-.9-2-2V3H6zm-2 14h12v2H4v-2z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('strike') ? 'bg-gray-300' : ''
                            }`}
                        title="Strikethrough"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 4c-1.7 0-3 .5-3.9 1.3l1.4 1.4C8.2 6.3 9 6 10 6c1.9 0 2.5.9 2.5 1.5 0 .4-.2.8-.5 1h2.2c.5-.7.8-1.5.8-2.5C15 4.3 13.1 4 10 4zM3 9.5v1h14v-1H3zm7 6.5c1.9 0 3-.5 3.9-1.3l-1.4-1.4c-.7.4-1.5.7-2.5.7-1.9 0-2.5-.9-2.5-1.5 0-.2.1-.4.2-.6H5.5c-.3.5-.5 1.1-.5 1.6C5 15.7 6.9 16 10 16z" />
                        </svg>
                    </button>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r border-gray-300 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors cursor-pointer font-semibold ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-300' : ''
                            }`}
                        title="Heading 1"
                    >
                        H1
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors cursor-pointer font-semibold ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-300' : ''
                            }`}
                        title="Heading 2"
                    >
                        H2
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`px-3 py-2 rounded hover:bg-gray-200 transition-colors cursor-pointer font-semibold ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-300' : ''
                            }`}
                        title="Heading 3"
                    >
                        H3
                    </button>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r border-gray-300 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('bulletList') ? 'bg-gray-300' : ''
                            }`}
                        title="Bullet List"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('orderedList') ? 'bg-gray-300' : ''
                            }`}
                        title="Numbered List"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('blockquote') ? 'bg-gray-300' : ''
                            }`}
                        title="Quote"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6 10c0-2 1.5-3.5 3.5-3.5.5 0 1 .1 1.5.3V5c-.5-.1-1-.2-1.5-.2C6.5 4.8 4 7.3 4 10.5c0 2.1 1.1 3.9 2.8 4.9L8 13.5c-.8-.5-2-1.5-2-3.5zm7 0c0-2 1.5-3.5 3.5-3.5.5 0 1 .1 1.5.3V5c-.5-.1-1-.2-1.5-.2-3 0-5.5 2.5-5.5 5.7 0 2.1 1.1 3.9 2.8 4.9l1.2-1.9c-.8-.5-2-1.5-2-3.5z" />
                        </svg>
                    </button>
                </div>

                {/* Alignment */}
                <div className="flex gap-1 border-r border-gray-300 pr-2">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-300' : ''
                            }`}
                        title="Align Left"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4h14v2H3V4zm0 4h10v2H3V8zm0 4h14v2H3v-2zm0 4h10v2H3v-2z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-300' : ''
                            }`}
                        title="Align Center"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4h14v2H3V4zm3 4h8v2H6V8zm-3 4h14v2H3v-2zm3 4h8v2H6v-2z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-300' : ''
                            }`}
                        title="Align Right"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4h14v2H3V4zm4 4h10v2H7V8zm-4 4h14v2H3v-2zm4 4h10v2H7v-2z" />
                        </svg>
                    </button>
                </div>

                {/* Link & Image */}
                <div className="flex gap-1 border-r border-gray-300 pr-2">
                    <button
                        type="button"
                        onClick={setLink}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('link') ? 'bg-gray-300' : ''
                            }`}
                        title="Insert Link"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={addImage}
                        className="p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                        title="Insert Image"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>

                {/* Code & Clear */}
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('code') ? 'bg-gray-300' : ''
                            }`}
                        title="Inline Code"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${editor.isActive('codeBlock') ? 'bg-gray-300' : ''
                            }`}
                        title="Code Block"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                        className="p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                        title="Clear Formatting"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="min-h-[300px] max-h-[600px] overflow-y-auto"
            />

            {/* Character Count */}
            <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-right text-sm text-gray-600">
                {editor.storage.characterCount?.characters() || 0} characters
            </div>

            <style jsx global>{`
                .ProseMirror {
                    outline: none;
                }
                .ProseMirror p.is-editor-empty:first-child::before {
                    content: '${placeholder || 'Start writing your content...'}';
                    color: #9CA3AF;
                    pointer-events: none;
                    height: 0;
                    float: left;
                }
                .ProseMirror h1 {
                    font-size: 2em;
                    font-weight: bold;
                    margin-top: 0.67em;
                    margin-bottom: 0.67em;
                }
                .ProseMirror h2 {
                    font-size: 1.5em;
                    font-weight: bold;
                    margin-top: 0.83em;
                    margin-bottom: 0.83em;
                }
                .ProseMirror h3 {
                    font-size: 1.17em;
                    font-weight: bold;
                    margin-top: 1em;
                    margin-bottom: 1em;
                }
                .ProseMirror ul,
                .ProseMirror ol {
                    padding-left: 2rem;
                    margin: 1rem 0;
                }
                .ProseMirror ul {
                    list-style: disc;
                }
                .ProseMirror ol {
                    list-style: decimal;
                }
                .ProseMirror blockquote {
                    border-left: 4px solid #e5e7eb;
                    padding-left: 1rem;
                    margin: 1rem 0;
                    font-style: italic;
                    color: #6b7280;
                }
                .ProseMirror code {
                    background-color: #f3f4f6;
                    padding: 0.2em 0.4em;
                    border-radius: 0.25rem;
                    font-family: monospace;
                    font-size: 0.875em;
                    color: #0ea5e9;
                }
                .ProseMirror pre {
                    background: #1e293b;
                    color: #e2e8f0;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                    margin: 1rem 0;
                }
                .ProseMirror pre code {
                    background: none;
                    color: inherit;
                    font-size: 0.875rem;
                    padding: 0;
                }
                .ProseMirror img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }
                .ProseMirror a {
                    color: #0ea5e9;
                    text-decoration: underline;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
}
