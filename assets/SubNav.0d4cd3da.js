import{e as _,f as g,r as x,g as c,o as e,h as n,i as k,m as y,c as b,w as h,n as v,j as d,F as B,k as C,l as N,a as m,b as u,t as i,p as w,q as D,d as L,s as S}from"./app.76c9cac4.js";const V=["href"],P=_({name:"AppLink",props:{to:null},setup(r){const o=r,p=g(()=>typeof o.to=="string"&&o.to.startsWith("http"));return(a,l)=>{const t=x("router-link");return c(p)?(e(),n("a",y({key:0},a.$attrs,{href:r.to,target:"_blank"}),[k(a.$slots,"default")],16,V)):(e(),b(t,v(y({key:1},a.$props)),{default:h(()=>[k(a.$slots,"default")]),_:3},16))}}}),R={key:0,py2:"",op50:""},W={class:"no-underline"},z={class:"title text-lg"},E={key:0,class:"text-xs border border-current rounded px-1 pb-0.2"},F={class:"time opacity-50 text-sm -mt-1"},j={key:0,class:"opacity-50"},H=_({name:"ListPosts",props:{type:null,posts:null},setup(r){const o=r,a=N().getRoutes().filter(t=>t.path.startsWith("/posts")&&t.meta.frontmatter.date).sort((t,f)=>+new Date(f.meta.frontmatter.date)-+new Date(t.meta.frontmatter.date)).filter(t=>!t.path.endsWith(".html")&&t.meta.frontmatter.type===o.type).map(t=>({path:t.path,title:t.meta.frontmatter.title,date:t.meta.frontmatter.date,lang:t.meta.frontmatter.lang,duration:t.meta.frontmatter.duration})),l=g(()=>o.posts||a);return console.log(l),(t,f)=>{const $=P;return e(),n("ul",null,[c(l).length?d("",!0):(e(),n("div",R," { nothing here yet } ")),(e(!0),n(B,null,C(c(l),s=>(e(),b($,{key:s.path,class:"item block font-normal mb-6 mt-2 no-underline",to:s.path},{default:h(()=>[m("li",W,[m("div",z,[u(i(s.title)+" ",1),s.lang?(e(),n("sup",E,i(s.lang),1)):d("",!0)]),m("div",F,[u(i(c(w)(s.date))+" ",1),s.duration?(e(),n("span",j,"\xB7 "+i(s.duration),1)):d("",!0)])])]),_:2},1032,["to"]))),128))])}}}),q={class:"prose m-auto mb-8 select-none"},A={"mb-0":"",flex:"~ gap-3","text-3xl":""},T=u(" Blog "),I=_({name:"SubNav",setup(r){const o="opacity-20 hover:opacity-50",p=D();return(a,l)=>{const t=x("router-link");return e(),n("div",q,[m("div",A,[L(t,{to:"/posts",class:S(["!border-none !font-400",c(p).path==="/posts"?"":o])},{default:h(()=>[T]),_:1},8,["class"])])])}}});export{I as _,H as a};