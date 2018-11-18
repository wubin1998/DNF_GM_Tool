#= require ../common/index

class Email extends Common
  constructor: () ->
    super()
  init: () ->
    super()

    $('.js-send').on 'click', @sendHandle
  
  sendHandle: () ->
    datas = 
      item_id: $('.js-item-id').val()
      item_num: $('.js-item-num').val()
      strong_num: $('.js-strong').val()
      coin: $('.js-coin').val()
      
    load = layer.load()
    $.post "/email", datas, (res) ->
      layer.close(load)
      layer.alert res.msg

i = new Email
i.init()