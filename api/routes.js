const express = require("express");
const router = express.Router();
const path = require("path");
const { registrarUsuarios } = require("./function");
router.use(
  "/bootstrap_css",
  express.static(
    path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "css")
  )
);

router.use(
  "/bootstrap_js",
  express.static(
    path.join(__dirname, "..", "node_modules", "bootstrap", "dist", "js")
  )
);

router.get("/", registrarUsuarios);

router.use((err, req, res, next) => {
  res.status(500).send("Mensaje de Error 500: " + err.message);
});

module.exports = router;
