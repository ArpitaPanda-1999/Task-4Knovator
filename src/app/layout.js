import './globals.css';

export const metadata = {
    title: 'FleetLink',
    description: 'Logistics Vehicle Booking System',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-gray-100 text-gray-800 font-sans p-6">
                <main className="max-w-4xl mx-auto">{children}</main>
            </body>
        </html>
    );
}