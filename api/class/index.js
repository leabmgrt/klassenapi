const db = require("../../db");
const auth = require("../../utils/auth");

module.exports = async (req, res) => {
    const userAuthenticated = await auth(req.headers.authorization, req.params.id);
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });
    if (typeof req.params.id !== "string") return res.status(400).json({ err: "badRequest" });

    const fetchedClass = await db.Class.findOne({
        where: {
            id: req.params.id
        },
        include: db.Subject
    });

    if (!fetchedClass) return res.status(404).json({ err: "resourceNotFound" });
    fetchedClass.password = undefined;

    res.status(200).json(fetchedClass);
}