const { DataTypes } = require("sequelize");

module.exports = (db) => {
	db.SessionClass = db.define(
		"SessionClass",
		{
            SessionId: {
                type: DataTypes.INTEGER,
                references: {
                  model: Session,
                  key: 'id'
                }
              },
              ClassId: {
                type: DataTypes.INTEGER,
                references: {
                  model: Class,
                  key: 'id'
                }
              }
        }
    );
};