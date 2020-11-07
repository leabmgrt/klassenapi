const db = require("../../db");
const uuid = require("uuid").v4;
const adminauth = require("../../utils/adminauth");

module.exports = async (req, res) => {
    const userAuthenticated = await adminauth(req.headers.authorization, null)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });
    if (typeof req.body.description !== "string" || typeof req.body.index !== "number") return res.status(400).json({ err: "badRequest" });

    const task = await db.HomeworkTask.create({
        id: uuid(),
        description: req.body.description,
        index: req.body.index
    });

    res.status(200).json(task);
}