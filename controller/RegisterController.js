let db = require('../controller/DbController');
let md5 = require('md5');


module.exports = {
  register: (req, res, next) => {
    let datas = req.body;
    let sql = `select accountname from d_taiwan.accounts where accountname='${datas.account}'`;

    db(sql)
      .then( result => {
        if (result.length >= 1) {
          return res.json({
            code: 400,
            msg: "账号已存在"
          })
        }

        let sql = `insert into d_taiwan.accounts (accountname,password,qq) values('${datas.account}','${md5(datas.password)}','')`;
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
}