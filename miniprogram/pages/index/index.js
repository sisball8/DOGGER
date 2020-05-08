//index.js
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  addPet: function() {
    wx.navigateTo({
      url: '/pages/addPet/addPet',
    })
    
  },

  

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 Has been authorized, you can directly call getUserInfo to get the nickname of the avatar, will not pop the frame
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
    wx.cloud.callFunction({
      name:"getPet",
      success: (res) => {
        console.log (res);
        this.setData ({
          pets: res.result.data
        })
      }
    })

    
  },

  

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  doUpload: function(folder, filename = null) {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          wx.showLoading({
            title: 'Uploading...',
          })
          const filePath = res.tempFilePaths[0]
          // 上传图片upload image
          let now = new Date().toString().split(' ')
          let name = now[3] + '-' + now[1] + '-' + now[2] + '-' + now[4].split(':').join('-')
          let cloudPath
          // const cloudPath = folder + '/'+ name + filePath.match(/\.[^.]+?$/)[0]
          if (filename == null) {
            cloudPath = folder + '/'+ name + filePath.match(/\.[^.]+?$/)[0]
          } else {
            cloudPath = folder + '/'+ filename + filePath.match(/\.[^.]+?$/)[0]
          }
          console.log(cloudPath)
          console.log(filePath)
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              wx.hideLoading()
              // app.globalData.fileID = res.fileID
              // app.globalData.cloudPath = cloudPath
              // app.globalData.imagePath = filePath
              console.log('[上传文件] 成功：', res)
              resolve(res.fileID)
            },
            fail: e => {
              wx.hideLoading()
              console.error('[上传文件] 失败：', e)
              wx.showToast({
                icon: 'failed',
                title: 'Upload failed!',
              })
              reject('failed')
            }
          })
        },
        fail: e => {
          console.error(e)
        }
      })
    })
  },
  // 上传图片upload image
  // doUpload: function () {
  //   // 选择图片 Select Image
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中uploading',
  //       })

  //       const filePath = res.tempFilePaths[0]
  //       // const filePath = res.event.dogimage
        
  //       // 上传图片upload image
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：[Upload file] Success:', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
            
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },

})
