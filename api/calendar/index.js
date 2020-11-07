const db = require("../../db");
const auth = require("../../utils/auth");

module.exports = async (req, res) => {
    if (typeof req.params.id !== "string") return res.status(400).json({ err: "badRequest" });

    const calendarEntry = await db.CalendarEntry.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Class]
    });

    if (!calendarEntry) return res.status(404).json({ err: "resourceNotFound" });

    const userAuthenticated = await auth(req.headers.authorization, calendarEntry.class.id)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });

    calendarEntry.class.password = undefined;

    res.status(200).json(calendarEntry);
}