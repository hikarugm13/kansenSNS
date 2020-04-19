const multer = require("multer");
const storage = multer.diskStorage({
  // ファイルの保存先を指定(今回はsrc/public/image以下に画像を保存)
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // ファイル名を指定(オリジナルのファイル名を指定)
  filename: function (req, file, cb) {
    //　Math.random().toString(36).slice(-9)で乱数を生成
    const imageName = `${Math.random()
      .toString(36)
      .slice(-9)}_${Date.now()}.png`;
    cb(null, imageName);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500000,
  },
}).single("file");

exports.postImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      //アップロード失敗した場合
      res.json({
        status: "error",
        error: "fail to uplord image",
      });
      console.log(err);
    } else {
      //アップロード成功した場合
      console.log(res.req.file);
      res.json({
        status: "sucess",
        // ファイル名を返す
        path: res.req.file.path
      });
    }
  });
};
