const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.HomeworkSubject = db.define(
		"HomeworkSubject",
		{
            HomeworkId: {
                type: DataTypes.INTEGER,
                references: {
                  model: Homework,
                  key: 'id'
                }
              },
              SubjectId: {
                type: DataTypes.INTEGER,
                references: {
                  model: Subject,
                  key: 'id'
                }
              }
        }
    );
};