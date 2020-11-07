const db = require("../../../db");
const argon2 = require('argon2');
const uuid = require("uuid").v4;
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    if (typeof req.body.username !== "string" || typeof req.body.password !== "string" || typeof req.body.ipaddress !== "string" || (req.body.environment !== "development" && req.body.environment !== "production")) return res.status(400).json({ err: "badRequest" });

    const user = await db.ClassAdmin.findOne({
        where: {
            username: req.body.username
        },
        include: [db.Class]
    });

    if (!user) return res.status(400).json({ err: "resourceNotFound" });

    try {
        if (await argon2.verify(user.password, req.body.password)) {

            const newAdminSession = await db.AdminSession.create({
                id: uuid(),
                ip: req.body.ipaddress,
                environment: req.body.environment
            });

            await user.addAdminsession(newAdminSession)

            var adminToken = jwt.sign({ session: newAdminSession.id }, process.env.SESSION_JWT);

            const newSession = await db.Session.create({
                id: uuid(),
                ip: req.body.ipaddress,
                environment: req.body.environment
            });

            await newSession.addClass(user.class);

            var token = jwt.sign({ session: newSession.id }, process.env.SESSION_JWT);

            res.status(200).json({ session: token, adminsession: adminToken });

        } else {
          res.status(401).json({ err: "wrongPassword" });
        }
      } catch (err) {
        res.status(500).json({ err: "internalError" });
      }
}