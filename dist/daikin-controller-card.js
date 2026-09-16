function t(t,e,s,i){var o,n=arguments.length,r=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,s,r):o(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const r=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,i)},a=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,f=globalThis,m=f.trustedTypes,g=m?m.emptyScript:"",b=f.reactiveElementPolyfillSupport,_=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},y=(t,e)=>!c(t,e),$={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:y};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&l(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const n=i?.call(this);o?.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??$}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of i){const i=document.createElement("style"),o=e.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const n=o.fromAttribute(e,t.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(void 0!==t){const n=this.constructor;if(!1===i&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??y)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==o||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[_("elementProperties")]=new Map,x[_("finalized")]=new Map,b?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,w=t=>t,E=A.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,O="?"+k,P=`<${O}>`,U=document,M=()=>U.createComment(""),R=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,H="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,j=/>/g,D=RegExp(`>|${H}(?:([^\\s"'>=/]+)(${H}*=${H}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,L=/"/g,F=/^(?:script|style|textarea|title)$/i,I=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),W=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,K=U.createTreeWalker(U,129);function J(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Y=(t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":3===e?"<math>":"",r=N;for(let e=0;e<s;e++){const s=t[e];let a,c,l=-1,d=0;for(;d<s.length&&(r.lastIndex=d,c=r.exec(s),null!==c);)d=r.lastIndex,r===N?"!--"===c[1]?r=z:void 0!==c[1]?r=j:void 0!==c[2]?(F.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=D):void 0!==c[3]&&(r=D):r===D?">"===c[0]?(r=o??N,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?D:'"'===c[3]?L:B):r===L||r===B?r=D:r===z||r===j?r=N:(r=D,o=void 0);const h=r===D&&t[e+1].startsWith("/>")?" ":"";n+=r===N?s+P:l>=0?(i.push(a),s.slice(0,l)+C+s.slice(l)+k+h):s+k+(-2===l?e:h)}return[J(t,n+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,a=this.parts,[c,l]=Y(t,e);if(this.el=Z.createElement(c,s),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=K.nextNode())&&a.length<r;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(C)){const e=l[n++],s=i.getAttribute(t).split(k),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:o,name:r[2],strings:s,ctor:"."===r[1]?et:"?"===r[1]?st:"@"===r[1]?it:tt}),i.removeAttribute(t)}else t.startsWith(k)&&(a.push({type:6,index:o}),i.removeAttribute(t));if(F.test(i.tagName)){const t=i.textContent.split(k),e=t.length-1;if(e>0){i.textContent=E?E.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],M()),K.nextNode(),a.push({type:2,index:++o});i.append(t[e],M())}}}else if(8===i.nodeType)if(i.data===O)a.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(k,t+1));)a.push({type:7,index:o}),t+=k.length-1}o++}}static createElement(t,e){const s=U.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===W)return e;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=R(e)?void 0:e._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(t),o._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(e=G(t,o._$AS(t,e.values),o,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??U).importNode(e,!0);K.currentNode=i;let o=K.nextNode(),n=0,r=0,a=s[0];for(;void 0!==a;){if(n===a.index){let e;2===a.type?e=new X(o,o.nextSibling,this,t):1===a.type?e=new a.ctor(o,a.name,a.strings,this,t):6===a.type&&(e=new ot(o,this,t)),this._$AV.push(e),a=s[++r]}n!==a?.index&&(o=K.nextNode(),n++)}return K.currentNode=U,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),R(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>T(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&R(this._$AH)?this._$AA.nextSibling.data=t:this.T(U.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new Z(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new X(this.O(M()),this.O(M()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=w(t).nextSibling;w(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=G(this,t,e,0),n=!R(t)||t!==this._$AH&&t!==W,n&&(this._$AH=t);else{const i=t;let r,a;for(t=o[0],r=0;r<o.length-1;r++)a=G(this,i[s+r],e,r),a===W&&(a=this._$AH[r]),n||=!R(a)||a!==this._$AH[r],a===q?t=q:t!==q&&(t+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class it extends tt{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??q)===W)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const nt=A.litHtmlPolyfillSupport;nt?.(Z,X),(A.litHtmlVersions??=[]).push("3.3.3");const rt=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let o=i._$litPart$;if(void 0===o){const t=s?.renderBefore??null;i._$litPart$=o=new X(e.insertBefore(M(),t),t,void 0,s??{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const ct=rt.litElementPolyfillSupport;ct?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const lt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},dt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:y},ht=(t=dt,e,s)=>{const{kind:i,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const o=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,o,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];e.call(this,s),this.requestUpdate(i,o,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return pt({...t,state:!0,attribute:!1})}const ft={model:"BRC1E63",modes:["cool","heat","dry","fan_only","auto"],fanSpeeds:["auto","low","medium","high"],hasSwing:!0,hasSchedule:!1,compactLayout:!1},mt={BRC1E63:ft,BRC1H63K:{model:"BRC1H63K",modes:["cool","heat","dry","fan_only","auto"],fanSpeeds:["auto","low","medium","high"],hasSwing:!0,hasSchedule:!1,compactLayout:!1},BRC2E61:{model:"BRC2E61",modes:["cool","heat","dry","fan_only"],fanSpeeds:["auto","1","2","3","4","5"],hasSwing:!0,hasSchedule:!1,compactLayout:!0},BRC315D7:{model:"BRC315D7",modes:["cool","heat","dry","fan_only","auto"],fanSpeeds:["auto","low","medium","high"],hasSwing:!1,hasSchedule:!0,compactLayout:!1}},gt=Object.keys(mt);const bt={cool:"❄",heat:"☀",dry:"💧",fan_only:"🌀",auto:"↻",off:"⏻"},_t={cool:"COOL",heat:"HEAT",dry:"DRY",fan_only:"FAN",auto:"AUTO",off:"OFF"},vt={auto:"AUTO",low:"LOW",medium:"MED",high:"HIGH",1:"1",2:"2",3:"3",4:"4",5:"5"};let yt=class extends at{static getConfigElement(){return document.createElement("daikin-controller-card-editor")}static getStubConfig(){return{type:"custom:daikin-controller-card",entity:"",controller:"BRC1E63",name:""}}setConfig(t){if(!t.entity)throw new Error("Please define an entity");var e;this._config={...t,controller:t.controller??"BRC1E63"},this._skin=(e=this._config.controller,mt[e]??ft)}shouldUpdate(t){if(t.has("_config"))return!0;if(!this.hass||!this._config)return!1;const e=t.get("hass");if(!e)return!0;return e.states[this._config.entity]!==this.hass.states[this._config.entity]}get _entity(){return this.hass?.states[this._config.entity]}get _isOn(){return"off"!==this._entity?.state&&"unavailable"!==this._entity?.state}get _currentTemp(){const t=this._entity?.attributes.current_temperature;return null!=t?t.toFixed(1):"--.-"}get _setpoint(){const t=this._entity?.attributes.temperature;return null!=t?t.toFixed(1):"--.-"}get _unit(){return this._entity?.attributes.unit_of_measurement??"°C"}get _mode(){return this._entity?.state??"off"}get _fanMode(){return this._entity?.attributes.fan_mode??"auto"}get _hvacAction(){return this._entity?.attributes.hvac_action??"idle"}get _displayName(){return this._config.name||this._entity?.attributes.friendly_name||this._config.entity}async _callService(t,e){await this.hass.callService("climate",t,e,{entity_id:this._config.entity})}_togglePower(){if(this._isOn)this._callService("set_hvac_mode",{hvac_mode:"off"});else{const t=(this._entity?.attributes.hvac_modes??this._skin.modes).find(t=>"off"!==t)??"auto";this._callService("set_hvac_mode",{hvac_mode:t})}}_setMode(t){this._callService("set_hvac_mode",{hvac_mode:t})}_adjustTemp(t){const e=this._entity?.attributes.temperature;if(null==e)return;const s=this._entity?.attributes.target_temp_step??.5,i=this._entity?.attributes.min_temp??16,o=this._entity?.attributes.max_temp??30,n=Math.min(o,Math.max(i,e+t*s));this._callService("set_temperature",{temperature:n})}_cycleFan(){const t=this._entity?.attributes.fan_modes??this._skin.fanSpeeds,e=this._fanMode,s=t.indexOf(e),i=t[(s+1)%t.length];this._callService("set_fan_mode",{fan_mode:i})}render(){if(!this._config||!this.hass)return q;if(!this._entity)return I`
        <ha-card>
          <div class="error">Entity not found: ${this._config.entity}</div>
        </ha-card>
      `;const t=this._isOn,e=this._mode,s=this._hvacAction,i=this._skin.compactLayout;return I`
      <ha-card>
        <div class="controller ${i?"compact":""} ${t?"":"off"}">
          <!-- Top bar with model and name -->
          <div class="top-bar">
            <span class="model-label">${this._skin.model}</span>
            <span class="name-label">${this._displayName}</span>
          </div>

          <!-- LCD Display -->
          <div class="lcd ${t?`mode-${e}`:""}">
            <div class="lcd-inner">
              ${t?I`
                    <div class="lcd-top-row">
                      <span class="lcd-mode-icon">${bt[e]??""}</span>
                      <span class="lcd-mode-text">${_t[e]??e.toUpperCase()}</span>
                      <span class="lcd-action ${s}">${"idle"===s?"":s.toUpperCase()}</span>
                    </div>
                    <div class="lcd-temp-row">
                      <div class="lcd-current">
                        <span class="lcd-temp-label">ROOM</span>
                        <span class="lcd-temp-value">${this._currentTemp}</span>
                        <span class="lcd-temp-unit">${this._unit}</span>
                      </div>
                      <div class="lcd-divider"></div>
                      <div class="lcd-setpoint">
                        <span class="lcd-temp-label">SET</span>
                        <span class="lcd-temp-value">${this._setpoint}</span>
                        <span class="lcd-temp-unit">${this._unit}</span>
                      </div>
                    </div>
                    <div class="lcd-bottom-row">
                      <span class="lcd-fan-label">FAN</span>
                      <span class="lcd-fan-value">${vt[this._fanMode]??this._fanMode.toUpperCase()}</span>
                    </div>
                  `:I`
                    <div class="lcd-off">
                      <span class="lcd-off-icon">⏻</span>
                      <span class="lcd-off-text">OFF</span>
                    </div>
                  `}
            </div>
          </div>

          <!-- Controls -->
          <div class="controls">
            <!-- Power -->
            <button class="btn btn-power ${t?"on":""}" @click=${this._togglePower} title="Power">
              <span class="btn-icon">⏻</span>
              <span class="btn-label">ON/OFF</span>
            </button>

            <!-- Mode buttons -->
            <div class="mode-row">
              ${(this._entity?.attributes.hvac_modes??this._skin.modes).filter(t=>"off"!==t).map(s=>I`
                    <button
                      class="btn btn-mode ${e===s?"active":""}"
                      @click=${()=>this._setMode(s)}
                      ?disabled=${!t}
                      title=${_t[s]??s}
                    >
                      <span class="btn-icon">${bt[s]??"?"}</span>
                      <span class="btn-label">${_t[s]??s.toUpperCase()}</span>
                    </button>
                  `)}
            </div>

            <!-- Temp adjust -->
            <div class="temp-row">
              <button class="btn btn-temp" @click=${()=>this._adjustTemp(-1)} ?disabled=${!t} title="Decrease temperature">
                <span class="btn-icon">▼</span>
                <span class="btn-label">TEMP</span>
              </button>
              <button class="btn btn-temp" @click=${()=>this._adjustTemp(1)} ?disabled=${!t} title="Increase temperature">
                <span class="btn-icon">▲</span>
                <span class="btn-label">TEMP</span>
              </button>
            </div>

            <!-- Fan -->
            <button class="btn btn-fan" @click=${this._cycleFan} ?disabled=${!t} title="Fan speed">
              <span class="btn-icon">🌀</span>
              <span class="btn-label">FAN ${vt[this._fanMode]??""}</span>
            </button>
          </div>
        </div>
      </ha-card>
    `}};yt.styles=r`
    :host {
      --card-bg: #f0f2f5;
      --card-border: #c8ccd4;
      --lcd-bg: #c8d8c0;
      --lcd-text: #1a2e1a;
      --lcd-glow: rgba(100, 180, 100, 0.15);
      --btn-bg: #e0e3e8;
      --btn-hover: #d0d4da;
      --btn-active: #0073e6;
      --btn-active-text: #fff;
      --btn-text: #333;
      --btn-disabled: #bbb;
      --power-on: #22c55e;
      --power-off: #888;
      --mode-cool: #3b82f6;
      --mode-heat: #ef4444;
      --mode-dry: #f59e0b;
      --mode-fan: #8b5cf6;
      --mode-auto: #06b6d4;
      --top-bar-bg: #dde0e6;
      --top-bar-text: #555;
    }

    ha-card {
      overflow: hidden;
      background: none;
      border: none;
      box-shadow: none;
    }

    .controller {
      background: var(--card-bg);
      border: 2px solid var(--card-border);
      border-radius: 18px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 320px;
      margin: 0 auto;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6);
      transition: opacity 0.3s;
    }

    .controller.compact {
      max-width: 260px;
      padding: 12px;
      border-radius: 14px;
    }

    .controller.off {
      opacity: 0.85;
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 8px;
      background: var(--top-bar-bg);
      border-radius: 8px;
      font-size: 11px;
      font-weight: 600;
      color: var(--top-bar-text);
      letter-spacing: 0.03em;
    }

    .model-label {
      font-family: monospace;
      font-size: 10px;
      opacity: 0.7;
    }

    .name-label {
      text-transform: uppercase;
      font-size: 11px;
    }

    /* LCD */
    .lcd {
      background: var(--lcd-bg);
      border: 2px solid #a8b8a0;
      border-radius: 10px;
      padding: 2px;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.5);
    }

    .lcd-inner {
      background: linear-gradient(180deg, var(--lcd-bg) 0%, #b8c8b0 100%);
      border-radius: 8px;
      padding: 12px 14px;
      min-height: 80px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 6px;
    }

    .lcd.mode-cool { --lcd-bg: #b8d4e8; border-color: #90b0c8; }
    .lcd.mode-cool .lcd-inner { background: linear-gradient(180deg, #b8d4e8 0%, #a0c0d4 100%); }

    .lcd.mode-heat { --lcd-bg: #e8cbb8; border-color: #c8a890; }
    .lcd.mode-heat .lcd-inner { background: linear-gradient(180deg, #e8cbb8 0%, #d4b8a0 100%); }

    .lcd.mode-dry { --lcd-bg: #e0d8b8; border-color: #c0b890; }
    .lcd.mode-dry .lcd-inner { background: linear-gradient(180deg, #e0d8b8 0%, #d0c8a0 100%); }

    .lcd.mode-fan_only { --lcd-bg: #d0c8e0; border-color: #b0a8c0; }
    .lcd.mode-fan_only .lcd-inner { background: linear-gradient(180deg, #d0c8e0 0%, #c0b8d0 100%); }

    .lcd.mode-auto { --lcd-bg: #b8d8d8; border-color: #90b8b8; }
    .lcd.mode-auto .lcd-inner { background: linear-gradient(180deg, #b8d8d8 0%, #a0c8c8 100%); }

    .lcd-top-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      color: var(--lcd-text);
    }

    .lcd-mode-icon { font-size: 14px; }
    .lcd-mode-text { font-family: monospace; letter-spacing: 0.08em; }

    .lcd-action {
      margin-left: auto;
      font-size: 9px;
      font-family: monospace;
      opacity: 0.7;
      letter-spacing: 0.06em;
    }
    .lcd-action.heating { color: #b33; }
    .lcd-action.cooling { color: #338; }

    .lcd-temp-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .lcd-current,
    .lcd-setpoint {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }

    .lcd-temp-label {
      font-size: 9px;
      font-family: monospace;
      font-weight: 600;
      letter-spacing: 0.12em;
      color: var(--lcd-text);
      opacity: 0.6;
    }

    .lcd-temp-value {
      font-size: 28px;
      font-weight: 700;
      font-family: monospace;
      color: var(--lcd-text);
      letter-spacing: -0.02em;
      line-height: 1.1;
    }

    .lcd-temp-unit {
      font-size: 11px;
      font-family: monospace;
      color: var(--lcd-text);
      opacity: 0.6;
    }

    .lcd-divider {
      width: 1px;
      height: 40px;
      background: var(--lcd-text);
      opacity: 0.2;
    }

    .lcd-bottom-row {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 10px;
      font-family: monospace;
      font-weight: 600;
      color: var(--lcd-text);
      opacity: 0.7;
      letter-spacing: 0.06em;
    }

    .lcd-off {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      min-height: 80px;
      color: var(--lcd-text);
      opacity: 0.4;
    }

    .lcd-off-icon { font-size: 24px; }
    .lcd-off-text { font-size: 14px; font-family: monospace; font-weight: 700; letter-spacing: 0.15em; }

    /* Buttons */
    .controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      background: var(--btn-bg);
      color: var(--btn-text);
      font-size: 11px;
      font-weight: 600;
      padding: 8px 10px;
      cursor: pointer;
      transition: background 0.15s, transform 0.1s;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      font-family: inherit;
      line-height: 1;
    }

    .btn:hover:not(:disabled) { background: var(--btn-hover); }
    .btn:active:not(:disabled) { transform: scale(0.96); }
    .btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .btn-icon { font-size: 14px; }
    .btn-label { font-family: monospace; font-size: 10px; letter-spacing: 0.06em; }

    .btn-power {
      width: 100%;
      border-radius: 10px;
      padding: 10px;
      font-size: 12px;
    }

    .btn-power.on {
      background: var(--power-on);
      color: #fff;
      border-color: #16a34a;
    }

    .btn-power.on:hover { background: #16a34a; }

    .mode-row {
      display: flex;
      gap: 4px;
    }

    .mode-row .btn-mode {
      flex: 1;
      flex-direction: column;
      gap: 2px;
      padding: 8px 4px;
      min-width: 0;
    }

    .btn-mode.active {
      background: var(--btn-active);
      color: var(--btn-active-text);
      border-color: var(--btn-active);
    }

    .mode-row .btn-mode[title="COOL"].active { background: var(--mode-cool); border-color: var(--mode-cool); }
    .mode-row .btn-mode[title="HEAT"].active { background: var(--mode-heat); border-color: var(--mode-heat); }
    .mode-row .btn-mode[title="DRY"].active  { background: var(--mode-dry);  border-color: var(--mode-dry); }
    .mode-row .btn-mode[title="FAN"].active  { background: var(--mode-fan);  border-color: var(--mode-fan); }
    .mode-row .btn-mode[title="AUTO"].active { background: var(--mode-auto); border-color: var(--mode-auto); }

    .temp-row {
      display: flex;
      gap: 6px;
    }

    .temp-row .btn-temp {
      flex: 1;
      padding: 10px;
    }

    .btn-fan {
      width: 100%;
      padding: 10px;
    }

    .error {
      padding: 16px;
      color: #c53030;
      font-size: 13px;
      text-align: center;
    }

    .compact .lcd-temp-value { font-size: 22px; }
    .compact .btn { padding: 6px 8px; }
    .compact .mode-row .btn-mode { padding: 6px 2px; }
  `,t([pt({attribute:!1})],yt.prototype,"hass",void 0),t([ut()],yt.prototype,"_config",void 0),t([ut()],yt.prototype,"_skin",void 0),yt=t([lt("daikin-controller-card")],yt);let $t=class extends at{setConfig(t){this._config=t}_valueChanged(t,e){const s=e.target.value;this._config={...this._config,[t]:s},this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:this._config}}))}render(){return this._config?I`
      <div class="editor">
        <div class="field">
          <label>Entity</label>
          <input
            type="text"
            .value=${this._config.entity??""}
            @input=${t=>this._valueChanged("entity",t)}
            placeholder="climate.living_room"
          />
        </div>
        <div class="field">
          <label>Controller Model</label>
          <select @change=${t=>this._valueChanged("controller",t)}>
            ${gt.map(t=>I`<option value=${t} ?selected=${this._config.controller===t}>${t}</option>`)}
          </select>
        </div>
        <div class="field">
          <label>Name (optional)</label>
          <input
            type="text"
            .value=${this._config.name??""}
            @input=${t=>this._valueChanged("name",t)}
            placeholder="Living Room"
          />
        </div>
      </div>
    `:q}};$t.styles=r`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    label {
      font-size: 12px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
    }
    input, select {
      padding: 8px;
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 6px;
      font-size: 14px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
    }
  `,t([pt({attribute:!1})],$t.prototype,"hass",void 0),t([ut()],$t.prototype,"_config",void 0),$t=t([lt("daikin-controller-card-editor")],$t),window.customCards=window.customCards||[],window.customCards.push({type:"daikin-controller-card",name:"Daikin Controller Card",description:"Emulates Daikin wired wall controllers (BRC1E63, BRC1H63K, BRC2E61, BRC315D7)",preview:!0});export{yt as DaikinControllerCard,$t as DaikinControllerCardEditor};
