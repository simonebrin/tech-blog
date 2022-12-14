const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  // let dbPostData = await Post.findAll({
  Post.findAll({
    attributes: ['id', 'title', 'post_text'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'user_id'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render('homepage', {
        posts: dbPostData,
        loggedIn: req.session.loggedIn,
        currentUserId: req.session.user_id,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

  // if (dbPostData.length) {
  //   dbPostData = dbPostData.map((post) => post.get({ plain: true }));
  // }

  // res.render('homepage', {
  //   posts: dbPostData,
  //   loggedIn: req.session.loggedIn,
  //   currentUserId: req.session.user_id,
  // });



// router.get("/art/:id", async (req, res) => {
//   try {
//     // const artData = await Art.findAll({
//     //   include: [Comment, {
//     //     model: User
//     //   }], [Eval]
//     // });
//     const artData = await Art.findByPk(req.params.id, {
//       include: [
//         { model: Comment, include: User },
//         {
//           model: Eval,
//           include: User,
//         },
//       ],
//     });
//     //const art = artData.map((piece) => piece.get({ plain: true }));
//     const art = artData.get({ plain: true });
//     //console.log(art);
//     //console.log(art[0].evals);
//     res.render("art", { ...art });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });

// // get all posts for homepage
// /*router.get("/", (req, res) => {
//   console.log("======================");
//   Art.findAll({})
//     .then((dbPostData) => {
//       const posts = dbPostData.map((post) => post.get({ plain: true }));

//       res.render("homepage");
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });*/

// router.get("/", async (req, res) => {
//   try {
//     // const artData = await Art.findAll({
//     //   include: [Comment, {
//     //     model: User
//     //   }], [Eval]
//     // });
//     const artData = await Art.findAll({
//       include: [
//         { model: Comment, include: User },
//         {
//           model: Eval,
//           include: User,
//         },
//       ],
//     });
//     const art = artData.map((piece) => piece.get({ plain: true }));
//     // console.log(art);
//     // console.log(art[0].evals);
//     res.render("homepage", { art, loggedIn: req.session.loggedIn });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });

// router.get("/login", (req, res) => {
//   if (req.session.loggedIn) {
//     res.redirect("/");
//     return;
//   }

//   res.render("login");
// });


