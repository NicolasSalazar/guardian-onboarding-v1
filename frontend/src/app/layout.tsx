import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { styles } from './styles/layout.styles';

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
      <body style={styles.body}>
        <AuthProvider>
          <Navbar />
          <main style={styles.main}>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
