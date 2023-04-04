import fetch from 'node-fetch'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const txHex = req.body.txHex
      const response = await fetch('https://mempool.space/api/tx', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: txHex
      })
      if (response.ok) {
        const txid = await response.text()
        res.status(200).json({ txid })
      } else {
        const errorText = await response.text()
        res.status(response.status).json({ error: errorText });
      }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred', error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
