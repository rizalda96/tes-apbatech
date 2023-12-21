/**
 * post /auth
 * @tags Auth
 * @security
 * @param {object} request.body.required - application/json
 * @example request - admin
 * {
 *    "email": "admin",
 *    "password": "admin"
 * }
 * @return {object} 200 - response
 */


/**
 * get /antrean/status/{kode_poli}/{tanggalperiksa}
 * @tags antrean
 * @security
 * @param {string} kode_poli.path.required - kode_poli
 * @param {string} tanggalperiksa.path.required - tanggalperiksa
 * @return {object} 200 - response
 */

/**
 * post /antrean
 * @tags antrean
 * @security
 * @param {object} request.body.required - application/json
 * @example request
  {
    "nomorkartu": "00012345678",
    "nik": "3212345678987654",
    "kodepoli": "001",
    "tanggalperiksa": "2020-01-28",
    "keluhan": "sakit kepala"
  }
 * @return {object} 200 - response
 */

  /**
 * get /antrean/sisapeserta/{nomorkartu_jkn}/{kode_poli}/{tanggalperiksa}
 * @tags antrean
 * @security
 * @param {string} nomorkartu_jkn.path.required - nomorkartu_jkn
 * @param {string} kode_poli.path.required - kode_poli
 * @param {string} tanggalperiksa.path.required - tanggalperiksa
 * @return {object} 200 - response
 */

  /**
 * put /antrean/batal
 * @tags antrean
 * @security
 * @param {object} request.body.required - application/json
 * @example request
{
    "nomorkartu": "00012345678",
    "kodepoli": "001",
    "tanggalperiksa": "2020-01-28"
}
 * @return {object} 200 - response
 */