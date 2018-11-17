let db = require('../controller/DbController');

// 待:查询uid是否存在，存在则update，不存在则insert
// 充值D币
function Dcoin(params) {
  let sql = `update taiwan_billing.cash_cera set cera=(cera+${params.num}) where account='${params.uid}'`;
  // let sql = `insert into taiwan_billing.cash_cera values ('$uid',$cz_num,0,'$datetime','$datetime')`;
  
  return sql;
}

// 充值D点
function DSmallcoin(params) {
  let sql = `update taiwan_billing.cash_cera_point set cera_point=(cera_point+${params.num}) where account='${params.uid}'`;
  // let sql = `insert into taiwan_billing.cash_cera_point values ('$uid',$cz_num,'$datetime','$datetime')`;
  return sql;
}

// 充值游戏币
function Goldcoin(params) {
  let sql = `update taiwan_cain_2nd.inventory set money=(money+${params.num}) where charac_no=${params.mid}`
  return sql;
}

// 充值时装点
function fashion(params) {
  let sql = `update taiwan_cain_2nd.member_avatar_coin  set avatar_coin=(avatar_coin+${params.num}) where m_id=${params.uid}`
  return sql;
}

// 充值SP
function SP(params) {
  let sql = `update taiwan_cain_2nd.skill set remain_sp=(remain_sp+${params.num}) where charac_no=${params.mid}`;
  return sql;
}

// 充值TP
function TP(params) {
  let sql = `update taiwan_cain_2nd.skill set remain_sfp_2nd=(remain_sfp_2nd+${params.num}) where charac_no=${params.mid}`
  return sql;
}

// 充值QP
function QP(params) {
  let sql = `update taiwan_cain.charac_quest_shop set qp=(qp+${params.num}) where charac_no=${params.mid}`
  return sql;
}
module.exports = {
  credit: (req, res, next) => {
    let type = parseInt(req.body.type);
    let num = req.body.num;
    let uid = req.session.uid;
    let mid = req.session.mid;

    let params = {
      num: num,
      uid: uid,
      mid: mid
    }
    

    let sql = null;
    switch (type) {
      case 0:
        sql = Dcoin(params)
        break;
      case 1:
        sql = DSmallcoin(params)
        break;
      case 2:
        sql = Goldcoin(params)
        break;
      case 3:
        sql = fashion(params)
        break;
      case 4:
        sql = SP(params)
        break;
      case 5:
        sql = TP(params)
        break;
      case 6:
        sql = QP(params)
        break;
      default:
        return res.json({
          code: 400,
          msg: "充值失败"
        })
    }

    if (sql) {
      db(sql)
      .then( result => {
        return res.json({
          code: 200,
          msg: "充值成功"
        })
      })
    }
  }
}