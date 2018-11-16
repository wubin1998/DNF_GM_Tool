let db = require('../controller/DbController');
let md5 = require('md5');

module.exports = {
  login: (req, res) => {
    let datas = req.body;

    let sql = `select accountname,password from d_taiwan.accounts where accountname='${datas.account}' and password='${md5(datas.password)}'`;

    db(sql).then( result => {
      if (result.length <= 0) {
        return res.json({
          code: 400,
          msg: "账号不存在或密码错误"
        })
      }

      req.session.account = datas.account

      return res.json({
        code: 200,
        msg: "登录成功"
      })
    })
    .catch(console.log)
  }
}