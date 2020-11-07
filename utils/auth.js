const db = require("../db");
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (token, userClass) => {
    if (typeof token !== "string") return;
    try {
        const decodedToken = jwt.verify(token, process.env.SESSION_JWT);
        const fetchedSession = await db.Session.findOne({
            where: {
                id: decodedToken.session
            },
            include: [db.Class]
        })
        if (!fetchedSession) return;

        for (var i = 0; i < fetchedSession.classes.length; i++) {
            fetchedSession.classes[i].password = undefined;
        }

        if (typeof userClass !== "string") {
            return fetchedSession;
        }
        
        if (fetchedSession.classes.some(sClass => sClass.id === userClass)) return fetchedSession;
        
        return;

      } catch(err) { return }
}