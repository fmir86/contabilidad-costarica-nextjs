import type { Metadata } from "next";
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import "./globals.css";


export const metadata: Metadata = {
  title: "Contabilidad Costa Rica | Servicios contables de calidad y asequibles.",
  description: "Servicios de gestión fiscal, pago de planillas, procesamiento de facturas, inscripción en régimen tributario, y mucho más",
};

 const RootLayout = ({children}: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, padding: '1rem' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;