const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.Class = db.define(
		"class",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false,
            },
            class: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: DataTypes.STRING,
                allowNull: false,
            },
			teacher: {
				type: DataTypes.STRING,
				allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
		},
		{
			paranoid: false,
			updatedAt: false,
		}
    );

    // Connection to Lesson (multiple)
    db.Class.hasMany(db.Subject);
    db.Subject.belongsTo(db.Class);
    
    db.Class.hasMany(db.Homework);
    db.Homework.belongsTo(db.Class);

    db.Class.hasMany(db.CalendarEntry);
    db.CalendarEntry.belongsTo(db.Class);

    db.Class.hasMany(db.ClassAdmin);
    db.ClassAdmin.belongsTo(db.Class);

	// Check Homework.js for more information
};