const { Router } = require('express');
const router = Router();

// Import Controllers
const usersController = require('../controllers/usersController');

router.post('/auth', usersController.auth);
router.get('/antrean/status/:kode_poli/:tanggalperiksa', usersController.statusAntrean);
router.post('/antrean', usersController.antrean);
router.get('/antrean/sisapeserta/:nomorkartu_jkn/:kode_poli/:tanggalperiksa', usersController.sisaAntrean);
router.put('/antrean/batal', usersController.batalAntrean);

module.exports = router;
