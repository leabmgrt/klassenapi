const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.ClassAdmin = db.define(
		"classadmin",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
		},
		{
			paranoid: false,
			updatedAt: false,
		}
    );
    
    db.ClassAdmin.hasMany(db.AdminSession);
    db.AdminSession.belongsTo(db.ClassAdmin);
};
