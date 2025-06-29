import type { Metadata } from "next";
import { ReactNode } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import "../styles/globals.scss";
import { GoogleAnalytics } from '@next/third-parties/google'



export const metadata: Metadata = {
  title: "Contabilidad Costa Rica | Servicios contables de calidad y asequibles.",
  description: "Servicios de gestión fiscal, pago de planillas, procesamiento de facturas, inscripción en régimen tributario, y mucho más",
  metadataBase: new URL('https://contabilidadcostarica.net'),
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' }
    ]
  }
};

 const RootLayout = ({children}: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-G4FN6X5HJL" />
    </html>
  );
}

export default RootLayout;