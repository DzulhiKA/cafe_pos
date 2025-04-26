// pages/api/order/route.ts
import { NextApiRequest, NextApiResponse } from "next"
import Order from "@/models/order"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const orders = await Order.findAll()
        res.status(200).json(orders)
      } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error })
      }
      break

    case "POST":
      try {
        const {
          user_id,
          customer_id,
          total_harga,
          status,
          payment_method,
          midtrans_id,
        } = req.body
        const order = await Order.create({
          user_id,
          customer_id,
          total_harga,
          status,
          payment_method,
          midtrans_id,
        })
        res.status(201).json(order)
      } catch (error) {
        res.status(500).json({ message: "Error creating order", error })
      }
      break

    case "PUT":
      try {
        const {
          id,
          user_id,
          customer_id,
          total_harga,
          status,
          payment_method,
          midtrans_id,
        } = req.body
        const order = await Order.findByPk(id)
        if (order) {
          order.user_id = user_id
          order.customer_id = customer_id
          order.total_harga = total_harga
          order.status = status
          order.payment_method = payment_method
          order.midtrans_id = midtrans_id
          await order.save()
          res.status(200).json(order)
        } else {
          res.status(404).json({ message: "Order not found" })
        }
      } catch (error) {
        res.status(500).json({ message: "Error updating order", error })
      }
      break

    case "DELETE":
      try {
        const { id } = req.query
        const order = await Order.findByPk(id as string)
        if (order) {
          await order.destroy()
          res.status(204).end()
        } else {
          res.status(404).json({ message: "Order not found" })
        }
      } catch (error) {
        res.status(500).json({ message: "Error deleting order", error })
      }
      break

    default:
      res.status(405).json({ message: "Method Not Allowed" })
      break
  }
}
