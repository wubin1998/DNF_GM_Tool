let db = require('../controller/DbController');

module.exports = {
  
  postEmail: (req, res, next) => {
    let mid = req.session.mid; // 角色id
    let item_id = req.body.item_id || 0; // 物品id
    let item_num = req.body.item_num || 1; // 数量
    let strong_num = req.body.strong_num || 0; // 强化值
    let coin = req.body.coin || 0; // 金币

    let d = new Date();
    let datetime = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`

    let sql = `insert into taiwan_cain_2nd.letter 
    (charac_no,send_charac_name,letter_text) 
    values 
    (${mid},'GM','')`;

    db(sql)
    .then( result => {
      let insertId = result.insertId
      let sql = `insert into taiwan_cain_2nd.postal 
      (occ_time,send_charac_name,receive_charac_no,item_id,add_info,upgrade,amplify_option,amplify_value,gold,seal_flag,letter_id,seperate_upgrade)
       values 
       ('${datetime}','GM',${mid},${item_id},${item_num},${strong_num},0,0,${coin},0,${insertId}, 0)`;

       return db(sql)
    })
    .then( result => {
      return res.json({
        code: 200,
        msg: "发送成功"
      })
    })
  }
}