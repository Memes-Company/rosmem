(this["webpackJsonpweb-app"]=this["webpackJsonpweb-app"]||[]).push([[0],[,,,,,,,,,,function(e,t,r){e.exports={root:"frame_root__3Jn0L",header:"frame_header__1uW4Y",body:"frame_body__QNcwh",footer:"frame_footer__CHrPb",spacer:"frame_spacer__22Ovt"}},,,,function(e,t,r){e.exports={root:"footer_root__vTYfq",title:"footer_title__3202Q",content:"footer_content__1peJ5",creators:"footer_creators__36wj9"}},,,,,,,function(e,t,r){e.exports={root:"footer-title_root__3Nowx",logo:"footer-title_logo__2AaRJ"}},,function(e,t,r){e.exports=r.p+"static/media/logo.65dfa581.svg"},function(e,t,r){e.exports=r.p+"static/media/stripes.a3f9386f.svg"},,,function(e,t,r){e.exports={root:"body_root__33Tic"}},function(e,t,r){e.exports={root:"header_root__aytLa"}},,,function(e,t,r){e.exports={root:"app_root__xVjNw"}},,,function(e,t,r){e.exports=r(44)},,,,,function(e,t){},,,function(e,t){},function(e,t,r){},function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"isArray",(function(){return w}));var o=r(0),a=r.n(o),i=r(25),c=r.n(i),u=r(3),l=r(4),s=r(6),f=r(5),d=r(46),p=r(50),h=r(10),m=r.n(h),b=function(e){Object(s.a)(r,e);var t=Object(f.a)(r);function r(e){var n;return Object(u.a)(this,r),(n=t.call(this,e)).state={root:o.createRef()},n}return Object(l.a)(r,[{key:"componentDidMount",value:function(){var e,t=this.state.root.current;if(null===t)throw new Error("'rootElement' is null.");var r=null===(e=t.ownerDocument)||void 0===e?void 0:e.defaultView;if(!r)throw new TypeError("it's impossible, but your root's \"window\" is null or undefined. (O_O;)");var n,o=(n=t,{setViewportVH:function(e){var t=.01*e.target.innerHeight;n.style.setProperty("--viewportVH","".concat(t,"px"))},onWindowResize:function(e){var t=e.target;t.pageYOffset<0&&t.scrollTo({top:0,left:0,behavior:"smooth"})}}),a=o.setViewportVH,i=o.onWindowResize,c=Object(d.a)(r,"resize").pipe(Object(p.a)(a)).subscribe(i);this.setState({resizeSubscription:c}),r.dispatchEvent(new Event("resize"))}},{key:"componentWillUnmount",value:function(){var e=this.state.resizeSubscription;e&&e.unsubscribe()}},{key:"render",value:function(){var e=this.props.children,t=this.state.root,r={spacer:m.a.spacer};return o.createElement("div",{ref:t,className:m.a.root},e(r))}}]),r}(o.Component),v=r(17),w=function(e){var t;return"Array"===(null===e||void 0===e||null===(t=e.constructor)||void 0===t?void 0:t.name)},O=n.isArray,j=function(e){Object(s.a)(r,e);var t=Object(f.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){var e=this.props.children,t=O(e)&&e||[],r=Object(v.a)(t,3),n=r[0],a=r[1],i=r[2];return o.createElement(o.Fragment,null,o.createElement("div",{className:m.a.header},n),o.createElement("div",{className:m.a.body},a),o.createElement("div",{className:m.a.footer},i))}}]),r}(o.Component),g=(r(39),r(27)),y=r.n(g),_=function(e){Object(s.a)(r,e);var t=Object(f.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){return o.createElement("article",{className:y.a.root},"Body")}}]),r}(o.Component),E=r(28),R=r.n(E),k=function(e){Object(s.a)(r,e);var t=Object(f.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){return o.createElement("header",{className:R.a.root},"Header")}}]),r}(o.Component),C=r(29),N=r.n(C),H=r(30),x=r.n(H),S=r(23),V=r.n(S),P=(r(24),r(21)),B=r.n(P),F=function(e){Object(s.a)(r,e);var t=Object(f.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){return o.createElement("div",{className:B.a.root},o.createElement(x.a,{className:B.a.logo,src:V.a}))}}]),r}(o.PureComponent),M=function(e){Object(s.a)(r,e);var t=Object(f.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){return o.createElement("div",null)}}]),r}(o.PureComponent),T=function(e){return{of:function(t){var r=getComputedStyle(t).getPropertyValue(e).trim().split(", "),n=Object(v.a)(r,3);return{red:+n[0],green:+n[1],blue:+n[2]}}}},z=function(e,t,r){return Math.round((e-t)*r)+t},A=r(14),W=r.n(A),D=function(e,t){if(null===e)return null;if(null===t)throw new Error("Root element is 'null'");var r,n=(r=t,{setBackgroundColor:function(e){var t=T("--high-boundary-color").of(r),n=T("--low-boundary-color").of(r),o=z(t.red,n.red,e),a=z(t.green,n.green,e),i=z(t.blue,n.blue,e);r.style.setProperty("--footer-background-color","".concat(o,", ").concat(a,", ").concat(i))},setColor:function(e){e>.8?r.style.setProperty("--footer-color","white"):r.style.setProperty("--footer-color","black")}}),o=n.setBackgroundColor,a=n.setColor;e.subscribe((function(e){o(e),a(e)}))},J=function(e){Object(s.a)(r,e);var t=Object(f.a)(r);function r(e){var n;return Object(u.a)(this,r),(n=t.call(this,e)).state={rootRef:o.createRef(),isSecondRender:!1},n}return Object(l.a)(r,[{key:"render",value:function(){var e=this.props,t=e.forwardedRef,r=e.spacer,n=this.state.rootRef;return o.createElement("footer",{ref:n,className:W.a.root},o.createElement("div",{className:N()(W.a.title,r)},o.createElement(F,null)),o.createElement("div",{ref:t,className:W.a.content},o.createElement(M,null)),o.createElement("div",{className:W.a.creators},"\u0421\u043e\u0437\u0434\u0430\u043d\u043e NaN'\u043e\u043c \u0438 Null'\u043e\u043c c \u043b\u044e\u0431\u043e\u0432\u044c\u044e"))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var r=t.isSecondRender;if(!1===r)return{isSecondRender:!0};if(r){var n=e.ratioFlow,o=t.rootRef.current;return t.ratioSubscription?null:{ratioSubscription:D(n,o)}}return null}}]),r}(o.Component),I=r(49),L=r(47),Y=r(26),Q=r(48);var q=function(e){Object(s.a)(r,e);var t=Object(f.a)(r);function r(e){var n;return Object(u.a)(this,r),(n=t.call(this,e)).state={forwardedRef:o.createRef(),ratioFlow:null},n}return Object(l.a)(r,[{key:"componentDidMount",value:function(){var e=this.state.forwardedRef.current;if(!e)throw new TypeError('"targetElement" refers to an non-HTMLElement type object. Check the child element.');var t=e.ownerDocument;if(!t)throw new TypeError("it's impossible, but your child's \"document\" is null or undefined. (O_O;)");var r,n=(r=e,{toHeightInViewport:function(e){var t=e.target.defaultView,n=r.getBoundingClientRect(),o=n.bottom<0,a=n.top>=t.innerHeight;if(o||a)return 0;if(n.top>=0&&n.bottom<=t.innerHeight)return n.height;if(n.top<0){var i=Math.abs(n.top);return n.height-i}if(n.bottom>t.innerHeight){var c=n.bottom-t.innerHeight;return n.height-c}throw new Error("Something went wrong with this targetElement....")},toRatio:function(e){return e/r.getBoundingClientRect().height},distinctAndOneMore:function(){var e=null;return function(t){if(!e)return e=t,!0;var n=r.getBoundingClientRect().height,o=t===e;return e=t,!(o&&(0===t||t===n))}}()}),o=n.toHeightInViewport,a=n.toRatio,i=n.distinctAndOneMore,c=Object(d.a)(t,"scroll",{passive:!0}).pipe(Object(I.a)(50),Object(L.a)(50),Object(Y.a)(o),Object(Y.a)(a),Object(Q.a)(i));this.setState({ratioFlow:c})}},{key:"render",value:function(){var e=this.props.children,t=this.state;return e({forwardedRef:t.forwardedRef,ratioFlow:t.ratioFlow})}}]),r}(o.Component),U=(r(42),r(31)),$=r.n(U),G=function(e){Object(s.a)(r,e);var t=Object(f.a)(r);function r(){return Object(u.a)(this,r),t.apply(this,arguments)}return Object(l.a)(r,[{key:"render",value:function(){return o.createElement("div",{className:$.a.root},o.createElement(b,null,(function(e){return o.createElement(j,null,o.createElement(k,null),o.createElement(_,null),o.createElement(q,null,(function(t){return o.createElement(J,Object.assign({},e,t))})))})))}}]),r}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r(43);c.a.render(a.a.createElement(G,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[34,1,2]]]);
//# sourceMappingURL=main.cf0fd69c.chunk.js.map