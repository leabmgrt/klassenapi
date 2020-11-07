const db = require("../../../db");
const uuid = require("uuid").v4;
const argon2 = require("argon2");

module.exports = async (req, res) => {
    if (req.headers.authorization !== process.env.ADMIN_KEY) return res.status(401).json({ err: "badAuthorization" });
    if (typeof req.body.username !== "string" || typeof req.body.password !== "string" || typeof req.body.class !== "string") return res.status(400).json({ err: "badRequest" });

    const existingUser = await db.ClassAdmin.findOne({
        where: {
            username: req.body.username
        }
    });

    if (existingUser) return res.status(400).json({ err: "usernameAlreadyInUse" });

    const fetchedClass = await db.Class.findOne({
        where: {
            id: req.body.class
        }
    });

    if (!fetchedClass) return res.status(401).json({ err: "classNotFound" });

    const hash = await argon2.hash(req.body.password);

    const newUser = await db.ClassAdmin.create({
        id: uuid(),
        username: req.body.username,
        password: hash
    });

    await newUser.setClass(fetchedClass);

    const fetchedUser = await db.ClassAdmin.findOne({
        where: {
            id: newUser.id
        },
        include: [db.Class]
    });

    fetchedUser.password = undefined; 
    fetchedUser.class.password = undefined;

    res.status(200).json(fetchedUser);
}