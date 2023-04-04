// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch'

export default async function handler(req, res) {
  console.log('request coming in')
  if (req.method === 'POST') {
    console.log('post request received')
    try {
      const txHex = req.body.txHex
      console.log(`txHex: ${txHex}`)
      const response = await fetch('https://mempool.space/api/tx', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: txHex
      })
      //console.log(response)
      if (response.ok) {
        const txid = await response.text()
        res.status(200).json({ txid })
      } else {
        console.log('response not ok')
        console.log(response.status)
        const errorText = await response.text()
        console.log(errorText)
        res.status(response.status).json({ error: errorText });
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'An error occurred', error });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
