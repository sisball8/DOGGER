// miniprogram/pages/addPet/addPet.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  // function from xiaohu
  addImages: function(e) {
    let page = this
    let partner = this.data.partner
    let field = e.currentTarget.dataset.type
    // let imgQty = this.data.imgQty + 1
    // let showImageInput = this.data.showImageInput
    // this.setData({showImageInput: !showImageInput})
    if (field == 'images') {
      if (partner.images == undefined) {
        partner.images = []
      }
      XH.doUpload(`partner_${partner.partner_id}`).then(res => {
        partner.images.push(res)
        page.setData({partner: partner})
        wx.setStorageSync('newPartner', partner)
      })
    } else if (field == 'logo') {
      XH.doUpload(`partner_${partner.partner_id}`).then(res => {
        partner.logo = res
        page.setData({partner: partner})
        wx.setStorageSync('newPartner', partner)
      })
    }
  },
// replace this with doUpload from given function on index screen
  // listenerBtnChooseImage: function () {
  //   var that = this
  //   // Upload an image; no, there is upload image cloud call
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['original', 'compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {
  //       console.log('success')
  //       that.setData({
  //         src: res.tempFilePaths
  //         // dogimage: event.detail.value.dogimage
  //         // src: event.detail.value.dogimage


  //       })
  //       // Get image info
  //       wx.getImageInfo({
  //         src: res.tempFilePaths[0],
  //         // dogimage: event.detail.value.dogimage,
  //         // src: event.detail.value.dogimage,


  //         success: function (res) {
  //           console.log(res.width)
  //           console.log(res.height)
  //           console.log(res.path)
  //         }
  //       })
  //      }
  //    })
  //  },
  submitPet: function(event) {
     wx.cloud.callFunction({
       name: "savePet",
       data: {
         content: event.detail.value.content,
         dog: event.detail.value.dog,
         dogimage: event.detail.value.dogimage
        // src: res.tempFilePaths[0],
        // src: event.detail.value.dogimage
        



       },
       success: (res) => {
         wx.navigateTo({
           url: "/pages/index/index"
         })
       }

     })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})