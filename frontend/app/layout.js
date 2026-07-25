import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "SalesCRM - Lead Management System",
  description: "A modern CRM for small sales teams to manage leads, track activities, and close deals.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
