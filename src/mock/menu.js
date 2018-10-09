export default {
  getMenuList: () => {
    let menus = [
      {
        name: 'dashboard',
        title: '一级菜单测试',
      },

      {
        name: 'charts',
        title: '二级菜单测试',
        children: [
          { name: 'keyboard', title: 'keyboardChart' },
          { name: 'line', title: 'lineChart' }
        ]
      },

      {

        name: 'nested',
        title: '三级四级菜单',
        children: [
          {
            name: 'menu1',
            title: 'menu1',
            children: [
              {
                name: 'menu1-1',
                title: 'menu1-1'
              },
              {
                name: 'menu1-2',
                title: 'menu1-2' ,
                children: [
                  {
                    name: 'menu1-2-1',
                    title: 'menu1-2-1'
                  },
                  {
                    name: 'menu1-2-2',
                    title: 'menu1-2-2'
                  }
                ]
              },
              {
                name: 'menu1-3',
                title: 'menu1-3'
              }
            ]
          },
          {
            name: 'menu2',
            title: 'menu2'
          }
        ]
      }

    ]

    return menus;
  }
}