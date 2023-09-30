"use strict";var Ut=Object.create;var Ce=Object.defineProperty;var Dt=Object.getOwnPropertyDescriptor;var $t=Object.getOwnPropertyNames;var Ct=Object.getPrototypeOf,It=Object.prototype.hasOwnProperty;var _=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Nt=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of $t(t))!It.call(e,i)&&i!==r&&Ce(e,i,{get:()=>t[i],enumerable:!(n=Dt(t,i))||n.enumerable});return e};var Bt=(e,t,r)=>(r=e!=null?Ut(Ct(e)):{},Nt(t||!e||!e.__esModule?Ce(r,"default",{value:e,enumerable:!0}):r,e));var J=_(I=>{"use strict";Object.defineProperty(I,"__esModule",{value:!0});I.toCommandProperties=I.toCommandValue=void 0;function kt(e){return e==null?"":typeof e=="string"||e instanceof String?e:JSON.stringify(e)}I.toCommandValue=kt;function Lt(e){return Object.keys(e).length?{title:e.title,file:e.file,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}:{}}I.toCommandProperties=Lt});var ke=_(O=>{"use strict";var jt=O&&O.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Ft=O&&O.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Vt=O&&O.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&jt(t,e,r);return Ft(t,e),t};Object.defineProperty(O,"__esModule",{value:!0});O.issue=O.issueCommand=void 0;var Gt=Vt(require("os")),Ne=J();function Be(e,t,r){let n=new fe(e,t,r);process.stdout.write(n.toString()+Gt.EOL)}O.issueCommand=Be;function Jt(e,t=""){Be(e,{},t)}O.issue=Jt;var Ie="::",fe=class{constructor(t,r,n){t||(t="missing.command"),this.command=t,this.properties=r,this.message=n}toString(){let t=Ie+this.command;if(this.properties&&Object.keys(this.properties).length>0){t+=" ";let r=!0;for(let n in this.properties)if(this.properties.hasOwnProperty(n)){let i=this.properties[n];i&&(r?r=!1:t+=",",t+=`${n}=${zt(i)}`)}}return t+=`${Ie}${Kt(this.message)}`,t}};function Kt(e){return Ne.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function zt(e){return Ne.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}});var he=_(de=>{"use strict";Object.defineProperty(de,"__esModule",{value:!0});de.default=Ht;var Wt=Yt(require("crypto"));function Yt(e){return e&&e.__esModule?e:{default:e}}var z=new Uint8Array(256),K=z.length;function Ht(){return K>z.length-16&&(Wt.default.randomFillSync(z),K=0),z.slice(K,K+=16)}});var Le=_(W=>{"use strict";Object.defineProperty(W,"__esModule",{value:!0});W.default=void 0;var Qt=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;W.default=Qt});var V=_(Y=>{"use strict";Object.defineProperty(Y,"__esModule",{value:!0});Y.default=void 0;var Xt=Zt(Le());function Zt(e){return e&&e.__esModule?e:{default:e}}function er(e){return typeof e=="string"&&Xt.default.test(e)}var tr=er;Y.default=tr});var G=_(H=>{"use strict";Object.defineProperty(H,"__esModule",{value:!0});H.default=void 0;var rr=nr(V());function nr(e){return e&&e.__esModule?e:{default:e}}var m=[];for(let e=0;e<256;++e)m.push((e+256).toString(16).substr(1));function ir(e,t=0){let r=(m[e[t+0]]+m[e[t+1]]+m[e[t+2]]+m[e[t+3]]+"-"+m[e[t+4]]+m[e[t+5]]+"-"+m[e[t+6]]+m[e[t+7]]+"-"+m[e[t+8]]+m[e[t+9]]+"-"+m[e[t+10]]+m[e[t+11]]+m[e[t+12]]+m[e[t+13]]+m[e[t+14]]+m[e[t+15]]).toLowerCase();if(!(0,rr.default)(r))throw TypeError("Stringified UUID is invalid");return r}var sr=ir;H.default=sr});var Ve=_(Q=>{"use strict";Object.defineProperty(Q,"__esModule",{value:!0});Q.default=void 0;var or=Fe(he()),ur=Fe(G());function Fe(e){return e&&e.__esModule?e:{default:e}}var je,pe,_e=0,ve=0;function ar(e,t,r){let n=t&&r||0,i=t||new Array(16);e=e||{};let s=e.node||je,o=e.clockseq!==void 0?e.clockseq:pe;if(s==null||o==null){let h=e.random||(e.rng||or.default)();s==null&&(s=je=[h[0]|1,h[1],h[2],h[3],h[4],h[5]]),o==null&&(o=pe=(h[6]<<8|h[7])&16383)}let c=e.msecs!==void 0?e.msecs:Date.now(),l=e.nsecs!==void 0?e.nsecs:ve+1,u=c-_e+(l-ve)/1e4;if(u<0&&e.clockseq===void 0&&(o=o+1&16383),(u<0||c>_e)&&e.nsecs===void 0&&(l=0),l>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");_e=c,ve=l,pe=o,c+=122192928e5;let a=((c&268435455)*1e4+l)%4294967296;i[n++]=a>>>24&255,i[n++]=a>>>16&255,i[n++]=a>>>8&255,i[n++]=a&255;let d=c/4294967296*1e4&268435455;i[n++]=d>>>8&255,i[n++]=d&255,i[n++]=d>>>24&15|16,i[n++]=d>>>16&255,i[n++]=o>>>8|128,i[n++]=o&255;for(let h=0;h<6;++h)i[n+h]=s[h];return t||(0,ur.default)(i)}var cr=ar;Q.default=cr});var me=_(X=>{"use strict";Object.defineProperty(X,"__esModule",{value:!0});X.default=void 0;var lr=fr(V());function fr(e){return e&&e.__esModule?e:{default:e}}function dr(e){if(!(0,lr.default)(e))throw TypeError("Invalid UUID");let t,r=new Uint8Array(16);return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=t&255,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=t&255,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=t&255,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=t&255,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=t&255,r}var hr=dr;X.default=hr});var ge=_($=>{"use strict";Object.defineProperty($,"__esModule",{value:!0});$.default=mr;$.URL=$.DNS=void 0;var pr=Ge(G()),_r=Ge(me());function Ge(e){return e&&e.__esModule?e:{default:e}}function vr(e){e=unescape(encodeURIComponent(e));let t=[];for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r));return t}var Je="6ba7b810-9dad-11d1-80b4-00c04fd430c8";$.DNS=Je;var Ke="6ba7b811-9dad-11d1-80b4-00c04fd430c8";$.URL=Ke;function mr(e,t,r){function n(i,s,o,c){if(typeof i=="string"&&(i=vr(i)),typeof s=="string"&&(s=(0,_r.default)(s)),s.length!==16)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");let l=new Uint8Array(16+i.length);if(l.set(s),l.set(i,s.length),l=r(l),l[6]=l[6]&15|t,l[8]=l[8]&63|128,o){c=c||0;for(let u=0;u<16;++u)o[c+u]=l[u];return o}return(0,pr.default)(l)}try{n.name=e}catch{}return n.DNS=Je,n.URL=Ke,n}});var ze=_(Z=>{"use strict";Object.defineProperty(Z,"__esModule",{value:!0});Z.default=void 0;var gr=yr(require("crypto"));function yr(e){return e&&e.__esModule?e:{default:e}}function wr(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),gr.default.createHash("md5").update(e).digest()}var Or=wr;Z.default=Or});var Ye=_(ee=>{"use strict";Object.defineProperty(ee,"__esModule",{value:!0});ee.default=void 0;var Rr=We(ge()),Er=We(ze());function We(e){return e&&e.__esModule?e:{default:e}}var Pr=(0,Rr.default)("v3",48,Er.default),br=Pr;ee.default=br});var Qe=_(te=>{"use strict";Object.defineProperty(te,"__esModule",{value:!0});te.default=void 0;var qr=He(he()),Sr=He(G());function He(e){return e&&e.__esModule?e:{default:e}}function Tr(e,t,r){e=e||{};let n=e.random||(e.rng||qr.default)();if(n[6]=n[6]&15|64,n[8]=n[8]&63|128,t){r=r||0;for(let i=0;i<16;++i)t[r+i]=n[i];return t}return(0,Sr.default)(n)}var Ar=Tr;te.default=Ar});var Xe=_(re=>{"use strict";Object.defineProperty(re,"__esModule",{value:!0});re.default=void 0;var Mr=xr(require("crypto"));function xr(e){return e&&e.__esModule?e:{default:e}}function Ur(e){return Array.isArray(e)?e=Buffer.from(e):typeof e=="string"&&(e=Buffer.from(e,"utf8")),Mr.default.createHash("sha1").update(e).digest()}var Dr=Ur;re.default=Dr});var et=_(ne=>{"use strict";Object.defineProperty(ne,"__esModule",{value:!0});ne.default=void 0;var $r=Ze(ge()),Cr=Ze(Xe());function Ze(e){return e&&e.__esModule?e:{default:e}}var Ir=(0,$r.default)("v5",80,Cr.default),Nr=Ir;ne.default=Nr});var tt=_(ie=>{"use strict";Object.defineProperty(ie,"__esModule",{value:!0});ie.default=void 0;var Br="00000000-0000-0000-0000-000000000000";ie.default=Br});var rt=_(se=>{"use strict";Object.defineProperty(se,"__esModule",{value:!0});se.default=void 0;var kr=Lr(V());function Lr(e){return e&&e.__esModule?e:{default:e}}function jr(e){if(!(0,kr.default)(e))throw TypeError("Invalid UUID");return parseInt(e.substr(14,1),16)}var Fr=jr;se.default=Fr});var nt=_(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});Object.defineProperty(P,"v1",{enumerable:!0,get:function(){return Vr.default}});Object.defineProperty(P,"v3",{enumerable:!0,get:function(){return Gr.default}});Object.defineProperty(P,"v4",{enumerable:!0,get:function(){return Jr.default}});Object.defineProperty(P,"v5",{enumerable:!0,get:function(){return Kr.default}});Object.defineProperty(P,"NIL",{enumerable:!0,get:function(){return zr.default}});Object.defineProperty(P,"version",{enumerable:!0,get:function(){return Wr.default}});Object.defineProperty(P,"validate",{enumerable:!0,get:function(){return Yr.default}});Object.defineProperty(P,"stringify",{enumerable:!0,get:function(){return Hr.default}});Object.defineProperty(P,"parse",{enumerable:!0,get:function(){return Qr.default}});var Vr=T(Ve()),Gr=T(Ye()),Jr=T(Qe()),Kr=T(et()),zr=T(tt()),Wr=T(rt()),Yr=T(V()),Hr=T(G()),Qr=T(me());function T(e){return e&&e.__esModule?e:{default:e}}});var ut=_(R=>{"use strict";var Xr=R&&R.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Zr=R&&R.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),st=R&&R.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Xr(t,e,r);return Zr(t,e),t};Object.defineProperty(R,"__esModule",{value:!0});R.prepareKeyValueMessage=R.issueFileCommand=void 0;var it=st(require("fs")),ye=st(require("os")),en=nt(),ot=J();function tn(e,t){let r=process.env[`GITHUB_${e}`];if(!r)throw new Error(`Unable to find environment variable for file command ${e}`);if(!it.existsSync(r))throw new Error(`Missing file at path: ${r}`);it.appendFileSync(r,`${ot.toCommandValue(t)}${ye.EOL}`,{encoding:"utf8"})}R.issueFileCommand=tn;function rn(e,t){let r=`ghadelimiter_${en.v4()}`,n=ot.toCommandValue(t);if(e.includes(r))throw new Error(`Unexpected input: name should not contain the delimiter "${r}"`);if(n.includes(r))throw new Error(`Unexpected input: value should not contain the delimiter "${r}"`);return`${e}<<${r}${ye.EOL}${n}${ye.EOL}${r}`}R.prepareKeyValueMessage=rn});var ct=_(N=>{"use strict";Object.defineProperty(N,"__esModule",{value:!0});N.checkBypass=N.getProxyUrl=void 0;function nn(e){let t=e.protocol==="https:";if(at(e))return;let r=(()=>t?process.env.https_proxy||process.env.HTTPS_PROXY:process.env.http_proxy||process.env.HTTP_PROXY)();if(r)return new URL(r)}N.getProxyUrl=nn;function at(e){if(!e.hostname)return!1;let t=process.env.no_proxy||process.env.NO_PROXY||"";if(!t)return!1;let r;e.port?r=Number(e.port):e.protocol==="http:"?r=80:e.protocol==="https:"&&(r=443);let n=[e.hostname.toUpperCase()];typeof r=="number"&&n.push(`${n[0]}:${r}`);for(let i of t.split(",").map(s=>s.trim().toUpperCase()).filter(s=>s))if(n.some(s=>s===i))return!0;return!1}N.checkBypass=at});var ht=_(B=>{"use strict";var Ei=require("net"),sn=require("tls"),we=require("http"),lt=require("https"),on=require("events"),Pi=require("assert"),un=require("util");B.httpOverHttp=an;B.httpsOverHttp=cn;B.httpOverHttps=ln;B.httpsOverHttps=fn;function an(e){var t=new A(e);return t.request=we.request,t}function cn(e){var t=new A(e);return t.request=we.request,t.createSocket=ft,t.defaultPort=443,t}function ln(e){var t=new A(e);return t.request=lt.request,t}function fn(e){var t=new A(e);return t.request=lt.request,t.createSocket=ft,t.defaultPort=443,t}function A(e){var t=this;t.options=e||{},t.proxyOptions=t.options.proxy||{},t.maxSockets=t.options.maxSockets||we.Agent.defaultMaxSockets,t.requests=[],t.sockets=[],t.on("free",function(n,i,s,o){for(var c=dt(i,s,o),l=0,u=t.requests.length;l<u;++l){var a=t.requests[l];if(a.host===c.host&&a.port===c.port){t.requests.splice(l,1),a.request.onSocket(n);return}}n.destroy(),t.removeSocket(n)})}un.inherits(A,on.EventEmitter);A.prototype.addRequest=function(t,r,n,i){var s=this,o=Oe({request:t},s.options,dt(r,n,i));if(s.sockets.length>=this.maxSockets){s.requests.push(o);return}s.createSocket(o,function(c){c.on("free",l),c.on("close",u),c.on("agentRemove",u),t.onSocket(c);function l(){s.emit("free",c,o)}function u(a){s.removeSocket(c),c.removeListener("free",l),c.removeListener("close",u),c.removeListener("agentRemove",u)}})};A.prototype.createSocket=function(t,r){var n=this,i={};n.sockets.push(i);var s=Oe({},n.proxyOptions,{method:"CONNECT",path:t.host+":"+t.port,agent:!1,headers:{host:t.host+":"+t.port}});t.localAddress&&(s.localAddress=t.localAddress),s.proxyAuth&&(s.headers=s.headers||{},s.headers["Proxy-Authorization"]="Basic "+new Buffer(s.proxyAuth).toString("base64")),x("making CONNECT request");var o=n.request(s);o.useChunkedEncodingByDefault=!1,o.once("response",c),o.once("upgrade",l),o.once("connect",u),o.once("error",a),o.end();function c(d){d.upgrade=!0}function l(d,h,q){process.nextTick(function(){u(d,h,q)})}function u(d,h,q){if(o.removeAllListeners(),h.removeAllListeners(),d.statusCode!==200){x("tunneling socket could not be established, statusCode=%d",d.statusCode),h.destroy();var F=new Error("tunneling socket could not be established, statusCode="+d.statusCode);F.code="ECONNRESET",t.request.emit("error",F),n.removeSocket(i);return}if(q.length>0){x("got illegal response body from proxy"),h.destroy();var F=new Error("got illegal response body from proxy");F.code="ECONNRESET",t.request.emit("error",F),n.removeSocket(i);return}return x("tunneling connection has established"),n.sockets[n.sockets.indexOf(i)]=h,r(h)}function a(d){o.removeAllListeners(),x(`tunneling socket could not be established, cause=%s
`,d.message,d.stack);var h=new Error("tunneling socket could not be established, cause="+d.message);h.code="ECONNRESET",t.request.emit("error",h),n.removeSocket(i)}};A.prototype.removeSocket=function(t){var r=this.sockets.indexOf(t);if(r!==-1){this.sockets.splice(r,1);var n=this.requests.shift();n&&this.createSocket(n,function(i){n.request.onSocket(i)})}};function ft(e,t){var r=this;A.prototype.createSocket.call(r,e,function(n){var i=e.request.getHeader("host"),s=Oe({},r.options,{socket:n,servername:i?i.replace(/:.*$/,""):e.host}),o=sn.connect(0,s);r.sockets[r.sockets.indexOf(n)]=o,t(o)})}function dt(e,t,r){return typeof e=="string"?{host:e,port:t,localAddress:r}:e}function Oe(e){for(var t=1,r=arguments.length;t<r;++t){var n=arguments[t];if(typeof n=="object")for(var i=Object.keys(n),s=0,o=i.length;s<o;++s){var c=i[s];n[c]!==void 0&&(e[c]=n[c])}}return e}var x;process.env.NODE_DEBUG&&/\btunnel\b/.test(process.env.NODE_DEBUG)?x=function(){var e=Array.prototype.slice.call(arguments);typeof e[0]=="string"?e[0]="TUNNEL: "+e[0]:e.unshift("TUNNEL:"),console.error.apply(console,e)}:x=function(){};B.debug=x});var _t=_((qi,pt)=>{pt.exports=ht()});var mt=_(p=>{"use strict";var dn=p&&p.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),hn=p&&p.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),le=p&&p.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&dn(t,e,r);return hn(t,e),t},v=p&&p.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function c(a){try{u(n.next(a))}catch(d){o(d)}}function l(a){try{u(n.throw(a))}catch(d){o(d)}}function u(a){a.done?s(a.value):i(a.value).then(c,l)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(p,"__esModule",{value:!0});p.HttpClient=p.isHttps=p.HttpClientResponse=p.HttpClientError=p.getProxyUrl=p.MediaTypes=p.Headers=p.HttpCodes=void 0;var oe=le(require("http")),Re=le(require("https")),vt=le(ct()),ue=le(_t()),b;(function(e){e[e.OK=200]="OK",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.ResourceMoved=302]="ResourceMoved",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.SwitchProxy=306]="SwitchProxy",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.TooManyRequests=429]="TooManyRequests",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout"})(b=p.HttpCodes||(p.HttpCodes={}));var g;(function(e){e.Accept="accept",e.ContentType="content-type"})(g=p.Headers||(p.Headers={}));var U;(function(e){e.ApplicationJson="application/json"})(U=p.MediaTypes||(p.MediaTypes={}));function pn(e){let t=vt.getProxyUrl(new URL(e));return t?t.href:""}p.getProxyUrl=pn;var _n=[b.MovedPermanently,b.ResourceMoved,b.SeeOther,b.TemporaryRedirect,b.PermanentRedirect],vn=[b.BadGateway,b.ServiceUnavailable,b.GatewayTimeout],mn=["OPTIONS","GET","DELETE","HEAD"],gn=10,yn=5,k=class extends Error{constructor(t,r){super(t),this.name="HttpClientError",this.statusCode=r,Object.setPrototypeOf(this,k.prototype)}};p.HttpClientError=k;var ce=class{constructor(t){this.message=t}readBody(){return v(this,void 0,void 0,function*(){return new Promise(t=>v(this,void 0,void 0,function*(){let r=Buffer.alloc(0);this.message.on("data",n=>{r=Buffer.concat([r,n])}),this.message.on("end",()=>{t(r.toString())})}))})}};p.HttpClientResponse=ce;function wn(e){return new URL(e).protocol==="https:"}p.isHttps=wn;var Ee=class{constructor(t,r,n){this._ignoreSslError=!1,this._allowRedirects=!0,this._allowRedirectDowngrade=!1,this._maxRedirects=50,this._allowRetries=!1,this._maxRetries=1,this._keepAlive=!1,this._disposed=!1,this.userAgent=t,this.handlers=r||[],this.requestOptions=n,n&&(n.ignoreSslError!=null&&(this._ignoreSslError=n.ignoreSslError),this._socketTimeout=n.socketTimeout,n.allowRedirects!=null&&(this._allowRedirects=n.allowRedirects),n.allowRedirectDowngrade!=null&&(this._allowRedirectDowngrade=n.allowRedirectDowngrade),n.maxRedirects!=null&&(this._maxRedirects=Math.max(n.maxRedirects,0)),n.keepAlive!=null&&(this._keepAlive=n.keepAlive),n.allowRetries!=null&&(this._allowRetries=n.allowRetries),n.maxRetries!=null&&(this._maxRetries=n.maxRetries))}options(t,r){return v(this,void 0,void 0,function*(){return this.request("OPTIONS",t,null,r||{})})}get(t,r){return v(this,void 0,void 0,function*(){return this.request("GET",t,null,r||{})})}del(t,r){return v(this,void 0,void 0,function*(){return this.request("DELETE",t,null,r||{})})}post(t,r,n){return v(this,void 0,void 0,function*(){return this.request("POST",t,r,n||{})})}patch(t,r,n){return v(this,void 0,void 0,function*(){return this.request("PATCH",t,r,n||{})})}put(t,r,n){return v(this,void 0,void 0,function*(){return this.request("PUT",t,r,n||{})})}head(t,r){return v(this,void 0,void 0,function*(){return this.request("HEAD",t,null,r||{})})}sendStream(t,r,n,i){return v(this,void 0,void 0,function*(){return this.request(t,r,n,i)})}getJson(t,r={}){return v(this,void 0,void 0,function*(){r[g.Accept]=this._getExistingOrDefaultHeader(r,g.Accept,U.ApplicationJson);let n=yield this.get(t,r);return this._processResponse(n,this.requestOptions)})}postJson(t,r,n={}){return v(this,void 0,void 0,function*(){let i=JSON.stringify(r,null,2);n[g.Accept]=this._getExistingOrDefaultHeader(n,g.Accept,U.ApplicationJson),n[g.ContentType]=this._getExistingOrDefaultHeader(n,g.ContentType,U.ApplicationJson);let s=yield this.post(t,i,n);return this._processResponse(s,this.requestOptions)})}putJson(t,r,n={}){return v(this,void 0,void 0,function*(){let i=JSON.stringify(r,null,2);n[g.Accept]=this._getExistingOrDefaultHeader(n,g.Accept,U.ApplicationJson),n[g.ContentType]=this._getExistingOrDefaultHeader(n,g.ContentType,U.ApplicationJson);let s=yield this.put(t,i,n);return this._processResponse(s,this.requestOptions)})}patchJson(t,r,n={}){return v(this,void 0,void 0,function*(){let i=JSON.stringify(r,null,2);n[g.Accept]=this._getExistingOrDefaultHeader(n,g.Accept,U.ApplicationJson),n[g.ContentType]=this._getExistingOrDefaultHeader(n,g.ContentType,U.ApplicationJson);let s=yield this.patch(t,i,n);return this._processResponse(s,this.requestOptions)})}request(t,r,n,i){return v(this,void 0,void 0,function*(){if(this._disposed)throw new Error("Client has already been disposed.");let s=new URL(r),o=this._prepareRequest(t,s,i),c=this._allowRetries&&mn.includes(t)?this._maxRetries+1:1,l=0,u;do{if(u=yield this.requestRaw(o,n),u&&u.message&&u.message.statusCode===b.Unauthorized){let d;for(let h of this.handlers)if(h.canHandleAuthentication(u)){d=h;break}return d?d.handleAuthentication(this,o,n):u}let a=this._maxRedirects;for(;u.message.statusCode&&_n.includes(u.message.statusCode)&&this._allowRedirects&&a>0;){let d=u.message.headers.location;if(!d)break;let h=new URL(d);if(s.protocol==="https:"&&s.protocol!==h.protocol&&!this._allowRedirectDowngrade)throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");if(yield u.readBody(),h.hostname!==s.hostname)for(let q in i)q.toLowerCase()==="authorization"&&delete i[q];o=this._prepareRequest(t,h,i),u=yield this.requestRaw(o,n),a--}if(!u.message.statusCode||!vn.includes(u.message.statusCode))return u;l+=1,l<c&&(yield u.readBody(),yield this._performExponentialBackoff(l))}while(l<c);return u})}dispose(){this._agent&&this._agent.destroy(),this._disposed=!0}requestRaw(t,r){return v(this,void 0,void 0,function*(){return new Promise((n,i)=>{function s(o,c){o?i(o):c?n(c):i(new Error("Unknown error"))}this.requestRawWithCallback(t,r,s)})})}requestRawWithCallback(t,r,n){typeof r=="string"&&(t.options.headers||(t.options.headers={}),t.options.headers["Content-Length"]=Buffer.byteLength(r,"utf8"));let i=!1;function s(l,u){i||(i=!0,n(l,u))}let o=t.httpModule.request(t.options,l=>{let u=new ce(l);s(void 0,u)}),c;o.on("socket",l=>{c=l}),o.setTimeout(this._socketTimeout||3*6e4,()=>{c&&c.end(),s(new Error(`Request timeout: ${t.options.path}`))}),o.on("error",function(l){s(l)}),r&&typeof r=="string"&&o.write(r,"utf8"),r&&typeof r!="string"?(r.on("close",function(){o.end()}),r.pipe(o)):o.end()}getAgent(t){let r=new URL(t);return this._getAgent(r)}_prepareRequest(t,r,n){let i={};i.parsedUrl=r;let s=i.parsedUrl.protocol==="https:";i.httpModule=s?Re:oe;let o=s?443:80;if(i.options={},i.options.host=i.parsedUrl.hostname,i.options.port=i.parsedUrl.port?parseInt(i.parsedUrl.port):o,i.options.path=(i.parsedUrl.pathname||"")+(i.parsedUrl.search||""),i.options.method=t,i.options.headers=this._mergeHeaders(n),this.userAgent!=null&&(i.options.headers["user-agent"]=this.userAgent),i.options.agent=this._getAgent(i.parsedUrl),this.handlers)for(let c of this.handlers)c.prepareRequest(i.options);return i}_mergeHeaders(t){return this.requestOptions&&this.requestOptions.headers?Object.assign({},ae(this.requestOptions.headers),ae(t||{})):ae(t||{})}_getExistingOrDefaultHeader(t,r,n){let i;return this.requestOptions&&this.requestOptions.headers&&(i=ae(this.requestOptions.headers)[r]),t[r]||i||n}_getAgent(t){let r,n=vt.getProxyUrl(t),i=n&&n.hostname;if(this._keepAlive&&i&&(r=this._proxyAgent),this._keepAlive&&!i&&(r=this._agent),r)return r;let s=t.protocol==="https:",o=100;if(this.requestOptions&&(o=this.requestOptions.maxSockets||oe.globalAgent.maxSockets),n&&n.hostname){let c={maxSockets:o,keepAlive:this._keepAlive,proxy:Object.assign(Object.assign({},(n.username||n.password)&&{proxyAuth:`${n.username}:${n.password}`}),{host:n.hostname,port:n.port})},l,u=n.protocol==="https:";s?l=u?ue.httpsOverHttps:ue.httpsOverHttp:l=u?ue.httpOverHttps:ue.httpOverHttp,r=l(c),this._proxyAgent=r}if(this._keepAlive&&!r){let c={keepAlive:this._keepAlive,maxSockets:o};r=s?new Re.Agent(c):new oe.Agent(c),this._agent=r}return r||(r=s?Re.globalAgent:oe.globalAgent),s&&this._ignoreSslError&&(r.options=Object.assign(r.options||{},{rejectUnauthorized:!1})),r}_performExponentialBackoff(t){return v(this,void 0,void 0,function*(){t=Math.min(gn,t);let r=yn*Math.pow(2,t);return new Promise(n=>setTimeout(()=>n(),r))})}_processResponse(t,r){return v(this,void 0,void 0,function*(){return new Promise((n,i)=>v(this,void 0,void 0,function*(){let s=t.message.statusCode||0,o={statusCode:s,result:null,headers:{}};s===b.NotFound&&n(o);function c(a,d){if(typeof d=="string"){let h=new Date(d);if(!isNaN(h.valueOf()))return h}return d}let l,u;try{u=yield t.readBody(),u&&u.length>0&&(r&&r.deserializeDates?l=JSON.parse(u,c):l=JSON.parse(u),o.result=l),o.headers=t.message.headers}catch{}if(s>299){let a;l&&l.message?a=l.message:u&&u.length>0?a=u:a=`Failed request: (${s})`;let d=new k(a,s);d.result=o.result,i(d)}else n(o)}))})}};p.HttpClient=Ee;var ae=e=>Object.keys(e).reduce((t,r)=>(t[r.toLowerCase()]=e[r],t),{})});var gt=_(S=>{"use strict";var Se=S&&S.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function c(a){try{u(n.next(a))}catch(d){o(d)}}function l(a){try{u(n.throw(a))}catch(d){o(d)}}function u(a){a.done?s(a.value):i(a.value).then(c,l)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(S,"__esModule",{value:!0});S.PersonalAccessTokenCredentialHandler=S.BearerCredentialHandler=S.BasicCredentialHandler=void 0;var Pe=class{constructor(t,r){this.username=t,this.password=r}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return Se(this,void 0,void 0,function*(){throw new Error("not implemented")})}};S.BasicCredentialHandler=Pe;var be=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Bearer ${this.token}`}canHandleAuthentication(){return!1}handleAuthentication(){return Se(this,void 0,void 0,function*(){throw new Error("not implemented")})}};S.BearerCredentialHandler=be;var qe=class{constructor(t){this.token=t}prepareRequest(t){if(!t.headers)throw Error("The request has no headers");t.headers.Authorization=`Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return Se(this,void 0,void 0,function*(){throw new Error("not implemented")})}};S.PersonalAccessTokenCredentialHandler=qe});var Ot=_(L=>{"use strict";var yt=L&&L.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function c(a){try{u(n.next(a))}catch(d){o(d)}}function l(a){try{u(n.throw(a))}catch(d){o(d)}}function u(a){a.done?s(a.value):i(a.value).then(c,l)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(L,"__esModule",{value:!0});L.OidcClient=void 0;var On=mt(),Rn=gt(),wt=Te(),D=class{static createHttpClient(t=!0,r=10){let n={allowRetries:t,maxRetries:r};return new On.HttpClient("actions/oidc-client",[new Rn.BearerCredentialHandler(D.getRequestToken())],n)}static getRequestToken(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");return t}static getIDTokenUrl(){let t=process.env.ACTIONS_ID_TOKEN_REQUEST_URL;if(!t)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");return t}static getCall(t){var r;return yt(this,void 0,void 0,function*(){let s=(r=(yield D.createHttpClient().getJson(t).catch(o=>{throw new Error(`Failed to get ID Token. 
 
        Error Code : ${o.statusCode}
 
        Error Message: ${o.result.message}`)})).result)===null||r===void 0?void 0:r.value;if(!s)throw new Error("Response json body do not have ID Token field");return s})}static getIDToken(t){return yt(this,void 0,void 0,function*(){try{let r=D.getIDTokenUrl();if(t){let i=encodeURIComponent(t);r=`${r}&audience=${i}`}wt.debug(`ID token url is ${r}`);let n=yield D.getCall(r);return wt.setSecret(n),n}catch(r){throw new Error(`Error message: ${r.message}`)}})}};L.OidcClient=D});var Ue=_(y=>{"use strict";var Ae=y&&y.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function c(a){try{u(n.next(a))}catch(d){o(d)}}function l(a){try{u(n.throw(a))}catch(d){o(d)}}function u(a){a.done?s(a.value):i(a.value).then(c,l)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(y,"__esModule",{value:!0});y.summary=y.markdownSummary=y.SUMMARY_DOCS_URL=y.SUMMARY_ENV_VAR=void 0;var En=require("os"),Me=require("fs"),{access:Pn,appendFile:bn,writeFile:qn}=Me.promises;y.SUMMARY_ENV_VAR="GITHUB_STEP_SUMMARY";y.SUMMARY_DOCS_URL="https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";var xe=class{constructor(){this._buffer=""}filePath(){return Ae(this,void 0,void 0,function*(){if(this._filePath)return this._filePath;let t=process.env[y.SUMMARY_ENV_VAR];if(!t)throw new Error(`Unable to find environment variable for $${y.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);try{yield Pn(t,Me.constants.R_OK|Me.constants.W_OK)}catch{throw new Error(`Unable to access summary file: '${t}'. Check if the file has correct read/write permissions.`)}return this._filePath=t,this._filePath})}wrap(t,r,n={}){let i=Object.entries(n).map(([s,o])=>` ${s}="${o}"`).join("");return r?`<${t}${i}>${r}</${t}>`:`<${t}${i}>`}write(t){return Ae(this,void 0,void 0,function*(){let r=!!t?.overwrite,n=yield this.filePath();return yield(r?qn:bn)(n,this._buffer,{encoding:"utf8"}),this.emptyBuffer()})}clear(){return Ae(this,void 0,void 0,function*(){return this.emptyBuffer().write({overwrite:!0})})}stringify(){return this._buffer}isEmptyBuffer(){return this._buffer.length===0}emptyBuffer(){return this._buffer="",this}addRaw(t,r=!1){return this._buffer+=t,r?this.addEOL():this}addEOL(){return this.addRaw(En.EOL)}addCodeBlock(t,r){let n=Object.assign({},r&&{lang:r}),i=this.wrap("pre",this.wrap("code",t),n);return this.addRaw(i).addEOL()}addList(t,r=!1){let n=r?"ol":"ul",i=t.map(o=>this.wrap("li",o)).join(""),s=this.wrap(n,i);return this.addRaw(s).addEOL()}addTable(t){let r=t.map(i=>{let s=i.map(o=>{if(typeof o=="string")return this.wrap("td",o);let{header:c,data:l,colspan:u,rowspan:a}=o,d=c?"th":"td",h=Object.assign(Object.assign({},u&&{colspan:u}),a&&{rowspan:a});return this.wrap(d,l,h)}).join("");return this.wrap("tr",s)}).join(""),n=this.wrap("table",r);return this.addRaw(n).addEOL()}addDetails(t,r){let n=this.wrap("details",this.wrap("summary",t)+r);return this.addRaw(n).addEOL()}addImage(t,r,n){let{width:i,height:s}=n||{},o=Object.assign(Object.assign({},i&&{width:i}),s&&{height:s}),c=this.wrap("img",null,Object.assign({src:t,alt:r},o));return this.addRaw(c).addEOL()}addHeading(t,r){let n=`h${r}`,i=["h1","h2","h3","h4","h5","h6"].includes(n)?n:"h1",s=this.wrap(i,t);return this.addRaw(s).addEOL()}addSeparator(){let t=this.wrap("hr",null);return this.addRaw(t).addEOL()}addBreak(){let t=this.wrap("br",null);return this.addRaw(t).addEOL()}addQuote(t,r){let n=Object.assign({},r&&{cite:r}),i=this.wrap("blockquote",t,n);return this.addRaw(i).addEOL()}addLink(t,r){let n=this.wrap("a",t,{href:r});return this.addRaw(n).addEOL()}},Rt=new xe;y.markdownSummary=Rt;y.summary=Rt});var Et=_(w=>{"use strict";var Sn=w&&w.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Tn=w&&w.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),An=w&&w.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&Sn(t,e,r);return Tn(t,e),t};Object.defineProperty(w,"__esModule",{value:!0});w.toPlatformPath=w.toWin32Path=w.toPosixPath=void 0;var Mn=An(require("path"));function xn(e){return e.replace(/[\\]/g,"/")}w.toPosixPath=xn;function Un(e){return e.replace(/[/]/g,"\\")}w.toWin32Path=Un;function Dn(e){return e.replace(/[/\\]/g,Mn.sep)}w.toPlatformPath=Dn});var Te=_(f=>{"use strict";var $n=f&&f.__createBinding||(Object.create?function(e,t,r,n){n===void 0&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){n===void 0&&(n=r),e[n]=t[r]}),Cn=f&&f.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),Pt=f&&f.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var r in e)r!=="default"&&Object.hasOwnProperty.call(e,r)&&$n(t,e,r);return Cn(t,e),t},bt=f&&f.__awaiter||function(e,t,r,n){function i(s){return s instanceof r?s:new r(function(o){o(s)})}return new(r||(r=Promise))(function(s,o){function c(a){try{u(n.next(a))}catch(d){o(d)}}function l(a){try{u(n.throw(a))}catch(d){o(d)}}function u(a){a.done?s(a.value):i(a.value).then(c,l)}u((n=n.apply(e,t||[])).next())})};Object.defineProperty(f,"__esModule",{value:!0});f.getIDToken=f.getState=f.saveState=f.group=f.endGroup=f.startGroup=f.info=f.notice=f.warning=f.error=f.debug=f.isDebug=f.setFailed=f.setCommandEcho=f.setOutput=f.getBooleanInput=f.getMultilineInput=f.getInput=f.addPath=f.setSecret=f.exportVariable=f.ExitCode=void 0;var E=ke(),C=ut(),j=J(),qt=Pt(require("os")),In=Pt(require("path")),Nn=Ot(),St;(function(e){e[e.Success=0]="Success",e[e.Failure=1]="Failure"})(St=f.ExitCode||(f.ExitCode={}));function Bn(e,t){let r=j.toCommandValue(t);if(process.env[e]=r,process.env.GITHUB_ENV||"")return C.issueFileCommand("ENV",C.prepareKeyValueMessage(e,t));E.issueCommand("set-env",{name:e},r)}f.exportVariable=Bn;function kn(e){E.issueCommand("add-mask",{},e)}f.setSecret=kn;function Ln(e){process.env.GITHUB_PATH||""?C.issueFileCommand("PATH",e):E.issueCommand("add-path",{},e),process.env.PATH=`${e}${In.delimiter}${process.env.PATH}`}f.addPath=Ln;function De(e,t){let r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r)throw new Error(`Input required and not supplied: ${e}`);return t&&t.trimWhitespace===!1?r:r.trim()}f.getInput=De;function jn(e,t){let r=De(e,t).split(`
`).filter(n=>n!=="");return t&&t.trimWhitespace===!1?r:r.map(n=>n.trim())}f.getMultilineInput=jn;function Fn(e,t){let r=["true","True","TRUE"],n=["false","False","FALSE"],i=De(e,t);if(r.includes(i))return!0;if(n.includes(i))return!1;throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}
Support boolean input list: \`true | True | TRUE | false | False | FALSE\``)}f.getBooleanInput=Fn;function Vn(e,t){if(process.env.GITHUB_OUTPUT||"")return C.issueFileCommand("OUTPUT",C.prepareKeyValueMessage(e,t));process.stdout.write(qt.EOL),E.issueCommand("set-output",{name:e},j.toCommandValue(t))}f.setOutput=Vn;function Gn(e){E.issue("echo",e?"on":"off")}f.setCommandEcho=Gn;function Jn(e){process.exitCode=St.Failure,Tt(e)}f.setFailed=Jn;function Kn(){return process.env.RUNNER_DEBUG==="1"}f.isDebug=Kn;function zn(e){E.issueCommand("debug",{},e)}f.debug=zn;function Tt(e,t={}){E.issueCommand("error",j.toCommandProperties(t),e instanceof Error?e.toString():e)}f.error=Tt;function Wn(e,t={}){E.issueCommand("warning",j.toCommandProperties(t),e instanceof Error?e.toString():e)}f.warning=Wn;function Yn(e,t={}){E.issueCommand("notice",j.toCommandProperties(t),e instanceof Error?e.toString():e)}f.notice=Yn;function Hn(e){process.stdout.write(e+qt.EOL)}f.info=Hn;function At(e){E.issue("group",e)}f.startGroup=At;function Mt(){E.issue("endgroup")}f.endGroup=Mt;function Qn(e,t){return bt(this,void 0,void 0,function*(){At(e);let r;try{r=yield t()}finally{Mt()}return r})}f.group=Qn;function Xn(e,t){if(process.env.GITHUB_STATE||"")return C.issueFileCommand("STATE",C.prepareKeyValueMessage(e,t));E.issueCommand("save-state",{name:e},j.toCommandValue(t))}f.saveState=Xn;function Zn(e){return process.env[`STATE_${e}`]||""}f.getState=Zn;function ei(e){return bt(this,void 0,void 0,function*(){return yield Nn.OidcClient.getIDToken(e)})}f.getIDToken=ei;var ti=Ue();Object.defineProperty(f,"summary",{enumerable:!0,get:function(){return ti.summary}});var ri=Ue();Object.defineProperty(f,"markdownSummary",{enumerable:!0,get:function(){return ri.markdownSummary}});var $e=Et();Object.defineProperty(f,"toPosixPath",{enumerable:!0,get:function(){return $e.toPosixPath}});Object.defineProperty(f,"toWin32Path",{enumerable:!0,get:function(){return $e.toWin32Path}});Object.defineProperty(f,"toPlatformPath",{enumerable:!0,get:function(){return $e.toPlatformPath}})});var M=Bt(Te());var xt=(e,t)=>{let r=/^(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(-(?<label>[0-9A-Za-z-]+))?$/,n=e.match(r);if(!n||!n.groups)throw new Error("version must match semantic-versioning format");let{major:i,minor:s,patch:o,label:c}=n.groups;if(!i||!s||!o){let q=[`major: "${i}"`,`minor: "${s}"`,`patch: "${o}"`,`label: "${c}"`].join(", ");throw new Error(`could not extract all fields out of version, ${q}`)}let l=["major","minor","patch"],u=l.indexOf(t);if(u<0){let q=l.join(", ");throw new Error(`invalid field "${t}", must be one of [${q}]`)}let a=[i,s,o],d=parseInt(a[u]);if(isNaN(d))throw new Error(`failed to parse field "${a[u]}" into number`);return a[u]=`${d+1}`,`${a.join(".")}${c?`-${c}`:""}`};try{let e=M.getInput("version",{required:!0,trimWhitespace:!0}),t=M.getInput("field",{required:!0,trimWhitespace:!0}),r=xt(e,t);M.setOutput("next-version",r),M.info(`incremented version ${t}, ${e} -> ${r}`)}catch(e){M.setFailed(e)}
//# sourceMappingURL=index.js.map
