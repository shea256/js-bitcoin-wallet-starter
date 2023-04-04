import 'bootstrap/dist/css/bootstrap.css'
import '@/components/styles/globals.css'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

export function App({ Component, pageProps }) {
  useEffect(() => {
    require("node_modules/bootstrap/dist/js/bootstrap.bundle.min.js")
  }, [])

  return <Component {...pageProps} />
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
})