// compone/nav/index.js

const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    backShow: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: '', // 导航栏总高度
    menuWith:'', // 按钮的宽度
    menuHeight: '', // 按钮的高度
    menuTop: '', // 按钮距离顶部距离
    menuLeft: '', // 按钮举例左侧距离
    timer: null
  },
  attached() {
    let { menuInfo, sysInfo } = app.globalData
    let that = this
    if (menuInfo && menuInfo.width > 0) {
      this.setData({
        menuWith: menuInfo.width,
        menuHeight: menuInfo.height,
        menuTop: menuInfo.top,
        menuLeft: sysInfo.screenWidth - menuInfo.right,
        navHeight: sysInfo.statusBarHeight + 44 + 1
      })
    }  else {
      this.timer = setInterval(() => {
        let { menuInfo, sysInfo } = app.globalData
        if (menuInfo && menuInfo.width > 0) {
          this.setData({
            menuWith: menuInfo.width,
            menuHeight: menuInfo.height,
            menuTop: menuInfo.top,
            menuLeft: sysInfo.screenWidth - menuInfo.right,
            navHeight: sysInfo.statusBarHeight + 44
          })
          clearInterval(that.timer)
        }
      }, 500);
    }   
  },
  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      wx.navigateBack({
        delta: 1
      })
    },
    home() {
      wx.reLaunch({
        url: '/pages/index/index'
      })
      // wx.navigateTo({
      //   url: '/pages/index/index'
      // })
    }

  }
})
