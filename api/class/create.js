const db = require("../../db");
const uuid = require("uuid").v4;
const argon2 = require("argon2");

module.exports = async (req, res) => {
    if (req.headers.authorization !== process.env.ADMIN_KEY) return res.status(401).json({ err: "badAuthorization" });
    if (typeof req.body.name !== "string" || typeof req.body.teacher !== "string" || typeof req.body.password !== "string" || typeof req.body.year !== "string" || req.body.year.length !== 9) return res.status(400).json({ err: "badRequest" });
    try {
        const hash = await argon2.hash(req.body.password);

        const newClass = await db.Class.create({
            id: uuid(),
            class: req.body.name,
            year: req.body.year,
            teacher: req.body.teacher,
            password: hash
        });

        res.status(200).json({
            id: newClass.id,
            class: newClass.class,
            year: newClass.year,
            teacher: newClass.teacher
        })

    }
    catch (err) {
        req.status(500).json({err: "interalError" });
    }
}