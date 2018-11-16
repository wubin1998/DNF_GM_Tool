class Register
  constructor: () ->
    
  init: () ->
    $('.js-register-btn').on 'click', => @clickRegister()

  
  clickRegister: () ->
    datas = 
      account: $('input[name="account"]').val()
      password: $('input[name="password"]').val()
      re_password: $('input[name="re_password"]').val()
    
    if not datas.account
      return layer.msg "请输入账号", icon: 7
    if not datas.password
      return layer.msg "请输入密码", icon: 7

    if datas.password != datas.re_password
      return layer.msg "输入密码不一致，请重新输入", icon: 7

    load = layer.load(2)
    $.post "/register", datas, (res) ->
      layer.close load
      if res.code is 200
        return layer.alert res.msg,
          yes: () ->
            location.href = '/login'
      layer.alert res.msg

reg = new Register
reg.init()