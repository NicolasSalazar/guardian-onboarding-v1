import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Guardian Onboarding',
  description: 'Digital bank onboarding platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          background: '#0f3460',
          color: '#eee',
          minHeight: '100vh',
        }}
      >
        <AuthProvider>
          <Navbar />
          <main
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '2rem',
            }}
          >
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
