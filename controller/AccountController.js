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
  },

  role: (req, res, next) => {
    let uid = req.session.uid
    let sql = `select charac_no,charac_name,job,lev,grow_type from taiwan_cain.charac_info where m_id=${uid} and delete_flag<>1 order by charac_no asc`
    
    db(sql)
    .then( result => {
      res.json({
        code: 0,
        data: result
      })
    })
  },

  role_select: (req, res, next) => {
    let mid = req.query.mid;
    let role_name = req.query.role_name;
    req.session.mid = mid;
    req.session.role_name = role_name;

    res.json({
      code: 200,
      msg: "选择角色成功"
    })
  }
}