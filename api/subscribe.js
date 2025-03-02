const fetch = require('node-fetch');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  // Mailchimp settings (store API key, list ID, etc. as environment variables)
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const DATACENTER = API_KEY.split('-')[1]; // e.g., us19
  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  const data = {
    email_address: email,
    status: 'subscribed',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status >= 400) {
      const errorData = await response.json();

      console.log(errorData);

      switch(errorData.title){
        case 'Member Exists': return res.status(200).json({ message: '¡Ya estás suscrito!' });
            break;
        case 'Invalid Resource': return res.status(400).json({ error: 'Email inválido' });
            break;
      }

      return res.status(response.status).json({ error: errorData.detail || 'Hubo un error, vuelva a intentar' });
    }

    return res.status(200).json({ message: 'Suscrito exitosamente' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
