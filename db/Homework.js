const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.Homework = db.define(
		"homework",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false,
            },
            due: {
                type: DataTypes.DATE,
                allowNull: false
            }
		},
		{
			paranoid: false,
			updatedAt: false,
		}
    );
    // Connection to subject
	db.Homework.hasMany(db.HomeworkTask);
	db.HomeworkTask.belongsTo(db.Homework);

	/* Ok so basically this is gonna create a key in HomeworkTask (probably homeworkId),
	and it's gonna be the ID of homework. You can fetch all tasks with homework.getHomeworkTasks.

	MANUAL: https://sequelize.org/master/manual/assocs.html#fetching-associations---eager-loading-vs-lazy-loading
	*/

	db.Homework.belongsToMany(db.Subject, { through: 'HomeworkSubject'});
	db.Subject.belongsToMany(db.Homework, { through: 'HomeworkSubject'});
	
};