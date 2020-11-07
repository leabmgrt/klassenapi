const db = require("../../db");
const auth = require("../../utils/auth");

module.exports = async (req, res) => {
    const userAuthenticated = await auth(req.headers.authorization, null)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });
    
    const fetchedHomework = await db.Homework.findAll({
        where: {
            '$class.id$': userAuthenticated.classes[0].id
        },
        include: [
            {model: db.Class},
            db.HomeworkTask, db.Subject
        ]
    });

    if (!fetchedHomework) return res.status(404).json({ err: "resourceNotFound" });

    for (var i = 0; i < fetchedHomework.length; i++) {
        fetchedHomework[i].class.password = undefined;
    }
    res.status(200).json(fetchedHomework);
}