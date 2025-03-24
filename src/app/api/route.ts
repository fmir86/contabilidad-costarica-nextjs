import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// This file contains all email sending functionality in one place

interface ContactFormData {
  topic: string;
  username: string;
  email: string;
  phone: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as ContactFormData;
    const { topic, username, email, phone, message } = body;
    
    // Validation
    if (!topic || !username || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos requeridos deben ser completados' },
        { status: 400 }
      );
    }
    
    // Configure transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Build email
    const mailOptions = {
      from: `"Formulario Web" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: 'Nuevo mensaje desde contabilidadcostarica.net',
      text: `Interés: ${topic}\nNombre: ${username}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message || "Sin detalle"}`,
      html: `
        <p><strong>Interés:</strong> ${topic}</p>
        <p><strong>Nombre:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong> ${message || "Sin detalle"}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({
      success: true,
      message: 'Email enviado exitosamente'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error al enviar el email. Por favor intente nuevamente.'
      },
      { status: 500 }
    );
  }
}