const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.Subject = db.define(
		"subject",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
			},
			short: {
				type: DataTypes.STRING,
				allowNull: false,
			}
		},
		{
			paranoid: false,
			updatedAt: false,
		}
    );

    // Connection to Lesson (multiple)
    /*db.Subject.hasMany(db.Lesson);
	db.Lesson.belongsTo(db.Subject);*/

	// Check Homework.js for more information
};