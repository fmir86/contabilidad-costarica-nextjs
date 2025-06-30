// app/api/sendEmail/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Extract data from request body (supports both form structures)
    const { 
      name, 
      username, 
      email, 
      subject, 
      topic, 
      phone, 
      message 
    } = body;
    
    // Server-side validation
    if (!email) {
      return NextResponse.json(
        { message: 'Email es obligatorio' },
        { status: 400 }
      );
    }

    // Use name or username
    const senderName = name || username;
    if (!senderName) {
      return NextResponse.json(
        { message: 'Nombre es obligatorio' },
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

    // Build email content based on available fields
    const emailSubject = subject || topic || 'Nuevo mensaje desde contabilidadcostarica.net';
    
    let textContent = `Nombre: ${senderName}\nEmail: ${email}`;
    let htmlContent = `<p><strong>Nombre:</strong> ${senderName}</p><p><strong>Email:</strong> ${email}</p>`;
    
    if (phone) {
      textContent += `\nTeléfono: ${phone}`;
      htmlContent += `<p><strong>Teléfono:</strong> ${phone}</p>`;
    }
    
    if (topic) {
      textContent += `\nTema de interés: ${topic}`;
      htmlContent += `<p><strong>Tema de interés:</strong> ${topic}</p>`;
    }
    
    if (subject && subject !== topic) {
      textContent += `\nAsunto: ${subject}`;
      htmlContent += `<p><strong>Asunto:</strong> ${subject}</p>`;
    }
    
    if (message) {
      textContent += `\nMensaje: ${message}`;
      htmlContent += `<p><strong>Mensaje:</strong> ${message}</p>`;
    }

    // Build email options
    const mailOptions = {
      from: `"Formulario Web" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || process.env.SMTP_USER,
      subject: emailSubject,
      text: textContent,
      html: htmlContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    return NextResponse.json({
      message: 'Mensaje enviado correctamente'
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    
    return NextResponse.json(
      { 
        message: error instanceof Error ? error.message : 'Error al enviar el formulario' 
      },
      { status: 500 }
    );
  }
}