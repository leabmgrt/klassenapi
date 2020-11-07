const db = require("../../db");
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (req, res) => {
    if (typeof req.params.session !== "string") return res.status(400).json({ err: "badRequest" });

    try {
        const decodedToken = jwt.verify(req.params.session, process.env.SESSION_JWT);
        const fetchedSession = await db.Session.findOne({
            where: {
                id: decodedToken.session
            },
            include: [db.Class]
        })
        if (!fetchedSession) return res.status(404).json({ err: "sessionNotFound" });

        for (var i = 0; i < fetchedSession.classes.length; i++) {
            fetchedSession.classes[i].password = undefined;
        }
        res.status(200).json(fetchedSession);
      } catch(err) {
        res.status(401).json({ err: "invalidSession" });
      }

}