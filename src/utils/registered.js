import data from './data'


export function registered(Vue){
    data.data.forEach((item) => {
        Vue.component(item.components, function (resolve) {
            require(['@blog/md/' + item.file], resolve)
        })
    })
}

