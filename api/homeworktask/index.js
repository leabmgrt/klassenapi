const db = require("../../db");

module.exports = async (req, res) => {
    if (typeof req.params.id !== "string") return res.status(400).json({ err: "badRequest" });

    const fetchedTask = await db.HomeworkTask.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!fetchedTask) return res.status(404).json({ err: "resourceNotFound" });

    res.status(200).json(fetchedTask);
}