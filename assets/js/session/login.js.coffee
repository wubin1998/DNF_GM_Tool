class Login
  constructor: () ->
    @password = $('input[name="password"]')
    @account  = $('input[name="account"]')

  init: () ->
    $('.js-login-btn').on 'click', => @clickLogin() 
    
    @password.on 'keydown', (event) =>
      if event.keyCode is 13
        @clickLogin()
  
  clickLogin: () ->
    datas = 
      account: @account.val()
      password: @password.val()

    load = layer.load(2)
    
    $.post "/login", datas, (res) =>
      layer.close load
      if res.code is 200
        return location.href = '/'
      layer.alert res.msg
      @password.val("").focus()



login = new Login
login.init()