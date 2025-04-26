// pages/api/customer/route.ts
import { NextApiRequest, NextApiResponse } from "next"
import Customer from "@/models/customer"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const customers = await Customer.findAll()
        res.status(200).json(customers)
      } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error })
      }
      break

    case "POST":
      try {
        const { nama, no_hp, email } = req.body
        const customer = await Customer.create({ nama, no_hp, email })
        res.status(201).json(customer)
      } catch (error) {
        res.status(500).json({ message: "Error creating customer", error })
      }
      break

    case "PUT":
      try {
        const { id, nama, no_hp, email } = req.body
        const customer = await Customer.findByPk(id)
        if (customer) {
          customer.nama = nama
          customer.no_hp = no_hp
          customer.email = email
          await customer.save()
          res.status(200).json(customer)
        } else {
          res.status(404).json({ message: "Customer not found" })
        }
      } catch (error) {
        res.status(500).json({ message: "Error updating customer", error })
      }
      break

    case "DELETE":
      try {
        const { id } = req.query
        const customer = await Customer.findByPk(id as string)
        if (customer) {
          await customer.destroy()
          res.status(204).end()
        } else {
          res.status(404).json({ message: "Customer not found" })
        }
      } catch (error) {
        res.status(500).json({ message: "Error deleting customer", error })
      }
      break

    default:
      res.status(405).json({ message: "Method Not Allowed" })
      break
  }
}
