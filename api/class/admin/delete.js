const db = require("../../../db");

module.exports = async (req, res) => {
    if (req.headers.authorization !== process.env.ADMIN_KEY) return res.status(401).json({ err: "badAuthorization" });
    if (typeof req.params.username !== "string") return res.status(400).json({ err: "badRequest" });

    const user = await db.ClassAdmin.findOne({
        where: {
            username: req.params.username
        }
    });

    if (!user) return res.status(404).json({ err: "resourceNotFound" });

    await user.destroy();

    res.status(200).json({});
}