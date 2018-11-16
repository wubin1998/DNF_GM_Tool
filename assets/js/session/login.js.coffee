class Login
  constructor: () ->
    
  init: () ->
    $('.js-login-btn').on 'click', => @clickLogin() 
  
  clickLogin: () ->
    datas = 
      account: $('input[name="account"]').val()
      password: $('input[name="password"]').val()

    load = layer.load(2)
    
    $.post "/login", datas, (res) ->
      layer.close load
      if res.code is 200
        return layer.alert res.msg,
          yes: () ->
            location.href = '/'
      layer.alert res.msg



login = new Login
login.init()