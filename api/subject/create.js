const db = require("../../db");
const uuid = require("uuid").v4;

module.exports = async (req, res) => {
    if (req.headers.authorization !== process.env.ADMIN_KEY) return res.status(401).json({ err: "badAuthorization" });
    if (typeof req.body.name !== "string" || typeof req.body.short !== "string" || typeof req.body.class !== "string") return res.status(400).json({ err: "badRequest" });

    const fetchedClass = await db.Class.findOne({
        where: {
            id: req.body.class
        }
    });

    if (!fetchedClass) return res.status(404).json({ err: "classNotFound" });

    const subject = await db.Subject.create({
        id: uuid(),
        name: req.body.name,
        short: req.body.short
    });

    await fetchedClass.addSubject(subject);

    res.status(200).json(subject);
}