const express = require("express");
const router = express.Router();
const passport = require("passport");

const db = require("../db");

router.get("/bridges/:id", passport.authenticate('jwt', { session: false }), function(req, res) {
    const id = req.params.id;
    const bridge = db.byId(id);

    if (!bridge) {
        return res.sendStatus(404);
    }

    res.json(bridge);
});

router.get("/bridges", (req, res) => {
    res.json(db.all());
});

module.exports = router;