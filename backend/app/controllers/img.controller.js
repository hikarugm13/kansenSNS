const AWS = require("aws-sdk");
const multer = require("multer");
var multerS3 = require("multer-s3");
var path = require("path");
// AWS.config.loadFromPath("../config/key.json");

// The name of the bucket that you have created
const BUCKET_NAME = "kansenpics";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,

  Bucket: BUCKET_NAME,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
  limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// ローカルに保存
// const storage = multer.diskStorage({
//   // ファイルの保存先を指定(今回はsrc/public/image以下に画像を保存)
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   // ファイル名を指定(オリジナルのファイル名を指定)
//   filename: function (req, file, cb) {
//     //　Math.random().toString(36).slice(-9)で乱数を生成
//     const imageName = `${Math.random()
//       .toString(36)
//       .slice(-9)}_${Date.now()}.png`;
//     cb(null, imageName);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 500000,
//   },
// }).single("file");

exports.postImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      //アップロード失敗した場合
      res.json({
        status: "error",
        error: "fail to upload image",
      });
      console.log(err);
    } else {
      //アップロード成功した場合
      console.log(res.req.file);
      res.json({
        status: "sucess",
        // ファイル名を返す
        path: res.req.file.location,
      });
    }
  });
};
