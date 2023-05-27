const router = require("express").Router();
const { User, Note, CodeSnippet } = require("../models");
const withAuth = require("../utils/auth");

// Note
router.get("/", async (req, res) => {
  try {
    const noteData = await Note.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    const notes = noteData.map((note) => note.get({ plain: true }));

    res.render("homepage", {
      notes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/notes/:id", async (req, res) => {
  try {
    const noteData = await Note.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    const note = noteData.get({ plain: true });

    res.render("notes", {
      ...note,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// CodeSnippet
router.get("/", async (req, res) => {
  try {
    const codesnippetData = await CodeSnippet.findAll({
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    const codes = codesnippetData.map((codesnippet) =>
      codesnippet.get({ plain: true })
    );

    res.render("homepage", {
      codes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/codesnippet/:id", async (req, res) => {
  try {
    const codesnippetData = await CodeSnippet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    const codesnippet = codesnippetData.get({ plain: true });

    res.render("codesnippet", {
      ...codesnippet,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//user
router.get("/", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Note }, { model: CodeSnippet }],
    });

    const user = userData.get({ plain: true });

    res.render("homepage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signup", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

router.get("/", (req, res) => {
  res.render("homepage");
});

module.exports = router;
