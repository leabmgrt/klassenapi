const db = require("../../db");
const uuid = require("uuid").v4;
const adminauth = require("../../utils/adminauth");

module.exports = async (req, res) => {
    if (typeof req.body.subject !== "string" || typeof req.body.due !== "number" || typeof req.body.class !== "string" || !Array.isArray(req.body.tasks) || req.body.tasks.length === 0) return res.status(400).json({ err: "badRequest" });
    const userAuthenticated = await adminauth(req.headers.authorization, req.body.class)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });

    const subject = await db.Subject.findOne({
        where: {
            id: req.body.subject           
        },
        include: [db.Class]
    });

    if (!subject) return res.status(404).json({ err: "subjectNotFound" });

    const fetchedClass = await db.Class.findOne({
        where: {
            id: req.body.class
        }
    });

    if (!fetchedClass) return res.status(404).json({ err: "classNotFound" });

    if (fetchedClass.id !== subject.class.id) return res.status(400).json({ err: "subjectNotForClass" });

    const allTasks = []

    for (var i = 0; i < req.body.tasks.length; i++) {
        const task = await db.HomeworkTask.findOne({
            where: {
                id: req.body.tasks[i]
            }
        });
        if (!task) return res.status(404).json({ err: "taskNotFound", task: req.body.tasks[i] });
        allTasks.push(task);
    }

    const newHomework = await db.Homework.create({
        id: uuid(),
        due: new Date(req.body.due * 1000),
    });

    await newHomework.addHomeworktasks(allTasks);
    await newHomework.setSubjects(subject);
    await newHomework.setClass(fetchedClass);

    const fetchedHomework = await db.Homework.findOne({
        where: {
            id: newHomework.id
        },
        include: [db.Subject, db.HomeworkTask,]
    });

    if (!fetchedHomework) return res.status(500).json({ err: "createdResourceNotFound" });

    res.status(200).json(fetchedHomework);
}