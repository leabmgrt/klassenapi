require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();
const db = require("./db");
require("dotenv").config();

app.use(cors());
app.use(require("body-parser").json());
app.use((err, req, res, next) =>
	res.status(500).json({ err: "internalError" })
);

db.sync().then(() => {
	app.listen(process.env.PORT || 8080, () =>
		console.log("KlassenAPI ready")
	);
});

app.get("/", (req, res) => {
	res.status(200).json({
		"name": "lol"
	})
})

app.post("/homework/create", require("./api/homework/create"));
app.get("/homework/:id", require("./api/homework"));
app.delete("/homework/:id/delete", require("./api/homework/delete"));
app.post("/class/create", require("./api/class/create"));
app.get("/class/homework", require("./api/class/homework"));
app.get("/class/calendar", require("./api/class/calendar"));
app.get("/classes", require("./api/class/all"));
app.get("/class/:id", require("./api/class/index"));
app.post("/subject/create", require("./api/subject/create"));
app.get("/subject/:id", require("./api/subject/index"));
app.post("/task/create", require("./api/homeworktask/create"));
app.get("/task/:id", require("./api/homeworktask/index"));
app.post("/login", require("./api/login"));
app.post("/session/delete", require("./api/session/delete"));
app.get("/session/:session", require("./api/session"));
app.post("/calendar/create", require("./api/calendar/create"));
app.get("/calendar/:id", require("./api/calendar"));
app.post("/class/admin/create", require("./api/class/admin/create"));
app.post("/class/admin/login", require("./api/class/admin/login"));
app.delete("/class/admin/:username/delete", require("./api/class/admin/delete"));

// 404
app.use((req, res) => {
	res.status(404).json({ err: "notFound" });
});