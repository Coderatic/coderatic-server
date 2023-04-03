import User from "../models/user-model.js";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import { expressjwt as expressJwt } from "express-jwt";
import shortId from "shortid";
import dotenv from "dotenv";
dotenv.config();

// sendgrid
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const preSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    // If user is found, return error
    if (user) {
      return res.status(400).json({
        error: "Username or email is already taken",
      });
    }

    const token = jwt.sign(
      { username, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "24h",
      }
    );

    const emailData = {
      to: email,
      from: process.env.EMAIL_FROM,
      subject: "Welcome to Coderatic! - Account Activation Link",
      html: `
	  <h4>Please use the following link to activate your account:</h4>
	  <p>http://localhost:5173/#/auth/account/activate/${token}</p>

	  <hr/>
	  <p>This email may contain sensitive information</p>
	  <a href="${process.env.PRODUCTION_URL}">https://coderatic.com</a>`,
    };

    sgMail.send(emailData).then((sent) => {
      return res.json({
        message: `
      Email has been sent to ${email}. 
      Follow the instructions to activate your account.`,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const signup = (req, res) => {
  try {
    const token = req.body.token;
    console.log(req);
    if (token) {
      jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
        if (err) {
          return res.status(401).json({
            error: "Expired link. Signup again.",
          });
        }

        const { username, email, password } = decoded;
        const uid = shortId.generate();
        const profile = `${process.env.CLIENT_URL}/profile/${uid}`;

        const user = new User({
          username: username,
          email: email,
          password: password,
          profile: profile,
        });

        user
          .save()
          .then(() => {
            return res.json({
              message: "Signup sucessful! Please sign in.",
            });
          })
          .catch((err) => {
            return res.status(401).json({
              error: err,
            });
          });
      });
    } else {
      return res.status(401).json({
        message: "Something went wrong. Try again.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const signin = (req, res) => {
  try {
    const { username, password } = req.body;
    // check if user exist
    User.findOne({ username: username })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            error: "User with that email does not exist. Please signup.",
          });
        }

        // authenticate
        if (!user.authenticate(password)) {
          return res.status(400).json({
            error: "Email and password do not match.",
          });
        }

        // generate a token and send to client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.cookie("token", token, { expiresIn: "1d" });
        const { _id, username, first_name, last_name, email, role } = user;
        return res.json({
          token,
          user: { _id, username, first_name, last_name, email, role },
        });
      });
  } catch (err) {
    console.log(err);
  }
};

const signout = (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "Signout success",
    });
  } catch (err) {
    console.log(err);
  }
};

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const authMiddleWare = (req, res, next) => {
  try {
    const authUserId = req.user._id;
    // based on the user id, query the database and find user
    // then make it available in the request.profile object
    User.findById({ _id: authUserId })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            error: "User not found",
          });
        }
        req.profile = user;
        // execute callback function so it can be used as a middleware
        next();
      });
  } catch (err) {
    console.log(err);
  }
};

const adminMiddleWare = (req, res, next) => {
  try {
    const adminUserId = req.user._id;
    // based on the user id, query the database and find user
    // then make it available in the request.profile object
    User.findById({ _id: adminUserId })
      .exec()
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            error: "User not found",
          });
        }
        // check if admin
        if (user.role !== 1) {
          return res.status(400).json({
            error: "Admin resource. Access denied",
          });
        }

        req.profile = user;
        next();
      });
  } catch (err) {
    console.log(err);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          error: "User with that email does not exist",
        });
      }

      const token = jwt.sign(
        { _id: user._id },
        process.env.JWT_RESET_PASSWORD,
        {
          expiresIn: "10m",
        }
      );

      const emailData = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: "Password reset link",
        html: `
          <h4>Please use the following link to reset your password:</h4>
          <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
  
          <hr/>
          <p>This email may contain sensitive information</p>
          <a href="https://bloggingcoder.com">https://bloggingcoder.com</a>
      `,
      };

      return user.updateOne({ resetPasswordLink: token }, (err, success) => {
        if (err) {
          return res.status(400).json({
            error: err,
          });
        } else {
          sgMail.send(emailData).then((sent) =>
            res.json({
              message: `
                Email has been sent to ${email}. 
                Follow the instructions to reset your password. 
                Link expires in 10min
                `,
            })
          );
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { resetPasswordLink, newPassword } = req.body;

    // check if you have the reset password
    if (resetPasswordLink) {
      jwt.verify(
        // verify if the token has expired
        resetPasswordLink,
        process.env.JWT_RESET_PASSWORD,
        (err, decoded) => {
          if (err) {
            return res.status(401).json({
              error: "Expired link. Try again",
            });
          }

          // find the user based on reset password link
          User.findOne({ resetPasswordLink }, (err, user) => {
            if (err || !user) {
              return res.status(401).json({
                error: "Something went wrong. Try later",
              });
            }

            // update user fields
            const updatedFields = {
              password: newPassword,
              resetPasswordLink: "",
            };

            user = _.extend(user, updatedFields); // update fields that have changed

            // save user with updated information
            user.save((err, result) => {
              if (err) {
                return res.status(401).json({
                  error: err,
                });
              }

              res.json({
                message: `Great! Now you can login with your new password`,
              });
            });
          });
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export {
  preSignUp,
  signup,
  signin,
  signout,
  requireSignin,
  authMiddleWare,
  adminMiddleWare,
  forgotPassword,
  resetPassword,
};
