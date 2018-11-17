#= require ../common/index

class Index extends Common
  constructor: () ->
    super()
    @table = layui.table
    @datas = []
  init: () ->
    super()
    @tableRender()

    $(document).on 'click', '.js-delete', (event) => @removeHandle(event)

    $(document).on 'click', '.js-search-btn', @search
      
    $(document).on 'click', '.js-show', -> layer.msg "功能开发中"
        

  tableRender: () ->
    @table.render
      elem: '#account_table'
      url: '/account/list'
      page: true
      cols: [[
        {
          field: 'UID'
          title: 'UID',
        },
        {
          field: 'accountname'
          title: '账号'
        },
        {
          field: '权限'
          title: 'type'
          templet: (i) ->
            if i.qq is "GM_master"
              return "GM"
            if i.qq is "GM_vip"
              return "VIP"
            if i.qq is "" or not i.qq
              return "普通"
        },
        {
          title: '操作',
          toolbar: '#toolbar'
        },
      ]]
      done: (res) =>
        @datas = res.data
        
  
  removeHandle: (event) -> 
    _index = $(event.target).parents('tr').attr('data-index')
    layer.confirm "是否删除账号?", (index) => 
      uid = @datas[_index].UID
      load = layer.load(2)
      layer.close index
      $.ajax
        type: "delete"
        url: "/account"
        data: "uid=#{uid}"
        success: (res) ->
          layer.closeAll()
          if res.code is 200
            layer.msg res.msg, icon: 1
            layui.table.reload("account_table")

  search: () ->
    account = $('.js-account').val()
    layui.table.reload "account_table",
      where:
        account: account 
    

i = new Index
i.init()