(this["webpackJsonpcorona-meter"]=this["webpackJsonpcorona-meter"]||[]).push([[0],{108:function(e,t,a){},109:function(e,t,a){"use strict";a.r(t);a(63),a(64),a(65),a(66);var n=a(0),r=a.n(n),o=a(15),c=a.n(o),i=a(6),l=a(11),s=a.n(l),u=a(23),d=a(21),m=a(33),p=a(41),f=a.n(p),h=a(113),b=a(111),v=[{name:"Australia",code:"AU"},{name:"Austria",code:"AT"},{name:"China",code:"CN"},{name:"Czechia",code:"CZ"},{name:"France",code:"FR"},{name:"Greece",code:"GR"},{name:"India",code:"IN"},{name:"Indonesia",code:"ID"},{name:"Iran",code:"IR"},{name:"Ireland",code:"IE"},{name:"Israel",code:"IL"},{name:"Japan",code:"JP"},{name:"Luxembourg",code:"LU"},{name:"Malaysia",code:"MY"},{name:"Maldives",code:"MV"},{name:"Mexico",code:"MX"},{name:"Netherlands",code:"NL"},{name:"Nigeria",code:"NG"},{name:"Poland",code:"PL"},{name:"Portugal",code:"PT"},{name:"Singapore",code:"SG"},{name:"Spain",code:"ES"},{name:"Sri Lanka",code:"LK"},{name:"Sweden",code:"SE"},{name:"Switzerland",code:"CH"},{name:"Thailand",code:"TH"},{name:"Turkey",code:"TR"},{name:"Viet Nam",code:"VN"}],g=[{name:"Germany",code:"DE"},{name:"United Kingdom",code:"GB"},{name:"United States",code:"US"},{name:"Italy",code:"IT"},{name:"Canada",code:"CA"}],E={latestGlobalData:null,historicData:{},sourceCountries:[].concat(v),selectedCountries:[].concat(g),daysToShow:7,showCharts:!0},y=Object(m.b)({name:"corona",initialState:E,reducers:{fetchLatestGlobalSuccess:function(e,t){e.latestGlobalData=t.payload},fetchCountryHistoricDataSuccess:function(e,t){var a=t.payload,n=a.countrycode.iso2,r=a.timeseries;r=r.map((function(e){return Object(d.a)({},e,{acute:e.confirmed-e.recovered-e.deaths,fatality:e.confirmed>0?e.deaths/e.confirmed:NaN})}));for(var o=1;o<r.length;o++){var c=r[o-1],i=r[o];r[o]=Object(d.a)({},r[o],{acuteDelta:c.acute-i.acute,confirmedDelta:c.confirmed-i.confirmed,deathsDelta:c.deaths-i.deaths,recoveredDelta:c.recovered-i.recovered})}for(var l=0;l<r.length;l++){var s=r[l].confirmed/2;if(0===s)break;for(var u=l+1;u<r.length&&r[u].confirmed>s;)u+=1;u<r.length?r[l].doublingtime=u-l:r[l].doublingtime=0}a.timeseries=r,e.historicData[n]=a},setShowChartsSuccess:function(e,t){e.showCharts=t.payload},setCountriesSuccess:function(e,t){e.sourceCountries=t.payload.source,e.selectedCountries=t.payload.target}}}),C=y.actions,w=C.fetchLatestGlobalSuccess,S=C.fetchCountryHistoricDataSuccess,O=C.setCountriesSuccess,N=C.setShowChartsSuccess,j=function(e,t){return function(){var a=Object(u.a)(s.a.mark((function a(n){return s.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:localStorage.setItem("sourceCountries",JSON.stringify(e)),localStorage.setItem("selectedCountries",JSON.stringify(t)),n(O({source:e,target:t}));case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()},D=function(e){return function(){var t=Object(u.a)(s.a.mark((function t(a,n){var r,o,c,i,l;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f.a.get("https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/timeseries?iso2=".concat(e.toUpperCase(),"&onlyCountries=true"));case 3:o=t.sent,c=o.data[0],i=c.timeseries,l=Object.keys(i).map((function(e){var t=h.a(e,"MM/dd/yy",new Date),a=b.a(t,{representation:"date"});return Object(d.a)({date:a},i[e])})).sort((function(e,t){return t.date.localeCompare(e.date)})),r=Object(d.a)({},c,{timeseries:l}),t.next=14;break;case 10:return t.prev=10,t.t0=t.catch(0),console.log("error:",t.t0),t.abrupt("return");case 14:a(S(r));case 15:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e,a){return t.apply(this,arguments)}}()},k=y.reducer,_=a(20),I=a(5),x=a.n(I),G=a(16),A=a(12),T=a.n(A),L=a(114),M=a(112);var B=function(e){var t,a,n=e.percentage,o=void 0!==n&&n,c=e.positiveGood,i=void 0!==c&&c,l=e.value,s=e.withColor,u=void 0!==s&&s,d=e.withSign,m="";void 0!==d&&d&&l&&l>=0&&(m="+"),null==l?t="-":o?(a=l,t="".concat(Math.round(1e3*a)/10," %")):t=l.toLocaleString();var p=u&&(i&&"+"===m||!i&&""===m),f=u&&(i&&""===m||!i&&"+"===m);return r.a.createElement("span",{className:x()({good:p,bad:f})},m,t)},H=function(e){var t=e.countrycode,a=e.label,o=e.name,c=e.value,l=Object(n.useState)([]),s=Object(_.a)(l,2),u=s[0],d=s[1],m=Object(i.c)((function(e){return e.corona.historicData&&e.corona.historicData[t]})),p=Object(i.c)((function(e){return e.corona})).daysToShow;Object(n.useEffect)((function(){if(null!=m&&null!=o){for(var e=new Array(7),t=1;t<p;t++)e.push({date:m.timeseries[t].date,value:m.timeseries[t][o],delta:m.timeseries[t][o+"Delta"]});d(e)}}),[m,o]);var f=null;return c?f=c:m&&o&&m.timeseries[0][o]&&(f=m.timeseries[0][o]),r.a.createElement("div",{className:"p-col-6 p-md-3 p-lg-2"},r.a.createElement(G.Card,{className:"card"},r.a.createElement("div",{className:T.a.label},a),r.a.createElement("div",{className:T.a.number},r.a.createElement(B,{value:f})),u.map((function(e){return r.a.createElement("div",{key:e.date,className:"p-grid"},r.a.createElement("div",{className:x()("p-col-5",T.a.right)},r.a.createElement(B,{value:e.delta,withSign:!0,withColor:!0,positiveGood:"recovered"===o})),r.a.createElement("div",{className:x()("p-col-7",T.a.right)},r.a.createElement(B,{value:e.value})))}))))},R=function(e){var t=e.countrycode,a=e.percentage,o=void 0!==a&&a,c=e.label,l=e.name,s=e.suffix,u=(e.value,Object(n.useState)([])),d=Object(_.a)(u,2),m=d[0],p=d[1],f=Object(i.c)((function(e){return e.corona})).daysToShow,h=Object(i.c)((function(e){return e.corona.historicData&&e.corona.historicData[t]}));Object(n.useEffect)((function(){if(null!=h&&null!=l){for(var e=new Array(7),t=1;t<f;t++)e.push({date:h.timeseries[t].date,value:h.timeseries[t][l]});p(e)}}),[h]);var b=NaN;return h&&(b=h.timeseries[0][l]),r.a.createElement("div",{className:"p-col"},r.a.createElement(G.Card,{className:"card"},r.a.createElement("div",{className:T.a.label},c),r.a.createElement("div",{className:T.a.number},r.a.createElement(B,{value:b,percentage:o})," ",s),m.map((function(e){return r.a.createElement("div",{key:e.date,className:"p-grid p-justify-center"},r.a.createElement("div",{className:x()("p-col",T.a.right)},r.a.createElement(B,{value:e.value,percentage:o})," ",s))}))))},J=function(e){var t=e.countrycode,a=Object(i.b)();return Object(n.useEffect)((function(){a(D(t))}),[]),r.a.createElement("div",{className:""},r.a.createElement("div",{className:"p-grid"},r.a.createElement(H,{countrycode:t,name:"acute",label:"Acute"}),r.a.createElement(H,{countrycode:t,name:"confirmed",label:"Confirmed"}),r.a.createElement(H,{countrycode:t,name:"recovered",label:"Recovered"}),r.a.createElement(H,{countrycode:t,name:"deaths",label:"Deaths"}),r.a.createElement(R,{countrycode:t,name:"fatality",label:"Fatality Rate",percentage:!0}),r.a.createElement(R,{countrycode:t,label:"Doubling Time",name:"doublingtime",suffix:"d"})))},F=a(27),P=a.n(F),U=function(e){var t=e.label,a=e.name,n=e.value,o=e.percentage,c=Object(i.c)((function(e){return e.corona.latestGlobalData})),l=n||null!=c&&null!=a&&c[a]||null;return r.a.createElement("div",{className:"p-col"},r.a.createElement(G.Card,{className:"card"},r.a.createElement("div",{className:T.a.label},t),r.a.createElement("div",{className:T.a.number},r.a.createElement(B,{value:l,percentage:o}))))},W=function(){var e=Object(i.c)((function(e){return e.corona.latestGlobalData}));return r.a.createElement("div",{className:"ui container"},r.a.createElement("h2",{className:P.a.countryHeader},"World-Wide"),r.a.createElement("div",{className:"p-grid"},r.a.createElement(U,{label:"Confirmed",name:"confirmed"}),r.a.createElement(U,{label:"Recovered",name:"recovered"}),r.a.createElement(U,{label:"Deaths",name:"deaths"}),r.a.createElement(U,{label:"Fatality Rate",value:e&&e.deaths/e.confirmed||null,percentage:!0})))},z=a(36),V=a(54),K=a(55),q=a(56),Y=a(57),Q=function(){var e=Object(i.c)((function(e){return e.corona})),t=e.selectedCountries,a=e.sourceCountries,n=Object(i.b)(),o=window.innerWidth<600?{width:"100px"}:{};return r.a.createElement(Y.PickList,{source:a,target:t,itemTemplate:function(e){return r.a.createElement("div",{key:e.code},e.name)},sourceHeader:"Available",targetHeader:"Seleced",responsive:window.innerWidth>600,onChange:function(e){n(j(e.source,e.target))},className:"countryPickList",sourceStyle:Object(d.a)({height:"100%"},o),targetStyle:Object(d.a)({height:"100%"},o)})},X=a(24),Z=a.n(X),$=function(){var e=Object(n.useState)(!1),t=Object(_.a)(e,2),a=t[0],o=t[1],c=Object(i.b)(),l=Object(i.c)((function(e){return e.corona})),d=l.selectedCountries,m=l.showCharts;return r.a.createElement(r.a.Fragment,null,r.a.createElement(V.Dialog,{header:"Choose the countries to display",visible:a,modal:!0,onHide:function(){return o(!1)},className:Z.a.dialog,contentStyle:{height:"80vh"}},r.a.createElement(Q,null)),r.a.createElement(q.Toolbar,{className:Z.a.toolbar},r.a.createElement(K.ToggleButton,{onLabel:"Show Charts",offLabel:"No Charts",onIcon:"pi pi-check",offIcon:"pi pi-times",checked:m,onChange:function(){return c(function(e){return function(){var t=Object(u.a)(s.a.mark((function t(a){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:localStorage.setItem("showCharts",JSON.stringify(e)),a(N(e));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}(!m))},className:x()(Z.a.toggleButton,"p-button-raised p-button-rounded")}),r.a.createElement(z.Button,{label:"Reload Data",icon:"pi pi-replay",className:x()(Z.a.button,"p-button-raised p-button-rounded p-button-success"),tooltip:"Reload current data from server",onClick:function(){d.forEach((function(e){c(D(e.code))}))},tooltipOptions:{position:"bottom"}}),r.a.createElement(z.Button,{label:"Countries",icon:"pi pi-globe",className:x()(Z.a.button,"p-button-raised p-button-rounded"),tooltip:"Select Countries",tooltipOptions:{position:"bottom"},onClick:function(){return o(!0)}}),r.a.createElement(z.Button,{label:"Reset",icon:"pi pi-times",className:x()(Z.a.button,"p-button-raised p-button-rounded p-button-warning"),tooltip:"Reset country list to defaults",onClick:function(){return c(function(){var e=Object(u.a)(s.a.mark((function e(t){var a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=[].concat(v),n=[].concat(g),t(j(a,n));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},tooltipOptions:{position:"bottom"}})))},ee=a(58),te=a(60),ae=function(e){var t=e.countrycode,a=Object(n.useState)(null),o=Object(_.a)(a,2),c=o[0],l=o[1],s=Object(i.c)((function(e){return e.corona.historicData[t]}));return Object(n.useEffect)((function(){if(null!=s&&null!=s.timeseries){var e=s.timeseries.slice(0,60).reverse(),t={labels:e.map((function(e){return Object(te.a)(Object(h.a)(e.date,"yyyy-MM-dd",new Date),"dd-MM")})),datasets:[{label:"Acute",borderColor:"#FFCB05",backgroundColor:"#FFCB05",data:e.map((function(e){return e.acute})),fill:!1},{label:"Confirmed",backgroundColor:"#005A9C",borderColor:"#005A9C",data:e.map((function(e){return e.confirmed})),fill:!1},{label:"Recovered",backgroundColor:"#34A835",borderColor:"#34A835",data:e.map((function(e){return e.recovered})),fill:!1},{label:"Deaths",backgroundColor:"#000",borderColor:"#000",data:e.map((function(e){return e.deaths})),fill:!1}]};l(t)}}),[s]),null==c?null:r.a.createElement(G.Card,{style:{marginBottom:"8px"}},r.a.createElement(ee.Chart,{type:"line",data:c,height:window.innerWidth<600?"300":""}))},ne=a(59),re=a.n(ne),oe=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e.corona})),a=t.historicData,o=t.selectedCountries,c=t.showCharts;return Object(n.useEffect)((function(){e(function(){var e=Object(u.a)(s.a.mark((function e(t){var a,n,r,o,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(a=localStorage.getItem("sourceCountries"))&&(n=localStorage.getItem("selectedCountries"),r=JSON.parse(a),o=JSON.parse(n),c=JSON.parse(localStorage.getItem("showCharts")),t(O({source:r,target:o})),t(N(c)));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),e(function(){var e=Object(u.a)(s.a.mark((function e(t){var a,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f.a.get("https://wuhan-coronavirus-api.laeyoung.endpoint.ainize.ai/jhu-edu/brief");case 3:n=e.sent,a=n.data,e.next=11;break;case 7:return e.prev=7,e.t0=e.catch(0),console.log("error:",e.t0),e.abrupt("return");case 11:t(w(a));case 12:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}())}),[]),r.a.createElement("div",{className:P.a.rootContainer},r.a.createElement("h1",null,window.innerWidth>600&&r.a.createElement("img",{src:re.a,alt:"icon",width:48,style:{position:"relative",bottom:"-12px",marginRight:"24px"}}),"Mr K.'s Corona Dashboard"),r.a.createElement($,null),r.a.createElement(W,null),o.map((function(e){var t;return r.a.createElement("div",{key:e.code},r.a.createElement("div",{className:"p-grid"},r.a.createElement("h2",{className:x()("p-col",P.a.countryHeader)},e.name),r.a.createElement("h3",{className:x()("p-col",P.a.countryHeader,"right")},function(e){if(null==e)return"-";var t=Object(L.a)(Object(M.a)(e),new Date);return t.charAt(0).toLocaleUpperCase()+t.slice(1)}(null===(t=a[e.code])||void 0===t?void 0:t.lastupdate))),c&&r.a.createElement(ae,{countrycode:e.code}),r.a.createElement(J,{countrycode:e.code}))})),r.a.createElement(G.Card,{className:"footer"},r.a.createElement("p",null,"Data is from John-Hopkins-University, updated once per day:"," ",r.a.createElement("a",{href:"https://github.com/CSSEGISandData/COVID-19"},"https://github.com/CSSEGISandData/COVID-19")),r.a.createElement("p",null,"Inspired by Inje Lee's article."," ",r.a.createElement("a",{href:"https://itnext.io/develop-the-corona-dashboard-in-a-day-b5f1be41fe33"},"https://itnext.io/develop-the-corona-dashboard-in-a-day-b5f1be41fe33")),r.a.createElement("p",null,"Thanks to Ainize for providing the data API:"," ",r.a.createElement("a",{href:"https://ainize.ai/laeyoung/wuhan-coronavirus-api"},"https://ainize.ai/laeyoung/wuhan-coronavirus-api")),r.a.createElement("p",null,"Thanks to ",r.a.createElement("a",{href:"https://www.iconfinder.com/justicon"},"Just Icon")," ","for the beautiful"," ",r.a.createElement("a",{href:"https://www.iconfinder.com/icons/5929243/antivirus_bacteria_cell_coronavirus_infection_malware_virus_icon"},"Corona icon"),".")))};var ce=function(){return r.a.createElement(oe,null)},ie=Object(m.a)({reducer:{corona:k}});a(108),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,{store:ie},r.a.createElement(ce,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},12:function(e,t,a){e.exports={number:"NumberCard_number__1rkk8",left:"NumberCard_left__1bkGy",right:"NumberCard_right__teMx2"}},24:function(e,t,a){e.exports={dialog:"Settings_dialog__3_Y1h",dialogContent:"Settings_dialogContent__iaoEq",button:"Settings_button__yl7or",toggleButton:"Settings_toggleButton__jnQJG"}},27:function(e,t,a){e.exports={rootContainer:"Dashboard_rootContainer__1HTOq",countryHeader:"Dashboard_countryHeader__1-bBB"}},59:function(e,t,a){e.exports=a.p+"static/media/icon.2b385a90.svg"},62:function(e,t,a){e.exports=a(109)}},[[62,1,2]]]);
//# sourceMappingURL=main.b08347cd.chunk.js.map