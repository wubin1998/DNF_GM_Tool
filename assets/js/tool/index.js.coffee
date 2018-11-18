#= require ../common/index

class Tool extends Common
  constructor: () ->
    super()
  init: () ->
    super()

    $('.js-tool-btn').on 'click', @clickHandle
  
  clickHandle: () ->
    datas = 
      type: $(@).attr 'data-type'
    
    load = layer.load()
    $.post "/tool", datas, (res) ->
      layer.close(load)
      layer.alert res.msg

i = new Tool
i.init()