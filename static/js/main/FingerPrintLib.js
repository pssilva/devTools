
var _fp_lib_2013_ = {};
var imagem = 'https://device.clearsale.com.br/v1.0.0/clearsale_logoweb_vert.png?SessionID=';

_fp_lib_2013_.ApiPath = 'https://device.clearsale.com.br/v1.0.0/Variables/Post';
_fp_lib_2013_.FpPath = 'https://device.clearsale.com.br/v1.0.0/Home/FPTest/';
_fp_lib_2013_.AppsRootPath = 'https://device.clearsale.com.br/v1.0.0';
_fp_lib_2013_.variables = [];

/* SWFObject v2.2 */
_fp_lib_2013_.FlashIni = function () { var D = "undefined", r = "object", S = "Shockwave Flash", W = "ShockwaveFlash.ShockwaveFlash", q = "application/x-shockwave-flash", R = "SWFObjectExprInst", x = "onreadystatechange", O = window, j = document, t = navigator, T = false, U = [h], o = [], N = [], I = [], l, Q, E, B, J = false, a = false, n, G, m = true, M = function () { var aa = typeof j.getElementById != D && typeof j.getElementsByTagName != D && typeof j.createElement != D, ah = t.userAgent.toLowerCase(), Y = t.platform.toLowerCase(), ae = Y ? /win/.test(Y) : /win/.test(ah), ac = Y ? /mac/.test(Y) : /mac/.test(ah), af = /webkit/.test(ah) ? parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, X = ! +"\v1", ag = [0, 0, 0], ab = null; if (typeof t.plugins != D && typeof t.plugins[S] == r) { ab = t.plugins[S].description; if (ab && !(typeof t.mimeTypes != D && t.mimeTypes[q] && !t.mimeTypes[q].enabledPlugin)) { T = true; X = false; ab = ab.replace(/^.*\s+(\S+\s+\S+$)/, "$1"); ag[0] = parseInt(ab.replace(/^(.*)\..*$/, "$1"), 10); ag[1] = parseInt(ab.replace(/^.*\.(.*)\s.*$/, "$1"), 10); ag[2] = /[a-zA-Z]/.test(ab) ? parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0 } } else { if (typeof O.ActiveXObject != D) { try { var ad = new ActiveXObject(W); if (ad) { ab = ad.GetVariable("$version"); if (ab) { X = true; ab = ab.split(" ")[1].split(","); ag = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)] } } } catch (Z) { } } } return { w3: aa, pv: ag, wk: af, ie: X, win: ae, mac: ac} } (), k = function () { if (!M.w3) { return } if ((typeof j.readyState != D && j.readyState == "complete") || (typeof j.readyState == D && (j.getElementsByTagName("body")[0] || j.body))) { f() } if (!J) { if (typeof j.addEventListener != D) { j.addEventListener("DOMContentLoaded", f, false) } if (M.ie && M.win) { j.attachEvent(x, function () { if (j.readyState == "complete") { j.detachEvent(x, arguments.callee); f() } }); if (O == top) { (function () { if (J) { return } try { j.documentElement.doScroll("left") } catch (X) { setTimeout(arguments.callee, 0); return } f() })() } } if (M.wk) { (function () { if (J) { return } if (!/loaded|complete/.test(j.readyState)) { setTimeout(arguments.callee, 0); return } f() })() } s(f) } } (); function f() { if (J) { return } try { var Z = j.getElementsByTagName("body")[0].appendChild(C("span")); Z.parentNode.removeChild(Z) } catch (aa) { return } J = true; var X = U.length; for (var Y = 0; Y < X; Y++) { U[Y]() } } function K(X) { if (J) { X() } else { U[U.length] = X } } function s(Y) { if (typeof O.addEventListener != D) { O.addEventListener("load", Y, false) } else { if (typeof j.addEventListener != D) { j.addEventListener("load", Y, false) } else { if (typeof O.attachEvent != D) { i(O, "onload", Y) } else { if (typeof O.onload == "function") { var X = O.onload; O.onload = function () { X(); Y() } } else { O.onload = Y } } } } } function h() { if (T) { V() } else { H() } } function V() { var X = j.getElementsByTagName("body")[0]; var aa = C(r); aa.setAttribute("type", q); var Z = X.appendChild(aa); if (Z) { var Y = 0; (function () { if (typeof Z.GetVariable != D) { var ab = Z.GetVariable("$version"); if (ab) { ab = ab.split(" ")[1].split(","); M.pv = [parseInt(ab[0], 10), parseInt(ab[1], 10), parseInt(ab[2], 10)] } } else { if (Y < 10) { Y++; setTimeout(arguments.callee, 10); return } } X.removeChild(aa); Z = null; H() })() } else { H() } } function H() { var ag = o.length; if (ag > 0) { for (var af = 0; af < ag; af++) { var Y = o[af].id; var ab = o[af].callbackFn; var aa = { success: false, id: Y }; if (M.pv[0] > 0) { var ae = c(Y); if (ae) { if (F(o[af].swfVersion) && !(M.wk && M.wk < 312)) { w(Y, true); if (ab) { aa.success = true; aa.ref = z(Y); ab(aa) } } else { if (o[af].expressInstall && A()) { var ai = {}; ai.data = o[af].expressInstall; ai.width = ae.getAttribute("width") || "0"; ai.height = ae.getAttribute("height") || "0"; if (ae.getAttribute("class")) { ai.styleclass = ae.getAttribute("class") } if (ae.getAttribute("align")) { ai.align = ae.getAttribute("align") } var ah = {}; var X = ae.getElementsByTagName("param"); var ac = X.length; for (var ad = 0; ad < ac; ad++) { if (X[ad].getAttribute("name").toLowerCase() != "movie") { ah[X[ad].getAttribute("name")] = X[ad].getAttribute("value") } } P(ai, ah, Y, ab) } else { p(ae); if (ab) { ab(aa) } } } } } else { w(Y, true); if (ab) { var Z = z(Y); if (Z && typeof Z.SetVariable != D) { aa.success = true; aa.ref = Z } ab(aa) } } } } } function z(aa) { var X = null; var Y = c(aa); if (Y && Y.nodeName == "OBJECT") { if (typeof Y.SetVariable != D) { X = Y } else { var Z = Y.getElementsByTagName(r)[0]; if (Z) { X = Z } } } return X } function A() { return !a && F("6.0.65") && (M.win || M.mac) && !(M.wk && M.wk < 312) } function P(aa, ab, X, Z) { a = true; E = Z || null; B = { success: false, id: X }; var ae = c(X); if (ae) { if (ae.nodeName == "OBJECT") { l = g(ae); Q = null } else { l = ae; Q = X } aa.id = R; if (typeof aa.width == D || (!/%$/.test(aa.width) && parseInt(aa.width, 10) < 310)) { aa.width = "310" } if (typeof aa.height == D || (!/%$/.test(aa.height) && parseInt(aa.height, 10) < 137)) { aa.height = "137" } j.title = j.title.slice(0, 47) + " - Flash Player Installation"; var ad = M.ie && M.win ? "ActiveX" : "PlugIn", ac = "MMredirectURL=" + O.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + ad + "&MMdoctitle=" + j.title; if (typeof ab.flashvars != D) { ab.flashvars += "&" + ac } else { ab.flashvars = ac } if (M.ie && M.win && ae.readyState != 4) { var Y = C("div"); X += "SWFObjectNew"; Y.setAttribute("id", X); ae.parentNode.insertBefore(Y, ae); ae.style.display = "none"; (function () { if (ae.readyState == 4) { ae.parentNode.removeChild(ae) } else { setTimeout(arguments.callee, 10) } })() } u(aa, ab, X) } } function p(Y) { if (M.ie && M.win && Y.readyState != 4) { var X = C("div"); Y.parentNode.insertBefore(X, Y); X.parentNode.replaceChild(g(Y), X); Y.style.display = "none"; (function () { if (Y.readyState == 4) { Y.parentNode.removeChild(Y) } else { setTimeout(arguments.callee, 10) } })() } else { Y.parentNode.replaceChild(g(Y), Y) } } function g(ab) { var aa = C("div"); if (M.win && M.ie) { aa.innerHTML = ab.innerHTML } else { var Y = ab.getElementsByTagName(r)[0]; if (Y) { var ad = Y.childNodes; if (ad) { var X = ad.length; for (var Z = 0; Z < X; Z++) { if (!(ad[Z].nodeType == 1 && ad[Z].nodeName == "PARAM") && !(ad[Z].nodeType == 8)) { aa.appendChild(ad[Z].cloneNode(true)) } } } } } return aa } function u(ai, ag, Y) { var X, aa = c(Y); if (M.wk && M.wk < 312) { return X } if (aa) { if (typeof ai.id == D) { ai.id = Y } if (M.ie && M.win) { var ah = ""; for (var ae in ai) { if (ai[ae] != Object.prototype[ae]) { if (ae.toLowerCase() == "data") { ag.movie = ai[ae] } else { if (ae.toLowerCase() == "styleclass") { ah += ' class="' + ai[ae] + '"' } else { if (ae.toLowerCase() != "classid") { ah += " " + ae + '="' + ai[ae] + '"' } } } } } var af = ""; for (var ad in ag) { if (ag[ad] != Object.prototype[ad]) { af += '<param name="' + ad + '" value="' + ag[ad] + '" />' } } aa.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + ah + ">" + af + "</object>"; N[N.length] = ai.id; X = c(ai.id) } else { var Z = C(r); Z.setAttribute("type", q); for (var ac in ai) { if (ai[ac] != Object.prototype[ac]) { if (ac.toLowerCase() == "styleclass") { Z.setAttribute("class", ai[ac]) } else { if (ac.toLowerCase() != "classid") { Z.setAttribute(ac, ai[ac]) } } } } for (var ab in ag) { if (ag[ab] != Object.prototype[ab] && ab.toLowerCase() != "movie") { e(Z, ab, ag[ab]) } } aa.parentNode.replaceChild(Z, aa); X = Z } } return X } function e(Z, X, Y) { var aa = C("param"); aa.setAttribute("name", X); aa.setAttribute("value", Y); Z.appendChild(aa) } function y(Y) { var X = c(Y); if (X && X.nodeName == "OBJECT") { if (M.ie && M.win) { X.style.display = "none"; (function () { if (X.readyState == 4) { b(Y) } else { setTimeout(arguments.callee, 10) } })() } else { X.parentNode.removeChild(X) } } } function b(Z) { var Y = c(Z); if (Y) { for (var X in Y) { if (typeof Y[X] == "function") { Y[X] = null } } Y.parentNode.removeChild(Y) } } function c(Z) { var X = null; try { X = j.getElementById(Z) } catch (Y) { } return X } function C(X) { return j.createElement(X) } function i(Z, X, Y) { Z.attachEvent(X, Y); I[I.length] = [Z, X, Y] } function F(Z) { var Y = M.pv, X = Z.split("."); X[0] = parseInt(X[0], 10); X[1] = parseInt(X[1], 10) || 0; X[2] = parseInt(X[2], 10) || 0; return (Y[0] > X[0] || (Y[0] == X[0] && Y[1] > X[1]) || (Y[0] == X[0] && Y[1] == X[1] && Y[2] >= X[2])) ? true : false } function v(ac, Y, ad, ab) { if (M.ie && M.mac) { return } var aa = j.getElementsByTagName("head")[0]; if (!aa) { return } var X = (ad && typeof ad == "string") ? ad : "screen"; if (ab) { n = null; G = null } if (!n || G != X) { var Z = C("style"); Z.setAttribute("type", "text/css"); Z.setAttribute("media", X); n = aa.appendChild(Z); if (M.ie && M.win && typeof j.styleSheets != D && j.styleSheets.length > 0) { n = j.styleSheets[j.styleSheets.length - 1] } G = X } if (M.ie && M.win) { if (n && typeof n.addRule == r) { n.addRule(ac, Y) } } else { if (n && typeof j.createTextNode != D) { n.appendChild(j.createTextNode(ac + " {" + Y + "}")) } } } function w(Z, X) { if (!m) { return } var Y = X ? "visible" : "hidden"; if (J && c(Z)) { c(Z).style.visibility = Y } else { v("#" + Z, "visibility:" + Y) } } function L(Y) { var Z = /[\\\"<>\.;]/; var X = Z.exec(Y) != null; return X && typeof encodeURIComponent != D ? encodeURIComponent(Y) : Y } var d = function () { if (M.ie && M.win) { window.attachEvent("onunload", function () { var ac = I.length; for (var ab = 0; ab < ac; ab++) { I[ab][0].detachEvent(I[ab][1], I[ab][2]) } var Z = N.length; for (var aa = 0; aa < Z; aa++) { y(N[aa]) } for (var Y in M) { M[Y] = null } M = null; for (var X in _fp_lib_2013_.FlashIni) { _fp_lib_2013_.FlashIni[X] = null } _fp_lib_2013_.FlashIni = null }) } } (); return { registerObject: function (ab, X, aa, Z) { if (M.w3 && ab && X) { var Y = {}; Y.id = ab; Y.swfVersion = X; Y.expressInstall = aa; Y.callbackFn = Z; o[o.length] = Y; w(ab, false) } else { if (Z) { Z({ success: false, id: ab }) } } }, getObjectById: function (X) { if (M.w3) { return z(X) } }, embedSWF: function (ab, ah, ae, ag, Y, aa, Z, ad, af, ac) { var X = { success: false, id: ah }; if (M.w3 && !(M.wk && M.wk < 312) && ab && ah && ae && ag && Y) { w(ah, false); K(function () { ae += ""; ag += ""; var aj = {}; if (af && typeof af === r) { for (var al in af) { aj[al] = af[al] } } aj.data = ab; aj.width = ae; aj.height = ag; var am = {}; if (ad && typeof ad === r) { for (var ak in ad) { am[ak] = ad[ak] } } if (Z && typeof Z === r) { for (var ai in Z) { if (typeof am.flashvars != D) { am.flashvars += "&" + ai + "=" + Z[ai] } else { am.flashvars = ai + "=" + Z[ai] } } } if (F(Y)) { var an = u(aj, am, ah); if (aj.id == ah) { w(ah, true) } X.success = true; X.ref = an } else { if (aa && A()) { aj.data = aa; P(aj, am, ah, ac); return } else { w(ah, true) } } if (ac) { ac(X) } }) } else { if (ac) { ac(X) } } }, switchOffAutoHideShow: function () { m = false }, ua: M, getFlashPlayerVersion: function () { return { major: M.pv[0], minor: M.pv[1], release: M.pv[2]} }, hasFlashPlayerVersion: F, createSWF: function (Z, Y, X) { if (M.w3) { return u(Z, Y, X) } else { return undefined } }, showExpressInstall: function (Z, aa, X, Y) { if (M.w3 && A()) { P(Z, aa, X, Y) } }, removeSWF: function (X) { if (M.w3) { y(X) } }, createCSS: function (aa, Z, Y, X) { if (M.w3) { v(aa, Z, Y, X) } }, addDomLoadEvent: K, addLoadEvent: s, getQueryParamValue: function (aa) { var Z = j.location.search || j.location.hash; if (Z) { if (/\?/.test(Z)) { Z = Z.split("?")[1] } if (aa == null) { return L(Z) } var Y = Z.split("&"); for (var X = 0; X < Y.length; X++) { if (Y[X].substring(0, Y[X].indexOf("=")) == aa) { return L(Y[X].substring((Y[X].indexOf("=") + 1))) } } } return "" }, expressInstallCallback: function () { if (a) { var X = c(R); if (X && l) { X.parentNode.replaceChild(l, X); if (Q) { w(Q, true); if (M.ie && M.win) { l.style.display = "block" } } if (E) { E(B) } } a = false } } } } ();

/* Flash Detect FrameWork */
_fp_lib_2013_.FlashDetect = new function () {
    var self = this; self.installed = false; self.raw = ""; self.major = -1; self.minor = -1; self.revision = -1; self.revisionStr = ""; var activeXDetectRules = [{ "name": "ShockwaveFlash.ShockwaveFlash.7", "version": function (obj) { return getActiveXVersion(obj); } }, {
        "name": "ShockwaveFlash.ShockwaveFlash.6", "version": function (obj) {
            var version = "6,0,21"; try { obj.AllowScriptAccess = "always"; version = getActiveXVersion(obj); } catch (err) { }
            return version;
        }
    }, { "name": "ShockwaveFlash.ShockwaveFlash", "version": function (obj) { return getActiveXVersion(obj); } }]; var getActiveXVersion = function (activeXObj) {
        var version = -1; try { version = activeXObj.GetVariable("$version"); } catch (err) { }
        return version;
    }; var getActiveXObject = function (name) {
        var obj = -1; try { obj = new ActiveXObject(name); } catch (err) { obj = { activeXError: true }; }
        return obj;
    }; var parseActiveXVersion = function (str) { var versionArray = str.split(","); return { "raw": str, "major": parseInt(versionArray[0].split(" ")[1], 10), "minor": parseInt(versionArray[1], 10), "revision": parseInt(versionArray[2], 10), "revisionStr": versionArray[2] }; }; var parseStandardVersion = function (str) { var descParts = str.split(/ +/); var majorMinor = descParts[2].split(/\./); var revisionStr = descParts[3]; return { "raw": str, "major": parseInt(majorMinor[0], 10), "minor": parseInt(majorMinor[1], 10), "revisionStr": revisionStr, "revision": parseRevisionStrToInt(revisionStr) }; }; var parseRevisionStrToInt = function (str) { return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision; }; self.majorAtLeast = function (version) { return self.major >= version; }; self.minorAtLeast = function (version) { return self.minor >= version; }; self.revisionAtLeast = function (version) { return self.revision >= version; }; self.versionAtLeast = function (major) { var properties = [self.major, self.minor, self.revision]; var len = Math.min(properties.length, arguments.length); for (i = 0; i < len; i++) { if (properties[i] >= arguments[i]) { if (i + 1 < len && properties[i] == arguments[i]) { continue; } else { return true; } } else { return false; } } }; self.FlashDetect = function () { if (navigator.plugins && navigator.plugins.length > 0) { var type = 'application/x-shockwave-flash'; var mimeTypes = navigator.mimeTypes; if (mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description) { var version = mimeTypes[type].enabledPlugin.description; var versionObj = parseStandardVersion(version); self.raw = versionObj.raw; self.major = versionObj.major; self.minor = versionObj.minor; self.revisionStr = versionObj.revisionStr; self.revision = versionObj.revision; self.installed = true; } } else if (navigator.appVersion.indexOf("Mac") == -1 && window.execScript) { var version = -1; for (var i = 0; i < activeXDetectRules.length && version == -1; i++) { var obj = getActiveXObject(activeXDetectRules[i].name); if (!obj.activeXError) { self.installed = true; version = activeXDetectRules[i].version(obj); if (version != -1) { var versionObj = parseActiveXVersion(version); self.raw = versionObj.raw; self.major = versionObj.major; self.minor = versionObj.minor; self.revision = versionObj.revision; self.revisionStr = versionObj.revisionStr; } } } } } ();
}; _fp_lib_2013_.FlashDetect.JS_RELEASE = "1.0.4";


/* PluginDetect v0.8.5 */
_fp_lib_2013_.PluginDetect = { version: "0.8.5", name: "PluginDetect", openTag: "<", isDefined: function (b) { return typeof b != "undefined" }, isArray: function (b) { return (/array/i).test(Object.prototype.toString.call(b)) }, isFunc: function (b) { return typeof b == "function" }, isString: function (b) { return typeof b == "string" }, isNum: function (b) { return typeof b == "number" }, isStrNum: function (b) { return (typeof b == "string" && (/\d/).test(b)) }, getNumRegx: /[\d][\d\.\_,\-]*/, splitNumRegx: /[\.\_,\-]/g, getNum: function (b, c) { var d = this, a = d.isStrNum(b) ? (d.isDefined(c) ? new RegExp(c) : d.getNumRegx).exec(b) : null; return a ? a[0] : null }, compareNums: function (h, f, d) { var e = this, c, b, a, g = parseInt; if (e.isStrNum(h) && e.isStrNum(f)) { if (e.isDefined(d) && d.compareNums) { return d.compareNums(h, f) } c = h.split(e.splitNumRegx); b = f.split(e.splitNumRegx); for (a = 0; a < Math.min(c.length, b.length); a++) { if (g(c[a], 10) > g(b[a], 10)) { return 1 } if (g(c[a], 10) < g(b[a], 10)) { return -1 } } } return 0 }, formatNum: function (b, c) { var d = this, a, e; if (!d.isStrNum(b)) { return null } if (!d.isNum(c)) { c = 4 } c--; e = b.replace(/\s/g, "").split(d.splitNumRegx).concat(["0", "0", "0", "0"]); for (a = 0; a < 4; a++) { if (/^(0+)(.+)$/.test(e[a])) { e[a] = RegExp.$2 } if (a > c || !(/\d/).test(e[a])) { e[a] = "0" } } return e.slice(0, 4).join(",") }, getPROP: function (d, b, a) { var c; try { if (d) { a = d[b] } } catch (c) { } return a }, findNavPlugin: function (l, e, c) { var j = this, h = new RegExp(l, "i"), d = (!j.isDefined(e) || e) ? /\d/ : 0, k = c ? new RegExp(c, "i") : 0, a = navigator.plugins, g = "", f, b, m; for (f = 0; f < a.length; f++) { m = a[f].description || g; b = a[f].name || g; if ((h.test(m) && (!d || d.test(RegExp.leftContext + RegExp.rightContext))) || (h.test(b) && (!d || d.test(RegExp.leftContext + RegExp.rightContext)))) { if (!k || !(k.test(m) || k.test(b))) { return a[f] } } } return null }, getMimeEnabledPlugin: function (k, m, c) { var e = this, f, b = new RegExp(m, "i"), h = "", g = c ? new RegExp(c, "i") : 0, a, l, d, j = e.isString(k) ? [k] : k; for (d = 0; d < j.length; d++) { if ((f = e.hasMimeType(j[d])) && (f = f.enabledPlugin)) { l = f.description || h; a = f.name || h; if (b.test(l) || b.test(a)) { if (!g || !(g.test(l) || g.test(a))) { return f } } } } return 0 }, getVersionDelimiter: ",", findPlugin: function (d) { var c = this, b, d, a = { status: -3, plugin: 0 }; if (c.DOM) { c.DOM.initDiv() } if (!c.isString(d)) { return a } if (d.length == 1) { c.getVersionDelimiter = d; return a } d = d.toLowerCase().replace(/\s/g, ""); b = c.Plugins[d]; if (!b || !b.getVersion) { return a } a.plugin = b; a.status = 1; return a }, getPluginFileVersion: function (f, b) { var h = this, e, d, g, a, c = -1; if (h.OS > 2 || !f || !f.version || !(e = h.getNum(f.version))) { return b } if (!b) { return e } e = h.formatNum(e); b = h.formatNum(b); d = b.split(h.splitNumRegx); g = e.split(h.splitNumRegx); for (a = 0; a < d.length; a++) { if (c > -1 && a > c && d[a] != "0") { return b } if (g[a] != d[a]) { if (c == -1) { c = a } if (d[a] != "0") { return b } } } return e }, AXO: window.ActiveXObject, getAXO: function (a) { var d = null, c, b = this; try { d = new b.AXO(a) } catch (c) { }; return d }, browser: {}, INIT: function () { this.init.library(this) }, init: { $: 1, hasRun: 0, objProperties: function (d, e, b) { var a, c = {}; if (e && b) { if (e[b[0]] === 1 && !d.isArray(e) && !d.isFunc(e) && !d.isString(e) && !d.isNum(e)) { for (a = 0; a < b.length; a = a + 2) { e[b[a]] = b[a + 1]; c[b[a]] = 1 } } for (a in e) { if (!c[a] && e[a] && e[a][b[0]] === 1) { this.objProperties(d, e[a], b) } } } }, publicMethods: function (c, f) { var g = this, b = g.$, a, d; if (c && f) { for (a in c) { try { if (b.isFunc(c[a])) { f[a] = c[a](f) } } catch (d) { } } } }, plugin: function (a, c) { var d = this, b = d.$; if (a) { d.objProperties(b, a, ["$", b, "$$", a]); if (!b.isDefined(a.getVersionDone)) { a.installed = null; a.version = null; a.version0 = null; a.getVersionDone = null; a.pluginName = c } } }, detectIE: function () { var init = this, $ = init.$, browser = $.browser, doc = document, e, x, tmp, userAgent = navigator.userAgent || "", progid, progid1, progid2; tmp = doc.documentMode; try { doc.documentMode = "" } catch (e) { } browser.isIE = $.isNum(doc.documentMode) ? !0 : eval("/*@cc_on!@*/!1"); try { doc.documentMode = tmp } catch (e) { }; browser.verIE = null; if (browser.isIE) { browser.verIE = doc.documentMode || ((/^(?:.*?[^a-zA-Z])??(?:MSIE|rv\s*\:)\s*(\d+\.?\d*)/i).test(userAgent) ? parseFloat(RegExp.$1, 10) : 7) }; browser.verIEtrue = null; browser.docModeIE = null; if (browser.isIE) { var verTrueFloat, obj = doc.createElement("div"), CLASSID = ["{45EA75A0-A269-11D1-B5BF-0000F8051515}", "{3AF36230-A269-11D1-B5BF-0000F8051515}", "{89820200-ECBD-11CF-8B85-00AA005B4383}"]; try { obj.style.behavior = "url(#default#clientcaps)" } catch (e) { } for (x = 0; x < CLASSID.length; x++) { try { browser.verIEtrue = (obj.getComponentVersion(CLASSID[x], "componentid")).replace(/,/g, ".") } catch (e) { } if (browser.verIEtrue && !$.dbug) { break } } verTrueFloat = parseFloat(browser.verIEtrue || "0", 10); browser.docModeIE = doc.documentMode || ((/back/i).test(doc.compatMode || "") ? 5 : verTrueFloat) || browser.verIE; browser.verIE = verTrueFloat || browser.docModeIE }; browser.ActiveXEnabled = !1; browser.ActiveXFilteringEnabled = !1; if (browser.isIE) { try { browser.ActiveXFilteringEnabled = window.external.msActiveXFilteringEnabled() } catch (e) { } progid1 = ["Msxml2.XMLHTTP", "Msxml2.DOMDocument", "Microsoft.XMLDOM", "TDCCtl.TDCCtl", "Shell.UIHelper", "HtmlDlgSafeHelper.HtmlDlgSafeHelper", "Scripting.Dictionary"]; progid2 = ["WMPlayer.OCX", "ShockwaveFlash.ShockwaveFlash", "AgControl.AgControl", ]; progid = progid1.concat(progid2); for (x = 0; x < progid.length; x++) { if ($.getAXO(progid[x])) { browser.ActiveXEnabled = !0; if (!$.dbug) { break } } } if (browser.ActiveXEnabled && browser.ActiveXFilteringEnabled) { for (x = 0; x < progid2.length; x++) { if ($.getAXO(progid2[x])) { browser.ActiveXFilteringEnabled = !1; break } } } } }, detectNonIE: function () { var f = this, d = this.$, a = d.browser, e = navigator, c = a.isIE ? "" : e.userAgent || "", g = e.vendor || "", b = e.product || ""; a.isGecko = (/Gecko/i).test(b) && (/Gecko\s*\/\s*\d/i).test(c); a.verGecko = a.isGecko ? d.formatNum((/rv\s*\:\s*([\.\,\d]+)/i).test(c) ? RegExp.$1 : "0.9") : null; a.isChrome = (/(Chrome|CriOS)\s*\/\s*(\d[\d\.]*)/i).test(c); a.verChrome = a.isChrome ? d.formatNum(RegExp.$2) : null; a.isSafari = !a.isChrome && ((/Apple/i).test(g) || !g) && (/Safari\s*\/\s*(\d[\d\.]*)/i).test(c); a.verSafari = a.isSafari && (/Version\s*\/\s*(\d[\d\.]*)/i).test(c) ? d.formatNum(RegExp.$1) : null; a.isOpera = (/Opera\s*[\/]?\s*(\d+\.?\d*)/i).test(c); a.verOpera = a.isOpera && ((/Version\s*\/\s*(\d+\.?\d*)/i).test(c) || 1) ? parseFloat(RegExp.$1, 10) : null }, detectPlatform: function () { var e = this, d = e.$, b, a = navigator.platform || ""; d.OS = 100; if (a) { var c = ["Win", 1, "Mac", 2, "Linux", 3, "FreeBSD", 4, "iPhone", 21.1, "iPod", 21.2, "iPad", 21.3, "Win.*CE", 22.1, "Win.*Mobile", 22.2, "Pocket\\s*PC", 22.3, "", 100]; for (b = c.length - 2; b >= 0; b = b - 2) { if (c[b] && new RegExp(c[b], "i").test(a)) { d.OS = c[b + 1]; break } } } }, library: function (c) { var e = this, d = document, b, a; c.init.objProperties(c, c, ["$", c]); for (a in c.Plugins) { c.init.plugin(c.Plugins[a], a) } e.publicMethods(c.PUBLIC, c); c.win.init(); c.head = d.getElementsByTagName("head")[0] || d.getElementsByTagName("body")[0] || d.body || null; e.detectPlatform(); e.detectIE(); e.detectNonIE(); c.init.hasRun = 1 } }, ev: { $: 1, handler: function (d, c, b, a) { return function () { d(c, b, a) } }, fPush: function (b, a) { var c = this, d = c.$; if (d.isArray(a) && (d.isFunc(b) || (d.isArray(b) && b.length > 0 && d.isFunc(b[0])))) { a.push(b) } }, callArray: function (a) { var b = this, d = b.$, c; if (d.isArray(a)) { while (a.length) { c = a[0]; a.splice(0, 1); b.call(c) } } }, call: function (d) { var b = this, c = b.$, a = c.isArray(d) ? d.length : -1; if (a > 0 && c.isFunc(d[0])) { d[0](c, a > 1 ? d[1] : 0, a > 2 ? d[2] : 0, a > 3 ? d[3] : 0) } else { if (c.isFunc(d)) { d(c) } } } }, PUBLIC: { isMinVersion: function (b) { var a = function (j, h, e, d) { var f = b.findPlugin(j), g, c = -1; if (f.status < 0) { return f.status } g = f.plugin; h = b.formatNum(b.isNum(h) ? h.toString() : (b.isStrNum(h) ? b.getNum(h) : "0")); if (g.getVersionDone != 1) { g.getVersion(h, e, d); if (g.getVersionDone === null) { g.getVersionDone = 1 } } if (g.installed !== null) { c = g.installed <= 0.5 ? g.installed : (g.installed == 0.7 ? 1 : (g.version === null ? 0 : (b.compareNums(g.version, h, g) >= 0 ? 1 : -0.1))) }; return c }; return a }, getVersion: function (b) { var a = function (h, e, d) { var f = b.findPlugin(h), g, c; if (f.status < 0) { return null }; g = f.plugin; if (g.getVersionDone != 1) { g.getVersion(null, e, d); if (g.getVersionDone === null) { g.getVersionDone = 1 } } c = (g.version || g.version0); c = c ? c.replace(b.splitNumRegx, b.getVersionDelimiter) : c; return c }; return a }, getInfo: function (b) { var a = function (h, e, d) { var c = {}, f = b.findPlugin(h), g; if (f.status < 0) { return c }; g = f.plugin; if (g.getInfo) { if (g.getVersionDone === null) { b.getVersion ? b.getVersion(h, e, d) : b.isMinVersion(h, "0", e, d) } c = g.getInfo() }; return c }; return a }, onDetectionDone: function (b) { var a = function (j, h, d, c) { var e = b.findPlugin(j), k, g; if (e.status == -3) { return -1 } g = e.plugin; if (!b.isArray(g.funcs)) { g.funcs = [] }; if (g.getVersionDone != 1) { k = b.getVersion ? b.getVersion(j, d, c) : b.isMinVersion(j, "0", d, c) } if (g.installed != -0.5 && g.installed != 0.5) { b.ev.call(h); return 1 } b.ev.fPush(h, g.funcs); return 0 }; return a }, hasMimeType: function (b) { var a = function (d) { if (!b.browser.isIE && d && navigator && navigator.mimeTypes) { var g, f, c, e = b.isArray(d) ? d : (b.isString(d) ? [d] : []); for (c = 0; c < e.length; c++) { if (b.isString(e[c]) && /[^\s]/.test(e[c])) { g = navigator.mimeTypes[e[c]]; f = g ? g.enabledPlugin : 0; if (f && (f.name || f.description)) { return g } } } } return null }; return a }, z: 0 }, codebase: { $: 1, isDisabled: function () { var b = this, c = b.$, a = c.browser; return a.ActiveXEnabled && a.isIE && a.verIE >= 7 ? 0 : 1 }, checkGarbage: function (d) { var b = this, c = b.$, a; if (c.browser.isIE && d && c.getPROP(d.firstChild, "object")) { a = c.getPROP(d.firstChild, "readyState"); if (c.isNum(a) && a != 4) { b.garbage = 1; return 1 } } return 0 }, emptyGarbage: function () { var a = this, b = a.$, c; if (b.browser.isIE && a.garbage) { try { window.CollectGarbage() } catch (c) { } a.garbage = 0 } }, init: function (e) { if (!e.init) { var c = this, d = c.$, a, b; e.init = 1; e.min = 0; e.max = 0; e.hasRun = 0; e.version = null; e.L = 0; e.altHTML = ""; e.span = document.createElement("span"); e.tagA = '<object width="1" height="1" style="display:none;" codebase="#version='; b = e.classID || e.$$.classID || ""; e.tagB = '" ' + ((/clsid\s*:/i).test(b) ? 'classid="' : 'type="') + b + '">' + e.altHTML + d.openTag + "/object>"; for (a = 0; a < e.Lower.length; a++) { e.Lower[a] = d.formatNum(e.Lower[a]); e.Upper[a] = d.formatNum(e.Upper[a]) } } }, isActiveXObject: function (i, b) { var f = this, g = f.$, a = 0, h, d = i.$$, c = i.span; if (i.min && g.compareNums(b, i.min) <= 0) { return 1 } if (i.max && g.compareNums(b, i.max) >= 0) { return 0 } c.innerHTML = i.tagA + b + i.tagB; if (g.getPROP(c.firstChild, "object")) { a = 1 }; f.checkGarbage(c); c.innerHTML = ""; if (a) { i.min = b } else { i.max = b } return a }, convert_: function (f, a, b, e) { var d = f.convert[a], c = f.$; return d ? (c.isFunc(d) ? c.formatNum(d(b.split(c.splitNumRegx), e).join(",")) : b) : d }, convert: function (h, c, g) { var e = this, f = h.$, b, a, d; c = f.formatNum(c); a = { v: c, x: -1 }; if (c) { for (b = 0; b < h.Lower.length; b++) { d = e.convert_(h, b, h.Lower[b]); if (d && f.compareNums(c, g ? d : h.Lower[b]) >= 0 && (!b || f.compareNums(c, g ? e.convert_(h, b, h.Upper[b]) : h.Upper[b]) < 0)) { a.v = e.convert_(h, b, c, g); a.x = b; break } } } return a }, isMin: function (g, f) { var d = this, e = g.$, c, b, a = 0; d.init(g); if (!e.isStrNum(f) || d.isDisabled()) { return a }; if (!g.L) { g.L = {}; for (c = 0; c < g.Lower.length; c++) { if (d.isActiveXObject(g, g.Lower[c])) { g.L = d.convert(g, g.Lower[c]); break } } } if (g.L.v) { b = d.convert(g, f, 1); if (b.x >= 0) { a = (g.L.x == b.x ? d.isActiveXObject(g, b.v) : e.compareNums(f, g.L.v) <= 0) ? 1 : -1 } }; return a }, search: function (g) { var k = this, h = k.$, i = g.$$, b = 0, c; k.init(g); c = (g.hasRun || k.isDisabled()) ? 1 : 0; g.hasRun = 1; if (c) { return g.version }; var o, n, m, j = function (q, t) { var r = [].concat(f), s; r[q] = t; s = k.isActiveXObject(g, r.join(",")); if (s) { b = 1; f[q] = t } else { p[q] = t } return s }, d = g.DIGITMAX, e, a, l = 99999999, f = [0, 0, 0, 0], p = [0, 0, 0, 0]; for (o = 0; o < p.length; o++) { f[o] = Math.floor(g.DIGITMIN[o]) || 0; e = f.join(","); a = f.slice(0, o).concat([l, l, l, l]).slice(0, f.length).join(","); for (m = 0; m < d.length; m++) { if (h.isArray(d[m])) { d[m].push(0); if (d[m][o] > p[o] && h.compareNums(a, g.Lower[m]) >= 0 && h.compareNums(e, g.Upper[m]) < 0) { p[o] = Math.floor(d[m][o]) } } } for (n = 0; n < 30; n++) { if (p[o] - f[o] <= 16) { for (m = p[o]; m >= f[o] + (o ? 1 : 0); m--) { if (j(o, m)) { break } } break } j(o, Math.round((p[o] + f[o]) / 2)) } if (!b) { break } p[o] = f[o] } if (b) { g.version = k.convert(g, f.join(",")).v }; return g.version } }, win: { $: 1, loaded: false, hasRun: 0, init: function () { var b = this, a = b.$; if (!b.hasRun) { b.hasRun = 1; b.addEvent("load", a.ev.handler(b.runFuncs, a)); b.addEvent("unload", a.ev.handler(b.cleanup, a)) } }, addEvent: function (c, b) { var e = this, d = e.$, a = window; if (d.isFunc(b)) { if (a.addEventListener) { a.addEventListener(c, b, false) } else { if (a.attachEvent) { a.attachEvent("on" + c, b) } else { a["on" + c] = e.concatFn(b, a["on" + c]) } } } }, concatFn: function (d, c) { return function () { d(); if (typeof c == "function") { c() } } }, funcs0: [], funcs: [], cleanup: function (b) { if (b) { for (var a in b) { b[a] = 0 } b = 0 } }, runFuncs: function (a) { if (a && !a.win.loaded) { a.win.loaded = true; a.ev.callArray(a.win.funcs0); a.ev.callArray(a.win.funcs); if (a.DOM) { a.DOM.onDoneEmptyDiv() } } }, z: 0 }, DOM: { $: 1, isEnabled: { $: 1, objectTag: function () { var a = this.$; return a.browser.isIE ? a.browser.ActiveXEnabled : 1 }, objectProperty: function () { var a = this.$; return a.browser.isIE && a.browser.verIE >= 7 ? 1 : 0 } }, div: null, divID: "plugindetect", divClass: "doNotRemove", divWidth: 50, getDiv: function () { var a = this; return a.div || document.getElementById(a.divID) || null }, isDivPermanent: function () { var b = this, c = b.$, a = b.getDiv(); return a && c.isString(a.className) && a.className.toLowerCase().indexOf(b.divClass.toLowerCase()) > -1 ? 1 : 0 }, initDiv: function (b) { var c = this, d = c.$, a; if (!c.div) { a = c.getDiv(); if (a) { c.div = a } else { if (b) { c.div = document.createElement("div"); c.div.id = c.divID } } if (c.div) { c.setStyle(c.div, c.defaultStyle.concat(["display", "block", "width", c.divWidth + "px", "height", (c.pluginSize + 3) + "px", "fontSize", (c.pluginSize + 3) + "px", "lineHeight", (c.pluginSize + 3) + "px"])); if (!a) { c.setStyle(c.div, ["position", "absolute", "right", "0px", "top", "0px"]); c.insertDivInBody(c.div) } } } }, pluginSize: 1, altHTML: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;", emptyNode: function (c) { var b = this, d = b.$, a, f; if (c && c.childNodes) { for (a = c.childNodes.length - 1; a >= 0; a--) { if (d.browser.isIE) { b.setStyle(c.childNodes[a], ["display", "none"]) } c.removeChild(c.childNodes[a]) } } }, LASTfuncs: [], onDoneEmptyDiv: function () { var f = this, g = f.$, b, d, c, a, h; f.initDiv(); if (!g.win.loaded || g.win.funcs0.length || g.win.funcs.length) { return } for (b in g.Plugins) { d = g.Plugins[b]; if (d) { if (d.OTF == 3 || (d.funcs && d.funcs.length)) { return } } } g.ev.callArray(f.LASTfuncs); a = f.getDiv(); if (a) { if (f.isDivPermanent()) { } else { if (a.childNodes) { for (b = a.childNodes.length - 1; b >= 0; b--) { c = a.childNodes[b]; f.emptyNode(c) } try { a.innerHTML = "" } catch (h) { } } if (a.parentNode) { try { a.parentNode.removeChild(a) } catch (h) { } a = null; f.div = null } } } }, width: function () { var g = this, e = g.DOM, f = e.$, d = g.span, b, c, a = -1; b = d && f.isNum(d.scrollWidth) ? d.scrollWidth : a; c = d && f.isNum(d.offsetWidth) ? d.offsetWidth : a; return c > 0 ? c : (b > 0 ? b : Math.max(c, b)) }, obj: function (b) { var d = this, c = d.span, a = c && c.firstChild ? c.firstChild : null; return a }, readyState: function () { var b = this, a = b.DOM.$; return a.browser.isIE ? a.getPROP(b.obj(), "readyState") : b.undefined }, objectProperty: function () { var d = this, b = d.DOM, c = b.$, a; if (b.isEnabled.objectProperty()) { a = c.getPROP(d.obj(), "object") } return a }, getTagStatus: function (b, m, r, p, f, h) { var s = this, d = s.$, q; if (!b || !b.span) { return -2 } var k = b.width(), c = b.readyState(), a = b.objectProperty(); if (a) { return 1.5 } var g = /clsid\s*\:/i, o = r && g.test(r.outerHTML || "") ? r : (p && g.test(p.outerHTML || "") ? p : 0), i = r && !g.test(r.outerHTML || "") ? r : (p && !g.test(p.outerHTML || "") ? p : 0), l = b && g.test(b.outerHTML || "") ? o : i; if (!m || !m.span || !l || !l.span) { return 0 } var j = l.width(), n = m.width(), t = l.readyState(); if (k < 0 || j < 0 || n <= s.pluginSize) { return 0 } if (h && !b.pi && d.isDefined(a) && d.browser.isIE && b.tagName == l.tagName && b.time <= l.time && k === j && c === 0 && t !== 0) { b.pi = 1 } if (j < n) { return b.pi ? -0.1 : 0 } if (k >= n) { if (!b.winLoaded && d.win.loaded) { return b.pi ? -0.5 : -1 } if (d.isNum(f)) { if (!d.isNum(b.count2)) { b.count2 = f } if (f - b.count2 > 0) { return b.pi ? -0.5 : -1 } } } try { if (k == s.pluginSize && (!d.browser.isIE || c === 4)) { if (!b.winLoaded && d.win.loaded) { return 1 } if (b.winLoaded && d.isNum(f)) { if (!d.isNum(b.count)) { b.count = f } if (f - b.count >= 5) { return 1 } } } } catch (q) { } return b.pi ? -0.1 : 0 }, setStyle: function (b, h) { var c = this, d = c.$, g = b.style, a, f; if (g && h) { for (a = 0; a < h.length; a = a + 2) { try { g[h[a]] = h[a + 1] } catch (f) { } } } }, insertDivInBody: function (a, h) { var j = this, d = j.$, g, b = "pd33993399", c = null, i = h ? window.top.document : window.document, f = i.getElementsByTagName("body")[0] || i.body; if (!f) { try { i.write('<div id="' + b + '">.' + d.openTag + "/div>"); c = i.getElementById(b) } catch (g) { } } f = i.getElementsByTagName("body")[0] || i.body; if (f) { f.insertBefore(a, f.firstChild); if (c) { f.removeChild(c) } } }, defaultStyle: ["verticalAlign", "baseline", "outlineStyle", "none", "borderStyle", "none", "padding", "0px", "margin", "0px", "visibility", "visible"], insert: function (b, i, g, h, c, q, o) { var s = this, f = s.$, r, t = document, v, m, p = t.createElement("span"), k, a, l = "outline-style:none;border-style:none;padding:0px;margin:0px;visibility:" + (q ? "hidden;" : "visible;") + "display:inline;"; if (!f.isDefined(h)) { h = "" } if (f.isString(b) && (/[^\s]/).test(b)) { b = b.toLowerCase().replace(/\s/g, ""); v = f.openTag + b + " "; v += 'style="' + l + '" '; var j = 1, u = 1; for (k = 0; k < i.length; k = k + 2) { if (/[^\s]/.test(i[k + 1])) { v += i[k] + '="' + i[k + 1] + '" ' } if ((/width/i).test(i[k])) { j = 0 } if ((/height/i).test(i[k])) { u = 0 } } v += (j ? 'width="' + s.pluginSize + '" ' : "") + (u ? 'height="' + s.pluginSize + '" ' : ""); v += ">"; for (k = 0; k < g.length; k = k + 2) { if (/[^\s]/.test(g[k + 1])) { v += f.openTag + 'param name="' + g[k] + '" value="' + g[k + 1] + '" />' } } v += h + f.openTag + "/" + b + ">" } else { b = ""; v = h } if (!o) { s.initDiv(1) } var n = o || s.getDiv(); m = { span: null, winLoaded: f.win.loaded, tagName: b, outerHTML: v, DOM: s, time: new Date().getTime(), width: s.width, obj: s.obj, readyState: s.readyState, objectProperty: s.objectProperty }; if (n && n.parentNode) { s.setStyle(p, s.defaultStyle.concat(["display", "inline"]).concat(o ? [] : ["fontSize", (s.pluginSize + 3) + "px", "lineHeight", (s.pluginSize + 3) + "px"])); n.appendChild(p); try { p.innerHTML = v } catch (r) { }; m.span = p; m.winLoaded = f.win.loaded } return m } }, file: { $: 1, any: "fileStorageAny999", valid: "fileStorageValid999", save: function (d, f, c) { var b = this, e = b.$, a; if (d && e.isDefined(c)) { if (!d[b.any]) { d[b.any] = [] } if (!d[b.valid]) { d[b.valid] = [] } d[b.any].push(c); a = b.split(f, c); if (a) { d[b.valid].push(a) } } }, getValidLength: function (a) { return a && a[this.valid] ? a[this.valid].length : 0 }, getAnyLength: function (a) { return a && a[this.any] ? a[this.any].length : 0 }, getValid: function (c, a) { var b = this; return c && c[b.valid] ? b.get(c[b.valid], a) : null }, getAny: function (c, a) { var b = this; return c && c[b.any] ? b.get(c[b.any], a) : null }, get: function (d, a) { var c = d.length - 1, b = this.$.isNum(a) ? a : c; return (b < 0 || b > c) ? null : d[b] }, split: function (g, c) { var b = this, e = b.$, f = null, a, d; g = g ? g.replace(".", "\\.") : ""; d = new RegExp("^(.*[^\\/])(" + g + "\\s*)$"); if (e.isString(c) && d.test(c)) { a = (RegExp.$1).split("/"); f = { name: a[a.length - 1], ext: RegExp.$2, full: c }; a[a.length - 1] = ""; f.path = a.join("/") } return f }, z: 0 }, Plugins: { quicktime: { $: 1, mimeType: ["video/quicktime", "application/x-quicktimeplayer", "image/x-macpaint", "image/x-quicktime"], progID: "QuickTimeCheckObject.QuickTimeCheck.1", progID0: "QuickTime.QuickTime", classID: "clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B", codebase: { $: 1, isMin: function (a) { return this.$.codebase.isMin(this, a) }, search: function () { return this.$.codebase.search(this) }, ParamTags: '<param name="src" value="" /><param name="controller" value="false" />', DIGITMAX: [[12, 11, 11], [7, 60], [7, 11, 11], 0, [7, 11, 11]], DIGITMIN: [5, 0, 0, 0], Upper: ["999", "7,60", "7,50", "7,6", "7,5"], Lower: ["7,60", "7,50", "7,6", "7,5", "0"], convert: [1, function (b, a) { return a ? [b[0], b[1] + b[2], b[3], "0"] : [b[0], b[1].charAt(0), b[1].charAt(1), b[2]] }, 1, 0, 1] }, setPluginStatus: function (d, a, f) { var e = this, c = e.$, b = e.installed; e.installed = a ? 1 : (f ? (f > 0 ? 0.7 : -0.1) : (d ? 0 : -1)); if (a) { e.version = c.formatNum(a, 3) } e.getVersionDone = e.installed == 0.7 || e.installed == -0.1 ? 0 : 1; c.codebase.emptyGarbage() }, getVersion: function (c) { var h = this, d = h.$, a = null, g = null, b, f; if (!d.browser.isIE) { if (d.hasMimeType(h.mimeType)) { g = d.OS != 3 ? d.findNavPlugin("QuickTime.*Plug-?in", 0) : null; if (g && g.name) { a = d.getNum(g.name) } } } else { if (d.isStrNum(c)) { b = c.split(d.splitNumRegx); if (b.length > 3 && parseInt(b[3], 10) > 0) { b[3] = "9999" } c = b.join(",") } b = h.codebase.isMin(c); if (b) { h.setPluginStatus(0, 0, b); return } if (!a || d.dbug) { a = h.codebase.search() } if (!a || d.dbug) { g = d.getAXO(h.progID); b = d.getPROP(g, "QuickTimeVersion"); if (b && b.toString) { a = b.toString(16); a = parseInt(a.charAt(0) || "0", 16) + "." + parseInt(a.charAt(1) || "0", 16) + "." + parseInt(a.charAt(2) || "0", 16) } } } h.setPluginStatus(g, a) } }, java: { $: 1, mimeType: ["application/x-java-applet", "application/x-java-vm", "application/x-java-bean"], mimeType_dummy: "application/dummymimejavaapplet", classID: "clsid:8AD9C840-044E-11D1-B3E9-00805F499D93", classID_dummy: "clsid:8AD9C840-044E-11D1-B3E9-BA9876543210", navigator: { $: 1, a: (function () { var b, a = !0; try { a = window.navigator.javaEnabled() } catch (b) { } return a })(), javaEnabled: function () { return this.a }, mimeObj: 0, pluginObj: 0 }, OTF: null, info: { $: 1, Plugin2Status: 0, setPlugin2Status: function (a) { if (this.$.isNum(a)) { this.Plugin2Status = a } }, getPlugin2Status: function () { var c = this, d = c.$, b = c.$$, i = b.navigator, f, g, k, h, j, a; if (c.Plugin2Status === 0) { if (d.browser.isIE && d.OS == 1 && (/Sun|Oracle/i).test(c.getVendor())) { f = c.isMinJre4Plugin2(); if (f > 0) { c.setPlugin2Status(1) } else { if (f < 0) { c.setPlugin2Status(-1) } } } else { if (!d.browser.isIE && i.pluginObj) { k = /Next.*Generation.*Java.*Plug-?in|Java.*Plug-?in\s*2\s/i; h = /Classic.*Java.*Plug-in/i; j = i.pluginObj.description || ""; a = i.pluginObj.name || ""; if (k.test(j) || k.test(a)) { c.setPlugin2Status(1) } else { if (h.test(j) || h.test(a)) { c.setPlugin2Status(-1) } } } } } return c.Plugin2Status }, isMinJre4Plugin2: function (a) { var f = this, e = f.$, c = f.$$, d = "", g = c.applet.codebase, b = c.applet.getResult()[0]; if (e.OS == 1) { d = "1,6,0,10" } else { if (e.OS == 2) { d = "1,6,0,12" } else { if (e.OS == 3) { d = "1,6,0,10" } else { d = "1,6,0,10" } } } if (!a) { a = (b && !c.applet.isRange(b) ? b : 0) || c.version || (g.min && d ? (g.isMin(d) > 0 ? d : "0,0,0,0") : 0) } a = e.formatNum(e.getNum(a)); return a ? (e.compareNums(a, d) >= 0 ? 1 : -1) : 0 }, BrowserForbidsPlugin2: function () { var b = this.$, a = b.browser; if (b.OS >= 20) { return 0 } if ((a.isIE && a.verIE < 6) || (a.isGecko && b.compareNums(a.verGecko, "1,9,0,0") < 0) || (a.isOpera && a.verOpera && a.verOpera < 10.5)) { return 1 } return 0 }, BrowserRequiresPlugin2: function () { var b = this.$, a = b.browser; if (b.OS >= 20) { return 0 } if ((a.isGecko && b.compareNums(a.verGecko, "1,9,2,0") >= 0) || a.isChrome || (b.OS == 1 && a.verOpera && a.verOpera >= 10.6)) { return 1 } return 0 }, VENDORS: ["Sun Microsystems Inc.", "Apple Computer, Inc.", "Oracle Corporation"], OracleMin: "1,7,0,0", OracleOrSun: function (a) { var c = this, b = c.$; return c.VENDORS[b.compareNums(b.formatNum(a), c.OracleMin) < 0 ? 0 : 2] }, OracleOrApple: function (a) { var c = this, b = c.$; return c.VENDORS[b.compareNums(b.formatNum(a), c.OracleMin) < 0 ? 1 : 2] }, getVendor: function () { var d = this, c = d.$, b = d.$$, f = b.vendor || b.applet.getResult()[1] || "", e = b.applet.codebase, a; if (!f) { a = b.DTK.version || e.version || (e.min ? (e.isMin(d.OracleMin) > 0 ? d.OracleMin : "0,0,0,0") : 0); if (a) { f = d.OracleOrSun(a) } else { if (b.version) { if (c.OS == 2) { f = d.OracleOrApple(b.version) } else { if ((!c.browser.isIE && c.OS == 1) || c.OS == 3) { f = d.OracleOrSun(b.version) } } } } } return f }, isPlugin2InstalledEnabled: function () { var b = this, d = b.$, a = b.$$, i = -1, f = a.installed, g = b.getPlugin2Status(), h = b.BrowserRequiresPlugin2(), e = b.BrowserForbidsPlugin2(), c = b.isMinJre4Plugin2(); if (f !== null && f >= -0.1) { if (g >= 3) { i = 1 } else { if (g <= -3) { } else { if (g == 2) { i = 1 } else { if (g == -2) { } else { if (h && g >= 0 && c > 0) { i = 1 } else { if (e && g <= 0 && c < 0) { } else { if (h) { i = 1 } else { if (e) { } else { if (g > 0) { i = 1 } else { if (g < 0) { } else { if (c < 0) { } else { i = 0 } } } } } } } } } } } } return i }, result: { $: 1, getDeploymentToolkitObj: function () { var a = this, d = a.$, b = a.$$, e = b.info, c = b.DTK; c.query(1); e.updateResult(); return c.status && c.HTML ? c.HTML.obj() : c.status } }, updateResult: function () { var c = this, e = c.$, b = c.$$, a = b.applet, i, k = b.installed, h = b.DTK, g = a.results, l = c.result; l.DeployTK_versions = [].concat(e.isArray(h.VERSIONS) ? h.VERSIONS : []); l.vendor = c.getVendor(); l.isPlugin2 = c.isPlugin2InstalledEnabled(); l.OTF = b.OTF < 3 ? 0 : (b.OTF == 3 ? 1 : 2); l.JavaAppletObj = null; for (i = 0; i < g.length; i++) { if (g[i][0] && a.HTML[i] && a.HTML[i].obj()) { l.JavaAppletObj = a.HTML[i].obj(); break } } var f = [null, null, null, null]; for (i = 0; i < g.length; i++) { if (g[i][0]) { f[i] = 1 } else { if (g[i][0] !== null) { if (b.NOTF) { b.NOTF.isAppletActive(i) } if (a.active[i] > 0) { f[i] = 0 } else { if (a.allowed[i] >= 1 && b.OTF != 3 && (a.isDisabled.single(i) || k == -0.2 || k == -1 || a.active[i] < 0 || (i == 3 && (!e.browser.isIE || (/Microsoft/i).test(l.vendor))))) { f[i] = -1 } } } else { if (i == 3 && g[0][0]) { f[i] = 0 } else { if (a.isDisabled.single(i)) { f[i] = -1 } } } } } l.objectTag = f[1]; l.appletTag = f[2]; l.objectTagActiveX = f[3]; l.name = ""; l.description = ""; var j = 0; if (!e.browser.isIE) { if (b.navMime.query().pluginObj) { j = b.navMime.pluginObj } else { if (b.navigator.pluginObj) { j = b.navigator.pluginObj } } if (j) { l.name = j.name || ""; l.description = j.description || "" } } l.All_versions = [].concat((l.DeployTK_versions.length ? l.DeployTK_versions : (e.isString(b.version) ? [b.version] : []))); var d = l.All_versions; for (i = 0; i < d.length; i++) { d[i] = e.formatNum(e.getNum(d[i])) } return l } }, getInfo: function () { var a = this.info; a.updateResult(); return a.result }, getVerifyTagsDefault: function () { return [1, this.applet.isDisabled.VerifyTagsDefault_1() ? 0 : 1, 1] }, getVersion: function (j, g, i) { var b = this, d = b.$, e, a = b.applet, h = b.verify, k = b.navigator, f = null, l = null, c = null; if (b.getVersionDone === null) { b.OTF = 0; k.mimeObj = d.hasMimeType(b.mimeType); if (k.mimeObj) { k.pluginObj = k.mimeObj.enabledPlugin } if (h) { h.begin() } } a.setVerifyTagsArray(i); d.file.save(b, ".jar", g); if (b.getVersionDone === 0) { if (a.should_Insert_Query_Any()) { e = a.insert_Query_Any(j); b.setPluginStatus(e[0], e[1], f, j) } return } if ((!f || d.dbug) && b.navMime.query().version) { f = b.navMime.version } if ((!f || d.dbug) && b.DTK.query(d.dbug).version) { f = b.DTK.version } if ((!f || d.dbug) && b.navPlugin.query().version) { f = b.navPlugin.version } if (b.nonAppletDetectionOk(f)) { c = f } b.setPluginStatus(c, l, f, j); if (a.should_Insert_Query_Any()) { e = a.insert_Query_Any(j); if (e[0]) { c = e[0]; l = e[1] } } b.setPluginStatus(c, l, f, j) }, nonAppletDetectionOk: function (b) { var d = this, e = d.$, a = d.navigator, c = 1; if (!b || !a.javaEnabled() || (!e.browser.isIE && !a.mimeObj) || (e.browser.isIE && !e.browser.ActiveXEnabled)) { c = 0 } else { if (e.OS >= 20) { } else { if (d.info && d.info.getPlugin2Status() < 0 && d.info.BrowserRequiresPlugin2()) { c = 0 } } } return c }, setPluginStatus: function (d, i, g, h) { var b = this, e = b.$, f, c = 0, a = b.applet; g = g || b.version0; f = a.isRange(d); if (f) { if (a.setRange(f, h) == d) { c = f } d = 0 } if (b.OTF < 3) { b.installed = c ? (c > 0 ? 0.7 : -0.1) : (d ? 1 : (g ? -0.2 : -1)) } if (b.OTF == 2 && b.NOTF && !b.applet.getResult()[0]) { b.installed = g ? -0.2 : -1 } if (b.OTF == 3 && b.installed != -0.5 && b.installed != 0.5) { b.installed = (b.NOTF.isJavaActive(1) == 1 ? 0.5 : -0.5) } if (b.OTF == 4 && (b.installed == -0.5 || b.installed == 0.5)) { if (d) { b.installed = 1 } else { if (c) { b.installed = c > 0 ? 0.7 : -0.1 } else { if (b.NOTF.isJavaActive(1) == 1) { if (g) { b.installed = 1; d = g } else { b.installed = 0 } } else { if (g) { b.installed = -0.2 } else { b.installed = -1 } } } } } if (g) { b.version0 = e.formatNum(e.getNum(g)) } if (d && !c) { b.version = e.formatNum(e.getNum(d)) } if (i && e.isString(i)) { b.vendor = i } if (!b.vendor) { b.vendor = "" } if (b.verify && b.verify.isEnabled()) { b.getVersionDone = 0 } else { if (b.getVersionDone != 1) { if (b.OTF < 2) { b.getVersionDone = 0 } else { b.getVersionDone = b.applet.can_Insert_Query_Any() ? 0 : 1 } } }; e.codebase.emptyGarbage() }, DTK: { $: 1, hasRun: 0, status: null, VERSIONS: [], version: "", HTML: null, Plugin2Status: null, classID: ["clsid:CAFEEFAC-DEC7-0000-0001-ABCDEFFEDCBA", "clsid:CAFEEFAC-DEC7-0000-0000-ABCDEFFEDCBA"], mimeType: ["application/java-deployment-toolkit", "application/npruntime-scriptable-plugin;DeploymentToolkit"], isDisabled: function (a) { var c = this, d = c.$, b = d.browser; if (!a && (!d.DOM.isEnabled.objectTag() || (b.isIE && b.verIE < 6) || (b.isGecko && d.compareNums(b.verGecko, d.formatNum("1.6")) <= 0) || (b.isSafari && d.OS == 1 && (!b.verSafari || d.compareNums(b.verSafari, "5,1,0,0") < 0)) || b.isChrome)) { return 1 } return 0 }, query: function (n) { var l = this, h = l.$, f = l.$$, k, m, i, a = h.DOM.altHTML, g = {}, b, d = null, j = null, c = (l.hasRun || l.isDisabled(n)); l.hasRun = 1; if (c) { return l } l.status = 0; if (h.browser.isIE) { for (m = 0; m < l.classID.length; m++) { l.HTML = h.DOM.insert("object", ["classid", l.classID[m]], [], a); d = l.HTML.obj(); if (h.getPROP(d, "jvms")) { break } } } else { i = h.hasMimeType(l.mimeType); if (i && i.type) { l.HTML = h.DOM.insert("object", ["type", i.type], [], a); d = l.HTML.obj() } } if (d) { try { if (Math.abs(f.info.getPlugin2Status()) < 2) { l.Plugin2Status = d.isPlugin2() } } catch (k) { } if (l.Plugin2Status !== null) { if (l.Plugin2Status) { f.info.setPlugin2Status(2) } else { if (h.browser.isIE || f.info.getPlugin2Status() <= 0) { f.info.setPlugin2Status(-2) } } } try { b = h.getPROP(d, "jvms"); if (b) { j = b.getLength(); if (h.isNum(j)) { l.status = j > 0 ? 1 : -1; for (m = 0; m < j; m++) { i = h.getNum(b.get(j - 1 - m).version); if (i) { l.VERSIONS.push(i); g["a" + h.formatNum(i)] = 1 } } } } } catch (k) { } } i = 0; for (m in g) { i++ } if (i && i !== l.VERSIONS.length) { l.VERSIONS = [] } if (l.VERSIONS.length) { l.version = h.formatNum(l.VERSIONS[0]) }; return l } }, navMime: { $: 1, hasRun: 0, mimetype: "", version: "", length: 0, mimeObj: 0, pluginObj: 0, isDisabled: function () { var b = this, d = b.$, c = b.$$, a = c.navigator; if (d.browser.isIE || !a.mimeObj || !a.pluginObj) { return 1 } return 0 }, query: function () { var i = this, f = i.$, a = i.$$, b = (i.hasRun || i.isDisabled()); i.hasRun = 1; if (b) { return i }; var n = /^\s*application\/x-java-applet;jpi-version\s*=\s*(\d.*)$/i, g, l, j, d = "", h = "a", o, m, k = {}, c = f.formatNum("0"); for (l = 0; l < navigator.mimeTypes.length; l++) { o = navigator.mimeTypes[l]; m = o ? o.enabledPlugin : 0; g = o && n.test(o.type || d) ? f.formatNum(f.getNum(RegExp.$1)) : 0; if (g && m && (m.description || m.name)) { if (!k[h + g]) { i.length++ } k[h + g] = o.type; if (f.compareNums(g, c) > 0) { c = g } } } g = k[h + c]; if (g) { o = f.hasMimeType(g); i.mimeObj = o; i.pluginObj = o ? o.enabledPlugin : 0; i.mimetype = g; i.version = c }; return i } }, navPlugin: { $: 1, hasRun: 0, version: "", isDisabled: function () { var d = this, c = d.$, b = d.$$, a = b.navigator; if (c.browser.isIE || !a.mimeObj || !a.pluginObj) { return 1 } return 0 }, query: function () { var m = this, e = m.$, c = m.$$, h = c.navigator, j, l, k, g, d, a, i, f = 0, b = (m.hasRun || m.isDisabled()); m.hasRun = 1; if (b) { return m }; a = h.pluginObj.name || ""; i = h.pluginObj.description || ""; if (!f || e.dbug) { g = /Java.*TM.*Platform[^\d]*(\d+)(?:[\.,_](\d*))?(?:\s*[Update]+\s*(\d*))?/i; if ((g.test(a) || g.test(i)) && parseInt(RegExp.$1, 10) >= 5) { f = "1," + RegExp.$1 + "," + (RegExp.$2 ? RegExp.$2 : "0") + "," + (RegExp.$3 ? RegExp.$3 : "0") } } if (!f || e.dbug) { g = /Java[^\d]*Plug-in/i; l = g.test(i) ? e.formatNum(e.getNum(i)) : 0; k = g.test(a) ? e.formatNum(e.getNum(a)) : 0; if (l && (e.compareNums(l, e.formatNum("1,3")) < 0 || e.compareNums(l, e.formatNum("2")) >= 0)) { l = 0 } if (k && (e.compareNums(k, e.formatNum("1,3")) < 0 || e.compareNums(k, e.formatNum("2")) >= 0)) { k = 0 } d = l && k ? (e.compareNums(l, k) > 0 ? l : k) : (l || k); if (d) { f = d } } if (!f && e.browser.isSafari && e.OS == 2) { j = e.findNavPlugin("Java.*\\d.*Plug-in.*Cocoa", 0); if (j) { l = e.getNum(j.description); if (l) { f = l } } }; if (f) { m.version = e.formatNum(f) }; return m } }, applet: { $: 1, codebase: { $: 1, isMin: function (a) { return this.$.codebase.isMin(this, a) }, search: function () { return this.$.codebase.search(this) }, ParamTags: '<param name="code" value="A19999.class" /><param name="codebase_lookup" value="false" />', DIGITMAX: [[16, 64], [6, 0, 512], 0, [1, 5, 2, 256], 0, [1, 4, 1, 1], [1, 4, 0, 64], [1, 3, 2, 32]], DIGITMIN: [1, 0, 0, 0], Upper: ["999", "10", "5,0,20", "1,5,0,20", "1,4,1,20", "1,4,1,2", "1,4,1", "1,4"], Lower: ["10", "5,0,20", "1,5,0,20", "1,4,1,20", "1,4,1,2", "1,4,1", "1,4", "0"], convert: [function (b, a) { return a ? [parseInt(b[0], 10) > 1 ? "99" : parseInt(b[1], 10) + 3 + "", b[3], "0", "0"] : ["1", parseInt(b[0], 10) - 3 + "", "0", b[1]] }, function (b, a) { return a ? [b[1], b[2], b[3] + "0", "0"] : ["1", b[0], b[1], b[2].substring(0, b[2].length - 1 || 1)] }, 0, function (b, a) { return a ? [b[0], b[1], b[2], b[3] + "0"] : [b[0], b[1], b[2], b[3].substring(0, b[3].length - 1 || 1)] }, 0, 1, function (b, a) { return a ? [b[0], b[1], b[2], b[3] + "0"] : [b[0], b[1], b[2], b[3].substring(0, b[3].length - 1 || 1)] }, 1] }, results: [[null, null], [null, null], [null, null], [null, null]], getResult: function () { var b = this, d = b.results, a, c = []; for (a = d.length - 1; a >= 0; a--) { c = d[a]; if (c[0]) { break } } c = [].concat(c); return c }, DummySpanTagHTML: 0, HTML: [0, 0, 0, 0], active: [0, 0, 0, 0], DummyObjTagHTML: 0, DummyObjTagHTML2: 0, allowed: [1, 1, 1, 1], VerifyTagsHas: function (c) { var d = this, b; for (b = 0; b < d.allowed.length; b++) { if (d.allowed[b] === c) { return 1 } } return 0 }, saveAsVerifyTagsArray: function (c) { var b = this, d = b.$, a; if (d.isArray(c)) { for (a = 1; a < b.allowed.length; a++) { if (c.length > a - 1 && d.isNum(c[a - 1])) { if (c[a - 1] < 0) { c[a - 1] = 0 } if (c[a - 1] > 3) { c[a - 1] = 3 } b.allowed[a] = c[a - 1] } } b.allowed[0] = b.allowed[3] } }, setVerifyTagsArray: function (d) { var b = this, c = b.$, a = b.$$; if (a.getVersionDone === null) { b.saveAsVerifyTagsArray(a.getVerifyTagsDefault()) } if (c.dbug) { b.saveAsVerifyTagsArray([3, 3, 3]) } else { if (d) { b.saveAsVerifyTagsArray(d) } } }, isDisabled: { $: 1, single: function (d) { var a = this, c = a.$, b = a.$$; if (d == 0) { return c.codebase.isDisabled() } if ((d == 3 && !c.browser.isIE) || a.all()) { return 1 } if (d == 1 || d == 3) { return !c.DOM.isEnabled.objectTag() } if (d == 2) { return a.AppletTag() } }, aA_: null, all: function () { var c = this, f = c.$, e = c.$$, b = e.navigator, a = 0, d = f.browser; if (c.aA_ === null) { if (f.OS >= 20) { a = 0 } else { if (d.verOpera && d.verOpera < 11 && !b.javaEnabled()) { a = 1 } else { if ((d.verGecko && f.compareNums(d.verGecko, f.formatNum("2")) < 0) && !b.mimeObj) { a = 1 } else { if (c.AppletTag() && !f.DOM.isEnabled.objectTag()) { a = 1 } } } }; c.aA_ = a } return c.aA_ }, AppletTag: function () { var b = this, d = b.$, c = b.$$, a = c.navigator; return d.browser.isIE ? !a.javaEnabled() : 0 }, VerifyTagsDefault_1: function () { var b = this.$, a = b.browser; if (b.OS >= 20) { return 1 } if ((a.isIE && (a.verIE < 9 || !a.ActiveXEnabled)) || (a.verGecko && b.compareNums(a.verGecko, b.formatNum("2")) < 0) || (a.isSafari && (!a.verSafari || b.compareNums(a.verSafari, b.formatNum("4")) < 0)) || (a.verOpera && a.verOpera < 10)) { return 0 } return 1 }, z: 0 }, can_Insert_Query: function (d) { var b = this, c = b.results[0][0], a = b.getResult()[0]; if (b.HTML[d] || (d == 0 && c !== null && !b.isRange(c)) || (d == 0 && a && !b.isRange(a))) { return 0 } return !b.isDisabled.single(d) }, can_Insert_Query_Any: function () { var b = this, a; for (a = 0; a < b.results.length; a++) { if (b.can_Insert_Query(a)) { return 1 } } return 0 }, should_Insert_Query: function (e) { var c = this, f = c.allowed, d = c.$, b = c.$$, a = c.getResult()[0]; a = a && (e > 0 || !c.isRange(a)); if (!c.can_Insert_Query(e) || f[e] === 0) { return 0 } if (f[e] == 3 || (f[e] == 2.8 && !a)) { return 1 } if (!b.nonAppletDetectionOk(b.version0)) { if (f[e] == 2 || (f[e] == 1 && !a)) { return 1 } } return 0 }, should_Insert_Query_Any: function () { var b = this, a; for (a = 0; a < b.allowed.length; a++) { if (b.should_Insert_Query(a)) { return 1 } } return 0 }, query: function (f) { var j, a = this, i = a.$, d = a.$$, k = null, l = null, b = a.results, c, h, g = a.HTML[f]; if (!g || !g.obj() || b[f][0] || d.bridgeDisabled || (i.dbug && d.OTF < 3)) { return } c = g.obj(); h = g.readyState(); if (1) { try { k = i.getNum(c.getVersion() + ""); l = c.getVendor() + ""; c.statusbar(i.win.loaded ? " " : " ") } catch (j) { }; if (k && i.isStrNum(k)) { b[f] = [k, l]; a.active[f] = 2 } } }, isRange: function (a) { return (/^[<>]/).test(a || "") ? (a.charAt(0) == ">" ? 1 : -1) : 0 }, setRange: function (b, a) { return (b ? (b > 0 ? ">" : "<") : "") + (this.$.isString(a) ? a : "") }, insertJavaTag: function (g, n, h, o, m) { var e = this, c = e.$, k = e.$$, r = "A.class", b = c.file.getValid(k), f = b.name + b.ext, q = b.path; var i = ["archive", f, "code", r], l = (o ? ["width", o] : []).concat(m ? ["height", m] : []), j = ["mayscript", "true"], p = ["scriptable", "true", "codebase_lookup", "false"].concat(j), a = k.navigator, d = !c.browser.isIE && a.mimeObj && a.mimeObj.type ? a.mimeObj.type : k.mimeType[0]; if (g == 1) { return c.browser.isIE ? c.DOM.insert("object", ["type", d].concat(l), ["codebase", q].concat(i).concat(p), h, k, 0, n) : c.DOM.insert("object", ["type", d].concat(l), ["codebase", q].concat(i).concat(p), h, k, 0, n) } if (g == 2) { return c.browser.isIE ? c.DOM.insert("applet", ["alt", h].concat(j).concat(i).concat(l), ["codebase", q].concat(p), h, k, 0, n) : c.DOM.insert("applet", ["codebase", q, "alt", h].concat(j).concat(i).concat(l), [].concat(p), h, k, 0, n) } if (g == 3) { return c.browser.isIE ? c.DOM.insert("object", ["classid", k.classID].concat(l), ["codebase", q].concat(i).concat(p), h, k, 0, n) : c.DOM.insert() } if (g == 4) { return c.DOM.insert("embed", ["codebase", q].concat(i).concat(["type", d]).concat(p).concat(l), [], h, k, 0, n) } }, insert_Query_Any: function (i) { var b = this, d = b.$, c = b.$$, g = b.results, j = b.HTML, a = d.DOM.altHTML, e, h = d.file.getValid(c); if (b.should_Insert_Query(0)) { if (c.OTF < 2) { c.OTF = 2 }; g[0] = [0, 0]; e = i ? b.codebase.isMin(i) : b.codebase.search(); if (e) { g[0][0] = i ? b.setRange(e, i) : e } b.active[0] = e ? 1.5 : -1 } if (!h) { return b.getResult() } if (!b.DummySpanTagHTML) { b.DummySpanTagHTML = d.DOM.insert("", [], [], a) } if (b.should_Insert_Query(1)) { if (c.OTF < 2) { c.OTF = 2 }; j[1] = b.insertJavaTag(1, 0, a); g[1] = [0, 0]; b.query(1) } if (b.should_Insert_Query(2)) { if (c.OTF < 2) { c.OTF = 2 }; j[2] = b.insertJavaTag(2, 0, a); g[2] = [0, 0]; b.query(2) } if (b.should_Insert_Query(3)) { if (c.OTF < 2) { c.OTF = 2 }; j[3] = b.insertJavaTag(3, 0, a); g[3] = [0, 0]; b.query(3) } if (d.DOM.isEnabled.objectTag()) { if (!b.DummyObjTagHTML && (j[1] || j[2])) { b.DummyObjTagHTML = d.DOM.insert("object", ["type", c.mimeType_dummy], [], a) } if (!b.DummyObjTagHTML2 && j[3]) { b.DummyObjTagHTML2 = d.DOM.insert("object", ["classid", c.classID_dummy], [], a) } } var f = c.NOTF; if (c.OTF < 3 && f.shouldContinueQuery()) { c.OTF = 3; f.onIntervalQuery = d.ev.handler(f.$$onIntervalQuery, f); if (!d.win.loaded) { d.win.funcs0.push([f.winOnLoadQuery, f]) } setTimeout(f.onIntervalQuery, f.intervalLength) } return b.getResult() } }, NOTF: { $: 1, count: 0, countMax: 25, intervalLength: 250, shouldContinueQuery: function () { var f = this, e = f.$, c = f.$$, b = c.applet, a, d = 0; if (e.win.loaded && f.count > f.countMax) { return 0 } for (a = 0; a < b.results.length; a++) { if (b.HTML[a]) { if (!e.win.loaded && f.count > f.countMax && e.codebase.checkGarbage(b.HTML[a].span)) { d = 1; b.HTML[a].DELETE = 1 } if (!d && !b.results[a][0] && (b.allowed[a] >= 2 || (b.allowed[a] == 1 && !b.getResult()[0])) && f.isAppletActive(a) >= 0) { return 1 } } }; return 0 }, isJavaActive: function (d) { var f = this, c = f.$$, a, b, e = -9; for (a = 0; a < c.applet.HTML.length; a++) { b = f.isAppletActive(a, d); if (b > e) { e = b } } return e }, isAppletActive: function (e, g) { var h = this, f = h.$, b = h.$$, l = b.navigator, a = b.applet, i = a.HTML[e], d = a.active, k, c = 0, j, m = d[e]; if (g || m >= 1.5 || !i || !i.span) { return m }; j = f.DOM.getTagStatus(i, a.DummySpanTagHTML, a.DummyObjTagHTML, a.DummyObjTagHTML2, h.count); for (k = 0; k < d.length; k++) { if (d[k] > 0) { c = 1 } } if (j != 1) { m = j } else { if (f.browser.isIE || (b.version0 && l.javaEnabled() && l.mimeObj && (i.tagName == "object" || c))) { m = 1 } else { m = 0 } } d[e] = m; return m }, winOnLoadQuery: function (c, d) { var b = d.$$, a; if (b.OTF == 3) { a = d.queryAllApplets(); d.queryCompleted(a) } }, $$onIntervalQuery: function (d) { var c = d.$, b = d.$$, a; if (b.OTF == 3) { a = d.queryAllApplets(); if (!d.shouldContinueQuery()) { d.queryCompleted(a) } } d.count++; if (b.OTF == 3) { setTimeout(d.onIntervalQuery, d.intervalLength) } }, queryAllApplets: function () { var f = this, e = f.$, d = f.$$, c = d.applet, b, a; for (b = 0; b < c.results.length; b++) { c.query(b) } a = c.getResult(); return a }, queryCompleted: function (c) { var g = this, f = g.$, e = g.$$, d = e.applet, b; if (e.OTF >= 4) { return } e.OTF = 4; var a = g.isJavaActive(); for (b = 0; b < d.HTML.length; b++) { if (d.HTML[b] && d.HTML[b].DELETE) { f.DOM.emptyNode(d.HTML[b].span); d.HTML[b].span = null } } e.setPluginStatus(c[0], c[1], 0); if (f.onDetectionDone && e.funcs) { f.ev.callArray(e.funcs) } if (f.DOM) { f.DOM.onDoneEmptyDiv() } } }, zz: 0 }, devalvr: { $: 1, mimeType: "application/x-devalvrx", progID: "DevalVRXCtrl.DevalVRXCtrl.1", classID: "clsid:5D2CF9D0-113A-476B-986F-288B54571614", getVersion: function () { var h = this, a = null, f, c = h.$, d, g, b; if (!c.browser.isIE) { f = c.findNavPlugin("DevalVR"); if (f && f.name && c.hasMimeType(h.mimeType)) { a = f.description.split(" ")[3] } h.installed = a ? 1 : -1 } else { g = c.getAXO(h.progID); if (g && c.DOM.isEnabled.objectTag()) { b = c.getPROP(c.DOM.insert("object", ["classid", h.classID], ["src", ""], "", h).obj(), "pluginversion"); if (b && b.toString) { a = "00000000" + b.toString(16); a = a.substr(a.length - 8, 8); a = parseInt(a.substr(0, 2) || "0", 16) + "," + parseInt(a.substr(2, 2) || "0", 16) + "," + parseInt(a.substr(4, 2) || "0", 16) + "," + parseInt(a.substr(6, 2) || "0", 16) } } h.installed = a ? 1 : (g ? 0 : -1) } h.version = c.formatNum(a) } }, flash: { $: 1, mimeType: "application/x-shockwave-flash", progID: "ShockwaveFlash.ShockwaveFlash", classID: "clsid:D27CDB6E-AE6D-11CF-96B8-444553540000", getVersion: function () { var b = function (i) { if (!i) { return null } var e = /[\d][\d\,\.\s]*[rRdD]{0,1}[\d\,]*/.exec(i); return e ? e[0].replace(/[rRdD\.]/g, ",").replace(/\s/g, "") : null }; var j = this, g = j.$, k, h, l = null, c = null, a = null, f, m, d; if (!g.browser.isIE) { m = g.hasMimeType(j.mimeType); if (m && g.DOM.isEnabled.objectTag()) { f = g.DOM.insert("object", ["type", j.mimeType], [], "", j).obj(); try { l = g.getNum(f.GetVariable("$version")) } catch (k) { } } if (!l) { d = m ? m.enabledPlugin : null; if (d && d.description) { l = b(d.description) } if (l) { l = g.getPluginFileVersion(d, l) } } } else { for (h = 15; h > 2; h--) { c = g.getAXO(j.progID + "." + h); if (c) { a = h.toString(); break } } if (!c) { c = g.getAXO(j.progID) } if (a == "6") { try { c.AllowScriptAccess = "always" } catch (k) { return "6,0,21,0" } } try { l = b(c.GetVariable("$version")) } catch (k) { } if (!l && a) { l = a } } j.installed = l ? 1 : -1; j.version = g.formatNum(l); return true } }, shockwave: { $: 1, mimeType: "application/x-director", progID: "SWCtl.SWCtl", classID: "clsid:166B1BCA-3F9C-11CF-8075-444553540000", getVersion: function () { var a = null, b = null, g, f, d = this, c = d.$; if (!c.browser.isIE) { f = c.findNavPlugin("Shockwave\\s*for\\s*Director"); if (f && f.description && c.hasMimeType(d.mimeType)) { a = c.getNum(f.description) } if (a) { a = c.getPluginFileVersion(f, a) } } else { try { b = c.getAXO(d.progID).ShockwaveVersion("") } catch (g) { } if (c.isString(b) && b.length > 0) { a = c.getNum(b) } else { if (c.getAXO(d.progID + ".8")) { a = "8" } else { if (c.getAXO(d.progID + ".7")) { a = "7" } else { if (c.getAXO(d.progID + ".1")) { a = "6" } } } } } d.installed = a ? 1 : -1; d.version = c.formatNum(a) } }, windowsmediaplayer: { $: 1, mimeType: ["application/x-mplayer2", "application/asx", "application/x-ms-wmp"], regStr: { wmp: "Windows\\s*Media\\s*Player.*Plug-?in|Flip4Mac.*Windows\\s*Media.*Plug-?in", avoidPlayers: "Totem|VLC|RealPlayer" }, progID: "WMPlayer.OCX", classID: "clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6", setPluginStatus: function (b, e, a) { var c = this, f = c.$, d; if (c.isDisabled()) { c.installed = -1; c.getVersionDone = 1; return }; if (!c.version) { c.version = f.formatNum(b) } c.installed = c.version ? 1 : (e ? 0 : -1) }, isDisabled: function () { var a = this, b = a.$; if (!b.browser.isIE && b.OS < 20 && b.OS >= 3) { return 1 } return 0 }, getVersion: function (c) { var b = this, e = b.$, d = null, a = null; if (!e.browser.isIE) { d = (e.hasMimeType(b.mimeType) ? e.findNavPlugin(b.regStr.wmp, 0, b.regStr.avoidPlayers) : 0); if (b.FirefoxPlugin.query().version) { a = b.FirefoxPlugin.version } } else { d = e.getAXO(b.progID); a = e.getPROP(d, "versionInfo") || a } b.setPluginStatus(a, d) }, FirefoxPlugin: { $: 1, detected: 0, version: null, mimeType: "application/x-ms-wmp", regStr: { wmpFirefox: "Windows\\s*Media\\s*Player.*Firefox.*Plug-?in", avoidPlayers: "Totem|VLC|RealPlayer" }, isDisabled: function () { var a = this, d = a.$, c = a.$$, b = d.browser; if (a.detected || (b.isGecko && d.compareNums(b.verGecko, d.formatNum("1.8")) < 0) || (b.isOpera && b.verOpera < 10) || !d.DOM.isEnabled.objectTag() || !d.hasMimeType(a.mimeType) || !d.findNavPlugin(a.regStr.wmpFirefox, 0, a.regStr.avoidPlayers)) { return 1 } return 0 }, query: function () { var b = this, d = b.$, c = b.$$, a; if (b.isDisabled()) { return b }; a = d.getPROP(d.DOM.insert("object", ["type", b.mimeType, "data", ""], ["src", ""], "", c).obj(), "versionInfo"); if (a) { b.version = a } b.detected = a ? 1 : -1; return b } } }, silverlight: { $: 1, mimeType: "application/x-silverlight", progID: "AgControl.AgControl", digits: [20, 20, 9, 12, 31], getVersion: function () { var e = this, c = e.$, k = document, i = null, b = null, f = null, h = true, a = [1, 0, 1, 1, 1], r = [1, 0, 1, 1, 1], j = function (d) { return (d < 10 ? "0" : "") + d.toString() }, n = function (s, d, u, v, t) { return (s + "." + d + "." + u + j(v) + j(t) + ".0") }, o = function (s, d, t) { return q(s, (d == 0 ? t : r[0]), (d == 1 ? t : r[1]), (d == 2 ? t : r[2]), (d == 3 ? t : r[3]), (d == 4 ? t : r[4])) }, q = function (v, t, s, x, w, u) { var u; try { return v.IsVersionSupported(n(t, s, x, w, u)) } catch (u) { } return false }; if (!c.browser.isIE) { var g; if (c.hasMimeType(e.mimeType)) { g = c.browser.isGecko && c.compareNums(c.browser.verGecko, c.formatNum("1.6")) <= 0; if (c.browser.isGecko && g) { h = false } f = c.findNavPlugin("Silverlight.*Plug-?in", 0); if (f && f.description) { i = c.formatNum(f.description) } if (i) { r = i.split(c.splitNumRegx); if (parseInt(r[2], 10) >= 30226 && parseInt(r[0], 10) < 2) { r[0] = "2" } i = r.join(",") } } e.installed = f && h && i ? 1 : (f && h ? 0 : (f ? -0.2 : -1)) } else { b = c.getAXO(e.progID); var m, l, p; if (b && q(b, a[0], a[1], a[2], a[3], a[4])) { for (m = 0; m < e.digits.length; m++) { p = r[m]; for (l = p + (m == 0 ? 0 : 1); l <= e.digits[m]; l++) { if (o(b, m, l)) { h = true; r[m] = l } else { break } } if (!h) { break } } if (h) { i = n(r[0], r[1], r[2], r[3], r[4]) } } e.installed = b && h && i ? 1 : (b && h ? 0 : (b ? -0.2 : -1)) } e.version = c.formatNum(i) } }, vlc: { $: 1, mimeType: "application/x-vlc-plugin", progID: "VideoLAN.VLCPlugin", classID: "clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921", codebase: { $: 1, isMin: function (a) { return this.$.codebase.isMin(this, a) }, search: function () { return this.$.codebase.search(this) }, ParamTags: '<param name="volume" value="0" /><param name="autoplay" value="no" /><param name="loop" value="no" /><param name="fullscreen" value="no" /><param name="hidden" value="yes" />', DIGITMAX: [[11, 11, 16]], DIGITMIN: [0, 0, 0, 0], Upper: ["999"], Lower: ["0"], convert: [1] }, compareNums: function (e, d) { var c = this.$, k = e.split(c.splitNumRegx), i = d.split(c.splitNumRegx), h, b, a, g, f, j; for (h = 0; h < Math.min(k.length, i.length); h++) { j = /([\d]+)([a-z]?)/.test(k[h]); b = parseInt(RegExp.$1, 10); g = (h == 2 && RegExp.$2.length > 0) ? RegExp.$2.charCodeAt(0) : -1; j = /([\d]+)([a-z]?)/.test(i[h]); a = parseInt(RegExp.$1, 10); f = (h == 2 && RegExp.$2.length > 0) ? RegExp.$2.charCodeAt(0) : -1; if (b != a) { return (b > a ? 1 : -1) } if (h == 2 && g != f) { return (g > f ? 1 : -1) } } return 0 }, setPluginStatus: function (e, a, f) { var d = this, c = d.$, b = d.installed; d.installed = a ? 1 : (f ? (f > 0 ? 0.7 : -0.1) : (e ? 0 : -1)); if (a) { d.version = c.formatNum(a) } d.getVersionDone = d.installed == 0.7 || d.installed == -0.1 ? 0 : 1; c.codebase.emptyGarbage() }, getVersion: function (c) { var e = this, d = e.$, f = null, a = null, b; if (!d.browser.isIE) { if (d.hasMimeType(e.mimeType)) { f = d.findNavPlugin("VLC.*Plug-?in", 0, "Totem"); if (f && f.description) { a = d.getNum(f.description, "[\\d][\\d\\.]*[a-z]*") } } } else { f = d.getAXO(e.progID); if (f) { a = d.getNum(d.getPROP(f, "VersionInfo"), "[\\d][\\d\\.]*[a-z]*") }; if (!a || d.dbug) { b = e.codebase.isMin(c); if (b) { e.setPluginStatus(0, 0, b); return } } if (!a || d.dbug) { a = e.codebase.search() } } e.setPluginStatus(f, a, 0) } }, adobereader: { $: 1, setPluginStatus: function () { var d = this, b = d.$, a = d.navPlugin.detected, e = d.navPlugin.version, g = d.axo.detected, c = d.axo.version, i = d.doc.detected, h = d.doc.version, f = e || c || h || null; d.installed = f ? 1 : (a > 0 || g > 0 || i > 0 ? 0 : (i == -0.5 ? -0.15 : (b.browser.isIE && (!b.browser.ActiveXEnabled || b.browser.ActiveXFilteringEnabled) ? -1.5 : -1))); d.version = b.formatNum(f) }, getVersion: function (c, e) { var a = this, d = a.$, b = 0; if ((!b || d.dbug) && a.navPlugin.query().detected > 0) { b = 1 } if ((!b || d.dbug) && a.axo.query().detected > 0) { b = 1 } if ((!b || d.dbug) && (a.doc.query().detected > 0 || a.doc.detected == -0.5)) { b = 1 } a.setPluginStatus() }, navPlugin: { $: 1, detected: 0, version: null, mimeType: "application/pdf", isDisabled: function () { var c = this, b = c.$, a = c.$$; return b.browser.isIE || c.detected || !b.hasMimeType(c.mimeType) ? 1 : 0 }, attempt3: function () { var c = this, b = c.$, a = null; if (b.OS == 1) { if (b.hasMimeType("application/vnd.adobe.pdfxml")) { a = "9" } else { if (b.hasMimeType("application/vnd.adobe.x-mars")) { a = "8" } else { if (b.hasMimeType("application/vnd.adobe.xfdf")) { a = "6" } } } } return a }, query: function () { var d = this, c = d.$, a = d.$$, f, e, b = null; if (d.isDisabled()) { return d }; f = "Adobe.*PDF.*Plug-?in|Adobe.*Acrobat.*Plug-?in|Adobe.*Reader.*Plug-?in"; e = c.findNavPlugin(f, 0); d.detected = e ? 1 : -1; if (e) { b = c.getNum(e.description) || c.getNum(e.name); b = c.getPluginFileVersion(e, b); if (!b) { b = d.attempt3() } } if (b) { d.version = b }; return d } }, pluginQuery: function (j) { var f = this, d = f.$, b = "", h = null, g, a, i, c; try { if (j) { b = j.GetVersions() } } catch (g) { } if (b && d.isString(b)) { a = /=\s*([\d\.]+)/g; for (i = 0; i < 30; i++) { if (a.test(b)) { c = d.formatNum(RegExp.$1); if (!h || d.compareNums(c > h) > 0) { h = c } } else { break } } } return h }, axo: { $: 1, detected: 0, version: null, progID: ["AcroPDF.PDF", "AcroPDF.PDF.1", "PDF.PdfCtrl", "PDF.PdfCtrl.5", "PDF.PdfCtrl.1"], isDisabled: function () { var b = this, c = b.$, a = b.$$; return c.browser.isIE && !b.detected ? 0 : 1 }, query: function () { var d = this, e = d.$, b = d.$$, f = 0, c = null, a; if (d.isDisabled()) { return d }; for (a = 0; a < d.progID.length; a++) { f = e.getAXO(d.progID[a]); if (f) { d.detected = 1; c = b.pluginQuery(f); if (!e.dbug && c) { break } } } d.version = c ? c : null; if (d.detected === 0) { d.detected = -1 }; return d } }, doc: { $: 1, detected: 0, version: null, classID: "clsid:CA8A9780-280D-11CF-A24D-444553540000", classID_dummy: "clsid:CA8A9780-280D-11CF-A24D-BA9876543210", DummySpanTagHTML: 0, HTML: 0, DummyObjTagHTML1: 0, DummyObjTagHTML2: 0, isDisabled: function () { var c = this, b = c.$, a = 0; if (c.detected) { a = 1 } else { if (b.dbug) { } else { if (!b.browser.isIE || !b.DOM.isEnabled.objectTag()) { a = 1 } } } return a }, query: function () { var i = this, d = i.$, f = i.$$, h = null, a = d.DOM.altHTML, g = null, c = 1, e = 1, b; if (i.isDisabled()) { return i }; if (!i.DummySpanTagHTML) { i.DummySpanTagHTML = d.DOM.insert("", [], [], a, f, e) } if (!i.HTML) { i.HTML = d.DOM.insert("object", ["classid", i.classID], [], a, f, e) } if (!i.DummyObjTagHTML2) { i.DummyObjTagHTML2 = d.DOM.insert("object", ["classid", i.classID_dummy], [], a, f, e) } b = d.DOM.getTagStatus(i.HTML, i.DummySpanTagHTML, i.DummyObjTagHTML1, i.DummyObjTagHTML2, g, c); h = f.pluginQuery(i.HTML.obj()); i.detected = b > 0 || h ? 1 : (b == -0.1 || b == -0.5 ? -0.5 : -1); i.version = h ? h : null; return i } } }, pdfreader: { $: 1, OTF: null, detectIE3P: 0, setPluginStatus: function () { var a = this, e = a.$, f = a.doc.result, d = a.mime.result, c = a.axo.result, b = a.OTF; a.version = null; if (b == 3) { a.installed = -0.5 } else { a.installed = f > 0 || d > 0 || c > 0 ? 0 : (f == -0.5 ? -0.15 : (e.browser.isIE && (!e.browser.ActiveXEnabled || e.browser.ActiveXFilteringEnabled || !a.detectIE3P) ? -1.5 : -1)) } if (a.verify && a.verify.isEnabled()) { a.getVersionDone = 0 } else { if (a.getVersionDone != 1) { a.getVersionDone = !a.doc.isDisabled() && a.installed <= -1 ? 0 : 1 } } }, getVersion: function (k, d, m) { var f = this, b = f.$, h = false, c, a, i, g = f.NOTF, l = f.doc, j = f.verify; if (b.isDefined(m)) { f.detectIE3P = m ? 1 : 0 } if (f.getVersionDone === null) { f.OTF = 0; if (j) { j.begin() } } b.file.save(f, ".pdf", d); if (f.getVersionDone === 0) { if (j && j.isEnabled() && b.isNum(f.installed) && f.installed >= 0) { return } if (l.insertHTMLQuery() > 0) { h = true } f.setPluginStatus(); return } if ((!h || b.dbug) && f.mime.query() > 0) { h = true } if ((!h || b.dbug) && f.axo.query() > 0) { h = true } if ((!h || b.dbug) && l.insertHTMLQuery() > 0) { h = true } f.setPluginStatus() }, mime: { $: 1, mimeType: "application/pdf", result: 0, isDisabled: function () { var a = this.$; return a.browser.isIE ? 1 : 0 }, query: function () { var c = this, b = c.$, a = c.$$; if (!c.isDisabled() && !c.result) { c.result = b.hasMimeType(c.mimeType) ? 1 : -1 } return c.result } }, axo: { $: 1, result: 0, progID: ["AcroPDF.PDF", "AcroPDF.PDF.1", "PDF.PdfCtrl", "PDF.PdfCtrl.5", "PDF.PdfCtrl.1"], prodID3rd: ["NitroPDF.IE.ActiveDoc", "PDFXCviewIEPlugin.CoPDFXCviewIEPlugin", "PDFXCviewIEPlugin.CoPDFXCviewIEPlugin.1", "FoxitReader.FoxitReaderCtl", "FoxitReader.FoxitReaderCtl.1", "FOXITREADEROCX.FoxitReaderOCXCtrl", "FOXITREADEROCX.FoxitReaderOCXCtrl.1"], isDisabled: function () { var a = this.$; return a.browser.isIE ? 0 : 1 }, query: function () { var c = this, d = c.$, b = c.$$, a; if (!c.isDisabled() && !c.result) { c.result = -1; for (a = 0; a < c.progID.length; a++) { if (d.getAXO(c.progID[a])) { c.result = 1; if (!d.dbug) { break } } } if ((c.result < 0 && b.detectIE3P) || d.dbug) { for (a = 0; a < c.prodID3rd.length; a++) { if (d.getAXO(c.prodID3rd[a])) { c.result = 1; if (!d.dbug) { break } } } } } return c.result } }, doc: { $: 1, result: 0, classID: "clsid:CA8A9780-280D-11CF-A24D-444553540000", classID_dummy: "clsid:CA8A9780-280D-11CF-A24D-BA9876543210", mimeType: "application/pdf", mimeType_dummy: "application/dummymimepdf", DummySpanTagHTML: 0, HTML: 0, DummyObjTagHTML1: 0, isDisabled: function () { var e = this, d = e.$, a = e.$$, c = 0, b = d.browser; if (a.OTF >= 2) { c = 1 } else { if (d.dbug) { } else { if (!d.DOM.isEnabled.objectTag() || (b.isGecko && d.compareNums(b.verGecko, "2,0,0,0") <= 0 && d.OS <= 4) || (b.isOpera && b.verOpera <= 11 && d.OS <= 4) || (b.isChrome && d.compareNums(b.verChrome, "10,0,0,0") < 0 && d.OS <= 4)) { c = 1 } } } return c }, queryObject: function (c) { var f = this, e = f.$, b = f.$$, a = 0, d = 1; a = e.DOM.getTagStatus(f.HTML, f.DummySpanTagHTML, f.DummyObjTagHTML1, 0, c, d); f.result = a; return a }, insertHTMLQuery: function () { var g = this, f = g.$, a = g.$$, b = a.pdf, d = f.file.getValid(a), e = 1, c = f.DOM.altHTML; if (!d || !d.full || g.isDisabled()) { return g.result } if (a.OTF < 2) { a.OTF = 2 }; d = d.full; if (!g.DummySpanTagHTML) { g.DummySpanTagHTML = f.DOM.insert("", [], [], c, a, e) } if (!g.HTML) { g.HTML = f.DOM.insert("object", (f.browser.isIE && !a.detectIE3P ? ["classid", g.classID] : ["type", g.mimeType]).concat(["data", d]), ["src", d], c, a, e) } if (!g.DummyObjTagHTML1) { g.DummyObjTagHTML1 = f.DOM.insert("object", (f.browser.isIE && !a.detectIE3P ? ["classid", g.classID_dummy] : ["type", g.mimeType_dummy]), [], c, a, e) } g.queryObject(); if (f.browser.isIE && g.result === 0) { g.HTML.span.innerHTML = g.HTML.outerHTML; g.DummyObjTagHTML1.span.innerHTML = g.DummyObjTagHTML1.outerHTML; g.queryObject() } if ((g.result > 0 || g.result < -0.1) && !f.dbug) { return g.result } var h = a.NOTF; if (a.OTF < 3 && g.HTML && h) { a.OTF = 3; h.onIntervalQuery = f.ev.handler(h.$$onIntervalQuery, h); if (!f.win.loaded) { f.win.funcs0.push([h.winOnLoadQuery, h]) } setTimeout(h.onIntervalQuery, h.intervalLength) } return g.result } }, NOTF: { $: 1, count: 0, countMax: 25, intervalLength: 250, $$onIntervalQuery: function (d) { var b = d.$, a = d.$$, c = a.doc; if (a.OTF == 3) { c.queryObject(d.count); if (c.result || (b.win.loaded && d.count > d.countMax)) { d.queryCompleted() } } d.count++; if (a.OTF == 3) { setTimeout(d.onIntervalQuery, d.intervalLength) } }, winOnLoadQuery: function (b, d) { var a = d.$$, c = a.doc; if (a.OTF == 3) { c.queryObject(d.count); d.queryCompleted() } }, queryCompleted: function () { var d = this, b = d.$, a = d.$$, c = a.doc; if (a.OTF == 4) { return } a.OTF = 4; a.setPluginStatus(); if (b.onDetectionDone && a.funcs) { b.ev.callArray(a.funcs) } if (b.DOM) { b.DOM.onDoneEmptyDiv() } } }, getInfo: function () { var b = this, c = b.$, a = { OTF: (b.OTF < 3 ? 0 : (b.OTF == 3 ? 1 : 2)), DummyPDFused: (b.doc.result > 0 ? true : false) }; return a }, zz: 0 }, realplayer: { $: 1, mimeType: ["audio/x-pn-realaudio-plugin"], progID: ["rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer"], classID: "clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA", INSTALLED: {}, q1: [[11, 0, 0], [999], [663], [663], [663], [660], [468], [468], [468], [468], [468], [468], [431], [431], [431], [372], [180], [180], [172], [172], [167], [114], [0]], q3: [[6, 0], [12, 99], [12, 69], [12, 69], [12, 69], [12, 69], [12, 69], [12, 69], [12, 69], [12, 69], [12, 69], [12, 69], [12, 46], [12, 46], [12, 46], [11, 3006], [11, 2806], [11, 2806], [11, 2804], [11, 2804], [11, 2799], [11, 2749], [11, 2700]], compare: function (g, f) { var e, d = g.length, i = f.length, c, h; for (e = 0; e < Math.max(d, i); e++) { c = e < d ? g[e] : 0; h = e < i ? f[e] : 0; if (c > h) { return 1 } if (c < h) { return -1 } } return 0 }, convertNum: function (a, f, e) { var g = this, c = g.$, d, b, h, i = null; if (!a || !(d = c.formatNum(a))) { return i } d = d.split(c.splitNumRegx); for (h = 0; h < d.length; h++) { d[h] = parseInt(d[h], 10) } if (g.compare(d.slice(0, Math.min(f[0].length, d.length)), f[0]) != 0) { return i } b = d.length > f[0].length ? d.slice(f[0].length) : []; if (g.compare(b, f[1]) > 0 || g.compare(b, f[f.length - 1]) < 0) { return i } for (h = f.length - 1; h >= 1; h--) { if (h == 1) { break } if (g.compare(f[h], b) == 0 && g.compare(f[h], f[h - 1]) == 0) { break } if (g.compare(b, f[h]) >= 0 && g.compare(b, f[h - 1]) < 0) { break } } return e[0].join(".") + "." + e[h].join(".") }, getVersion: function (m, n) { var j = this, k = null, c = 0, g = 0, d = j.$, q, i, s, a = j.mimeType[0]; if (d.isString(n)) { n = n.replace(/\s/g, ""); if (n) { a = n } } else { n = null } if (d.isDefined(j.INSTALLED[a])) { j.installed = j.INSTALLED[a]; return } if (!d.browser.isIE) { var l = "RealPlayer.*Plug-?in", h = d.hasMimeType(j.mimeType), o = d.findNavPlugin(l, 0); if (h && o) { c = 1; if (n) { if (d.getMimeEnabledPlugin(n, l)) { g = 1 } else { g = 0 } } else { g = 1 } } if (j.getVersionDone !== 0) { j.getVersionDone = 0; if (h) { var p = 1, b = null, r = null; s = d.hasMimeType("application/vnd.rn-realplayer-javascript"); if (s) { b = d.formatNum(d.getNum(s.enabledPlugin.description)) }; if (d.OS == 1 && b) { var f = b.split(d.splitNumRegx); r = true; if (j.compare(f, [6, 0, 12, 200]) < 0) { r = false } else { if (j.compare(f, [6, 0, 12, 1739]) <= 0 && j.compare(f, [6, 0, 12, 857]) >= 0) { r = false } } } if (r === false) { p = 0 } if (d.OS <= 2) { if (d.browser.isGecko && d.compareNums(d.browser.verGecko, d.formatNum("1,8")) < 0) { p = 0 } if (d.browser.isChrome) { p = 0 } if (d.browser.isOpera && d.browser.verOpera < 10) { p = 0 } } else { p = 0 } if (!k && p && d.DOM.isEnabled.objectTag()) { s = d.DOM.insert("object", ["type", j.mimeType[0]], ["src", "", "autostart", "false", "imagestatus", "false", "controls", "stopbutton"], "", j).obj(); try { k = d.getNum(s.GetVersionInfo()) } catch (q) { } d.DOM.setStyle(s, ["display", "none"]) } if (!k && b && r === false) { s = j.convertNum(b, j.q3, j.q1); k = s ? s : b } } } else { k = j.version } j.installed = c && g && k ? 1 : (c && g ? 0 : (c ? -0.2 : -1)) } else { s = null; for (i = 0; i < j.progID.length; i++) { s = d.getAXO(j.progID[i]); if (s) { try { k = d.getNum(s.GetVersionInfo()); break } catch (q) { } } } j.installed = k ? 1 : -1 } if (!j.version) { j.version = d.formatNum(k) } j.INSTALLED[a] = j.installed } }, iecomponent: { $: 1, setPluginStatus: function (c, b, d) { var a = this, e = a.$; a.version = e.formatNum(b); a.installed = b ? 1 : (c ? 0 : (d ? -3 : -1)) }, getVersion: function (f, c) { var b = this, g = b.$, h, d = null, a = null; b.getVersionDone = 0; if (!g.browser.isIE) { b.setPluginStatus(0, 0); return } if (c && g.isString(c) && (/[^\s]+/).test(c)) { c = c.replace(/\s/g, "") } else { b.setPluginStatus(0, 0, 1); return } if (!b.obj) { b.obj = document.createElement("div"); try { b.obj.style.behavior = "url(#default#clientcaps)" } catch (h) { } } try { a = b.obj.getComponentVersion(c, "componentid").replace(/,/g, ".") } catch (h) { } try { if (!a) { d = b.obj.isComponentInstalled(c, "componentid") ? 1 : 0 } } catch (h) { } b.setPluginStatus(d, a) } }, activex: { $: 1, storage: {}, codebase: { $: 1, isMin: function (a) { return this.$.codebase.isMin(this, a) }, search: function () { return this.$.codebase.search(this) }, classID: "", ParamTags: '<param name="src" value="" />', DIGITMAX: [[100, 100, 100, 0]], DIGITMIN: [0, 0, 0, 0], Upper: ["99999"], Lower: ["0"], convert: [1] }, clone: function (c, a) { var h = this, d = h.$, g, e, i, f = 0, b = 20; if (d.isNum(c) || d.isString(c) || c === null || d.isFunc(c) || c === d || c === d.Plugins || c === h) { return c } else { if (c.window || c.firstChild || c.appendChild) { return c } else { if (d.isArray(c)) { i = [] } else { if (c) { i = {} } } } } for (g in c) { f++; i[g] = h.clone(c[g], g) } return i }, setPluginStatus: function (e, a, b) { var d = this, c = d.$; d.version = c.formatNum(a); d.installed = a ? 1 : (e ? (e > 0 ? 0.7 : -0.1) : (b ? -3 : -1)) }, getVersion: function (f, g, j) { var k = this, e = k.$, b = null, h = null, i, d, c, a = ""; k.getVersionDone = 0; if (g && e.isString(g) && (/[^\s]+/).test(g)) { g = g.replace(/\s/g, ""); a = g.replace(/[\:\-\/]/g, "$") } else { k.setPluginStatus(0, 0, 1); return } if (e.isArray(j)) { if (!j.length) { j.push(0) } for (i = 0; i < j.length; i++) { if (!e.isDefined(j[i])) { j[i] = 0 } if (!e.isNum(j[i]) || j[i] < 0 || j[i] > 99999999) { k.setPluginStatus(0, 0, 1); return } } if (a && k.storage[a]) { d = k.storage[a].codebase; c = 0; for (i = 0; i < Math.max(j.length, d.DIGITMAX[0].length); i++) { if ((i < j.length ? j[i] : 0) > (i < d.DIGITMAX[0].length ? d.DIGITMAX[0][i] : 0)) { c = 1; break } } if (c && d.version) { c = d.version.split(e.splitNumRegx); for (i = 0; i < Math.max(c.length, d.DIGITMAX[0].length); i++) { if ((i < c.length ? c[i] : 0) === (i < d.DIGITMAX[0].length ? d.DIGITMAX[0][i] : 0)) { k.storage[a] = null; break } } } } } else { j = [0] } if (a && !k.storage[a]) { k.storage[a] = { codebase: k.clone(k.codebase) }; k.storage[a].codebase.classID = g; if (e.isArray(j) && j.length) { k.storage[a].codebase.DIGITMAX = [[].concat(j)] } } if (f) { b = k.storage[a].codebase.isMin(f); h = k.storage[a].codebase.version } else { b = 0; h = k.storage[a].codebase.search() } k.setPluginStatus(b, h); e.codebase.emptyGarbage() } }, pdfjs: { $: 1, OTF: null, setPluginStatus: function () { var b = this, c = b.$, d = b.doc.result, a = b.OTF; b.version = null; if (a == 3) { b.installed = -0.5 } else { b.installed = d > 0 ? 0 : -1 } if (b.verify && b.verify.isEnabled()) { b.getVersionDone = 0 } else { if (b.getVersionDone != 1) { b.getVersionDone = !b.doc.isDisabled() && b.installed <= -1 ? 0 : 1 } } }, getVersion: function (c, b) { var d = this, e = d.$, a = false, g = d.verify, h = d.NOTF, f = d.doc; if (d.getVersionDone === null) { d.OTF = 0; if (g) { g.begin() } } e.file.save(d, ".pdf", b); if (d.getVersionDone === 0) { if (g && g.isEnabled() && e.isNum(d.installed) && d.installed >= 0) { return } } if ((!a || e.dbug) && f.insertHTMLQuery() > 0) { a = true } d.setPluginStatus() }, doc: { $: 1, result: 0, mimeObj: 0, mimeType: "application/pdf", mimeType_dummy: "application/dummymimepdf", DummySpanTagHTML: 0, HTML: 0, DummyObjTagHTML1: 0, isDisabled: function () { var e = this, d = e.$, c = e.$$, b = 0, a = d.browser; if (c.OTF >= 2) { b = 1 } else { if (d.dbug) { } else { if (!d.DOM.isEnabled.objectTag() || !a.isGecko || (d.compareNums(a.verGecko, d.formatNum("19")) < 0 && e.mimeObj)) { b = 1 } } } return b }, tabIndex: null, method: "", queryObject: function (b) { var j = this, f = j.$, g = j.$$, d = j.HTML ? j.HTML.obj() : 0, h, a, l, c, i, k = f.dbug && !f.win.loaded ? 0 : 1; a = f.DOM.getTagStatus(j.HTML, j.DummySpanTagHTML, j.DummyObjTagHTML1, 0, b); if ((!j.result || f.dbug) && a < 0) { if (k) { j.result = -1 } j.method += "1," } if ((!j.result || f.dbug) && a > 0 && !j.mimeObj) { if (k) { j.result = 1 } j.method += "2," } try { l = d ? d.tabIndex : null } catch (h) { } if (!f.isNum(j.tabIndex) && f.isNum(l)) { j.tabIndex = l } if ((!j.result || f.dbug) && a > 0 && f.isNum(l) && f.isNum(j.tabIndex) && j.tabIndex !== l) { if (k) { j.result = 1 } j.method += "4," }; return j.result }, insertHTMLQuery: function () { var g = this, f = g.$, d = g.$$, c, b = f.file.getValid(d), e = 1, a = f.DOM.altHTML; if (g.mimeObj === 0) { g.mimeObj = f.hasMimeType(g.mimeType) } if (!b || !b.full || g.isDisabled()) { return g.result } if (d.OTF < 2) { d.OTF = 2 } b = b.full; if (!g.DummySpanTagHTML) { g.DummySpanTagHTML = f.DOM.insert("", [], [], a, d, e) } if (!g.HTML) { g.HTML = f.DOM.insert("object", ["type", g.mimeType, "data", b], ["src", b], a, d, e) } if (!g.DummyObjTagHTML1) { g.DummyObjTagHTML1 = f.DOM.insert("object", ["type", g.mimeType_dummy], [], a, d, e) } g.queryObject(); if ((g.result > 0 || g.result < 0) && !f.dbug) { return g.result } var h = d.NOTF; if (d.OTF < 3 && g.HTML && h) { d.OTF = 3; h.onIntervalQuery = f.ev.handler(h.$$onIntervalQuery, h); if (!f.win.loaded) { f.win.funcs0.push([h.winOnLoadQuery, h]) } setTimeout(h.onIntervalQuery, h.intervalLength) } return g.result } }, NOTF: { $: 1, count: 0, countMax: 25, intervalLength: 250, $$onIntervalQuery: function (d) { var b = d.$, a = d.$$, c = a.doc; if (a.OTF == 3) { c.queryObject(d.count); if (c.result || (b.win.loaded && d.count > d.countMax)) { d.queryCompleted() } } d.count++; if (a.OTF == 3) { setTimeout(d.onIntervalQuery, d.intervalLength) } }, winOnLoadQuery: function (b, d) { var a = d.$$, c = a.doc; if (a.OTF == 3) { c.queryObject(d.count); d.queryCompleted() } }, queryCompleted: function () { var d = this, b = d.$, a = d.$$, c = a.doc; if (a.OTF == 4) { return } a.OTF = 4; a.setPluginStatus(); if (b.onDetectionDone && a.funcs) { b.ev.callArray(a.funcs) } if (b.DOM) { b.DOM.onDoneEmptyDiv() } } }, zz: 0 }, zz: 0} }; _fp_lib_2013_.PluginDetect.INIT();

_fp_lib_2013_.getCanvas = function () {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var txt = 'ClearSale FingerPrint';
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    return canvas.toDataURL();
}

_fp_lib_2013_.LocalStorage = function(name, value)
{
	try
	{
		if (window.localStorage)
		{
			if (typeof(value) != "undefined")
				localStorage.setItem(name, value);
			else
				return localStorage.getItem(name);
		}
	}
	catch (e) { }

};

_fp_lib_2013_.DataBaseStorage = function (name, value) {
    try {
        if (window.openDatabase) {
            var database = window.openDatabase("sqlite_clearsale", "", "clearsale", 1024 * 1024);

            if (typeof (value) != "undefined")
                database.transaction(function (tx) {
                    tx.executeSql("CREATE TABLE IF NOT EXISTS cache(" +
						"id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, " +
						"name TEXT NOT NULL, " +
						"value TEXT NOT NULL, " +
						"UNIQUE (name)" +
					")", [], function (tx, rs) { }, function (tx, err) { });

                    tx.executeSql("INSERT OR REPLACE INTO cache(name, value) VALUES(?, ?)", [name, value],
						function (tx, rs) { }, function (tx, err) { })
                });
            else {
                database.transaction(function (tx) {
                    tx.executeSql("SELECT value FROM cache WHERE name=?", [name],
					function (tx, result1) {
					    if (result1.rows.length >= 1)
					        self._ec.dbData = result1.rows.item(0)['value'];
					    else
					        self._ec.dbData = '';
					}, function (tx, err) { })
                });
            }
        }
    } catch (e) { }
}

_fp_lib_2013_.SessionStorage = function (name, value) {
    try {
        if (window.sessionStorage) {
            if (typeof (value) != "undefined")
                sessionStorage.setItem(name, value);
            else
                return sessionStorage.getItem(name);
        }
    } catch (e) { }
}

_fp_lib_2013_.GlobalStorage = function (name, value) {
    if (window.globalStorage) {
        var host = this.getHost();

        try {
            if (typeof (value) != "undefined")
                eval("globalStorage[host]." + name + " = value");
            else
                return eval("globalStorage[host]." + name);
        } catch (e) { }
    }
}


/* Lalit.Lab Framawork */
_fp_lib_2013_.Detector = function () {
    var baseFonts = ['monospace', 'sans-serif', 'serif'];
    var testString = "mmmmmmmmmmlli";
    var testSize = '72px';

    var h = document.getElementsByTagName("body")[0];
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth;
        defaultHeight[baseFonts[index]] = s.offsetHeight;
        h.removeChild(s);
    }

    function detect(font) {
        var detected = false;
        try {
            for (var index in baseFonts) {
                s.style.fontFamily = font + ',' + baseFonts[index]; //
                h.appendChild(s);
                var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
                h.removeChild(s);
                detected = detected || matched;
            }
            return detected;
        }
        catch (err) { return detected; }
    }

    this.detect = detect;
};

/* Silverlight detection */
_fp_lib_2013_.SLDetector = function () {
    var browser = navigator.appName;

    var silverlightInstalled = false;
    if (browser == 'Microsoft Internet Explorer') {
        try {
            var slControl = new ActiveXObject('AgControl.AgControl');
            silverlightInstalled = true;
        }
        catch (e) {
            return false;
        }
    } else {
        try {
            if (navigator.plugins["Silverlight Plug-In"]) {
                silverlightInstalled = true;
            }
        }
        catch (e) {
            return false;
        }
    }

    return silverlightInstalled;
};

_fp_lib_2013_.variable = function (key, value) {
    this.key = key;
    this.value = JSON.stringify(value);
};
_fp_lib_2013_.variableRequest = function (id, source, variables) {
    this.id = id;
    this.source = source;
    this.variables = variables;
};
_fp_lib_2013_.getBrowserInformations = function (id, Key) {
    try {
        var variables = new Array();
        variables[0] = new _fp_lib_2013_.variable("JavaScriptUserAgent", navigator.userAgent);
        variables[1] = new _fp_lib_2013_.variable("JavaScriptScreenHeight", screen.height);
        variables[2] = new _fp_lib_2013_.variable("JavaScriptScreenWidth", screen.width);
        variables[3] = new _fp_lib_2013_.variable("JavaScriptScreenColorDepth", screen.colorDepth);
        variables[4] = new _fp_lib_2013_.variable("JavaScriptTimezoneOffset", (new Date()).getTimezoneOffset());
        variables[5] = new _fp_lib_2013_.variable("JavaScriptSessionStorage", !!window.sessionStorage);
        variables[6] = new _fp_lib_2013_.variable("JavaScriptLocalStorage", !!window.localStorage);
        variables[7] = new _fp_lib_2013_.variable("JavaScriptNavigatorPlugins", _fp_lib_2013_.getPlugins());
        variables[8] = new _fp_lib_2013_.variable("JavaScriptSystemFonts", _fp_lib_2013_.getInstalledFonts());
        variables[9] = new _fp_lib_2013_.variable("Canvas", _fp_lib_2013_.getCanvas());
        

        var value = _fp_lib_2013_.getCookie("FingerPrint");
        if (value) {
            variables[10] = new _fp_lib_2013_.variable("JavaScriptCookie", value);
			variables[11] = new _fp_lib_2013_.variable("LocalStorage", _fp_lib_2013_.LocalStorage("FingerPrintCookie"));
        }else
		{
		variables[10] = new _fp_lib_2013_.variable("LocalStorage", _fp_lib_2013_.LocalStorage("FingerPrintCookie"));
		}

		
		
        var informations = new _fp_lib_2013_.variableRequest(id, Key, variables);
        return informations;
    }
    catch (err) {
        return new _fp_lib_2013_.variableRequest(id, Key, new Array());
    }
};
_fp_lib_2013_.getInstalledFonts = function () {
    var res = [];
    var installedFonts = "";
    var i = 0;
    try {
        var fonts = [];
        var detector = new _fp_lib_2013_.Detector();

        fonts.push("Arial");
        fonts.push("Arial Black");
        fonts.push("Arial Narrow");
        fonts.push("Arial Rounded MT Bold");
        fonts.push("Akzidenz Grotesk");
        fonts.push("Avant Garde");
        fonts.push("Arnhem");
        fonts.push("Bookman Old Style");
        fonts.push("Bradley Hand ITC");
        fonts.push("Bodoni");
        fonts.push("Bembo");
        fonts.push("cursive");
        fonts.push("Century");
        fonts.push("Century Gothic");
        fonts.push("Comic Sans MS");
        fonts.push("Courier");
        fonts.push("Courier New");
        fonts.push("default");
        fonts.push("DIN");
        fonts.push("Eurostile");
        fonts.push("fantasy");
        fonts.push("Frutiger");
        fonts.push("Futura");
        fonts.push("Franklin Gothic");
        fonts.push("Georgia");
        fonts.push("Gentium");
        fonts.push("Garamond");
        fonts.push("Gill Sans");
        fonts.push("Helvetica");
        fonts.push("Impact");
        fonts.push("Interstate");
        fonts.push("King");
        fonts.push("Lucida Console");
        fonts.push("Lalit");
        fonts.push("Letter Gothic");
        fonts.push("monospace");
        fonts.push("Modena");
        fonts.push("Monotype Corsiva");
        fonts.push("Matrix");
        fonts.push("Minion");
        fonts.push("Myriad");
        fonts.push("Officina");
        fonts.push("Optima");
        fonts.push("OCR");
        fonts.push("Papyrus");
        fonts.push("Rockwell");
        fonts.push("serif");
        fonts.push("sans-serif");
        fonts.push("Sabon");
        fonts.push("Stone");
        fonts.push("Tahoma");
        fonts.push("TeX");
        fonts.push("Times");
        fonts.push("Times New Roman");
        fonts.push("Trebuchet MS");
        fonts.push("Univers");
        fonts.push("Verdana");
        fonts.push("Verona");
        fonts.push("Walbaum");

        var result;
        for (i = 0; i < fonts.length; i++) {
            result = detector.detect(fonts[i]);

            if (result) {
                res.push(fonts[i]);
            }
        }

        for (i = 0; i < res.length; i++) {
            installedFonts = installedFonts + res[i];

            if (i != (res.length - 1)) {
                installedFonts = installedFonts + ";";
            }
        }
        return installedFonts;
    }
    catch (err) { return installedFonts; }
};
_fp_lib_2013_.getPlugins = function () {
    var list = [];
    try {

        if (_fp_lib_2013_.PluginDetect.browser.isIE) {
            var plugin;
            if (navigator.javaEnabled()) {
                plugin = { name: "JAVA", desc: "", mime: [] };
                list.push(plugin);
            }

            var flashversion = _fp_lib_2013_.PluginDetect.getVersion('FLASH');
            if (flashversion != null) {
                plugin = { name: "FLASH", desc: flashversion, mime: [] }
                list.push(plugin);
            }

            var QuickTimeVersion = _fp_lib_2013_.PluginDetect.getVersion('QuickTime');
            if (QuickTimeVersion != null) {
                plugin = { name: 'QuickTime', desc: QuickTimeVersion, mime: [] }
                list.push(plugin);
            }

            var RealPlayerVersion = _fp_lib_2013_.PluginDetect.getVersion('RealPlayer');
            if (RealPlayerVersion != null) {
                plugin = { name: 'RealPlayer', desc: RealPlayerVersion, mime: [] }
                list.push(plugin);
            }

            var ShockwaveVersion = _fp_lib_2013_.PluginDetect.getVersion("Shockwave");
            if (ShockwaveVersion != null) {
                plugin = { name: "Shockwave", desc: ShockwaveVersion, mime: [] }
                list.push(plugin);
            }

            var VCLVersion = _fp_lib_2013_.PluginDetect.getVersion("VLC");
            if (VCLVersion != null) {
                plugin = { name: "VLC", desc: VCLVersion, mime: [] }
                list.push(plugin);
            }

            var WindowsMediaPlayerVersion = _fp_lib_2013_.PluginDetect.getVersion('WindowsMediaPlayer');
            if (WindowsMediaPlayerVersion != null) {
                plugin = { name: 'WindowsMediaPlayer', desc: WindowsMediaPlayerVersion, mime: [] }
                list.push(plugin);
            }

            var SilverlightVersion = _fp_lib_2013_.PluginDetect.getVersion('Silverlight');
            if (SilverlightVersion != null) {
                plugin = { name: 'Silverlight', desc: SilverlightVersion, mime: [] }
                list.push(plugin);
            }

            var DevalVRVersion = _fp_lib_2013_.PluginDetect.getVersion('DevalVR');
            if (DevalVRVersion != null) {
                plugin = { name: 'DevalVR', desc: DevalVRVersion, mime: [] }
                list.push(plugin);
            }
        }
        else {
            var p, i, j, ref, mimeType, len, lenj
            plugins = navigator.plugins;
            for (j = 0, len = plugins.length; j < len; ++j) {
                p = plugins[j];
                plugin = {
                    name: p.name,
                    desc: p.description,
                    mime: []
                };
                for (i = 0, lenj = p.length; i < lenj; ++i) {
                    ref = p[i];
                    mimeType = {
                        type: ref.type
                    };
                    if (ref.suffixes) {
                        mimeType.suffixes = ref.suffixes;
                    }
                    plugin.mime.push(mimeType);
                }
                list.push(plugin);
            }
        }
        return list;
    }
    catch (err) { return list; }
};
_fp_lib_2013_.requestMethod = function (variables) {
    try {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            }
        };
        xmlhttp.open("POST", _fp_lib_2013_.ApiPath, true);
        xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xmlhttp.send(JSON.stringify(variables));
    }
    catch (err) { }
};
_fp_lib_2013_.request = function (variables) {
    try {
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            }
        };
        xmlhttp.open("POST", _fp_lib_2013_.ApiPath, true);
        xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xmlhttp.send(variables);
    }
    catch (err) { }
};
_fp_lib_2013_.setCookie = function (c_name, value, exdays) {
    try {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + exdays);
        var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = c_name + "=" + c_value;
    }
    catch (err) { }
};
_fp_lib_2013_.getCookie = function (c_name) {
    try {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(" " + c_name + "=");

        if (c_start == -1) {
            c_start = c_value.indexOf(c_name + "=");
        }
        if (c_start == -1) {
            c_value = null;
        }
        else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);

            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }
    catch (err) { return ""; }
};
_fp_lib_2013_.InitializeSilverlight = function (SessionId, elementId, Key) {
    try {
        var obj = document.createElement("object");
        obj.data = "data:application/x-silverlight-2,";
        obj.type = "application/x-silverlight-2";
        obj.width = '100%';
        obj.height = '100%';
        obj.id = 'projeto';

        var param1 = document.createElement("param");
        param1.name = "source";
        param1.value = _fp_lib_2013_.AppsRootPath + '/JS/Dependencies/SilverLight/ProjetoSilverlight1.xap';
        obj.appendChild(param1);

        var param2 = document.createElement("param");
        param2.name = 'onError';
        param2.value = 'onSilverlightError';
        obj.appendChild(param2);

        var param3 = document.createElement("param");
        param3.name = 'minRuntimeVersion';
        param3.value = '5.0.61118.0';
        obj.appendChild(param3);

        var param4 = document.createElement("param");
        param4.name = 'enableHtmlAccess';
        param4.value = 'true';
        obj.appendChild(param4);

        var param5 = document.createElement("param");
        param5.name = 'autoUpgrade';
        param5.value = 'true';
        obj.appendChild(param5);

        var param6 = document.createElement("param");
        param6.name = 'onLoad';
        param6.value = 'pluginLoaded';
        obj.appendChild(param6);

        var val = 'SessionID=' + SessionId + ',apiPath=' + _fp_lib_2013_.ApiPath + ',Key=' + Key;
        var param7 = document.createElement("param");
        param7.name = 'initParams';
        param7.value = val;
        obj.appendChild(param7);

        var element = document.getElementById(elementId);
        element.appendChild(obj);
    }
    catch (err) { }
};
_fp_lib_2013_.InitializeJava = function (SessionId, elementId, Key) {
    try {
        var obj = document.createElement("applet");
        obj.codeBase = _fp_lib_2013_.AppsRootPath + '/JS/Dependencies/Java/';
        obj.code = 'PrintApplet.class';
        obj.width = '500';
        obj.height = '500';
        obj.name = 'PrintApplet';

        var param1 = document.createElement("param");
        param1.name = 'SessionID';
        param1.value = SessionId;
        obj.appendChild(param1);

        var param2 = document.createElement("param");
        param2.name = 'apiPath';
        param2.value = _fp_lib_2013_.ApiPath;
        obj.appendChild(param2);

        var param3 = document.createElement("param");
        param3.name = 'Key';
        param3.value = Key;
        obj.appendChild(param3);

        var element = document.getElementById(elementId);
        element.appendChild(obj);
    }
    catch (err) { }
};
_fp_lib_2013_.InitializeFlash = function (SessionId, elementId, Key) {
    try {
        var flashvars = {
            SessionID: SessionId,
            apiPath: _fp_lib_2013_.ApiPath,
            Key: Key
        };
        var params = {
            menu: "false",
            scale: "noScale",
            allowFullscreen: "true",
            allowScriptAccess: "always",
            bgcolor: "",
            wmode: "direct"
        };
        var attributes = {
            id: "FpFlash", name: "FpFlash"
        };

        _fp_lib_2013_.FlashIni.embedSWF(
            _fp_lib_2013_.AppsRootPath + "/JS/Dependencies/FpFlash.swf",
            elementId, "0%", "0%", "10.0.0",
            "expressInstall.swf",
            flashvars, params, attributes);
    }
    catch (err) { }
};
_fp_lib_2013_.Init = function (sessionId, elementId, Key, technologies) {
    try {
        if (elementId == null) {
            elementId = 'fp';
        }

        var d = document.createElement("div");
        d.id = elementId;

        var obj = document.createElement("div");
        obj.id = elementId + "flash";
        d.appendChild(obj);

        var s = document.createElement("div");
        s.id = elementId + "SilverLight";
        d.appendChild(s);

        document.body.appendChild(d);

        if ((_fp_lib_2013_.FlashDetect.installed) && (technologies.charAt(0) == "1")) {
            _fp_lib_2013_.InitializeFlash(sessionId, elementId + "flash", Key);
        }

       // if ((navigator.javaEnabled()) && (technologies.charAt(1) == "1")) {
        //    _fp_lib_2013_.InitializeJava(sessionId, elementId, Key);
       // }

       // if ((_fp_lib_2013_.SLDetector()) && (technologies.charAt(2) == "1")) {
       //     _fp_lib_2013_.InitializeSilverlight(sessionId, elementId + "SilverLight", Key);
       // }

        _fp_lib_2013_.LocalStorage("FingerPrintCookie", sessionId);

    }
    catch (err) { }

};
_fp_lib_2013_.execute = function (sessionId, elementId, Key, technologies) {
    try {
        var regex = /^[01]{3}$/i;
        var match = regex.test(technologies);
        if (!match) {
            technologies = "111";
        }

        _fp_lib_2013_.Init(sessionId, elementId, Key, technologies);
        var aux = _fp_lib_2013_.getBrowserInformations(sessionId, Key);
        //$("body").append("<img src='" + imagem + sessionId + "' style='display:none!important' />");

        _fp_lib_2013_.requestMethod(aux);
    }
    catch (err) { }

};
_fp_lib_2013_.executeIframe = function (sessionId, key, technologies) {
    try {
//        ifrm = document.createElement("IFRAME");
//        ifrm.setAttribute("src", _fp_lib_2013_.FpPath + "?id=" + sessionId + "&key=" + key + "&technologies=" + technologies);
//        ifrm.style.visibility = 'hidden';
//        document.body.appendChild(ifrm);

        $("<iframe>", {
            src: _fp_lib_2013_.FpPath + "?id=" + sessionId + "&key=" + key + "&technologies=" + technologies,
            width:"1",
			height:"1",
			style:"display:none;"
        }).appendTo("body");
    }
    catch (err) { }
};
var fp_lib_execute = function (opts) {
    if (opts.useIFrame) {
        _fp_lib_2013_.executeIframe(opts.sessionId, opts.key, opts.technologies);
    } else {
        _fp_lib_2013_.execute(opts.sessionId, opts.elementId, opts.key, opts.technologies);
    }
};