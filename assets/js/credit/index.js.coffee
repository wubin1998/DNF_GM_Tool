#= require ../common/index

class Credit extends Common
  constructor: () ->
    super()
  init: () ->
    super()

    $('.js-sure').on 'click', @clickHandle
  
  clickHandle: () ->
    datas = 
      type: $('.js-type').val()
      num: $('.js-num').val()
    
    load = layer.load()
    $.post "/credit", datas, (res) ->
      layer.close(load)
      layer.alert res.msg

i = new Credit
i.init()