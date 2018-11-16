let db = require('../db/index')

module.exports = (sql) => {
  return new Promise( (r, j) => {
    db.query(sql, (error, results) => {
      if (error) {
        return j(error)
      };
      r(results)
    })
  })
}