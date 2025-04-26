// lib/midtrans.ts
import midtransClient from "midtrans-client"

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY as string
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY as string
const MIDTRANS_IS_PRODUCTION = false // true kalau production

const snap = new midtransClient.Snap({
  isProduction: MIDTRANS_IS_PRODUCTION,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
})

export default snap
