#= require ../common/index

class Role extends Common
  constructor: () ->
    super()
    @table = layui.table
    @datas = []
  init: () ->
    super()
    @tableRender()

    $(document).on 'click', '.js-select', (event) => @selectRole(event)

  tableRender: () ->
    @table.render
      elem: '#role_table'
      url: '/role/list'
      cols: [[
        {
          field: 'charac_no'
          title: '角色ID',
        },
        {
          field: 'charac_name'
          title: '角色名'
        },
        {
          field: 'lev'
          title: '等级'
        },
        {
          title: '操作',
          toolbar: '#toolbar'
        },
      ]]
      done: (res) =>
        @datas = res.data

  selectRole: (event) ->
    index = $(event.target).parents('tr').attr('data-index')
    mid = @datas[index].charac_no
    role_name = @datas[index].charac_name

    $.get "/role/select", 
      mid: mid
      role_name: role_name, (res) ->
        location.href = ""
  
    

i = new Role
i.init()