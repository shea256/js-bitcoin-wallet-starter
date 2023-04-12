import { hex } from "@scure/base"
import { createPrivateKey } from "../lib/wallet-core" 

export const setKeysToLocalStorage = (privateKey) => {
  localStorage.setItem(
    "keys",
    privateKey
  )
}

export const getKeysFromLocalStorage = () => {
  const keys = localStorage.getItem("keys")
  return keys
}

export const getOrMakeStoreAndGetPrivateKey = () => {
  const keys = getKeysFromLocalStorage()
  if (keys) {
    return hex.decode(keys)
  } else {
    const newPrivateKey = createPrivateKey()
    setKeysToLocalStorage(hex.encode(newPrivateKey))
    return newPrivateKey
  }
}