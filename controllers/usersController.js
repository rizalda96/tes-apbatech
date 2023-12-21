require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Klinik } = require('../models/BaseModel');

module.exports.auth = async (req, res, next) => {
	try {
    const token = jwt.sign({
      username: req.body.username,
      password: req.body.password,
    }, process.env.JWT_SECRET)

    let response = {
      "response": {
        "token": token
      },
      "metadata": {
        "message": "Ok",
        "code": 200
      }
    }

    return res.status(200).send(response)
	} catch (err) {
		return next(err);
	}
}

module.exports.statusAntrean = async (req, res, next) => {
	try {
    const data = await Klinik.findAll({
      where: {
        'kodepoli': req.params.kode_poli,
        'tglpriksa': req.params.tanggalperiksa
      }
    })

    const sisaAntrean = await Klinik.findAndCountAll({
      where: {
        'kodepoli': req.params.kode_poli,
        'tglpriksa': req.params.tanggalperiksa,
        'statusdipanggil': 0
      },
      order: [
        ['nomorantrean', 'DESC'],
      ],
    })

    let response = {
      "response": {
        "namapoli": data[0]?.namapoli ?? '-',
        "totalantrean": data.length,
        "sisaantrean": sisaAntrean.count,
        "antreanpanggil": sisaAntrean.rows[0].nomorantrean,
        "keterangan": ""
      },
      "metadata": {
        "message": "Ok",
        "code": 200
      }
    }
    return res.status(200).send(response)
	} catch (err) {
		return next(err);
	}
}

module.exports.antrean = async (req, res, next) => {
	try {
    const data = await Klinik.findOne({
      where: {
        'nomorkartu': req.body.nomorkartu,
        'nik': req.body.nik,
        'kodepoli': req.body.kodepoli,
        'tglpriksa': req.body.tanggalperiksa,
        'keluhan': req.body.keluhan,
      }
    })

    const sisaAntrean = await Klinik.findAndCountAll({
      where: {
        'nomorkartu': req.body.nomorkartu,
        'nik': req.body.nik,
        'kodepoli': req.body.kodepoli,
        'tglpriksa': req.body.tanggalperiksa,
        'keluhan': req.body.keluhan,
        'statusdipanggil': 0
      },
      order: [
        ['nomorantrean', 'DESC'],
      ],
    })

    let response = {
      "response": {
        "nomorantrean": data.nomorantrean,
        "angkaantrean": data.angkaantrean,
        "namapoli": data.namapoli,
        "sisaantrean": sisaAntrean.count,
        "antreanpanggil": sisaAntrean.rows[0].nomorantrean,
        "keterangan" : "Apabila antrean terlewat harap mengambil antrean kembali."
      },
      "metadata": {
        "message": "Ok",
        "code": 200
      }
    }
    return res.status(200).send(response)
	} catch (err) {
		return next(err);
	}
}

module.exports.sisaAntrean = async (req, res, next) => {
	try {
    const data = await Klinik.findOne({
      where: {
        'nomorkartu': req.params.nomorkartu_jkn,
        'kodepoli': req.params.kode_poli,
        'tglpriksa': req.params.tanggalperiksa,
      }
    })

    const sisaAntrean = await Klinik.findAndCountAll({
      where: {
        'nomorkartu': req.params.nomorkartu_jkn,
        'kodepoli': req.params.kode_poli,
        'tglpriksa': req.params.tanggalperiksa,
        'statusdipanggil': 0
      },
      order: [
        ['nomorantrean', 'DESC'],
      ],
    })

    let response = {
      "response": {
        "nomorantrean": data.nomorantrean,
        "namapoli": data.namapoli,
        "sisaantrean": sisaAntrean.count,
        "antreanpanggil": sisaAntrean.rows[0].nomorantrean,
        "keterangan" : ""
      },
      "metadata": {
        "message": "Ok",
        "code": 200
      }
    }
    return res.status(200).send(response)
	} catch (err) {
		return next(err);
	}
}

module.exports.batalAntrean = async (req, res, next) => {
	try {
    let payload = {
      angkaantrean: 0
    }

    await Klinik.update(payload, {
      where: { 
        nomorkartu: req.body.nomorkartu,
        kodepoli: req.body.kodepoli,
        tglpriksa: req.body.tanggalperiksa,
      }
    })

    let response = {
      "metadata": {
        "message": "Ok",
        "code": 200
      }
    }
    return res.status(200).send(response)
	} catch (err) {
		return next(err);
	}
}

