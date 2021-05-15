var _=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports);var L=_((hr,ke)=>{"use strict";ke.exports={BINARY_TYPES:["nodebuffer","arraybuffer","fragments"],GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),EMPTY_BUFFER:Buffer.alloc(0),NOOP:()=>{}}});var U=_((dr,Q)=>{"use strict";var{EMPTY_BUFFER:Wt}=L();function Ce(i,e){if(i.length===0)return Wt;if(i.length===1)return i[0];let t=Buffer.allocUnsafe(e),r=0;for(let s=0;s<i.length;s++){let n=i[s];t.set(n,r),r+=n.length}return r<e?t.slice(0,r):t}function Te(i,e,t,r,s){for(let n=0;n<s;n++)t[r+n]=i[n]^e[n&3]}function Le(i,e){let t=i.length;for(let r=0;r<t;r++)i[r]^=e[r&3]}function Oe(i){return i.byteLength===i.buffer.byteLength?i.buffer:i.buffer.slice(i.byteOffset,i.byteOffset+i.byteLength)}function G(i){if(G.readOnly=!0,Buffer.isBuffer(i))return i;let e;return i instanceof ArrayBuffer?e=Buffer.from(i):ArrayBuffer.isView(i)?e=Buffer.from(i.buffer,i.byteOffset,i.byteLength):(e=Buffer.from(i),G.readOnly=!1),e}try{let i=require("bufferutil"),e=i.BufferUtil||i;Q.exports={concat:Ce,mask(t,r,s,n,o){o<48?Te(t,r,s,n,o):e.mask(t,r,s,n,o)},toArrayBuffer:Oe,toBuffer:G,unmask(t,r){t.length<32?Le(t,r):e.unmask(t,r)}}}catch(i){Q.exports={concat:Ce,mask:Te,toArrayBuffer:Oe,toBuffer:G,unmask:Le}}});var Pe=_((ur,Ne)=>{"use strict";var $e=Symbol("kDone"),X=Symbol("kRun"),Be=class{constructor(e){this[$e]=()=>{this.pending--,this[X]()},this.concurrency=e||Infinity,this.jobs=[],this.pending=0}add(e){this.jobs.push(e),this[X]()}[X](){if(this.pending!==this.concurrency&&this.jobs.length){let e=this.jobs.shift();this.pending++,e(this[$e])}}};Ne.exports=Be});var R=_((pr,Ie)=>{"use strict";var q=require("zlib"),Me=U(),Gt=Pe(),{kStatusCode:Ue,NOOP:Vt}=L(),Ht=Buffer.from([0,0,255,255]),V=Symbol("permessage-deflate"),y=Symbol("total-length"),D=Symbol("callback"),E=Symbol("buffers"),ee=Symbol("error"),H,qe=class{constructor(e,t,r){if(this._maxPayload=r|0,this._options=e||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._isServer=!!t,this._deflate=null,this._inflate=null,this.params=null,!H){let s=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;H=new Gt(s)}}static get extensionName(){return"permessage-deflate"}offer(){let e={};return this._options.serverNoContextTakeover&&(e.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(e.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(e.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?e.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(e.client_max_window_bits=!0),e}accept(e){return e=this.normalizeParams(e),this.params=this._isServer?this.acceptAsServer(e):this.acceptAsClient(e),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let e=this._deflate[D];this._deflate.close(),this._deflate=null,e&&e(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(e){let t=this._options,r=e.find(s=>!(t.serverNoContextTakeover===!1&&s.server_no_context_takeover||s.server_max_window_bits&&(t.serverMaxWindowBits===!1||typeof t.serverMaxWindowBits=="number"&&t.serverMaxWindowBits>s.server_max_window_bits)||typeof t.clientMaxWindowBits=="number"&&!s.client_max_window_bits));if(!r)throw new Error("None of the extension offers can be accepted");return t.serverNoContextTakeover&&(r.server_no_context_takeover=!0),t.clientNoContextTakeover&&(r.client_no_context_takeover=!0),typeof t.serverMaxWindowBits=="number"&&(r.server_max_window_bits=t.serverMaxWindowBits),typeof t.clientMaxWindowBits=="number"?r.client_max_window_bits=t.clientMaxWindowBits:(r.client_max_window_bits===!0||t.clientMaxWindowBits===!1)&&delete r.client_max_window_bits,r}acceptAsClient(e){let t=e[0];if(this._options.clientNoContextTakeover===!1&&t.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!t.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(t.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&t.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return t}normalizeParams(e){return e.forEach(t=>{Object.keys(t).forEach(r=>{let s=t[r];if(s.length>1)throw new Error(`Parameter "${r}" must have only a single value`);if(s=s[0],r==="client_max_window_bits"){if(s!==!0){let n=+s;if(!Number.isInteger(n)||n<8||n>15)throw new TypeError(`Invalid value for parameter "${r}": ${s}`);s=n}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${r}": ${s}`)}else if(r==="server_max_window_bits"){let n=+s;if(!Number.isInteger(n)||n<8||n>15)throw new TypeError(`Invalid value for parameter "${r}": ${s}`);s=n}else if(r==="client_no_context_takeover"||r==="server_no_context_takeover"){if(s!==!0)throw new TypeError(`Invalid value for parameter "${r}": ${s}`)}else throw new Error(`Unknown parameter "${r}"`);t[r]=s})}),e}decompress(e,t,r){H.add(s=>{this._decompress(e,t,(n,o)=>{s(),r(n,o)})})}compress(e,t,r){H.add(s=>{this._compress(e,t,(n,o)=>{s(),r(n,o)})})}_decompress(e,t,r){let s=this._isServer?"client":"server";if(!this._inflate){let n=`${s}_max_window_bits`,o=typeof this.params[n]!="number"?q.Z_DEFAULT_WINDOWBITS:this.params[n];this._inflate=q.createInflateRaw({...this._options.zlibInflateOptions,windowBits:o}),this._inflate[V]=this,this._inflate[y]=0,this._inflate[E]=[],this._inflate.on("error",Kt),this._inflate.on("data",De)}this._inflate[D]=r,this._inflate.write(e),t&&this._inflate.write(Ht),this._inflate.flush(()=>{let n=this._inflate[ee];if(n){this._inflate.close(),this._inflate=null,r(n);return}let o=Me.concat(this._inflate[E],this._inflate[y]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[y]=0,this._inflate[E]=[],t&&this.params[`${s}_no_context_takeover`]&&this._inflate.reset()),r(null,o)})}_compress(e,t,r){let s=this._isServer?"server":"client";if(!this._deflate){let n=`${s}_max_window_bits`,o=typeof this.params[n]!="number"?q.Z_DEFAULT_WINDOWBITS:this.params[n];this._deflate=q.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:o}),this._deflate[y]=0,this._deflate[E]=[],this._deflate.on("error",Vt),this._deflate.on("data",Yt)}this._deflate[D]=r,this._deflate.write(e),this._deflate.flush(q.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let n=Me.concat(this._deflate[E],this._deflate[y]);t&&(n=n.slice(0,n.length-4)),this._deflate[D]=null,this._deflate[y]=0,this._deflate[E]=[],t&&this.params[`${s}_no_context_takeover`]&&this._deflate.reset(),r(null,n)})}};Ie.exports=qe;function Yt(i){this[E].push(i),this[y]+=i.length}function De(i){if(this[y]+=i.length,this[V]._maxPayload<1||this[y]<=this[V]._maxPayload){this[E].push(i);return}this[ee]=new RangeError("Max payload size exceeded"),this[ee][Ue]=1009,this.removeListener("data",De),this.reset()}function Kt(i){this[V]._inflate=null,i[Ue]=1007,this[D](i)}});var Qe=_((mr,Re)=>{var Ae=require("fs"),k=require("path"),Fe=require("os"),je=typeof __webpack_require__=="function"?__non_webpack_require__:require,Zt=process.config&&process.config.variables||{},Jt=!!process.env.PREBUILDS_ONLY,ze=process.versions.modules,te=Qt()?"electron":"node",ie=Fe.arch(),re=Fe.platform(),We=process.env.LIBC||(Xt(re)?"musl":"glibc"),se=process.env.ARM_VERSION||(ie==="arm64"?"8":Zt.arm_version)||"",Ge=(process.versions.uv||"").split(".")[0];Re.exports=P;function P(i){return je(P.path(i))}P.path=function(i){i=k.resolve(i||".");try{var e=je(k.join(i,"package.json")).name.toUpperCase().replace(/-/g,"_");process.env[e+"_PREBUILD"]&&(i=process.env[e+"_PREBUILD"])}catch(l){}if(!Jt){var t=He(k.join(i,"build/Release"),Ye);if(t)return t;var r=He(k.join(i,"build/Debug"),Ye);if(r)return r}var s=c(i);if(s)return s;var n=c(k.dirname(process.execPath));if(n)return n;var o=["platform="+re,"arch="+ie,"runtime="+te,"abi="+ze,"uv="+Ge,se?"armv="+se:"","libc="+We,"node="+process.versions.node,process.versions&&process.versions.electron?"electron="+process.versions.electron:"",typeof __webpack_require__=="function"?"webpack=true":""].filter(Boolean).join(" ");throw new Error("No native build was found for "+o+`
    loaded from: `+i+`
`);function c(l){var a=k.join(l,"prebuilds",re+"-"+ie),f=Ve(a).map(Ke),m=f.filter(Ze(te,ze)),h=m.sort(Je(te))[0];if(h)return k.join(a,h.file)}};function Ve(i){try{return Ae.readdirSync(i)}catch(e){return[]}}function He(i,e){var t=Ve(i).filter(e);return t[0]&&k.join(i,t[0])}function Ye(i){return/\.node$/.test(i)}function Ke(i){var e=i.split("."),t=e.pop(),r={file:i,specificity:0};if(t==="node"){for(var s=0;s<e.length;s++){var n=e[s];if(n==="node"||n==="electron"||n==="node-webkit")r.runtime=n;else if(n==="napi")r.napi=!0;else if(n.slice(0,3)==="abi")r.abi=n.slice(3);else if(n.slice(0,2)==="uv")r.uv=n.slice(2);else if(n.slice(0,4)==="armv")r.armv=n.slice(4);else if(n==="glibc"||n==="musl")r.libc=n;else continue;r.specificity++}return r}}function Ze(i,e){return function(t){return!(t==null||t.runtime!==i&&!ei(t)||t.abi!==e&&!t.napi||t.uv&&t.uv!==Ge||t.armv&&t.armv!==se||t.libc&&t.libc!==We)}}function ei(i){return i.runtime==="node"&&i.napi}function Je(i){return function(e,t){return e.runtime!==t.runtime?e.runtime===i?-1:1:e.abi!==t.abi?e.abi?-1:1:e.specificity!==t.specificity?e.specificity>t.specificity?-1:1:0}}function Qt(){return process.versions&&process.versions.electron||process.env.ELECTRON_RUN_AS_NODE?!0:typeof window!="undefined"&&window.process&&window.process.type==="renderer"}function Xt(i){return i==="linux"&&Ae.existsSync("/etc/alpine-release")}P.parseTags=Ke;P.matchTags=Ze;P.compareTags=Je});var et=_((gr,Xe)=>{"use strict";function ti(i){let e=i.length,t=0;for(;t<e;)if((i[t]&128)==0)t++;else if((i[t]&224)==192){if(t+1===e||(i[t+1]&192)!=128||(i[t]&254)==192)return!1;t+=2}else if((i[t]&240)==224){if(t+2>=e||(i[t+1]&192)!=128||(i[t+2]&192)!=128||i[t]===224&&(i[t+1]&224)==128||i[t]===237&&(i[t+1]&224)==160)return!1;t+=3}else if((i[t]&248)==240){if(t+3>=e||(i[t+1]&192)!=128||(i[t+2]&192)!=128||(i[t+3]&192)!=128||i[t]===240&&(i[t+1]&240)==128||i[t]===244&&i[t+1]>143||i[t]>244)return!1;t+=4}else return!1;return!0}Xe.exports=ti});var tt=_((_r,ne)=>{"use strict";try{ne.exports=Qe()(__dirname)}catch(i){ne.exports=et()}});var ae=_((vr,oe)=>{"use strict";function it(i){return i>=1e3&&i<=1014&&i!==1004&&i!==1005&&i!==1006||i>=3e3&&i<=4999}function rt(i){let e=i.length,t=0;for(;t<e;)if(i[t]<128)t++;else if((i[t]&224)==192){if(t+1===e||(i[t+1]&192)!=128||(i[t]&254)==192)return!1;t+=2}else if((i[t]&240)==224){if(t+2>=e||(i[t+1]&192)!=128||(i[t+2]&192)!=128||i[t]===224&&(i[t+1]&224)==128||i[t]===237&&(i[t+1]&224)==160)return!1;t+=3}else if((i[t]&248)==240){if(t+3>=e||(i[t+1]&192)!=128||(i[t+2]&192)!=128||(i[t+3]&192)!=128||i[t]===240&&(i[t+1]&240)==128||i[t]===244&&i[t+1]>143||i[t]>244)return!1;t+=4}else return!1;return!0}try{let i=tt();typeof i=="object"&&(i=i.Validation.isValidUTF8),oe.exports={isValidStatusCode:it,isValidUTF8(e){return e.length<150?rt(e):i(e)}}}catch(i){oe.exports={isValidStatusCode:it,isValidUTF8:rt}}});var fe=_((xr,st)=>{"use strict";var{Writable:ii}=require("stream"),nt=R(),{BINARY_TYPES:ri,EMPTY_BUFFER:si,kStatusCode:ni,kWebSocket:oi}=L(),{concat:le,toArrayBuffer:ai,unmask:li}=U(),{isValidStatusCode:ci,isValidUTF8:ot}=ae(),A=0,at=1,lt=2,ct=3,ce=4,fi=5,ft=class extends ii{constructor(e,t,r,s){super();this._binaryType=e||ri[0],this[oi]=void 0,this._extensions=t||{},this._isServer=!!r,this._maxPayload=s|0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._fragments=[],this._state=A,this._loop=!1}_write(e,t,r){if(this._opcode===8&&this._state==A)return r();this._bufferedBytes+=e.length,this._buffers.push(e),this.startLoop(r)}consume(e){if(this._bufferedBytes-=e,e===this._buffers[0].length)return this._buffers.shift();if(e<this._buffers[0].length){let r=this._buffers[0];return this._buffers[0]=r.slice(e),r.slice(0,e)}let t=Buffer.allocUnsafe(e);do{let r=this._buffers[0],s=t.length-e;e>=r.length?t.set(this._buffers.shift(),s):(t.set(new Uint8Array(r.buffer,r.byteOffset,e),s),this._buffers[0]=r.slice(e)),e-=r.length}while(e>0);return t}startLoop(e){let t;this._loop=!0;do switch(this._state){case A:t=this.getInfo();break;case at:t=this.getPayloadLength16();break;case lt:t=this.getPayloadLength64();break;case ct:this.getMask();break;case ce:t=this.getData(e);break;default:this._loop=!1;return}while(this._loop);e(t)}getInfo(){if(this._bufferedBytes<2){this._loop=!1;return}let e=this.consume(2);if((e[0]&48)!=0)return this._loop=!1,g(RangeError,"RSV2 and RSV3 must be clear",!0,1002);let t=(e[0]&64)==64;if(t&&!this._extensions[nt.extensionName])return this._loop=!1,g(RangeError,"RSV1 must be clear",!0,1002);if(this._fin=(e[0]&128)==128,this._opcode=e[0]&15,this._payloadLength=e[1]&127,this._opcode===0){if(t)return this._loop=!1,g(RangeError,"RSV1 must be clear",!0,1002);if(!this._fragmented)return this._loop=!1,g(RangeError,"invalid opcode 0",!0,1002);this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented)return this._loop=!1,g(RangeError,`invalid opcode ${this._opcode}`,!0,1002);this._compressed=t}else if(this._opcode>7&&this._opcode<11){if(!this._fin)return this._loop=!1,g(RangeError,"FIN must be set",!0,1002);if(t)return this._loop=!1,g(RangeError,"RSV1 must be clear",!0,1002);if(this._payloadLength>125)return this._loop=!1,g(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002)}else return this._loop=!1,g(RangeError,`invalid opcode ${this._opcode}`,!0,1002);if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(e[1]&128)==128,this._isServer){if(!this._masked)return this._loop=!1,g(RangeError,"MASK must be set",!0,1002)}else if(this._masked)return this._loop=!1,g(RangeError,"MASK must be clear",!0,1002);if(this._payloadLength===126)this._state=at;else if(this._payloadLength===127)this._state=lt;else return this.haveLength()}getPayloadLength16(){if(this._bufferedBytes<2){this._loop=!1;return}return this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength()}getPayloadLength64(){if(this._bufferedBytes<8){this._loop=!1;return}let e=this.consume(8),t=e.readUInt32BE(0);return t>Math.pow(2,53-32)-1?(this._loop=!1,g(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009)):(this._payloadLength=t*Math.pow(2,32)+e.readUInt32BE(4),this.haveLength())}haveLength(){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0))return this._loop=!1,g(RangeError,"Max payload size exceeded",!1,1009);this._masked?this._state=ct:this._state=ce}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=ce}getData(e){let t=si;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}t=this.consume(this._payloadLength),this._masked&&li(t,this._mask)}if(this._opcode>7)return this.controlMessage(t);if(this._compressed){this._state=fi,this.decompress(t,e);return}return t.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(t)),this.dataMessage()}decompress(e,t){this._extensions[nt.extensionName].decompress(e,this._fin,(s,n)=>{if(s)return t(s);if(n.length){if(this._messageLength+=n.length,this._messageLength>this._maxPayload&&this._maxPayload>0)return t(g(RangeError,"Max payload size exceeded",!1,1009));this._fragments.push(n)}let o=this.dataMessage();if(o)return t(o);this.startLoop(t)})}dataMessage(){if(this._fin){let e=this._messageLength,t=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._fragments=[],this._opcode===2){let r;this._binaryType==="nodebuffer"?r=le(t,e):this._binaryType==="arraybuffer"?r=ai(le(t,e)):r=t,this.emit("message",r)}else{let r=le(t,e);if(!ot(r))return this._loop=!1,g(Error,"invalid UTF-8 sequence",!0,1007);this.emit("message",r.toString())}}this._state=A}controlMessage(e){if(this._opcode===8)if(this._loop=!1,e.length===0)this.emit("conclude",1005,""),this.end();else{if(e.length===1)return g(RangeError,"invalid payload length 1",!0,1002);{let t=e.readUInt16BE(0);if(!ci(t))return g(RangeError,`invalid status code ${t}`,!0,1002);let r=e.slice(2);if(!ot(r))return g(Error,"invalid UTF-8 sequence",!0,1007);this.emit("conclude",t,r.toString()),this.end()}}else this._opcode===9?this.emit("ping",e):this.emit("pong",e);this._state=A}};st.exports=ft;function g(i,e,t,r){let s=new i(t?`Invalid WebSocket frame: ${e}`:e);return Error.captureStackTrace(s,g),s[ni]=r,s}});var he=_((yr,ht)=>{"use strict";var{randomFillSync:hi}=require("crypto"),dt=R(),{EMPTY_BUFFER:di}=L(),{isValidStatusCode:ui}=ae(),{mask:ut,toBuffer:b}=U(),O=Buffer.alloc(4),w=class{constructor(e,t){this._extensions=t||{},this._socket=e,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._deflating=!1,this._queue=[]}static frame(e,t){let r=t.mask&&t.readOnly,s=t.mask?6:2,n=e.length;e.length>=65536?(s+=8,n=127):e.length>125&&(s+=2,n=126);let o=Buffer.allocUnsafe(r?e.length+s:s);return o[0]=t.fin?t.opcode|128:t.opcode,t.rsv1&&(o[0]|=64),o[1]=n,n===126?o.writeUInt16BE(e.length,2):n===127&&(o.writeUInt32BE(0,2),o.writeUInt32BE(e.length,6)),t.mask?(hi(O,0,4),o[1]|=128,o[s-4]=O[0],o[s-3]=O[1],o[s-2]=O[2],o[s-1]=O[3],r?(ut(e,O,o,s,e.length),[o]):(ut(e,O,e,0,e.length),[o,e])):[o,e]}close(e,t,r,s){let n;if(e===void 0)n=di;else{if(typeof e!="number"||!ui(e))throw new TypeError("First argument must be a valid error code number");if(t===void 0||t==="")n=Buffer.allocUnsafe(2),n.writeUInt16BE(e,0);else{let o=Buffer.byteLength(t);if(o>123)throw new RangeError("The message must not be greater than 123 bytes");n=Buffer.allocUnsafe(2+o),n.writeUInt16BE(e,0),n.write(t,2)}}this._deflating?this.enqueue([this.doClose,n,r,s]):this.doClose(n,r,s)}doClose(e,t,r){this.sendFrame(w.frame(e,{fin:!0,rsv1:!1,opcode:8,mask:t,readOnly:!1}),r)}ping(e,t,r){let s=b(e);if(s.length>125)throw new RangeError("The data size must not be greater than 125 bytes");this._deflating?this.enqueue([this.doPing,s,t,b.readOnly,r]):this.doPing(s,t,b.readOnly,r)}doPing(e,t,r,s){this.sendFrame(w.frame(e,{fin:!0,rsv1:!1,opcode:9,mask:t,readOnly:r}),s)}pong(e,t,r){let s=b(e);if(s.length>125)throw new RangeError("The data size must not be greater than 125 bytes");this._deflating?this.enqueue([this.doPong,s,t,b.readOnly,r]):this.doPong(s,t,b.readOnly,r)}doPong(e,t,r,s){this.sendFrame(w.frame(e,{fin:!0,rsv1:!1,opcode:10,mask:t,readOnly:r}),s)}send(e,t,r){let s=b(e),n=this._extensions[dt.extensionName],o=t.binary?2:1,c=t.compress;if(this._firstFragment?(this._firstFragment=!1,c&&n&&(c=s.length>=n._threshold),this._compress=c):(c=!1,o=0),t.fin&&(this._firstFragment=!0),n){let l={fin:t.fin,rsv1:c,opcode:o,mask:t.mask,readOnly:b.readOnly};this._deflating?this.enqueue([this.dispatch,s,this._compress,l,r]):this.dispatch(s,this._compress,l,r)}else this.sendFrame(w.frame(s,{fin:t.fin,rsv1:!1,opcode:o,mask:t.mask,readOnly:b.readOnly}),r)}dispatch(e,t,r,s){if(!t){this.sendFrame(w.frame(e,r),s);return}let n=this._extensions[dt.extensionName];this._bufferedBytes+=e.length,this._deflating=!0,n.compress(e,r.fin,(o,c)=>{if(this._socket.destroyed){let l=new Error("The socket was closed while data was being compressed");typeof s=="function"&&s(l);for(let a=0;a<this._queue.length;a++){let f=this._queue[a][4];typeof f=="function"&&f(l)}return}this._bufferedBytes-=e.length,this._deflating=!1,r.readOnly=!1,this.sendFrame(w.frame(c,r),s),this.dequeue()})}dequeue(){for(;!this._deflating&&this._queue.length;){let e=this._queue.shift();this._bufferedBytes-=e[1].length,Reflect.apply(e[0],this,e.slice(1))}}enqueue(e){this._bufferedBytes+=e[1].length,this._queue.push(e)}sendFrame(e,t){e.length===2?(this._socket.cork(),this._socket.write(e[0]),this._socket.write(e[1],t),this._socket.uncork()):this._socket.write(e[0],t)}};ht.exports=w});var xt=_((br,pt)=>{"use strict";var F=class{constructor(e,t){this.target=t,this.type=e}},mt=class extends F{constructor(e,t){super("message",t);this.data=e}},gt=class extends F{constructor(e,t,r){super("close",r);this.wasClean=r._closeFrameReceived&&r._closeFrameSent,this.reason=t,this.code=e}},_t=class extends F{constructor(e){super("open",e)}},vt=class extends F{constructor(e,t){super("error",t);this.message=e.message,this.error=e}},pi={addEventListener(i,e,t){if(typeof e!="function")return;function r(l){e.call(this,new mt(l,this))}function s(l,a){e.call(this,new gt(l,a,this))}function n(l){e.call(this,new vt(l,this))}function o(){e.call(this,new _t(this))}let c=t&&t.once?"once":"on";i==="message"?(r._listener=e,this[c](i,r)):i==="close"?(s._listener=e,this[c](i,s)):i==="error"?(n._listener=e,this[c](i,n)):i==="open"?(o._listener=e,this[c](i,o)):this[c](i,e)},removeEventListener(i,e){let t=this.listeners(i);for(let r=0;r<t.length;r++)(t[r]===e||t[r]._listener===e)&&this.removeListener(i,t[r])}};pt.exports=pi});var de=_((wr,yt)=>{"use strict";var j=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function x(i,e,t){i[e]===void 0?i[e]=[t]:i[e].push(t)}function mi(i){let e=Object.create(null);if(i===void 0||i==="")return e;let t=Object.create(null),r=!1,s=!1,n=!1,o,c,l=-1,a=-1,f=0;for(;f<i.length;f++){let h=i.charCodeAt(f);if(o===void 0)if(a===-1&&j[h]===1)l===-1&&(l=f);else if(h===32||h===9)a===-1&&l!==-1&&(a=f);else if(h===59||h===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${f}`);a===-1&&(a=f);let u=i.slice(l,a);h===44?(x(e,u,t),t=Object.create(null)):o=u,l=a=-1}else throw new SyntaxError(`Unexpected character at index ${f}`);else if(c===void 0)if(a===-1&&j[h]===1)l===-1&&(l=f);else if(h===32||h===9)a===-1&&l!==-1&&(a=f);else if(h===59||h===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${f}`);a===-1&&(a=f),x(t,i.slice(l,a),!0),h===44&&(x(e,o,t),t=Object.create(null),o=void 0),l=a=-1}else if(h===61&&l!==-1&&a===-1)c=i.slice(l,f),l=a=-1;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(s){if(j[h]!==1)throw new SyntaxError(`Unexpected character at index ${f}`);l===-1?l=f:r||(r=!0),s=!1}else if(n)if(j[h]===1)l===-1&&(l=f);else if(h===34&&l!==-1)n=!1,a=f;else if(h===92)s=!0;else throw new SyntaxError(`Unexpected character at index ${f}`);else if(h===34&&i.charCodeAt(f-1)===61)n=!0;else if(a===-1&&j[h]===1)l===-1&&(l=f);else if(l!==-1&&(h===32||h===9))a===-1&&(a=f);else if(h===59||h===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${f}`);a===-1&&(a=f);let u=i.slice(l,a);r&&(u=u.replace(/\\/g,""),r=!1),x(t,c,u),h===44&&(x(e,o,t),t=Object.create(null),o=void 0),c=void 0,l=a=-1}else throw new SyntaxError(`Unexpected character at index ${f}`)}if(l===-1||n)throw new SyntaxError("Unexpected end of input");a===-1&&(a=f);let m=i.slice(l,a);return o===void 0?x(e,m,t):(c===void 0?x(t,m,!0):r?x(t,c,m.replace(/\\/g,"")):x(t,c,m),x(e,o,t)),e}function gi(i){return Object.keys(i).map(e=>{let t=i[e];return Array.isArray(t)||(t=[t]),t.map(r=>[e].concat(Object.keys(r).map(s=>{let n=r[s];return Array.isArray(n)||(n=[n]),n.map(o=>o===!0?s:`${s}=${o}`).join("; ")})).join("; ")).join(", ")}).join(", ")}yt.exports={format:gi,parse:mi}});var _e=_((Sr,bt)=>{"use strict";var _i=require("events"),vi=require("https"),xi=require("http"),wt=require("net"),yi=require("tls"),{randomBytes:bi,createHash:wi}=require("crypto"),{URL:ue}=require("url"),C=R(),Si=fe(),Ei=he(),{BINARY_TYPES:St,EMPTY_BUFFER:pe,GUID:ki,kStatusCode:Ci,kWebSocket:v,NOOP:Et}=L(),{addEventListener:Ti,removeEventListener:Li}=xt(),{format:Oi,parse:Ni}=de(),{toBuffer:$i}=U(),kt=["CONNECTING","OPEN","CLOSING","CLOSED"],me=[8,13],Bi=30*1e3,d=class extends _i{constructor(e,t,r){super();this._binaryType=St[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage="",this._closeTimer=null,this._extensions={},this._protocol="",this._readyState=d.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,e!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,Array.isArray(t)?t=t.join(", "):typeof t=="object"&&t!==null&&(r=t,t=void 0),Ct(this,e,t,r)):this._isServer=!0}get binaryType(){return this._binaryType}set binaryType(e){!St.includes(e)||(this._binaryType=e,this._receiver&&(this._receiver._binaryType=e))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(e,t,r){let s=new Si(this.binaryType,this._extensions,this._isServer,r);this._sender=new Ei(e,this._extensions),this._receiver=s,this._socket=e,s[v]=this,e[v]=this,s.on("conclude",Pi),s.on("drain",Ii),s.on("error",Mi),s.on("message",Ui),s.on("ping",qi),s.on("pong",Di),e.setTimeout(0),e.setNoDelay(),t.length>0&&e.unshift(t),e.on("close",Tt),e.on("data",Y),e.on("end",Lt),e.on("error",Ot),this._readyState=d.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=d.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[C.extensionName]&&this._extensions[C.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=d.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(e,t){if(this.readyState!==d.CLOSED){if(this.readyState===d.CONNECTING){let r="WebSocket was closed before the connection was established";return S(this,this._req,r)}if(this.readyState===d.CLOSING){this._closeFrameSent&&this._closeFrameReceived&&this._socket.end();return}this._readyState=d.CLOSING,this._sender.close(e,t,!this._isServer,r=>{r||(this._closeFrameSent=!0,this._closeFrameReceived&&this._socket.end())}),this._closeTimer=setTimeout(this._socket.destroy.bind(this._socket),Bi)}}ping(e,t,r){if(this.readyState===d.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof e=="function"?(r=e,e=t=void 0):typeof t=="function"&&(r=t,t=void 0),typeof e=="number"&&(e=e.toString()),this.readyState!==d.OPEN){ge(this,e,r);return}t===void 0&&(t=!this._isServer),this._sender.ping(e||pe,t,r)}pong(e,t,r){if(this.readyState===d.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof e=="function"?(r=e,e=t=void 0):typeof t=="function"&&(r=t,t=void 0),typeof e=="number"&&(e=e.toString()),this.readyState!==d.OPEN){ge(this,e,r);return}t===void 0&&(t=!this._isServer),this._sender.pong(e||pe,t,r)}send(e,t,r){if(this.readyState===d.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"&&(r=t,t={}),typeof e=="number"&&(e=e.toString()),this.readyState!==d.OPEN){ge(this,e,r);return}let s={binary:typeof e!="string",mask:!this._isServer,compress:!0,fin:!0,...t};this._extensions[C.extensionName]||(s.compress=!1),this._sender.send(e||pe,s,r)}terminate(){if(this.readyState!==d.CLOSED){if(this.readyState===d.CONNECTING){let e="WebSocket was closed before the connection was established";return S(this,this._req,e)}this._socket&&(this._readyState=d.CLOSING,this._socket.destroy())}}};kt.forEach((i,e)=>{let t={enumerable:!0,value:e};Object.defineProperty(d.prototype,i,t),Object.defineProperty(d,i,t)});["binaryType","bufferedAmount","extensions","protocol","readyState","url"].forEach(i=>{Object.defineProperty(d.prototype,i,{enumerable:!0})});["open","error","close","message"].forEach(i=>{Object.defineProperty(d.prototype,`on${i}`,{configurable:!0,enumerable:!0,get(){let e=this.listeners(i);for(let t=0;t<e.length;t++)if(e[t]._listener)return e[t]._listener},set(e){let t=this.listeners(i);for(let r=0;r<t.length;r++)t[r]._listener&&this.removeListener(i,t[r]);this.addEventListener(i,e)}})});d.prototype.addEventListener=Ti;d.prototype.removeEventListener=Li;bt.exports=d;function Ct(i,e,t,r){let s={protocolVersion:me[1],maxPayload:100*1024*1024,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...r,createConnection:void 0,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:void 0,host:void 0,path:void 0,port:void 0};if(!me.includes(s.protocolVersion))throw new RangeError(`Unsupported protocol version: ${s.protocolVersion} (supported versions: ${me.join(", ")})`);let n;e instanceof ue?(n=e,i._url=e.href):(n=new ue(e),i._url=e);let o=n.protocol==="ws+unix:";if(!n.host&&(!o||!n.pathname))throw new Error(`Invalid URL: ${i.url}`);let c=n.protocol==="wss:"||n.protocol==="https:",l=c?443:80,a=bi(16).toString("base64"),f=c?vi.get:xi.get,m;if(s.createConnection=c?Ai:Ri,s.defaultPort=s.defaultPort||l,s.port=n.port||l,s.host=n.hostname.startsWith("[")?n.hostname.slice(1,-1):n.hostname,s.headers={"Sec-WebSocket-Version":s.protocolVersion,"Sec-WebSocket-Key":a,Connection:"Upgrade",Upgrade:"websocket",...s.headers},s.path=n.pathname+n.search,s.timeout=s.handshakeTimeout,s.perMessageDeflate&&(m=new C(s.perMessageDeflate!==!0?s.perMessageDeflate:{},!1,s.maxPayload),s.headers["Sec-WebSocket-Extensions"]=Oi({[C.extensionName]:m.offer()})),t&&(s.headers["Sec-WebSocket-Protocol"]=t),s.origin&&(s.protocolVersion<13?s.headers["Sec-WebSocket-Origin"]=s.origin:s.headers.Origin=s.origin),(n.username||n.password)&&(s.auth=`${n.username}:${n.password}`),o){let u=s.path.split(":");s.socketPath=u[0],s.path=u[1]}let h=i._req=f(s);s.timeout&&h.on("timeout",()=>{S(i,h,"Opening handshake has timed out")}),h.on("error",u=>{h===null||h.aborted||(h=i._req=null,i._readyState=d.CLOSING,i.emit("error",u),i.emitClose())}),h.on("response",u=>{let T=u.headers.location,W=u.statusCode;if(T&&s.followRedirects&&W>=300&&W<400){if(++i._redirects>s.maxRedirects){S(i,h,"Maximum redirects exceeded");return}h.abort();let Z=new ue(T,e);Ct(i,Z,t,r)}else i.emit("unexpected-response",h,u)||S(i,h,`Unexpected server response: ${u.statusCode}`)}),h.on("upgrade",(u,T,W)=>{if(i.emit("upgrade",u),i.readyState!==d.CONNECTING)return;h=i._req=null;let Z=wi("sha1").update(a+ki).digest("base64");if(u.headers["sec-websocket-accept"]!==Z){S(i,T,"Invalid Sec-WebSocket-Accept header");return}let B=u.headers["sec-websocket-protocol"],zt=(t||"").split(/, */),M;if(!t&&B?M="Server sent a subprotocol but none was requested":t&&!B?M="Server sent no subprotocol":B&&!zt.includes(B)&&(M="Server sent an invalid subprotocol"),M){S(i,T,M);return}if(B&&(i._protocol=B),m)try{let J=Ni(u.headers["sec-websocket-extensions"]);J[C.extensionName]&&(m.accept(J[C.extensionName]),i._extensions[C.extensionName]=m)}catch(J){S(i,T,"Invalid Sec-WebSocket-Extensions header");return}i.setSocket(T,W,s.maxPayload)})}function Ri(i){return i.path=i.socketPath,wt.connect(i)}function Ai(i){return i.path=void 0,!i.servername&&i.servername!==""&&(i.servername=wt.isIP(i.host)?"":i.host),yi.connect(i)}function S(i,e,t){i._readyState=d.CLOSING;let r=new Error(t);Error.captureStackTrace(r,S),e.setHeader?(e.abort(),e.socket&&!e.socket.destroyed&&e.socket.destroy(),e.once("abort",i.emitClose.bind(i)),i.emit("error",r)):(e.destroy(r),e.once("error",i.emit.bind(i,"error")),e.once("close",i.emitClose.bind(i)))}function ge(i,e,t){if(e){let r=$i(e).length;i._socket?i._sender._bufferedBytes+=r:i._bufferedAmount+=r}if(t){let r=new Error(`WebSocket is not open: readyState ${i.readyState} (${kt[i.readyState]})`);t(r)}}function Pi(i,e){let t=this[v];t._socket.removeListener("data",Y),t._socket.resume(),t._closeFrameReceived=!0,t._closeMessage=e,t._closeCode=i,i===1005?t.close():t.close(i,e)}function Ii(){this[v]._socket.resume()}function Mi(i){let e=this[v];e._socket.removeListener("data",Y),e._readyState=d.CLOSING,e._closeCode=i[Ci],e.emit("error",i),e._socket.destroy()}function Nt(){this[v].emitClose()}function Ui(i){this[v].emit("message",i)}function qi(i){let e=this[v];e.pong(i,!e._isServer,Et),e.emit("ping",i)}function Di(i){this[v].emit("pong",i)}function Tt(){let i=this[v];this.removeListener("close",Tt),this.removeListener("end",Lt),i._readyState=d.CLOSING,i._socket.read(),i._receiver.end(),this.removeListener("data",Y),this[v]=void 0,clearTimeout(i._closeTimer),i._receiver._writableState.finished||i._receiver._writableState.errorEmitted?i.emitClose():(i._receiver.on("error",Nt),i._receiver.on("finish",Nt))}function Y(i){this[v]._receiver.write(i)||this.pause()}function Lt(){let i=this[v];i._readyState=d.CLOSING,i._receiver.end(),this.end()}function Ot(){let i=this[v];this.removeListener("error",Ot),this.on("error",Et),i&&(i._readyState=d.CLOSING,this.destroy())}});var It=_((Er,$t)=>{"use strict";var{Duplex:Fi}=require("stream");function Bt(i){i.emit("close")}function ji(){!this.destroyed&&this._writableState.finished&&this.destroy()}function Pt(i){this.removeListener("error",Pt),this.destroy(),this.listenerCount("error")===0&&this.emit("error",i)}function zi(i,e){let t=!0;function r(){t&&i._socket.resume()}i.readyState===i.CONNECTING?i.once("open",function(){i._receiver.removeAllListeners("drain"),i._receiver.on("drain",r)}):(i._receiver.removeAllListeners("drain"),i._receiver.on("drain",r));let s=new Fi({...e,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return i.on("message",function(o){s.push(o)||(t=!1,i._socket.pause())}),i.once("error",function(o){s.destroyed||s.destroy(o)}),i.once("close",function(){s.destroyed||s.push(null)}),s._destroy=function(n,o){if(i.readyState===i.CLOSED){o(n),process.nextTick(Bt,s);return}let c=!1;i.once("error",function(a){c=!0,o(a)}),i.once("close",function(){c||o(n),process.nextTick(Bt,s)}),i.terminate()},s._final=function(n){if(i.readyState===i.CONNECTING){i.once("open",function(){s._final(n)});return}i._socket!==null&&(i._socket._writableState.finished?(n(),s._readableState.endEmitted&&s.destroy()):(i._socket.once("finish",function(){n()}),i.close()))},s._read=function(){i.readyState===i.OPEN&&!t&&(t=!0,i._receiver._writableState.needDrain||i._socket.resume())},s._write=function(n,o,c){if(i.readyState===i.CONNECTING){i.once("open",function(){s._write(n,o,c)});return}i.send(n,c)},s.on("end",ji),s.on("error",Pt),s}$t.exports=zi});var qt=_((kr,Mt)=>{"use strict";var Wi=require("events"),{createHash:Gi}=require("crypto"),{createServer:Vi,STATUS_CODES:ve}=require("http"),N=R(),Hi=_e(),{format:Yi,parse:Ki}=de(),{GUID:Zi,kWebSocket:Ji}=L(),Qi=/^[+/0-9A-Za-z]{22}==$/,Ut=class extends Wi{constructor(e,t){super();if(e={maxPayload:100*1024*1024,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,...e},e.port==null&&!e.server&&!e.noServer)throw new TypeError('One of the "port", "server", or "noServer" options must be specified');if(e.port!=null?(this._server=Vi((r,s)=>{let n=ve[426];s.writeHead(426,{"Content-Length":n.length,"Content-Type":"text/plain"}),s.end(n)}),this._server.listen(e.port,e.host,e.backlog,t)):e.server&&(this._server=e.server),this._server){let r=this.emit.bind(this,"connection");this._removeListeners=Xi(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(s,n,o)=>{this.handleUpgrade(s,n,o,r)}})}e.perMessageDeflate===!0&&(e.perMessageDeflate={}),e.clientTracking&&(this.clients=new Set),this.options=e}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(e){if(e&&this.once("close",e),this.clients)for(let r of this.clients)r.terminate();let t=this._server;if(t&&(this._removeListeners(),this._removeListeners=this._server=null,this.options.port!=null)){t.close(()=>this.emit("close"));return}process.nextTick(er,this)}shouldHandle(e){if(this.options.path){let t=e.url.indexOf("?");if((t!==-1?e.url.slice(0,t):e.url)!==this.options.path)return!1}return!0}handleUpgrade(e,t,r,s){t.on("error",xe);let n=e.headers["sec-websocket-key"]!==void 0?e.headers["sec-websocket-key"].trim():!1,o=+e.headers["sec-websocket-version"],c={};if(e.method!=="GET"||e.headers.upgrade.toLowerCase()!=="websocket"||!n||!Qi.test(n)||o!==8&&o!==13||!this.shouldHandle(e))return K(t,400);if(this.options.perMessageDeflate){let l=new N(this.options.perMessageDeflate,!0,this.options.maxPayload);try{let a=Ki(e.headers["sec-websocket-extensions"]);a[N.extensionName]&&(l.accept(a[N.extensionName]),c[N.extensionName]=l)}catch(a){return K(t,400)}}if(this.options.verifyClient){let l={origin:e.headers[`${o===8?"sec-websocket-origin":"origin"}`],secure:!!(e.socket.authorized||e.socket.encrypted),req:e};if(this.options.verifyClient.length===2){this.options.verifyClient(l,(a,f,m,h)=>{if(!a)return K(t,f||401,m,h);this.completeUpgrade(n,c,e,t,r,s)});return}if(!this.options.verifyClient(l))return K(t,401)}this.completeUpgrade(n,c,e,t,r,s)}completeUpgrade(e,t,r,s,n,o){if(!s.readable||!s.writable)return s.destroy();if(s[Ji])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");let c=Gi("sha1").update(e+Zi).digest("base64"),l=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${c}`],a=new Hi(null),f=r.headers["sec-websocket-protocol"];if(f&&(f=f.trim().split(/ *, */),this.options.handleProtocols?f=this.options.handleProtocols(f,r):f=f[0],f&&(l.push(`Sec-WebSocket-Protocol: ${f}`),a._protocol=f)),t[N.extensionName]){let m=t[N.extensionName].params,h=Yi({[N.extensionName]:[m]});l.push(`Sec-WebSocket-Extensions: ${h}`),a._extensions=t}this.emit("headers",l,r),s.write(l.concat(`\r
`).join(`\r
`)),s.removeListener("error",xe),a.setSocket(s,n,this.options.maxPayload),this.clients&&(this.clients.add(a),a.on("close",()=>this.clients.delete(a))),o(a,r)}};Mt.exports=Ut;function Xi(i,e){for(let t of Object.keys(e))i.on(t,e[t]);return function(){for(let r of Object.keys(e))i.removeListener(r,e[r])}}function er(i){i.emit("close")}function xe(){this.destroy()}function K(i,e,t,r){i.writable&&(t=t||ve[e],r={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(t),...r},i.write(`HTTP/1.1 ${e} ${ve[e]}\r
`+Object.keys(r).map(s=>`${s}: ${r[s]}`).join(`\r
`)+`\r
\r
`+t)),i.removeListener("error",xe),i.destroy()}});var Rt=_((Cr,Dt)=>{"use strict";var z=_e();z.createWebSocketStream=It();z.Server=qt();z.Receiver=fe();z.Sender=he();Dt.exports=z});var p=require("vscode"),At=require("fs"),ye=require("path"),tr=require("child_process"),I=p.window.activeTextEditor,$=p.window.createOutputChannel("Novel"),Ft="";function sr(i){i.subscriptions.push(p.commands.registerCommand("Novel.vertical-preview",ir)),i.subscriptions.push(p.commands.registerCommand("Novel.export-pdf",rr)),i.subscriptions.push(p.commands.registerCommand("Novel.launch-preview-server",jt)),Ft=At.readFileSync(ye.join(i.extensionPath,"htdocs","index.html"))}function jt(i){let e=require("http"),t=p.workspace.workspaceFolders[0].uri.fsPath;var r=e.createServer(function(o,c){c.writeHead(200,{"Content-Type":"text/html","Cache-Control":"private, max-age=0"}),c.end(Ft)});r.listen(8080);let s=Rt().Server,n=new s({port:5001});return n.on("connection",o=>{o.on("message",c=>{console.log("Received: "+c),console.log(be()),c==="hello"?o.send(JSON.stringify(be())):c==="givemedata"&&(console.log("sending body"),o.send(Se(i)))})}),p.workspace.onDidChangeTextDocument(o=>{var c;o.document==((c=p.window.activeTextEditor)===null||c===void 0?void 0:c.document)&&we.presskey(n)}),p.window.onDidChangeTextEditorSelection(o=>{o.textEditor==p.window.activeTextEditor&&we.presskey(n)}),p.workspace.onDidChangeConfiguration(o=>{console.log("setting changed"),nr(n)}),we.presskey(n),n}function or(i){i.clients.forEach(e=>{e.send(Se("active"))})}function nr(i){i.clients.forEach(e=>{e.send(JSON.stringify(be()))})}function be(){let i=p.workspace.getConfiguration("Novel"),e=1.75,t=i.get("preview.font-family"),r=i.get("preview.fontsize"),s=parseInt(/(\d+)(\D+)/.exec(r)[1]),n=/(\d+)(\D+)/.exec(r)[2],o=i.get("preview.linelength"),c=i.get("preview.linesperpage"),l=c*s*e*1.003+n,a=o*s+n,f=s*e+n;return{lineheightrate:e,fontfamily:t,fontsize:r,numfontsize:s,unitoffontsize:n,linelength:o,linesperpage:c,pagewidth:l,pageheight:a,lineheight:f}}var Ee=!1,we={publish:function(i){or(i),Ee=!1,delete this.timeoutID},presskey:function(i){if(!Ee){var e=Math.ceil(p.window.activeTextEditor.document.getText().length/10),t=this,r=i,s=s;this.timeoutID=setTimeout(function(n){t.publish(n)},e,r),Ee=!0}},cancel:function(){typeof this.timeoutID=="number"&&(window.clearTimeout(this.timeoutID),delete this.timeoutID)}};function ir(){var i=p.window.activeTextEditor,e=jt(i);let t=p.window.createWebviewPanel("preview","\u539F\u7A3F\u30D7\u30EC\u30D3\u30E5\u30FC",p.ViewColumn.Two,{enableScripts:!0});t.webview.html=`
    <html>
        <head>
            <style>
            body{
                width:100vw;
                height:100vh;
                overflor:hidden;
            }
            </style>
        </head>
        <body>
            <iframe src="http://localhost:8080" frameBorder="0" style="min-width: 100%; min-height: 100%" />
        </body>
    </html>`}function rr(){let i=ar(),e=p.workspace.workspaceFolders[0].uri.fsPath,t=ye.join(e,"publish.html"),r=ye.join(e,""),s="vivliostyle build ",n=t;n=n.replace(/ /g,"\\ ");let o=r;o=o.replace(/ /g,"\\ "),$.appendLine(`startig to publish: ${n}`),s=s+n+" -o "+o+"/output.pdf",$.appendLine(`startig to publish: ${s}`),At.writeFile(t,i,c=>{c&&console.log(c),$.appendLine(`saving pdf to ${s}`),tr.exec(s,(l,a,f)=>{if(l){console.log(`stderr: ${f}`),$.appendLine(`stderr: ${f}`);return}$.appendLine(`stdout: ${a}`),$.appendLine("PDF\u306E\u4FDD\u5B58\u304C\u7D42\u308F\u308A\u307E\u3057\u305F")}),$.appendLine("HTML\u306E\u66F8\u304D\u8FBC\u307F\u304C\u5B8C\u4E86\u3057\u307E\u3057\u305F")})}function lr(){}module.exports={activate:sr,deactivate:lr};function Se(i){i==="active"?I=p.window.activeTextEditor:I=i;let e=I.document.getText(),t=I?I.document.offsetAt(I.selection.anchor):0;var r="";let s="";return e.slice(t,t+1)==`
`?s=e.slice(0,t)+'<span id="cursor">\u3000</span>'+e.slice(t):s=e.slice(0,t)+'<span id="cursor">'+e.slice(t,t+1)+"</span>"+e.slice(t+1),s.split(`
`).forEach(o=>{o.match(/^\s*$/)?r+='<p class="blank">_'+o+"</p>":o.match(/^<span id="cursor">$/)||o.match(/^<\/span>$/)?r+='<p class="blank">_</p><span id="cursor">':r+="<p>"+o+"</p>"}),cr(r)}function cr(i){var e=i;let t=p.workspace.getConfiguration("Novel"),r=new Array(0);return r=t.get("preview.userregex"),r.length>0&&r.forEach(function(s,n){var o=new RegExp(s[0],"gi"),c=s[1];e=e.replace(o,c)}),e=e.replace(/<p>［＃ここから[１1一]文字下げ］<\/p>/g,'<div class="indent-1">'),e=e.replace(/<p>［＃ここから[２2二]文字下げ］<\/p>/g,'<div class="indent-2">'),e=e.replace(/<p>［＃ここから[３3三]文字下げ］<\/p>/g,'<div class="indent-3">'),e=e.replace(/<p>［＃ここで字下げ終わり］<\/p>/g,"</div>"),e=e.replace(/<!-- (.+?) -->/g,'<span class="comment"><span class="commentbody">$1</span></span>'),e=e.replace(/｜([^｜\n]+?)《([^《]+?)》/g,"<ruby>$1<rt>$2</rt></ruby>"),e=e.replace(/([一-鿏々-〇]+?)《(.+?)》/g,"<ruby>$1<rt>$2</rt></ruby>"),e=e.replace(/(.+?)［＃「\1」に傍点］/g,'<em class="side-dot">$1</em>'),e}function ar(){let i=p.workspace.getConfiguration("Novel"),e=1.75,t=i.get("preview.font-family"),r=i.get("preview.fontsize"),s=parseInt(/(\d+)(\D+)/.exec(r)[1]),n=/(\d+)(\D+)/.exec(r)[2],o=i.get("preview.linelength"),l=i.get("preview.linesperpage")*s*e*1.003+n,a=o*s+n,f=s*e+n;var m=Se("active");return`<!DOCTYPE html>
  <html lang="ja">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cat Coding</title>

      <style>
      @charset "UTF-8";
      html {
      /* \u7D44\u307F\u65B9\u5411 */
      -epub-writing-mode: vertical-rl;
      -ms-writing-mode: tb-rl;
      writing-mode: vertical-rl;
  
      orphans: 1;
      widows: 1;
      }
  
      * {
      margin: 0;
      padding: 0;
      }
  
      @page {
      size: 105mm 148mm;
      width: 88mm;
      /*  width: calc(84mm - 1q); */
      height: 110mm;
      margin-top: 20mm;
      margin-bottom: auto;
      margin-left: auto;
      margin-right: auto;
      /* \u4EE5\u4E0B\u3001\u30DE\u30FC\u30B8\u30F3\u30DC\u30C3\u30AF\u30B9\u306B\u7D99\u627F\u3055\u308C\u308B */
      font-size: 6pt;
      font-family: "\u6E38\u660E\u671D", "YuMincho", serif;
      /* \u672C\u6765\u4E0D\u8981\uFF08<span class="smaller"><span class="smaller">\u30EB\u30FC\u30C8\u8981\u7D20\u306E\u6307\u5B9A\u304C\u7D99\u627F\u3055\u308C\u308B</span></span>\uFF09\u3060\u304C\u3001\u73FE\u6642\u70B9\u306Evivliostyle.js\u306E\u5236\u9650\u306B\u3088\u308A\u5FC5\u8981 */
      vertical-align: top;
      }
  
      @page :left {
      margin-right: 10mm;
      @top-left {
          content: counter(page) "  <$projecttitle>";
          margin-left: 12q;
          margin-top: 135mm;
          writing-mode: horizontal-tb;
          /* CSS\u4ED5\u69D8\u4E0A\u306F@page\u30EB\u30FC\u30EB\u5185\u306B\u66F8\u3051\u3070\u3088\u3044\u304C\u3001\u73FE\u6642\u70B9\u306Evivliostyle.js\u306E\u5236\u9650\u306B\u3088\u308A\u3053\u3053\u306B\u66F8\u304F */
      }
      }
      @page :right {
      margin-right: 14mm;
      /* border-bottom: 1pt solid black; */
      /* \u53F3\u4E0B\u30CE\u30F3\u30D6\u30EB */
      @top-right {
          content: "<$fullname>\u3000 "counter(page);
          margin-right: 12q;
          margin-top: 135mm;
          writing-mode: horizontal-tb;
          /* CSS\u4ED5\u69D8\u4E0A\u306F@page\u30EB\u30FC\u30EB\u5185\u306B\u66F8\u3051\u3070\u3088\u3044\u304C\u3001\u73FE\u6642\u70B9\u306Evivliostyle.js\u306E\u5236\u9650\u306B\u3088\u308A\u3053\u3053\u306B\u66F8\u304F */
      }
      }
  
      html {
      font-family: "\u6E38\u660E\u671D", "YuMincho", serif;
      font-weight: Medium;
      text-align: justify;
      }
  
      body{
      }
  
      h1 {
      /* \u30D5\u30A9\u30F3\u30C8 */
      font-weight: Extrabold;
      /* \u30D5\u30A9\u30F3\u30C8\u30B5\u30A4\u30BA */
      font-size: 24q;
      /* \u5B57\u4E0B\u3052 */
      text-indent: 0;
      /* \u76F4\u5F8C\u306E\u6539\u30DA\u30FC\u30B8\u30FB\u6539\u6BB5\u7981\u6B62 */
      page-break-before: always;
      page-break-after: always;
      line-height: 42q;
      letter-spacing: 0.25em;
      display: flex;
      align-items: center;
      }
  
      h2 {
      /* \u30D5\u30A9\u30F3\u30C8 */
      font-weight: Demibold;
      /* \u30D5\u30A9\u30F3\u30C8\u30B5\u30A4\u30BA */
      font-size: 16q;
      /* \u5B57\u4E0B\u3052 */
      text-indent: 3em;
      /* \u76F4\u5F8C\u306E\u6539\u30DA\u30FC\u30B8\u30FB\u6539\u6BB5\u7981\u6B62 */
      page-break-before: always;
      page-break-after: avoid;
      line-height: 42q;
      margin-left: 2em;
      }
  
      h2.part {
      width: 80mm;
      padding: 0mm 35mm;
      font-weight: bold;
      font-size: 16q;
      page-break-before: always;
      page-break-after: always;
      margin-left: 4em;
      }
  
      h1 + h2 {
      margin-right: 16pt;
      }
  
      ruby > rt {
      font-size: 6.5q;
      }
  
      p {
        font-size: calc(110mm / ${o});
        line height: 1.65;
        text-indent: 0em;
        hanging-punctuation: force-end;
        line-break:strict;
        page-break-inside: auto;
    }
 
      div.indent-1 p:first-of-type, div.indent-2 p:first-of-type, div.indent-3 p:first-of-type{
        padding-block-start: calc( ${r} * ${e});
        }

        div.indent-1 p:last-of-type, div.indent-2 p:last-of-type, div.indent-3 p:last-of-type{
        padding-block-end: calc( ${r} * ${e});
        }

    
    div.indent-1 p{
    height: calc( 110mm - (${r}));
    padding-top: ${r};
    }

    div.indent-2 p{
    height: calc( 110mm - (${r} * 2));
    padding-top: calc(${r} * 2);
    }

    div.indent-3 p{
    height: calc( 110mm - (${r} * 3));
    padding-top: calc(${r} * 3);
    }

        p.goth {
        margin-top: 3em;
        font-family: "\u6E38\u30B4\u30B7\u30C3\u30AF", "YuGothic", san-serif;
        margin-block-start: 1em;
        margin-block-end: 1em;
        }
  
        p.align-rb {
        text-align: right;
        }

        p.goth + p.goth {
        margin-block-start: -1em;
        }

        div.codes {
        display: inline-block;
        margin: 3em 1em;
        writing-mode: horizontal-tb;
        padding: 1em;
        font-family: "Courier", monospace;
        font-size: 0.8em;
        }
  
      div.codes p {
      text-orientation: sideways;
      }
  
      p.star {
      text-indent: 3em;
      margin-right: 16pt;
      margin-left: 16pt;
      }
  
      hr {
      border: none;
      border-right: 1pt solid black;
      height: 6em;
      margin: auto 8.5pt;
      }
  
      /* \u7E26\u4E2D\u6A2A */
      .tcy {
      -webkit-text-combine: horizontal;
      text-combine: horizontal;
      -ms-text-combine-horizontal: all;
      text-combine-horizontal: digit 2;
      text-combine-upright: digit 2;
      }
  
      /* \u570F\u70B9\uFF08<span class="smaller">\u30B4\u30DE</span>\uFF09 */
      em.sesame_dot {
      font-style: normal;
      -webkit-text-emphasis-style: sesame;
      text-emphasis-style: sesame;
      }
  
      /*\u8457\u4F5C\u8005*/
      .author {
      position: absolute;
      bottom: 0;
      font-size: 8.5pt;
      margin-top: 50pt;
      letter-spacing: normal;
      }
  
      /*\u753B\u50CF\uFF0B\u30AD\u30E3\u30D7\u30B7\u30E7\u30F3*/
      figure {
      display: block;
      width: 236pt;
      -ms-writing-mode: lr-tb;
      -webkit-writing-mode: horizontal-tb;
      writing-mode: horizontal-tb;
      }
  
      figure img {
      width: 100%;
      height: auto;
      vertical-align: bottom;
      }
  
      figcaption {
      text-align: left;
      font-size: 7pt;
      }
  
      /*\u5965\u4ED8*/
      .colophon {
      font-size: 7pt;
      margin-right: 48pt;
      }
      /* \u7D1A\u3055\u3052 */
      span.smaller{
          font-size:6.5pt
      }
  
    div.comment {
        display:none;
    }

    p.blank {
        color:transparent;
    }

  @media screen{
      body {
            writing-mode: vertical-rl;
            font-family: ${t};
            height: ${a};
            overflow-y:hidden;
            padding:0;
        }
        
        #cursor {
            background-color: rgb(125,125,125,);
            animation-duration: 0.5s;
            animation-name: cursorAnimation;
            animation-iteration-count: infinite;
        }
  
        p {
            height: ${a};
            font-family: ${t};
            font-size: ${r};
            margin:0 0 0 0;
            vertical-align: middle;
        }
          
        em.side-dot {
            font-style: normal;
            text-emphasis: filled sesame rgb(128,128,128);
            -webkit-text-emphasis: filled sesame rgb(128,128,128);
        }
        
        span.tcy {
            text-combine: horizontal;
            -webkit-text-combine:horizontal;
        }

        @keyframes cursorAnimation {
                from {
                    background-color: rgba(66,66,66,0);
                }
            
                to {
                    background-color: rgba(125,125,125,0.7);
                }
            }
  
          body{
              background-image:   linear-gradient(to right, rgba(50, 50, 50, 0.5) 0.5pt, rgba(0, 0, 50, 0.05) 10em);
              background-size:    ${l} ${a};
              background-repeat:  repeat-x;
              background-position: right 0px;
          }
          p{
              background-image:   linear-gradient( rgba(50, 50, 50, 1) 0.5pt, transparent 1pt),
                                  linear-gradient(to right, rgba(50, 50, 50, 1) 0.5pt, rgba(0, 0, 50, 0.05) 1pt);
              background-size:    ${f} ${r},
                                  ${f} ${r};
              background-repeat:  repeat,
                                  repeat;
              background-position: right 0px,
                                  right 0px;
          }

          div.indent-1 p{
            height: calc( ${a} - (${r}));
            padding-top: ${r};
            }
        
            div.indent-2 p{
            height: calc( ${a} - (${r} * 2));
            padding-top: calc(${r} * 2);
            }
        
            div.indent-3 p{
            height: calc( ${a} - (${r} * 3));
            padding-top: calc(${r} * 3);
            }

        
          span.comment{
            display:block;
            border-radius:1em;
            border:1.5pt solid rgba(70,70,00,0.9);
            padding:0.25em 0.25em;
            position:absolute;
            margin-right: -3em;
            margin-top: 0.5em;
            top: ${a};
            background-color:rgba(50,50,00,0.5);
            max-width: 20em;
          }

          span.comment::before{
            content: '';
            position: absolute;
            right: 1em;
            top: -15px;
            display: block;
            width: 0;
            height: 0;
            border-right: 15px solid transparent;
            border-bottom: 15px solid rgba(70,70,00,0.9);
            border-left: 15px solid transparent;
          }

          span.commentbody{
              margin:0.5em 1em;
              writing-mode:lr-tb;
              font-family:sans-serif;
              font-size:0.8em;
              line-height:1;
          }
  
      }
        </style>
      <link rel="stylesheet" href="">
  </head>
  <body>
  ${m}
  
  <script>
  
  setTimeout( (function(){
      var width = document.body.clientWidth;
      var cursor = document.getElementById('cursor');
      var panelWidth = window.innerWidth;
      var scrollEnd = cursor.offsetLeft - width + (panelWidth / 2);
      window.scrollTo( scrollEnd , scrollEnd);
      console.log(width, cursor, panelWidth, scrollEnd);
  }), 1);

</script>
  </body>
  </html>`}
