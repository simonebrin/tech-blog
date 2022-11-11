const router = require("express").Router();

const apiRoutes = require("./api/");
const homeRoutes = require("./home-routes.js");
const userRoutes = require("./api/user-route");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/user", userRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
