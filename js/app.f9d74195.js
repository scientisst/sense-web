(function(){"use strict";var e={6537:function(e,t,n){var o=n(9242),r=n(3396);const i={class:"wrapper"},a=(0,r._)("div",{id:"modals"},null,-1);function s(e,t,n,o,s,c){const u=(0,r.up)("router-view"),l=(0,r.up)("page-footer");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",i,[(0,r.Wm)(u)]),a,(0,r.Wm)(l)],64)}var c=n(7139),u=n.p+"img/ScientISST-Hor-Wht.97eef2ba.svg",l=n.p+"img/it.66801976.svg",d=n.p+"img/tecnico.abaab397.svg";const f=e=>((0,r.dD)("data-v-3c2b8906"),e=e(),(0,r.Cn)(),e),p={id:"footer"},v={id:"content",class:"column"},h={class:"row space-between"},m={class:"column"},g={class:"row gap",id:"social-icons"},b={href:"https://github.com/scientisst"},w={href:"https://www.instagram.com/scientissthub/"},k={href:"https://www.facebook.com/ScientISST"},y={href:"https://www.linkedin.com/company/scientisst/"},_=f((()=>(0,r._)("br",null,null,-1))),S=(0,r.Uk)(" ScientISST is hosted at Instituto de Telecomunicações (IT), Lisboa, Portugal. "),C=f((()=>(0,r._)("br",null,null,-1))),E=(0,r.Uk)(" (C) 2022 ScientISST. All rights reserved. "),I=(0,r.uE)('<div class="column gap" data-v-3c2b8906><a href="https://scientisst.com/" data-v-3c2b8906><img src="'+u+'" data-v-3c2b8906></a><div class="row gap" data-v-3c2b8906><a href="https://it.pt/" data-v-3c2b8906><img src="'+l+'" data-v-3c2b8906></a><a href="https://tecnico.ulisboa.pt/" data-v-3c2b8906><img src="'+d+'" data-v-3c2b8906></a></div></div>',1);function A(e,t,n,o,i,a){const s=(0,r.up)("font-awesome-icon");return(0,r.wg)(),(0,r.iD)("div",p,[(0,r._)("div",v,[(0,r._)("div",h,[(0,r._)("div",m,[(0,r._)("div",g,[(0,r._)("a",b,[(0,r.Wm)(s,{icon:["fab","github"],size:"lg"})]),(0,r._)("a",w,[(0,r.Wm)(s,{icon:["fab","instagram"],size:"lg"})]),(0,r._)("a",k,[(0,r.Wm)(s,{icon:["fab","facebook"],size:"lg"})]),(0,r._)("a",y,[(0,r.Wm)(s,{icon:["fab","linkedin"],size:"lg"})])]),(0,r._)("p",null,[(0,r.Uk)(" SENSE Web v"+(0,c.zw)(i.appVersion)+" ",1),_,S,C,E])]),I])])])}var T={i8:"0.5.0"},O=n(8125),P=n(2234);O.vI.add(P.neY,P.Zzi,P.D9H,P.zhw);var W={name:"PageFooter",data(){return{appVersion:T.i8}}},N=n(89);const j=(0,N.Z)(W,[["render",A],["__scopeId","data-v-3c2b8906"]]);var z=j,D={name:"senseApp",components:{PageFooter:z}};const B=(0,N.Z)(D,[["render",s]]);var F=B,q=n(8970),x=n(2483),L=n.p+"img/SI-Sense-Hor-Col.3e82559e.svg";const Z=e=>((0,r.dD)("data-v-4948758b"),e=e(),(0,r.Cn)(),e),H={class:"home"},M={key:0,id:"install"},U=(0,r.Uk)(" Install "),G=Z((()=>(0,r._)("div",{id:"logo"},[(0,r._)("img",{alt:"ScientISST Sense logo",src:L})],-1))),V=Z((()=>(0,r._)("div",{style:{height:"32px"}},null,-1))),Y={class:"buttons"},J=["href","onClick"],K=["href","onClick"];function R(e,t,n,o,i,a){const s=(0,r.up)("font-awesome-icon"),u=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",H,[i.showInstallButton?((0,r.wg)(),(0,r.iD)("div",M,[(0,r._)("button",{onClick:t[0]||(t[0]=(...e)=>a.installPWA&&a.installPWA(...e)),class:"button active"},[(0,r.Wm)(s,{icon:"download",size:"sm"}),U])])):(0,r.kq)("",!0),G,V,(0,r._)("div",Y,[(0,r.Wm)(u,{to:"/live"},{default:(0,r.w5)((({href:e,route:t,navigate:n})=>[(0,r._)("button",{href:e,onClick:n,class:"button"},(0,c.zw)(t.name),9,J)])),_:1}),(0,r.Wm)(u,{to:"/settings"},{default:(0,r.w5)((({href:e,route:t,navigate:n})=>[(0,r._)("button",{href:e,onClick:n,class:"button"},(0,c.zw)(t.name),9,K)])),_:1})])])}var Q={name:"HomeView",components:{},data(){return{showInstallButton:!1}},beforeMount(){window.addEventListener("beforeinstallprompt",(e=>{e.preventDefault(),this.installEvent=e,this.showInstallButton=!0}))},methods:{installPWA(){this.installEvent.prompt(),this.installEvent.userChoice.then((e=>{"accepted"===e.outcome&&(this.showInstallButton=!1)}))}}};const X=(0,N.Z)(Q,[["render",R],["__scopeId","data-v-4948758b"]]);var $=X;const ee=[{path:"/",name:"home",component:$},{path:"/live",name:"live",component:()=>n.e(443).then(n.bind(n,6033)),props:{header:!0,content:!0}},{path:"/not-compatible",name:"not-compatible",component:()=>n.e(443).then(n.bind(n,6635)),props:{header:!0,content:!0}},{path:"/settings",name:"settings",component:()=>n.e(443).then(n.bind(n,2870)),props:{header:!0,content:!0}}],te=(0,x.p7)({history:(0,x.r5)(),routes:ee});var ne=te,oe=n(5103),re=n(8321),ie=n(7749),ae=n(5431);(0,ae.z)("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),O.vI.add(re.M9J,re.Wq6,re.q9v,re.q7m),(0,o.ri)(F).use(q.ZP,{appName:"SENSE",config:{id:"G-ZJ6DG3RY8S",params:{send_page_view:!0}}}).use(ne).use(oe.ZP,{teleportTarget:"#modals"}).component("font-awesome-icon",ie.GN).mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var a=1/0;for(l=0;l<e.length;l++){o=e[l][0],r=e[l][1],i=e[l][2];for(var s=!0,c=0;c<o.length;c++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[c])}))?o.splice(c--,1):(s=!1,i<a&&(a=i));if(s){e.splice(l--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.3e0f1e9b.js"}}(),function(){n.miniCssF=function(e){return"css/about.12a70faa.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="sense:";n.l=function(o,r,i,a){if(e[o])e[o].push(r);else{var s,c;if(void 0!==i)for(var u=document.getElementsByTagName("script"),l=0;l<u.length;l++){var d=u[l];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==t+i){s=d;break}}s||(c=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+i),s.src=o),e[o]=[r];var f=function(t,n){s.onerror=s.onload=null,clearTimeout(p);var r=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),r&&r.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),c&&document.head.appendChild(s)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,o){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=function(i){if(r.onerror=r.onload=null,"load"===i.type)n();else{var a=i&&("load"===i.type?"missing":i.type),s=i&&i.target&&i.target.href||t,c=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=s,r.parentNode.removeChild(r),o(c)}};return r.onerror=r.onload=i,r.href=t,document.head.appendChild(r),r},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){r=a[o],i=r.getAttribute("data-href");if(i===e||i===t)return r}},o=function(o){return new Promise((function(r,i){var a=n.miniCssF(o),s=n.p+a;if(t(a,s))return r();e(o,s,r,i)}))},r={143:0};n.f.miniCss=function(e,t){var n={443:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=i);var a=n.p+n.u(t),s=new Error,c=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",s.name="ChunkLoadError",s.type=i,s.request=a,r[1](s)}};n.l(a,c,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,a=o[0],s=o[1],c=o[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(c)var l=c(n)}for(t&&t(o);u<a.length;u++)i=a[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(l)},o=self["webpackChunksense"]=self["webpackChunksense"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(6537)}));o=n.O(o)})();
//# sourceMappingURL=app.f9d74195.js.map