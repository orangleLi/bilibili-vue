import loadingComponent from './loading.vue'
import wxModalComponent from './wxModal.vue'
const loading = {
  install: function (Vue) {
    let LoadingProfile = Vue.extend(loadingComponent)
    let loadingPro = new LoadingProfile()
    let AlertProfile = Vue.extend(wxModalComponent)
    let alertPro = new AlertProfile()
    document.body.appendChild(loadingPro.$mount().$el)
    document.body.appendChild(alertPro.$mount().$el)
    Vue.prototype.$message = {
      showLoading (obj) {
        return loadingPro.showLoading(obj)
      },
      hideLoading () {
        return loadingPro.hideLoading()
      },
      showToast (obj) {
        return loadingPro.showToast(obj)
      },
      hideToast () {
        return loadingPro.hideToast()
      },
      showModal (obj) {
        return alertPro.showModal(obj)
      }
    }
  }
}
export default loading
