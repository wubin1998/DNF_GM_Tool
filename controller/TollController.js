let db = require('../controller/DbController');

module.exports = {
  index: (req, res, next) => {
    let type = parseInt(req.body.type);
    let mid = req.session.mid;
    let uid = req.session.uid;

    let sql = [];
    switch (type) {
      // 清空邮件
      case 0:
        sql.push(db(`delete  from taiwan_cain_2nd.letter where charac_no=${mid} and send_charac_no=0 and send_charac_name like '%GM%'`))
        sql.push(db(`delete from taiwan_cain_2nd.postal where receive_charac_no=${mid} and send_charac_no=0 and delete_flag=0`))
        break;
      // 清空时装
      case 1:
        sql.push(db(`delete from taiwan_cain_2nd.user_items where slot>9 and charac_no=${mid}`))
        break;
      // 清空宠物
      case 2:
        sql.push(db(`delete from taiwan_cain_2nd.creature_items where slot<>238 and charac_no=${mid}`))
        break;
      // 解除创建角色限制
      case 3:
        sql.push(db(`update d_taiwan.limit_create_character set count=0 where m_id=${uid}`))
      break;
    }

    Promise.all(sql)
    .then( result => {
      return res.json({
        code: 200,
        msg: "操作成功"
      })
    })
    .catch( error => {
      console.log(error);
      return res.json({
        code: 400,
        msg: "操作失败"
      })
    })
  }
}