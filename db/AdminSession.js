const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.AdminSession = db.define(
		"adminsession",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false,
            },
            ip: {
                type: DataTypes.STRING,
                allowNull: false
            },
            environment: {
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