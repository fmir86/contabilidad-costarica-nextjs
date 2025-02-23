import type { Metadata } from "next";
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import "../styles/globals.scss";


export const metadata: Metadata = {
  title: "Contabilidad Costa Rica | Servicios contables de calidad y asequibles.",
  description: "Servicios de gestión fiscal, pago de planillas, procesamiento de facturas, inscripción en régimen tributario, y mucho más",
};

 const RootLayout = ({children}: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;