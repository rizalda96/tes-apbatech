const sequelize = require('../db');


const { KlinikModel } = require('../models/Klinik');

const Klinik = KlinikModel(sequelize);


module.exports = {
  Klinik,
};