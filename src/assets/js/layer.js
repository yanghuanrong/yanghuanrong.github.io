/**
 * Vue提示弹窗插件
 **/
let layer = {
  msg (value) {
    let layer = document.createElement('div');
    layer.style = 'position:fixed; top:50%; left:50%; background-color:rgba(0,0,0,.6); border-radius:5px; padding:5px 10px; color:#FFF; transform:translate(-50%,-50%)';
    layer.innerHTML = value;
    document.body.appendChild(layer);
    setTimeout(()=>{
      document.body.removeChild(layer);
    },2000)
  },
}

export default {
  install: function (vue) {
    vue.prototype.$layer = layer
  }
}
