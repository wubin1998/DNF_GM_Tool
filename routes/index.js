let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path')
let RegisterController = require('../controller/RegisterController')
let LoginController = require('../controller/LoginController')
let AccountController = require('../controller/AccountController')
let CreditController = require('../controller/CreditController')
let EmailController = require('../controller/EmailController')
let TollController = require('../controller/TollController')

router.use( (req, res, next) => {
  res.locals.isReg = fs.existsSync(path.resolve('__dirname', '../') + '/reg')
  next();
})

// 登录
router.route('/login')
.get((req, res) => {
  if (req.session.account) return res.redirect('/')
  res.render('session/login', {
    title: "登录"
  })
})
.post(LoginController.login)

// 注册
router.route('/register')
.get((req, res) => {
  if (!res.locals.isReg) return res.redirect('/login')
  res.render("session/register", {
    title: "注册"
  })
})
.post(RegisterController.register)

// 退出登录
router.get('/logout', (req, res) => {
  req.session.account = null;
  req.session.mid = null;
  req.session.uid = null;
  req.session.role_name = null;
  res.redirect('/login')
})



// 登录验证
router.use( (req, res, next) => {
  if (!req.session.account) return res.redirect('/login')
  res.locals.account = req.session.account;
  if (req.session.role_name) {
    res.locals.role_name = req.session.role_name
  }
  if (req.session.mid) {
    res.locals.mid = req.session.mid
  }
  if (req.session.uid) {
    res.locals.uid = req.session.uid
  }
  next();
})

router.get('/', (req, res, next) => {
  res.render('home/index', { title: '首页' });
});


router.route('/account')
.get( (req, res, next) => {
  res.render("account/index", { title: "账号管理" })
})

router.get('/check_account', LoginController.check_account)

// 添加账号
router.route('/account/new')
.get( (req, res, next) => {
  res.render('account/new', { title: '添加账号' });
})
.post(RegisterController.addAccount)

router.get("/account/list", AccountController.index)

router.delete("/account", AccountController.delete)

router.get('/role', (req, res, next) => {
  res.render("account/role", { title: "角色选择" })
})

router.get('/role/select', AccountController.role_select)

router.get('/role/list', AccountController.role)

router.get("/credit", (req, res, next) => {
  res.render("credit/index", { title: "充值" })
})


router.post("/credit", CreditController.credit)

// 邮件
router.get('/email', (req, res, next) => {
  res.render("email/index", { title: "邮件" })
})

router.post('/email', EmailController.postEmail)

// 工具
router.get('/tool', (req, res, next) => {
  res.render('tool/index', { title: "工具" })
})

router.post('/tool', TollController.index)
module.exports = router;
