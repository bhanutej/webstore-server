const express = require('express');

const productController = require('../controllers/product');

const router = express.Router();
const multer = require('multer');

const productLogsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/productLogos');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const productAttachmentsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/attachments');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const attachemntFileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'video/mp4' ||
    file.mimetype === 'application/pdf' 
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadProductLogMulter = multer({ storage: productLogsStorage, fileFilter: fileFilter });
const uploadProductAttachementMulter = multer({ storage: productAttachmentsStorage, fileFilter: attachemntFileFilter });

// PUT /product/logo
router.put('/logo', uploadProductLogMulter.single('image'), productController.updateLogo);
// PUT /product/attachment
router.put('/attachment', uploadProductAttachementMulter.single('attachment'), productController.updateAttachment);
// PUT /product/remove_attachment
router.put('/remove_attachment', uploadProductAttachementMulter.single('attachment'), productController.removeAttachment);

module.exports = router;
