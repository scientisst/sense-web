if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const u=e=>i(e,r),t={module:{uri:r},exports:o,require:u};s[r]=Promise.all(n.map((e=>t[e]||u(e)))).then((e=>(l(...e),o)))}}define(["./workbox-79ffe3e0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"sense"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/css/about.8f28be71.css",revision:null},{url:"/css/app.0a90d914.css",revision:null},{url:"/img/SI-Sense-Hor-Col.3e82559e.svg",revision:null},{url:"/img/SI-Sense-Vert-Col.9079a352.svg",revision:null},{url:"/img/ScientISST-Hor-Wht.97eef2ba.svg",revision:null},{url:"/img/back-1000.7f9c32a3.png",revision:null},{url:"/img/front-1000.a3ee61e1.png",revision:null},{url:"/img/it.66801976.svg",revision:null},{url:"/img/logo-sad.41568157.svg",revision:null},{url:"/img/resize.abe5b9b0.svg",revision:null},{url:"/img/tecnico.abaab397.svg",revision:null},{url:"/index.html",revision:"36fc2645c8a5a43daae2b10006aadcde"},{url:"/js/about.eea04bb3.js",revision:null},{url:"/js/app.f14c2810.js",revision:null},{url:"/js/chunk-vendors.d57aacc9.js",revision:null},{url:"/manifest.json",revision:"7bde9cfe8bff0674354c5d58242be5b0"},{url:"/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
