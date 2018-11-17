#= require ../common/index

class New extends Common
  constructor: () ->
    super()
    @form = layui.form
    $('.js-register-btn').on 'click', => @clickRegister()
  
  init: () ->
    super()
    @form.render()
    @account = $('input[name="account"]')
    @password = $('input[name="password"]')
    @re_password = $('input[name="re_password"]')
    @type = $('input[name="type"]')

  clickRegister: () ->
    datas = 
      account: @account.val()
      password: @password.val()
      re_password: @re_password.val()
      type: @type.filter(":checked").val()
    
    
    if not datas.account
      return layer.msg "请输入账号", icon: 7
    if not datas.password
      return layer.msg "请输入密码", icon: 7

    if datas.password != datas.re_password
      return layer.msg "输入密码不一致，请重新输入", icon: 7

    load = layer.load(2)
    $.post "/account/new", datas, (res) =>
      layer.close load
      if res.code is 200
        @account.val ""
        @password.val ""
        @re_password.val ""
        @type.val "0"
      layer.alert res.msg


n = new New
n.init()