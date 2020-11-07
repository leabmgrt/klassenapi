const db = require("../../db");
const auth = require("../../utils/auth");

module.exports = async (req, res) => {
    if (typeof req.params.id !== "string") return res.status(400).json({ err: "badRequest" });

    const fetchedSubject = await db.Subject.findOne({
        where: {
            id: req.params.id,
        },
        include: db.Class
    });

    if (!fetchedSubject) return res.status(404).json({ err: "resourceNotFound" });

    const userAuthenticated = await auth(req.headers.authorization, fetchedSubject.class.id)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });
    fetchedSubject.class.password = undefined;

    res.status(200).json(fetchedSubject);
}