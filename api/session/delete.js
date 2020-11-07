const db = require("../../db");
const jwt = require('jsonwebtoken');
const auth = require("../../utils/auth");

module.exports = async (req, res) => {
    const userAuthenticated = await auth(req.headers.authorization, null)
    if (!userAuthenticated) return res.status(401).json({ err: "badAuthorization" });

    try {
        const decodedToken = jwt.verify(req.headers.authorization, process.env.SESSION_JWT);
        const fetchedSession = await db.Session.findOne({
            where: {
                id: decodedToken.session
            }
        });
        await fetchedSession.destroy();
        return res.status(200).json({});
    }
    catch (err) {
        return res.status(500).json({ err: "interalError" });
    }
}