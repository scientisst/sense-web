(function(){"use strict";var e={2449:function(e,t,n){var o=n(9242),r=n(3396);const i={class:"wrapper"},a=(0,r._)("div",{id:"modals"},null,-1);function c(e,t,n,o,c,s){const u=(0,r.up)("router-view"),f=(0,r.up)("page-footer");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",i,[(0,r.Wm)(u)]),a,(0,r.Wm)(f)],64)}var s=n.p+"img/ScientISST-Hor-Wht.97eef2ba.svg",u=n.p+"img/it.66801976.svg",f=n.p+"img/tecnico.abaab397.svg";const l=e=>((0,r.dD)("data-v-60a4324f"),e=e(),(0,r.Cn)(),e),d={id:"footer"},p={id:"content",class:"column"},v={class:"row space-between"},m={class:"column"},h={class:"row gap",id:"social-icons"},g={href:"https://github.com/scientisst"},b={href:"https://www.instagram.com/scientissthub/"},w={href:"https://www.facebook.com/ScientISST"},y={href:"https://www.linkedin.com/company/scientisst/"},_=l((()=>(0,r._)("p",null,[(0,r.Uk)(" ScientISST is hosted at Instituto de Telecomunicações (IT), Lisboa, Portugal. "),(0,r._)("br"),(0,r.Uk)(" (C) 2022 ScientISST. All rights reserved. ")],-1))),S=(0,r.uE)('<div class="column gap" data-v-60a4324f><a href="https://scientisst.com/" data-v-60a4324f><img src="'+s+'" data-v-60a4324f></a><div class="row gap" data-v-60a4324f><a href="https://it.pt/" data-v-60a4324f><img src="'+u+'" data-v-60a4324f></a><a href="https://tecnico.ulisboa.pt/" data-v-60a4324f><img src="'+f+'" data-v-60a4324f></a></div></div>',1);function k(e,t,n,o,i,a){const c=(0,r.up)("font-awesome-icon");return(0,r.wg)(),(0,r.iD)("div",d,[(0,r._)("div",p,[(0,r._)("div",v,[(0,r._)("div",m,[(0,r._)("div",h,[(0,r._)("a",g,[(0,r.Wm)(c,{icon:["fab","github"],size:"xl"})]),(0,r._)("a",b,[(0,r.Wm)(c,{icon:["fab","instagram"],size:"xl"})]),(0,r._)("a",w,[(0,r.Wm)(c,{icon:["fab","facebook"],size:"xl"})]),(0,r._)("a",y,[(0,r.Wm)(c,{icon:["fab","linkedin"],size:"xl"})])]),_]),S])])])}var C={name:"PageFooter"},T=n(89);const O=(0,T.Z)(C,[["render",k],["__scopeId","data-v-60a4324f"]]);var j=O,E={name:"senseApp",components:{PageFooter:j}};const I=(0,T.Z)(E,[["render",c]]);var x=I,A=n(678),P=n(7139),W=n.p+"img/SI-Sense-Hor-Col.3e82559e.svg";const z=e=>((0,r.dD)("data-v-720fdebd"),e=e(),(0,r.Cn)(),e),D={class:"home"},N=z((()=>(0,r._)("div",{id:"logo"},[(0,r._)("img",{alt:"ScientISST Sense logo",src:W})],-1))),F=z((()=>(0,r._)("div",{style:{height:"32px"}},null,-1))),H={class:"buttons"},L=["href","onClick"],Z=["href","onClick"];function q(e,t,n,o,i,a){const c=(0,r.up)("router-link");return(0,r.wg)(),(0,r.iD)("div",D,[N,F,(0,r._)("div",H,[(0,r.Wm)(c,{to:"/live"},{default:(0,r.w5)((({href:e,route:t,navigate:n})=>[(0,r._)("button",{href:e,onClick:n,class:"button"},(0,P.zw)(t.name),9,L)])),_:1}),(0,r.Wm)(c,{to:"/settings"},{default:(0,r.w5)((({href:e,route:t,navigate:n})=>[(0,r._)("button",{href:e,onClick:n,class:"button"},(0,P.zw)(t.name),9,Z)])),_:1})])])}var M={name:"HomeView",components:{},created:function(){"serial"in navigator||this.$router.replace({path:"/not-compatible"})}};const B=(0,T.Z)(M,[["render",q],["__scopeId","data-v-720fdebd"]]);var U=B;const Y=[{path:"/",name:"home",component:U},{path:"/live",name:"live",component:()=>n.e(443).then(n.bind(n,5092)),props:{header:!0,content:!0}},{path:"/not-compatible",name:"not-compatible",component:()=>n.e(443).then(n.bind(n,6635)),props:{header:!0,content:!0}},{path:"/settings",name:"settings",component:()=>n.e(443).then(n.bind(n,6869)),props:{header:!0,content:!0}}],G=(0,A.p7)({history:(0,A.r5)(),routes:Y});var J=G,K=n(7076),V=n(8125),$=n(8321),Q=n(2234),R=n(7749);V.vI.add($.M9J,$.Wq6,$.q9v,Q.neY,Q.Zzi,Q.D9H,Q.zhw),(0,o.ri)(x).use(J).use(K.ZP,{teleportTarget:"#modals"}).component("font-awesome-icon",R.GN).mount("#app")}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}n.m=e,function(){var e=[];n.O=function(t,o,r,i){if(!o){var a=1/0;for(f=0;f<e.length;f++){o=e[f][0],r=e[f][1],i=e[f][2];for(var c=!0,s=0;s<o.length;s++)(!1&i||a>=i)&&Object.keys(n.O).every((function(e){return n.O[e](o[s])}))?o.splice(s--,1):(c=!1,i<a&&(a=i));if(c){e.splice(f--,1);var u=r();void 0!==u&&(t=u)}}return t}i=i||0;for(var f=e.length;f>0&&e[f-1][2]>i;f--)e[f]=e[f-1];e[f]=[o,r,i]}}(),function(){n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,{a:t}),t}}(),function(){n.d=function(e,t){for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(t,o){return n.f[o](e,t),t}),[]))}}(),function(){n.u=function(e){return"js/about.7e637914.js"}}(),function(){n.miniCssF=function(e){return"css/about.005e90b6.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="sense-vue:";n.l=function(o,r,i,a){if(e[o])e[o].push(r);else{var c,s;if(void 0!==i)for(var u=document.getElementsByTagName("script"),f=0;f<u.length;f++){var l=u[f];if(l.getAttribute("src")==o||l.getAttribute("data-webpack")==t+i){c=l;break}}c||(s=!0,c=document.createElement("script"),c.charset="utf-8",c.timeout=120,n.nc&&c.setAttribute("nonce",n.nc),c.setAttribute("data-webpack",t+i),c.src=o),e[o]=[r];var d=function(t,n){c.onerror=c.onload=null,clearTimeout(p);var r=e[o];if(delete e[o],c.parentNode&&c.parentNode.removeChild(c),r&&r.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=d.bind(null,c.onerror),c.onload=d.bind(null,c.onload),s&&document.head.appendChild(c)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){n.p="/"}(),function(){var e=function(e,t,n,o){var r=document.createElement("link");r.rel="stylesheet",r.type="text/css";var i=function(i){if(r.onerror=r.onload=null,"load"===i.type)n();else{var a=i&&("load"===i.type?"missing":i.type),c=i&&i.target&&i.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=a,s.request=c,r.parentNode.removeChild(r),o(s)}};return r.onerror=r.onload=i,r.href=t,document.head.appendChild(r),r},t=function(e,t){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],i=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(i===e||i===t))return r}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){r=a[o],i=r.getAttribute("data-href");if(i===e||i===t)return r}},o=function(o){return new Promise((function(r,i){var a=n.miniCssF(o),c=n.p+a;if(t(a,c))return r();e(o,c,r,i)}))},r={143:0};n.f.miniCss=function(e,t){var n={443:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((function(){r[e]=0}),(function(t){throw delete r[e],t})))}}(),function(){var e={143:0};n.f.j=function(t,o){var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var i=new Promise((function(n,o){r=e[t]=[n,o]}));o.push(r[2]=i);var a=n.p+n.u(t),c=new Error,s=function(o){if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var i=o&&("load"===o.type?"missing":o.type),a=o&&o.target&&o.target.src;c.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",c.name="ChunkLoadError",c.type=i,c.request=a,r[1](c)}};n.l(a,s,"chunk-"+t,t)}},n.O.j=function(t){return 0===e[t]};var t=function(t,o){var r,i,a=o[0],c=o[1],s=o[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(r in c)n.o(c,r)&&(n.m[r]=c[r]);if(s)var f=s(n)}for(t&&t(o);u<a.length;u++)i=a[u],n.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return n.O(f)},o=self["webpackChunksense_vue"]=self["webpackChunksense_vue"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(2449)}));o=n.O(o)})();
//# sourceMappingURL=app.7c034267.js.map