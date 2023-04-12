import * as btc from "@scure/btc-signer"
import * as secp from "@noble/secp256k1"

export const broadcastTx = async (txHex) => {
  try {
    const response = await fetch('/api/tx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ txHex })
    })
    if (response.ok) {
      const data = await response.json()
      const txid = data.txid
      return txid
    } else {
      const data = await response.json()
      throw new Error(data.error)
    }
  } catch(error) {
    console.error(error)
  }
}

export const estimateTxSize = (currentLength, numNewOutputs, numSignatures) => {
  const bytesPerOutput = 31
  const bytesPerSignature = 110
  const sigDiscount = 4
  const signatureVbytes = Math.ceil(bytesPerSignature/sigDiscount)*numSignatures 
  const vbytes = currentLength + bytesPerOutput*numNewOutputs + signatureVbytes
  return vbytes
}

export const getFees = async () => {
  const response = await fetch('https://mempool.space/api/v1/fees/recommended')
  const data = await response.json()
  return data
}

export const createTx = async (privateKey, recipientAddress, amount) => {
  // Derive the sender information
  const senderPublicKey = getPublicKeyFromPrivateKey(privateKey)
  const senderAddress = getAddressFromPublicKey(senderPublicKey)
  // Create the transaction
  const tx = new btc.Transaction()
  // Get the UTXOs from mempool.space
  const response = await fetch(`https://mempool.space/api/address/${senderAddress}/utxo`)
  const data = await response.json()
  // Add the UTXOs as inputs to the transaction
  for (const utxo of data) {
    const inputScript = btc.p2wpkh(secp.getPublicKey(privateKey, true)).script
    tx.addInput({
      txid: utxo.txid,
      index: utxo.vout,
      witnessUtxo: {
        amount: BigInt(utxo.value),
        script: inputScript
      }
    })
  }
  // Add an output to the recipient address
  tx.addOutputAddress(recipientAddress, BigInt(amount))
  // Add an output to the sender address
  const byteEstimate = estimateTxSize(tx.unsignedTx.length, 1, 1)
  const fees = await getFees()
  const feeRate = fees.fastestFee
  const currentBalance = BigInt(await getBalance(senderAddress))
  const changeAmount = currentBalance - BigInt(amount) - BigInt(feeRate * byteEstimate)
  tx.addOutputAddress(senderAddress, changeAmount)
  // Sign the inputs
  tx.sign(privateKey)
  // Finalize the transaction
  tx.finalize()
  // Return the transaction hex
  const txHex = tx.hex
  return txHex
}

export const getBalance = async (address) => {
  // Get API data from mempool.space
  const response = await fetch(`https://mempool.space/api/address/${address}`)
  const data = await response.json()
  // Get the Chain and Mempool stats
  const chainStats = data.chain_stats
  const mempoolStats = data.mempool_stats
  // Calculate the funded sums and spent sums
  const fundedSum = chainStats.funded_txo_sum + mempoolStats.funded_txo_sum
  const spentSum = chainStats.spent_txo_sum + mempoolStats.spent_txo_sum
  // Calculate and return the balance
  const balance = fundedSum - spentSum
  return balance
}

export const createPrivateKey = () => {
  const privateKey = secp.utils.randomPrivateKey()
  return privateKey
}

export const deriveWallet = (privateKey) => {
  const publicKey = secp.getPublicKey(privateKey, true)
  const scriptInfo = btc.p2wpkh(publicKey)
  const address = scriptInfo.address
  return { publicKey, address }
}

export const getPublicKeyFromPrivateKey = (privateKey) => {
  return secp.getPublicKey(privateKey, true)
}

export const getAddressFromPublicKey = (publicKey) => {
  const scriptInfo = btc.p2wpkh(publicKey)
  const address = scriptInfo.address
  return address
}