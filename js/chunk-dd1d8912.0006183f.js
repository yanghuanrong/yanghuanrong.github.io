(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd1d8912"],{"00b2":function(t,e,n){},"159b":function(t,e,n){var o=n("da84"),a=n("fdbc"),i=n("17c2"),s=n("9112");for(var c in a){var r=o[c],l=r&&r.prototype;if(l&&l.forEach!==i)try{s(l,"forEach",i)}catch(u){l.forEach=i}}},"17c2":function(t,e,n){"use strict";var o=n("b727").forEach,a=n("a640"),i=a("forEach");t.exports=i?[].forEach:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}},"21a6":function(t,e,n){(function(n){var o,a,i;(function(n,s){a=[],o=s,i="function"===typeof o?o.apply(e,a):o,void 0===i||(t.exports=i)})(0,(function(){"use strict";function e(t,e){return"undefined"==typeof e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}function o(t,e,n){var o=new XMLHttpRequest;o.open("GET",t),o.responseType="blob",o.onload=function(){r(o.response,e,n)},o.onerror=function(){console.error("could not download file")},o.send()}function a(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(t){}return 200<=e.status&&299>=e.status}function i(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(o){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var s="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof n&&n.global===n?n:void 0,c=s.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),r=s.saveAs||("object"!=typeof window||window!==s?function(){}:"download"in HTMLAnchorElement.prototype&&!c?function(t,e,n){var c=s.URL||s.webkitURL,r=document.createElement("a");e=e||t.name||"download",r.download=e,r.rel="noopener","string"==typeof t?(r.href=t,r.origin===location.origin?i(r):a(r.href)?o(t,e,n):i(r,r.target="_blank")):(r.href=c.createObjectURL(t),setTimeout((function(){c.revokeObjectURL(r.href)}),4e4),setTimeout((function(){i(r)}),0))}:"msSaveOrOpenBlob"in navigator?function(t,n,s){if(n=n||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(e(t,s),n);else if(a(t))o(t,n,s);else{var c=document.createElement("a");c.href=t,c.target="_blank",setTimeout((function(){i(c)}))}}:function(t,e,n,a){if(a=a||open("","_blank"),a&&(a.document.title=a.document.body.innerText="downloading..."),"string"==typeof t)return o(t,e,n);var i="application/octet-stream"===t.type,r=/constructor/i.test(s.HTMLElement)||s.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent);if((l||i&&r||c)&&"undefined"!=typeof FileReader){var u=new FileReader;u.onloadend=function(){var t=u.result;t=l?t:t.replace(/^data:[^;]*;/,"data:attachment/file;"),a?a.location.href=t:location=t,a=null},u.readAsDataURL(t)}else{var d=s.URL||s.webkitURL,p=d.createObjectURL(t);a?a.location=p:location.href=p,a=null,setTimeout((function(){d.revokeObjectURL(p)}),4e4)}});s.saveAs=r.saveAs=r,t.exports=r}))}).call(this,n("c8ba"))},"25f0":function(t,e,n){"use strict";var o=n("6eeb"),a=n("825a"),i=n("d039"),s=n("ad6d"),c="toString",r=RegExp.prototype,l=r[c],u=i((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=c;(u||d)&&o(RegExp.prototype,c,(function(){var t=a(this),e=String(t.source),n=t.flags,o=String(void 0===n&&t instanceof RegExp&&!("flags"in r)?s.call(t):n);return"/"+e+"/"+o}),{unsafe:!0})},"466d":function(t,e,n){"use strict";var o=n("d784"),a=n("825a"),i=n("50c4"),s=n("1d80"),c=n("8aa5"),r=n("14c3");o("match",1,(function(t,e,n){return[function(e){var n=s(this),o=void 0==e?void 0:e[t];return void 0!==o?o.call(e,n):new RegExp(e)[t](String(n))},function(t){var o=n(e,t,this);if(o.done)return o.value;var s=a(t),l=String(this);if(!s.global)return r(s,l);var u=s.unicode;s.lastIndex=0;var d,p=[],f=0;while(null!==(d=r(s,l))){var v=String(d[0]);p[f]=v,""===v&&(s.lastIndex=c(l,i(s.lastIndex),u)),f++}return 0===f?null:p}]}))},"7b8e":function(t,e,n){"use strict";n("c4a4")},a640:function(t,e,n){"use strict";var o=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&o((function(){n.call(null,e||function(){throw 1},1)}))}},a8f9:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"blog"},[n("div",{staticClass:"container"},[n("div",{staticClass:"content blog-doc"},[n("h1",[t._v("一键复制")]),t._m(0),n("demo-block",[n("demo1",{attrs:{slot:"source"},slot:"source"}),n("template",{slot:"highlight"},[n("pre",{pre:!0,attrs:{class:"hljs-pre"}},[n("code",{pre:!0,attrs:{class:"html"}},[t._v('<template>\n    <div class="page">\n        <p class="copy-text-box">有内鬼，终止交易</p>\n        <button @click="click" class="copy-btn">点击复制</button>\n        <textarea class="textarea" placeholder="粘贴区域"></textarea>\n    </div>\n</template>\n<script>\nfunction copy(value) {\n    const oInput = document.createElement(\'textarea\')\n    document.body.appendChild(oInput)\n    oInput.style.width = \'0\'\n    oInput.style.height = \'0\'\n    oInput.style.position = \'absolute\'\n    oInput.style.opacity = \'0\'\n    oInput.value = value\n\n    const ua = window.navigator.userAgent\n\n    if (!!ua.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/)) {\n        oInput.focus();\n        oInput.setSelectionRange(0, 9999);\n        document.execCommand("copy");\n    } else if (ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1) {\n        oInput.select();\n        document.execCommand("copy");\n    } else {\n        oInput.focus();\n        oInput.setSelectionRange(0, 9999);\n        document.execCommand("copy");\n    }\n    document.body.removeChild(oInput)\n}\nexport default {\n  methods: {\n    click(){\n        const text =document.querySelector(\'.copy-text-box\').innerHTML\n        copy(text)\n    }\n  }\n}\n<\/script>\n\n<style scope>\n    .page{\n        text-align:center;\n        padding: 30px;\n    }\n    .copy-text-box{\n        margin-bottom: 30px;\n    }\n    .copy-btn{\n        background: green;\n        color: white;\n        border: none;\n        padding: 5px 10px;\n        border-radius: 3px;\n        display: block;\n        margin: 0 auto 30px;\n        cursor: pointer;\n    }\n    .textarea{\n        border: 1px solid #ddd;\n        min-width: 200px;\n        max-width: 500px;\n        min-height: 100px;\n        padding: 5px;\n        border-radius: 3px;\n    }\n</style>\n')])])])],2)],1)])])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("blockquote",[n("p",[t._v("在移动端或者pc端经常会遇到这样的需求")])])}],i=n("e9ba"),s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("p",{staticClass:"copy-text-box"},[t._v("有内鬼，终止交易")]),n("button",{staticClass:"copy-btn",on:{click:t.click}},[t._v("点击复制")]),n("textarea",{staticClass:"textarea",attrs:{placeholder:"粘贴区域"}})])},c=[];n("ac1f"),n("466d");function r(t){var e=document.createElement("textarea");document.body.appendChild(e),e.style.width="0",e.style.height="0",e.style.position="absolute",e.style.opacity="0",e.value=t;var n=window.navigator.userAgent;n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)?(e.focus(),e.setSelectionRange(0,9999),document.execCommand("copy")):n.indexOf("Android")>-1||n.indexOf("Adr")>-1?(e.select(),document.execCommand("copy")):(e.focus(),e.setSelectionRange(0,9999),document.execCommand("copy")),document.body.removeChild(e)}var l={methods:{click:function(){var t=document.querySelector(".copy-text-box").innerHTML;r(t)}}},u=l,d=(n("7b8e"),n("2877")),p=Object(d["a"])(u,s,c,!1,null,null,null),f=p.exports,v={components:{DemoBlock:i["a"],Demo1:f}},m=v,h=Object(d["a"])(m,o,a,!1,null,null,null);e["default"]=h.exports},c4a4:function(t,e,n){},e9ba:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"demo-block"},[t.$slots.default?n("div",{staticClass:"description"},[t._t("default")],2):t._e(),n("div",{staticClass:"source"},[n("div",{staticClass:"browser"},[t._m(0),n("div",{staticClass:"browser-body"},[t._t("source")],2)])]),n("div",{ref:"meta",staticClass:"meta"},[n("div",{staticClass:"highlight"},[t._m(1),t._t("highlight"),t.fileList.length?n("div",{staticClass:"hljs-footbar"},[n("code",{staticClass:"hljs"},[n("div",{staticClass:"hljs-problems__tips"},[t._v("Problems "),n("span",[t._v(t._s(t.fileList.length))])]),t._l(t.fileList,(function(e,o){return n("div",{key:"file"+o,staticClass:"hljs-problems__list"},[n("svg",{staticClass:"flex-none text-amber-400",attrs:{width:"20",height:"20",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"}},[n("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5",d:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"}})]),n("p",[t._v(" You may need to download it "),n("span",{staticClass:"hljs-string download",attrs:{title:"download "+e.name+"."+e.ext},on:{click:function(n){return t.download(e)}}},[t._v(t._s(e.name)+"."+t._s(e.ext))])])])}))],2)]):t._e()],2)]),n("div",{staticClass:"background",style:{background:t.backColr}})])},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"browser-bar"},[n("div",{staticClass:"dot"},[n("i"),n("i"),n("i")]),n("div",{staticClass:"address"},[n("span",[t._v("https://github.com/yanghuanrong")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hljs-topbar"},[n("div",{staticClass:"dot"},[n("i",{staticClass:"red"}),n("i",{staticClass:"yellow"}),n("i",{staticClass:"green"})])])}],i=(n("d3b7"),n("25f0"),n("fb6a"),n("159b"),n("99af"),n("b0c0"),n("00b2"),n("21a6")),s=n.n(i),c=n("77a4"),r={data:function(){function t(){var t=(1048575*Math.random()*1e6).toString(16);return"#"+t.slice(0,6)}return{backColr:t(),fileList:[]}},created:function(){var t=this,e=this.$route.params.id;e&&c["data"].forEach((function(n){n.blogName===e&&(t.fileList=n.blogList)}))},methods:{download:function(t){var e=new Blob([t.core],{type:"text/plain;charset=utf-8"});s.a.saveAs(e,"".concat(t.name,".").concat(t.ext))}}},l=r,u=n("2877"),d=Object(u["a"])(l,o,a,!1,null,null,null);e["a"]=d.exports}}]);
//# sourceMappingURL=chunk-dd1d8912.0006183f.js.map