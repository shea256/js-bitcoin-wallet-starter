# JS Bitcoin Wallet Starter

## Overview

This is a starter app / template for building a Bitcoin Wallet in JavaScript.

The wallet has a minimal feature set, with just the ability to send and receive transactions.

It uses [@noble/secp256k1](https://github.com/paulmillr/noble-secp256k1), [@scure/btc-signer](https://github.com/paulmillr/scure-btc-signer) for Bitcoin transaction signing, Next.js as a JS framework, and Bootstrap for standard UI elements. 

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

### Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
