import express from "express";
const router = express.Router();
import passport from "passport";
import jwt from "jsonwebtoken";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    const token = jwt.sign(
      {
        _id: req.user._id,
        user: {
          username: req.user.username,
          email: req.user.email,
          role: req.user.role,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.redirect(`${process.env.CLIENT_URL}/auth/account/OAuth/${token}`);
  }
);

export default router;
