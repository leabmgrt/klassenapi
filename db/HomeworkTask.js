
const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.HomeworkTask = db.define(
		"homeworktask",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
			},
			index: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		},
		{
			paranoid: false,
			updatedAt: false,
		}
    );
};