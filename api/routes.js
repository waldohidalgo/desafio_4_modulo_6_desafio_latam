const express = require("express");
const router = express.Router();

const { registrarUsuarios } = require("./function");
router.use(
  "/bootstrap_css",
  express.static("./node_modules/bootstrap/dist/css"),
);
router.use("/bootstrap_js", express.static("./node_modules/bootstrap/dist/js"));
router.use("/jquery", express.static("./node_modules/jquery/dist"));
router.use("/public", express.static("./public"));

router.get("/", registrarUsuarios);

router.use((err, req, res, next) => {
  res.status(500).send("Mensaje de Error 500: " + err.message);
});

module.exports = router;
