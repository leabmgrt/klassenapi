const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.Lesson = db.define(
		"lesson",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false
            },
            room: {
                type: DataTypes.STRING,
                allowNull: false
            }
		},
		{
			paranoid: false,
			updatedAt: false,
		}
	);
};
