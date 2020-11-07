const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: "mariadb",
		dialectOptions: {
			timezone: "Etc/GMT0",
		},
	}
);

module.exports = db;

require("./Subject")(db);
require("./HomeworkTask")(db);
require("./Homework")(db);
require("./Calendar")(db);
require("./AdminSession")(db);
require("./ClassAdmin")(db);
require("./Class")(db);
require("./Session")(db);

//require("./HomeworkSubject")(db);

db.sync();