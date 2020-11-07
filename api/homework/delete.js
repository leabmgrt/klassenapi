const db = require("../../db");
const uuid = require("uuid").v4;
const adminauth = require("../../utils/adminauth");

module.exports = async (req, res) => {
    if (typeof req.params.id !== "string") return res.status(400).json({ err: "badRequest" });
    
    const homework = await db.Homework.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Class, db.HomeworkTask]
    });

    if (!homework) return res.status(404).json({ err: "resourceNotFound" });

    const userAuthenticated = await adminauth(req.headers.authorization, homework.class.id)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });

    for (var i = 0; i < homework.homeworktasks.length; i++) {
        console.log(homework.homeworktasks[i])
        await homework.homeworktasks[i].destroy();
    }

    await homework.destroy();

    res.status(200).json({});
}