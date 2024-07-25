const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
cloud_name: 'Untitled',
api_key: "415494336744882",
api_secret: "BZF81T69x74vwMTIYnd0335M80k",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uad_dpsi', 
    public_id: (req, file) => file.originalname.split('.')[0],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
