// src/app/api/subscribe/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Mailchimp settings
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const DATACENTER = API_KEY!.split('-')[1]; // e.g., us19
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const data = {
      email_address: email,
      status: 'subscribed',
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (response.status >= 400) {
      switch(responseData.title) {
        case 'Member Exists':
          return NextResponse.json({ message: '¡Ya estás suscrito!' }, { status: 200 });
        case 'Invalid Resource':
          return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
        default:
          return NextResponse.json(
            { error: responseData.detail || 'Hubo un error, vuelva a intentar' },
            { status: response.status }
          );
      }
    }

    return NextResponse.json({ message: 'Suscrito exitosamente' });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Error en el servidor' },
      { status: 500 }
    );
  }
}
