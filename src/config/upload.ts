import crypto from "crypto"
import multer from "multer";
import { resolve } from 'path'

const tmpFolder = resolve(__dirname, "..", "..", "tmp")

export const uploadConfig = {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (_req, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex")
      const filename = `${fileHash}-${file.originalname}`

      return callback(null, filename)
    }
  })
}