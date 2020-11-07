const db = require("../db");
const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = async (token, userClass) => {
    if (typeof token !== "string") return;
    try {
        const decodedToken = jwt.verify(token, process.env.SESSION_JWT);
        const fetchedSession = await db.AdminSession.findOne({
            where: {
                id: decodedToken.session
            },
            include: [db.ClassAdmin]
        })
        if (!fetchedSession) return;

        const fetchedUser = await db.ClassAdmin.findOne({
            where: {
                id: fetchedSession.classadmin.id
            },
            include: [db.Class]
        });

        if (!fetchedUser) return;

        fetchedUser.class.password = undefined;

        if (userClass !== null) {
        if (fetchedUser.class.id === userClass) return {session: fetchedSession, user: fetchedUser}
        
        return;
        }
        else {
            return {session: fetchedSession, user: fetchedUser}
        }

      } catch(err) { return }
}