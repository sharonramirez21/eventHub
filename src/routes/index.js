const router = require('express').Router();
const passport = require('passport');


router.use('/', require('./swagger'));

// event route --- CRUD COMPLETE
router.use('/events', require('./eventRoutes'));
// users route
router.use('/users', require('./userRoutes'));
// registration route
router.use('/registrations', require('./registrationRoutes'));
// reviews route -- CRUD COMPLETE
router.use('/reviews', require('./reviewRoutes'));

// API RUNNING
router.get('/', (req, res) => {
    //#swagger.tags=['API running']
    res.send('API RUNNING');
});



router.get("/login", (req, res) => {
  res.send(`
    <h2>Login Page</h2>
    <a href="/auth/github">Login with GitHub</a><br>
    <a href="/auth/google">Login with Google</a>
  `);
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});


router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);


// 🔹 Start Google login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);


module.exports = router;