// api/sendEmail.js
const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { topic, username, email, phone, message } = req.body;

  // Validar que los campos requeridos estén presentes
  if (!topic || !username || !email || !phone) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    // Configurar el transport (usando tus variables de entorno)
    // Ejemplo con Gmail y contraseñas de aplicación
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,        // smtp.gmail.com
      port: process.env.SMTP_PORT,        // 465
      secure: process.env.SMTP_SECURE === 'true', // true o false
      auth: {
        user: process.env.SMTP_USER,      // tuusuario@gmail.com
        pass: process.env.SMTP_PASS,      // contraseña de aplicación
      },
    });

    // Construir el correo
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

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email enviado exitosamente' });

  } catch (error) {
    console.error('Error al enviar email:', error);
    return res.status(500).json({ error: 'Error al enviar el email' });
  }
};
