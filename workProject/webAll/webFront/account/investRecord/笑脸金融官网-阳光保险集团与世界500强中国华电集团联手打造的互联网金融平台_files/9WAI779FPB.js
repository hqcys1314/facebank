
"object"!==typeof JSON2&&(JSON2=window.JSON||{});
(function(){function c(c){return 10>c?"0"+c:c}function C(c){K.lastIndex=0;return K.test(c)?'"'+c.replace(K,function(c){var e=A[c];return"string"===typeof e?e:"\\u"+("0000"+c.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+c+'"'}function D(x,z){var e,m,r,E,q=p,n,k=z[x];k&&"object"===typeof k&&(e=k,r=Object.prototype.toString.apply(e),k="[object Date]"===r?isFinite(e.valueOf())?e.getUTCFullYear()+"-"+c(e.getUTCMonth()+1)+"-"+c(e.getUTCDate())+"T"+c(e.getUTCHours())+":"+c(e.getUTCMinutes())+":"+c(e.getUTCSeconds())+
"Z":null:"[object String]"===r||"[object Number]"===r||"[object Boolean]"===r?e.valueOf():"[object Array]"!==r&&"function"===typeof e.toJSON?e.toJSON(x):e);"function"===typeof t&&(k=t.call(z,x,k));switch(typeof k){case "string":return C(k);case "number":return isFinite(k)?String(k):"null";case "boolean":case "null":return String(k);case "object":if(!k)return"null";p+=G;n=[];if("[object Array]"===Object.prototype.toString.apply(k)){E=k.length;for(e=0;e<E;e+=1)n[e]=D(e,k)||"null";r=0===n.length?"[]":
p?"[\n"+p+n.join(",\n"+p)+"\n"+q+"]":"["+n.join(",")+"]";p=q;return r}if(t&&"object"===typeof t)for(E=t.length,e=0;e<E;e+=1)"string"===typeof t[e]&&(m=t[e],(r=D(m,k))&&n.push(C(m)+(p?": ":":")+r));else for(m in k)Object.prototype.hasOwnProperty.call(k,m)&&(r=D(m,k))&&n.push(C(m)+(p?": ":":")+r);r=0===n.length?"{}":p?"{\n"+p+n.join(",\n"+p)+"\n"+q+"}":"{"+n.join(",")+"}";p=q;return r}}var y=RegExp("[\x00­؀-؄܏឴឵‌-‏\u2028- ⁠-⁯﻿￰-￿]","g"),K=RegExp('[\\\\\\"\x00--­؀-؄܏឴឵‌-‏\u2028- ⁠-⁯﻿￰-￿]',"g"),p,
G,A={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},t;"function"!==typeof JSON2.stringify&&(JSON2.stringify=function(c,z,e){var m;G=p="";if("number"===typeof e)for(m=0;m<e;m+=1)G+=" ";else"string"===typeof e&&(G=e);if((t=z)&&"function"!==typeof z&&("object"!==typeof z||"number"!==typeof z.length))throw Error("JSON2.stringify");return D("",{"":c})});"function"!==typeof JSON2.parse&&(JSON2.parse=function(c,p){function e(c,m){var q,n,k=c[m];if(k&&"object"===typeof k)for(q in k)Object.prototype.hasOwnProperty.call(k,
q)&&(n=e(k,q),void 0!==n?k[q]=n:delete k[q]);return p.call(c,m,k)}var m;c=String(c);y.lastIndex=0;y.test(c)&&(c=c.replace(y,function(c){return"\\u"+("0000"+c.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(c.replace(RegExp('\\\\(?:["\\\\/bfnrt]|u[0-9a-fA-F]{4})',"g"),"@").replace(RegExp('"[^"\\\\\n\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?',"g"),"]").replace(RegExp("(?:^|:|,)(?:\\s*\\[)+","g"),"")))return m=eval("("+c+")"),"function"===typeof p?e({"":m},""):m;throw new SyntaxError("JSON2.parse");
})})();"object"!==typeof _fd&&(_fd=[]);
(function(c,C,D){function y(){var a,b,d;for(a=0;a<arguments.length;a+=1)d=arguments[a],b=d.shift(),"string"===typeof b||b instanceof String?asyncTracker[b].apply(asyncTracker,d):b.apply(asyncTracker,d)}function K(a){var b=new Image,d="ab_log_"+Math.round(2147483647*Math.random()).toString(36);c[d]=b;b.onload=b.onerror=b.onabort=function(){b.onload=b.onerror=b.onabort=null;b=c[d]=null};b.src=a}function p(){var a,b,d;if((d=(d=c.navigator)?d.plugins:null)&&d.length)for(var w=0;w<d.length&&!b;w++){var e=
d[w];-1<e.name.indexOf("Shockwave Flash")&&(b=e.description)}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),b=a.GetVariable("$version")}catch(f){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),b="WIN 6,0,21,0",a.D="always",b=a.GetVariable("$version")}catch(f){}if(!b)try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),b=a.GetVariable("$version")}catch(f){}b&&(a=b.match(/[\d]+/g))&&2<=a.length&&(b=a[0]+"."+a[1]);return b||void 0}function G(){for(var a=c.navigator,
a=a.appName+a.version+a.platform+a.userAgent+(g.cookie?g.cookie:"")+(g.referrer?g.referrer:""),b=a.length,d=c.history.length;0<d;)a+=d--^b++;var b=1,d=0,w;if(a)for(b=0,w=a.length-1;0<=w;w--)d=a.charCodeAt(w),b=(b<<6&268435455)+d+(d<<14),d=b&266338304,0!=d&&(b^=d>>21);return[Math.round(2147483647*Math.random())^b&2147483647,Math.round((new Date).getTime())].join("")}function A(a,b){if(a&&a.getAttribute)return a.getAttribute(b);if(!a||!a.attributes||"undefined"===typeof a.attributes[b])return D;if(a.attributes[b].value)return a.attributes[b].value;
if(a.attributes[b].nodeValue)return a.attributes[b].nodeValue;var d,c=a.attributes;if(!c)return D;for(d=0;d<c.length;d++)if(c[d].nodeName===b)return c[d].nodeValue;return D}function t(a){return a&&"object"===typeof a&&a.length&&"number"===typeof a.length}function x(a){return null!==a&&"undefined"!==typeof a}function z(a){for(var b in a)return!1;return!0}function e(){for(var a,b,d,c,f,g=arguments[0]||{},k=arguments.length,l=1;l<k;l++)if(null!=(f=arguments[l]))for(c in f)a=g[c],d=f[c],g!==d&&(d&&(u.j(d)||
(b=t(d)))?(b?(b=!1,a=a&&t(a)?a:[]):a=a&&u.j(a)?a:{},g[c]=e(a,d)):d!==D&&(g[c]=d));return g}function m(a){return a&&"function"===typeof a?m(a()):"object"===typeof a||t(a)?JSON2.stringify(a):x(a)?String(a):""}function r(a,b){var d,c=0,e=a.length;if(t(a))for(;c<e&&(d=b.call(a[c],c,a[c]),!1!==d);c++);else for(c in a)if(d=b.call(a[c],c,a[c]),!1===d)break}function E(a,b,c,e){a.attachEvent?a.attachEvent("on"+b,function(b){c.call(a,b)}):a.addEventListener&&a.addEventListener(b,c,!!e)}var q=Object.prototype,
n=q.toString,k=q.hasOwnProperty,J=c.performance||c.N||c.O||c.X,g=c.document,q=g.all&&c.XMLHttpRequest&&!g.querySelector,U=g.all&&g.querySelector&&!g.addEventListener,V=g.all&&g.addEventListener&&!c.atob,P=g.all&&g.compatMode&&!c.XMLHttpRequest||q||U||V,f={a:{"autoEvent":true,"noWeblog":false,"autoevent2app":false,"cmpKws":["fd_kwd","utm_term"],"cmpParams":["fd_campaign","_from","_ref","utm_campaign","utm_source","utm_medium","qq-pf-to"],"domain":"facebank.cn","host_alias":["facebank.net.cn"],"log_host":"collect.facebank.cn","log_path":{"event":"/log/v2/9WAI779FPB/event"},"max_delay":300,"performanceTracking":true,"session_timeout":1800,"app_key":"9WAI779FPB","site_id":"9WAI779FPB","https":true}};f.a.host_alias.push(g.domain);f.waitUntil=0;f.b=function(){function a(){if(!e){e=!0;for(var a=0;a<f.length;a++)f[a]()}}function b(){g.addEventListener?(g.removeEventListener("DOMContentLoaded",d,!1),c.removeEventListener("load",d,!1)):(g.detachEvent("onreadystatechange",d),c.detachEvent("onload",d))}function d(){if(g.addEventListener||"load"===event.type||"complete"===g.readyState)b(),a()}var e=!1,f=[];if("complete"===g.readyState)setTimeout(a);else if(g.addEventListener)g.addEventListener("DOMContentLoaded",
d,!1),c.addEventListener("load",d,!1);else{g.attachEvent("onreadystatechange",d);c.attachEvent("onload",d);var k=!1;try{k=null==c.frameElement&&g.documentElement}catch(m){}k&&k.doScroll&&function l(){if(!e){try{k.doScroll("left")}catch(c){return setTimeout(l,50)}b();a()}}()}return function(a){e?a():f.push(a)}}();E(c,"beforeunload",function(){var a;if(f.waitUntil){do a=new Date;while(a.getTime()<f.waitUntil)}},!1);asyncTracker=new function(){function a(h,a,W){var c={},b={},d;for(d in h)a.hasOwnProperty(d)?
c[a[d]]=h[d]:b[d]=h[d];z(b)||(c[W]=b);return c}function b(h,a){for(var c=a||{},b=g.getElementsByTagName("Meta"),d=0;d<b.length;d+=1){var e=b[d],f=A(e,"name");f&&0==f.indexOf(h+"-")&&(c[f.substring(h.length+1)]=A(e,"content"))}return c}function d(h){return"_fd_"+h+"."+f.a.site_id}function k(h){h=h.tagName.toUpperCase();return"INPUT"===h||"SELECT"===h||"TEXTAREA"===h}function n(h){if(!1!==v.l&&(h=h.target||h.srcElement)){var a=q(h),c=a.category;!a.category&&x(h.form)&&(c="/form/"+(h.form.id||h.form.name));
if(x(c)&&k(h)){var b=h.value||"",d=a.action||h.name||h.id||"",a=e({len:b.length},a.evar);"password"!==A(h,"type")&&"@off"!==a.v&&(a.v=b);L(c,d,a)}}}function q(h){for(var a=0,c={};h&&h!==g&&h.parentNode;){if(!c.action&&A(h,"data-event")||k(h)){c.el=h;c.action=A(h,"data-event")||D;var b;if(h&&h.attributes){b=void 0;var d=h.attributes,f={};for(b=0;b<d.length;b++){var m=d[b],l=m.nodeName||m.name;0==l.indexOf("data-event-")&&(f[l.substring(11)]=m.nodeValue||m.value)}b=f}else b={};d=b;f={};for(name in d)"category"!==
name&&(f[name]=d[name]);c.evar=e(c.evar,f);if(b.category){c.category=b.category;break}}if(!c.category&&A(h,"data-event-category")){c.category=A(h,"data-event-category");break}h=h.parentNode;if(100<a)break;a++}return c}function t(h){var a,c,b;for(a=0;a<f.a.host_alias.length;a++){c=f.a.host_alias[a].toLowerCase();if(h===c)return!0;if("."===c.slice(0,1)){if(h===c.slice(1))return!0;b=h.length-c.length;if(0<b&&h.slice(b)===c)return!0}}return!1}function l(h,a,b,d,e){var f;b&&(f=new Date,f.setTime(f.getTime()+
b));"auto"==e&&(e=c.location.hostname);g.cookie=h+"\x3d"+c.encodeURIComponent(a)+(b?";expires\x3d"+f.toGMTString():"")+";path\x3d"+(d||"/")+(e?";domain\x3d"+e:"")+""}function y(h){return(h=(new RegExp("(^|;)[ ]*"+h+"\x3d([^;]*)")).exec(g.cookie))?c.decodeURIComponent(h[2]):0}function C(){var h;h=Math.round((new Date).getTime()/1E3);var a=y(d("id"));a?(h=a.split("."),h.unshift("0")):h=["1",G(),h,0,h,"",""];return{P:h[0],f:h[1],o:h[2],g:h[3],w:h[4],c:h[5],B:h[6]}}function Q(a){var c=Math.round((new Date).getTime()/
1E3);x(a)||(a=C());l(d("id"),a.f+"."+a.o+"."+a.g+"."+c+"."+a.c+"."+a.B,339552E5,f.a.cookie_path,f.a.domain)}function R(a){return(a=/^([a-z]+):/.exec(a))?a[1]:null}function S(a){var c=/^(?:(?:https?|ftp):)\/*(?:[^@]+@)?([^:/#]+)/.exec(a);return c?c[1]:a}function M(a,b){var d=(new RegExp("[\\?\x26#]"+b+"\x3d([^\x26#]*)")).exec(a);return d?c.decodeURIComponent(d[1]):""}function L(a,c,b){if(0!==String(a).length&&0!==String(c).length){"/"!=a.charAt(0)&&(a="/"+a);b=e({},b);var d,k={_ecat:a,_eact:c,evar:b},
g,w=[];b={};var l=v.A||{};for(d in l)g=m(l[d]),g.length&&w.push(d+"\x3d"+encodeURIComponent(g));for(d in H)g=m(H[d]),!g.length||k&&k.hasOwnProperty(d)||w.push(d+"\x3d"+encodeURIComponent(g));for(g=0;g<F.length;g+=1)e(b,F[g]());b.hasOwnProperty("evar")&&(k.evar=e(b.evar,k.evar||{}));k&&e(b,k);for(d in b)g=m(b[d]),g.length&&w.push(d+"\x3d"+encodeURIComponent(g));d=u.u(w.join("\x26"));d={evar:b.evar,params:"data\x3d"+d+"\x26_r\x3d"+1*new Date};if(!0!==f.a.noWeblog){b=(1==f.a.https?"https":"http")+"://"+
f.a.log_host+f.a.log_path.event+"?"+d.params;var n;n=n||f.a.max_delay;n=(new Date).getTime()+n;n>f.waitUntil&&(f.waitUntil=n);K(b)}!0===f.a.autoevent2app&&T(a,c,d.evar)}}function T(a,b,d){var e=c.FiredataAPP;e&&e.event(a,b,JSON.stringify(d||{}))}var I=c.navigator,B=c.screen,N=new Date,O=24+N.getHours()-N.getUTCHours(),H={width:B&&B.width,height:B&&B.height,ts:N.getTime(),timezone:0<O?"+"+O:""+O,sdk_version:"2.0",cl:B&&B.colorDepth,vp:function(){var a=g.body,b=a&&a.clientWidth&&a.clientHeight,c=[];
B&&B.clientWidth&&B.clientHeight&&("CSS1Compat"===g.compatMode||!b)?c=[B.clientWidth,B.clientHeight]:b&&(c=[a.clientWidth,a.clientHeight]);return 0>=c[0]||0>=c[1]?"":c.join("x")},dr:g.referrer,dt:g.title,fl:p(),st:c.sessionStorage?"1":"0",ck:I&&I.cookieEnabled?"1":"0",ln:I&&(I.language||I.browserLanguage||I.T||I.W||"").toLowerCase(),pvid:G()},F=[];F.push(function(){var a=Math.round((new Date).getTime()/1E3),b=C();if(!b.c||a-b.c>f.a.session_timeout)b.g++,b.c=b.w;Q(b);return{guid:b.f,guidts:b.o,guidvc:b.g,
guidlvts:b.c,sessionid:b.f+b.g}});F.push(function(){var a;a:{var b=y(d("ref"));if(b.length&&(b=JSON2.parse(b),"object"===typeof b)){a=b;break a}a=["","",0,""]}var e=c.location.href,g,k,b=a[0];g=a[1];a=a[3];for(i in v.i)if(Object.prototype.hasOwnProperty.call(v.i,i)&&(k=M(e,v.i[i]),k.length)){b=k;break}for(i in v.h)if(Object.prototype.hasOwnProperty.call(v.h,i)&&(k=M(e,v.h[i]),k.length)){g=k;break}e=S(H.dr);e.length&&!t(e)&&(a=H.dr);return a.length||b.length?(e=Math.round((new Date).getTime()/1E3),
a=[b,g,e,a.slice(0,1024)],l(d("ref"),JSON2.stringify(a),15768E6,f.a.cookie_path,f.a.domain),{_ref:a[3],_refcn:b,_refcv:g,_refts:e}):{}});F.push(function(){var a=b("page");return x(a.name)?{pname:a.name}:x(v.s)?{pname:v.s}:{}});F.push(function(){var c;a:{c=y(d("u"));if(c.length&&(c=JSON2.parse(c),"object"===typeof c))break a;c={}}c=b("user",c);return a(c,{id:"uid"},"uvar")});F.push(function(){return a(b("content",v.m),{id:"cid",channel:"cch"},"cvar")});F.push(function(){var a=y(d("evt")),b=NaN;a&&
(b=parseInt(a));isNaN(b)&&(b=0);l(d("evt"),b+1+"",339552E5,f.a.cookie_path,f.a.domain);return{no:b}});F.push(function(){return a(b("event"),{},"evar")});var v={i:"fd_campaign _from _ref utm_campaign utm_source utm_medium qq-pf-to".split(" "),h:["fd_kwd","utm_term"],m:{},F:{},l:!0};Q();(function(){f.b(function(){E(c.document,"click",function(a){if(1==v.l){var b=a.target||a.srcElement,c=b.tagName.toUpperCase();if("INPUT"===c&&"button"===A(b,"type")||"BUTTON"===c)n(a);else if(k(b))!b._fd&&P&&E(b,"change",
n);else if((a=q(b))&&!z(a)){c=a.evar||{};if(a.el&&"A"===a.el.tagName.toUpperCase()){var d=A(a.el,"href");d&&(c.link=c.link||d);c.text=c.text||b.textContent||b.innerText}L(a.category,a.action,c)}}})})})();(function(){f.b(function(){P?r(["input","select","textarea"],function(){r(g.getElementsByTagName(this),function(){this._fd=!0;E(this,"change",n)})}):E(g,"change",n)})})();(function(){f.b(function(){var a=c.location.href,b=M(a,"__ec"),a=M(a,"__ea");b&&a&&L(b,a)})})();return{getGuid:function(){return C().f},
setUserInfo:function(a){!x(a)||z(a)?l(d("u"),"",-86400,f.a.cookie_path,f.a.domain):l(d("u"),JSON2.stringify(a),339552E5,f.a.cookie_path,f.a.domain)},setContentInfo:function(a){v.m=a||{}},R:function(a){H.dr=a},S:function(a){var b=c.location.href,d;R(a)||("/"===a.slice(0,1)?a=R(b)+"://"+S(b)+a:(d=b.indexOf("?"),0<=d&&(b=b.slice(0,d)),d=b.lastIndexOf("/"),d!==b.length-1&&(b=b.slice(0,d+1)),a=b+a));H.url=a},setDocumentTitle:function(a){H.dt=a},U:function(a,b,c){trackCallback(function(){logGoal(a,b,c)})},
V:function(a,b,c,d){trackCallback(function(){logLink(a,b,c,d)})},pageView:function(a,b){f.b(function(){var c=b;x(a)&&(v.s=a);c=c||{};!0===f.a.performanceTracking&&J&&J.timing&&J.timing.requestStart&&J.timing.responseEnd&&(c.perf=J.timing.responseEnd-J.timing.requestStart);L("/pv","pvStart",c)})},setParams:function(a){v.A=a||{}},event:function(a,b,c){f.b(function(){L(a,b,c)})},event2app:function(a,b,c){f.b(function(){T(a,b,c)})},autoEvent2app:function(a){f.a.autoevent2app=a}}};_fd=function(a,b){var c,
e;for(c=0;c<b.length;c++){var f=b[c];for(e=0;e<a.length;e++)a[e]&&a[e][0]&&f===a[e][0]&&(y(a[e]),delete a[e])}return a}(_fd,["setUserInfo","setContentInfo"]);for(iterator=0;iterator<_fd.length;iterator++)_fd[iterator]&&y(_fd[iterator]);_fd.push=y;var u={j:function(a){return a===Object(a)&&!u.isArray(a)},K:function(a){var b=typeof a;return"function"===b||"object"===b&&!!a}};u.isArray=Array.prototype.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};u.I=function(a){if(u.j(a)){for(var b in a)if(k.call(a,
b))return!1;return!0}return!1};u.M=function(a){return void 0===a};u.L=function(a){return"[object String]"==n.call(a)};u.G=function(a){return"[object Date]"==n.call(a)};u.J=function(a){return"[object Number]"==n.call(a)};u.H=function(a){return!(!a||1!==a.nodeType)};u.u=function(a){var b,c,e,f,g=0,k=0,l="",l=[];if(!a)return a;a=u.C(a);do b=a.charCodeAt(g++),c=a.charCodeAt(g++),e=a.charCodeAt(g++),f=b<<16|c<<8|e,b=f>>18&63,c=f>>12&63,e=f>>6&63,f&=63,l[k++]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(b)+
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(c)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(e)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(f);while(g<a.length);l=l.join("");switch(a.length%3){case 1:l=l.slice(0,-2)+"\x3d\x3d";break;case 2:l=l.slice(0,-1)+"\x3d"}return l};u.C=function(a){a=(a+"").replace(/\r\n/g,"\n").replace(/\r/g,"\n");var b="",c,e,f=0,g;c=e=0;f=a.length;for(g=0;g<f;g++){var k=a.charCodeAt(g),
l=null;128>k?e++:l=127<k&&2048>k?String.fromCharCode(k>>6|192,k&63|128):String.fromCharCode(k>>12|224,k>>6&63|128,k&63|128);null!==l&&(e>c&&(b+=a.substring(c,e)),b+=l,c=e=g+1)}e>c&&(b+=a.substring(c,a.length));return b};c[C]=c[C]||f})(window,"FireData");