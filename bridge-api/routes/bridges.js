var express = require("express");
var router = express.Router();

const db = require("../db");

/* GET home page. */
router.get("/bridges/:id", function(req, res) {
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