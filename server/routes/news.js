const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/multer");
const {
  articleImageHandle,
  createArticle,
  getNewsItem,
  getArticleById,
  getRandomArticlesInOneWeek,
} = require("../controllers/news-controller");
const { authenticateToken } = require("../middleware/authenticateToken");
const { authorizeRoles } = require("../middleware/authorizeRoles");

router.post(
  "/articles/upload-image",
  upload.single("file"),
  articleImageHandle
);
router.post(
  "/articles",
  authenticateToken,
  authorizeRoles("mod"),
  createArticle
);
router.get("/articles/all-news", getNewsItem);
router.get("/articles/random-articles", getRandomArticlesInOneWeek);
router.get("/articles/:id", getArticleById);

module.exports = router;
