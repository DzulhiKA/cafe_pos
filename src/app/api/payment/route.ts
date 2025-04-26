// pages/api/payment/route.ts
import { NextApiRequest, NextApiResponse } from "next"
import Payment from "@/models/payment"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const payments = await Payment.findAll()
        res.status(200).json(payments)
      } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error })
      }
      break

    case "POST":
      try {
        const {
          order_id,
          payment_type,
          transaction_status,
          midtrans_response,
        } = req.body
        const payment = await Payment.create({
          order_id,
          payment_type,
          transaction_status,
          midtrans_response,
        })
        res.status(201).json(payment)
      } catch (error) {
        res.status(500).json({ message: "Error creating payment", error })
      }
      break

    case "PUT":
      try {
        const {
          id,
          order_id,
          payment_type,
          transaction_status,
          midtrans_response,
        } = req.body
        const payment = await Payment.findByPk(id)
        if (payment) {
          payment.order_id = order_id
          payment.payment_type = payment_type
          payment.transaction_status = transaction_status
          payment.midtrans_response = midtrans_response
          await payment.save()
          res.status(200).json(payment)
        } else {
          res.status(404).json({ message: "Payment not found" })
        }
      } catch (error) {
        res.status(500).json({ message: "Error updating payment", error })
      }
      break

    case "DELETE":
      try {
        const { id } = req.query
        const payment = await Payment.findByPk(id as string)
        if (payment) {
          await payment.destroy()
          res.status(204).end()
        } else {
          res.status(404).json({ message: "Payment not found" })
        }
      } catch (error) {
        res.status(500).json({ message: "Error deleting payment", error })
      }
      break

    default:
      res.status(405).json({ message: "Method Not Allowed" })
      break
  }
}
