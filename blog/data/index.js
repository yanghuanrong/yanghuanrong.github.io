import data from './data.json'

const install = (Vue) => {
  data.data.forEach((item) => {
    Vue.component(item.blogName, function (resolve) {
      require(['@blog/md/' + item.blogFile], resolve)
    })
  })
}

export default {
  install
}