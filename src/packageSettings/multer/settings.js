const path = require('path')
const multer = require('multer')
const { upload_file_size, upload_folder_path } = require('../../../config/multerConfig')
const { UploadError } = require('../../errors/UploadError')
const { check } = require('express-validator')

const uploadsDir = `${upload_folder_path}`

// define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)
        const fileName =
            file.originalname
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") +
            "-" +
            Date.now();

        cb(null, fileName + fileExt)
    },
})

// preapre the final multer upload object
exports.upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

        const contentLength = req.headers['content-length']

        req.body.company_logo = {
            "name": file.originalname,
            "mimetype": file.mimetype,
            "encoding": file.encoding,
            "size": contentLength,
        }

        if (file.fieldname === "company_logo") {
            if (
                file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg"
            ) {
                cb(null, true)
            } else {
                cb(new UploadError('Only JPG / JPEG / PNG is allowed'), false)
            }
        } else {
            cb(new UploadError('Please check field name for file'), false)
        }
    }
})