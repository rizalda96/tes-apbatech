const { DataTypes } = require('sequelize');

module.exports.KlinikModel = (sequelize) => {
	return sequelize.define(
		'antriansoal',
		{
			int: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
      nomorantrean: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
      angkaantrean: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
      norm: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
      namapoli: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
      kodepoli: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
      tglpriksa: {
				type: DataTypes.DATE,
				allowNull: false,
			},
      nomorkartu: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
      nik: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
      keluhan: {
				type: DataTypes.STRING(50),
				allowNull: true,
			},
      statusdipanggil: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			// Other model options go here
			freezeTableName: true,
			//tableName: 'tablename',
			timestamps: false,
		}
	);
};
