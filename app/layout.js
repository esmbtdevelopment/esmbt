import './globals.css';

export const metadata = {
    title: "ESM - Digital Transformation & Technology Solutions",
    description: "SAP solutions, digital transformation consultancy and enterprise software development services.",
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
