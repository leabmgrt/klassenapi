const db = require("../db");
const argon2 = require('argon2');
const uuid = require("uuid").v4;
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (req, res) => {
    if (typeof req.body.class !== "string" || typeof req.body.password !== "string" || typeof req.body.ipaddress !== "string" || (req.body.environment !== "development" && req.body.environment !== "production")) return res.status(400).json({ err: "badRequest" });

    const fetchedClass = await db.Class.findOne({
        where: {
            id: req.body.class
        }
    });

    if (!fetchedClass) return res.status(404).json({ err: "classNotFound" });

    try {
        if (await argon2.verify(fetchedClass.password, req.body.password)) {
            const newSession = await db.Session.create({
                id: uuid(),
                ip: req.body.ipaddress,
                environment: req.body.environment
            });

            await newSession.addClass(fetchedClass);

            var token = jwt.sign({ session: newSession.id }, process.env.SESSION_JWT);

            res.status(200).json({ session: token });

        } else {
          res.status(401).json({ err: "wrongPassword" });
        }
      } catch (err) {
        res.status(500).json({ err: "internalError" });
      }

}