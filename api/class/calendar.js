const db = require("../../db");
const auth = require("../../utils/auth");

module.exports = async (req, res) => {
    const userAuthenticated = await auth(req.headers.authorization, null)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });
    //if (typeof req.params.id !== "string") return res.status(400).json({ err: "badRequest" });
    
    const fetchedCalendarEntries = await db.CalendarEntry.findAll({
        where: {
            '$class.id$': userAuthenticated.classes[0].id
        },
        include: [
            {model: db.Class}
        ]
    });

    if (!fetchedCalendarEntries) return res.status(404).json({ err: "resourceNotFound" });

    for (var i = 0; i < fetchedCalendarEntries.length; i++) {
        fetchedCalendarEntries[i].class.password = undefined;
    }
    res.status(200).json(fetchedCalendarEntries);
}