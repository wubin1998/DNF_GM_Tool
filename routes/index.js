let express = require('express');
let router = express.Router();
let RegisterController = require('../controller/RegisterController')
let LoginController = require('../controller/LoginController')
let AccountController = require('../controller/AccountController')


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
  res.render("session/register", {
    title: "注册"
  })
})
.post(RegisterController.register)

// 退出登录
router.get('/logout', (req, res) => {
  req.session.account = null;
  res.redirect('/login')
})



// 登录验证
router.use( (req, res, next) => {
  if (!req.session.account) return res.redirect('/login')
  res.locals.account = req.session.account;
  next();
})

router.get('/', (req, res, next) => {
  res.render('home/index', { title: '首页' });
});


router.route('/account')
.get( (req, res, next) => {
  res.render("account/index", { title: "账号管理" })
})

// 添加账号
router.route('/account/new')
.get( (req, res, next) => {
  res.render('account/new', { title: '添加账号' });
})
.post(RegisterController.addAccount)

router.get("/account/list", AccountController.index)

router.delete("/account", AccountController.delete)

module.exports = router;
