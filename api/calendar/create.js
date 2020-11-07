const db = require("../../db")
const uuid = require("uuid").v4;
const adminauth = require("../../utils/adminauth");

module.exports = async (req, res) => {
    if (typeof req.body.name !== "string" || typeof req.body.description !== "string" || typeof req.body.startdate !== "number" || typeof req.body.class !== "string") return res.status(400).json({ err: "badRequest" });
    const userAuthenticated = await adminauth(req.headers.authorization, req.body.class)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });

    const fetchedClass = await db.Class.findOne({
        where: {
            id: req.body.class
        }
    })

    if (!fetchedClass) return res.status(404).json({ err: "classNotFound" });
    
    const calendarEntry = await db.CalendarEntry.create({
        id: uuid(),
        name: req.body.name,
        description: req.body.description,
        startdate: new Date(req.body.startdate * 1000),
        enddate: typeof req.body.enddate === "number" ? new Date(req.body.enddate * 1000) : undefined
    });

    await calendarEntry.setClass(fetchedClass);

    res.status(200).json(calendarEntry);
}