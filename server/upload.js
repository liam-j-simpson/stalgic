import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/images')
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase(),
    )
    const mimeType = fileTypes.test(file.mimetype)
    if (extname && mimeType) {
      return cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'))
    }
  },
})

export default upload
