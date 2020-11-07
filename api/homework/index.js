const db = require("../../db");
const auth = require("../../utils/auth");

module.exports = async (req, res) => {
    if (typeof req.params.id !== "string") return res.status(400).json({ err: "badRequest" });

    const homework = await db.Homework.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Subject, db.HomeworkTask, db.Class]
    })

    if (!homework) return res.status(404).json({ err: "resourceNotFound" });
    const userAuthenticated = await auth(req.headers.authorization, homework.class.id)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });

    homework.class.password = undefined;

    res.status(200).json(homework);
}