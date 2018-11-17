let db = require('../controller/DbController');

module.exports = {
  index: (req, res, next) => {
    let page = req.query.page;
    let limit = req.query.limit;
    let _uid = req.session.uid;
    let account = req.query.account || "";

    let params = {
      code: 0,
      data: [],
      count: 0
    }
    let sql = `select * from d_taiwan.accounts where UID<>${_uid} and accountname like '%${account}%' limit ${ (page - 1) * limit}, ${limit};`;
    db(sql)
    .then( data => {
      let sql = `SELECT COUNT(UID) from d_taiwan.accounts where UID<>${_uid} and accountname like '%${account}%'`;
      
      params.data = data;
      return db(sql)
    })
    .then( count => {
      params.count = count[0]["COUNT(UID)"];
      res.json(params)
    })
  },

  delete: (req, res, next) => {
    let uid = req.body.uid;

    let sql = `delete from d_taiwan.accounts where UID='${uid}'`;


    db(sql)
    .then( result => {
      return res.json({
        code: 200,
        msg: "删除成功"
      })
    })
  }
}