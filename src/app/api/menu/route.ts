// pages/api/menu/route.ts
import { NextApiRequest, NextApiResponse } from "next"
import Menu from "@/models/menu"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const menus = await Menu.findAll()
        res.status(200).json(menus)
      } catch (error) {
        res.status(500).json({ message: "Error fetching menus", error })
      }
      break

    case "POST":
      try {
        const { nama_menu, kategori_id, harga, stok, deskripsi, gambar_url } =
          req.body
        const menu = await Menu.create({
          nama_menu,
          kategori_id,
          harga,
          stok,
          deskripsi,
          gambar_url,
        })
        res.status(201).json(menu)
      } catch (error) {
        res.status(500).json({ message: "Error creating menu", error })
      }
      break

    case "PUT":
      try {
        const {
          id,
          nama_menu,
          kategori_id,
          harga,
          stok,
          deskripsi,
          gambar_url,
        } = req.body
        const menu = await Menu.findByPk(id)
        if (menu) {
          menu.nama_menu = nama_menu
          menu.kategori_id = kategori_id
          menu.harga = harga
          menu.stok = stok
          menu.deskripsi = deskripsi
          menu.gambar_url = gambar_url
          await menu.save()
          res.status(200).json(menu)
        } else {
          res.status(404).json({ message: "Menu not found" })
        }
      } catch (error) {
        res.status(500).json({ message: "Error updating menu", error })
      }
      break

    case "DELETE":
      try {
        const { id } = req.query
        const menu = await Menu.findByPk(id as string)
        if (menu) {
          await menu.destroy()
          res.status(204).end()
        } else {
          res.status(404).json({ message: "Menu not found" })
        }
      } catch (error) {
        res.status(500).json({ message: "Error deleting menu", error })
      }
      break

    default:
      res.status(405).json({ message: "Method Not Allowed" })
      break
  }
}
