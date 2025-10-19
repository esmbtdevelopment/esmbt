"use client";
import React, { useState, useMemo } from 'react';
import * as FaIcons from 'react-icons/fa';

// Curated list of commonly used icons for services/navigation
const ICON_CATEGORIES = {
    'Business': [
        'FaBuilding', 'FaBriefcase', 'FaChartLine', 'FaChartBar', 'FaChartPie',
        'FaChartArea', 'FaHandshake', 'FaUserTie', 'FaUsers', 'FaUsersCog'
    ],
    'Technology': [
        'FaCogs', 'FaServer', 'FaDatabase', 'FaCode', 'FaLaptopCode',
        'FaMicrochip', 'FaNetworkWired', 'FaDesktop', 'FaMobile', 'FaRobot'
    ],
    'Cloud & Storage': [
        'FaCloud', 'FaCloudUploadAlt', 'FaCloudDownloadAlt', 'FaHdd',
        'FaSave', 'FaFolder', 'FaFolderOpen', 'FaFileAlt', 'FaArchive'
    ],
    'Security': [
        'FaShieldAlt', 'FaLock', 'FaUnlock', 'FaKey', 'FaUserShield',
        'FaFingerprint', 'FaEye', 'FaEyeSlash', 'FaUserSecret'
    ],
    'Communication': [
        'FaEnvelope', 'FaPhone', 'FaComments', 'FaComment', 'FaBell',
        'FaRss', 'FaBullhorn', 'FaPaperPlane', 'FaInbox'
    ],
    'Support & Help': [
        'FaLifeRing', 'FaQuestionCircle', 'FaInfoCircle', 'FaExclamationCircle',
        'FaHeadset', 'FaTools', 'FaWrench', 'FaScrewdriver'
    ],
    'Analytics': [
        'FaChartLine', 'FaChartBar', 'FaChartPie', 'FaChartArea',
        'FaBalanceScale', 'FaCalculator', 'FaSearchPlus', 'FaFilter'
    ],
    'Navigation': [
        'FaHome', 'FaCompass', 'FaMapMarkedAlt', 'FaMapPin', 'FaRoute',
        'FaArrowRight', 'FaArrowLeft', 'FaChevronRight', 'FaChevronDown'
    ],
    'Commerce': [
        'FaShoppingCart', 'FaShoppingBag', 'FaCreditCard', 'FaMoneyBillWave',
        'FaReceipt', 'FaStore', 'FaCashRegister', 'FaTag'
    ],
    'Media': [
        'FaImage', 'FaImages', 'FaVideo', 'FaPhotoVideo', 'FaCamera',
        'FaFileImage', 'FaFileVideo', 'FaPlay'
    ]
};

export default function IconPicker({ selectedIcon, onSelect, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Business');

    // Get all available icons from the active category
    const availableIcons = useMemo(() => {
        let icons = ICON_CATEGORIES[activeCategory] || [];

        if (searchTerm) {
            // Search across all categories
            const allIcons = Object.values(ICON_CATEGORIES).flat();
            icons = allIcons.filter(iconName =>
                iconName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return icons;
    }, [activeCategory, searchTerm]);

    const handleSelect = (iconName) => {
        onSelect(iconName);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-gray-900">Select Icon</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search icons..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex">
                    {/* Categories Sidebar */}
                    {!searchTerm && (
                        <div className="w-48 border-r border-gray-200 overflow-y-auto">
                            <div className="p-4 space-y-1">
                                {Object.keys(ICON_CATEGORIES).map(category => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === category
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Icons Grid */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {availableIcons.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p>No icons found matching &quot;{searchTerm}&quot;</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-6 gap-4">
                                {availableIcons.map(iconName => {
                                    const IconComponent = FaIcons[iconName];
                                    if (!IconComponent) return null;

                                    return (
                                        <button
                                            key={iconName}
                                            onClick={() => handleSelect(iconName)}
                                            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all hover:shadow-md ${selectedIcon === iconName
                                                ? 'border-indigo-500 bg-indigo-50'
                                                : 'border-gray-200 hover:border-indigo-300'
                                                }`}
                                            title={iconName}
                                        >
                                            <IconComponent className="w-8 h-8 text-gray-700 mb-2" />
                                            <span className="text-xs text-gray-600 text-center truncate w-full">
                                                {iconName.replace('Fa', '')}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        {selectedIcon && (
                            <span>Selected: <span className="font-medium">{selectedIcon}</span></span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

