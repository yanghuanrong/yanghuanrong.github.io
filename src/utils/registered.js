import data from './data.json'

export function registered(Vue){
    data.data.forEach((item) => {
        if(item.components){
            Vue.component('Button', function (resolve) {
                require(['@blog/' + item.components], resolve)
            })
        }
        Vue.component(item.blogName, function (resolve) {
            require(['@blog/md/' + item.blogFile], resolve)
        })
        
    })
}

