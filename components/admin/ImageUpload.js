"use client";
import React, { useState, useRef } from 'react';
import { uploadImage, validateImage, generateUniqueFilename } from '@/lib/firebase-storage';
import Image from 'next/image';

export default function ImageUpload({ currentImage, onImageUploaded, folder = 'uploads' }) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [preview, setPreview] = useState(currentImage);
    const fileInputRef = useRef(null);

    const handleFile = async (file) => {
        setError(null);

        // Validate the file
        const validation = validateImage(file, 5); // 5MB max
        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        try {
            setUploading(true);

            // Generate unique filename
            const filename = generateUniqueFilename(file.name, folder);

            // Upload to Firebase Storage
            const downloadURL = await uploadImage(file, filename);

            // Set preview
            setPreview(downloadURL);

            // Notify parent
            onImageUploaded(downloadURL, filename);
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        setPreview(null);
        onImageUploaded(null, null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleChange}
                className="hidden"
            />

            {preview ? (
                <div className="relative">
                    {/* Preview */}
                    <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={handleButtonClick}
                            disabled={uploading}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                            Change Image
                        </button>
                        <button
                            onClick={handleRemove}
                            disabled={uploading}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600">Uploading...</p>
                        </div>
                    ) : (
                        <>
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="mt-4">
                                <button
                                    onClick={handleButtonClick}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Choose File
                                </button>
                                <p className="mt-2 text-sm text-gray-600">
                                    or drag and drop
                                </p>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">
                                PNG, JPG, WebP up to 5MB
                            </p>
                        </>
                    )}
                </div>
            )}

            {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}
        </div>
    );
}

