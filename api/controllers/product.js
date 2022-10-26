const path = require('path');
const fs = require('fs');

exports.updateLogo = (req, res, next) => {
  if (!req.file) {
    return res.status(200).json({ message: 'No file provided!' });
  }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res
    .status(201)
    .json({ message: 'File stored.', filePath: `http://localhost:3300/${req.file.path}` });
};

exports.updateAttachment = (req, res, next) => {
  if (!req.file) {
    return res.status(200).json({ message: 'No file provided!' });
  }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  const fileResponse = {
    uuid: Math.floor(Date.now() / 1000),
    name: req.file.fileName,
    status: 'done',
    url: `http://localhost:3300/${req.file.path}`,
    path: req.file.path,
    reqFile: req.file
  }
  return res
    .status(201)
    .json({ message: 'File stored.', fileResponse });
};

exports.removeAttachment = (req, res, next) => {
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res
    .status(201)
    .json({ message: 'File removed' });
}

const clearImage = filePath => {
  filePath = path.join(__dirname, '../..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
