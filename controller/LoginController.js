let db = require('../controller/DbController');
let md5 = require('md5');

module.exports = {
  login: (req, res) => {
    let datas = req.body;

    let sql = `select UID,accountname,password,qq from d_taiwan.accounts where accountname='${datas.account}' and password='${md5(datas.password)}' and qq='GM_master' limit 1`;
    
    db(sql).then( result => {
      if (result.length <= 0) {
        return res.json({
          code: 400,
          msg: "账号不存在或密码错误"
        })
      }

      req.session.account = result[0].accountname;
      req.session.uid = result[0].UID;

      return res.json({
        code: 200,
        msg: "登录成功"
      })
    })
    .catch(console.log)
  },

  check_account: (req, res) => {
    let datas = req.query;

    let sql = `select UID,accountname,password,qq from d_taiwan.accounts where UID='${datas.uid}' limit 1`;
    
    
    db(sql).then( result => {
      if (result.length <= 0) {
        return res.json({
          code: 400,
          msg: "账号不存在或密码错误"
        })
      }

      req.session.account = result[0].accountname;
      req.session.uid = result[0].UID;
      req.session.mid = null;
      req.session.role_name = null;

      return res.json({
        code: 200,
        msg: "登录成功"
      })
    })
    .catch(console.log)
  }
}