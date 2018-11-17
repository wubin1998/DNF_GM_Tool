let db = require('../controller/DbController');
let md5 = require('md5');


module.exports = {
  register: (req, res, next) => {
    if (!res.locals.isReg) return res.redirect('/login')
    
    let datas = req.body;
    let sql = `select accountname from d_taiwan.accounts where accountname='${datas.account}'`;

    db(sql)
      .then( result => {
        if (result.length >= 1) {
          res.json({
            code: 400,
            msg: "账号已存在"
          })
          return Promise.reject("账号已存在")
        }

        let sql = `insert into d_taiwan.accounts (accountname,password,qq) values('${datas.account}','${md5(datas.password)}','GM_master')`;
        return db(sql)
      })
      .catch(console.log)
      .then( result => {
        let sql = `insert into d_taiwan.member_white_account (m_id) values ('${result.insertId}')`;
        return db(sql)
      })
      .catch(console.log)
      .then( result => {
        return res.json({
          code: 200,
          msg: "账号注册成功"
        })
      })
      .catch(console.log)
  },

  addAccount: (req, res, next) => {
    let datas = req.body;

    if (datas.type == 0) {
      datas.type = '';
    }
    if (datas.type == 1) {
      datas.type = 'GM_vip';
    }
    if (datas.type == 2) {
      datas.type = 'GM_master';
    }

    let insertId = null;
    let sql = `select accountname from d_taiwan.accounts where accountname='${datas.account}'`;

    db(sql)
      .then( result => {
        if (result.length >= 1) {
          res.json({
            code: 400,
            msg: "账号已存在"
          })
          return Promise.reject("账号已存在")
        }

        
        let sql = `insert into d_taiwan.accounts (accountname,password,qq) values('${datas.account}','${md5(datas.password)}','${datas.type}')`;
        return db(sql)
      })
      .then( result => {
        insertId = result.insertId
        let sql = `insert into d_taiwan.member_white_account (m_id) values ('${insertId}')`;
        
        return db(sql)
      })
      .then( result => {
        let sql = `insert into d_taiwan.member_info (m_id,user_id) values('${insertId}','${insertId}')`
        return db(sql)
      })
      .then( result => {
        let sql = `insert into taiwan_login.member_login (m_id) values ('${insertId}')`
        return db(sql)
      })
      .then( result => {
        return res.json({
          code: 200,
          msg: "添加账号成功"
        })
      })
  }
}