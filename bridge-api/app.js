require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");

const bridgesRouter = require("./routes/bridges");
const authRouter = require("./routes/auth");
const users = require('./users');

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
passport.use(
    new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET,
        },
        function verify(payload, done) {
            if (!payload) {
                return done(null, false);
            }

            const user = users.byUsername(payload.sub);
            if (!user) {
                return done(null, false);
            }

            done(null, {
                username: user.username,
                fullname: user.fullname
            })
        }
    )
);

app.use("/api", bridgesRouter);
app.use("/auth", authRouter);

module.exports = app;