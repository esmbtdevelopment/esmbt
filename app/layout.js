import './globals.css';

export const metadata = {
    title: "ESM - Digital Transformation & Technology Solutions",
    description: "SAP solutions, digital transformation consultancy and enterprise software development services.",
    icons: {
        icon: [
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon/favicon.ico', sizes: 'any' }
        ],
        shortcut: '/favicon/favicon.ico',
        apple: '/favicon/apple-touch-icon.png',
        other: [
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '192x192',
                url: '/favicon/android-chrome-192x192.png',
            },
            {
                rel: 'icon',
                type: 'image/png',
                sizes: '512x512',
                url: '/favicon/android-chrome-512x512.png',
            },
        ],
    },
};

export default function RootLayout({ children }) {
    return (
        <html suppressHydrationWarning={true} data-theme="light-esm">
            <body suppressHydrationWarning={true}>
                {children}
            </body>
        </html>
    );
}
