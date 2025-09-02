// api/generate-email.js - FIXED VERSION
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('API endpoint called');
    console.log('Environment variables check:', process.env.ANTHROPIC_API_KEY ? 'API key exists' : 'API key missing');
    
    const { prompt } = req.body;
    
    if (!prompt) {
      console.error('No prompt provided');
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY environment variable is not set');
      return res.status(500).json({ error: 'API key not configured' });
    }

    console.log('Making request to Anthropic API...');
    console.log('Using model: claude-3-5-sonnet-20241022');
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',  // Fixed: Updated model name
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    console.log('Anthropic API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('Anthropic API error:', response.status, response.statusText, errorData);
      return res.status(response.status).json({ 
        error: `Anthropic API error: ${response.status} ${response.statusText}`,
        details: errorData
      });
    }

    const data = await response.json();
    console.log('Anthropic API success');
    console.log('Response content type:', data.content?.[0]?.type);
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error('Unexpected API response structure:', data);
      return res.status(500).json({ 
        error: 'Unexpected API response structure',
        details: data
      });
    }
    
    res.status(200).json({ 
      response: data.content[0].text 
    });

  } catch (error) {
    console.error('Server error:', error.name, error.message, error.stack);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}
