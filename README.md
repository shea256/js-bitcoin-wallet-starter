# JS Bitcoin Wallet Starter

## Overview

This is a starter app / demo web app for building Bitcoin wallet using JavaScript.

The wallet has a minimal feature set, with just the ability to send and receive transactions.

The app uses [@noble/secp256k1](https://github.com/paulmillr/noble-secp256k1) for elliptic curve cryptography, [@scure/btc-signer](https://github.com/paulmillr/scure-btc-signer) for Bitcoin transaction signing, Next.js as a JavaScript framework, and Bootstrap for standard UI elements.

On initial startup, the wallet generates a private key and stores it in local storage. On subsequence loads, the wallet checks for a private key in local storage and returns that if it's present.

When you send a transaction, you provide the Bitcoin address you'd like to send to and then enter the amount as the # of satoshis you'd like to send.

The transaction will be drafted, signed and then broadcasted to the network using [the mempool.space API](https://mempool.space/docs/api/rest).

## NextJS App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started with Next.js

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
