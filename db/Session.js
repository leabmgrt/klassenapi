const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.Session = db.define(
		"session",
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

	db.Session.belongsToMany(db.Class, { through: 'SessionClass'});
	db.Class.belongsToMany(db.Session, { through: 'SessionClass'});
};