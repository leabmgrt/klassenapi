const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.CalendarEntry = db.define(
		"calendarentry",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            startdate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            enddate: {
                type: DataTypes.DATE,
                allowNull: true
            }
		},
		{
			paranoid: false,
			updatedAt: false,
		}
    );
};