const db = require("../../db");

module.exports = async (req, res) => {
    const allClasses = await db.Class.findAll();

    if (!allClasses) return res.status(404).json({ err: "resourceNotFound" });

    for (var i = 0; i < allClasses.length; i++) {
        allClasses[i].password = undefined;
    }

    res.status(200).json(allClasses);
}