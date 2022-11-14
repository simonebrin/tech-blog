const router = require("express").Router();

const apiRoutes = require("./api/");
const homeRoutes = require("./home-routes.js");
const userRoutes = require("./api/user-routes.js");
const commentRoutes = require('./api/comment-routes');
const dashboardRoutes = require('./dashboard-routes');

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/user", userRoutes);
router.use('/dashboard', dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
