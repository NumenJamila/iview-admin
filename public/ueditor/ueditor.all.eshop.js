!(function () {
  function getListener (e, t, i) {
    var n
    return t = t.toLowerCase(), (n = e.__allListeners || i && (e.__allListeners = {})) && (n[t] || i && (n[t] = []))
  }

  function getDomNode (e, t, i, n, o, r) {
    var a, s = n && e[t]
    for (!s && (s = e[i]); !s && (a = (a || e).parentNode);) {
      if (a.tagName == 'BODY' || r && !r(a)) return null
      s = a[i]
    }
    return s && o && !o(s) ? getDomNode(s, t, i, !1, o) : s
  }
  UEDITOR_CONFIG = window.UEDITOR_CONFIG || {}
  var baidu = window.baidu || {}
  window.baidu = baidu, window.UE = baidu.editor = window.UE || {}, UE.plugins = {}, UE.commands = {}, UE.instants = {}, UE.I18N = {}, UE._customizeUI = {}, UE.version = '1.4.3'
  var dom = UE.dom = {},
    browser = UE.browser = (function () {
      var e = navigator.userAgent.toLowerCase(),
        t = window.opera,
        i = {
          ie: /(msie\s|trident.*rv:)([\w.]+)/.test(e),
          opera: !!t && t.version,
          webkit: e.indexOf(' applewebkit/') > -1,
          mac: e.indexOf('macintosh') > -1,
          quirks: document.compatMode == 'BackCompat'
        }
      i.gecko = navigator.product == 'Gecko' && !i.webkit && !i.opera && !i.ie
      var n = 0
      if (i.ie) {
        var o = e.match(/(?:msie\s([\w.]+))/),
          r = e.match(/(?:trident.*rv:([\w.]+))/)
        n = o && r && o[1] && r[1] ? Math.max(1 * o[1], 1 * r[1]) : o && o[1] ? 1 * o[1] : r && r[1] ? 1 * r[1] : 0, i.ie11Compat = document.documentMode == 11, i.ie9Compat = document.documentMode == 9, i.ie8 = !!document.documentMode, i.ie8Compat = document.documentMode == 8, i.ie7Compat = n == 7 && !document.documentMode || document.documentMode == 7, i.ie6Compat = n < 7 || i.quirks, i.ie9above = n > 8, i.ie9below = n < 9, i.ie11above = n > 10, i.ie11below = n < 11
      }
      if (i.gecko) {
        var a = e.match(/rv:([\d\.]+)/)
        a && (a = a[1].split('.'), n = 1e4 * a[0] + 100 * (a[1] || 0) + 1 * (a[2] || 0))
      }
      return /chrome\/(\d+\.\d)/i.test(e) && (i.chrome = +RegExp.$1), /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && !/chrome/i.test(e) && (i.safari = +(RegExp.$1 || RegExp.$2)), i.opera && (n = parseFloat(t.version())), i.webkit && (n = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])), i.version = n, i.isCompatible = !i.mobile && (i.ie && n >= 6 || i.gecko && n >= 10801 || i.opera && n >= 9.5 || i.air && n >= 1 || i.webkit && n >= 522 || !1), i
    }()),
    ie = browser.ie,
    webkit = browser.webkit,
    gecko = browser.gecko,
    opera = browser.opera,
    utils = UE.utils = {
      each: function (e, t, i) {
        if (e != null) {
          if (e.length === +e.length) {
            for (var n = 0, o = e.length; o > n; n++) { if (t.call(i, e[n], n, e) === !1) return !1 }
          } else {
            for (var r in e) { if (e.hasOwnProperty(r) && t.call(i, e[r], r, e) === !1) return !1 }
          }
        }
      },
      makeInstance: function (e) {
        var t = new Function()
        return t.prototype = e, e = new t(), t.prototype = null, e
      },
      extend: function (e, t, i) {
        if (t) { for (var n in t) i && e.hasOwnProperty(n) || (e[n] = t[n]) }
        return e
      },
      extend2: function (e) {
        for (var t = arguments, i = 1; i < t.length; i++) {
          var n = t[i]
          for (var o in n) e.hasOwnProperty(o) || (e[o] = n[o])
        }
        return e
      },
      inherits: function (e, t) {
        var i = e.prototype,
          n = utils.makeInstance(t.prototype)
        return utils.extend(n, i, !0), e.prototype = n, n.constructor = e
      },
      bind: function (e, t) {
        return function () {
          return e.apply(t, arguments)
        }
      },
      defer: function (e, t, i) {
        var n
        return function () {
          i && clearTimeout(n), n = setTimeout(e, t)
        }
      },
      indexOf: function (e, t, i) {
        var n = -1
        return i = this.isNumber(i) ? i : 0, this.each(e, function (e, o) {
          return o >= i && e === t ? (n = o, !1) : void 0
        }), n
      },
      removeItem: function (e, t) {
        for (var i = 0, n = e.length; n > i; i++) e[i] === t && (e.splice(i, 1), i--)
      },
      trim: function (e) {
        return e.replace(/(^[ \t\n\r]+)|([ \t\n\r]+$)/g, '')
      },
      listToMap: function (e) {
        if (!e) return {}
        e = utils.isArray(e) ? e : e.split(',')
        for (var t, i = 0, n = {}; t = e[i++];) n[t.toUpperCase()] = n[t] = 1
        return n
      },
      unhtml: function (e, t) {
        return e ? e.replace(t || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function (e, t) {
          return t ? e : {
            '<': '&lt;',
            '&': '&amp;',
            '"': '&quot;',
            '>': '&gt;',
            "'": '&#39;'
          }[e]
        }) : ''
      },
      unhtmlForUrl: function (e, t) {
        return e ? e.replace(t || /[<">']/g, function (e) {
          return {
            '<': '&lt;',
            '&': '&amp;',
            '"': '&quot;',
            '>': '&gt;',
            "'": '&#39;'
          }[e]
        }) : ''
      },
      html: function (e) {
        return e ? e.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function (e) {
          return {
            '&lt;': '<',
            '&amp;': '&',
            '&quot;': '"',
            '&gt;': '>',
            '&#39;': "'",
            '&nbsp;': ' '
          }[e]
        }) : ''
      },
      cssStyleToDomStyle: (function () {
        var e = document.createElement('div').style,
          t = {
            'float': void 0 != e.cssFloat ? 'cssFloat' : void 0 != e.styleFloat ? 'styleFloat' : 'float'
          }
        return function (e) {
          return t[e] || (t[e] = e.toLowerCase().replace(/-./g, function (e) {
            return e.charAt(1).toUpperCase()
          }))
        }
      }()),
      loadFile: (function () {
        function e (e, i) {
          try {
            for (var n, o = 0; n = t[o++];) { if (n.doc === e && n.url == (i.src || i.href)) return n }
          } catch (r) {
            return null
          }
        }
        var t = []
        return function (i, n, o) {
          var r = e(i, n)
          if (r) return void (r.ready ? o && o() : r.funs.push(o))
          if (t.push({
            doc: i,
            url: n.src || n.href,
            funs: [o]
          }), !i.body) {
            var a = []
            for (var s in n) s != 'tag' && a.push(s + '="' + n[s] + '"')
            return void i.write('<' + n.tag + ' ' + a.join(' ') + ' ></' + n.tag + '>')
          }
          if (!n.id || !i.getElementById(n.id)) {
            var l = i.createElement(n.tag)
            delete n.tag
            for (var s in n) l.setAttribute(s, n[s])
            l.onload = l.onreadystatechange = function () {
              if (!this.readyState || /loaded|complete/.test(this.readyState)) {
                if (r = e(i, n), r.funs.length > 0) {
                  r.ready = 1
                  for (var t; t = r.funs.pop();) t()
                }
                l.onload = l.onreadystatechange = null
              }
            }, l.onerror = function () {
              throw Error('The load ' + (n.href || n.src) + ' fails,check the url settings of file ueditor.config.js ')
            }, i.getElementsByTagName('head')[0].appendChild(l)
          }
        }
      }()),
      isEmptyObject: function (e) {
        if (e == null) return !0
        if (this.isArray(e) || this.isString(e)) return e.length === 0
        for (var t in e) { if (e.hasOwnProperty(t)) return !1 }
        return !0
      },
      fixColor: function (e, t) {
        if (/color/i.test(e) && /rgba?/.test(t)) {
          var i = t.split(',')
          if (i.length > 3) return ''
          t = '#'
          for (var n, o = 0; n = i[o++];) n = parseInt(n.replace(/[^\d]/gi, ''), 10).toString(16), t += n.length == 1 ? '0' + n : n
          t = t.toUpperCase()
        }
        return t
      },
      optCss: function (e) {
        function t (e, t) {
          if (!e) return ''
          var i = e.top,
            n = e.bottom,
            o = e.left,
            r = e.right,
            a = ''
          if (i && o && n && r) a += ';' + t + ':' + (i == n && n == o && o == r ? i : i == n && o == r ? i + ' ' + o : o == r ? i + ' ' + o + ' ' + n : i + ' ' + r + ' ' + n + ' ' + o) + ';'
          else { for (var s in e) a += ';' + t + '-' + s + ':' + e[s] + ';' }
          return a
        }
        var i, n
        return e = e.replace(/(padding|margin|border)\-([^:]+):([^;]+);?/gi, function (e, t, o, r) {
          if (r.split(' ').length == 1) {
            switch (t) {
              case 'padding':
                return !i && (i = {}), i[o] = r, ''
              case 'margin':
                return !n && (n = {}), n[o] = r, ''
              case 'border':
                return r == 'initial' ? '' : e
            }
          }
          return e
        }), e += t(i, 'padding') + t(n, 'margin'), e.replace(/^[ \n\r\t;]*|[ \n\r\t]*$/, '').replace(/;([ \n\r\t]+)|\1;/g, ';').replace(/(&((l|g)t|quot|#39))?;{2,}/g, function (e, t) {
          return t ? t + ';;' : ';'
        })
      },
      clone: function (e, t) {
        var i
        t = t || {}
        for (var n in e) e.hasOwnProperty(n) && (i = e[n], typeof i === 'object' ? (t[n] = utils.isArray(i) ? [] : {}, utils.clone(e[n], t[n])) : t[n] = i)
        return t
      },
      transUnitToPx: function (e) {
        if (!/(pt|cm)/.test(e)) return e
        var t
        switch (e.replace(/([\d.]+)(\w+)/, function (i, n, o) {
          e = n, t = o
        }), t) {
          case 'cm':
            e = 25 * parseFloat(e)
            break
          case 'pt':
            e = Math.round(96 * parseFloat(e) / 72)
        }
        return e + (e ? 'px' : '')
      },
      domReady: (function () {
        function e (e) {
          e.isReady = !0
          for (var i; i = t.pop(); i());
        }
        var t = []
        return function (i, n) {
          n = n || window
          var o = n.document
          i && t.push(i), o.readyState === 'complete' ? e(o) : (o.isReady && e(o), browser.ie && browser.version != 11 ? (!(function () {
            if (!o.isReady) {
              try {
                o.documentElement.doScroll('left')
              } catch (t) {
                return void setTimeout(arguments.callee, 0)
              }
              e(o)
            }
          }()), n.attachEvent('onload', function () {
            e(o)
          })) : (o.addEventListener('DOMContentLoaded', function () {
            o.removeEventListener('DOMContentLoaded', arguments.callee, !1), e(o)
          }, !1), n.addEventListener('load', function () {
            e(o)
          }, !1)))
        }
      }()),
      cssRule: browser.ie && browser.version != 11 ? function (e, t, i) {
        var n, o
        if (void 0 === t || t && t.nodeType && t.nodeType == 9) {
          if (i = t && t.nodeType && t.nodeType == 9 ? t : i || document, n = i.indexList || (i.indexList = {}), o = n[e], void 0 !== o) return i.styleSheets[o].cssText
        } else {
          if (i = i || document, n = i.indexList || (i.indexList = {}), o = n[e], t === '') return void 0 !== o ? (i.styleSheets[o].cssText = '', delete n[e], !0) : !1
          void 0 !== o ? sheetStyle = i.styleSheets[o] : (sheetStyle = i.createStyleSheet('', o = i.styleSheets.length), n[e] = o), sheetStyle.cssText = t
        }
      } : function (e, t, i) {
        var n
        return void 0 === t || t && t.nodeType && t.nodeType == 9 ? (i = t && t.nodeType && t.nodeType == 9 ? t : i || document, n = i.getElementById(e), n ? n.innerHTML : void 0) : (i = i || document, n = i.getElementById(e), t === '' ? n ? (n.parentNode.removeChild(n), !0) : !1 : void (n ? n.innerHTML = t : (n = i.createElement('style'), n.id = e, n.innerHTML = t, i.getElementsByTagName('head')[0].appendChild(n))))
      },
      sort: function (e, t) {
        t = t || function (e, t) {
          return e.localeCompare(t)
        }
        for (var i = 0, n = e.length; n > i; i++) {
          for (var o = i, r = e.length; r > o; o++) {
            if (t(e[i], e[o]) > 0) {
              var a = e[i]
              e[i] = e[o], e[o] = a
            }
          }
        }
        return e
      },
      serializeParam: function (e) {
        var t = []
        for (var i in e) {
          if (i != 'method' && i != 'timeout' && i != 'async') {
            if ((typeof e[i]).toLowerCase() != 'function' && (typeof e[i]).toLowerCase() != 'object') t.push(encodeURIComponent(i) + '=' + encodeURIComponent(e[i]))
            else if (utils.isArray(e[i])) { for (var n = 0; n < e[i].length; n++) t.push(encodeURIComponent(i) + '[]=' + encodeURIComponent(e[i][n])) }
          }
        }
        return t.join('&')
      },
      formatUrl: function (e) {
        var t = e.replace(/&&/g, '&')
        return t = t.replace(/\?&/g, '?'), t = t.replace(/&$/g, ''), t = t.replace(/&#/g, '#'), t = t.replace(/&+/g, '&')
      },
      isCrossDomainUrl: function (e) {
        var t = document.createElement('a')
        return t.href = e, browser.ie && (t.href = t.href), !(t.protocol == location.protocol && t.hostname == location.hostname && (t.port == location.port || t.port == '80' && location.port == '' || t.port == '' && location.port == '80'))
      },
      clearEmptyAttrs: function (e) {
        for (var t in e) e[t] === '' && delete e[t]
        return e
      },
      str2json: function (e) {
        return utils.isString(e) ? window.JSON ? JSON.parse(e) : new Function('return ' + utils.trim(e || ''))() : null
      },
      json2str: (function () {
        function e (e) {
          return /["\\\x00-\x1f]/.test(e) && (e = e.replace(/["\\\x00-\x1f]/g, function (e) {
            var t = o[e]
            return t || (t = e.charCodeAt(), '\\u00' + Math.floor(t / 16).toString(16) + (t % 16).toString(16))
          })), '"' + e + '"'
        }

        function t (e) {
          var t, i, n, o = ['['],
            r = e.length
          for (i = 0; r > i; i++) {
            switch (n = e[i], typeof n) {
              case 'undefined':
              case 'function':
              case 'unknown':
                break
              default:
                t && o.push(','), o.push(utils.json2str(n)), t = 1
            }
          }
          return o.push(']'), o.join('')
        }

        function i (e) {
          return e < 10 ? '0' + e : e
        }

        function n (e) {
          return '"' + e.getFullYear() + '-' + i(e.getMonth() + 1) + '-' + i(e.getDate()) + 'T' + i(e.getHours()) + ':' + i(e.getMinutes()) + ':' + i(e.getSeconds()) + '"'
        }
        if (window.JSON) return JSON.stringify
        var o = {
          '\b': '\\b',
          '	': '\\t',
          '\n': '\\n',
          '\f': '\\f',
          '\r': '\\r',
          '"': '\\"',
          '\\': '\\\\'
        }
        return function (i) {
          switch (typeof i) {
            case 'undefined':
              return 'undefined'
            case 'number':
              return isFinite(i) ? String(i) : 'null'
            case 'string':
              return e(i)
            case 'boolean':
              return String(i)
            default:
              if (i === null) return 'null'
              if (utils.isArray(i)) return t(i)
              if (utils.isDate(i)) return n(i)
              var o, r, a = ['{'],
                s = utils.json2str
              for (var l in i) {
                if (Object.prototype.hasOwnProperty.call(i, l)) {
                  switch (r = i[l], typeof r) {
                    case 'undefined':
                    case 'unknown':
                    case 'function':
                      break
                    default:
                      o && a.push(','), o = 1, a.push(s(l) + ':' + s(r))
                  }
                }
              }
              return a.push('}'), a.join('')
          }
        }
      }())
    }
  utils.each(['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Date'], function (e) {
    UE.utils['is' + e] = function (t) {
      return Object.prototype.toString.apply(t) == '[object ' + e + ']'
    }
  })
  var EventBase = UE.EventBase = function () {}
  EventBase.prototype = {
    addListener: function (e, t) {
      e = utils.trim(e).split(/\s+/)
      for (var i, n = 0; i = e[n++];) getListener(this, i, !0).push(t)
    },
    on: function (e, t) {
      return this.addListener(e, t)
    },
    off: function (e, t) {
      return this.removeListener(e, t)
    },
    trigger: function () {
      return this.fireEvent.apply(this, arguments)
    },
    removeListener: function (e, t) {
      e = utils.trim(e).split(/\s+/)
      for (var i, n = 0; i = e[n++];) utils.removeItem(getListener(this, i) || [], t)
    },
    fireEvent: function () {
      var e = arguments[0]
      e = utils.trim(e).split(' ')
      for (var t, i = 0; t = e[i++];) {
        var n, o, r, a = getListener(this, t)
        if (a) {
          for (r = a.length; r--;) {
            if (a[r]) {
              if (o = a[r].apply(this, arguments), o === !0) return o
              void 0 !== o && (n = o)
            }
          }
        }(o = this['on' + t.toLowerCase()]) && (n = o.apply(this, arguments))
      }
      return n
    }
  }
  var dtd = dom.dtd = (function () {
      function e (e) {
        for (var t in e) e[t.toUpperCase()] = e[t]
        return e
      }
      var t = utils.extend2,
        i = e({
          isindex: 1,
          fieldset: 1
        }),
        n = e({
          input: 1,
          button: 1,
          select: 1,
          textarea: 1,
          label: 1
        }),
        o = t(e({
          a: 1
        }), n),
        r = t({
          iframe: 1
        }, o),
        a = e({
          hr: 1,
          ul: 1,
          menu: 1,
          div: 1,
          blockquote: 1,
          noscript: 1,
          table: 1,
          center: 1,
          address: 1,
          dir: 1,
          pre: 1,
          h5: 1,
          dl: 1,
          h4: 1,
          noframes: 1,
          h6: 1,
          ol: 1,
          h1: 1,
          h3: 1,
          h2: 1
        }),
        s = e({
          ins: 1,
          del: 1,
          script: 1,
          style: 1
        }),
        l = t(e({
          b: 1,
          acronym: 1,
          bdo: 1,
          'var': 1,
          '#': 1,
          abbr: 1,
          code: 1,
          br: 1,
          i: 1,
          cite: 1,
          kbd: 1,
          u: 1,
          strike: 1,
          s: 1,
          tt: 1,
          strong: 1,
          q: 1,
          samp: 1,
          em: 1,
          dfn: 1,
          span: 1
        }), s),
        d = t(e({
          sub: 1,
          img: 1,
          embed: 1,
          object: 1,
          sup: 1,
          basefont: 1,
          map: 1,
          applet: 1,
          font: 1,
          big: 1,
          small: 1
        }), l),
        c = t(e({
          p: 1
        }), d),
        u = t(e({
          iframe: 1
        }), d, n),
        m = e({
          img: 1,
          embed: 1,
          noscript: 1,
          br: 1,
          kbd: 1,
          center: 1,
          button: 1,
          basefont: 1,
          h5: 1,
          h4: 1,
          samp: 1,
          h6: 1,
          ol: 1,
          h1: 1,
          h3: 1,
          h2: 1,
          form: 1,
          font: 1,
          '#': 1,
          select: 1,
          menu: 1,
          ins: 1,
          abbr: 1,
          label: 1,
          code: 1,
          table: 1,
          script: 1,
          cite: 1,
          input: 1,
          iframe: 1,
          strong: 1,
          textarea: 1,
          noframes: 1,
          big: 1,
          small: 1,
          span: 1,
          hr: 1,
          sub: 1,
          bdo: 1,
          'var': 1,
          div: 1,
          object: 1,
          sup: 1,
          strike: 1,
          dir: 1,
          map: 1,
          dl: 1,
          applet: 1,
          del: 1,
          isindex: 1,
          fieldset: 1,
          ul: 1,
          b: 1,
          acronym: 1,
          a: 1,
          blockquote: 1,
          i: 1,
          u: 1,
          s: 1,
          tt: 1,
          address: 1,
          q: 1,
          pre: 1,
          p: 1,
          em: 1,
          dfn: 1
        }),
        f = t(e({
          a: 0
        }), u),
        h = e({
          tr: 1
        }),
        p = e({
          '#': 1
        }),
        g = t(e({
          param: 1
        }), m),
        v = t(e({
          form: 1
        }), i, r, a, c),
        b = e({
          li: 1,
          ol: 1,
          ul: 1
        }),
        y = e({
          style: 1,
          script: 1
        }),
        C = e({
          base: 1,
          link: 1,
          meta: 1,
          title: 1
        }),
        N = t(C, y),
        x = e({
          head: 1,
          body: 1
        }),
        w = e({
          html: 1
        }),
        U = e({
          address: 1,
          blockquote: 1,
          center: 1,
          dir: 1,
          div: 1,
          dl: 1,
          fieldset: 1,
          form: 1,
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1,
          hr: 1,
          isindex: 1,
          menu: 1,
          noframes: 1,
          ol: 1,
          p: 1,
          pre: 1,
          table: 1,
          ul: 1
        }),
        E = e({
          area: 1,
          base: 1,
          basefont: 1,
          br: 1,
          col: 1,
          command: 1,
          dialog: 1,
          embed: 1,
          hr: 1,
          img: 1,
          input: 1,
          isindex: 1,
          keygen: 1,
          link: 1,
          meta: 1,
          param: 1,
          source: 1,
          track: 1,
          wbr: 1
        })
      return e({
        $nonBodyContent: t(w, x, C),
        $block: U,
        $inline: f,
        $inlineWithA: t(e({
          a: 1
        }), f),
        $body: t(e({
          script: 1,
          style: 1
        }), U),
        $cdata: e({
          script: 1,
          style: 1
        }),
        $empty: E,
        $nonChild: e({
          iframe: 1,
          textarea: 1
        }),
        $listItem: e({
          dd: 1,
          dt: 1,
          li: 1
        }),
        $list: e({
          ul: 1,
          ol: 1,
          dl: 1
        }),
        $isNotEmpty: e({
          table: 1,
          ul: 1,
          ol: 1,
          dl: 1,
          iframe: 1,
          area: 1,
          base: 1,
          col: 1,
          hr: 1,
          img: 1,
          embed: 1,
          input: 1,
          link: 1,
          meta: 1,
          param: 1,
          h1: 1,
          h2: 1,
          h3: 1,
          h4: 1,
          h5: 1,
          h6: 1
        }),
        $removeEmpty: e({
          a: 1,
          abbr: 1,
          acronym: 1,
          address: 1,
          b: 1,
          bdo: 1,
          big: 1,
          cite: 1,
          code: 1,
          del: 1,
          dfn: 1,
          em: 1,
          font: 1,
          i: 1,
          ins: 1,
          label: 1,
          kbd: 1,
          q: 1,
          s: 1,
          samp: 1,
          small: 1,
          span: 1,
          strike: 1,
          strong: 1,
          sub: 1,
          sup: 1,
          tt: 1,
          u: 1,
          'var': 1
        }),
        $removeEmptyBlock: e({
          p: 1,
          div: 1
        }),
        $tableContent: e({
          caption: 1,
          col: 1,
          colgroup: 1,
          tbody: 1,
          td: 1,
          tfoot: 1,
          th: 1,
          thead: 1,
          tr: 1,
          table: 1
        }),
        $notTransContent: e({
          pre: 1,
          script: 1,
          style: 1,
          textarea: 1
        }),
        html: x,
        head: N,
        style: p,
        script: p,
        body: v,
        base: {},
        link: {},
        meta: {},
        title: p,
        col: {},
        tr: e({
          td: 1,
          th: 1
        }),
        img: {},
        embed: {},
        colgroup: e({
          thead: 1,
          col: 1,
          tbody: 1,
          tr: 1,
          tfoot: 1
        }),
        noscript: v,
        td: v,
        br: {},
        th: v,
        center: v,
        kbd: f,
        button: t(c, a),
        basefont: {},
        h5: f,
        h4: f,
        samp: f,
        h6: f,
        ol: b,
        h1: f,
        h3: f,
        option: p,
        h2: f,
        form: t(i, r, a, c),
        select: e({
          optgroup: 1,
          option: 1
        }),
        font: f,
        ins: f,
        menu: b,
        abbr: f,
        label: f,
        table: e({
          thead: 1,
          col: 1,
          tbody: 1,
          tr: 1,
          colgroup: 1,
          caption: 1,
          tfoot: 1
        }),
        code: f,
        tfoot: h,
        cite: f,
        li: v,
        input: {},
        iframe: v,
        strong: f,
        textarea: p,
        noframes: v,
        big: f,
        small: f,
        span: e({
          '#': 1,
          br: 1,
          b: 1,
          strong: 1,
          u: 1,
          i: 1,
          em: 1,
          sub: 1,
          sup: 1,
          strike: 1,
          span: 1
        }),
        hr: f,
        dt: f,
        sub: f,
        optgroup: e({
          option: 1
        }),
        param: {},
        bdo: f,
        'var': f,
        div: v,
        object: g,
        sup: f,
        dd: v,
        strike: f,
        area: {},
        dir: b,
        map: t(e({
          area: 1,
          form: 1,
          p: 1
        }), i, s, a),
        applet: g,
        dl: e({
          dt: 1,
          dd: 1
        }),
        del: f,
        isindex: {},
        fieldset: t(e({
          legend: 1
        }), m),
        thead: h,
        ul: b,
        acronym: f,
        b: f,
        a: t(e({
          a: 1
        }), u),
        blockquote: t(e({
          td: 1,
          tr: 1,
          tbody: 1,
          li: 1
        }), v),
        caption: f,
        i: f,
        u: f,
        tbody: h,
        s: f,
        address: t(r, c),
        tt: f,
        legend: f,
        q: f,
        pre: t(l, o),
        p: t(e({
          a: 1
        }), f),
        em: f,
        dfn: f
      })
    }()),
    attrFix = ie && browser.version < 9 ? {
      tabindex: 'tabIndex',
      readonly: 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      maxlength: 'maxLength',
      cellspacing: 'cellSpacing',
      cellpadding: 'cellPadding',
      rowspan: 'rowSpan',
      colspan: 'colSpan',
      usemap: 'useMap',
      frameborder: 'frameBorder'
    } : {
      tabindex: 'tabIndex',
      readonly: 'readOnly'
    },
    styleBlock = utils.listToMap(['-webkit-box', '-moz-box', 'block', 'list-item', 'table', 'table-row-group', 'table-header-group', 'table-footer-group', 'table-row', 'table-column-group', 'table-column', 'table-cell', 'table-caption']),
    domUtils = dom.domUtils = {
      NODE_ELEMENT: 1,
      NODE_DOCUMENT: 9,
      NODE_TEXT: 3,
      NODE_COMMENT: 8,
      NODE_DOCUMENT_FRAGMENT: 11,
      POSITION_IDENTICAL: 0,
      POSITION_DISCONNECTED: 1,
      POSITION_FOLLOWING: 2,
      POSITION_PRECEDING: 4,
      POSITION_IS_CONTAINED: 8,
      POSITION_CONTAINS: 16,
      fillChar: ie && browser.version == '6' ? '\ufeff' : '​',
      keys: {
        8: 1,
        46: 1,
        16: 1,
        17: 1,
        18: 1,
        37: 1,
        38: 1,
        39: 1,
        40: 1,
        13: 1
      },
      getPosition: function (e, t) {
        if (e === t) return 0
        var i, n = [e],
          o = [t]
        for (i = e; i = i.parentNode;) {
          if (i === t) return 10
          n.push(i)
        }
        for (i = t; i = i.parentNode;) {
          if (i === e) return 20
          o.push(i)
        }
        if (n.reverse(), o.reverse(), n[0] !== o[0]) return 1
        for (var r = -1; r++, n[r] === o[r];);
        for (e = n[r], t = o[r]; e = e.nextSibling;) { if (e === t) return 4 }
        return 2
      },
      getNodeIndex: function (e, t) {
        for (var i = e, n = 0; i = i.previousSibling;) t && i.nodeType == 3 ? i.nodeType != i.nextSibling.nodeType && n++ : n++
        return n
      },
      inDoc: function (e, t) {
        return domUtils.getPosition(e, t) == 10
      },
      findParent: function (e, t, i) {
        if (e && !domUtils.isBody(e)) {
          for (e = i ? e : e.parentNode; e;) {
            if (!t || t(e) || domUtils.isBody(e)) return t && !t(e) && domUtils.isBody(e) ? null : e
            e = e.parentNode
          }
        }
        return null
      },
      findParentByTagName: function (e, t, i, n) {
        return t = utils.listToMap(utils.isArray(t) ? t : [t]), domUtils.findParent(e, function (e) {
          return t[e.tagName] && !(n && n(e))
        }, i)
      },
      findParents: function (e, t, i, n) {
        for (var o = t && (i && i(e) || !i) ? [e] : []; e = domUtils.findParent(e, i);) o.push(e)
        return n ? o : o.reverse()
      },
      insertAfter: function (e, t) {
        return e.nextSibling ? e.parentNode.insertBefore(t, e.nextSibling) : e.parentNode.appendChild(t)
      },
      remove: function (e, t) {
        var i, n = e.parentNode
        if (n) {
          if (t && e.hasChildNodes()) { for (; i = e.firstChild;) n.insertBefore(i, e) }
          n.removeChild(e)
        }
        return e
      },
      getNextDomNode: function (e, t, i, n) {
        return getDomNode(e, 'firstChild', 'nextSibling', t, i, n)
      },
      getPreDomNode: function (e, t, i, n) {
        return getDomNode(e, 'lastChild', 'previousSibling', t, i, n)
      },
      isBookmarkNode: function (e) {
        return e.nodeType == 1 && e.id && /^_baidu_bookmark_/i.test(e.id)
      },
      getWindow: function (e) {
        var t = e.ownerDocument || e
        return t.defaultView || t.parentWindow
      },
      getCommonAncestor: function (e, t) {
        if (e === t) return e
        for (var i = [e], n = [t], o = e, r = -1; o = o.parentNode;) {
          if (o === t) return o
          i.push(o)
        }
        for (o = t; o = o.parentNode;) {
          if (o === e) return o
          n.push(o)
        }
        for (i.reverse(), n.reverse(); r++, i[r] === n[r];);
        return r == 0 ? null : i[r - 1]
      },
      clearEmptySibling: function (e, t, i) {
        function n (e, t) {
          for (var i; e && !domUtils.isBookmarkNode(e) && (domUtils.isEmptyInlineElement(e) || !new RegExp('[^	\n\r' + domUtils.fillChar + ']').test(e.nodeValue));) i = e[t], domUtils.remove(e), e = i
        }!t && n(e.nextSibling, 'nextSibling'), !i && n(e.previousSibling, 'previousSibling')
      },
      split: function (e, t) {
        var i = e.ownerDocument
        if (browser.ie && t == e.nodeValue.length) {
          var n = i.createTextNode('')
          return domUtils.insertAfter(e, n)
        }
        var o = e.splitText(t)
        if (browser.ie8) {
          var r = i.createTextNode('')
          domUtils.insertAfter(o, r), domUtils.remove(r)
        }
        return o
      },
      isWhitespace: function (e) {
        return !new RegExp('[^ 	\n\r' + domUtils.fillChar + ']').test(e.nodeValue)
      },
      getXY: function (e) {
        for (var t = 0, i = 0; e.offsetParent;) i += e.offsetTop, t += e.offsetLeft, e = e.offsetParent
        return {
          x: t,
          y: i
        }
      },
      on: function (e, t, i) {
        var n = utils.isArray(t) ? t : utils.trim(t).split(/\s+/),
          o = n.length
        if (o) {
          for (; o--;) {
            if (t = n[o], e.addEventListener) e.addEventListener(t, i, !1)
            else {
              i._d || (i._d = {
                els: []
              })
              var r = t + i.toString(),
                a = utils.indexOf(i._d.els, e)
              i._d[r] && a != -1 || (a == -1 && i._d.els.push(e), i._d[r] || (i._d[r] = function (e) {
                return i.call(e.srcElement, e || window.event)
              }), e.attachEvent('on' + t, i._d[r]))
            }
          }
        }
        e = null
      },
      un: function (e, t, i) {
        var n = utils.isArray(t) ? t : utils.trim(t).split(/\s+/),
          o = n.length
        if (o) {
          for (; o--;) {
            if (t = n[o], e.removeEventListener) e.removeEventListener(t, i, !1)
            else {
              var r = t + i.toString()
              try {
                e.detachEvent('on' + t, i._d ? i._d[r] : i)
              } catch (a) {}
              if (i._d && i._d[r]) {
                var s = utils.indexOf(i._d.els, e); s != -1 && i._d.els.splice(s, 1), i._d.els.length == 0 && delete i._d[r]
              }
            }
          }
        }
      },
      isSameElement: function (e, t) {
        if (e.tagName != t.tagName) return !1
        var i = e.attributes,
          n = t.attributes
        if (!ie && i.length != n.length) return !1
        for (var o, r, a = 0, s = 0, l = 0; o = i[l++];) {
          if (o.nodeName == 'style') {
            if (o.specified && a++, domUtils.isSameStyle(e, t)) continue
            return !1
          }
          if (ie) {
            if (!o.specified) continue
            a++, r = n.getNamedItem(o.nodeName)
          } else r = t.attributes[o.nodeName]
          if (!r.specified || o.nodeValue != r.nodeValue) return !1
        }
        if (ie) {
          for (l = 0; r = n[l++];) r.specified && s++
          if (a != s) return !1
        }
        return !0
      },
      isSameStyle: function (e, t) {
        var i = e.style.cssText.replace(/( ?; ?)/g, ';').replace(/( ?: ?)/g, ':'),
          n = t.style.cssText.replace(/( ?; ?)/g, ';').replace(/( ?: ?)/g, ':')
        if (browser.opera) {
          if (i = e.style, n = t.style, i.length != n.length) return !1
          for (var o in i) { if (!/^(\d+|csstext)$/i.test(o) && i[o] != n[o]) return !1 }
          return !0
        }
        if (!i || !n) return i == n
        if (i = i.split(';'), n = n.split(';'), i.length != n.length) return !1
        for (var r, a = 0; r = i[a++];) { if (utils.indexOf(n, r) == -1) return !1 }
        return !0
      },
      isBlockElm: function (e) {
        return e.nodeType == 1 && (dtd.$block[e.tagName] || styleBlock[domUtils.getComputedStyle(e, 'display')]) && !dtd.$nonChild[e.tagName]
      },
      isBody: function (e) {
        return e && e.nodeType == 1 && e.tagName.toLowerCase() == 'body'
      },
      breakParent: function (e, t) {
        var i, n, o, r = e,
          a = e
        do {
          for (r = r.parentNode, n ? (i = r.cloneNode(!1), i.appendChild(n), n = i, i = r.cloneNode(!1), i.appendChild(o), o = i) : (n = r.cloneNode(!1), o = n.cloneNode(!1)); i = a.previousSibling;) n.insertBefore(i, n.firstChild)
          for (; i = a.nextSibling;) o.appendChild(i)
          a = r
        } while (t !== r)
        return i = t.parentNode, i.insertBefore(n, t), i.insertBefore(o, t), i.insertBefore(e, o), domUtils.remove(t), e
      },
      isEmptyInlineElement: function (e) {
        if (e.nodeType != 1 || !dtd.$removeEmpty[e.tagName]) return 0
        for (e = e.firstChild; e;) {
          if (domUtils.isBookmarkNode(e)) return 0
          if (e.nodeType == 1 && !domUtils.isEmptyInlineElement(e) || e.nodeType == 3 && !domUtils.isWhitespace(e)) return 0
          e = e.nextSibling
        }
        return 1
      },
      trimWhiteTextNode: function (e) {
        function t (t) {
          for (var i;
            (i = e[t]) && i.nodeType == 3 && domUtils.isWhitespace(i);) e.removeChild(i)
        }
        t('firstChild'), t('lastChild')
      },
      mergeChild: function (e, t, i) {
        for (var n, o = domUtils.getElementsByTagName(e, e.tagName.toLowerCase()), r = 0; n = o[r++];) {
          if (n.parentNode && !domUtils.isBookmarkNode(n)) {
            if (n.tagName.toLowerCase() != 'span') domUtils.isSameElement(e, n) && domUtils.remove(n, !0)
            else {
              if (e === n.parentNode && (domUtils.trimWhiteTextNode(e), e.childNodes.length == 1)) {
                e.style.cssText = n.style.cssText + ';' + e.style.cssText, domUtils.remove(n, !0)
                continue
              }
              if (n.style.cssText = e.style.cssText + ';' + n.style.cssText, i) {
                var a = i.style
                if (a) {
                  a = a.split(';')
                  for (var s, l = 0; s = a[l++];) n.style[utils.cssStyleToDomStyle(s.split(':')[0])] = s.split(':')[1]
                }
              }
              domUtils.isSameStyle(n, e) && domUtils.remove(n, !0)
            }
          }
        }
      },
      getElementsByTagName: function (e, t, i) {
        if (i && utils.isString(i)) {
          var n = i
          i = function (e) {
            return domUtils.hasClass(e, n)
          }
        }
        t = utils.trim(t).replace(/[ ]{2,}/g, ' ').split(' ')
        for (var o, r = [], a = 0; o = t[a++];) { for (var s, l = e.getElementsByTagName(o), d = 0; s = l[d++];) i && !i(s) || r.push(s) }
        return r
      },
      mergeToParent: function (e) {
        for (var t = e.parentNode; t && dtd.$removeEmpty[t.tagName];) {
          if (t.tagName == e.tagName || t.tagName == 'A') {
            if (domUtils.trimWhiteTextNode(t), t.tagName == 'SPAN' && !domUtils.isSameStyle(t, e) || t.tagName == 'A' && e.tagName == 'SPAN') {
              if (t.childNodes.length > 1 || t !== e.parentNode) {
                e.style.cssText = t.style.cssText + ';' + e.style.cssText, t = t.parentNode
                continue
              }
              t.style.cssText += ';' + e.style.cssText, t.tagName == 'A' && (t.style.textDecoration = 'underline')
            }
            if (t.tagName != 'A') {
              t === e.parentNode && domUtils.remove(e, !0)
              break
            }
          }
          t = t.parentNode
        }
      },
      mergeSibling: function (e, t, i) {
        function n (e, t, i) {
          var n
          if ((n = i[e]) && !domUtils.isBookmarkNode(n) && n.nodeType == 1 && domUtils.isSameElement(i, n)) {
            for (; n.firstChild;) t == 'firstChild' ? i.insertBefore(n.lastChild, i.firstChild) : i.appendChild(n.firstChild)
            domUtils.remove(n)
          }
        }!t && n('previousSibling', 'firstChild', e), !i && n('nextSibling', 'lastChild', e)
      },
      unSelectable: ie && browser.ie9below || browser.opera ? function (e) {
        e.onselectstart = function () {
          return !1
        }, e.onclick = e.onkeyup = e.onkeydown = function () {
          return !1
        }, e.unselectable = 'on', e.setAttribute('unselectable', 'on')
        for (var t, i = 0; t = e.all[i++];) {
          switch (t.tagName.toLowerCase()) {
            case 'iframe':
            case 'textarea':
            case 'input':
            case 'select':
              break
            default:
              t.unselectable = 'on', e.setAttribute('unselectable', 'on')
          }
        }
      } : function (e) {
        e.style.MozUserSelect = e.style.webkitUserSelect = e.style.msUserSelect = e.style.KhtmlUserSelect = 'none'
      },
      removeAttributes: function (e, t) {
        t = utils.isArray(t) ? t : utils.trim(t).replace(/[ ]{2,}/g, ' ').split(' ')
        for (var i, n = 0; i = t[n++];) {
          switch (i = attrFix[i] || i) {
            case 'className':
              e[i] = ''
              break
            case 'style':
              e.style.cssText = ''
              var o = e.getAttributeNode('style')
              !browser.ie && o && e.removeAttributeNode(o)
          }
          e.removeAttribute(i)
        }
      },
      createElement: function (e, t, i) {
        return domUtils.setAttributes(e.createElement(t), i)
      },
      setAttributes: function (e, t) {
        for (var i in t) {
          if (t.hasOwnProperty(i)) {
            var n = t[i]
            switch (i) {
              case 'class':
                e.className = n
                break
              case 'style':
                e.style.cssText = e.style.cssText + ';' + n
                break
              case 'innerHTML':
                e[i] = n
                break
              case 'value':
                e.value = n
                break
              default:
                e.setAttribute(attrFix[i] || i, n)
            }
          }
        }
        return e
      },
      getComputedStyle: function (e, t) {
        var i = 'width height top left'
        if (i.indexOf(t) > -1) {
          return e['offset' + t.replace(/^\w/, function (e) {
            return e.toUpperCase()
          })] + 'px'
        }
        if (e.nodeType == 3 && (e = e.parentNode), browser.ie && browser.version < 9 && t == 'font-size' && !e.style.fontSize && !dtd.$empty[e.tagName] && !dtd.$nonChild[e.tagName]) {
          var n = e.ownerDocument.createElement('span')
          n.style.cssText = 'padding:0;border:0;font-family:simsun;', n.innerHTML = '.', e.appendChild(n)
          var o = n.offsetHeight
          return e.removeChild(n), n = null, o + 'px'
        }
        try {
          var r = domUtils.getStyle(e, t) || (window.getComputedStyle ? domUtils.getWindow(e).getComputedStyle(e, '').getPropertyValue(t) : (e.currentStyle || e.style)[utils.cssStyleToDomStyle(t)])
        } catch (a) {
          return ''
        }
        return utils.transUnitToPx(utils.fixColor(t, r))
      },
      removeClasses: function (e, t) {
        t = utils.isArray(t) ? t : utils.trim(t).replace(/[ ]{2,}/g, ' ').split(' ')
        for (var i, n = 0, o = e.className; i = t[n++];) o = o.replace(new RegExp('\\b' + i + '\\b'), '')
        o = utils.trim(o).replace(/[ ]{2,}/g, ' '), o ? e.className = o : domUtils.removeAttributes(e, ['class'])
      },
      addClass: function (e, t) {
        if (e) {
          t = utils.trim(t).replace(/[ ]{2,}/g, ' ').split(' ')
          for (var i, n = 0, o = e.className; i = t[n++];) new RegExp('\\b' + i + '\\b').test(o) || (o += ' ' + i)
          e.className = utils.trim(o)
        }
      },
      hasClass: function (e, t) {
        if (utils.isRegExp(t)) return t.test(e.className)
        t = utils.trim(t).replace(/[ ]{2,}/g, ' ').split(' ')
        for (var i, n = 0, o = e.className; i = t[n++];) { if (!new RegExp('\\b' + i + '\\b', 'i').test(o)) return !1 }
        return n - 1 == t.length
      },
      preventDefault: function (e) {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1
      },
      removeStyle: function (e, t) {
        browser.ie ? (t == 'color' && (t = '(^|;)' + t), e.style.cssText = e.style.cssText.replace(new RegExp(t + '[^:]*:[^;]+;?', 'ig'), '')) : e.style.removeProperty ? e.style.removeProperty(t) : e.style.removeAttribute(utils.cssStyleToDomStyle(t)), e.style.cssText || domUtils.removeAttributes(e, ['style'])
      },
      getStyle: function (e, t) {
        var i = e.style[utils.cssStyleToDomStyle(t)]
        return utils.fixColor(t, i)
      },
      setStyle: function (e, t, i) {
        e.style[utils.cssStyleToDomStyle(t)] = i, utils.trim(e.style.cssText) || this.removeAttributes(e, 'style')
      },
      setStyles: function (e, t) {
        for (var i in t) t.hasOwnProperty(i) && domUtils.setStyle(e, i, t[i])
      },
      removeDirtyAttr: function (e) {
        for (var t, i = 0, n = e.getElementsByTagName('*'); t = n[i++];) t.removeAttribute('_moz_dirty')
        e.removeAttribute('_moz_dirty')
      },
      getChildCount: function (e, t) {
        var i = 0,
          n = e.firstChild
        for (t = t || function () {
          return 1
        }; n;) t(n) && i++, n = n.nextSibling
        return i
      },
      isEmptyNode: function (e) {
        return !e.firstChild || domUtils.getChildCount(e, function (e) {
          return !domUtils.isBr(e) && !domUtils.isBookmarkNode(e) && !domUtils.isWhitespace(e)
        }) == 0
      },
      clearSelectedArr: function (e) {
        for (var t; t = e.pop();) domUtils.removeAttributes(t, ['class'])
      },
      scrollToView: function (e, t, i) {
        var n = function () {
            var e = t.document,
              i = e.compatMode == 'CSS1Compat'
            return {
              width: (i ? e.documentElement.clientWidth : e.body.clientWidth) || 0,
              height: (i ? e.documentElement.clientHeight : e.body.clientHeight) || 0
            }
          },
          o = function (e) {
            if ('pageXOffset' in e) {
              return {
                x: e.pageXOffset || 0,
                y: e.pageYOffset || 0
              }
            }
            var t = e.document
            return {
              x: t.documentElement.scrollLeft || t.body.scrollLeft || 0,
              y: t.documentElement.scrollTop || t.body.scrollTop || 0
            }
          },
          r = n().height,
          a = -1 * r + i
        a += e.offsetHeight || 0
        var s = domUtils.getXY(e)
        a += s.y
        var l = o(t).y;
        (a > l || l - r > a) && t.scrollTo(0, a + (a < 0 ? -20 : 20))
      },
      isBr: function (e) {
        return e.nodeType == 1 && e.tagName == 'BR'
      },
      isFillChar: function (e, t) {
        if (e.nodeType != 3) return !1
        var i = e.nodeValue
        return t ? new RegExp('^' + domUtils.fillChar).test(i) : !i.replace(new RegExp(domUtils.fillChar, 'g'), '').length
      },
      isStartInblock: function (e) {
        var t, i = e.cloneRange(),
          n = 0,
          o = i.startContainer
        if (o.nodeType == 1 && o.childNodes[i.startOffset]) {
          o = o.childNodes[i.startOffset]
          for (var r = o.previousSibling; r && domUtils.isFillChar(r);) o = r, r = r.previousSibling
        }
        for (this.isFillChar(o, !0) && i.startOffset == 1 && (i.setStartBefore(o), o = i.startContainer); o && domUtils.isFillChar(o);) t = o, o = o.previousSibling
        for (t && (i.setStartBefore(t), o = i.startContainer), o.nodeType == 1 && domUtils.isEmptyNode(o) && i.startOffset == 1 && i.setStart(o, 0).collapse(!0); !i.startOffset;) {
          if (o = i.startContainer, domUtils.isBlockElm(o) || domUtils.isBody(o)) {
            n = 1
            break
          }
          var a, r = i.startContainer.previousSibling
          if (r) {
            for (; r && domUtils.isFillChar(r);) a = r, r = r.previousSibling
            a ? i.setStartBefore(a) : i.setStartBefore(i.startContainer)
          } else i.setStartBefore(i.startContainer)
        }
        return n && !domUtils.isBody(i.startContainer) ? 1 : 0
      },
      isEmptyBlock: function (e, t) {
        if (e.nodeType != 1) return 0
        if (t = t || new RegExp('[  	\r\n' + domUtils.fillChar + ']', 'g'), e[browser.ie ? 'innerText' : 'textContent'].replace(t, '').length > 0) return 0
        for (var i in dtd.$isNotEmpty) { if (e.getElementsByTagName(i).length) return 0 }
        return 1
      },
      setViewportOffset: function (e, t) {
        var i = 0 | parseInt(e.style.left),
          n = 0 | parseInt(e.style.top),
          o = e.getBoundingClientRect(),
          r = t.left - o.left,
          a = t.top - o.top
        r && (e.style.left = i + r + 'px'), a && (e.style.top = n + a + 'px')
      },
      fillNode: function (e, t) {
        var i = browser.ie ? e.createTextNode(domUtils.fillChar) : e.createElement('br')
        t.innerHTML = '', t.appendChild(i)
      },
      moveChild: function (e, t, i) {
        for (; e.firstChild;) i && t.firstChild ? t.insertBefore(e.lastChild, t.firstChild) : t.appendChild(e.firstChild)
      },
      hasNoAttributes: function (e) {
        return browser.ie ? /^<\w+\s*?>/.test(e.outerHTML) : e.attributes.length == 0
      },
      isCustomeNode: function (e) {
        return e.nodeType == 1 && e.getAttribute('_ue_custom_node_')
      },
      isTagNode: function (e, t) {
        return e.nodeType == 1 && new RegExp('\\b' + e.tagName + '\\b', 'i').test(t)
      },
      filterNodeList: function (e, t, i) {
        var n = []
        if (!utils.isFunction(t)) {
          var o = t
          t = function (e) {
            return utils.indexOf(utils.isArray(o) ? o : o.split(' '), e.tagName.toLowerCase()) != -1
          }
        }
        return utils.each(e, function (e) {
          t(e) && n.push(e)
        }), n.length == 0 ? null : n.length != 1 && i ? n : n[0]
      },
      isInNodeEndBoundary: function (e, t) {
        var i = e.startContainer
        if (i.nodeType == 3 && e.startOffset != i.nodeValue.length) return 0
        if (i.nodeType == 1 && e.startOffset != i.childNodes.length) return 0
        for (; i !== t;) {
          if (i.nextSibling) return 0
          i = i.parentNode
        }
        return 1
      },
      isBoundaryNode: function (e, t) {
        for (var i; !domUtils.isBody(e);) { if (i = e, e = e.parentNode, i !== e[t]) return !1 }
        return !0
      },
      fillHtml: browser.ie11below ? '&nbsp;' : '<br/>'
    },
    fillCharReg = new RegExp(domUtils.fillChar, 'g')
  !(function () {
    function e (e) {
      e.collapsed = e.startContainer && e.endContainer && e.startContainer === e.endContainer && e.startOffset == e.endOffset
    }

    function t (e) {
      return !e.collapsed && e.startContainer.nodeType == 1 && e.startContainer === e.endContainer && e.endOffset - e.startOffset == 1
    }

    function i (t, i, n, o) {
      return i.nodeType == 1 && (dtd.$empty[i.tagName] || dtd.$nonChild[i.tagName]) && (n = domUtils.getNodeIndex(i) + (t ? 0 : 1), i = i.parentNode), t ? (o.startContainer = i, o.startOffset = n, o.endContainer || o.collapse(!0)) : (o.endContainer = i, o.endOffset = n, o.startContainer || o.collapse(!1)), e(o), o
    }

    function n (e, t) {
      var i, n, o = e.startContainer,
        r = e.endContainer,
        a = e.startOffset,
        s = e.endOffset,
        l = e.document,
        d = l.createDocumentFragment()
      if (o.nodeType == 1 && (o = o.childNodes[a] || (i = o.appendChild(l.createTextNode('')))), r.nodeType == 1 && (r = r.childNodes[s] || (n = r.appendChild(l.createTextNode('')))), o === r && o.nodeType == 3) return d.appendChild(l.createTextNode(o.substringData(a, s - a))), t && (o.deleteData(a, s - a), e.collapse(!0)), d
      for (var c, u, m = d, f = domUtils.findParents(o, !0), h = domUtils.findParents(r, !0), p = 0; f[p] == h[p];) p++
      for (var g, v = p; g = f[v]; v++) {
        for (c = g.nextSibling, g == o ? i || (e.startContainer.nodeType == 3 ? (m.appendChild(l.createTextNode(o.nodeValue.slice(a))), t && o.deleteData(a, o.nodeValue.length - a)) : m.appendChild(t ? o : o.cloneNode(!0))) : (u = g.cloneNode(!1), m.appendChild(u)); c && c !== r && c !== h[v];) g = c.nextSibling, m.appendChild(t ? c : c.cloneNode(!0)), c = g
        m = u
      }
      m = d, f[p] || (m.appendChild(f[p - 1].cloneNode(!1)), m = m.firstChild)
      for (var b, v = p; b = h[v]; v++) {
        if (c = b.previousSibling, b == r ? n || e.endContainer.nodeType != 3 || (m.appendChild(l.createTextNode(r.substringData(0, s))), t && r.deleteData(0, s)) : (u = b.cloneNode(!1), m.appendChild(u)), v != p || !f[p]) { for (; c && c !== o;) b = c.previousSibling, m.insertBefore(t ? c : c.cloneNode(!0), m.firstChild), c = b }
        m = u
      }
      return t && e.setStartBefore(h[p] ? f[p] ? h[p] : f[p - 1] : h[p - 1]).collapse(!0), i && domUtils.remove(i), n && domUtils.remove(n), d
    }

    function o (e, t) {
      try {
        if (a && domUtils.inDoc(a, e)) {
          if (a.nodeValue.replace(fillCharReg, '').length) a.nodeValue = a.nodeValue.replace(fillCharReg, '')
          else {
            var i = a.parentNode
            for (domUtils.remove(a); i && domUtils.isEmptyInlineElement(i) && (browser.safari ? !(domUtils.getPosition(i, t) & domUtils.POSITION_CONTAINS) : !i.contains(t));) a = i.parentNode, domUtils.remove(i), i = a
          }
        }
      } catch (n) {}
    }

    function r (e, t) {
      var i
      for (e = e[t]; e && domUtils.isFillChar(e);) i = e[t], domUtils.remove(e), e = i
    }
    var a, s = 0,
      l = domUtils.fillChar,
      d = dom.Range = function (e) {
        var t = this
        t.startContainer = t.startOffset = t.endContainer = t.endOffset = null, t.document = e, t.collapsed = !0
      }
    d.prototype = {
      cloneContents: function () {
        return this.collapsed ? null : n(this, 0)
      },
      deleteContents: function () {
        var e
        return this.collapsed || n(this, 1), browser.webkit && (e = this.startContainer, e.nodeType != 3 || e.nodeValue.length || (this.setStartBefore(e).collapse(!0), domUtils.remove(e))), this
      },
      extractContents: function () {
        return this.collapsed ? null : n(this, 2)
      },
      setStart: function (e, t) {
        return i(!0, e, t, this)
      },
      setEnd: function (e, t) {
        return i(!1, e, t, this)
      },
      setStartAfter: function (e) {
        return this.setStart(e.parentNode, domUtils.getNodeIndex(e) + 1)
      },
      setStartBefore: function (e) {
        return this.setStart(e.parentNode, domUtils.getNodeIndex(e))
      },
      setEndAfter: function (e) {
        return this.setEnd(e.parentNode, domUtils.getNodeIndex(e) + 1)
      },
      setEndBefore: function (e) {
        return this.setEnd(e.parentNode, domUtils.getNodeIndex(e))
      },
      setStartAtFirst: function (e) {
        return this.setStart(e, 0)
      },
      setStartAtLast: function (e) {
        return this.setStart(e, e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length)
      },
      setEndAtFirst: function (e) {
        return this.setEnd(e, 0)
      },
      setEndAtLast: function (e) {
        return this.setEnd(e, e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length)
      },
      selectNode: function (e) {
        return this.setStartBefore(e).setEndAfter(e)
      },
      selectNodeContents: function (e) {
        return this.setStart(e, 0).setEndAtLast(e)
      },
      cloneRange: function () {
        var e = this
        return new d(e.document).setStart(e.startContainer, e.startOffset).setEnd(e.endContainer, e.endOffset)
      },
      collapse: function (e) {
        var t = this
        return e ? (t.endContainer = t.startContainer, t.endOffset = t.startOffset) : (t.startContainer = t.endContainer, t.startOffset = t.endOffset), t.collapsed = !0, t
      },
      shrinkBoundary: function (e) {
        function t (e) {
          return e.nodeType == 1 && !domUtils.isBookmarkNode(e) && !dtd.$empty[e.tagName] && !dtd.$nonChild[e.tagName]
        }
        for (var i, n = this, o = n.collapsed; n.startContainer.nodeType == 1 && (i = n.startContainer.childNodes[n.startOffset]) && t(i);) n.setStart(i, 0)
        if (o) return n.collapse(!0)
        if (!e) { for (; n.endContainer.nodeType == 1 && n.endOffset > 0 && (i = n.endContainer.childNodes[n.endOffset - 1]) && t(i);) n.setEnd(i, i.childNodes.length) }
        return n
      },
      getCommonAncestor: function (e, i) {
        var n = this,
          o = n.startContainer,
          r = n.endContainer
        return o === r ? e && t(this) && (o = o.childNodes[n.startOffset], o.nodeType == 1) ? o : i && o.nodeType == 3 ? o.parentNode : o : domUtils.getCommonAncestor(o, r)
      },
      trimBoundary: function (e) {
        this.txtToElmBoundary()
        var t = this.startContainer,
          i = this.startOffset,
          n = this.collapsed,
          o = this.endContainer
        if (t.nodeType == 3) {
          if (i == 0) this.setStartBefore(t)
          else if (i >= t.nodeValue.length) this.setStartAfter(t)
          else {
            var r = domUtils.split(t, i)
            t === o ? this.setEnd(r, this.endOffset - i) : t.parentNode === o && (this.endOffset += 1), this.setStartBefore(r)
          }
          if (n) return this.collapse(!0)
        }
        return e || (i = this.endOffset, o = this.endContainer, o.nodeType == 3 && (i == 0 ? this.setEndBefore(o) : (i < o.nodeValue.length && domUtils.split(o, i), this.setEndAfter(o)))), this
      },
      txtToElmBoundary: function (e) {
        function t (e, t) {
          var i = e[t + 'Container'],
            n = e[t + 'Offset']
          i.nodeType == 3 && (n ? n >= i.nodeValue.length && e['set' + t.replace(/(\w)/, function (e) {
            return e.toUpperCase()
          }) + 'After'](i) : e['set' + t.replace(/(\w)/, function (e) {
            return e.toUpperCase()
          }) + 'Before'](i))
        }
        return !e && this.collapsed || (t(this, 'start'), t(this, 'end')), this
      },
      insertNode: function (e) {
        var t = e,
          i = 1
        e.nodeType == 11 && (t = e.firstChild, i = e.childNodes.length), this.trimBoundary(!0)
        var n = this.startContainer,
          o = this.startOffset,
          r = n.childNodes[o]
        return r ? n.insertBefore(e, r) : n.appendChild(e), t.parentNode === this.endContainer && (this.endOffset = this.endOffset + i), this.setStartBefore(t)
      },
      setCursor: function (e, t) {
        return this.collapse(!e).select(t)
      },
      createBookmark: function (e, t) {
        var i, n = this.document.createElement('span')
        return n.style.cssText = 'display:none;line-height:0px;', n.appendChild(this.document.createTextNode('‍')), n.id = '_baidu_bookmark_start_' + (t ? '' : s++), this.collapsed || (i = n.cloneNode(!0), i.id = '_baidu_bookmark_end_' + (t ? '' : s++)), this.insertNode(n), i && this.collapse().insertNode(i).setEndBefore(i), this.setStartAfter(n), {
          start: e ? n.id : n,
          end: i ? e ? i.id : i : null,
          id: e
        }
      },
      moveToBookmark: function (e) {
        var t = e.id ? this.document.getElementById(e.start) : e.start,
          i = e.end && e.id ? this.document.getElementById(e.end) : e.end
        return this.setStartBefore(t), domUtils.remove(t), i ? (this.setEndBefore(i), domUtils.remove(i)) : this.collapse(!0), this
      },
      enlarge: function (e, t) {
        var i, n, o = domUtils.isBody,
          r = this.document.createTextNode('')
        if (e) {
          for (n = this.startContainer, n.nodeType == 1 ? n.childNodes[this.startOffset] ? i = n = n.childNodes[this.startOffset] : (n.appendChild(r), i = n = r) : i = n; ;) {
            if (domUtils.isBlockElm(n)) {
              for (n = i;
                (i = n.previousSibling) && !domUtils.isBlockElm(i);) n = i
              this.setStartBefore(n)
              break
            }
            i = n, n = n.parentNode
          }
          for (n = this.endContainer, n.nodeType == 1 ? ((i = n.childNodes[this.endOffset]) ? n.insertBefore(r, i) : n.appendChild(r), i = n = r) : i = n; ;) {
            if (domUtils.isBlockElm(n)) {
              for (n = i;
                (i = n.nextSibling) && !domUtils.isBlockElm(i);) n = i
              this.setEndAfter(n)
              break
            }
            i = n, n = n.parentNode
          }
          r.parentNode === this.endContainer && this.endOffset--, domUtils.remove(r)
        }
        if (!this.collapsed) {
          for (; !(this.startOffset != 0 || t && t(this.startContainer) || o(this.startContainer));) this.setStartBefore(this.startContainer)
          for (; !(this.endOffset != (this.endContainer.nodeType == 1 ? this.endContainer.childNodes.length : this.endContainer.nodeValue.length) || t && t(this.endContainer) || o(this.endContainer));) this.setEndAfter(this.endContainer)
        }
        return this
      },
      enlargeToBlockElm: function (e) {
        for (; !domUtils.isBlockElm(this.startContainer);) this.setStartBefore(this.startContainer)
        if (!e) { for (; !domUtils.isBlockElm(this.endContainer);) this.setEndAfter(this.endContainer) }
        return this
      },
      adjustmentBoundary: function () {
        if (!this.collapsed) {
          for (; !domUtils.isBody(this.startContainer) && this.startOffset == this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length && this.startContainer[this.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length;) this.setStartAfter(this.startContainer)
          for (; !domUtils.isBody(this.endContainer) && !this.endOffset && this.endContainer[this.endContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length;) this.setEndBefore(this.endContainer)
        }
        return this
      },
      applyInlineStyle: function (e, t, i) {
        if (this.collapsed) return this
        this.trimBoundary().enlarge(!1, function (e) {
          return e.nodeType == 1 && domUtils.isBlockElm(e)
        }).adjustmentBoundary()
        for (var n, o, r = this.createBookmark(), a = r.end, s = function (e) {
            return e.nodeType == 1 ? e.tagName.toLowerCase() != 'br' : !domUtils.isWhitespace(e)
          }, l = domUtils.getNextDomNode(r.start, !1, s), d = this.cloneRange(); l && domUtils.getPosition(l, a) & domUtils.POSITION_PRECEDING;) {
          if (l.nodeType == 3 || dtd[e][l.tagName]) {
            for (d.setStartBefore(l), n = l; n && (n.nodeType == 3 || dtd[e][n.tagName]) && n !== a;) {
              o = n, n = domUtils.getNextDomNode(n, n.nodeType == 1, null, function (t) {
                return dtd[e][t.tagName]
              })
            }
            var c, u = d.setEndAfter(o).extractContents()
            if (i && i.length > 0) {
              var m, f
              f = m = i[0].cloneNode(!1)
              for (var h, p = 1; h = i[p++];) m.appendChild(h.cloneNode(!1)), m = m.firstChild
              c = m
            } else c = d.document.createElement(e)
            t && domUtils.setAttributes(c, t), c.appendChild(u), d.insertNode(i ? f : c)
            var g
            if (e == 'span' && t.style && /text\-decoration/.test(t.style) && (g = domUtils.findParentByTagName(c, 'a', !0)) ? (domUtils.setAttributes(g, t), domUtils.remove(c, !0), c = g) : (domUtils.mergeSibling(c), domUtils.clearEmptySibling(c)), domUtils.mergeChild(c, t), l = domUtils.getNextDomNode(c, !1, s), domUtils.mergeToParent(c), n === a) break
          } else l = domUtils.getNextDomNode(l, !0, s)
        }
        return this.moveToBookmark(r)
      },
      removeInlineStyle: function (e) {
        if (this.collapsed) return this
        e = utils.isArray(e) ? e : [e], this.shrinkBoundary().adjustmentBoundary()
        for (var t = this.startContainer, i = this.endContainer; ;) {
          if (t.nodeType == 1) {
            if (utils.indexOf(e, t.tagName.toLowerCase()) > -1) break
            if (t.tagName.toLowerCase() == 'body') {
              t = null
              break
            }
          }
          t = t.parentNode
        }
        for (;;) {
          if (i.nodeType == 1) {
            if (utils.indexOf(e, i.tagName.toLowerCase()) > -1) break
            if (i.tagName.toLowerCase() == 'body') {
              i = null
              break
            }
          }
          i = i.parentNode
        }
        var n, o, r = this.createBookmark()
        t && (o = this.cloneRange().setEndBefore(r.start).setStartBefore(t), n = o.extractContents(), o.insertNode(n), domUtils.clearEmptySibling(t, !0), t.parentNode.insertBefore(r.start, t)), i && (o = this.cloneRange().setStartAfter(r.end).setEndAfter(i), n = o.extractContents(), o.insertNode(n), domUtils.clearEmptySibling(i, !1, !0), i.parentNode.insertBefore(r.end, i.nextSibling))
        for (var a, s = domUtils.getNextDomNode(r.start, !1, function (e) {
          return e.nodeType == 1
        }); s && s !== r.end;) {
          a = domUtils.getNextDomNode(s, !0, function (e) {
            return e.nodeType == 1
          }), utils.indexOf(e, s.tagName.toLowerCase()) > -1 && domUtils.remove(s, !0), s = a
        }
        return this.moveToBookmark(r)
      },
      getClosedNode: function () {
        var e
        if (!this.collapsed) {
          var i = this.cloneRange().adjustmentBoundary().shrinkBoundary()
          if (t(i)) {
            var n = i.startContainer.childNodes[i.startOffset]
            n && n.nodeType == 1 && (dtd.$empty[n.tagName] || dtd.$nonChild[n.tagName]) && (e = n)
          }
        }
        return e
      },
      select: browser.ie ? function (e, t) {
        var i
        this.collapsed || this.shrinkBoundary()
        var n = this.getClosedNode()
        if (n && !t) {
          try {
            i = this.document.body.createControlRange(), i.addElement(n), i.select()
          } catch (s) {}
          return this
        }
        var d, c = this.createBookmark(),
          u = c.start
        if (i = this.document.body.createTextRange(), i.moveToElementText(u), i.moveStart('character', 1), this.collapsed) {
          if (!e && this.startContainer.nodeType != 3) {
            var m = this.document.createTextNode(l),
              f = this.document.createElement('span')
            f.appendChild(this.document.createTextNode(l)), u.parentNode.insertBefore(f, u), u.parentNode.insertBefore(m, u), o(this.document, m), a = m, r(f, 'previousSibling'), r(u, 'nextSibling'), i.moveStart('character', -1), i.collapse(!0)
          }
        } else {
          var h = this.document.body.createTextRange()
          d = c.end, h.moveToElementText(d), i.setEndPoint('EndToEnd', h)
        }
        this.moveToBookmark(c), f && domUtils.remove(f)
        try {
          i.select()
        } catch (s) {}
        return this
      } : function (e) {
        function t (e) {
          function t (t, i, n) {
            t.nodeType == 3 && t.nodeValue.length < i && (e[n + 'Offset'] = t.nodeValue.length)
          }
          t(e.startContainer, e.startOffset, 'start'), t(e.endContainer, e.endOffset, 'end')
        }
        var i, n = domUtils.getWindow(this.document),
          s = n.getSelection()
        if (browser.gecko ? this.document.body.focus() : n.focus(), s) {
          if (s.removeAllRanges(), this.collapsed && !e) {
            var d = this.startContainer,
              c = d
            d.nodeType == 1 && (c = d.childNodes[this.startOffset]), d.nodeType == 3 && this.startOffset || (c ? c.previousSibling && c.previousSibling.nodeType == 3 : d.lastChild && d.lastChild.nodeType == 3) || (i = this.document.createTextNode(l), this.insertNode(i), o(this.document, i), r(i, 'previousSibling'), r(i, 'nextSibling'), a = i, this.setStart(i, browser.webkit ? 1 : 0).collapse(!0))
          }
          var u = this.document.createRange()
          if (this.collapsed && browser.opera && this.startContainer.nodeType == 1) {
            var c = this.startContainer.childNodes[this.startOffset]
            if (c) {
              for (; c && domUtils.isBlockElm(c) && c.nodeType == 1 && c.childNodes[0];) c = c.childNodes[0]
              c && this.setStartBefore(c).collapse(!0)
            } else c = this.startContainer.lastChild, c && domUtils.isBr(c) && this.setStartBefore(c).collapse(!0)
          }
          t(this), u.setStart(this.startContainer, this.startOffset), u.setEnd(this.endContainer, this.endOffset), s.addRange(u)
        }
        return this
      },
      scrollToView: function (e, t) {
        e = e ? window : domUtils.getWindow(this.document)
        var i = this,
          n = i.document.createElement('span')
        return n.innerHTML = '&nbsp;', i.cloneRange().insertNode(n), domUtils.scrollToView(n, e, t), domUtils.remove(n), i
      },
      inFillChar: function () {
        var e = this.startContainer
        return !(!this.collapsed || e.nodeType != 3 || e.nodeValue.replace(new RegExp('^' + domUtils.fillChar), '').length + 1 != e.nodeValue.length)
      },
      createAddress: function (e, t) {
        function i (e) {
          for (var i, n = e ? o.startContainer : o.endContainer, r = domUtils.findParents(n, !0, function (e) {
              return !domUtils.isBody(e)
            }), a = [], s = 0; i = r[s++];) a.push(domUtils.getNodeIndex(i, t))
          var l = 0
          if (t) {
            if (n.nodeType == 3) {
              for (var d = n.previousSibling; d && d.nodeType == 3;) l += d.nodeValue.replace(fillCharReg, '').length, d = d.previousSibling
              l += e ? o.startOffset : o.endOffset
            } else if (n = n.childNodes[e ? o.startOffset : o.endOffset]) l = domUtils.getNodeIndex(n, t)
            else {
              n = e ? o.startContainer : o.endContainer
              for (var c = n.firstChild; c;) {
                if (domUtils.isFillChar(c)) c = c.nextSibling
                else if (l++, c.nodeType == 3) { for (; c && c.nodeType == 3;) c = c.nextSibling } else c = c.nextSibling
              }
            }
          } else l = e ? domUtils.isFillChar(n) ? 0 : o.startOffset : o.endOffset
          return l < 0 && (l = 0), a.push(l), a
        }
        var n = {},
          o = this
        return n.startAddress = i(!0), e || (n.endAddress = o.collapsed ? [].concat(n.startAddress) : i()), n
      },
      moveToAddress: function (e, t) {
        function i (e, t) {
          for (var i, o, r, a = n.document.body, s = 0, l = e.length; l > s; s++) {
            if (r = e[s], i = a, a = a.childNodes[r], !a) {
              o = r
              break
            }
          }
          t ? a ? n.setStartBefore(a) : n.setStart(i, o) : a ? n.setEndBefore(a) : n.setEnd(i, o)
        }
        var n = this
        return i(e.startAddress, !0), !t && e.endAddress && i(e.endAddress), n
      },
      equals: function (e) {
        for (var t in this) { if (this.hasOwnProperty(t) && this[t] !== e[t]) return !1 }
        return !0
      },
      traversal: function (e, t) {
        if (this.collapsed) return this
        for (var i = this.createBookmark(), n = i.end, o = domUtils.getNextDomNode(i.start, !1, t); o && o !== n && domUtils.getPosition(o, n) & domUtils.POSITION_PRECEDING;) {
          var r = domUtils.getNextDomNode(o, !1, t)
          e(o), o = r
        }
        return this.moveToBookmark(i)
      }
    }
  }()),
  (function () {
    function e (e, t) {
      var i = domUtils.getNodeIndex
      e = e.duplicate(), e.collapse(t)
      var n = e.parentElement()
      if (!n.hasChildNodes()) {
        return {
          container: n,
          offset: 0
        }
      }
      for (var o, r, a = n.children, s = e.duplicate(), l = 0, d = a.length - 1, c = -1; d >= l;) {
        c = Math.floor((l + d) / 2), o = a[c], s.moveToElementText(o)
        var u = s.compareEndPoints('StartToStart', e)
        if (u > 0) d = c - 1
        else {
          if (!(u < 0)) {
            return {
              container: n,
              offset: i(o)
            }
          }
          l = c + 1
        }
      }
      if (c == -1) {
        if (s.moveToElementText(n), s.setEndPoint('StartToStart', e), r = s.text.replace(/(\r\n|\r)/g, '\n').length, a = n.childNodes, !r) {
          return o = a[a.length - 1], {
            container: o,
            offset: o.nodeValue.length
          }
        }
        for (var m = a.length; r > 0;) r -= a[--m].nodeValue.length
        return {
          container: a[m],
          offset: -r
        }
      }
      if (s.collapse(u > 0), s.setEndPoint(u > 0 ? 'StartToStart' : 'EndToStart', e), r = s.text.replace(/(\r\n|\r)/g, '\n').length, !r) {
        return dtd.$empty[o.tagName] || dtd.$nonChild[o.tagName] ? {
          container: n,
          offset: i(o) + (u > 0 ? 0 : 1)
        } : {
          container: o,
          offset: u > 0 ? 0 : o.childNodes.length
        }
      }
      for (; r > 0;) {
        try {
          var f = o
          o = o[u > 0 ? 'previousSibling' : 'nextSibling'], r -= o.nodeValue.length
        } catch (h) {
          return {
            container: n,
            offset: i(f)
          }
        }
      }
      return {
        container: o,
        offset: u > 0 ? -r : o.nodeValue.length + r
      }
    }

    function t (t, i) {
      if (t.item) i.selectNode(t.item(0))
      else {
        var n = e(t, !0)
        i.setStart(n.container, n.offset), t.compareEndPoints('StartToEnd', t) != 0 && (n = e(t, !1), i.setEnd(n.container, n.offset))
      }
      return i
    }

    function i (e) {
      var t
      try {
        t = e.getNative().createRange()
      } catch (i) {
        return null
      }
      var n = t.item ? t.item(0) : t.parentElement()
      return (n.ownerDocument || n) === e.document ? t : null
    }
    var n = dom.Selection = function (e) {
      var t, n = this
      n.document = e, browser.ie9below && (t = domUtils.getWindow(e).frameElement, domUtils.on(t, 'beforedeactivate', function () {
        n._bakIERange = n.getIERange()
      }), domUtils.on(t, 'activate', function () {
        try {
          !i(n) && n._bakIERange && n._bakIERange.select()
        } catch (e) {}
        n._bakIERange = null
      })), t = e = null
    }
    n.prototype = {
      rangeInBody: function (e, t) {
        var i = browser.ie9below || t ? e.item ? e.item() : e.parentElement() : e.startContainer
        return i === this.document.body || domUtils.inDoc(i, this.document)
      },
      getNative: function () {
        var e = this.document
        try {
          return e ? browser.ie9below ? e.selection : domUtils.getWindow(e).getSelection() : null
        } catch (t) {
          return null
        }
      },
      getIERange: function () {
        var e = i(this)
        return !e && this._bakIERange ? this._bakIERange : e
      },
      cache: function () {
        this.clear(), this._cachedRange = this.getRange(), this._cachedStartElement = this.getStart(), this._cachedStartElementPath = this.getStartElementPath()
      },
      getStartElementPath: function () {
        if (this._cachedStartElementPath) return this._cachedStartElementPath
        var e = this.getStart()
        return e ? domUtils.findParents(e, !0, null, !0) : []
      },
      clear: function () {
        this._cachedStartElementPath = this._cachedRange = this._cachedStartElement = null
      },
      isFocus: function () {
        try {
          if (browser.ie9below) {
            var e = i(this)
            return !(!e || !this.rangeInBody(e))
          }
          return !!this.getNative().rangeCount
        } catch (t) {
          return !1
        }
      },
      getRange: function () {
        function e (e) {
          for (var t = i.document.body.firstChild, n = e.collapsed; t && t.firstChild;) e.setStart(t, 0), t = t.firstChild
          e.startContainer || e.setStart(i.document.body, 0), n && e.collapse(!0)
        }
        var i = this
        if (i._cachedRange != null) return this._cachedRange
        var n = new baidu.editor.dom.Range(i.document)
        if (browser.ie9below) {
          var o = i.getIERange()
          if (o) {
            try {
              t(o, n)
            } catch (r) {
              e(n)
            }
          } else e(n)
        } else {
          var a = i.getNative()
          if (a && a.rangeCount) {
            var s = a.getRangeAt(0),
              l = a.getRangeAt(a.rangeCount - 1)
            n.setStart(s.startContainer, s.startOffset).setEnd(l.endContainer, l.endOffset), n.collapsed && domUtils.isBody(n.startContainer) && !n.startOffset && e(n)
          } else {
            if (this._bakRange && domUtils.inDoc(this._bakRange.startContainer, this.document)) return this._bakRange
            e(n)
          }
        }
        return this._bakRange = n
      },
      getStart: function () {
        if (this._cachedStartElement) return this._cachedStartElement
        var e, t, i, n, o = browser.ie9below ? this.getIERange() : this.getRange()
        if (browser.ie9below) {
          if (!o) return this.document.body.firstChild
          if (o.item) return o.item(0)
          for (e = o.duplicate(), e.text.length > 0 && e.moveStart('character', 1), e.collapse(1), t = e.parentElement(), n = i = o.parentElement(); i = i.parentNode;) {
            if (i == t) {
              t = n
              break
            }
          }
        } else if (o.shrinkBoundary(), t = o.startContainer, t.nodeType == 1 && t.hasChildNodes() && (t = t.childNodes[Math.min(t.childNodes.length - 1, o.startOffset)]), t.nodeType == 3) return t.parentNode
        return t
      },
      getText: function () {
        var e, t
        return this.isFocus() && (e = this.getNative()) ? (t = browser.ie9below ? e.createRange() : e.getRangeAt(0), browser.ie9below ? t.text : t.toString()) : ''
      },
      clearRange: function () {
        this.getNative()[browser.ie9below ? 'empty' : 'removeAllRanges']()
      }
    }
  }()),
  (function () {
    function e (e, t) {
      var i
      if (t.textarea) {
        if (utils.isString(t.textarea)) {
          for (var n, o = 0, r = domUtils.getElementsByTagName(e, 'textarea'); n = r[o++];) {
            if (n.id == 'ueditor_textarea_' + t.options.textarea) {
              i = n
              break
            }
          }
        } else i = t.textarea
      }
      i || (e.appendChild(i = domUtils.createElement(document, 'textarea', {
        name: t.options.textarea,
        id: 'ueditor_textarea_' + t.options.textarea,
        style: 'display:none'
      })), t.textarea = i), !i.getAttribute('name') && i.setAttribute('name', t.options.textarea), i.value = t.hasContents() ? t.options.allHtmlEnabled ? t.getAllHtml() : t.getContent(null, null, !0) : ''
    }

    function t (e) {
      for (var t in e) return t
    }

    function i (e) {
      e.langIsReady = !0, e.fireEvent('langReady')
    }
    var n, o = 0,
      r = UE.Editor = function (e) {
        var n = this
        n.uid = o++, EventBase.call(n), n.commands = {}, n.options = utils.extend(utils.clone(e || {}), UEDITOR_CONFIG, !0), n.shortcutkeys = {}, n.inputRules = [], n.outputRules = [], n.setOpt(r.defaultOptions(n)), n.loadServerConfig(), utils.isEmptyObject(UE.I18N) ? utils.loadFile(document, {
          src: n.options.langPath + n.options.lang + '/' + n.options.lang + '.js',
          tag: 'script',
          type: 'text/javascript',
          defer: 'defer'
        }, function () {
          UE.plugin.load(n), i(n)
        }) : (n.options.lang = t(UE.I18N), UE.plugin.load(n), i(n)), UE.instants['ueditorInstant' + n.uid] = n
      }
    r.prototype = {
      registerCommand: function (e, t) {
        this.commands[e] = t
      },
      ready: function (e) {
        var t = this
        e && (t.isReady ? e.apply(t) : t.addListener('ready', e))
      },
      setOpt: function (e, t) {
        var i = {}
        utils.isString(e) ? i[e] = t : i = e, utils.extend(this.options, i, !0)
      },
      getOpt: function (e) {
        return this.options[e]
      },
      destroy: function () {
        var e = this
        e.fireEvent('destroy')
        var t = e.container.parentNode,
          i = e.textarea
        i ? i.style.display = '' : (i = document.createElement('textarea'), t.parentNode.insertBefore(i, t)), i.style.width = e.iframe.offsetWidth + 'px', i.style.height = e.iframe.offsetHeight + 'px', i.value = e.getContent(), i.id = e.key, t.innerHTML = '', domUtils.remove(t)
        var n = e.key
        for (var o in e) e.hasOwnProperty(o) && delete this[o]
        UE.delEditor(n)
      },
      render: function (e) {
        var t = this,
          i = t.options,
          n = function (t) {
            return parseInt(domUtils.getComputedStyle(e, t))
          }
        if (utils.isString(e) && (e = document.getElementById(e)), e) {
          i.initialFrameWidth ? i.minFrameWidth = i.initialFrameWidth : i.minFrameWidth = i.initialFrameWidth = e.offsetWidth, i.initialFrameHeight ? i.minFrameHeight = i.initialFrameHeight : i.initialFrameHeight = i.minFrameHeight = e.offsetHeight, e.style.width = /%$/.test(i.initialFrameWidth) ? '100%' : i.initialFrameWidth - n('padding-left') - n('padding-right') + 'px', e.style.height = /%$/.test(i.initialFrameHeight) ? '100%' : i.initialFrameHeight - n('padding-top') - n('padding-bottom') + 'px', e.style.zIndex = i.zIndex
          var o = (ie && browser.version < 9 ? '' : '<!DOCTYPE html>') + "<html xmlns='http://www.w3.org/1999/xhtml' class='view' ><head><style type='text/css'>.view{padding:0;word-wrap:break-word;cursor:text;height:90%;}\nbody{margin:8px;font-family:sans-serif;font-size:16px;}p{margin:5px 0;}</style>" + (i.iframeCssUrl ? "<link rel='stylesheet' type='text/css' href='" + utils.unhtml(i.iframeCssUrl) + "'/>" : '') + (i.initialStyle ? '<style>' + i.initialStyle + '</style>' : '') + "</head><body class='view' ></body><script type='text/javascript' " + (ie ? "defer='defer'" : '') + " id='_initialScript'>setTimeout(function(){editor = window.parent.UE.instants['ueditorInstant" + t.uid + "'];editor._setup(document);},0);var _tmpScript = document.getElementById('_initialScript');_tmpScript.parentNode.removeChild(_tmpScript);</script></html>"
          e.appendChild(domUtils.createElement(document, 'iframe', {
            id: 'ueditor_' + t.uid,
            width: '100%',
            height: '100%',
            frameborder: '0',
            src: 'javascript:void(function(){document.open();' + (i.customDomain && document.domain != location.hostname ? 'document.domain="' + document.domain + '";' : '') + 'document.write("' + o + '");document.close();}())'
          })), e.style.overflow = 'hidden', setTimeout(function () {
            /%$/.test(i.initialFrameWidth) && (i.minFrameWidth = i.initialFrameWidth = e.offsetWidth), /%$/.test(i.initialFrameHeight) && (i.minFrameHeight = i.initialFrameHeight = e.offsetHeight, e.style.height = i.initialFrameHeight + 'px')
          })
        }
      },
      _setup: function (t) {
        var i = this,
          n = i.options
        ie ? (t.body.disabled = !0, t.body.contentEditable = !0, t.body.disabled = !1) : t.body.contentEditable = !0, t.body.spellcheck = !1, i.document = t, i.window = t.defaultView || t.parentWindow, i.iframe = i.window.frameElement, i.body = t.body, i.selection = new dom.Selection(t)
        var o
        browser.gecko && (o = this.selection.getNative()) && o.removeAllRanges(), this._initEvents()
        for (var r = this.iframe.parentNode; !domUtils.isBody(r); r = r.parentNode) {
          if (r.tagName == 'FORM') {
            i.form = r, i.options.autoSyncData ? domUtils.on(i.window, 'blur', function () {
              e(r, i)
            }) : domUtils.on(r, 'submit', function () {
              e(this, i)
            })
            break
          }
        }
        if (n.initialContent) {
          if (n.autoClearinitialContent) {
            var a = i.execCommand
            i.execCommand = function () {
              return i.fireEvent('firstBeforeExecCommand'), a.apply(i, arguments)
            }, this._setDefaultContent(n.initialContent)
          } else this.setContent(n.initialContent, !1, !0)
        }
        domUtils.isEmptyNode(i.body) && (i.body.innerHTML = '<p>' + (browser.ie ? '' : '<br/>') + '</p>'), n.focus && setTimeout(function () {
          i.focus(i.options.focusInEnd), !i.options.autoClearinitialContent && i._selectionChange()
        }, 0), i.container || (i.container = this.iframe.parentNode), n.fullscreen && i.ui && i.ui.setFullScreen(!0)
        try {
          i.document.execCommand('2D-position', !1, !1)
        } catch (s) {}
        try {
          i.document.execCommand('enableInlineTableEditing', !1, !1)
        } catch (s) {}
        try {
          i.document.execCommand('enableObjectResizing', !1, !1)
        } catch (s) {}
        i._bindshortcutKeys(), i.isReady = 1, i.fireEvent('ready'), n.onready && n.onready.call(i), browser.ie9below || domUtils.on(i.window, ['blur', 'focus'], function (e) {
          if (e.type == 'blur') {
            i._bakRange = i.selection.getRange()
            try {
              i._bakNativeRange = i.selection.getNative().getRangeAt(0), i.selection.getNative().removeAllRanges()
            } catch (e) {
              i._bakNativeRange = null
            }
          } else {
            try {
              i._bakRange && i._bakRange.select()
            } catch (e) {}
          }
        }), browser.gecko && browser.version <= 10902 && (i.body.contentEditable = !1, setTimeout(function () {
          i.body.contentEditable = !0
        }, 100), setInterval(function () {
          i.body.style.height = i.iframe.offsetHeight - 20 + 'px'
        }, 100)), !n.isShow && i.setHide(), n.readonly && i.setDisabled()
      },
      sync: function (t) {
        var i = this,
          n = t ? document.getElementById(t) : domUtils.findParent(i.iframe.parentNode, function (e) {
            return e.tagName == 'FORM'
          }, !0)
        n && e(n, i)
      },
      setHeight: function (e, t) {
        e !== parseInt(this.iframe.parentNode.style.height) && (this.iframe.parentNode.style.height = e + 'px'), !t && (this.options.minFrameHeight = this.options.initialFrameHeight = e), this.body.style.height = e + 'px', !t && this.trigger('setHeight')
      },
      addshortcutkey: function (e, t) {
        var i = {}
        t ? i[e] = t : i = e, utils.extend(this.shortcutkeys, i)
      },
      _bindshortcutKeys: function () {
        var e = this,
          t = this.shortcutkeys
        e.addListener('keydown', function (i, n) {
          var o = n.keyCode || n.which
          for (var r in t) {
            for (var a, s = t[r].split(','), l = 0; a = s[l++];) {
              a = a.split(':')
              var d = a[0],
                c = a[1];
              (/^(ctrl)(\+shift)?\+(\d+)$/.test(d.toLowerCase()) || /^(\d+)$/.test(d)) && ((RegExp.$1 == 'ctrl' ? n.ctrlKey || n.metaKey : 0) && (RegExp.$2 != '' ? n[RegExp.$2.slice(1) + 'Key'] : 1) && o == RegExp.$3 || o == RegExp.$1) && (e.queryCommandState(r, c) != -1 && e.execCommand(r, c), domUtils.preventDefault(n))
            }
          }
        })
      },
      getContent: function (e, t, i, n, o) {
        var r = this
        if (e && utils.isFunction(e) && (t = e, e = ''), t ? !t() : !this.hasContents()) return ''
        r.fireEvent('beforegetcontent')
        var a = UE.htmlparser(r.body.innerHTML, n)
        return r.filterOutputRule(a), r.fireEvent('aftergetcontent', e, a), a.toHtml(o)
      },
      getAllHtml: function () {
        var e = this,
          t = []
        if (e.fireEvent('getAllHtml', t), browser.ie && browser.version > 8) {
          var i = ''
          utils.each(e.document.styleSheets, function (e) {
            i += e.href ? '<link rel="stylesheet" type="text/css" href="' + e.href + '" />' : '<style>' + e.cssText + '</style>'
          }), utils.each(e.document.getElementsByTagName('script'), function (e) {
            i += e.outerHTML
          })
        }
        return '<html><head>' + (e.options.charset ? '<meta http-equiv="Content-Type" content="text/html; charset=' + e.options.charset + '"/>' : '') + (i || e.document.getElementsByTagName('head')[0].innerHTML) + t.join('\n') + '</head><body ' + (ie && browser.version < 9 ? 'class="view"' : '') + '>' + e.getContent(null, null, !0) + '</body></html>'
      },
      getPlainTxt: function () {
        var e = new RegExp(domUtils.fillChar, 'g'),
          t = this.body.innerHTML.replace(/[\n\r]/g, '')
        return t = t.replace(/<(p|div)[^>]*>(<br\/?>|&nbsp;)<\/\1>/gi, '\n').replace(/<br\/?>/gi, '\n').replace(/<[^>\/]+>/g, '').replace(/(\n)?<\/([^>]+)>/g, function (e, t, i) {
          return dtd.$block[i] ? '\n' : t || ''
        }), t.replace(e, '').replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ')
      },
      getContentTxt: function () {
        var e = new RegExp(domUtils.fillChar, 'g')
        return this.body[browser.ie ? 'innerText' : 'textContent'].replace(e, '').replace(/\u00a0/g, ' ')
      },
      setContent: function (t, i, n) {
        function o (e) {
          return e.tagName == 'DIV' && e.getAttribute('cdata_tag')
        }
        var r = this
        r.fireEvent('beforesetcontent', t)
        var a = UE.htmlparser(t)
        if (r.filterInputRule(a), t = a.toHtml(), r.body.innerHTML = (i ? r.body.innerHTML : '') + t, r.options.enterTag == 'p') {
          var s, l = this.body.firstChild
          if (!l || l.nodeType == 1 && (dtd.$cdata[l.tagName] || o(l) || domUtils.isCustomeNode(l)) && l === this.body.lastChild) this.body.innerHTML = '<p>' + (browser.ie ? '&nbsp;' : '<br/>') + '</p>' + this.body.innerHTML
          else {
            for (var d = r.document.createElement('p'); l;) {
              for (; l && (l.nodeType == 3 || l.nodeType == 1 && dtd.p[l.tagName] && !dtd.$cdata[l.tagName]);) s = l.nextSibling, d.appendChild(l), l = s
              if (d.firstChild) {
                if (!l) {
                  r.body.appendChild(d)
                  break
                }
                l.parentNode.insertBefore(d, l), d = r.document.createElement('p')
              }
              l = l.nextSibling
            }
          }
        }
        r.fireEvent('aftersetcontent'), r.fireEvent('contentchange'), !n && r._selectionChange(), r._bakRange = r._bakIERange = r._bakNativeRange = null
        var c
        browser.gecko && (c = this.selection.getNative()) && c.removeAllRanges(), r.options.autoSyncData && r.form && e(r.form, r)
      },
      focus: function (e) {
        try {
          var t = this,
            i = t.selection.getRange()
          if (e) {
            var n = t.body.lastChild
            n && n.nodeType == 1 && !dtd.$empty[n.tagName] && (domUtils.isEmptyBlock(n) ? i.setStartAtFirst(n) : i.setStartAtLast(n), i.collapse(!0)), i.setCursor(!0)
          } else {
            if (!i.collapsed && domUtils.isBody(i.startContainer) && i.startOffset == 0) {
              var n = t.body.firstChild
              n && n.nodeType == 1 && !dtd.$empty[n.tagName] && i.setStartAtFirst(n).collapse(!0)
            }
            i.select(!0)
          }
          this.fireEvent('focus selectionchange')
        } catch (o) {}
      },
      isFocus: function () {
        return this.selection.isFocus()
      },
      blur: function () {
        var e = this.selection.getNative()
        if (e.empty && browser.ie) {
          var t = document.body.createTextRange()
          t.moveToElementText(document.body), t.collapse(!0), t.select(), e.empty()
        } else e.removeAllRanges()
      },
      _initEvents: function () {
        var e = this,
          t = e.document,
          i = e.window
        e._proxyDomEvent = utils.bind(e._proxyDomEvent, e), domUtils.on(t, ['click', 'contextmenu', 'mousedown', 'keydown', 'keyup', 'keypress', 'mouseup', 'mouseover', 'mouseout', 'selectstart'], e._proxyDomEvent), domUtils.on(i, ['focus', 'blur'], e._proxyDomEvent), domUtils.on(e.body, 'drop', function (t) {
          browser.gecko && t.stopPropagation && t.stopPropagation(), e.fireEvent('contentchange')
        }), domUtils.on(t, ['mouseup', 'keydown'], function (t) {
          t.type == 'keydown' && (t.ctrlKey || t.metaKey || t.shiftKey || t.altKey) || t.button != 2 && e._selectionChange(250, t)
        })
      },
      _proxyDomEvent: function (e) {
        return this.fireEvent('before' + e.type.replace(/^on/, '').toLowerCase()) === !1 ? !1 : this.fireEvent(e.type.replace(/^on/, ''), e) === !1 ? !1 : this.fireEvent('after' + e.type.replace(/^on/, '').toLowerCase())
      },
      _selectionChange: function (e, t) {
        var i, o, r = this,
          a = !1
        if (browser.ie && browser.version < 9 && t && t.type == 'mouseup') {
          var s = this.selection.getRange()
          s.collapsed || (a = !0, i = t.clientX, o = t.clientY)
        }
        clearTimeout(n), n = setTimeout(function () {
          if (r.selection && r.selection.getNative()) {
            var e
            if (a && r.selection.getNative().type == 'None') {
              e = r.document.body.createTextRange()
              try {
                e.moveToPoint(i, o)
              } catch (n) {
                e = null
              }
            }
            var s
            e && (s = r.selection.getIERange, r.selection.getIERange = function () {
              return e
            }), r.selection.cache(), s && (r.selection.getIERange = s), r.selection._cachedRange && r.selection._cachedStartElement && (r.fireEvent('beforeselectionchange'), r.fireEvent('selectionchange', !!t), r.fireEvent('afterselectionchange'), r.selection.clear())
          }
        }, e || 50)
      },
      _callCmdFn: function (e, t) {
        var i, n, o = t[0].toLowerCase()
        return i = this.commands[o] || UE.commands[o], n = i && i[e], i && n || e != 'queryCommandState' ? n ? n.apply(this, t) : void 0 : 0
      },
      execCommand: function (e) {
        e = e.toLowerCase()
        var t, i = this,
          n = i.commands[e] || UE.commands[e]
        return n && n.execCommand ? (n.notNeedUndo || i.__hasEnterExecCommand ? (t = this._callCmdFn('execCommand', arguments), !i.__hasEnterExecCommand && !n.ignoreContentChange && !i._ignoreContentChange && i.fireEvent('contentchange')) : (i.__hasEnterExecCommand = !0, i.queryCommandState.apply(i, arguments) != -1 && (i.fireEvent('saveScene'), i.fireEvent.apply(i, ['beforeexeccommand', e].concat(arguments)), t = this._callCmdFn('execCommand', arguments), i.fireEvent.apply(i, ['afterexeccommand', e].concat(arguments)), i.fireEvent('saveScene')), i.__hasEnterExecCommand = !1), !i.__hasEnterExecCommand && !n.ignoreContentChange && !i._ignoreContentChange && i._selectionChange(), t) : null
      },
      queryCommandState: function (e) {
        return this._callCmdFn('queryCommandState', arguments)
      },
      queryCommandValue: function (e) {
        return this._callCmdFn('queryCommandValue', arguments)
      },
      hasContents: function (e) {
        if (e) {
          for (var t, i = 0; t = e[i++];) { if (this.document.getElementsByTagName(t).length > 0) return !0 }
        }
        if (!domUtils.isEmptyBlock(this.body)) return !0
        for (e = ['div'], i = 0; t = e[i++];) {
          for (var n, o = domUtils.getElementsByTagName(this.document, t), r = 0; n = o[r++];) { if (domUtils.isCustomeNode(n)) return !0 }
        }
        return !1
      },
      reset: function () {
        this.fireEvent('reset')
      },
      setEnabled: function () {
        var e, t = this
        if (t.body.contentEditable == 'false') {
          t.body.contentEditable = !0, e = t.selection.getRange()
          try {
            e.moveToBookmark(t.lastBk), delete t.lastBk
          } catch (i) {
            e.setStartAtFirst(t.body).collapse(!0)
          }
          e.select(!0), t.bkqueryCommandState && (t.queryCommandState = t.bkqueryCommandState, delete t.bkqueryCommandState), t.bkqueryCommandValue && (t.queryCommandValue = t.bkqueryCommandValue, delete t.bkqueryCommandValue), t.fireEvent('selectionchange')
        }
      },
      enable: function () {
        return this.setEnabled()
      },
      setDisabled: function (e) {
        var t = this
        e = e ? utils.isArray(e) ? e : [e] : [], t.body.contentEditable == 'true' && (t.lastBk || (t.lastBk = t.selection.getRange().createBookmark(!0)), t.body.contentEditable = !1, t.bkqueryCommandState = t.queryCommandState, t.bkqueryCommandValue = t.queryCommandValue, t.queryCommandState = function (i) {
          return utils.indexOf(e, i) != -1 ? t.bkqueryCommandState.apply(t, arguments) : -1
        }, t.queryCommandValue = function (i) {
          return utils.indexOf(e, i) != -1 ? t.bkqueryCommandValue.apply(t, arguments) : null
        }, t.fireEvent('selectionchange'))
      },
      disable: function (e) {
        return this.setDisabled(e)
      },
      _setDefaultContent: (function () {
        function e () {
          var t = this
          t.document.getElementById('initContent') && (t.body.innerHTML = '<p>' + (ie ? '' : '<br/>') + '</p>', t.removeListener('firstBeforeExecCommand focus', e), setTimeout(function () {
            t.focus(), t._selectionChange()
          }, 0))
        }
        return function (t) {
          var i = this
          i.body.innerHTML = '<p id="initContent">' + t + '</p>', i.addListener('firstBeforeExecCommand focus', e)
        }
      }()),
      setShow: function () {
        var e = this,
          t = e.selection.getRange()
        if (e.container.style.display == 'none') {
          try {
            t.moveToBookmark(e.lastBk), delete e.lastBk
          } catch (i) {
            t.setStartAtFirst(e.body).collapse(!0)
          }
          setTimeout(function () {
            t.select(!0)
          }, 100), e.container.style.display = ''
        }
      },
      show: function () {
        return this.setShow()
      },
      setHide: function () {
        var e = this
        e.lastBk || (e.lastBk = e.selection.getRange().createBookmark(!0)), e.container.style.display = 'none'
      },
      hide: function () {
        return this.setHide()
      },
      getLang: function (e) {
        var t = UE.I18N[this.options.lang]
        if (!t) throw Error('not import language file')
        e = (e || '').split('.')
        for (var i, n = 0;
          (i = e[n++]) && (t = t[i], t););
        return t
      },
      getContentLength: function (e, t) {
        var i = this.getContent(!1, !1, !0).length
        if (e) {
          t = (t || []).concat(['hr', 'img', 'iframe']), i = this.getContentTxt().replace(/[\t\r\n]+/g, '').length
          for (var n, o = 0; n = t[o++];) i += this.document.getElementsByTagName(n).length
        }
        return i
      },
      addInputRule: function (e) {
        this.inputRules.push(e)
      },
      filterInputRule: function (e) {
        for (var t, i = 0; t = this.inputRules[i++];) t.call(this, e)
      },
      addOutputRule: function (e) {
        this.outputRules.push(e)
      },
      filterOutputRule: function (e) {
        for (var t, i = 0; t = this.outputRules[i++];) t.call(this, e)
      },
      getActionUrl: function (e) {
        var t = this.getOpt(e) || e,
          i = this.getOpt('imageUrl'),
          n = this.getOpt('serverUrl')
        return !n && i && (n = i.replace(/^(.*[\/]).+([\.].+)$/, '$1controller$2')), n ? (n = n + (n.indexOf('?') == -1 ? '?' : '&') + 'action=' + (t || ''), utils.formatUrl(n)) : ''
      }
    }, utils.inherits(r, EventBase)
  }()), UE.Editor.defaultOptions = function (e) {
    var t = e.options.UEDITOR_HOME_URL
    return {
      isShow: !0,
      initialContent: '',
      initialStyle: '',
      autoClearinitialContent: !1,
      iframeCssUrl: t + 'themes/iframe.css',
      textarea: 'editorValue',
      focus: !1,
      focusInEnd: !0,
      autoClearEmptyNode: !0,
      fullscreen: !1,
      readonly: !1,
      zIndex: 999,
      imagePopup: !0,
      enterTag: 'p',
      customDomain: !1,
      lang: 'zh-cn',
      langPath: t + 'lang/',
      theme: 'default',
      themePath: t + 'themes/',
      allHtmlEnabled: !1,
      scaleEnabled: !1,
      tableNativeEditInFF: !1,
      autoSyncData: !0,
      fileNameFormat: '{time}{rand:6}'
    }
  },
  (function () {
    UE.Editor.prototype.loadServerConfig = function () {
      function showErrorMsg (e) {
        console && console.error(e)
      }
      var me = this
      setTimeout(function () {
        try {
          me.options.imageUrl && me.setOpt('serverUrl', me.options.imageUrl.replace(/^(.*[\/]).+([\.].+)$/, '$1controller$2'))
          var configUrl = me.getActionUrl('config'),
            isJsonp = utils.isCrossDomainUrl(configUrl)
          me._serverConfigLoaded = !1, configUrl && UE.ajax.request(configUrl, {
            method: 'GET',
            dataType: isJsonp ? 'jsonp' : '',
            onsuccess: function (r) {
              try {
                var config = isJsonp ? r : eval('(' + r.responseText + ')')
                utils.extend(me.options, config), me.fireEvent('serverConfigLoaded'), me._serverConfigLoaded = !0
              } catch (e) {
                showErrorMsg(me.getLang('loadconfigFormatError'))
              }
            },
            onerror: function () {
              showErrorMsg(me.getLang('loadconfigHttpError'))
            }
          })
        } catch (e) {
          showErrorMsg(me.getLang('loadconfigError'))
        }
      })
    }, UE.Editor.prototype.isServerConfigLoaded = function () {
      var e = this
      return e._serverConfigLoaded || !1
    }, UE.Editor.prototype.afterConfigReady = function (e) {
      if (e && utils.isFunction(e)) {
        var t = this,
          i = function () {
            e.apply(t, arguments), t.removeListener('serverConfigLoaded', i)
          }
        t.isServerConfigLoaded() ? e.call(t, 'serverConfigLoaded') : t.addListener('serverConfigLoaded', i)
      }
    }
  }()), UE.ajax = (function () {
    function e (e) {
      var t = []
      for (var i in e) {
        if (i != 'method' && i != 'timeout' && i != 'async' && i != 'dataType' && i != 'callback' && void 0 != e[i] && e[i] != null) {
          if ((typeof e[i]).toLowerCase() != 'function' && (typeof e[i]).toLowerCase() != 'object') t.push(encodeURIComponent(i) + '=' + encodeURIComponent(e[i]))
          else if (utils.isArray(e[i])) { for (var n = 0; n < e[i].length; n++) t.push(encodeURIComponent(i) + '[]=' + encodeURIComponent(e[i][n])) }
        }
      }
      return t.join('&')
    }

    function t (t, i) {
      var n = r(),
        o = !1,
        a = {
          method: 'POST',
          timeout: 5e3,
          async: !0,
          data: {},
          onsuccess: function () {},
          onerror: function () {}
        }
      if (typeof t === 'object' && (i = t, t = i.url), n && t) {
        var s = i ? utils.extend(a, i) : a,
          l = e(s)
        utils.isEmptyObject(s.data) || (l += (l ? '&' : '') + e(s.data))
        var d = setTimeout(function () {
            n.readyState != 4 && (o = !0, n.abort(), clearTimeout(d))
          }, s.timeout),
          c = s.method.toUpperCase(),
          u = t + (t.indexOf('?') == -1 ? '?' : '&') + (c == 'POST' ? '' : l + '&noCache=' + +new Date())
        n.open(c, u, s.async), n.onreadystatechange = function () {
          n.readyState == 4 && (o || n.status != 200 ? s.onerror(n) : s.onsuccess(n))
        }, c == 'POST' ? (n.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'), n.send(l)) : n.send(null)
      }
    }

    function i (t, i) {
      function n (e, t, i) {
        e.setAttribute('type', 'text/javascript'), e.setAttribute('defer', 'defer'), i && e.setAttribute('charset', i), e.setAttribute('src', t), document.getElementsByTagName('head')[0].appendChild(e)
      }

      function o (e) {
        return function () {
          try {
            if (e) c.onerror && c.onerror()
            else {
              try {
                clearTimeout(a), l.apply(window, arguments)
              } catch (t) {}
            }
          } catch (i) {
            c.onerror && c.onerror.call(window, i)
          } finally {
            c.oncomplete && c.oncomplete.apply(window, arguments), d.parentNode && d.parentNode.removeChild(d), window[r] = null
            try {
              delete window[r]
            } catch (t) {}
          }
        }
      }
      var r, a, s, l = i.onsuccess || function () {},
        d = document.createElement('SCRIPT'),
        c = i || {},
        u = c.charset,
        m = c.jsonp || 'callback',
        f = c.timeOut || 0,
        h = new RegExp('(\\?|&)' + m + '=([^&]*)')
      utils.isFunction(l) ? (r = 'bd__editor__' + Math.floor(2147483648 * Math.random()).toString(36), window[r] = o(0)) : utils.isString(l) ? r = l : (s = h.exec(t)) && (r = s[2]), t = t.replace(h, '$1' + m + '=' + r), t.search(h) < 0 && (t += (t.indexOf('?') < 0 ? '?' : '&') + m + '=' + r)
      var p = e(i)
      utils.isEmptyObject(i.data) || (p += (p ? '&' : '') + e(i.data)), p && (t = t.replace(/\?/, '?' + p + '&')), d.onerror = o(1), f && (a = setTimeout(o(1), f)), n(d, t, u)
    }
    var n = 'XMLHttpRequest()'
    try {
      new ActiveXObject('Msxml2.XMLHTTP'), n = "ActiveXObject('Msxml2.XMLHTTP')"
    } catch (o) {
      try {
        new ActiveXObject('Microsoft.XMLHTTP'), n = "ActiveXObject('Microsoft.XMLHTTP')"
      } catch (o) {}
    }
    var r = new Function('return new ' + n)
    return {
      request: function (e, n) {
        n && n.dataType == 'jsonp' ? i(e, n) : t(e, n)
      },
      getJSONP: function (e, t, n) {
        var o = {
          data: t,
          oncomplete: n
        }
        i(e, o)
      }
    }
  }())
  var filterWord = UE.filterWord = (function () {
    function e (e) {
      return /(class="?Mso|style="[^"]*\bmso\-|w:WordDocument|<(v|o):|lang=)/gi.test(e)
    }

    function t (e) {
      return e = e.replace(/[\d.]+\w+/g, function (e) {
        return utils.transUnitToPx(e)
      })
    }

    function i (e) {
      return e.replace(/[\t\r\n]+/g, ' ').replace(/<!--[\s\S]*?-->/gi, '').replace(/<v:shape [^>]*>[\s\S]*?.<\/v:shape>/gi, function (e) {
        if (browser.opera) return ''
        try {
          if (/Bitmap/i.test(e)) return ''
          var i = e.match(/width:([ \d.]*p[tx])/i)[1],
            n = e.match(/height:([ \d.]*p[tx])/i)[1],
            o = e.match(/src=\s*"([^"]*)"/i)[1]
          return '<img width="' + t(i) + '" height="' + t(n) + '" src="' + o + '" />'
        } catch (r) {
          return ''
        }
      }).replace(/<\/?div[^>]*>/g, '').replace(/v:\w+=(["']?)[^'"]+\1/g, '').replace(/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|xml|meta|link|style|\w+:\w+)(?=[\s\/>]))[^>]*>/gi, '').replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi, '<p><strong>$1</strong></p>').replace(/\s+(class|lang|align)\s*=\s*(['"]?)([\w-]+)\2/gi, function (e, t, i, n) {
        return t == 'class' && n == 'MsoListParagraph' ? e : ''
      }).replace(/<(font|span)[^>]*>(\s*)<\/\1>/gi, function (e, t, i) {
        return i.replace(/[\t\r\n ]+/g, ' ')
      }).replace(/(<[a-z][^>]*)\sstyle=(["'])([^\2]*?)\2/gi, function (e, i, n, o) {
        for (var r, a = [], s = o.replace(/^\s+|\s+$/, '').replace(/&#39;/g, "'").replace(/&quot;/gi, "'").replace(/[\d.]+(cm|pt)/g, function (e) {
            return utils.transUnitToPx(e)
          }).split(/;\s*/g), l = 0; r = s[l]; l++) {
          var d, c, u = r.split(':')
          if (u.length == 2) {
            if (d = u[0].toLowerCase(), c = u[1].toLowerCase(), /^(background)\w*/.test(d) && c.replace(/(initial|\s)/g, '').length == 0 || /^(margin)\w*/.test(d) && /^0\w+$/.test(c)) continue
            switch (d) {
              case 'mso-padding-alt':
              case 'mso-padding-top-alt':
              case 'mso-padding-right-alt':
              case 'mso-padding-bottom-alt':
              case 'mso-padding-left-alt':
              case 'mso-margin-alt':
              case 'mso-margin-top-alt':
              case 'mso-margin-right-alt':
              case 'mso-margin-bottom-alt':
              case 'mso-margin-left-alt':
              case 'mso-height':
              case 'mso-width':
              case 'mso-vertical-align-alt':
                /<table/.test(i) || (a[l] = d.replace(/^mso-|-alt$/g, '') + ':' + t(c))
                continue
              case 'horiz-align':
                a[l] = 'text-align:' + c
                continue
              case 'vert-align':
                a[l] = 'vertical-align:' + c
                continue
              case 'font-color':
              case 'mso-foreground':
                a[l] = 'color:' + c
                continue
              case 'mso-background':
              case 'mso-highlight':
                a[l] = 'background:' + c
                continue
              case 'mso-default-height':
                a[l] = 'min-height:' + t(c)
                continue
              case 'mso-default-width':
                a[l] = 'min-width:' + t(c)
                continue
              case 'mso-padding-between-alt':
                a[l] = 'border-collapse:separate;border-spacing:' + t(c)
                continue
              case 'text-line-through':
                c != 'single' && c != 'double' || (a[l] = 'text-decoration:line-through')
                continue
              case 'mso-zero-height':
                c == 'yes' && (a[l] = 'display:none')
                continue
              case 'margin':
                if (!/[1-9]/.test(c)) continue
            }
            if (/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?:decor|trans)|top-bar|version|vnd|word-break)/.test(d) || /text\-indent|padding|margin/.test(d) && /\-[\d.]+/.test(c)) continue
            a[l] = d + ':' + u[1]
          }
        }
        return i + (a.length ? ' style="' + a.join(';').replace(/;{2,}/g, ';') + '"' : '')
      })
    }
    return function (t) {
      return e(t) ? i(t) : t
    }
  }())
  !(function () {
    function e (e, t, i) {
      return e.push(f), t + (i ? 1 : -1)
    }

    function t (e, t) {
      for (var i = 0; t > i; i++) e.push(m)
    }

    function i (a, s, l, d) {
      switch (a.type) {
        case 'root':
          for (var c, u = 0; c = a.children[u++];) l && c.type == 'element' && !dtd.$inlineWithA[c.tagName] && u > 1 && (e(s, d, !0), t(s, d)), i(c, s, l, d)
          break
        case 'text':
          n(a, s)
          break
        case 'element':
          o(a, s, l, d)
          break
        case 'comment':
          r(a, s, l)
      }
      return s
    }

    function n (e, t) {
      e.parentNode.tagName == 'pre' ? t.push(e.data) : t.push(u[e.parentNode.tagName] ? utils.html(e.data) : e.data.replace(/[ ]{2}/g, ' &nbsp;'))
    }

    function o (n, o, r, a) {
      var s = ''
      if (n.attrs) {
        s = []
        var l = n.attrs
        for (var d in l) {
          s.push(d + (void 0 !== l[d] ? '="' + (c[d] ? utils.html(l[d]).replace(/["]/g, function (e) {
            return '&quot;'
          }) : utils.unhtml(l[d])) + '"' : ''))
        }
        s = s.join(' ')
      }
      if (o.push('<' + n.tagName + (s ? ' ' + s : '') + (dtd.$empty[n.tagName] ? '/' : '') + '>'), r && !dtd.$inlineWithA[n.tagName] && n.tagName != 'pre' && n.children && n.children.length && (a = e(o, a, !0), t(o, a)), n.children && n.children.length) { for (var u, m = 0; u = n.children[m++];) r && u.type == 'element' && !dtd.$inlineWithA[u.tagName] && m > 1 && (e(o, a), t(o, a)), i(u, o, r, a) }
      dtd.$empty[n.tagName] || (r && !dtd.$inlineWithA[n.tagName] && n.tagName != 'pre' && n.children && n.children.length && (a = e(o, a), t(o, a)), o.push('</' + n.tagName + '>'))
    }

    function r (e, t) {
      t.push('<!--' + e.data + '-->')
    }

    function a (e, t) {
      var i
      if (e.type == 'element' && e.getAttr('id') == t) return e
      if (e.children && e.children.length) {
        for (var n, o = 0; n = e.children[o++];) { if (i = a(n, t)) return i }
      }
    }

    function s (e, t, i) {
      if (e.type == 'element' && e.tagName == t && i.push(e), e.children && e.children.length) { for (var n, o = 0; n = e.children[o++];) s(n, t, i) }
    }

    function l (e, t) {
      if (e.children && e.children.length) { for (var i, n = 0; i = e.children[n];) l(i, t), i.parentNode && (i.children && i.children.length && t(i), i.parentNode && n++) } else t(e)
    }
    var d = UE.uNode = function (e) {
        this.type = e.type, this.data = e.data, this.tagName = e.tagName, this.parentNode = e.parentNode, this.attrs = e.attrs || {}, this.children = e.children
      },
      c = {
        href: 1,
        src: 1,
        _src: 1,
        _href: 1,
        cdata_data: 1
      },
      u = {
        style: 1,
        script: 1
      },
      m = '    ',
      f = '\n'
    d.createElement = function (e) {
      return /[<>]/.test(e) ? UE.htmlparser(e).children[0] : new d({
        type: 'element',
        children: [],
        tagName: e
      })
    }, d.createText = function (e, t) {
      return new UE.uNode({
        type: 'text',
        data: t ? e : utils.unhtml(e || '')
      })
    }, d.prototype = {
      toHtml: function (e) {
        var t = []
        return i(this, t, e, 0), t.join('')
      },
      innerHTML: function (e) {
        if (this.type != 'element' || dtd.$empty[this.tagName]) return this
        if (utils.isString(e)) {
          if (this.children) { for (var t, i = 0; t = this.children[i++];) t.parentNode = null }
          this.children = []
          for (var t, n = UE.htmlparser(e), i = 0; t = n.children[i++];) this.children.push(t), t.parentNode = this
          return this
        }
        var n = new UE.uNode({
          type: 'root',
          children: this.children
        })
        return n.toHtml()
      },
      innerText: function (e, t) {
        if (this.type != 'element' || dtd.$empty[this.tagName]) return this
        if (e) {
          if (this.children) { for (var i, n = 0; i = this.children[n++];) i.parentNode = null }
          return this.children = [], this.appendChild(d.createText(e, t)), this
        }
        return this.toHtml().replace(/<[^>]+>/g, '')
      },
      getData: function () {
        return this.type == 'element' ? '' : this.data
      },
      firstChild: function () {
        return this.children ? this.children[0] : null
      },
      lastChild: function () {
        return this.children ? this.children[this.children.length - 1] : null
      },
      previousSibling: function () {
        for (var e, t = this.parentNode, i = 0; e = t.children[i]; i++) { if (e === this) return i == 0 ? null : t.children[i - 1] }
      },
      nextSibling: function () {
        for (var e, t = this.parentNode, i = 0; e = t.children[i++];) { if (e === this) return t.children[i] }
      },
      replaceChild: function (e, t) {
        if (this.children) {
          e.parentNode && e.parentNode.removeChild(e)
          for (var i, n = 0; i = this.children[n]; n++) { if (i === t) return this.children.splice(n, 1, e), t.parentNode = null, e.parentNode = this, e }
        }
      },
      appendChild: function (e) {
        if (this.type == 'root' || this.type == 'element' && !dtd.$empty[this.tagName]) {
          this.children || (this.children = []), e.parentNode && e.parentNode.removeChild(e)
          for (var t, i = 0; t = this.children[i]; i++) {
            if (t === e) {
              this.children.splice(i, 1)
              break
            }
          }
          return this.children.push(e), e.parentNode = this, e
        }
      },
      insertBefore: function (e, t) {
        if (this.children) {
          e.parentNode && e.parentNode.removeChild(e)
          for (var i, n = 0; i = this.children[n]; n++) { if (i === t) return this.children.splice(n, 0, e), e.parentNode = this, e }
        }
      },
      insertAfter: function (e, t) {
        if (this.children) {
          e.parentNode && e.parentNode.removeChild(e)
          for (var i, n = 0; i = this.children[n]; n++) { if (i === t) return this.children.splice(n + 1, 0, e), e.parentNode = this, e }
        }
      },
      removeChild: function (e, t) {
        if (this.children) {
          for (var i, n = 0; i = this.children[n]; n++) {
            if (i === e) {
              if (this.children.splice(n, 1), i.parentNode = null, t && i.children && i.children.length) { for (var o, r = 0; o = i.children[r]; r++) this.children.splice(n + r, 0, o), o.parentNode = this }
              return i
            }
          }
        }
      },
      getAttr: function (e) {
        return this.attrs && this.attrs[e.toLowerCase()]
      },
      setAttr: function (e, t) {
        if (!e) return void delete this.attrs
        if (this.attrs || (this.attrs = {}), utils.isObject(e)) { for (var i in e) e[i] ? this.attrs[i.toLowerCase()] = e[i] : delete this.attrs[i] } else t ? this.attrs[e.toLowerCase()] = t : delete this.attrs[e]
      },
      getIndex: function () {
        for (var e, t = this.parentNode, i = 0; e = t.children[i]; i++) { if (e === this) return i }
        return -1
      },
      getNodeById: function (e) {
        var t
        if (this.children && this.children.length) {
          for (var i, n = 0; i = this.children[n++];) { if (t = a(i, e)) return t }
        }
      },
      getNodesByTagName: function (e) {
        e = utils.trim(e).replace(/[ ]{2,}/g, ' ').split(' ')
        var t = [],
          i = this
        return utils.each(e, function (e) {
          if (i.children && i.children.length) { for (var n, o = 0; n = i.children[o++];) s(n, e, t) }
        }), t
      },
      getStyle: function (e) {
        var t = this.getAttr('style')
        if (!t) return ''
        var i = new RegExp('(^|;)\\s*' + e + ':([^;]+)', 'i'),
          n = t.match(i)
        return n && n[0] ? n[2] : ''
      },
      setStyle: function (e, t) {
        function i (e, t) {
          var i = new RegExp('(^|;)\\s*' + e + ':([^;]+;?)', 'gi')
          n = n.replace(i, '$1'), t && (n = e + ':' + utils.unhtml(t) + ';' + n)
        }
        var n = this.getAttr('style')
        if (n || (n = ''), utils.isObject(e)) { for (var o in e) i(o, e[o]) } else i(e, t)
        this.setAttr('style', utils.trim(n))
      },
      traversal: function (e) {
        return this.children && this.children.length && l(this, e), this
      }
    }
  }())
  var htmlparser = UE.htmlparser = function (e, t) {
      function i (e, t) {
        if (m[e.tagName]) {
          var i = c.createElement(m[e.tagName])
          e.appendChild(i), i.appendChild(c.createText(t)), e = i
        } else e.appendChild(c.createText(t))
      }

      function n (e, t, i) {
        var o
        if (o = u[t]) {
          for (var r, s = e;
            s.type != 'root';) {
            if (utils.isArray(o) ? utils.indexOf(o, s.tagName) != -1 : o == s.tagName) {
              e = s, r = !0
              break
            }
            s = s.parentNode
          }
          r || (e = n(e, utils.isArray(o) ? o[0] : o))
        }
        var l = new c({
          parentNode: e,
          type: 'element',
          tagName: t.toLowerCase(),
          children: dtd.$empty[t] ? null : []
        })
        if (i) {
          for (var m, f = {}; m = a.exec(i);) f[m[1].toLowerCase()] = d[m[1].toLowerCase()] ? m[2] || m[3] || m[4] : utils.unhtml(m[2] || m[3] || m[4])
          l.attrs = f
        }
        return e.children.push(l), dtd.$empty[t] ? e : l
      }

      function o (e, t) {
        e.children.push(new c({
          type: 'comment',
          data: t,
          parentNode: e
        }))
      }
      var r = /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/<>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g,
        a = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,
        s = {
          b: 1,
          code: 1,
          i: 1,
          u: 1,
          strike: 1,
          s: 1,
          tt: 1,
          strong: 1,
          q: 1,
          samp: 1,
          em: 1,
          span: 1,
          sub: 1,
          img: 1,
          sup: 1,
          font: 1,
          big: 1,
          small: 1,
          iframe: 1,
          a: 1,
          br: 1,
          pre: 1
        }
      e = e.replace(new RegExp(domUtils.fillChar, 'g'), ''), t || (e = e.replace(new RegExp('[\\r\\t\\n' + (t ? '' : ' ') + ']*</?(\\w+)\\s*(?:[^>]*)>[\\r\\t\\n' + (t ? '' : ' ') + ']*', 'g'), function (e, i) {
        return i && s[i.toLowerCase()] ? e.replace(/(^[\n\r]+)|([\n\r]+$)/g, '') : e.replace(new RegExp('^[\\r\\n' + (t ? '' : ' ') + ']+'), '').replace(new RegExp('[\\r\\n' + (t ? '' : ' ') + ']+$'), '')
      }))
      for (var l, d = {
          href: 1,
          src: 1
        }, c = UE.uNode, u = {
          td: 'tr',
          tr: ['tbody', 'thead', 'tfoot'],
          tbody: 'table',
          th: 'tr',
          thead: 'table',
          tfoot: 'table',
          caption: 'table',
          li: ['ul', 'ol'],
          dt: 'dl',
          dd: 'dl',
          option: 'select'
        }, m = {
          ol: 'li',
          ul: 'li'
        }, f = 0, h = 0, p = new c({
          type: 'root',
          children: []
        }), g = p; l = r.exec(e);) {
        f = l.index
        try {
          if (f > h && i(g, e.slice(h, f)), l[3]) dtd.$cdata[g.tagName] ? i(g, l[0]) : g = n(g, l[3].toLowerCase(), l[4])
          else if (l[1]) {
            if (g.type != 'root') {
              if (dtd.$cdata[g.tagName] && !dtd.$cdata[l[1]]) i(g, l[0])
              else {
                for (var v = g;
                  g.type == 'element' && g.tagName != l[1].toLowerCase();) { if (g = g.parentNode, g.type == 'root') throw g = v, 'break' }
                g = g.parentNode
              }
            }
          } else l[2] && o(g, l[2])
        } catch (b) {}
        h = r.lastIndex
      }
      return h < e.length && i(g, e.slice(h)), p
    },
    filterNode = UE.filterNode = (function () {
      function e (t, i) {
        switch (t.type) {
          case 'text':
            break
          case 'element':
            var n
            if (n = i[t.tagName]) {
              if (n === '-') t.parentNode.removeChild(t)
              else if (utils.isFunction(n)) {
                var o = t.parentNode,
                  r = t.getIndex()
                if (n(t), t.parentNode) {
                  if (t.children) { for (var a, s = 0; a = t.children[s];) e(a, i), a.parentNode && s++ }
                } else { for (var a, s = r; a = o.children[s];) e(a, i), a.parentNode && s++ }
              } else {
                var l = n.$
                if (l && t.attrs) {
                  var d, c = {}
                  for (var u in l) {
                    if (d = t.getAttr(u), u == 'style' && utils.isArray(l[u])) {
                      var m = []
                      utils.each(l[u], function (e) {
                        var i;
                        (i = t.getStyle(e)) && m.push(e + ':' + i)
                      }), d = m.join(';')
                    }
                    d && (c[u] = d)
                  }
                  t.attrs = c
                }
                if (t.children) { for (var a, s = 0; a = t.children[s];) e(a, i), a.parentNode && s++ }
              }
            } else if (dtd.$cdata[t.tagName]) t.parentNode.removeChild(t)
            else {
              var o = t.parentNode,
                r = t.getIndex()
              t.parentNode.removeChild(t, !0)
              for (var a, s = r; a = o.children[s];) e(a, i), a.parentNode && s++
            }
            break
          case 'comment':
            t.parentNode.removeChild(t)
        }
      }
      return function (t, i) {
        if (utils.isEmptyObject(i)) return t
        var n;
        (n = i['-']) && utils.each(n.split(' '), function (e) {
          i[e] = '-'
        })
        for (var o, r = 0; o = t.children[r];) e(o, i), o.parentNode && r++
        return t
      }
    }())
  UE.plugin = (function () {
    var e = {}
    return {
      register: function (t, i, n, o) {
        n && utils.isFunction(n) && (o = n, n = null), e[t] = {
          optionName: n || t,
          execFn: i,
          afterDisabled: o
        }
      },
      load: function (t) {
        utils.each(e, function (e) {
          var i = e.execFn.call(t)
          t.options[e.optionName] !== !1 ? i && utils.each(i, function (e, i) {
            switch (i.toLowerCase()) {
              case 'shortcutkey':
                t.addshortcutkey(e)
                break
              case 'bindevents':
                utils.each(e, function (e, i) {
                  t.addListener(i, e)
                })
                break
              case 'bindmultievents':
                utils.each(utils.isArray(e) ? e : [e], function (e) {
                  var i = utils.trim(e.type).split(/\s+/)
                  utils.each(i, function (i) {
                    t.addListener(i, e.handler)
                  })
                })
                break
              case 'commands':
                utils.each(e, function (e, i) {
                  t.commands[i] = e
                })
                break
              case 'outputrule':
                t.addOutputRule(e)
                break
              case 'inputrule':
                t.addInputRule(e)
                break
              case 'defaultoptions':
                t.setOpt(e)
            }
          }) : e.afterDisabled && e.afterDisabled.call(t)
        }), utils.each(UE.plugins, function (e) {
          e.call(t)
        })
      },
      run: function (t, i) {
        var n = e[t]
        n && n.exeFn.call(i)
      }
    }
  }())
  var keymap = UE.keymap = {
      Backspace: 8,
      Tab: 9,
      Enter: 13,
      Shift: 16,
      Control: 17,
      Alt: 18,
      CapsLock: 20,
      Esc: 27,
      Spacebar: 32,
      PageUp: 33,
      PageDown: 34,
      End: 35,
      Home: 36,
      Left: 37,
      Up: 38,
      Right: 39,
      Down: 40,
      Insert: 45,
      Del: 46,
      NumLock: 144,
      Cmd: 91,
      '=': 187,
      '-': 189,
      b: 66,
      i: 73,
      z: 90,
      y: 89,
      v: 86,
      x: 88,
      s: 83,
      n: 78
    },
    LocalStorage = UE.LocalStorage = (function () {
      function e () {
        var e = document.createElement('div')
        return e.style.display = 'none', e.addBehavior ? (e.addBehavior('#default#userdata'), {
          getItem: function (t) {
            var n = null
            try {
              document.body.appendChild(e), e.load(i), n = e.getAttribute(t), document.body.removeChild(e)
            } catch (o) {}
            return n
          },
          setItem: function (t, n) {
            document.body.appendChild(e), e.setAttribute(t, n), e.save(i), document.body.removeChild(e)
          },
          removeItem: function (t) {
            document.body.appendChild(e), e.removeAttribute(t), e.save(i), document.body.removeChild(e)
          }
        }) : null
      }
      var t = window.localStorage || e() || null,
        i = 'localStorage'
      return {
        saveLocalData: function (e, i) {
          return t && i ? (t.setItem(e, i), !0) : !1
        },
        getLocalData: function (e) {
          return t ? t.getItem(e) : null
        },
        removeItem: function (e) {
          t && t.removeItem(e)
        }
      }
    }())
  !(function () {
    var e = 'ueditor_preference'
    UE.Editor.prototype.setPreferences = function (t, i) {
      var n = {}
      utils.isString(t) ? n[t] = i : n = t
      var o = LocalStorage.getLocalData(e)
      o && (o = utils.str2json(o)) ? utils.extend(o, n) : o = n, o && LocalStorage.saveLocalData(e, utils.json2str(o))
    }, UE.Editor.prototype.getPreferences = function (t) {
      var i = LocalStorage.getLocalData(e)
      return i && (i = utils.str2json(i)) ? t ? i[t] : i : null
    }, UE.Editor.prototype.removePreferences = function (t) {
      var i = LocalStorage.getLocalData(e)
      i && (i = utils.str2json(i)) && (i[t] = void 0, delete i[t]), i && LocalStorage.saveLocalData(e, utils.json2str(i))
    }
  }()), UE.plugins.defaultfilter = function () {
    var e = this
    e.setOpt({
      allowDivTransToP: !0,
      disabledTableInTable: !0
    }), e.addInputRule(function (t) {
      function i (e) {
        for (; e && e.type == 'element';) {
          if (e.tagName == 'td') return !0
          e = e.parentNode
        }
        return !1
      }
      var n, o = this.options.allowDivTransToP
      t.traversal(function (t) {
        if (t.type == 'element') {
          if (!dtd.$cdata[t.tagName] && e.options.autoClearEmptyNode && dtd.$inline[t.tagName] && !dtd.$empty[t.tagName] && (!t.attrs || utils.isEmptyObject(t.attrs))) return void (t.firstChild() ? t.tagName != 'span' || t.attrs && !utils.isEmptyObject(t.attrs) || t.parentNode.removeChild(t, !0) : t.parentNode.removeChild(t))
          switch (t.tagName) {
            case 'style':
            case 'script':
              t.setAttr({
                cdata_tag: t.tagName,
                cdata_data: t.innerHTML() || '',
                _ue_custom_node_: 'true'
              }), t.tagName = 'div', t.innerHTML('')
              break
            case 'a':
              (n = t.getAttr('href')) && t.setAttr('_href', n)
              break
            case 'img':
              if ((n = t.getAttr('src')) && /^data:/.test(n)) {
                t.parentNode.removeChild(t)
                break
              }
              t.setAttr('_src', t.getAttr('src'))
              break
            case 'span':
              browser.webkit && (n = t.getStyle('white-space')) && /nowrap|normal/.test(n) && (t.setStyle('white-space', ''), e.options.autoClearEmptyNode && utils.isEmptyObject(t.attrs) && t.parentNode.removeChild(t, !0)), n = t.getAttr('id'), n && /^_baidu_bookmark_/i.test(n) && t.parentNode.removeChild(t)
              break
            case 'p':
              (n = t.getAttr('align')) && (t.setAttr('align'), t.setStyle('text-align', n)), utils.each(t.children, function (e) {
                if (e.type == 'element' && e.tagName == 'p') {
                  var i = e.nextSibling()
                  t.parentNode.insertAfter(e, t)
                  for (var n = e; i;) {
                    var o = i.nextSibling()
                    t.parentNode.insertAfter(i, n), n = i, i = o
                  }
                  return !1
                }
              }), t.firstChild() || t.innerHTML(browser.ie ? '&nbsp;' : '<br/>')
              break
            case 'div':
              if (t.getAttr('cdata_tag')) break
              if (n = t.getAttr('class'), n && /^line number\d+/.test(n)) break
              if (!o) break
              for (var r, a = UE.uNode.createElement('p'); r = t.firstChild();) r.type != 'text' && UE.dom.dtd.$block[r.tagName] ? a.firstChild() ? (t.parentNode.insertBefore(a, t), a = UE.uNode.createElement('p')) : t.parentNode.insertBefore(r, t) : a.appendChild(r)
              a.firstChild() && t.parentNode.insertBefore(a, t), t.parentNode.removeChild(t)
              break
            case 'dl':
              t.tagName = 'ul'
              break
            case 'dt':
            case 'dd':
              t.tagName = 'li'
              break
            case 'li':
              var s = t.getAttr('class')
              s && /list\-/.test(s) || t.setAttr()
              var l = t.getNodesByTagName('ol ul')
              UE.utils.each(l, function (e) {
                t.parentNode.insertAfter(e, t)
              })
              break
            case 'td':
            case 'th':
            case 'caption':
              t.children && t.children.length || t.appendChild(browser.ie11below ? UE.uNode.createText(' ') : UE.uNode.createElement('br'))
              break
            case 'table':
              e.options.disabledTableInTable && i(t) && (t.parentNode.insertBefore(UE.uNode.createText(t.innerText()), t), t.parentNode.removeChild(t))
          }
        }
      })
    }), e.addOutputRule(function (t) {
      var i
      t.traversal(function (t) {
        if (t.type == 'element') {
          if (e.options.autoClearEmptyNode && dtd.$inline[t.tagName] && !dtd.$empty[t.tagName] && (!t.attrs || utils.isEmptyObject(t.attrs))) return void (t.firstChild() ? t.tagName != 'span' || t.attrs && !utils.isEmptyObject(t.attrs) || t.parentNode.removeChild(t, !0) : t.parentNode.removeChild(t))
          switch (t.tagName) {
            case 'div':
              (i = t.getAttr('cdata_tag')) && (t.tagName = i, t.appendChild(UE.uNode.createText(t.getAttr('cdata_data'))), t.setAttr({
                cdata_tag: '',
                cdata_data: '',
                _ue_custom_node_: ''
              }))
              break
            case 'a':
              (i = t.getAttr('_href')) && t.setAttr({
                href: utils.html(i),
                _href: ''
              })
              break
            case 'span':
              i = t.getAttr('id'), i && /^_baidu_bookmark_/i.test(i) && t.parentNode.removeChild(t)
              break
            case 'img':
              (i = t.getAttr('_src')) && t.setAttr({
                src: t.getAttr('_src'),
                _src: ''
              })
          }
        }
      })
    })
  }, UE.commands.inserthtml = {
    execCommand: function (e, t, i) {
      var n, o, r = this
      if (t && r.fireEvent('beforeinserthtml', t) !== !0) {
        if (n = r.selection.getRange(), o = n.document.createElement('div'), o.style.display = 'inline', !i) {
          var a = UE.htmlparser(t)
          r.options.filterRules && UE.filterNode(a, r.options.filterRules), r.filterInputRule(a), t = a.toHtml()
        }
        if (o.innerHTML = utils.trim(t), !n.collapsed) {
          var s = n.startContainer
          if (domUtils.isFillChar(s) && n.setStartBefore(s), s = n.endContainer, domUtils.isFillChar(s) && n.setEndAfter(s), n.txtToElmBoundary(), n.endContainer && n.endContainer.nodeType == 1 && (s = n.endContainer.childNodes[n.endOffset], s && domUtils.isBr(s) && n.setEndAfter(s)), n.startOffset == 0 && (s = n.startContainer, domUtils.isBoundaryNode(s, 'firstChild') && (s = n.endContainer, n.endOffset == (s.nodeType == 3 ? s.nodeValue.length : s.childNodes.length) && domUtils.isBoundaryNode(s, 'lastChild') && (r.body.innerHTML = '<p>' + (browser.ie ? '' : '<br/>') + '</p>', n.setStart(r.body.firstChild, 0).collapse(!0)))), !n.collapsed && n.deleteContents(), n.startContainer.nodeType == 1) {
            var l, d = n.startContainer.childNodes[n.startOffset]
            if (d && domUtils.isBlockElm(d) && (l = d.previousSibling) && domUtils.isBlockElm(l)) {
              for (n.setEnd(l, l.childNodes.length).collapse(); d.firstChild;) l.appendChild(d.firstChild)
              domUtils.remove(d)
            }
          }
        }
        var d, c, l, u, m, f = 0
        n.inFillChar() && (d = n.startContainer, domUtils.isFillChar(d) ? (n.setStartBefore(d).collapse(!0), domUtils.remove(d)) : domUtils.isFillChar(d, !0) && (d.nodeValue = d.nodeValue.replace(fillCharReg, ''), n.startOffset--, n.collapsed && n.collapse(!0)))
        var h = domUtils.findParentByTagName(n.startContainer, 'li', !0)
        if (h) {
          for (var p, g; d = o.firstChild;) {
            for (; d && (d.nodeType == 3 || !domUtils.isBlockElm(d) || d.tagName == 'HR');) p = d.nextSibling, n.insertNode(d).collapse(), g = d, d = p
            if (d) {
              if (/^(ol|ul)$/i.test(d.tagName)) {
                for (; d.firstChild;) g = d.firstChild, domUtils.insertAfter(h, d.firstChild), h = h.nextSibling
                domUtils.remove(d)
              } else {
                var v
                p = d.nextSibling, v = r.document.createElement('li'), domUtils.insertAfter(h, v), v.appendChild(d), g = d, d = p, h = v
              }
            }
          }
          h = domUtils.findParentByTagName(n.startContainer, 'li', !0), domUtils.isEmptyBlock(h) && domUtils.remove(h), g && n.setStartAfter(g).collapse(!0).select(!0)
        } else {
          for (; d = o.firstChild;) {
            if (f) {
              for (var b = r.document.createElement('p'); d && (d.nodeType == 3 || !dtd.$block[d.tagName]);) m = d.nextSibling, b.appendChild(d), d = m
              b.firstChild && (d = b)
            }
            if (n.insertNode(d), m = d.nextSibling, !f && d.nodeType == domUtils.NODE_ELEMENT && domUtils.isBlockElm(d) && (c = domUtils.findParent(d, function (e) {
              return domUtils.isBlockElm(e)
            }), c && c.tagName.toLowerCase() != 'body' && (!dtd[c.tagName][d.nodeName] || d.parentNode !== c))) {
              if (dtd[c.tagName][d.nodeName]) { for (u = d.parentNode; u !== c;) l = u, u = u.parentNode } else l = c
              domUtils.breakParent(d, l || u)
              var l = d.previousSibling
              domUtils.trimWhiteTextNode(l), l.childNodes.length || domUtils.remove(l), !browser.ie && (p = d.nextSibling) && domUtils.isBlockElm(p) && p.lastChild && !domUtils.isBr(p.lastChild) && p.appendChild(r.document.createElement('br')), f = 1
            }
            var p = d.nextSibling
            if (!o.firstChild && p && domUtils.isBlockElm(p)) {
              n.setStart(p, 0).collapse(!0)
              break
            }
            n.setEndAfter(d).collapse()
          }
          if (d = n.startContainer, m && domUtils.isBr(m) && domUtils.remove(m), domUtils.isBlockElm(d) && domUtils.isEmptyNode(d)) {
            if (m = d.nextSibling) domUtils.remove(d), m.nodeType == 1 && dtd.$block[m.tagName] && n.setStart(m, 0).collapse(!0).shrinkBoundary()
            else {
              try {
                d.innerHTML = browser.ie ? domUtils.fillChar : '<br/>'
              } catch (y) {
                n.setStartBefore(d), domUtils.remove(d)
              }
            }
          }
          try {
            n.select(!0)
          } catch (y) {}
        }
        setTimeout(function () {
          n = r.selection.getRange(), n.scrollToView(r.autoHeightEnabled, r.autoHeightEnabled ? domUtils.getXY(r.iframe).y : 0), r.fireEvent('afterinserthtml', t)
        }, 200)
      }
    }
  }, UE.plugins.autotypeset = function () {
    function e (e, t) {
      return e && e.nodeType != 3 ? domUtils.isBr(e) ? 1 : e && e.parentNode && u[e.tagName.toLowerCase()] ? a && a.contains(e) || e.getAttribute('pagebreak') ? 0 : t ? !domUtils.isEmptyBlock(e) : domUtils.isEmptyBlock(e, new RegExp('[\\s' + domUtils.fillChar + ']', 'g')) : void 0 : 0
    }

    function t (e) {
      e.style.cssText || (domUtils.removeAttributes(e, ['style']), e.tagName.toLowerCase() == 'span' && domUtils.hasNoAttributes(e) && domUtils.remove(e, !0))
    }

    function i (i, r) {
      var s, u = this
      if (r) {
        if (!l.pasteFilter) return
        s = u.document.createElement('div'), s.innerHTML = r.html
      } else s = u.document.body
      for (var m, f = domUtils.getElementsByTagName(s, '*'), h = 0; m = f[h++];) {
        if (u.fireEvent('excludeNodeinautotype', m) !== !0) {
          if (l.clearFontSize && m.style.fontSize && (domUtils.removeStyle(m, 'font-size'), t(m)), l.clearFontFamily && m.style.fontFamily && (domUtils.removeStyle(m, 'font-family'), t(m)), e(m)) {
            if (l.mergeEmptyline) { for (var p, g = m.nextSibling, v = domUtils.isBr(m); e(g) && (p = g, g = p.nextSibling, !v || g && (!g || domUtils.isBr(g)));) domUtils.remove(p) }
            if (l.removeEmptyline && domUtils.inDoc(m, s) && !c[m.parentNode.tagName.toLowerCase()]) {
              if (domUtils.isBr(m) && (g = m.nextSibling, g && !domUtils.isBr(g))) continue
              domUtils.remove(m)
              continue
            }
          }
          if (e(m, !0) && m.tagName != 'SPAN' && (l.indent && (m.style.textIndent = l.indentValue), l.textAlign && (m.style.textAlign = l.textAlign)), l.removeClass && m.className && !d[m.className.toLowerCase()]) {
            if (a && a.contains(m)) continue
            domUtils.removeAttributes(m, ['class'])
          }
          if (l.imageBlockLine && m.tagName.toLowerCase() == 'img' && !m.getAttribute('emotion')) {
            if (r) {
              var b = m
              switch (l.imageBlockLine) {
                case 'left':
                case 'right':
                case 'none':
                  for (var p, y, g, C = b.parentNode; dtd.$inline[C.tagName] || C.tagName == 'A';) C = C.parentNode
                  if (p = C, p.tagName == 'P' && domUtils.getStyle(p, 'text-align') == 'center' && !domUtils.isBody(p) && domUtils.getChildCount(p, function (e) {
                    return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
                  }) == 1) { if (y = p.previousSibling, g = p.nextSibling, y && g && y.nodeType == 1 && g.nodeType == 1 && y.tagName == g.tagName && domUtils.isBlockElm(y)) {
                    for (y.appendChild(p.firstChild); g.firstChild;) y.appendChild(g.firstChild)
                    domUtils.remove(p), domUtils.remove(g)
                  } else domUtils.setStyle(p, 'text-align', '') }
                  domUtils.setStyle(b, 'float', l.imageBlockLine)
                  break
                case 'center':
                  if (u.queryCommandValue('imagefloat') != 'center') {
                    for (C = b.parentNode, domUtils.setStyle(b, 'float', 'none'), p = b; C && domUtils.getChildCount(C, function (e) {
                      return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
                    }) == 1 && (dtd.$inline[C.tagName] || C.tagName == 'A');) p = C, C = C.parentNode
                    var N = u.document.createElement('p')
                    domUtils.setAttributes(N, {
                      style: 'text-align:center'
                    }), p.parentNode.insertBefore(N, p), N.appendChild(p), domUtils.setStyle(p, 'float', '')
                  }
              }
            } else {
              var x = u.selection.getRange()
              x.selectNode(m).select(), u.execCommand('imagefloat', l.imageBlockLine)
            }
          }
          l.removeEmptyNode && l.removeTagNames[m.tagName.toLowerCase()] && domUtils.hasNoAttributes(m) && domUtils.isEmptyBlock(m) && domUtils.remove(m)
        }
      }
      if (l.tobdc) {
        var w = UE.htmlparser(s.innerHTML)
        w.traversal(function (e) {
          e.type == 'text' && (e.data = o(e.data))
        }), s.innerHTML = w.toHtml()
      }
      if (l.bdc2sb) {
        var w = UE.htmlparser(s.innerHTML)
        w.traversal(function (e) {
          e.type == 'text' && (e.data = n(e.data))
        }), s.innerHTML = w.toHtml()
      }
      r && (r.html = s.innerHTML)
    }

    function n (e) {
      for (var t = '', i = 0; i < e.length; i++) {
        var n = e.charCodeAt(i)
        t += n >= 65281 && n <= 65373 ? String.fromCharCode(e.charCodeAt(i) - 65248) : n == 12288 ? String.fromCharCode(e.charCodeAt(i) - 12288 + 32) : e.charAt(i)
      }
      return t
    }

    function o (e) {
      e = utils.html(e)
      for (var t = '', i = 0; i < e.length; i++) t += e.charCodeAt(i) == 32 ? String.fromCharCode(12288) : e.charCodeAt(i) < 127 ? String.fromCharCode(e.charCodeAt(i) + 65248) : e.charAt(i)
      return t
    }

    function r () {
      var e = s.getPreferences('autotypeset')
      utils.extend(s.options.autotypeset, e)
    }
    this.setOpt({
      autotypeset: {
        mergeEmptyline: !0,
        removeClass: !0,
        removeEmptyline: !1,
        textAlign: 'left',
        imageBlockLine: 'center',
        pasteFilter: !1,
        clearFontSize: !1,
        clearFontFamily: !1,
        removeEmptyNode: !1,
        removeTagNames: utils.extend({
          div: 1
        }, dtd.$removeEmpty),
        indent: !1,
        indentValue: '2em',
        bdc2sb: !1,
        tobdc: !1
      }
    })
    var a, s = this,
      l = s.options.autotypeset,
      d = {
        selectTdClass: 1,
        pagebreak: 1,
        anchorclass: 1
      },
      c = {
        li: 1
      },
      u = {
        div: 1,
        p: 1,
        blockquote: 1,
        center: 1,
        h1: 1,
        h2: 1,
        h3: 1,
        h4: 1,
        h5: 1,
        h6: 1,
        span: 1
      }
    l && (r(), l.pasteFilter && s.addListener('beforepaste', i), s.commands.autotypeset = {
      execCommand: function () {
        s.removeListener('beforepaste', i), l.pasteFilter && s.addListener('beforepaste', i), i.call(s)
      }
    })
  }, UE.plugin.register('autosubmit', function () {
    return {
      shortcutkey: {
        autosubmit: 'ctrl+13'
      },
      commands: {
        autosubmit: {
          execCommand: function () {
            var e = this,
              t = domUtils.findParentByTagName(e.iframe, 'form', !1)
            if (t) {
              if (e.fireEvent('beforesubmit') === !1) return
              e.sync(), t.submit()
            }
          }
        }
      }
    }
  }), UE.plugin.register('background', function () {
    function e (e) {
      var t = {},
        i = e.split(';')
      return utils.each(i, function (e) {
        var i = e.indexOf(':'),
          n = utils.trim(e.substr(0, i)).toLowerCase()
        n && (t[n] = utils.trim(e.substr(i + 1) || ''))
      }), t
    }

    function t (e) {
      if (e) {
        var t = []
        for (var i in e) e.hasOwnProperty(i) && t.push(i + ':' + e[i] + '; ')
        utils.cssRule(o, t.length ? 'body{' + t.join('') + '}' : '', n.document)
      } else utils.cssRule(o, '', n.document)
    }
    var i, n = this,
      o = 'editor_background',
      r = new RegExp('body[\\s]*\\{(.+)\\}', 'i'),
      a = n.hasContents
    return n.hasContents = function () {
      return n.queryCommandValue('background') ? !0 : a.apply(n, arguments)
    }, {
      bindEvents: {
        getAllHtml: function (e, t) {
          var i = this.body,
            o = domUtils.getComputedStyle(i, 'background-image'),
            r = ''
          r = o.indexOf(n.options.imagePath) > 0 ? o.substring(o.indexOf(n.options.imagePath), o.length - 1).replace(/"|\(|\)/gi, '') : o != 'none' ? o.replace(/url\("?|"?\)/gi, '') : ''
          var a = '<style type="text/css">body{',
            s = {
              'background-color': domUtils.getComputedStyle(i, 'background-color') || '#ffffff',
              'background-image': r ? 'url(' + r + ')' : '',
              'background-repeat': domUtils.getComputedStyle(i, 'background-repeat') || '',
              'background-position': browser.ie ? domUtils.getComputedStyle(i, 'background-position-x') + ' ' + domUtils.getComputedStyle(i, 'background-position-y') : domUtils.getComputedStyle(i, 'background-position'),
              height: domUtils.getComputedStyle(i, 'height')
            }
          for (var l in s) s.hasOwnProperty(l) && (a += l + ':' + s[l] + '; ')
          a += '}</style> ', t.push(a)
        },
        aftersetcontent: function () {
          i == 0 && t()
        }
      },
      inputRule: function (n) {
        i = !1, utils.each(n.getNodesByTagName('p'), function (n) {
          var o = n.getAttr('data-background')
          o && (i = !0, t(e(o)), n.parentNode.removeChild(n))
        })
      },
      outputRule: function (e) {
        var t = this,
          i = (utils.cssRule(o, t.document) || '').replace(/[\n\r]+/g, '').match(r)
        i && e.appendChild(UE.uNode.createElement('<p style="display:none;" data-background="' + utils.trim(i[1].replace(/"/g, '').replace(/[\s]+/g, ' ')) + '"><br/></p>'))
      },
      commands: {
        background: {
          execCommand: function (e, i) {
            t(i)
          },
          queryCommandValue: function () {
            var t = this,
              i = (utils.cssRule(o, t.document) || '').replace(/[\n\r]+/g, '').match(r)
            return i ? e(i[1]) : null
          },
          notNeedUndo: !0
        }
      }
    }
  }), UE.commands.imagefloat = {
    execCommand: function (e, t) {
      var i = this,
        n = i.selection.getRange()
      if (!n.collapsed) {
        var o = n.getClosedNode()
        if (o && o.tagName == 'IMG') {
          switch (t) {
            case 'left':
            case 'right':
            case 'none':
              for (var r, a, s, l = o.parentNode; dtd.$inline[l.tagName] || l.tagName == 'A';) l = l.parentNode
              if (r = l, r.tagName == 'P' && domUtils.getStyle(r, 'text-align') == 'center') {
                if (!domUtils.isBody(r) && domUtils.getChildCount(r, function (e) {
                  return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
                }) == 1) {
                  if (a = r.previousSibling, s = r.nextSibling, a && s && a.nodeType == 1 && s.nodeType == 1 && a.tagName == s.tagName && domUtils.isBlockElm(a)) {
                    for (a.appendChild(r.firstChild); s.firstChild;) a.appendChild(s.firstChild)
                    domUtils.remove(r), domUtils.remove(s)
                  } else domUtils.setStyle(r, 'text-align', '')
                }
                n.selectNode(o).select()
              }
              domUtils.setStyle(o, 'float', t == 'none' ? '' : t), t == 'none' && domUtils.removeAttributes(o, 'align')
              break
            case 'center':
              if (i.queryCommandValue('imagefloat') != 'center') {
                for (l = o.parentNode, domUtils.setStyle(o, 'float', ''), domUtils.removeAttributes(o, 'align'), r = o; l && domUtils.getChildCount(l, function (e) {
                  return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
                }) == 1 && (dtd.$inline[l.tagName] || l.tagName == 'A');) r = l, l = l.parentNode
                n.setStartBefore(r).setCursor(!1), l = i.document.createElement('div'), l.appendChild(r), domUtils.setStyle(r, 'float', ''), i.execCommand('insertHtml', '<p id="_img_parent_tmp" style="text-align:center">' + l.innerHTML + '</p>'), r = i.document.getElementById('_img_parent_tmp'), r.removeAttribute('id'), r = r.firstChild, n.selectNode(r).select(), s = r.parentNode.nextSibling, s && domUtils.isEmptyNode(s) && domUtils.remove(s)
              }
          }
        }
      }
    },
    queryCommandValue: function () {
      var e, t, i = this.selection.getRange()
      return i.collapsed ? 'none' : (e = i.getClosedNode(), e && e.nodeType == 1 && e.tagName == 'IMG' ? (t = domUtils.getComputedStyle(e, 'float') || e.getAttribute('align'), t == 'none' && (t = domUtils.getComputedStyle(e.parentNode, 'text-align') == 'center' ? 'center' : t), {
        left: 1,
        right: 1,
        center: 1
      }[t] ? t : 'none') : 'none')
    },
    queryCommandState: function () {
      var e, t = this.selection.getRange()
      return t.collapsed ? -1 : (e = t.getClosedNode(), e && e.nodeType == 1 && e.tagName == 'IMG' ? 0 : -1)
    }
  }, UE.commands.insertimage = {
    execCommand: function (e, t) {
      function i (e) {
        utils.each('width,height,border,hspace,vspace'.split(','), function (t) {
          e[t] && (e[t] = parseInt(e[t], 10) || 0)
        }), utils.each('src,_src'.split(','), function (t) {
          e[t] && (e[t] = utils.unhtmlForUrl(e[t]))
        }), utils.each('title,alt'.split(','), function (t) {
          e[t] && (e[t] = utils.unhtml(e[t]))
        })
      }
      if (t = utils.isArray(t) ? t : [t], t.length) {
        var n = this,
          o = n.selection.getRange(),
          r = o.getClosedNode()
        if (n.fireEvent('beforeinsertimage', t) !== !0) {
          if (!r || !/img/i.test(r.tagName) || r.className == 'edui-faked-video' && r.className.indexOf('edui-upload-video') == -1 || r.getAttribute('word_img')) {
            var a, s = [],
              l = ''
            if (a = t[0], t.length == 1) {
              i(a)
              var d = a.src.split('=')
              d = d[d.length - 1], l = '<img src="' + a.src + '" ' + (a._src ? ' _src="' + a._src + '" ' : '') + (a.width ? 'width="' + a.width + '" ' : '') + (a.height ? ' height="' + a.height + '" ' : '') + (a.floatStyle == 'left' || a.floatStyle == 'right' ? ' style="float:' + a.floatStyle + ';"' : '') + (a.title && a.title != '' ? ' title="' + a.title + '"' : '') + (a.border && a.border != '0' ? ' border="' + a.border + '"' : '') + (a.alt && a.alt != '' ? ' alt="' + a.alt + '"' : '') + (a.hspace && a.hspace != '0' ? ' hspace = "' + a.hspace + '"' : '') + (a.vspace && a.vspace != '0' ? ' vspace = "' + a.vspace + '"' : '') + 'uploadpic="' + d + '"/>', a.floatStyle == 'center' && (l = '<p style="text-align: center">' + l + '</p>'), s.push(l)
            } else {
              for (var c = 0; a = t[c++];) {
                i(a)
                var d = a.src.split('=')
                d = d[d.length - 1], l = '<p ' + (a.floatStyle == 'center' ? 'style="text-align: center" ' : '') + '><img src="' + a.src + '" ' + (a.width ? 'width="' + a.width + '" ' : '') + (a._src ? ' _src="' + a._src + '" ' : '') + (a.height ? ' height="' + a.height + '" ' : '') + ' style="' + (a.floatStyle && a.floatStyle != 'center' ? 'float:' + a.floatStyle + ';' : '') + (a.border || '') + '" ' + (a.title ? ' title="' + a.title + '"' : '') + 'uploadpic="' + d + '" /></p>', s.push(l)
              }
            }
            console.log(s.join('')), n.execCommand('insertHtml', s.join(''))
          } else {
            var u = t.shift(),
              m = u.floatStyle
            delete u.floatStyle, domUtils.setAttributes(r, u), n.execCommand('imagefloat', m), t.length > 0 && (o.setStartAfter(r).setCursor(!1, !0), n.execCommand('insertimage', t))
          }
          n.fireEvent('afterinsertimage', t)
        }
      }
    }
  }, UE.plugins.justify = function () {
    var e = domUtils.isBlockElm,
      t = {
        left: 1,
        right: 1,
        center: 1,
        justify: 1
      },
      i = function (t, i) {
        var n = t.createBookmark(),
          o = function (e) {
            return e.nodeType == 1 ? e.tagName.toLowerCase() != 'br' && !domUtils.isBookmarkNode(e) : !domUtils.isWhitespace(e)
          }
        t.enlarge(!0)
        for (var r, a = t.createBookmark(), s = domUtils.getNextDomNode(a.start, !1, o), l = t.cloneRange(); s && !(domUtils.getPosition(s, a.end) & domUtils.POSITION_FOLLOWING);) {
          if (s.nodeType != 3 && e(s)) s = domUtils.getNextDomNode(s, !0, o)
          else {
            for (l.setStartBefore(s); s && s !== a.end && !e(s);) {
              r = s, s = domUtils.getNextDomNode(s, !1, null, function (t) {
                return !e(t)
              })
            }
            l.setEndAfter(r)
            var d = l.getCommonAncestor()
            if (!domUtils.isBody(d) && e(d)) {
              domUtils.setStyles(d, utils.isString(i) ? {
                'text-align': i
              } : i), s = d
            } else {
              var c = t.document.createElement('p')
              domUtils.setStyles(c, utils.isString(i) ? {
                'text-align': i
              } : i)
              var u = l.extractContents()
              c.appendChild(u), l.insertNode(c), s = c
            }
            s = domUtils.getNextDomNode(s, !1, o)
          }
        }
        return t.moveToBookmark(a).moveToBookmark(n)
      }
    UE.commands.justify = {
      execCommand: function (e, t) {
        var n, o = this.selection.getRange()
        return o.collapsed && (n = this.document.createTextNode('p'), o.insertNode(n)), i(o, t), n && (o.setStartBefore(n).collapse(!0), domUtils.remove(n)), o.select(), !0
      },
      queryCommandValue: function () {
        var e = this.selection.getStart(),
          i = domUtils.getComputedStyle(e, 'text-align')
        return t[i] ? i : 'left'
      },
      queryCommandState: function () {
        var e = this.selection.getStart(),
          t = e && domUtils.findParentByTagName(e, ['td', 'th', 'caption'], !0)
        return t ? -1 : 0
      }
    }
  }, UE.plugins.font = function () {
    function e (e) {
      for (var t;
        (t = e.parentNode) && t.tagName == 'SPAN' && domUtils.getChildCount(t, function (e) {
          return !domUtils.isBookmarkNode(e) && !domUtils.isBr(e)
        }) == 1;) t.style.cssText += e.style.cssText, domUtils.remove(e, !0), e = t
    }

    function t (e, t, i) {
      if (a[t] && (e.adjustmentBoundary(), !e.collapsed && e.startContainer.nodeType == 1)) {
        var n = e.startContainer.childNodes[e.startOffset]
        if (n && domUtils.isTagNode(n, 'span')) {
          var o = e.createBookmark()
          utils.each(domUtils.getElementsByTagName(n, 'span'), function (e) {
            e.parentNode && !domUtils.isBookmarkNode(e) && (t == 'backcolor' && domUtils.getComputedStyle(e, 'background-color').toLowerCase() === i || (domUtils.removeStyle(e, a[t]), e.style.cssText.replace(/^\s+$/, '').length == 0 && domUtils.remove(e, !0)))
          }), e.moveToBookmark(o)
        }
      }
    }

    function i (i, n, o) {
      var r, a = i.collapsed,
        s = i.createBookmark()
      if (a) { for (r = s.start.parentNode; dtd.$inline[r.tagName];) r = r.parentNode } else r = domUtils.getCommonAncestor(s.start, s.end)
      utils.each(domUtils.getElementsByTagName(r, 'span'), function (t) {
        if (t.parentNode && !domUtils.isBookmarkNode(t)) {
          if (/\s*border\s*:\s*none;?\s*/i.test(t.style.cssText)) return void (/^\s*border\s*:\s*none;?\s*$/.test(t.style.cssText) ? domUtils.remove(t, !0) : domUtils.removeStyle(t, 'border'))
          if (/border/i.test(t.style.cssText) && t.parentNode.tagName == 'SPAN' && /border/i.test(t.parentNode.style.cssText) && (t.style.cssText = t.style.cssText.replace(/border[^:]*:[^;]+;?/gi, '')), n != 'fontborder' || o != 'none') {
            for (var i = t.nextSibling; i && i.nodeType == 1 && i.tagName == 'SPAN';) {
              if (domUtils.isBookmarkNode(i) && n == 'fontborder') t.appendChild(i), i = t.nextSibling
              else {
                if (i.style.cssText == t.style.cssText && (domUtils.moveChild(i, t), domUtils.remove(i)), t.nextSibling === i) break
                i = t.nextSibling
              }
            }
          }
          if (e(t), browser.ie && browser.version > 8) {
            var r = domUtils.findParent(t, function (e) {
              return e.tagName == 'SPAN' && /background-color/.test(e.style.cssText)
            })
            r && !/background-color/.test(t.style.cssText) && (t.style.backgroundColor = r.style.backgroundColor)
          }
        }
      }), i.moveToBookmark(s), t(i, n, o)
    }
    var n = this,
      o = {
        forecolor: 'color',
        backcolor: 'background-color',
        fontsize: 'font-size',
        fontfamily: 'font-family',
        underline: 'text-decoration',
        strikethrough: 'text-decoration',
        fontborder: 'border'
      },
      r = {
        underline: 1,
        strikethrough: 1,
        fontborder: 1
      },
      a = {
        forecolor: 'color',
        backcolor: 'background-color',
        fontsize: 'font-size',
        fontfamily: 'font-family'
      }
    n.setOpt({
      fontfamily: [{
        name: 'songti',
        val: '宋体,SimSun'
      }, {
        name: 'yahei',
        val: '微软雅黑,Microsoft YaHei'
      }, {
        name: 'kaiti',
        val: '楷体,楷体_GB2312, SimKai'
      }, {
        name: 'heiti',
        val: '黑体, SimHei'
      }, {
        name: 'lishu',
        val: '隶书, SimLi'
      }, {
        name: 'andaleMono',
        val: 'andale mono'
      }, {
        name: 'arial',
        val: 'arial, helvetica,sans-serif'
      }, {
        name: 'arialBlack',
        val: 'arial black,avant garde'
      }, {
        name: 'comicSansMs',
        val: 'comic sans ms'
      }, {
        name: 'impact',
        val: 'impact,chicago'
      }, {
        name: 'timesNewRoman',
        val: 'times new roman'
      }],
      fontsize: [10, 11, 12, 14, 16, 18, 20, 24, 36]
    }), n.addInputRule(function (e) {
      utils.each(e.getNodesByTagName('u s del font strike'), function (e) {
        if (e.tagName == 'font') {
          var t = []
          for (var i in e.attrs) {
            switch (i) {
              case 'size':
                t.push('font-size:' + ({
                  1: '10',
                  2: '12',
                  3: '16',
                  4: '18',
                  5: '24',
                  6: '32',
                  7: '48'
                }[e.attrs[i]] || e.attrs[i]) + 'px')
                break
              case 'color':
                t.push('color:' + e.attrs[i])
                break
              case 'face':
                t.push('font-family:' + e.attrs[i])
                break
              case 'style':
                t.push(e.attrs[i])
            }
          }
          e.attrs = {
            style: t.join(';')
          }
        } else {
          var n = e.tagName == 'u' ? 'underline' : 'line-through'
          e.attrs = {
            style: (e.getAttr('style') || '') + 'text-decoration:' + n + ';'
          }
        }
        e.tagName = 'span'
      })
    })
    for (var s in o) {
      !(function (e, t) {
        UE.commands[e] = {
          execCommand: function (n, o) {
            o = o || (this.queryCommandState(n) ? 'none' : n == 'underline' ? 'underline' : n == 'fontborder' ? '1px solid #000' : 'line-through')
            var a, s = this,
              l = this.selection.getRange()
            if (o == 'default') l.collapsed && (a = s.document.createTextNode('font'), l.insertNode(a).select()), s.execCommand('removeFormat', 'span,a', t), a && (l.setStartBefore(a).collapse(!0), domUtils.remove(a)), i(l, n, o), l.select()
            else if (l.collapsed) {
              var d = domUtils.findParentByTagName(l.startContainer, 'span', !0)
              if (a = s.document.createTextNode('font'), !d || d.children.length || d[browser.ie ? 'innerText' : 'textContent'].replace(fillCharReg, '').length) {
                if (l.insertNode(a), l.selectNode(a).select(), d = l.document.createElement('span'), r[e]) {
                  if (domUtils.findParentByTagName(a, 'a', !0)) return l.setStartBefore(a).setCursor(), void domUtils.remove(a)
                  s.execCommand('removeFormat', 'span,a', t)
                }
                if (d.style.cssText = t + ':' + o, a.parentNode.insertBefore(d, a), !browser.ie || browser.ie && browser.version == 9) { for (var c = d.parentNode; !domUtils.isBlockElm(c);) c.tagName == 'SPAN' && (d.style.cssText = c.style.cssText + ';' + d.style.cssText), c = c.parentNode }
                opera ? setTimeout(function () {
                  l.setStart(d, 0).collapse(!0), i(l, n, o), l.select()
                }) : (l.setStart(d, 0).collapse(!0), i(l, n, o), l.select())
              } else l.insertNode(a), r[e] && (l.selectNode(a).select(), s.execCommand('removeFormat', 'span,a', t, null), d = domUtils.findParentByTagName(a, 'span', !0), l.setStartBefore(a)), d && (d.style.cssText += ';' + t + ':' + o), l.collapse(!0).select()
              domUtils.remove(a)
            } else {
              r[e] && s.queryCommandValue(e) && s.execCommand('removeFormat', 'span,a', t), l = s.selection.getRange(), l.applyInlineStyle('span', {
                style: t + ':' + o
              }), i(l, n, o), l.select()
            }
            return !0
          },
          queryCommandValue: function (e) {
            var i = this.selection.getStart()
            if (e == 'underline' || e == 'strikethrough') {
              for (var n, o = i; o && !domUtils.isBlockElm(o) && !domUtils.isBody(o);) {
                if (o.nodeType == 1 && (n = domUtils.getComputedStyle(o, t), n != 'none')) return n
                o = o.parentNode
              }
              return 'none'
            }
            if (e == 'fontborder') {
              for (var r, a = i; a && dtd.$inline[a.tagName];) {
                if ((r = domUtils.getComputedStyle(a, 'border')) && /1px/.test(r) && /solid/.test(r)) return r
                a = a.parentNode
              }
              return ''
            }
            if (e == 'FontSize') {
              var s = domUtils.getComputedStyle(i, t),
                a = /^([\d\.]+)(\w+)$/.exec(s)
              return a ? Math.floor(a[1]) + a[2] : s
            }
            return domUtils.getComputedStyle(i, t)
          },
          queryCommandState: function (e) {
            if (!r[e]) return 0
            var t = this.queryCommandValue(e)
            return e == 'fontborder' ? /1px/.test(t) && /solid/.test(t) : e == 'underline' ? /underline/.test(t) : /line\-through/.test(t)
          }
        }
      }(s, o[s]))
    }
  }, UE.plugins.link = function () {
    function e (e) {
      var t = e.startContainer,
        i = e.endContainer;
      (t = domUtils.findParentByTagName(t, 'a', !0)) && e.setStartBefore(t), (i = domUtils.findParentByTagName(i, 'a', !0)) && e.setEndAfter(i)
    }

    function t (t, i, n) {
      var o = t.cloneRange(),
        r = n.queryCommandValue('link')
      e(t = t.adjustmentBoundary())
      var a = t.startContainer
      if (a.nodeType == 1 && r && (a = a.childNodes[t.startOffset], a && a.nodeType == 1 && a.tagName == 'A' && /^(?:https?|ftp|file)\s*:\s*\/\//.test(a[browser.ie ? 'innerText' : 'textContent']) && (a[browser.ie ? 'innerText' : 'textContent'] = utils.html(i.textValue || i.href))), o.collapsed && !r || (t.removeInlineStyle('a'), o = t.cloneRange()), o.collapsed) {
        var s = t.document.createElement('a'),
          l = ''
        i.textValue ? (l = utils.html(i.textValue), delete i.textValue) : l = utils.html(i.href), domUtils.setAttributes(s, i), a = domUtils.findParentByTagName(o.startContainer, 'a', !0), a && domUtils.isInNodeEndBoundary(o, a) && t.setStartAfter(a).collapse(!0), s[browser.ie ? 'innerText' : 'textContent'] = l, t.insertNode(s).selectNode(s)
      } else t.applyInlineStyle('a', i)
    }
    UE.commands.unlink = {
      execCommand: function () {
        var t, i = this.selection.getRange()
        i.collapsed && !domUtils.findParentByTagName(i.startContainer, 'a', !0) || (t = i.createBookmark(), e(i), i.removeInlineStyle('a').moveToBookmark(t).select())
      },
      queryCommandState: function () {
        return !this.highlight && this.queryCommandValue('link') ? 0 : -1
      }
    }, UE.commands.link = {
      execCommand: function (e, i) {
        var n
        i._href && (i._href = utils.unhtml(i._href, /[<">]/g)), i.href && (i.href = utils.unhtml(i.href, /[<">]/g)), i.textValue && (i.textValue = utils.unhtml(i.textValue, /[<">]/g)), t(n = this.selection.getRange(), i, this), n.collapse().select(!0)
      },
      queryCommandValue: function () {
        var e, t = this.selection.getRange()
        if (!t.collapsed) {
          t.shrinkBoundary()
          var i = t.startContainer.nodeType != 3 && t.startContainer.childNodes[t.startOffset] ? t.startContainer.childNodes[t.startOffset] : t.startContainer,
            n = t.endContainer.nodeType == 3 || t.endOffset == 0 ? t.endContainer : t.endContainer.childNodes[t.endOffset - 1],
            o = t.getCommonAncestor()
          if (e = domUtils.findParentByTagName(o, 'a', !0), !e && o.nodeType == 1) {
            for (var r, a, s, l = o.getElementsByTagName('a'), d = 0; s = l[d++];) {
              if (r = domUtils.getPosition(s, i), a = domUtils.getPosition(s, n), (r & domUtils.POSITION_FOLLOWING || r & domUtils.POSITION_CONTAINS) && (a & domUtils.POSITION_PRECEDING || a & domUtils.POSITION_CONTAINS)) {
                e = s
                break
              }
            }
          }
          return e
        }
        return e = t.startContainer, e = e.nodeType == 1 ? e : e.parentNode, e && (e = domUtils.findParentByTagName(e, 'a', !0)) && !domUtils.isInNodeEndBoundary(t, e) ? e : void 0
      },
      queryCommandState: function () {
        var e = this.selection.getRange().getClosedNode(),
          t = e && (e.className == 'edui-faked-video' || e.className.indexOf('edui-upload-video') != -1)
        return t ? -1 : 0
      }
    }
  }, UE.plugins.insertframe = function () {
    function e () {
      t._iframe && delete t._iframe
    }
    var t = this
    t.addListener('selectionchange', function () {
      e()
    })
  }, UE.commands.scrawl = {
    queryCommandState: function () {
      return browser.ie && browser.version <= 8 ? -1 : 0
    }
  }, UE.plugins.removeformat = function () {
    var e = this
    e.setOpt({
      removeFormatTags: 'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var',
      removeFormatAttributes: 'class,style,lang,width,height,align,hspace,valign'
    }), e.commands.removeformat = {
      execCommand: function (e, t, i, n, o) {
        function r (e) {
          if (e.nodeType == 3 || e.tagName.toLowerCase() != 'span') return 0
          if (browser.ie) {
            var t = e.attributes
            if (t.length) {
              for (var i = 0, n = t.length; n > i; i++) { if (t[i].specified) return 0 }
              return 1
            }
          }
          return !e.attributes.length
        }

        function a (e) {
          var t = e.createBookmark()
          if (e.collapsed && e.enlarge(!0), !o) {
            var n = domUtils.findParentByTagName(e.startContainer, 'a', !0)
            n && e.setStartBefore(n), n = domUtils.findParentByTagName(e.endContainer, 'a', !0), n && e.setEndAfter(n)
          }
          for (s = e.createBookmark(), p = s.start;
            (l = p.parentNode) && !domUtils.isBlockElm(l);) domUtils.breakParent(p, l), domUtils.clearEmptySibling(p)
          if (s.end) {
            for (p = s.end;
              (l = p.parentNode) && !domUtils.isBlockElm(l);) domUtils.breakParent(p, l), domUtils.clearEmptySibling(p)
            for (var a, u = domUtils.getNextDomNode(s.start, !1, m); u && u != s.end;) a = domUtils.getNextDomNode(u, !0, m), dtd.$empty[u.tagName.toLowerCase()] || domUtils.isBookmarkNode(u) || (d.test(u.tagName) ? i ? (domUtils.removeStyle(u, i), r(u) && i != 'text-decoration' && domUtils.remove(u, !0)) : domUtils.remove(u, !0) : dtd.$tableContent[u.tagName] || dtd.$list[u.tagName] || (domUtils.removeAttributes(u, c), r(u) && domUtils.remove(u, !0))), u = a
          }
          var f = s.start.parentNode
          !domUtils.isBlockElm(f) || dtd.$tableContent[f.tagName] || dtd.$list[f.tagName] || domUtils.removeAttributes(f, c), f = s.end.parentNode, s.end && domUtils.isBlockElm(f) && !dtd.$tableContent[f.tagName] && !dtd.$list[f.tagName] && domUtils.removeAttributes(f, c), e.moveToBookmark(s).moveToBookmark(t)
          for (var h, p = e.startContainer, g = e.collapsed; p.nodeType == 1 && domUtils.isEmptyNode(p) && dtd.$removeEmpty[p.tagName];) h = p.parentNode, e.setStartBefore(p), e.startContainer === e.endContainer && e.endOffset--, domUtils.remove(p), p = h
          if (!g) { for (p = e.endContainer; p.nodeType == 1 && domUtils.isEmptyNode(p) && dtd.$removeEmpty[p.tagName];) h = p.parentNode, e.setEndBefore(p), domUtils.remove(p), p = h }
        }
        var s, l, d = new RegExp('^(?:' + (t || this.options.removeFormatTags).replace(/,/g, '|') + ')$', 'i'),
          c = i ? [] : (n || this.options.removeFormatAttributes).split(','),
          u = new dom.Range(this.document),
          m = function (e) {
            return e.nodeType == 1
          }
        u = this.selection.getRange(), a(u), u.select()
      }
    }
  }, UE.plugins.blockquote = function () {
    function e (e) {
      return domUtils.filterNodeList(e.selection.getStartElementPath(), 'blockquote')
    }
    var t = this
    t.commands.blockquote = {
      execCommand: function (t, i) {
        var n = this.selection.getRange(),
          o = e(this),
          r = dtd.blockquote,
          a = n.createBookmark()
        if (o) {
          var s = n.startContainer,
            l = domUtils.isBlockElm(s) ? s : domUtils.findParent(s, function (e) {
              return domUtils.isBlockElm(e)
            }),
            d = n.endContainer,
            c = domUtils.isBlockElm(d) ? d : domUtils.findParent(d, function (e) {
              return domUtils.isBlockElm(e)
            })
          l = domUtils.findParentByTagName(l, 'li', !0) || l, c = domUtils.findParentByTagName(c, 'li', !0) || c, l.tagName == 'LI' || l.tagName == 'TD' || l === o || domUtils.isBody(l) ? domUtils.remove(o, !0) : domUtils.breakParent(l, o), l !== c && (o = domUtils.findParentByTagName(c, 'blockquote'), o && (c.tagName == 'LI' || c.tagName == 'TD' || domUtils.isBody(c) ? o.parentNode && domUtils.remove(o, !0) : domUtils.breakParent(c, o)))
          for (var u, m = domUtils.getElementsByTagName(this.document, 'blockquote'), f = 0; u = m[f++];) u.childNodes.length ? domUtils.getPosition(u, l) & domUtils.POSITION_FOLLOWING && domUtils.getPosition(u, c) & domUtils.POSITION_PRECEDING && domUtils.remove(u, !0) : domUtils.remove(u)
        } else {
          for (var h = n.cloneRange(), p = h.startContainer.nodeType == 1 ? h.startContainer : h.startContainer.parentNode, g = p, v = 1; ;) {
            if (domUtils.isBody(p)) {
              g !== p ? n.collapsed ? (h.selectNode(g), v = 0) : h.setStartBefore(g) : h.setStart(p, 0)
              break
            }
            if (!r[p.tagName]) {
              n.collapsed ? h.selectNode(g) : h.setStartBefore(g)
              break
            }
            g = p, p = p.parentNode
          }
          if (v) {
            for (g = p = p = h.endContainer.nodeType == 1 ? h.endContainer : h.endContainer.parentNode; ;) {
              if (domUtils.isBody(p)) {
                g !== p ? h.setEndAfter(g) : h.setEnd(p, p.childNodes.length)
                break
              }
              if (!r[p.tagName]) {
                h.setEndAfter(g)
                break
              }
              g = p, p = p.parentNode
            }
          }
          p = n.document.createElement('blockquote'), domUtils.setAttributes(p, i), p.appendChild(h.extractContents()), h.insertNode(p)
          for (var b, y = domUtils.getElementsByTagName(p, 'blockquote'), f = 0; b = y[f++];) b.parentNode && domUtils.remove(b, !0)
        }
        n.moveToBookmark(a).select()
      },
      queryCommandState: function () {
        return e(this) ? 1 : 0
      }
    }
  }, UE.commands.touppercase = UE.commands.tolowercase = {
    execCommand: function (e) {
      var t = this,
        i = t.selection.getRange()
      if (i.collapsed) return i
      for (var n = i.createBookmark(), o = n.end, r = function (e) {
          return !domUtils.isBr(e) && !domUtils.isWhitespace(e)
        }, a = domUtils.getNextDomNode(n.start, !1, r); a && domUtils.getPosition(a, o) & domUtils.POSITION_PRECEDING && (a.nodeType == 3 && (a.nodeValue = a.nodeValue[e == 'touppercase' ? 'toUpperCase' : 'toLowerCase']()), a = domUtils.getNextDomNode(a, !0, r), a !== o););
      i.moveToBookmark(n).select()
    }
  }, UE.commands.indent = {
    execCommand: function () {
      var e = this,
        t = e.queryCommandState('indent') ? '0em' : e.options.indentValue || '2em'
      e.execCommand('Paragraph', 'p', {
        style: 'text-indent:' + t
      })
    },
    queryCommandState: function () {
      var e = domUtils.filterNodeList(this.selection.getStartElementPath(), 'p h1 h2 h3 h4 h5 h6')
      return e && e.style.textIndent && parseInt(e.style.textIndent) ? 1 : 0
    }
  }, UE.commands.print = {
    execCommand: function () {
      this.window.print()
    },
    notNeedUndo: 1
  }, UE.commands.preview = {
    execCommand: function () {
      var e = window.open('', '_blank', ''),
        t = e.document
      t.open(), t.write('<!DOCTYPE html><html><head><meta charset="utf-8"/><script src="' + this.options.UEDITOR_HOME_URL + "ueditor.parse.js\"></script><script>setTimeout(function(){uParse('div',{rootPath: '" + this.options.UEDITOR_HOME_URL + "'})},300)</script></head><body><div>" + this.getContent(null, null, !0) + '</div></body></html>'), t.close()
    },
    notNeedUndo: 1
  }, UE.plugins.selectall = function () {
    var e = this
    e.commands.selectall = {
      execCommand: function () {
        var e = this,
          t = e.body,
          i = e.selection.getRange()
        i.selectNodeContents(t), domUtils.isEmptyBlock(t) && (browser.opera && t.firstChild && t.firstChild.nodeType == 1 && i.setStartAtFirst(t.firstChild), i.collapse(!0)), i.select(!0)
      },
      notNeedUndo: 1
    }, e.addshortcutkey({
      selectAll: 'ctrl+65'
    })
  }, UE.plugins.paragraph = function () {
    var e = this,
      t = domUtils.isBlockElm,
      i = ['TD', 'LI', 'PRE'],
      n = function (e, n, o, r) {
        var a, s = e.createBookmark(),
          l = function (e) {
            return e.nodeType == 1 ? e.tagName.toLowerCase() != 'br' && !domUtils.isBookmarkNode(e) : !domUtils.isWhitespace(e)
          }
        e.enlarge(!0)
        for (var d, c = e.createBookmark(), u = domUtils.getNextDomNode(c.start, !1, l), m = e.cloneRange(); u && !(domUtils.getPosition(u, c.end) & domUtils.POSITION_FOLLOWING);) {
          if (u.nodeType != 3 && t(u)) u = domUtils.getNextDomNode(u, !0, l)
          else {
            for (m.setStartBefore(u); u && u !== c.end && !t(u);) {
              d = u, u = domUtils.getNextDomNode(u, !1, null, function (e) {
                return !t(e)
              })
            }
            m.setEndAfter(d), a = e.document.createElement(n), o && (domUtils.setAttributes(a, o), r && r == 'customstyle' && o.style && (a.style.cssText = o.style)), a.appendChild(m.extractContents()), domUtils.isEmptyNode(a) && domUtils.fillChar(e.document, a), m.insertNode(a)
            var f = a.parentNode
            t(f) && !domUtils.isBody(a.parentNode) && utils.indexOf(i, f.tagName) == -1 && (r && r == 'customstyle' || (f.getAttribute('dir') && a.setAttribute('dir', f.getAttribute('dir')), f.style.cssText && (a.style.cssText = f.style.cssText + ';' + a.style.cssText), f.style.textAlign && !a.style.textAlign && (a.style.textAlign = f.style.textAlign), f.style.textIndent && !a.style.textIndent && (a.style.textIndent = f.style.textIndent), f.style.padding && !a.style.padding && (a.style.padding = f.style.padding)), o && /h\d/i.test(f.tagName) && !/h\d/i.test(a.tagName) ? (domUtils.setAttributes(f, o), r && r == 'customstyle' && o.style && (f.style.cssText = o.style), domUtils.remove(a, !0), a = f) : domUtils.remove(a.parentNode, !0)), u = utils.indexOf(i, f.tagName) != -1 ? f : a, u = domUtils.getNextDomNode(u, !1, l)
          }
        }
        return e.moveToBookmark(c).moveToBookmark(s)
      }
    e.setOpt('paragraph', {
      p: '',
      h1: '',
      h2: '',
      h3: '',
      h4: '',
      h5: '',
      h6: ''
    }), e.commands.paragraph = {
      execCommand: function (e, t, i, o) {
        var r = this.selection.getRange()
        if (r.collapsed) {
          var a = this.document.createTextNode('p')
          if (r.insertNode(a), browser.ie) {
            var s = a.previousSibling
            s && domUtils.isWhitespace(s) && domUtils.remove(s), s = a.nextSibling, s && domUtils.isWhitespace(s) && domUtils.remove(s)
          }
        }
        if (r = n(r, t, i, o), a && (r.setStartBefore(a).collapse(!0), pN = a.parentNode, domUtils.remove(a), domUtils.isBlockElm(pN) && domUtils.isEmptyNode(pN) && domUtils.fillNode(this.document, pN)), browser.gecko && r.collapsed && r.startContainer.nodeType == 1) {
          var l = r.startContainer.childNodes[r.startOffset]
          l && l.nodeType == 1 && l.tagName.toLowerCase() == t && r.setStart(l, 0).collapse(!0)
        }
        return r.select(), !0
      },
      queryCommandValue: function () {
        var e = domUtils.filterNodeList(this.selection.getStartElementPath(), 'p h1 h2 h3 h4 h5 h6')
        return e ? e.tagName.toLowerCase() : ''
      }
    }
  },
  (function () {
    var e = domUtils.isBlockElm,
      t = function (e) {
        return domUtils.filterNodeList(e.selection.getStartElementPath(), function (e) {
          return e && e.nodeType == 1 && e.getAttribute('dir')
        })
      },
      i = function (i, n, o) {
        var r, a = function (e) {
            return e.nodeType == 1 ? !domUtils.isBookmarkNode(e) : !domUtils.isWhitespace(e)
          },
          s = t(n)
        if (s && i.collapsed) return s.setAttribute('dir', o), i
        r = i.createBookmark(), i.enlarge(!0)
        for (var l, d = i.createBookmark(), c = domUtils.getNextDomNode(d.start, !1, a), u = i.cloneRange(); c && !(domUtils.getPosition(c, d.end) & domUtils.POSITION_FOLLOWING);) {
          if (c.nodeType != 3 && e(c)) c = domUtils.getNextDomNode(c, !0, a)
          else {
            for (u.setStartBefore(c); c && c !== d.end && !e(c);) {
              l = c, c = domUtils.getNextDomNode(c, !1, null, function (t) {
                return !e(t)
              })
            }
            u.setEndAfter(l)
            var m = u.getCommonAncestor()
            if (!domUtils.isBody(m) && e(m)) m.setAttribute('dir', o), c = m
            else {
              var f = i.document.createElement('p')
              f.setAttribute('dir', o)
              var h = u.extractContents()
              f.appendChild(h), u.insertNode(f), c = f
            }
            c = domUtils.getNextDomNode(c, !1, a)
          }
        }
        return i.moveToBookmark(d).moveToBookmark(r)
      }
    UE.commands.directionality = {
      execCommand: function (e, t) {
        var n = this.selection.getRange()
        if (n.collapsed) {
          var o = this.document.createTextNode('d')
          n.insertNode(o)
        }
        return i(n, this, t), o && (n.setStartBefore(o).collapse(!0), domUtils.remove(o)), n.select(), !0
      },
      queryCommandValue: function () {
        var e = t(this)
        return e ? e.getAttribute('dir') : 'ltr'
      }
    }
  }()), UE.plugins.horizontal = function () {
    var e = this
    e.commands.horizontal = {
      execCommand: function (e) {
        var t = this
        if (t.queryCommandState(e) !== -1) {
          t.execCommand('insertHtml', '<hr>')
          var i = t.selection.getRange(),
            n = i.startContainer
          if (n.nodeType == 1 && !n.childNodes[i.startOffset]) {
            var o;
            (o = n.childNodes[i.startOffset - 1]) && o.nodeType == 1 && o.tagName == 'HR' && (t.options.enterTag == 'p' ? (o = t.document.createElement('p'), i.insertNode(o), i.setStart(o, 0).setCursor()) : (o = t.document.createElement('br'), i.insertNode(o), i.setStartBefore(o).setCursor()))
          }
          return !0
        }
      },
      queryCommandState: function () {
        return domUtils.filterNodeList(this.selection.getStartElementPath(), 'table') ? -1 : 0
      }
    }, e.addListener('delkeydown', function (e, t) {
      var i = this.selection.getRange()
      if (i.txtToElmBoundary(!0), domUtils.isStartInblock(i)) {
        var n = i.startContainer,
          o = n.previousSibling
        if (o && domUtils.isTagNode(o, 'hr')) return domUtils.remove(o), i.select(), domUtils.preventDefault(t), !0
      }
    })
  }, UE.commands.time = UE.commands.date = {
    execCommand: function (e, t) {
      function i (e, t) {
        var i = ('0' + e.getHours()).slice(-2),
          n = ('0' + e.getMinutes()).slice(-2),
          o = ('0' + e.getSeconds()).slice(-2)
        return t = t || 'hh:ii:ss', t.replace(/hh/gi, i).replace(/ii/gi, n).replace(/ss/gi, o)
      }

      function n (e, t) {
        var i = ('000' + e.getFullYear()).slice(-4),
          n = i.slice(-2),
          o = ('0' + (e.getMonth() + 1)).slice(-2),
          r = ('0' + e.getDate()).slice(-2)
        return t = t || 'yyyy-mm-dd', t.replace(/yyyy/gi, i).replace(/yy/gi, n).replace(/mm/gi, o).replace(/dd/gi, r)
      }
      var o = new Date()
      this.execCommand('insertHtml', e == 'time' ? i(o, t) : n(o, t))
    }
  }, UE.plugins.rowspacing = function () {
    var e = this
    e.setOpt({
      rowspacingtop: ['5', '10', '15', '20', '25'],
      rowspacingbottom: ['5', '10', '15', '20', '25']
    }), e.commands.rowspacing = {
      execCommand: function (e, t, i) {
        return this.execCommand('paragraph', 'p', {
          style: 'margin-' + i + ':' + t + 'px'
        }), !0
      },
      queryCommandValue: function (e, t) {
        var i, n = domUtils.filterNodeList(this.selection.getStartElementPath(), function (e) {
          return domUtils.isBlockElm(e)
        })
        return n ? (i = domUtils.getComputedStyle(n, 'margin-' + t).replace(/[^\d]/g, ''), i || 0) : 0
      }
    }
  }, UE.plugins.lineheight = function () {
    var e = this
    e.setOpt({
      lineheight: ['1', '1.5', '1.75', '2', '3', '4', '5']
    }), e.commands.lineheight = {
      execCommand: function (e, t) {
        return this.execCommand('paragraph', 'p', {
          style: 'line-height:' + (t == '1' ? 'normal' : t + 'em')
        }), !0
      },
      queryCommandValue: function () {
        var e = domUtils.filterNodeList(this.selection.getStartElementPath(), function (e) {
          return domUtils.isBlockElm(e)
        })
        if (e) {
          var t = domUtils.getComputedStyle(e, 'line-height')
          return t == 'normal' ? 1 : t.replace(/[^\d.]*/gi, '')
        }
      }
    }
  }, UE.plugins.insertcode = function () {
    var e = this
    e.ready(function () {
      utils.cssRule('pre', 'pre{margin:.5em 0;padding:.4em .6em;border-radius:8px;background:#f8f8f8;}', e.document)
    }), e.setOpt('insertcode', {
      as3: 'ActionScript3',
      bash: 'Bash/Shell',
      cpp: 'C/C++',
      css: 'Css',
      cf: 'CodeFunction',
      'c#': 'C#',
      delphi: 'Delphi',
      diff: 'Diff',
      erlang: 'Erlang',
      groovy: 'Groovy',
      html: 'Html',
      java: 'Java',
      jfx: 'JavaFx',
      js: 'Javascript',
      pl: 'Perl',
      php: 'Php',
      plain: 'Plain Text',
      ps: 'PowerShell',
      python: 'Python',
      ruby: 'Ruby',
      scala: 'Scala',
      sql: 'Sql',
      vb: 'Vb',
      xml: 'Xml'
    }), e.commands.insertcode = {
      execCommand: function (e, t) {
        var i = this,
          n = i.selection.getRange(),
          o = domUtils.findParentByTagName(n.startContainer, 'pre', !0)
        if (o) o.className = 'brush:' + t + ';toolbar:false;'
        else {
          var r = ''
          if (n.collapsed) r = browser.ie && browser.ie11below ? browser.version <= 8 ? '&nbsp;' : '' : '<br/>'
          else {
            var a = n.extractContents(),
              s = i.document.createElement('div')
            s.appendChild(a), utils.each(UE.filterNode(UE.htmlparser(s.innerHTML.replace(/[\r\t]/g, '')), i.options.filterTxtRules).children, function (e) {
              if (browser.ie && browser.ie11below && browser.version > 8) {
                e.type == 'element' ? e.tagName == 'br' ? r += '\n' : dtd.$empty[e.tagName] || (utils.each(e.children, function (t) {
                  t.type == 'element' ? t.tagName == 'br' ? r += '\n' : dtd.$empty[e.tagName] || (r += t.innerText()) : r += t.data
                }), /\n$/.test(r) || (r += '\n')) : r += e.data + '\n', !e.nextSibling() && /\n$/.test(r) && (r = r.replace(/\n$/, ''))
              } else if (browser.ie && browser.ie11below) {
                e.type == 'element' ? e.tagName == 'br' ? r += '<br>' : dtd.$empty[e.tagName] || (utils.each(e.children, function (t) {
                  t.type == 'element' ? t.tagName == 'br' ? r += '<br>' : dtd.$empty[e.tagName] || (r += t.innerText()) : r += t.data
                }), /br>$/.test(r) || (r += '<br>')) : r += e.data + '<br>', !e.nextSibling() && /<br>$/.test(r) && (r = r.replace(/<br>$/, ''))
              } else if (r += e.type == 'element' ? dtd.$empty[e.tagName] ? '' : e.innerText() : e.data, !/br\/?\s*>$/.test(r)) {
                if (!e.nextSibling()) return
                r += '<br>'
              }
            })
          }
          i.execCommand('inserthtml', '<pre id="coder"class="brush:' + t + ';toolbar:false">' + r + '</pre>', !0), o = i.document.getElementById('coder'), domUtils.removeAttributes(o, 'id')
          var l = o.previousSibling
          l && (l.nodeType == 3 && l.nodeValue.length == 1 && browser.ie && browser.version == 6 || domUtils.isEmptyBlock(l)) && domUtils.remove(l)
          var n = i.selection.getRange()
          domUtils.isEmptyBlock(o) ? n.setStart(o, 0).setCursor(!1, !0) : n.selectNodeContents(o).select()
        }
      },
      queryCommandValue: function () {
        var e = this.selection.getStartElementPath(),
          t = ''
        return utils.each(e, function (e) {
          if (e.nodeName == 'PRE') {
            var i = e.className.match(/brush:([^;]+)/)
            return t = i && i[1] ? i[1] : '', !1
          }
        }), t
      }
    }, e.addInputRule(function (e) {
      utils.each(e.getNodesByTagName('pre'), function (e) {
        var t = e.getNodesByTagName('br')
        if (t.length) {
          return void (browser.ie && browser.ie11below && browser.version > 8 && utils.each(t, function (e) {
            var t = UE.uNode.createText('\n')
            e.parentNode.insertBefore(t, e), e.parentNode.removeChild(e)
          }))
        }
        if (!(browser.ie && browser.ie11below && browser.version > 8)) {
          var i = e.innerText().split(/\n/)
          e.innerHTML(''), utils.each(i, function (t) {
            t.length && e.appendChild(UE.uNode.createText(t)), e.appendChild(UE.uNode.createElement('br'))
          })
        }
      })
    }), e.addOutputRule(function (e) {
      utils.each(e.getNodesByTagName('pre'), function (e) {
        var t = ''
        utils.each(e.children, function (e) {
          t += e.type == 'text' ? e.data.replace(/[ ]/g, '&nbsp;').replace(/\n$/, '') : e.tagName == 'br' ? '\n' : dtd.$empty[e.tagName] ? e.innerText() : ''
        }), e.innerText(t.replace(/(&nbsp;|\n)+$/, ''))
      })
    }), e.notNeedCodeQuery = {
      help: 1,
      undo: 1,
      redo: 1,
      source: 1,
      print: 1,
      searchreplace: 1,
      fullscreen: 1,
      preview: 1,
      insertparagraph: 1,
      elementpath: 1,
      insertcode: 1,
      inserthtml: 1,
      selectall: 1
    }
    e.queryCommandState
    e.queryCommandState = function (e) {
      var t = this
      return !t.notNeedCodeQuery[e.toLowerCase()] && t.selection && t.queryCommandValue('insertcode') ? -1 : UE.Editor.prototype.queryCommandState.apply(this, arguments)
    }, e.addListener('beforeenterkeydown', function () {
      var t = e.selection.getRange(),
        i = domUtils.findParentByTagName(t.startContainer, 'pre', !0)
      if (i) {
        if (e.fireEvent('saveScene'), t.collapsed || t.deleteContents(), !browser.ie || browser.ie9above) {
          var i, n = e.document.createElement('br')
          t.insertNode(n).setStartAfter(n).collapse(!0)
          var o = n.nextSibling
          o || browser.ie && !(browser.version > 10) ? t.setStartAfter(n) : t.insertNode(n.cloneNode(!1)), i = n.previousSibling
          for (var r; i;) {
            if (r = i, i = i.previousSibling, !i || i.nodeName == 'BR') {
              i = r
              break
            }
          }
          if (i) {
            for (var a = ''; i && i.nodeName != 'BR' && new RegExp('^[\\s' + domUtils.fillChar + ']*$').test(i.nodeValue);) a += i.nodeValue, i = i.nextSibling
            if (i.nodeName != 'BR') {
              var s = i.nodeValue.match(new RegExp('^([\\s' + domUtils.fillChar + ']+)'))
              s && s[1] && (a += s[1])
            }
            a && (a = e.document.createTextNode(a), t.insertNode(a).setStartAfter(a))
          }
          t.collapse(!0).select(!0)
        } else if (browser.version > 8) {
          var l = e.document.createTextNode('\n'),
            d = t.startContainer
          if (t.startOffset == 0) {
            var c = d.previousSibling
            if (c) {
              t.insertNode(l)
              var u = e.document.createTextNode(' ')
              t.setStartAfter(l).insertNode(u).setStart(u, 0).collapse(!0).select(!0)
            }
          } else {
            t.insertNode(l).setStartAfter(l)
            var u = e.document.createTextNode(' ')
            d = t.startContainer.childNodes[t.startOffset], d && !/^\n/.test(d.nodeValue) && t.setStartBefore(l), t.insertNode(u).setStart(u, 0).collapse(!0).select(!0)
          }
        } else {
          var n = e.document.createElement('br')
          t.insertNode(n), t.insertNode(e.document.createTextNode(domUtils.fillChar)), t.setStartAfter(n), i = n.previousSibling
          for (var r; i;) {
            if (r = i, i = i.previousSibling, !i || i.nodeName == 'BR') {
              i = r
              break
            }
          }
          if (i) {
            for (var a = ''; i && i.nodeName != 'BR' && new RegExp('^[ ' + domUtils.fillChar + ']*$').test(i.nodeValue);) a += i.nodeValue, i = i.nextSibling
            if (i.nodeName != 'BR') {
              var s = i.nodeValue.match(new RegExp('^([ ' + domUtils.fillChar + ']+)'))
              s && s[1] && (a += s[1])
            }
            a = e.document.createTextNode(a), t.insertNode(a).setStartAfter(a)
          }
          t.collapse(!0).select()
        }
        return e.fireEvent('saveScene'), !0
      }
    }), e.addListener('tabkeydown', function (t, i) {
      var n = e.selection.getRange(),
        o = domUtils.findParentByTagName(n.startContainer, 'pre', !0)
      if (o) {
        if (e.fireEvent('saveScene'), i.shiftKey);
        else if (n.collapsed) {
          var r = e.document.createTextNode('    ')
          n.insertNode(r).setStartAfter(r).collapse(!0).select(!0)
        } else {
          for (var a = n.createBookmark(), s = a.start.previousSibling; s;) {
            if (o.firstChild === s && !domUtils.isBr(s)) {
              o.insertBefore(e.document.createTextNode('    '), s)
              break
            }
            if (domUtils.isBr(s)) {
              o.insertBefore(e.document.createTextNode('    '), s.nextSibling)
              break
            }
            s = s.previousSibling
          }
          var l = a.end
          for (s = a.start.nextSibling, o.firstChild === a.start && o.insertBefore(e.document.createTextNode('    '), s.nextSibling); s && s !== l;) {
            if (domUtils.isBr(s) && s.nextSibling) {
              if (s.nextSibling === l) break
              o.insertBefore(e.document.createTextNode('    '), s.nextSibling)
            }
            s = s.nextSibling
          }
          n.moveToBookmark(a).select()
        }
        return e.fireEvent('saveScene'), !0
      }
    }), e.addListener('beforeinserthtml', function (e, t) {
      var i = this,
        n = i.selection.getRange(),
        o = domUtils.findParentByTagName(n.startContainer, 'pre', !0)
      if (o) {
        n.collapsed || n.deleteContents()
        var r = ''
        if (browser.ie && browser.version > 8) {
          utils.each(UE.filterNode(UE.htmlparser(t), i.options.filterTxtRules).children, function (e) {
            e.type == 'element' ? e.tagName == 'br' ? r += '\n' : dtd.$empty[e.tagName] || (utils.each(e.children, function (t) {
              t.type == 'element' ? t.tagName == 'br' ? r += '\n' : dtd.$empty[e.tagName] || (r += t.innerText()) : r += t.data
            }), /\n$/.test(r) || (r += '\n')) : r += e.data + '\n', !e.nextSibling() && /\n$/.test(r) && (r = r.replace(/\n$/, ''))
          })
          var a = i.document.createTextNode(utils.html(r.replace(/&nbsp;/g, ' ')))
          n.insertNode(a).selectNode(a).select()
        } else {
          var s = i.document.createDocumentFragment()
          utils.each(UE.filterNode(UE.htmlparser(t), i.options.filterTxtRules).children, function (e) {
            e.type == 'element' ? e.tagName == 'br' ? s.appendChild(i.document.createElement('br')) : dtd.$empty[e.tagName] || (utils.each(e.children, function (t) {
              t.type == 'element' ? t.tagName == 'br' ? s.appendChild(i.document.createElement('br')) : dtd.$empty[e.tagName] || s.appendChild(i.document.createTextNode(utils.html(t.innerText().replace(/&nbsp;/g, ' ')))) : s.appendChild(i.document.createTextNode(utils.html(t.data.replace(/&nbsp;/g, ' '))))
            }), s.lastChild.nodeName != 'BR' && s.appendChild(i.document.createElement('br'))) : s.appendChild(i.document.createTextNode(utils.html(e.data.replace(/&nbsp;/g, ' ')))), e.nextSibling() || s.lastChild.nodeName != 'BR' || s.removeChild(s.lastChild)
          }), n.insertNode(s).select()
        }
        return !0
      }
    }), e.addListener('keydown', function (e, t) {
      var i = this,
        n = t.keyCode || t.which
      if (n == 40) {
        var o, r = i.selection.getRange(),
          a = r.startContainer
        if (r.collapsed && (o = domUtils.findParentByTagName(r.startContainer, 'pre', !0)) && !o.nextSibling) {
          for (var s = o.lastChild; s && s.nodeName == 'BR';) s = s.previousSibling;
          (s === a || r.startContainer === o && r.startOffset == o.childNodes.length) && (i.execCommand('insertparagraph'), domUtils.preventDefault(t))
        }
      }
    }), e.addListener('delkeydown', function (t, i) {
      var n = this.selection.getRange()
      n.txtToElmBoundary(!0)
      var o = n.startContainer
      if (domUtils.isTagNode(o, 'pre') && n.collapsed && domUtils.isStartInblock(n)) {
        var r = e.document.createElement('p')
        return domUtils.fillNode(e.document, r), o.parentNode.insertBefore(r, o), domUtils.remove(o), n.setStart(r, 0).setCursor(!1, !0), domUtils.preventDefault(i), !0
      }
    })
  }, UE.commands.cleardoc = {
    execCommand: function (e) {
      var t = this,
        i = t.options.enterTag,
        n = t.selection.getRange()
      i == 'br' ? (t.body.innerHTML = '<br/>', n.setStart(t.body, 0).setCursor()) : (t.body.innerHTML = '<p>' + (ie ? '' : '<br/>') + '</p>', n.setStart(t.body.firstChild, 0).setCursor(!1, !0)), setTimeout(function () {
        t.fireEvent('clearDoc')
      }, 0)
    }
  }, UE.plugin.register('anchor', function () {
    return {
      bindEvents: {
        ready: function () {
          utils.cssRule('anchor', ".anchorclass{background: url('" + this.options.themePath + this.options.theme + "/images/anchor.gif') no-repeat scroll left center transparent;cursor: auto;display: inline-block;height: 16px;width: 15px;}", this.document)
        }
      },
      outputRule: function (e) {
        utils.each(e.getNodesByTagName('img'), function (e) {
          var t;
          (t = e.getAttr('anchorname')) && (e.tagName = 'a', e.setAttr({
            anchorname: '',
            name: t,
            'class': ''
          }))
        })
      },
      inputRule: function (e) {
        utils.each(e.getNodesByTagName('a'), function (e) {
          var t;
          (t = e.getAttr('name')) && !e.getAttr('href') && (e.tagName = 'img', e.setAttr({
            anchorname: e.getAttr('name'),
            'class': 'anchorclass'
          }), e.setAttr('name'))
        })
      },
      commands: {
        anchor: {
          execCommand: function (e, t) {
            var i = this.selection.getRange(),
              n = i.getClosedNode()
            if (n && n.getAttribute('anchorname')) t ? n.setAttribute('anchorname', t) : (i.setStartBefore(n).setCursor(), domUtils.remove(n))
            else if (t) {
              var o = this.document.createElement('img')
              i.collapse(!0), domUtils.setAttributes(o, {
                anchorname: t,
                'class': 'anchorclass'
              }), i.insertNode(o).setStartAfter(o).setCursor(!1, !0)
            }
          }
        }
      }
    }
  }), UE.plugins.wordcount = function () {
    var e = this
    e.setOpt('wordCount', !0), e.addListener('contentchange', function () {
      e.fireEvent('wordcount')
    })
    var t
    e.addListener('ready', function () {
      var e = this
      domUtils.on(e.body, 'keyup', function (i) {
        var n = i.keyCode || i.which,
          o = {
            16: 1,
            18: 1,
            20: 1,
            37: 1,
            38: 1,
            39: 1,
            40: 1
          }
        n in o || (clearTimeout(t), t = setTimeout(function () {
          e.fireEvent('wordcount')
        }, 200))
      })
    })
  }, UE.plugins.pagebreak = function () {
    function e (e) {
      if (domUtils.isEmptyBlock(e)) {
        for (var t, n = e.firstChild; n && n.nodeType == 1 && domUtils.isEmptyBlock(n);) t = n, n = n.firstChild
        !t && (t = e), domUtils.fillNode(i.document, t)
      }
    }

    function t (e) {
      return e && e.nodeType == 1 && e.tagName == 'HR' && e.className == 'pagebreak'
    }
    var i = this,
      n = ['td']
    i.setOpt('pageBreakTag', '_ueditor_page_break_tag_'), i.ready(function () {
      utils.cssRule('pagebreak', '.pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}', i.document)
    }), i.addInputRule(function (e) {
      e.traversal(function (e) {
        if (e.type == 'text' && e.data == i.options.pageBreakTag) {
          var t = UE.uNode.createElement('<hr class="pagebreak" noshade="noshade" size="5" style="-webkit-user-select: none;">')
          e.parentNode.insertBefore(t, e), e.parentNode.removeChild(e)
        }
      })
    }), i.addOutputRule(function (e) {
      utils.each(e.getNodesByTagName('hr'), function (e) {
        if (e.getAttr('class') == 'pagebreak') {
          var t = UE.uNode.createText(i.options.pageBreakTag)
          e.parentNode.insertBefore(t, e), e.parentNode.removeChild(e)
        }
      })
    }), i.commands.pagebreak = {
      execCommand: function () {
        var o = i.selection.getRange(),
          r = i.document.createElement('hr')
        domUtils.setAttributes(r, {
          'class': 'pagebreak',
          noshade: 'noshade',
          size: '5'
        }), domUtils.unSelectable(r)
        var a, s = domUtils.findParentByTagName(o.startContainer, n, !0),
          l = []
        if (s) {
          switch (s.tagName) {
            case 'TD':
              if (a = s.parentNode, a.previousSibling) a.parentNode.insertBefore(r, a), l = domUtils.findParents(r)
              else {
                var d = domUtils.findParentByTagName(a, 'table')
                d.parentNode.insertBefore(r, d), l = domUtils.findParents(r, !0)
              }
              a = l[1], r !== a && domUtils.breakParent(r, a), i.fireEvent('afteradjusttable', i.document)
          }
        } else {
          if (!o.collapsed) {
            o.deleteContents()
            for (var c = o.startContainer; !domUtils.isBody(c) && domUtils.isBlockElm(c) && domUtils.isEmptyNode(c);) o.setStartBefore(c).collapse(!0), domUtils.remove(c), c = o.startContainer
          }
          o.insertNode(r)
          for (var u, a = r.parentNode; !domUtils.isBody(a);) domUtils.breakParent(r, a), u = r.nextSibling, u && domUtils.isEmptyBlock(u) && domUtils.remove(u), a = r.parentNode
          u = r.nextSibling
          var m = r.previousSibling
          if (t(m) ? domUtils.remove(m) : m && e(m), u) t(u) ? domUtils.remove(u) : e(u), o.setEndAfter(r).collapse(!1)
          else {
            var f = i.document.createElement('p')
            r.parentNode.appendChild(f), domUtils.fillNode(i.document, f), o.setStart(f, 0).collapse(!0)
          }
          o.select(!0)
        }
      }
    }
  }, UE.plugin.register('wordimage', function () {
    var e = this,
      t = []
    return {
      commands: {
        wordimage: {
          execCommand: function () {
            for (var t, i = domUtils.getElementsByTagName(e.body, 'img'), n = [], o = 0; t = i[o++];) {
              var r = t.getAttribute('word_img')
              r && n.push(r)
            }
            return n
          },
          queryCommandState: function () {
            t = domUtils.getElementsByTagName(e.body, 'img')
            for (var i, n = 0; i = t[n++];) { if (i.getAttribute('word_img')) return 1 }
            return -1
          },
          notNeedUndo: !0
        }
      },
      inputRule: function (t) {
        utils.each(t.getNodesByTagName('img'), function (t) {
          var i = t.attrs,
            n = parseInt(i.width) < 128 || parseInt(i.height) < 43,
            o = e.options,
            r = o.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif'
          i.src && /^(?:(file:\/+))/.test(i.src) && t.setAttr({
            width: i.width,
            height: i.height,
            alt: i.alt,
            word_img: i.src,
            src: r,
            style: 'background:url(' + (n ? o.themePath + o.theme + '/images/word.gif' : o.langPath + o.lang + '/images/localimage.png') + ') no-repeat center center;border:1px solid #ddd'
          })
        })
      }
    }
  }), UE.plugins.dragdrop = function () {
    var e = this
    e.ready(function () {
      domUtils.on(this.body, 'dragend', function () {
        var t = e.selection.getRange(),
          i = t.getClosedNode() || e.selection.getStart()
        if (i && i.tagName == 'IMG') {
          for (var n, o = i.previousSibling;
            (n = i.nextSibling) && n.nodeType == 1 && n.tagName == 'SPAN' && !n.firstChild;) domUtils.remove(n);
          (!o || o.nodeType != 1 || domUtils.isEmptyBlock(o)) && o || n && (!n || domUtils.isEmptyBlock(n)) || (o && o.tagName == 'P' && !domUtils.isEmptyBlock(o) ? (o.appendChild(i), domUtils.moveChild(n, o), domUtils.remove(n)) : n && n.tagName == 'P' && !domUtils.isEmptyBlock(n) && n.insertBefore(i, n.firstChild), o && o.tagName == 'P' && domUtils.isEmptyBlock(o) && domUtils.remove(o), n && n.tagName == 'P' && domUtils.isEmptyBlock(n) && domUtils.remove(n), t.selectNode(i).select(), e.fireEvent('saveScene'))
        }
      })
    }), e.addListener('keyup', function (t, i) {
      var n = i.keyCode || i.which
      if (n == 13) {
        var o, r = e.selection.getRange();
        (o = domUtils.findParentByTagName(r.startContainer, 'p', !0)) && domUtils.getComputedStyle(o, 'text-align') == 'center' && domUtils.removeStyle(o, 'text-align')
      }
    })
  }, UE.plugins.undo = function () {
    function e (e, t) {
      if (e.length != t.length) return 0
      for (var i = 0, n = e.length; n > i; i++) { if (e[i] != t[i]) return 0 }
      return 1
    }

    function t (t, i) {
      return t.collapsed != i.collapsed ? 0 : e(t.startAddress, i.startAddress) && e(t.endAddress, i.endAddress) ? 1 : 0
    }

    function i () {
      this.list = [], this.index = 0, this.hasUndo = !1, this.hasRedo = !1, this.undo = function () {
        if (this.hasUndo) {
          if (!this.list[this.index - 1] && this.list.length == 1) return void this.reset()
          for (; this.list[this.index].content == this.list[this.index - 1].content;) { if (this.index--, this.index == 0) return this.restore(0) }
          this.restore(--this.index)
        }
      }, this.redo = function () {
        if (this.hasRedo) {
          for (; this.list[this.index].content == this.list[this.index + 1].content;) { if (this.index++, this.index == this.list.length - 1) return this.restore(this.index) }
          this.restore(++this.index)
        }
      }, this.restore = function () {
        var e = this.editor,
          t = this.list[this.index],
          i = UE.htmlparser(t.content.replace(s, ''))
        e.options.autoClearEmptyNode = !1, e.filterInputRule(i), e.options.autoClearEmptyNode = d, e.document.body.innerHTML = i.toHtml(), e.fireEvent('afterscencerestore'), browser.ie && utils.each(domUtils.getElementsByTagName(e.document, 'td th caption p'), function (t) {
          domUtils.isEmptyNode(t) && domUtils.fillNode(e.document, t)
        })
        try {
          var n = new dom.Range(e.document).moveToAddress(t.address)
          n.select(l[n.startContainer.nodeName.toLowerCase()])
        } catch (o) {}
        this.update(), this.clearKey(), e.fireEvent('reset', !0)
      }, this.getScene = function () {
        var e = this.editor,
          t = e.selection.getRange(),
          i = t.createAddress(!1, !0)
        e.fireEvent('beforegetscene')
        var n = UE.htmlparser(e.body.innerHTML)
        e.options.autoClearEmptyNode = !1, e.filterOutputRule(n), e.options.autoClearEmptyNode = d
        var o = n.toHtml()
        return e.fireEvent('aftergetscene'), {
          address: i,
          content: o
        }
      }, this.save = function (e, i) {
        clearTimeout(n)
        var a = this.getScene(i),
          s = this.list[this.index]
        s && s.content != a.content && o.trigger('contentchange'), s && s.content == a.content && (e ? 1 : t(s.address, a.address)) || (this.list = this.list.slice(0, this.index + 1), this.list.push(a), this.list.length > r && this.list.shift(), this.index = this.list.length - 1, this.clearKey(), this.update())
      }, this.update = function () {
        this.hasRedo = !!this.list[this.index + 1], this.hasUndo = !!this.list[this.index - 1]
      }, this.reset = function () {
        this.list = [], this.index = 0, this.hasUndo = !1, this.hasRedo = !1, this.clearKey()
      }, this.clearKey = function () {
        m = 0, c = null
      }
    }
    var n, o = this,
      r = o.options.maxUndoCount || 20,
      a = o.options.maxInputCount || 20,
      s = new RegExp(domUtils.fillChar + '|</hr>', 'gi'),
      l = {
        ol: 1,
        ul: 1,
        table: 1,
        tbody: 1,
        tr: 1,
        body: 1
      },
      d = o.options.autoClearEmptyNode
    o.undoManger = new i(), o.undoManger.editor = o, o.addListener('saveScene', function () {
      var e = Array.prototype.splice.call(arguments, 1)
      this.undoManger.save.apply(this.undoManger, e)
    }), o.addListener('reset', function (e, t) {
      t || this.undoManger.reset()
    }), o.commands.redo = o.commands.undo = {
      execCommand: function (e) {
        this.undoManger[e]()
      },
      queryCommandState: function (e) {
        return this.undoManger['has' + (e.toLowerCase() == 'undo' ? 'Undo' : 'Redo')] ? 0 : -1
      },
      notNeedUndo: 1
    }
    var c, u = {
        16: 1,
        17: 1,
        18: 1,
        37: 1,
        38: 1,
        39: 1,
        40: 1
      },
      m = 0,
      f = !1
    o.addListener('ready', function () {
      domUtils.on(this.body, 'compositionstart', function () {
        f = !0
      }), domUtils.on(this.body, 'compositionend', function () {
        f = !1
      })
    }), o.addshortcutkey({
      Undo: 'ctrl+90',
      Redo: 'ctrl+89'
    })
    var h = !0
    o.addListener('keydown', function (e, t) {
      function i (e) {
        e.undoManger.save(!1, !0), e.fireEvent('selectionchange')
      }
      var o = this,
        r = t.keyCode || t.which
      if (!(u[r] || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
        if (f) return
        if (!o.selection.getRange().collapsed) return o.undoManger.save(!1, !0), void (h = !1)
        o.undoManger.list.length == 0 && o.undoManger.save(!0), clearTimeout(n), n = setTimeout(function () {
          if (f) {
            var e = setInterval(function () {
              f || (i(o), clearInterval(e))
            }, 300)
          } else i(o)
        }, 200), c = r, m++, m >= a && i(o)
      }
    }), o.addListener('keyup', function (e, t) {
      var i = t.keyCode || t.which
      if (!(u[i] || t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
        if (f) return
        h || (this.undoManger.save(!1, !0), h = !0)
      }
    }), o.stopCmdUndo = function () {
      o.__hasEnterExecCommand = !0
    }, o.startCmdUndo = function () {
      o.__hasEnterExecCommand = !1
    }
  }, UE.plugin.register('copy', function () {
    function e () {
      ZeroClipboard.config({
        debug: !1,
        swfPath: t.options.UEDITOR_HOME_URL + 'third-party/zeroclipboard/ZeroClipboard.swf'
      })
      var e = t.zeroclipboard = new ZeroClipboard()
      e.on('copy', function (e) {
        var i = e.client,
          n = t.selection.getRange(),
          o = document.createElement('div')
        o.appendChild(n.cloneContents()), i.setText(o.innerText || o.textContent), i.setHtml(o.innerHTML), n.select()
      }), e.on('mouseover mouseout', function (e) {
        var t = e.target
        e.type == 'mouseover' ? domUtils.addClass(t, 'edui-state-hover') : e.type == 'mouseout' && domUtils.removeClasses(t, 'edui-state-hover')
      }), e.on('wrongflash noflash', function () {
        ZeroClipboard.destroy()
      })
    }
    var t = this
    return {
      bindEvents: {
        ready: function () {
          browser.ie || (window.ZeroClipboard ? e() : utils.loadFile(document, {
            src: t.options.UEDITOR_HOME_URL + 'third-party/zeroclipboard/ZeroClipboard.js',
            tag: 'script',
            type: 'text/javascript',
            defer: 'defer'
          }, function () {
            e()
          }))
        }
      },
      commands: {
        copy: {
          execCommand: function (e) {
            t.document.execCommand('copy') || alert(t.getLang('copymsg'))
          }
        }
      }
    }
  }), UE.plugins.paste = function () {
    function e (e) {
      var t = this.document
      if (!t.getElementById('baidu_pastebin')) {
        var i = this.selection.getRange(),
          n = i.createBookmark(),
          o = t.createElement('div')
        o.id = 'baidu_pastebin', browser.webkit && o.appendChild(t.createTextNode(domUtils.fillChar + domUtils.fillChar)), t.body.appendChild(o), n.start.style.display = '', o.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;left:-1000px;white-space:nowrap;top:' + domUtils.getXY(n.start).y + 'px', i.selectNodeContents(o).select(!0), setTimeout(function () {
          if (browser.webkit) {
            for (var r, a = 0, s = t.querySelectorAll('#baidu_pastebin'); r = s[a++];) {
              if (!domUtils.isEmptyNode(r)) {
                o = r
                break
              }
              domUtils.remove(r)
            }
          }
          try {
            o.parentNode.removeChild(o)
          } catch (l) {}
          i.moveToBookmark(n).select(!0), e(o)
        }, 0)
      }
    }

    function t (e) {
      return e.replace(/<(\/?)([\w\-]+)([^>]*)>/gi, function (e, t, i, n) {
        return i = i.toLowerCase(), {
          img: 1
        }[i] ? e : (n = n.replace(/([\w\-]*?)\s*=\s*(("([^"]*)")|('([^']*)')|([^\s>]+))/gi, function (e, t, i) {
            return {
              src: 1,
              href: 1,
              name: 1
            }[t.toLowerCase()] ? t + '=' + i + ' ' : ''
          }), {
            span: 1,
            div: 1
          }[i] ? '' : '<' + t + i + ' ' + utils.trim(n) + '>')
      })
    }

    function i (e) {
      var i
      if (e.firstChild) {
        for (var s, l = domUtils.getElementsByTagName(e, 'span'), d = 0; s = l[d++];) s.id != '_baidu_cut_start' && s.id != '_baidu_cut_end' || domUtils.remove(s)
        if (browser.webkit) {
          for (var c, u = e.querySelectorAll('div br'), d = 0; c = u[d++];) {
            var m = c.parentNode
            m.tagName == 'DIV' && m.childNodes.length == 1 && (m.innerHTML = '<p><br/></p>', domUtils.remove(m))
          }
          for (var f, h = e.querySelectorAll('#baidu_pastebin'), d = 0; f = h[d++];) {
            var p = n.document.createElement('p')
            for (f.parentNode.insertBefore(p, f); f.firstChild;) p.appendChild(f.firstChild)
            domUtils.remove(f)
          }
          for (var g, v = e.querySelectorAll('meta'), d = 0; g = v[d++];) domUtils.remove(g)
          var u = e.querySelectorAll('br')
          for (d = 0; g = u[d++];) /^apple-/i.test(g.className) && domUtils.remove(g)
        }
        if (browser.gecko) {
          var b = e.querySelectorAll('[_moz_dirty]')
          for (d = 0; g = b[d++];) g.removeAttribute('_moz_dirty')
        }
        if (!browser.ie) { for (var g, y = e.querySelectorAll('span.Apple-style-span'), d = 0; g = y[d++];) domUtils.remove(g, !0) }
        i = e.innerHTML, i = UE.filterWord(i)
        var C = UE.htmlparser(i)
        if (n.options.filterRules && UE.filterNode(C, n.options.filterRules), n.filterInputRule(C), browser.webkit) {
          var N = C.lastChild()
          N && N.type == 'element' && N.tagName == 'br' && C.removeChild(N), utils.each(n.body.querySelectorAll('div'), function (e) {
            domUtils.isEmptyBlock(e) && domUtils.remove(e, !0)
          })
        }
        if (i = {
          html: C.toHtml()
        }, n.fireEvent('beforepaste', i, C), !i.html) return
        C = UE.htmlparser(i.html, !0), n.queryCommandState('pasteplain') === 1 ? n.execCommand('insertHtml', UE.filterNode(C, n.options.filterTxtRules).toHtml(), !0) : (UE.filterNode(C, n.options.filterTxtRules), o = C.toHtml(), r = i.html, a = n.selection.getRange().createAddress(!0), n.execCommand('insertHtml', n.getOpt('retainOnlyLabelPasted') === !0 ? t(r) : r, !0)), n.fireEvent('afterpaste', i)
      }
    }
    var n = this
    n.setOpt({
      retainOnlyLabelPasted: !1
    })
    var o, r, a
    n.addListener('pasteTransfer', function (e, i) {
      if (a && o && r && o != r) {
        var s = n.selection.getRange()
        if (s.moveToAddress(a, !0), !s.collapsed) {
          for (; !domUtils.isBody(s.startContainer);) {
            var l = s.startContainer
            if (l.nodeType == 1) {
              if (l = l.childNodes[s.startOffset], !l) {
                s.setStartBefore(s.startContainer)
                continue
              }
              var d = l.previousSibling
              d && d.nodeType == 3 && new RegExp('^[\n\r	 ' + domUtils.fillChar + ']*$').test(d.nodeValue) && s.setStartBefore(d)
            }
            if (s.startOffset != 0) break
            s.setStartBefore(s.startContainer)
          }
          for (; !domUtils.isBody(s.endContainer);) {
            var c = s.endContainer
            if (c.nodeType == 1) {
              if (c = c.childNodes[s.endOffset], !c) {
                s.setEndAfter(s.endContainer)
                continue
              }
              var u = c.nextSibling
              u && u.nodeType == 3 && new RegExp('^[\n\r	' + domUtils.fillChar + ']*$').test(u.nodeValue) && s.setEndAfter(u)
            }
            if (s.endOffset != s.endContainer[s.endContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length) break
            s.setEndAfter(s.endContainer)
          }
        }
        s.deleteContents(), s.select(!0), n.__hasEnterExecCommand = !0
        var m = r
        i === 2 ? m = t(m) : i && (m = o), n.execCommand('inserthtml', m, !0), n.__hasEnterExecCommand = !1
        for (var f = n.selection.getRange(); !domUtils.isBody(f.startContainer) && !f.startOffset && f.startContainer[f.startContainer.nodeType == 3 ? 'nodeValue' : 'childNodes'].length;) f.setStartBefore(f.startContainer)
        var h = f.createAddress(!0)
        a.endAddress = h.startAddress
      }
    }), n.addListener('ready', function () {
      domUtils.on(n.body, 'cut', function () {
        var e = n.selection.getRange()
        !e.collapsed && n.undoManger && n.undoManger.save()
      }), domUtils.on(n.body, browser.ie || browser.opera ? 'keydown' : 'paste', function (t) {
        (!browser.ie && !browser.opera || (t.ctrlKey || t.metaKey) && t.keyCode == '86') && e.call(n, function (e) {
          i(e)
        })
      })
    }), n.commands.paste = {
      execCommand: function (t) {
        browser.ie ? (e.call(n, function (e) {
          i(e)
        }), n.document.execCommand('paste')) : alert(n.getLang('pastemsg'))
      }
    }
  }, UE.plugins.pasteplain = function () {
    var e = this
    e.setOpt({
      pasteplain: !1,
      filterTxtRules: (function () {
        function e (e) {
          e.tagName = 'p', e.setStyle()
        }

        function t (e) {
          e.parentNode.removeChild(e, !0)
        }
        return {
          '-': 'script style object iframe embed input select',
          p: {
            $: {}
          },
          br: {
            $: {}
          },
          div: function (e) {
            for (var t, i = UE.uNode.createElement('p'); t = e.firstChild();) t.type != 'text' && UE.dom.dtd.$block[t.tagName] ? i.firstChild() ? (e.parentNode.insertBefore(i, e), i = UE.uNode.createElement('p')) : e.parentNode.insertBefore(t, e) : i.appendChild(t)
            i.firstChild() && e.parentNode.insertBefore(i, e), e.parentNode.removeChild(e)
          },
          ol: t,
          ul: t,
          dl: t,
          dt: t,
          dd: t,
          li: t,
          caption: e,
          th: e,
          tr: e,
          h1: e,
          h2: e,
          h3: e,
          h4: e,
          h5: e,
          h6: e,
          td: function (e) {
            var t = !!e.innerText()
            t && e.parentNode.insertAfter(UE.uNode.createText(' &nbsp; &nbsp;'), e), e.parentNode.removeChild(e, e.innerText())
          }
        }
      }())
    })
    var t = e.options.pasteplain
    e.commands.pasteplain = {
      queryCommandState: function () {
        return t ? 1 : 0
      },
      execCommand: function () {
        t = 0 | !t
      },
      notNeedUndo: 1
    }
  }, UE.plugins.list = function () {
    function e (e) {
      var t = []
      for (var i in e) t.push(i)
      return t
    }

    function t (e) {
      var t = e.className
      return domUtils.hasClass(e, /custom_/) ? t.match(/custom_(\w+)/)[1] : domUtils.getStyle(e, 'list-style-type')
    }

    function i (e, i) {
      utils.each(domUtils.getElementsByTagName(e, 'ol ul'), function (r) {
        if (domUtils.inDoc(r, e)) {
          var a = r.parentNode
          if (a.tagName == r.tagName) {
            var s = t(r) || (r.tagName == 'OL' ? 'decimal' : 'disc'),
              l = t(a) || (a.tagName == 'OL' ? 'decimal' : 'disc')
            if (s == l) {
              var u = utils.indexOf(c[r.tagName], s)
              u = u + 1 == c[r.tagName].length ? 0 : u + 1, o(r, c[r.tagName][u])
            }
          }
          var m = 0,
            f = 2
          domUtils.hasClass(r, /custom_/) ? /[ou]l/i.test(a.tagName) && domUtils.hasClass(a, /custom_/) || (f = 1) : /[ou]l/i.test(a.tagName) && domUtils.hasClass(a, /custom_/) && (f = 3)
          var h = domUtils.getStyle(r, 'list-style-type')
          h && (r.style.cssText = 'list-style-type:' + h), r.className = utils.trim(r.className.replace(/list-paddingleft-\w+/, '')) + ' list-paddingleft-' + f, utils.each(domUtils.getElementsByTagName(r, 'li'), function (e) {
            if (e.style.cssText && (e.style.cssText = ''), !e.firstChild) return void domUtils.remove(e)
            if (e.parentNode === r) {
              if (m++, domUtils.hasClass(r, /custom_/)) {
                var i = 1,
                  n = t(r)
                if (r.tagName == 'OL') {
                  if (n) {
                    switch (n) {
                      case 'cn':
                      case 'cn1':
                      case 'cn2':
                        m > 10 && (m % 10 == 0 || m > 10 && m < 20) ? i = 2 : m > 20 && (i = 3)
                        break
                      case 'num2':
                        m > 9 && (i = 2)
                    }
                  }
                  e.className = 'list-' + d[n] + m + ' list-' + n + '-paddingleft-' + i
                } else e.className = 'list-' + d[n] + ' list-' + n + '-paddingleft'
              } else e.className = e.className.replace(/list-[\w\-]+/gi, '')
              var o = e.getAttribute('class')
              o === null || o.replace(/\s/g, '') || domUtils.removeAttributes(e, 'class')
            }
          }), !i && n(r, r.tagName.toLowerCase(), t(r) || domUtils.getStyle(r, 'list-style-type'), !0)
        }
      })
    }

    function n (e, n, o, r) {
      var a = e.nextSibling
      a && a.nodeType == 1 && a.tagName.toLowerCase() == n && (t(a) || domUtils.getStyle(a, 'list-style-type') || (n == 'ol' ? 'decimal' : 'disc')) == o && (domUtils.moveChild(a, e), a.childNodes.length == 0 && domUtils.remove(a)), a && domUtils.isFillChar(a) && domUtils.remove(a)
      var s = e.previousSibling
      s && s.nodeType == 1 && s.tagName.toLowerCase() == n && (t(s) || domUtils.getStyle(s, 'list-style-type') || (n == 'ol' ? 'decimal' : 'disc')) == o && domUtils.moveChild(e, s), s && domUtils.isFillChar(s) && domUtils.remove(s), !r && domUtils.isEmptyBlock(e) && domUtils.remove(e), t(e) && i(e.ownerDocument, !0)
    }

    function o (e, t) {
      d[t] && (e.className = 'custom_' + t)
      try {
        domUtils.setStyle(e, 'list-style-type', t)
      } catch (i) {}
    }

    function r (e) {
      var t = e.previousSibling
      t && domUtils.isEmptyBlock(t) && domUtils.remove(t), t = e.nextSibling, t && domUtils.isEmptyBlock(t) && domUtils.remove(t)
    }

    function a (e) {
      for (; e && !domUtils.isBody(e);) {
        if (e.nodeName == 'TABLE') return null
        if (e.nodeName == 'LI') return e
        e = e.parentNode
      }
    }
    var s = this,
      l = {
        TD: 1,
        PRE: 1,
        BLOCKQUOTE: 1
      },
      d = {
        cn: 'cn-1-',
        cn1: 'cn-2-',
        cn2: 'cn-3-',
        num: 'num-1-',
        num1: 'num-2-',
        num2: 'num-3-',
        dash: 'dash',
        dot: 'dot'
      }
    s.setOpt({
      autoTransWordToList: !1,
      insertorderedlist: {
        num: '',
        num1: '',
        num2: '',
        cn: '',
        cn1: '',
        cn2: '',
        decimal: '',
        'lower-alpha': '',
        'lower-roman': '',
        'upper-alpha': '',
        'upper-roman': ''
      },
      insertunorderedlist: {
        circle: '',
        disc: '',
        square: '',
        dash: '',
        dot: ''
      },
      listDefaultPaddingLeft: '30',
      listiconpath: 'http://bs.baidu.com/listicon/',
      maxListLevel: -1,
      disablePInList: !1
    })
    var c = {
        OL: e(s.options.insertorderedlist),
        UL: e(s.options.insertunorderedlist)
      },
      u = s.options.listiconpath
    for (var m in d) s.options.insertorderedlist.hasOwnProperty(m) || s.options.insertunorderedlist.hasOwnProperty(m) || delete d[m]
    s.ready(function () {
      var e = []
      for (var t in d) {
        if (t == 'dash' || t == 'dot') e.push('li.list-' + d[t] + '{background-image:url(' + u + d[t] + '.gif)}'), e.push('ul.custom_' + t + '{list-style:none;}ul.custom_' + t + ' li{background-position:0 3px;background-repeat:no-repeat}')
        else {
          for (var i = 0; i < 99; i++) e.push('li.list-' + d[t] + i + '{background-image:url(' + u + 'list-' + d[t] + i + '.gif)}')
          e.push('ol.custom_' + t + '{list-style:none;}ol.custom_' + t + ' li{background-position:0 3px;background-repeat:no-repeat}')
        }
        switch (t) {
          case 'cn':
            e.push('li.list-' + t + '-paddingleft-1{padding-left:25px}'), e.push('li.list-' + t + '-paddingleft-2{padding-left:40px}'), e.push('li.list-' + t + '-paddingleft-3{padding-left:55px}')
            break
          case 'cn1':
            e.push('li.list-' + t + '-paddingleft-1{padding-left:30px}'), e.push('li.list-' + t + '-paddingleft-2{padding-left:40px}'), e.push('li.list-' + t + '-paddingleft-3{padding-left:55px}')
            break
          case 'cn2':
            e.push('li.list-' + t + '-paddingleft-1{padding-left:40px}'), e.push('li.list-' + t + '-paddingleft-2{padding-left:55px}'), e.push('li.list-' + t + '-paddingleft-3{padding-left:68px}')
            break
          case 'num':
          case 'num1':
            e.push('li.list-' + t + '-paddingleft-1{padding-left:25px}')
            break
          case 'num2':
            e.push('li.list-' + t + '-paddingleft-1{padding-left:35px}'), e.push('li.list-' + t + '-paddingleft-2{padding-left:40px}')
            break
          case 'dash':
            e.push('li.list-' + t + '-paddingleft{padding-left:35px}')
            break
          case 'dot':
            e.push('li.list-' + t + '-paddingleft{padding-left:20px}')
        }
      }
      e.push('.list-paddingleft-1{padding-left:0}'), e.push('.list-paddingleft-2{padding-left:' + s.options.listDefaultPaddingLeft + 'px}'), e.push('.list-paddingleft-3{padding-left:' + 2 * s.options.listDefaultPaddingLeft + 'px}'), utils.cssRule('list', 'ol,ul{margin:0;pading:0;' + (browser.ie ? '' : 'width:95%') + '}li{clear:both;}' + e.join('\n'), s.document)
    }), s.ready(function () {
      domUtils.on(s.body, 'cut', function () {
        setTimeout(function () {
          var e, t = s.selection.getRange()
          if (!t.collapsed && (e = domUtils.findParentByTagName(t.startContainer, 'li', !0)) && !e.nextSibling && domUtils.isEmptyBlock(e)) {
            var i, n = e.parentNode
            if (i = n.previousSibling) domUtils.remove(n), t.setStartAtLast(i).collapse(!0), t.select(!0)
            else if (i = n.nextSibling) domUtils.remove(n), t.setStartAtFirst(i).collapse(!0), t.select(!0)
            else {
              var o = s.document.createElement('p')
              domUtils.fillNode(s.document, o), n.parentNode.insertBefore(o, n), domUtils.remove(n), t.setStart(o, 0).collapse(!0), t.select(!0)
            }
          }
        })
      })
    }), s.addListener('beforepaste', function (e, i) {
      var n, o = this,
        r = o.selection.getRange(),
        a = UE.htmlparser(i.html, !0)
      if (n = domUtils.findParentByTagName(r.startContainer, 'li', !0)) {
        var s = n.parentNode,
          l = s.tagName == 'OL' ? 'ul' : 'ol'
        utils.each(a.getNodesByTagName(l), function (i) {
          if (i.tagName = s.tagName, i.setAttr(), i.parentNode === a) e = t(s) || (s.tagName == 'OL' ? 'decimal' : 'disc')
          else {
            var n = i.parentNode.getAttr('class')
            e = n && /custom_/.test(n) ? n.match(/custom_(\w+)/)[1] : i.parentNode.getStyle('list-style-type'), e || (e = s.tagName == 'OL' ? 'decimal' : 'disc')
          }
          var o = utils.indexOf(c[s.tagName], e)
          i.parentNode !== a && (o = o + 1 == c[s.tagName].length ? 0 : o + 1)
          var r = c[s.tagName][o]
          d[r] ? i.setAttr('class', 'custom_' + r) : i.setStyle('list-style-type', r)
        })
      }
      i.html = a.toHtml()
    }), s.getOpt('disablePInList') === !0 && s.addOutputRule(function (e) {
      utils.each(e.getNodesByTagName('li'), function (e) {
        var t = [],
          i = 0
        utils.each(e.children, function (n) {
          if (n.tagName == 'p') {
            for (var o; o = n.children.pop();) t.splice(i, 0, o), o.parentNode = e, lastNode = o
            if (o = t[t.length - 1], !o || o.type != 'element' || o.tagName != 'br') {
              var r = UE.uNode.createElement('br')
              r.parentNode = e, t.push(r)
            }
            i = t.length
          }
        }), t.length && (e.children = t)
      })
    }), s.addInputRule(function (e) {
      function t (e, t) {
        var o = t.firstChild()
        if (o && o.type == 'element' && o.tagName == 'span' && /Wingdings|Symbol/.test(o.getStyle('font-family'))) {
          for (var r in n) { if (n[r] == o.data) return r }
          return 'disc'
        }
        for (var r in i) { if (i[r].test(e)) return r }
      }
      if (utils.each(e.getNodesByTagName('li'), function (e) {
        for (var t, i = UE.uNode.createElement('p'), n = 0; t = e.children[n];) t.type == 'text' || dtd.p[t.tagName] ? i.appendChild(t) : i.firstChild() ? (e.insertBefore(i, t), i = UE.uNode.createElement('p'), n += 2) : n++;
        (i.firstChild() && !i.parentNode || !e.firstChild()) && e.appendChild(i), i.firstChild() || i.innerHTML(browser.ie ? '&nbsp;' : '<br/>')
        var o = e.firstChild(),
          r = o.lastChild()
        r && r.type == 'text' && /^\s*$/.test(r.data) && o.removeChild(r)
      }), s.options.autoTransWordToList) {
        var i = {
            num1: /^\d+\)/,
            decimal: /^\d+\./,
            'lower-alpha': /^[a-z]+\)/,
            'upper-alpha': /^[A-Z]+\./,
            cn: /^[\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+[\u3001]/,
            cn2: /^\([\u4E00\u4E8C\u4E09\u56DB\u516d\u4e94\u4e03\u516b\u4e5d]+\)/
          },
          n = {
            square: 'n'
          }
        utils.each(e.getNodesByTagName('p'), function (e) {
          function n (e, t, n) {
            if (e.tagName == 'ol') {
              if (browser.ie) {
                var o = t.firstChild()
                o.type == 'element' && o.tagName == 'span' && i[n].test(o.innerText()) && t.removeChild(o)
              } else t.innerHTML(t.innerHTML().replace(i[n], ''))
            } else t.removeChild(t.firstChild())
            var r = UE.uNode.createElement('li')
            r.appendChild(t), e.appendChild(r)
          }
          if (e.getAttr('class') == 'MsoListParagraph') {
            e.setStyle('margin', ''), e.setStyle('margin-left', ''), e.setAttr('class', '')
            var o, r = e,
              a = e
            if (e.parentNode.tagName != 'li' && (o = t(e.innerText(), e))) {
              var l = UE.uNode.createElement(s.options.insertorderedlist.hasOwnProperty(o) ? 'ol' : 'ul')
              for (d[o] ? l.setAttr('class', 'custom_' + o) : l.setStyle('list-style-type', o); e && e.parentNode.tagName != 'li' && t(e.innerText(), e);) r = e.nextSibling(), r || e.parentNode.insertBefore(l, e), n(l, e, o), e = r
              !l.parentNode && e && e.parentNode && e.parentNode.insertBefore(l, e)
            }
            var c = a.firstChild()
            c && c.type == 'element' && c.tagName == 'span' && /^\s*(&nbsp;)+\s*$/.test(c.innerText()) && c.parentNode.removeChild(c)
          }
        })
      }
    }), s.addListener('contentchange', function () {
      i(s.document)
    }), s.addListener('keydown', function (e, t) {
      function i () {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1, s.fireEvent('contentchange'), s.undoManger && s.undoManger.save()
      }

      function n (e, t) {
        for (; e && !domUtils.isBody(e);) {
          if (t(e)) return null
          if (e.nodeType == 1 && /[ou]l/i.test(e.tagName)) return e
          e = e.parentNode
        }
        return null
      }
      var o = t.keyCode || t.which
      if (o == 13 && !t.shiftKey) {
        var a = s.selection.getRange(),
          l = domUtils.findParent(a.startContainer, function (e) {
            return domUtils.isBlockElm(e)
          }, !0),
          d = domUtils.findParentByTagName(a.startContainer, 'li', !0)
        if (l && l.tagName != 'PRE' && !d) {
          var c = l.innerHTML.replace(new RegExp(domUtils.fillChar, 'g'), '');
          /^\s*1\s*\.[^\d]/.test(c) && (l.innerHTML = c.replace(/^\s*1\s*\./, ''), a.setStartAtLast(l).collapse(!0).select(), s.__hasEnterExecCommand = !0, s.execCommand('insertorderedlist'), s.__hasEnterExecCommand = !1)
        }
        var u = s.selection.getRange(),
          m = n(u.startContainer, function (e) {
            return e.tagName == 'TABLE'
          }),
          f = u.collapsed ? m : n(u.endContainer, function (e) {
            return e.tagName == 'TABLE'
          })
        if (m && f && m === f) {
          if (!u.collapsed) {
            if (m = domUtils.findParentByTagName(u.startContainer, 'li', !0), f = domUtils.findParentByTagName(u.endContainer, 'li', !0), !m || !f || m !== f) {
              var h = u.cloneRange(),
                p = h.collapse(!1).createBookmark()
              u.deleteContents(), h.moveToBookmark(p)
              var d = domUtils.findParentByTagName(h.startContainer, 'li', !0)
              return r(d), h.select(), void i()
            }
            if (u.deleteContents(), d = domUtils.findParentByTagName(u.startContainer, 'li', !0), d && domUtils.isEmptyBlock(d)) {
              return N = d.previousSibling, next = d.nextSibling, b = s.document.createElement('p'), domUtils.fillNode(s.document, b), g = d.parentNode, N && next ? (u.setStart(next, 0).collapse(!0).select(!0), domUtils.remove(d)) : ((N || next) && N ? d.parentNode.parentNode.insertBefore(b, g.nextSibling) : g.parentNode.insertBefore(b, g),
              domUtils.remove(d), g.firstChild || domUtils.remove(g), u.setStart(b, 0).setCursor()), void i()
            }
          }
          if (d = domUtils.findParentByTagName(u.startContainer, 'li', !0)) {
            if (domUtils.isEmptyBlock(d)) {
              p = u.createBookmark()
              var g = d.parentNode
              if (d !== g.lastChild ? (domUtils.breakParent(d, g), r(d)) : (g.parentNode.insertBefore(d, g.nextSibling), domUtils.isEmptyNode(g) && domUtils.remove(g)), !dtd.$list[d.parentNode.tagName]) {
                if (domUtils.isBlockElm(d.firstChild)) domUtils.remove(d, !0)
                else {
                  for (b = s.document.createElement('p'), d.parentNode.insertBefore(b, d); d.firstChild;) b.appendChild(d.firstChild)
                  domUtils.remove(d)
                }
              }
              u.moveToBookmark(p).select()
            } else {
              var v = d.firstChild
              if (!v || !domUtils.isBlockElm(v)) {
                var b = s.document.createElement('p')
                for (!d.firstChild && domUtils.fillNode(s.document, b); d.firstChild;) b.appendChild(d.firstChild)
                d.appendChild(b), v = b
              }
              var y = s.document.createElement('span')
              u.insertNode(y), domUtils.breakParent(y, d)
              var C = y.nextSibling
              v = C.firstChild, v || (b = s.document.createElement('p'), domUtils.fillNode(s.document, b), C.appendChild(b), v = b), domUtils.isEmptyNode(v) && (v.innerHTML = '', domUtils.fillNode(s.document, v)), u.setStart(v, 0).collapse(!0).shrinkBoundary().select(), domUtils.remove(y)
              var N = C.previousSibling
              N && domUtils.isEmptyBlock(N) && (N.innerHTML = '<p></p>', domUtils.fillNode(s.document, N.firstChild))
            }
            i()
          }
        }
      }
      if (o == 8 && (u = s.selection.getRange(), u.collapsed && domUtils.isStartInblock(u) && (h = u.cloneRange().trimBoundary(), d = domUtils.findParentByTagName(u.startContainer, 'li', !0), d && domUtils.isStartInblock(h)))) {
        if (m = domUtils.findParentByTagName(u.startContainer, 'p', !0), m && m !== d.firstChild) {
          var g = domUtils.findParentByTagName(m, ['ol', 'ul'])
          return domUtils.breakParent(m, g), r(m), s.fireEvent('contentchange'), u.setStart(m, 0).setCursor(!1, !0), s.fireEvent('saveScene'), void domUtils.preventDefault(t)
        }
        if (d && (N = d.previousSibling)) {
          if (o == 46 && d.childNodes.length) return
          if (dtd.$list[N.tagName] && (N = N.lastChild), s.undoManger && s.undoManger.save(), v = d.firstChild, domUtils.isBlockElm(v)) {
            if (domUtils.isEmptyNode(v)) { for (N.appendChild(v), u.setStart(v, 0).setCursor(!1, !0); d.firstChild;) N.appendChild(d.firstChild) } else y = s.document.createElement('span'), u.insertNode(y), domUtils.isEmptyBlock(N) && (N.innerHTML = ''), domUtils.moveChild(d, N), u.setStartBefore(y).collapse(!0).select(!0), domUtils.remove(y)
          } else if (domUtils.isEmptyNode(d)) {
            var b = s.document.createElement('p')
            N.appendChild(b), u.setStart(b, 0).setCursor()
          } else { for (u.setEnd(N, N.childNodes.length).collapse().select(!0); d.firstChild;) N.appendChild(d.firstChild) }
          return domUtils.remove(d), s.fireEvent('contentchange'), s.fireEvent('saveScene'), void domUtils.preventDefault(t)
        }
        if (d && !d.previousSibling) {
          var g = d.parentNode,
            p = u.createBookmark()
          if (domUtils.isTagNode(g.parentNode, 'ol ul')) g.parentNode.insertBefore(d, g), domUtils.isEmptyNode(g) && domUtils.remove(g)
          else {
            for (; d.firstChild;) g.parentNode.insertBefore(d.firstChild, g)
            domUtils.remove(d), domUtils.isEmptyNode(g) && domUtils.remove(g)
          }
          return u.moveToBookmark(p).setCursor(!1, !0), s.fireEvent('contentchange'), s.fireEvent('saveScene'), void domUtils.preventDefault(t)
        }
      }
    }), s.addListener('keyup', function (e, i) {
      var o = i.keyCode || i.which
      if (o == 8) {
        var r, a = s.selection.getRange();
        (r = domUtils.findParentByTagName(a.startContainer, ['ol', 'ul'], !0)) && n(r, r.tagName.toLowerCase(), t(r) || domUtils.getComputedStyle(r, 'list-style-type'), !0)
      }
    }), s.addListener('tabkeydown', function () {
      function e (e) {
        if (s.options.maxListLevel != -1) {
          for (var t = e.parentNode, i = 0;
            /[ou]l/i.test(t.tagName);) i++, t = t.parentNode
          if (i >= s.options.maxListLevel) return !0
        }
      }
      var i = s.selection.getRange(),
        r = domUtils.findParentByTagName(i.startContainer, 'li', !0)
      if (r) {
        var a
        if (!i.collapsed) {
          s.fireEvent('saveScene'), a = i.createBookmark()
          for (var l, d, u = 0, m = domUtils.findParents(r); d = m[u++];) {
            if (domUtils.isTagNode(d, 'ol ul')) {
              l = d
              break
            }
          }
          var f = r
          if (a.end) {
            for (; f && !(domUtils.getPosition(f, a.end) & domUtils.POSITION_FOLLOWING);) {
              if (e(f)) {
                f = domUtils.getNextDomNode(f, !1, null, function (e) {
                  return e !== l
                })
              } else {
                var h = f.parentNode,
                  p = s.document.createElement(h.tagName),
                  g = utils.indexOf(c[p.tagName], t(h) || domUtils.getComputedStyle(h, 'list-style-type')),
                  v = g + 1 == c[p.tagName].length ? 0 : g + 1,
                  b = c[p.tagName][v]
                for (o(p, b), h.insertBefore(p, f); f && !(domUtils.getPosition(f, a.end) & domUtils.POSITION_FOLLOWING);) {
                  if (r = f.nextSibling, p.appendChild(f), !r || domUtils.isTagNode(r, 'ol ul')) {
                    if (r) {
 for (;
                      (r = r.firstChild) && r.tagName != 'LI';); 
} else {
                      r = domUtils.getNextDomNode(f, !1, null, function (e) {
                        return e !== l
                      })
                    }
                    break
                  }
                  f = r
                }
                n(p, p.tagName.toLowerCase(), b), f = r
              }
            }
          }
          return s.fireEvent('contentchange'), i.moveToBookmark(a).select(), !0
        }
        if (e(r)) return !0
        var h = r.parentNode,
          p = s.document.createElement(h.tagName),
          g = utils.indexOf(c[p.tagName], t(h) || domUtils.getComputedStyle(h, 'list-style-type'))
        g = g + 1 == c[p.tagName].length ? 0 : g + 1
        var b = c[p.tagName][g]
        if (o(p, b), domUtils.isStartInblock(i)) return s.fireEvent('saveScene'), a = i.createBookmark(), h.insertBefore(p, r), p.appendChild(r), n(p, p.tagName.toLowerCase(), b), s.fireEvent('contentchange'), i.moveToBookmark(a).select(!0), !0
      }
    }), s.commands.insertorderedlist = s.commands.insertunorderedlist = {
      execCommand: function (e, i) {
        i || (i = e.toLowerCase() == 'insertorderedlist' ? 'decimal' : 'disc')
        var r = this,
          s = this.selection.getRange(),
          d = function (e) {
            return e.nodeType == 1 ? e.tagName.toLowerCase() != 'br' : !domUtils.isWhitespace(e)
          },
          c = e.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul',
          u = r.document.createDocumentFragment()
        s.adjustmentBoundary().shrinkBoundary()
        var m, f, h, p, g = s.createBookmark(!0),
          v = a(r.document.getElementById(g.start)),
          b = 0,
          y = a(r.document.getElementById(g.end)),
          C = 0
        if (v || y) {
          if (v && (m = v.parentNode), g.end || (y = v), y && (f = y.parentNode), m === f) {
            for (; v !== y;) {
              if (p = v, v = v.nextSibling, !domUtils.isBlockElm(p.firstChild)) {
                for (var N = r.document.createElement('p'); p.firstChild;) N.appendChild(p.firstChild)
                p.appendChild(N)
              }
              u.appendChild(p)
            }
            if (p = r.document.createElement('span'), m.insertBefore(p, y), !domUtils.isBlockElm(y.firstChild)) {
              for (N = r.document.createElement('p'); y.firstChild;) N.appendChild(y.firstChild)
              y.appendChild(N)
            }
            u.appendChild(y), domUtils.breakParent(p, m), domUtils.isEmptyNode(p.previousSibling) && domUtils.remove(p.previousSibling), domUtils.isEmptyNode(p.nextSibling) && domUtils.remove(p.nextSibling)
            var x = t(m) || domUtils.getComputedStyle(m, 'list-style-type') || (e.toLowerCase() == 'insertorderedlist' ? 'decimal' : 'disc')
            if (m.tagName.toLowerCase() == c && x == i) {
              for (var w, U = 0, E = r.document.createDocumentFragment(); w = u.firstChild;) {
                if (domUtils.isTagNode(w, 'ol ul')) E.appendChild(w)
                else { for (; w.firstChild;) E.appendChild(w.firstChild), domUtils.remove(w) }
              }
              p.parentNode.insertBefore(E, p)
            } else h = r.document.createElement(c), o(h, i), h.appendChild(u), p.parentNode.insertBefore(h, p)
            return domUtils.remove(p), h && n(h, c, i), void s.moveToBookmark(g).select()
          }
          if (v) {
            for (; v;) {
              if (p = v.nextSibling, domUtils.isTagNode(v, 'ol ul')) u.appendChild(v)
              else {
                for (var T = r.document.createDocumentFragment(), S = 0; v.firstChild;) domUtils.isBlockElm(v.firstChild) && (S = 1), T.appendChild(v.firstChild)
                if (S) u.appendChild(T)
                else {
                  var k = r.document.createElement('p')
                  k.appendChild(T), u.appendChild(k)
                }
                domUtils.remove(v)
              }
              v = p
            }
            m.parentNode.insertBefore(u, m.nextSibling), domUtils.isEmptyNode(m) ? (s.setStartBefore(m), domUtils.remove(m)) : s.setStartAfter(m), b = 1
          }
          if (y && domUtils.inDoc(f, r.document)) {
            for (v = f.firstChild; v && v !== y;) {
              if (p = v.nextSibling, domUtils.isTagNode(v, 'ol ul')) u.appendChild(v)
              else {
                for (T = r.document.createDocumentFragment(), S = 0; v.firstChild;) domUtils.isBlockElm(v.firstChild) && (S = 1), T.appendChild(v.firstChild)
                S ? u.appendChild(T) : (k = r.document.createElement('p'), k.appendChild(T), u.appendChild(k)), domUtils.remove(v)
              }
              v = p
            }
            var B = domUtils.createElement(r.document, 'div', {
              tmpDiv: 1
            })
            domUtils.moveChild(y, B), u.appendChild(B), domUtils.remove(y), f.parentNode.insertBefore(u, f), s.setEndBefore(f), domUtils.isEmptyNode(f) && domUtils.remove(f), C = 1
          }
        }
        b || s.setStartBefore(r.document.getElementById(g.start)), g.end && !C && s.setEndAfter(r.document.getElementById(g.end)), s.enlarge(!0, function (e) {
          return l[e.tagName]
        }), u = r.document.createDocumentFragment()
        for (var I, _ = s.createBookmark(), A = domUtils.getNextDomNode(_.start, !1, d), R = s.cloneRange(), L = domUtils.isBlockElm; A && A !== _.end && domUtils.getPosition(A, _.end) & domUtils.POSITION_PRECEDING;) {
          if (A.nodeType == 3 || dtd.li[A.tagName]) {
            if (A.nodeType == 1 && dtd.$list[A.tagName]) {
              for (; A.firstChild;) u.appendChild(A.firstChild)
              I = domUtils.getNextDomNode(A, !1, d), domUtils.remove(A), A = I
              continue
            }
            for (I = A, R.setStartBefore(A); A && A !== _.end && (!L(A) || domUtils.isBookmarkNode(A));) {
              I = A, A = domUtils.getNextDomNode(A, !1, null, function (e) {
                return !l[e.tagName]
              })
            }
            A && L(A) && (p = domUtils.getNextDomNode(I, !1, d), p && domUtils.isBookmarkNode(p) && (A = domUtils.getNextDomNode(p, !1, d), I = p)), R.setEndAfter(I), A = domUtils.getNextDomNode(I, !1, d)
            var D = s.document.createElement('li')
            if (D.appendChild(R.extractContents()), domUtils.isEmptyNode(D)) {
              for (var I = s.document.createElement('p'); D.firstChild;) I.appendChild(D.firstChild)
              D.appendChild(I)
            }
            u.appendChild(D)
          } else A = domUtils.getNextDomNode(A, !0, d)
        }
        s.moveToBookmark(_).collapse(!0), h = r.document.createElement(c), o(h, i), h.appendChild(u), s.insertNode(h), n(h, c, i)
        for (var w, U = 0, O = domUtils.getElementsByTagName(h, 'div'); w = O[U++];) w.getAttribute('tmpDiv') && domUtils.remove(w, !0)
        s.moveToBookmark(g).select()
      },
      queryCommandState: function (e) {
        for (var t, i = e.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul', n = this.selection.getStartElementPath(), o = 0; t = n[o++];) {
          if (t.nodeName == 'TABLE') return 0
          if (i == t.nodeName.toLowerCase()) return 1
        }
        return 0
      },
      queryCommandValue: function (e) {
        for (var i, n, o = e.toLowerCase() == 'insertorderedlist' ? 'ol' : 'ul', r = this.selection.getStartElementPath(), a = 0; n = r[a++];) {
          if (n.nodeName == 'TABLE') {
            i = null
            break
          }
          if (o == n.nodeName.toLowerCase()) {
            i = n
            break
          }
        }
        return i ? t(i) || domUtils.getComputedStyle(i, 'list-style-type') : null
      }
    }
  },
  (function () {
    var e = {
      textarea: function (e, t) {
        var i = t.ownerDocument.createElement('textarea')
        return i.style.cssText = 'position:absolute;resize:none;width:100%;height:100%;border:0;padding:0;margin:0;overflow-y:auto;', browser.ie && browser.version < 8 && (i.style.width = t.offsetWidth + 'px', i.style.height = t.offsetHeight + 'px', t.onresize = function () {
          i.style.width = t.offsetWidth + 'px', i.style.height = t.offsetHeight + 'px'
        }), t.appendChild(i), {
          setContent: function (e) {
            i.value = e
          },
          getContent: function () {
            return i.value
          },
          select: function () {
            var e
            browser.ie ? (e = i.createTextRange(), e.collapse(!0), e.select()) : (i.setSelectionRange(0, 0), i.focus())
          },
          dispose: function () {
            t.removeChild(i), t.onresize = null, i = null, t = null
          }
        }
      },
      codemirror: function (e, t) {
        var i = window.CodeMirror(t, {
            mode: 'text/html',
            tabMode: 'indent',
            lineNumbers: !0,
            lineWrapping: !0
          }),
          n = i.getWrapperElement()
        return n.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;font-family:consolas,"Courier new",monospace;font-size:13px;', i.getScrollerElement().style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;', i.refresh(), {
          getCodeMirror: function () {
            return i
          },
          setContent: function (e) {
            i.setValue(e)
          },
          getContent: function () {
            return i.getValue()
          },
          select: function () {
            i.focus()
          },
          dispose: function () {
            t.removeChild(n), n = null, i = null
          }
        }
      }
    }
    UE.plugins.source = function () {
      function t (t) {
        return e[r.sourceEditor == 'codemirror' && window.CodeMirror ? 'codemirror' : 'textarea'](o, t)
      }
      var i, n, o = this,
        r = this.options,
        a = !1
      r.sourceEditor = browser.ie ? 'textarea' : r.sourceEditor || 'codemirror', o.setOpt({
        sourceEditorFirst: !1
      })
      var s, l, d
      o.commands.source = {
        execCommand: function () {
          if (a = !a) {
            d = o.selection.getRange().createAddress(!1, !0), o.undoManger && o.undoManger.save(!0), browser.gecko && (o.body.contentEditable = !1), s = o.iframe.style.cssText, o.iframe.style.cssText += 'position:absolute;left:-32768px;top:-32768px;', o.fireEvent('beforegetcontent')
            var e = UE.htmlparser(o.body.innerHTML)
            o.filterOutputRule(e), e.traversal(function (e) {
              if (e.type == 'element') {
                switch (e.tagName) {
                  case 'td':
                  case 'th':
                  case 'caption':
                    e.children && e.children.length == 1 && e.firstChild().tagName == 'br' && e.removeChild(e.firstChild())
                    break
                  case 'pre':
                    e.innerText(e.innerText().replace(/&nbsp;/g, ' '))
                }
              }
            }), o.fireEvent('aftergetcontent')
            var r = e.toHtml(!0)
            i = t(o.iframe.parentNode), i.setContent(r), n = o.setContent, o.setContent = function (e) {
              var t = UE.htmlparser(e)
              o.filterInputRule(t), e = t.toHtml(), i.setContent(e)
            }, setTimeout(function () {
              i.select(), o.addListener('fullscreenchanged', function () {
                try {
                  i.getCodeMirror().refresh()
                } catch (e) {}
              })
            }), l = o.getContent, o.getContent = function () {
              return i.getContent() || '<p>' + (browser.ie ? '' : '<br/>') + '</p>'
            }
          } else {
            o.iframe.style.cssText = s
            var c = i.getContent() || '<p>' + (browser.ie ? '' : '<br/>') + '</p>'
            c = c.replace(new RegExp('[\\r\\t\\n ]*</?(\\w+)\\s*(?:[^>]*)>', 'g'), function (e, t) {
              return t && !dtd.$inlineWithA[t.toLowerCase()] ? e.replace(/(^[\n\r\t ]*)|([\n\r\t ]*$)/g, '') : e.replace(/(^[\n\r\t]*)|([\n\r\t]*$)/g, '')
            }), o.setContent = n, o.setContent(c), i.dispose(), i = null, o.getContent = l
            var u = o.body.firstChild
            if (u || (o.body.innerHTML = '<p>' + (browser.ie ? '' : '<br/>') + '</p>', u = o.body.firstChild), o.undoManger && o.undoManger.save(!0), browser.gecko) {
              var m = document.createElement('input')
              m.style.cssText = 'position:absolute;left:0;top:-32768px', document.body.appendChild(m), o.body.contentEditable = !1, setTimeout(function () {
                domUtils.setViewportOffset(m, {
                  left: -32768,
                  top: 0
                }), m.focus(), setTimeout(function () {
                  o.body.contentEditable = !0, o.selection.getRange().moveToAddress(d).select(!0), domUtils.remove(m)
                })
              })
            } else {
              try {
                o.selection.getRange().moveToAddress(d).select(!0)
              } catch (f) {}
            }
          }
          this.fireEvent('sourcemodechanged', a)
        },
        queryCommandState: function () {
          return 0 | a
        },
        notNeedUndo: 1
      }
      var c = o.queryCommandState
      o.queryCommandState = function (e) {
        return e = e.toLowerCase(), a ? e in {
          source: 1,
          fullscreen: 1
        } ? 1 : -1 : c.apply(this, arguments)
      }, r.sourceEditor == 'codemirror' && o.addListener('ready', function () {
        utils.loadFile(document, {
          src: r.codeMirrorJsUrl || r.UEDITOR_HOME_URL + 'third-party/codemirror/codemirror.js',
          tag: 'script',
          type: 'text/javascript',
          defer: 'defer'
        }, function () {
          r.sourceEditorFirst && setTimeout(function () {
            o.execCommand('source')
          }, 0)
        }), utils.loadFile(document, {
          tag: 'link',
          rel: 'stylesheet',
          type: 'text/css',
          href: r.codeMirrorCssUrl || r.UEDITOR_HOME_URL + 'third-party/codemirror/codemirror.css'
        })
      })
    }
  }()), UE.plugins.enterkey = function () {
    var e, t = this,
      i = t.options.enterTag
    t.addListener('keyup', function (i, n) {
      var o = n.keyCode || n.which
      if (o == 13) {
        var r, a = t.selection.getRange(),
          s = a.startContainer
        if (browser.ie) t.fireEvent('saveScene', !0, !0)
        else {
          if (/h\d/i.test(e)) {
            if (browser.gecko) {
              var l = domUtils.findParentByTagName(s, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'caption', 'table'], !0)
              l || (t.document.execCommand('formatBlock', !1, '<p>'), r = 1)
            } else if (s.nodeType == 1) {
              var d, c = t.document.createTextNode('')
              if (a.insertNode(c), d = domUtils.findParentByTagName(c, 'div', !0)) {
                for (var u = t.document.createElement('p'); d.firstChild;) u.appendChild(d.firstChild)
                d.parentNode.insertBefore(u, d), domUtils.remove(d), a.setStartBefore(c).setCursor(), r = 1
              }
              domUtils.remove(c)
            }
            t.undoManger && r && t.undoManger.save()
          }
          browser.opera && a.select()
        }
      }
    }), t.addListener('keydown', function (n, o) {
      var r = o.keyCode || o.which
      if (r == 13) {
        if (t.fireEvent('beforeenterkeydown')) return void domUtils.preventDefault(o)
        t.fireEvent('saveScene', !0, !0), e = ''
        var a = t.selection.getRange()
        if (!a.collapsed) {
          var s = a.startContainer,
            l = a.endContainer,
            d = domUtils.findParentByTagName(s, 'td', !0),
            c = domUtils.findParentByTagName(l, 'td', !0)
          if (d && c && d !== c || !d && c || d && !c) return void (o.preventDefault ? o.preventDefault() : o.returnValue = !1)
        }
        if (i == 'p') browser.ie || (s = domUtils.findParentByTagName(a.startContainer, ['ol', 'ul', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'caption'], !0), s || browser.opera ? (e = s.tagName, s.tagName.toLowerCase() == 'p' && browser.gecko && domUtils.removeDirtyAttr(s)) : (t.document.execCommand('formatBlock', !1, '<p>'), browser.gecko && (a = t.selection.getRange(), s = domUtils.findParentByTagName(a.startContainer, 'p', !0), s && domUtils.removeDirtyAttr(s))))
        else if (o.preventDefault ? o.preventDefault() : o.returnValue = !1, a.collapsed) {
          m = a.document.createElement('br'), a.insertNode(m)
          var u = m.parentNode
          u.lastChild === m ? (m.parentNode.insertBefore(m.cloneNode(!0), m), a.setStartBefore(m)) : a.setStartAfter(m), a.setCursor()
        } else if (a.deleteContents(), s = a.startContainer, s.nodeType == 1 && (s = s.childNodes[a.startOffset])) {
          for (; s.nodeType == 1;) {
            if (dtd.$empty[s.tagName]) return a.setStartBefore(s).setCursor(), t.undoManger && t.undoManger.save(), !1
            if (!s.firstChild) {
              var m = a.document.createElement('br')
              return s.appendChild(m), a.setStart(s, 0).setCursor(), t.undoManger && t.undoManger.save(), !1
            }
            s = s.firstChild
          }
          s === a.startContainer.childNodes[a.startOffset] ? (m = a.document.createElement('br'), a.insertNode(m).setCursor()) : a.setStart(s, 0).setCursor()
        } else m = a.document.createElement('br'), a.insertNode(m).setStartAfter(m).setCursor()
      }
    })
  }, UE.plugins.keystrokes = function () {
    var e = this,
      t = !0
    e.addListener('keydown', function (i, n) {
      var o = n.keyCode || n.which,
        r = e.selection.getRange()
      if (!r.collapsed && !(n.ctrlKey || n.shiftKey || n.altKey || n.metaKey) && (o >= 65 && o <= 90 || o >= 48 && o <= 57 || o >= 96 && o <= 111 || {
        13: 1,
        8: 1,
        46: 1
      }[o])) {
        var a = r.startContainer
        if (domUtils.isFillChar(a) && r.setStartBefore(a), a = r.endContainer, domUtils.isFillChar(a) && r.setEndAfter(a), r.txtToElmBoundary(), r.endContainer && r.endContainer.nodeType == 1 && (a = r.endContainer.childNodes[r.endOffset], a && domUtils.isBr(a) && r.setEndAfter(a)), r.startOffset == 0 && (a = r.startContainer, domUtils.isBoundaryNode(a, 'firstChild') && (a = r.endContainer, r.endOffset == (a.nodeType == 3 ? a.nodeValue.length : a.childNodes.length) && domUtils.isBoundaryNode(a, 'lastChild')))) return e.fireEvent('saveScene'), e.body.innerHTML = '<p>' + (browser.ie ? '' : '<br/>') + '</p>', r.setStart(e.body.firstChild, 0).setCursor(!1, !0), void e._selectionChange()
      }
      if (o == keymap.Backspace) {
        if (r = e.selection.getRange(), t = r.collapsed, e.fireEvent('delkeydown', n)) return
        var s, l
        if (r.collapsed && r.inFillChar() && (s = r.startContainer, domUtils.isFillChar(s) ? (r.setStartBefore(s).shrinkBoundary(!0).collapse(!0), domUtils.remove(s)) : (s.nodeValue = s.nodeValue.replace(new RegExp('^' + domUtils.fillChar), ''), r.startOffset--, r.collapse(!0).select(!0))), s = r.getClosedNode()) return e.fireEvent('saveScene'), r.setStartBefore(s), domUtils.remove(s), r.setCursor(), e.fireEvent('saveScene'), void domUtils.preventDefault(n)
        if (!browser.ie && (s = domUtils.findParentByTagName(r.startContainer, 'table', !0), l = domUtils.findParentByTagName(r.endContainer, 'table', !0), s && !l || !s && l || s !== l)) return void n.preventDefault()
      }
      if (o == keymap.Tab) {
        var d = {
          ol: 1,
          ul: 1,
          table: 1
        }
        if (e.fireEvent('tabkeydown', n)) return void domUtils.preventDefault(n)
        var c = e.selection.getRange()
        e.fireEvent('saveScene')
        for (var u = 0, m = '', f = e.options.tabSize || 4, h = e.options.tabNode || '&nbsp;'; f > u; u++) m += h
        var p = e.document.createElement('span')
        if (p.innerHTML = m + domUtils.fillChar, c.collapsed) c.insertNode(p.cloneNode(!0).firstChild).setCursor(!0)
        else {
          var g = function (e) {
            return domUtils.isBlockElm(e) && !d[e.tagName.toLowerCase()]
          }
          if (s = domUtils.findParent(c.startContainer, g, !0), l = domUtils.findParent(c.endContainer, g, !0), s && l && s === l) c.deleteContents(), c.insertNode(p.cloneNode(!0).firstChild).setCursor(!0)
          else {
            var v = c.createBookmark()
            c.enlarge(!0)
            for (var b = c.createBookmark(), y = domUtils.getNextDomNode(b.start, !1, g); y && !(domUtils.getPosition(y, b.end) & domUtils.POSITION_FOLLOWING);) y.insertBefore(p.cloneNode(!0).firstChild, y.firstChild), y = domUtils.getNextDomNode(y, !1, g)
            c.moveToBookmark(b).moveToBookmark(v).select()
          }
        }
        domUtils.preventDefault(n)
      }
      if (browser.gecko && o == 46 && (c = e.selection.getRange(), c.collapsed && (s = c.startContainer, domUtils.isEmptyBlock(s)))) {
        for (var C = s.parentNode; domUtils.getChildCount(C) == 1 && !domUtils.isBody(C);) s = C, C = C.parentNode
        return void (s === C.lastChild && n.preventDefault())
      }
    }), e.addListener('keyup', function (e, i) {
      var n, o = i.keyCode || i.which,
        r = this
      if (o == keymap.Backspace) {
        if (r.fireEvent('delkeyup')) return
        if (n = r.selection.getRange(), n.collapsed) {
          var a, s = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
          if ((a = domUtils.findParentByTagName(n.startContainer, s, !0)) && domUtils.isEmptyBlock(a)) {
            var l = a.previousSibling
            if (l && l.nodeName != 'TABLE') return domUtils.remove(a), void n.setStartAtLast(l).setCursor(!1, !0)
            var d = a.nextSibling
            if (d && d.nodeName != 'TABLE') return domUtils.remove(a), void n.setStartAtFirst(d).setCursor(!1, !0)
          }
          if (domUtils.isBody(n.startContainer)) {
            var a = domUtils.createElement(r.document, 'p', {
              innerHTML: browser.ie ? domUtils.fillChar : '<br/>'
            })
            n.insertNode(a).setStart(a, 0).setCursor(!1, !0)
          }
        }
        if (!t && (n.startContainer.nodeType == 3 || n.startContainer.nodeType == 1 && domUtils.isEmptyBlock(n.startContainer))) {
          if (browser.ie) {
            var c = n.document.createElement('span')
            n.insertNode(c).setStartBefore(c).collapse(!0), n.select(), domUtils.remove(c)
          } else n.select()
        }
      }
    })
  }, UE.plugins.fiximgclick = (function () {
    function e () {
      this.editor = null, this.resizer = null, this.cover = null, this.doc = document, this.prePos = {
        x: 0,
        y: 0
      }, this.startPos = {
        x: 0,
        y: 0
      }
    }
    var t = !1
    return (function () {
      var n = [
        [0, 0, -1, -1],
        [0, 0, 0, -1],
        [0, 0, 1, -1],
        [0, 0, -1, 0],
        [0, 0, 1, 0],
        [0, 0, -1, 1],
        [0, 0, 0, 1],
        [0, 0, 1, 1]
      ]
      e.prototype = {
        init: function (e) {
          var t = this
          t.editor = e, t.startPos = this.prePos = {
            x: 0,
            y: 0
          }, t.dragId = -1
          var n = [],
            o = t.cover = document.createElement('div'),
            r = t.resizer = document.createElement('div')
          for (o.id = t.editor.ui.id + '_imagescale_cover', o.style.cssText = 'position:absolute;display:none;z-index:' + t.editor.options.zIndex + ';filter:alpha(opacity=0); opacity:0;background:#CCC;', domUtils.on(o, 'mousedown click', function () {
            t.hide()
          }), i = 0; i < 8; i++) n.push('<span class="edui-editor-imagescale-hand' + i + '"></span>')
          r.id = t.editor.ui.id + '_imagescale', r.className = 'edui-editor-imagescale', r.innerHTML = n.join(''), r.style.cssText += ';display:none;border:1px solid #3b77ff;z-index:' + t.editor.options.zIndex + ';', t.editor.ui.getDom().appendChild(o), t.editor.ui.getDom().appendChild(r), t.initStyle(), t.initEvents()
        },
        initStyle: function () {
          utils.cssRule('imagescale', '.edui-editor-imagescale{display:none;position:absolute;border:1px solid #38B2CE;cursor:hand;-webkit-box-sizing: content-box;-moz-box-sizing: content-box;box-sizing: content-box;}.edui-editor-imagescale span{position:absolute;width:6px;height:6px;overflow:hidden;font-size:0px;display:block;background-color:#3C9DD0;}.edui-editor-imagescale .edui-editor-imagescale-hand0{cursor:nw-resize;top:0;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand1{cursor:n-resize;top:0;margin-top:-4px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand2{cursor:ne-resize;top:0;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand3{cursor:w-resize;top:50%;margin-top:-4px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand4{cursor:e-resize;top:50%;margin-top:-4px;left:100%;margin-left:-3px;}.edui-editor-imagescale .edui-editor-imagescale-hand5{cursor:sw-resize;top:100%;margin-top:-3px;left:0;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand6{cursor:s-resize;top:100%;margin-top:-3px;left:50%;margin-left:-4px;}.edui-editor-imagescale .edui-editor-imagescale-hand7{cursor:se-resize;top:100%;margin-top:-3px;left:100%;margin-left:-3px;}')
        },
        initEvents: function () {
          var e = this
          e.startPos.x = e.startPos.y = 0, e.isDraging = !1
        },
        _eventHandler: function (e) {
          var i = this
          switch (e.type) {
            case 'mousedown':
              var n, n = e.target || e.srcElement; n.className.indexOf('edui-editor-imagescale-hand') != -1 && i.dragId == -1 && (i.dragId = n.className.slice(-1), i.startPos.x = i.prePos.x = e.clientX, i.startPos.y = i.prePos.y = e.clientY, domUtils.on(i.doc, 'mousemove', i.proxy(i._eventHandler, i)))
              break
            case 'mousemove':
              i.dragId != -1 && (i.updateContainerStyle(i.dragId, {
                x: e.clientX - i.prePos.x,
                y: e.clientY - i.prePos.y
              }), i.prePos.x = e.clientX, i.prePos.y = e.clientY, t = !0, i.updateTargetElement())
              break
            case 'mouseup':
              i.dragId != -1 && (i.updateContainerStyle(i.dragId, {
                x: e.clientX - i.prePos.x,
                y: e.clientY - i.prePos.y
              }), i.updateTargetElement(), i.target.parentNode && i.attachTo(i.target), i.dragId = -1), domUtils.un(i.doc, 'mousemove', i.proxy(i._eventHandler, i)), t && (t = !1, i.editor.fireEvent('contentchange'))
          }
        },
        updateTargetElement: function () {
          var e = this
          domUtils.setStyles(e.target, {
            width: e.resizer.style.width,
            height: e.resizer.style.height
          }), e.target.width = parseInt(e.resizer.style.width), e.target.height = parseInt(e.resizer.style.height), e.attachTo(e.target)
        },
        updateContainerStyle: function (e, t) {
          var i, o = this,
            r = o.resizer
          n[e][0] != 0 && (i = parseInt(r.style.left) + t.x, r.style.left = o._validScaledProp('left', i) + 'px'), n[e][1] != 0 && (i = parseInt(r.style.top) + t.y, r.style.top = o._validScaledProp('top', i) + 'px'), n[e][2] != 0 && (i = r.clientWidth + n[e][2] * t.x, r.style.width = o._validScaledProp('width', i) + 'px'), n[e][3] != 0 && (i = r.clientHeight + n[e][3] * t.y, r.style.height = o._validScaledProp('height', i) + 'px')
        },
        _validScaledProp: function (e, t) {
          var i = this.resizer,
            n = document
          switch (t = isNaN(t) ? 0 : t, e) {
            case 'left':
              return t < 0 ? 0 : t + i.clientWidth > n.clientWidth ? n.clientWidth - i.clientWidth : t
            case 'top':
              return t < 0 ? 0 : t + i.clientHeight > n.clientHeight ? n.clientHeight - i.clientHeight : t
            case 'width':
              return t <= 0 ? 1 : t + i.offsetLeft > n.clientWidth ? n.clientWidth - i.offsetLeft : t
            case 'height':
              return t <= 0 ? 1 : t + i.offsetTop > n.clientHeight ? n.clientHeight - i.offsetTop : t
          }
        },
        hideCover: function () {
          this.cover.style.display = 'none'
        },
        showCover: function () {
          var e = this,
            t = domUtils.getXY(e.editor.ui.getDom()),
            i = domUtils.getXY(e.editor.iframe)
          domUtils.setStyles(e.cover, {
            width: e.editor.iframe.offsetWidth + 'px',
            height: e.editor.iframe.offsetHeight + 'px',
            top: i.y - t.y + 'px',
            left: i.x - t.x + 'px',
            position: 'absolute',
            display: ''
          })
        },
        show: function (e) {
          var t = this
          t.resizer.style.display = 'block', e && t.attachTo(e), domUtils.on(this.resizer, 'mousedown', t.proxy(t._eventHandler, t)), domUtils.on(t.doc, 'mouseup', t.proxy(t._eventHandler, t)), t.showCover(), t.editor.fireEvent('afterscaleshow', t), t.editor.fireEvent('saveScene')
        },
        hide: function () {
          var e = this
          e.hideCover(), e.resizer.style.display = 'none', domUtils.un(e.resizer, 'mousedown', e.proxy(e._eventHandler, e)), domUtils.un(e.doc, 'mouseup', e.proxy(e._eventHandler, e)), e.editor.fireEvent('afterscalehide', e)
        },
        proxy: function (e, t) {
          return function (i) {
            return e.apply(t || this, arguments)
          }
        },
        attachTo: function (e) {
          var t = this,
            i = t.target = e,
            n = this.resizer,
            o = domUtils.getXY(i),
            r = domUtils.getXY(t.editor.iframe),
            a = domUtils.getXY(n.parentNode)
          domUtils.setStyles(n, {
            width: i.width + 'px',
            height: i.height + 'px',
            left: r.x + o.x - t.editor.document.body.scrollLeft - a.x - parseInt(n.style.borderLeftWidth) + 'px',
            top: r.y + o.y - t.editor.document.body.scrollTop - a.y - parseInt(n.style.borderTopWidth) + 'px'
          })
        }
      }
    }()),
    function () {
      var t, i = this
      i.setOpt('imageScaleEnabled', !0), !browser.ie && i.options.imageScaleEnabled && i.addListener('click', function (n, o) {
        var r = i.selection.getRange(),
          a = r.getClosedNode()
        if (a && a.tagName == 'IMG' && i.body.contentEditable != 'false') {
          if (a.className.indexOf('edui-faked-music') != -1 || a.getAttribute('anchorname') || domUtils.hasClass(a, 'loadingclass') || domUtils.hasClass(a, 'loaderrorclass')) return
          if (!t) {
            t = new e(), t.init(i), i.ui.getDom().appendChild(t.resizer)
            var s, l = function (e) {
                t.hide(), t.target && i.selection.getRange().selectNode(t.target).select()
              },
              d = function (e) {
                var t = e.target || e.srcElement
                !t || void 0 !== t.className && t.className.indexOf('edui-editor-imagescale') != -1 || l(e)
              }
            i.addListener('afterscaleshow', function (e) {
              i.addListener('beforekeydown', l), i.addListener('beforemousedown', d), domUtils.on(document, 'keydown', l), domUtils.on(document, 'mousedown', d), i.selection.getNative().removeAllRanges()
            }), i.addListener('afterscalehide', function (e) {
              i.removeListener('beforekeydown', l), i.removeListener('beforemousedown', d), domUtils.un(document, 'keydown', l), domUtils.un(document, 'mousedown', d)
              var n = t.target
              n.parentNode && i.selection.getRange().selectNode(n).select()
            }), domUtils.on(t.resizer, 'mousedown', function (e) {
              i.selection.getNative().removeAllRanges()
              var n = e.target || e.srcElement
              n && n.className.indexOf('edui-editor-imagescale-hand') == -1 && (s = setTimeout(function () {
                t.hide(), t.target && i.selection.getRange().selectNode(n).select()
              }, 200))
            }), domUtils.on(t.resizer, 'mouseup', function (e) {
              var t = e.target || e.srcElement
              t && t.className.indexOf('edui-editor-imagescale-hand') == -1 && clearTimeout(s)
            })
          }
          t.show(a)
        } else t && t.resizer.style.display != 'none' && t.hide()
      }), browser.webkit && i.addListener('click', function (e, t) {
        if (t.target.tagName == 'IMG' && i.body.contentEditable != 'false') {
          var n = new dom.Range(i.document)
          n.selectNode(t.target).select()
        }
      })
    }
  }()), UE.plugin.register('autolink', function () {
    var e = 0
    return browser.ie ? {} : {
      bindEvents: {
        reset: function () {
          e = 0
        },
        keydown: function (e, t) {
          var i = this,
            n = t.keyCode || t.which
          if (n == 32 || n == 13) {
            for (var o, r, a = i.selection.getNative(), s = a.getRangeAt(0).cloneRange(), l = s.startContainer; l.nodeType == 1 && s.startOffset > 0 && (l = s.startContainer.childNodes[s.startOffset - 1]);) s.setStart(l, l.nodeType == 1 ? l.childNodes.length : l.nodeValue.length), s.collapse(!0), l = s.startContainer
            do {
              if (s.startOffset == 0) {
                for (l = s.startContainer.previousSibling; l && l.nodeType == 1;) l = l.lastChild
                if (!l || domUtils.isFillChar(l)) break
                o = l.nodeValue.length
              } else l = s.startContainer, o = s.startOffset
              s.setStart(l, o - 1), r = s.toString().charCodeAt(0)
            } while (r != 160 && r != 32)
            if (s.toString().replace(new RegExp(domUtils.fillChar, 'g'), '').match(/(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i)) {
              for (; s.toString().length && !/^(?:https?:\/\/|ssh:\/\/|ftp:\/\/|file:\/|www\.)/i.test(s.toString());) {
                try {
                  s.setStart(s.startContainer, s.startOffset + 1)
                } catch (d) {
                  for (var l = s.startContainer; !(next = l.nextSibling);) {
                    if (domUtils.isBody(l)) return
                    l = l.parentNode
                  }
                  s.setStart(next, 0)
                }
              }
              if (domUtils.findParentByTagName(s.startContainer, 'a', !0)) return
              var c, u = i.document.createElement('a'),
                m = i.document.createTextNode(' ')
              i.undoManger && i.undoManger.save(), u.appendChild(s.extractContents()), u.href = u.innerHTML = u.innerHTML.replace(/<[^>]+>/g, ''), c = u.getAttribute('href').replace(new RegExp(domUtils.fillChar, 'g'), ''), c = /^(?:https?:\/\/)/gi.test(c) ? c : 'http://' + c, u.setAttribute('_src', utils.html(c)), u.href = utils.html(c), s.insertNode(u), u.parentNode.insertBefore(m, u.nextSibling), s.setStart(m, 0), s.collapse(!0), a.removeAllRanges(), a.addRange(s), i.undoManger && i.undoManger.save()
            }
          }
        }
      }
    }
  }, function () {
    function e (e) {
      if (e.nodeType == 3) return null
      if (e.nodeName == 'A') return e
      for (var t = e.lastChild; t;) {
        if (t.nodeName == 'A') return t
        if (t.nodeType == 3) {
          if (domUtils.isWhitespace(t)) {
            t = t.previousSibling
            continue
          }
          return null
        }
        t = t.lastChild
      }
    }
    var t = {
      37: 1,
      38: 1,
      39: 1,
      40: 1,
      13: 1,
      32: 1
    }
    browser.ie && this.addListener('keyup', function (i, n) {
      var o = this,
        r = n.keyCode
      if (t[r]) {
        var a = o.selection.getRange(),
          s = a.startContainer
        if (r == 13) {
          for (; s && !domUtils.isBody(s) && !domUtils.isBlockElm(s);) s = s.parentNode
          if (s && !domUtils.isBody(s) && s.nodeName == 'P') {
            var l = s.previousSibling
            if (l && l.nodeType == 1) {
              var l = e(l)
              l && !l.getAttribute('_href') && domUtils.remove(l, !0)
            }
          }
        } else if (r == 32) s.nodeType == 3 && /^\s$/.test(s.nodeValue) && (s = s.previousSibling, s && s.nodeName == 'A' && !s.getAttribute('_href') && domUtils.remove(s, !0))
        else if (s = domUtils.findParentByTagName(s, 'a', !0), s && !s.getAttribute('_href')) {
          var d = a.createBookmark()
          domUtils.remove(s, !0), a.moveToBookmark(d).select(!0)
        }
      }
    })
  }), UE.plugins.autoheight = function () {
    function e () {
      var e = this
      clearTimeout(o), r || (!e.queryCommandState || e.queryCommandState && e.queryCommandState('source') != 1) && (o = setTimeout(function () {
        for (var t = e.body.lastChild; t && t.nodeType != 1;) t = t.previousSibling
        t && t.nodeType == 1 && (t.style.clear = 'both', n = Math.max(domUtils.getXY(t).y + t.offsetHeight + 25, Math.max(s.minFrameHeight, s.initialFrameHeight)), n != a && (n !== parseInt(e.iframe.parentNode.style.height) && (e.iframe.parentNode.style.height = n + 'px'), e.body.style.height = n + 'px', a = n), domUtils.removeStyle(t, 'clear'))
      }, 50))
    }
    var t = this
    if (t.autoHeightEnabled = t.options.autoHeightEnabled !== !1, t.autoHeightEnabled) {
      var i, n, o, r, a = 0,
        s = t.options
      t.addListener('fullscreenchanged', function (e, t) {
        r = t
      }), t.addListener('destroy', function () {
        t.removeListener('contentchange afterinserthtml keyup mouseup', e)
      }), t.enableAutoHeight = function () {
        var t = this
        if (t.autoHeightEnabled) {
          var n = t.document
          t.autoHeightEnabled = !0, i = n.body.style.overflowY, n.body.style.overflowY = 'hidden', t.addListener('contentchange afterinserthtml keyup mouseup', e), setTimeout(function () {
            e.call(t)
          }, browser.gecko ? 100 : 0), t.fireEvent('autoheightchanged', t.autoHeightEnabled)
        }
      }, t.disableAutoHeight = function () {
        t.body.style.overflowY = i || '', t.removeListener('contentchange', e), t.removeListener('keyup', e), t.removeListener('mouseup', e), t.autoHeightEnabled = !1, t.fireEvent('autoheightchanged', t.autoHeightEnabled)
      }, t.on('setHeight', function () {
        t.disableAutoHeight()
      }), t.addListener('ready', function () {
        t.enableAutoHeight()
        var i
        domUtils.on(browser.ie ? t.body : t.document, browser.webkit ? 'dragover' : 'drop', function () {
          clearTimeout(i), i = setTimeout(function () {
            e.call(t)
          }, 100)
        })
        var n
        window.onscroll = function () {
          n === null ? n = this.scrollY : this.scrollY == 0 && n != 0 && (t.window.scrollTo(0, 0), n = null)
        }
      })
    }
  }, UE.plugins.autofloat = function () {
    function e () {
      return UE.ui ? 1 : (alert(a.autofloatMsg), 0)
    }

    function t () {
      var e = document.body.style
      e.backgroundImage = 'url("about:blank")', e.backgroundAttachment = 'fixed'
    }

    function i () {
      var e = domUtils.getXY(c),
        t = domUtils.getComputedStyle(c, 'position'),
        i = domUtils.getComputedStyle(c, 'left')
      c.style.width = c.offsetWidth + 'px', c.style.zIndex = 1 * r.options.zIndex + 1, c.parentNode.insertBefore(g, c), h || p && browser.ie ? (c.style.position != 'absolute' && (c.style.position = 'absolute'), c.style.top = (document.body.scrollTop || document.documentElement.scrollTop) - u + l + 'px') : (browser.ie7Compat && v && (v = !1, c.style.left = domUtils.getXY(c).x - document.documentElement.getBoundingClientRect().left + 2 + 'px'), c.style.position != 'fixed' && (c.style.position = 'fixed', c.style.top = l + 'px', (t == 'absolute' || t == 'relative') && parseFloat(i) && (c.style.left = e.x + 'px')))
    }

    function n () {
      v = !0, g.parentNode && g.parentNode.removeChild(g), c.style.cssText = d
    }

    function o () {
      var e = m(r.container),
        t = r.options.toolbarTopOffset || 0
      e.top < 0 && e.bottom - c.offsetHeight > t ? i() : n()
    }
    var r = this,
      a = r.getLang()
    r.setOpt({
      topOffset: 0
    })
    var s = r.options.autoFloatEnabled !== !1,
      l = r.options.topOffset
    if (s) {
      var d, c, u, m, f = UE.ui.uiUtils,
        h = browser.ie && browser.version <= 6,
        p = browser.quirks,
        g = document.createElement('div'),
        v = !0,
        b = utils.defer(function () {
          o()
        }, browser.ie ? 200 : 100, !0)
      r.addListener('destroy', function () {
        domUtils.un(window, ['scroll', 'resize'], o), r.removeListener('keydown', b)
      }), r.addListener('ready', function () {
        if (e(r)) {
          if (!r.ui) return
          m = f.getClientRect, c = r.ui.getDom('toolbarbox'), u = m(c).top, d = c.style.cssText, g.style.height = c.offsetHeight + 'px', h && t(), domUtils.on(window, ['scroll', 'resize'], o), r.addListener('keydown', b), r.addListener('beforefullscreenchange', function (e, t) {
            t && n()
          }), r.addListener('fullscreenchanged', function (e, t) {
            t || o()
          }), r.addListener('sourcemodechanged', function (e, t) {
            setTimeout(function () {
              o()
            }, 0)
          }), r.addListener('clearDoc', function () {
            setTimeout(function () {
              o()
            }, 0)
          })
        }
      })
    }
  }, UE.plugins.video = function () {
    function e (e, t, n, o, r, a, s) {
      e = utils.unhtmlForUrl(e), r = utils.unhtml(r), a = utils.unhtml(a), t = parseInt(t, 10) || 0, n = parseInt(n, 10) || 0
      var l
      switch (s) {
        case 'image':
          l = '<img ' + (o ? 'id="' + o + '"' : '') + ' width="' + t + '" height="' + n + '" _url="' + e + '" class="' + a.replace(/\bvideo-js\b/, '') + '" src="' + i.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" style="background:url(' + i.options.UEDITOR_HOME_URL + 'themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;' + (r ? 'float:' + r + ';' : '') + '" />'
          break
        case 'embed':
          l = '<embed type="application/x-shockwave-flash" class="' + a + '" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + utils.html(e) + '" width="' + t + '" height="' + n + '"' + (r ? ' style="float:' + r + '"' : '') + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >'
          break
        case 'video':
          var d = e.substr(e.lastIndexOf('.') + 1)
          d == 'ogv' && (d = 'ogg'), l = '<video' + (o ? ' id="' + o + '"' : '') + ' class="' + a + ' video-js" ' + (r ? ' style="float:' + r + '"' : '') + ' controls preload="none" width="' + t + '" height="' + n + '" src="' + e + '" data-setup="{}"><source src="' + e + '" type="video/' + d + '" /></video>'
      }
      return l
    }

    function t (t, i) {
      utils.each(t.getNodesByTagName(i ? 'img' : 'embed video'), function (t) {
        var n = t.getAttr('class')
        if (n && n.indexOf('edui-faked-video') != -1) {
          var o = e(i ? t.getAttr('_url') : t.getAttr('src'), t.getAttr('width'), t.getAttr('height'), null, t.getStyle('float') || '', n, i ? 'embed' : 'image')
          t.parentNode.replaceChild(UE.uNode.createElement(o), t)
        }
        if (n && n.indexOf('edui-upload-video') != -1) {
          var o = e(i ? t.getAttr('_url') : t.getAttr('src'), t.getAttr('width'), t.getAttr('height'), null, t.getStyle('float') || '', n, i ? 'video' : 'image')
          t.parentNode.replaceChild(UE.uNode.createElement(o), t)
        }
      })
    }
    var i = this
    i.addOutputRule(function (e) {
      t(e, !0)
    }), i.addInputRule(function (e) {
      t(e)
    }), i.commands.insertvideo = {
      execCommand: function (t, n, o) {
        n = utils.isArray(n) ? n : [n]
        for (var r, a, s = [], l = 'tmpVedio', d = 0, c = n.length; c > d; d++) a = n[d], r = o == 'upload' ? 'edui-upload-video video-js vjs-default-skin' : 'edui-faked-video', s.push(e(a.url, a.width || 420, a.height || 280, l + d, null, r, 'image'))
        i.execCommand('inserthtml', s.join(''), !0)
        for (var u = this.selection.getRange(), d = 0, c = n.length; c > d; d++) {
          var m = this.document.getElementById('tmpVedio' + d)
          domUtils.removeAttributes(m, 'id'), u.selectNode(m).select(), i.execCommand('imagefloat', n[d].align)
        }
      },
      queryCommandState: function () {
        var e = i.selection.getRange().getClosedNode(),
          t = e && (e.className == 'edui-faked-video' || e.className.indexOf('edui-upload-video') != -1)
        return t ? 1 : 0
      }
    }
  },
  (function () {
    function e (e) {}
    var t = UE.UETable = function (e) {
      this.table = e, this.indexTable = [], this.selectedTds = [], this.cellsRange = {}, this.update(e)
    }
    t.removeSelectedClass = function (e) {
      utils.each(e, function (e) {
        domUtils.removeClasses(e, 'selectTdClass')
      })
    }, t.addSelectedClass = function (e) {
      utils.each(e, function (e) {
        domUtils.addClass(e, 'selectTdClass')
      })
    }, t.isEmptyBlock = function (e) {
      var t = new RegExp(domUtils.fillChar, 'g')
      if (e[browser.ie ? 'innerText' : 'textContent'].replace(/^\s*$/, '').replace(t, '').length > 0) return 0
      for (var i in dtd.$isNotEmpty) { if (dtd.$isNotEmpty.hasOwnProperty(i) && e.getElementsByTagName(i).length) return 0 }
      return 1
    }, t.getWidth = function (e) {
      return e ? parseInt(domUtils.getComputedStyle(e, 'width'), 10) : 0
    }, t.getTableCellAlignState = function (e) {
      !utils.isArray(e) && (e = [e])
      var t = {},
        i = ['align', 'valign'],
        n = null,
        o = !0
      return utils.each(e, function (e) {
        return utils.each(i, function (i) {
          if (n = e.getAttribute(i), !t[i] && n) t[i] = n
          else if (!t[i] || n !== t[i]) return o = !1, !1
        }), o
      }), o ? t : null
    }, t.getTableItemsByRange = function (e) {
      var t = e.selection.getStart()
      t && t.id && t.id.indexOf('_baidu_bookmark_start_') === 0 && t.nextSibling && (t = t.nextSibling)
      var i = t && domUtils.findParentByTagName(t, ['td', 'th'], !0),
        n = i && i.parentNode,
        o = t && domUtils.findParentByTagName(t, 'caption', !0),
        r = o ? o.parentNode : n && n.parentNode.parentNode
      return {
        cell: i,
        tr: n,
        table: r,
        caption: o
      }
    }, t.getUETableBySelected = function (e) {
      var i = t.getTableItemsByRange(e).table
      return i && i.ueTable && i.ueTable.selectedTds.length ? i.ueTable : null
    }, t.getDefaultValue = function (e, t) {
      var i, n, o, r, a = {
        thin: '0px',
        medium: '1px',
        thick: '2px'
      }
      if (t) {
        return s = t.getElementsByTagName('td')[0], r = domUtils.getComputedStyle(t, 'border-left-width'), i = parseInt(a[r] || r, 10), r = domUtils.getComputedStyle(s, 'padding-left'), n = parseInt(a[r] || r, 10), r = domUtils.getComputedStyle(s, 'border-left-width'), o = parseInt(a[r] || r, 10), {
          tableBorder: i,
          tdPadding: n,
          tdBorder: o
        }
      }
      t = e.document.createElement('table'), t.insertRow(0).insertCell(0).innerHTML = 'xxx', e.body.appendChild(t)
      var s = t.getElementsByTagName('td')[0]
      return r = domUtils.getComputedStyle(t, 'border-left-width'), i = parseInt(a[r] || r, 10), r = domUtils.getComputedStyle(s, 'padding-left'), n = parseInt(a[r] || r, 10), r = domUtils.getComputedStyle(s, 'border-left-width'), o = parseInt(a[r] || r, 10), domUtils.remove(t), {
        tableBorder: i,
        tdPadding: n,
        tdBorder: o
      }
    }, t.getUETable = function (e) {
      var i = e.tagName.toLowerCase()
      return e = i == 'td' || i == 'th' || i == 'caption' ? domUtils.findParentByTagName(e, 'table', !0) : e, e.ueTable || (e.ueTable = new t(e)), e.ueTable
    }, t.cloneCell = function (e, t, i) {
      if (!e || utils.isString(e)) return this.table.ownerDocument.createElement(e || 'td')
      var n = domUtils.hasClass(e, 'selectTdClass')
      n && domUtils.removeClasses(e, 'selectTdClass')
      var o = e.cloneNode(!0)
      return t && (o.rowSpan = o.colSpan = 1), !i && domUtils.removeAttributes(o, 'width height'), !i && domUtils.removeAttributes(o, 'style'), o.style.borderLeftStyle = '', o.style.borderTopStyle = '', o.style.borderLeftColor = e.style.borderRightColor, o.style.borderLeftWidth = e.style.borderRightWidth, o.style.borderTopColor = e.style.borderBottomColor, o.style.borderTopWidth = e.style.borderBottomWidth, n && domUtils.addClass(e, 'selectTdClass'), o
    }, t.prototype = {
      getMaxRows: function () {
        for (var e, t = this.table.rows, i = 1, n = 0; e = t[n]; n++) {
          for (var o, r = 1, a = 0; o = e.cells[a++];) r = Math.max(o.rowSpan || 1, r)
          i = Math.max(r + n, i)
        }
        return i
      },
      getMaxCols: function () {
        for (var e, t = this.table.rows, i = 0, n = {}, o = 0; e = t[o]; o++) {
          for (var r, a = 0, s = 0; r = e.cells[s++];) {
            if (a += r.colSpan || 1, r.rowSpan && r.rowSpan > 1) { for (var l = 1; l < r.rowSpan; l++) n['row_' + (o + l)] ? n['row_' + (o + l)]++ : n['row_' + (o + l)] = r.colSpan || 1 }
          }
          a += n['row_' + o] || 0, i = Math.max(a, i)
        }
        return i
      },
      getCellColIndex: function (e) {},
      getHSideCell: function (t, i) {
        try {
          var n, o, r = this.getCellInfo(t),
            a = this.selectedTds.length,
            s = this.cellsRange
          return !i && (a ? !s.beginColIndex : !r.colIndex) || i && (a ? s.endColIndex == this.colsNum - 1 : r.colIndex == this.colsNum - 1) ? null : (n = a ? s.beginRowIndex : r.rowIndex, o = i ? a ? s.endColIndex + 1 : r.colIndex + 1 : a ? s.beginColIndex - 1 : r.colIndex < 1 ? 0 : r.colIndex - 1, this.getCell(this.indexTable[n][o].rowIndex, this.indexTable[n][o].cellIndex))
        } catch (l) {
          e(l)
        }
      },
      getTabNextCell: function (e, t) {
        var i, n = this.getCellInfo(e),
          o = t || n.rowIndex,
          r = n.colIndex + 1 + (n.colSpan - 1)
        try {
          i = this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex)
        } catch (a) {
          try {
            o = 1 * o + 1, r = 0, i = this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex)
          } catch (a) {}
        }
        return i
      },
      getVSideCell: function (t, i, n) {
        try {
          var o, r, a = this.getCellInfo(t),
            s = this.selectedTds.length && !n,
            l = this.cellsRange
          return !i && a.rowIndex == 0 || i && (s ? l.endRowIndex == this.rowsNum - 1 : a.rowIndex + a.rowSpan > this.rowsNum - 1) ? null : (o = i ? s ? l.endRowIndex + 1 : a.rowIndex + a.rowSpan : s ? l.beginRowIndex - 1 : a.rowIndex - 1, r = s ? l.beginColIndex : a.colIndex, this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex))
        } catch (d) {
          e(d)
        }
      },
      getSameEndPosCells: function (t, i) {
        try {
          for (var n = i.toLowerCase() === 'x', o = domUtils.getXY(t)[n ? 'x' : 'y'] + t['offset' + (n ? 'Width' : 'Height')], r = this.table.rows, a = null, s = [], l = 0; l < this.rowsNum; l++) {
            a = r[l].cells
            for (var d, c = 0; d = a[c++];) {
              var u = domUtils.getXY(d)[n ? 'x' : 'y'] + d['offset' + (n ? 'Width' : 'Height')]
              if (u > o && n) break
              if ((t == d || o == u) && (d[n ? 'colSpan' : 'rowSpan'] == 1 && s.push(d), n)) break
            }
          }
          return s
        } catch (m) {
          e(m)
        }
      },
      setCellContent: function (e, t) {
        e.innerHTML = t || (browser.ie ? domUtils.fillChar : '<br />')
      },
      cloneCell: t.cloneCell,
      getSameStartPosXCells: function (t) {
        try {
          for (var i, n = domUtils.getXY(t).x + t.offsetWidth, o = this.table.rows, r = [], a = 0; a < this.rowsNum; a++) {
            i = o[a].cells
            for (var s, l = 0; s = i[l++];) {
              var d = domUtils.getXY(s).x
              if (d > n) break
              if (d == n && s.colSpan == 1) {
                r.push(s)
                break
              }
            }
          }
          return r
        } catch (c) {
          e(c)
        }
      },
      update: function (e) {
        this.table = e || this.table, this.selectedTds = [], this.cellsRange = {}, this.indexTable = []
        for (var t = this.table.rows, i = this.getMaxRows(), n = i - t.length, o = this.getMaxCols(); n--;) this.table.insertRow(t.length)
        this.rowsNum = i, this.colsNum = o
        for (var r = 0, a = t.length; a > r; r++) this.indexTable[r] = new Array(o)
        for (var s, l = 0; s = t[l]; l++) {
          for (var d, c = 0, u = s.cells; d = u[c]; c++) {
            d.rowSpan > i && (d.rowSpan = i)
            for (var m = c, f = d.rowSpan || 1, h = d.colSpan || 1; this.indexTable[l][m];) m++
            for (var p = 0; f > p; p++) {
              for (var g = 0; h > g; g++) {
                this.indexTable[l + p][m + g] = {
                  rowIndex: l,
                  cellIndex: c,
                  colIndex: m,
                  rowSpan: f,
                  colSpan: h
                }
              }
            }
          }
        }
        for (p = 0; i > p; p++) {
          for (g = 0; o > g; g++) {
            void 0 === this.indexTable[p][g] && (s = t[p], d = s.cells[s.cells.length - 1], d = d ? d.cloneNode(!0) : this.table.ownerDocument.createElement('td'), this.setCellContent(d), d.colSpan !== 1 && (d.colSpan = 1), d.rowSpan !== 1 && (d.rowSpan = 1), s.appendChild(d), this.indexTable[p][g] = {
              rowIndex: p,
              cellIndex: d.cellIndex,
              colIndex: g,
              rowSpan: 1,
              colSpan: 1
            })
          }
        }
        var v = domUtils.getElementsByTagName(this.table, 'td'),
          b = []
        if (utils.each(v, function (e) {
          domUtils.hasClass(e, 'selectTdClass') && b.push(e)
        }), b.length) {
          var y = b[0],
            C = b[b.length - 1],
            N = this.getCellInfo(y),
            x = this.getCellInfo(C)
          this.selectedTds = b, this.cellsRange = {
            beginRowIndex: N.rowIndex,
            beginColIndex: N.colIndex,
            endRowIndex: x.rowIndex + x.rowSpan - 1,
            endColIndex: x.colIndex + x.colSpan - 1
          }
        }
        if (!domUtils.hasClass(this.table.rows[0], 'firstRow')) {
          domUtils.addClass(this.table.rows[0], 'firstRow')
          for (var r = 1; r < this.table.rows.length; r++) domUtils.removeClasses(this.table.rows[r], 'firstRow')
        }
      },
      getCellInfo: function (e) {
        if (e) {
          for (var t = e.cellIndex, i = e.parentNode.rowIndex, n = this.indexTable[i], o = this.colsNum, r = t; o > r; r++) {
            var a = n[r]
            if (a.rowIndex === i && a.cellIndex === t) return a
          }
        }
      },
      getCell: function (e, t) {
        return e < this.rowsNum && this.table.rows[e].cells[t] || null
      },
      deleteCell: function (e, t) {
        t = typeof t === 'number' ? t : e.parentNode.rowIndex
        var i = this.table.rows[t]
        i.deleteCell(e.cellIndex)
      },
      getCellsRange: function (e, t) {
        function i (e, t, o, r) {
          var a, s, l, d = e,
            c = t,
            u = o,
            m = r
          if (e > 0) { for (s = t; r > s; s++) a = n.indexTable[e][s], l = a.rowIndex, e > l && (d = Math.min(l, d)) }
          if (r < n.colsNum) { for (l = e; o > l; l++) a = n.indexTable[l][r], s = a.colIndex + a.colSpan - 1, s > r && (m = Math.max(s, m)) }
          if (o < n.rowsNum) { for (s = t; r > s; s++) a = n.indexTable[o][s], l = a.rowIndex + a.rowSpan - 1, l > o && (u = Math.max(l, u)) }
          if (t > 0) { for (l = e; o > l; l++) a = n.indexTable[l][t], s = a.colIndex, t > s && (c = Math.min(a.colIndex, c)) }
          return d != e || c != t || u != o || m != r ? i(d, c, u, m) : {
            beginRowIndex: e,
            beginColIndex: t,
            endRowIndex: o,
            endColIndex: r
          }
        }
        try {
          var n = this,
            o = n.getCellInfo(e)
          if (e === t) {
            return {
              beginRowIndex: o.rowIndex,
              beginColIndex: o.colIndex,
              endRowIndex: o.rowIndex + o.rowSpan - 1,
              endColIndex: o.colIndex + o.colSpan - 1
            }
          }
          var r = n.getCellInfo(t),
            a = Math.min(o.rowIndex, r.rowIndex),
            s = Math.min(o.colIndex, r.colIndex),
            l = Math.max(o.rowIndex + o.rowSpan - 1, r.rowIndex + r.rowSpan - 1),
            d = Math.max(o.colIndex + o.colSpan - 1, r.colIndex + r.colSpan - 1)
          return i(a, s, l, d)
        } catch (c) {}
      },
      getCells: function (e) {
        this.clearSelected()
        for (var t, i, n, o = e.beginRowIndex, r = e.beginColIndex, a = e.endRowIndex, s = e.endColIndex, l = {}, d = [], c = o; a >= c; c++) {
          for (var u = r; s >= u; u++) {
            t = this.indexTable[c][u], i = t.rowIndex, n = t.colIndex
            var m = i + '|' + n
            if (!l[m]) {
              if (l[m] = 1, c > i || u > n || i + t.rowSpan - 1 > a || n + t.colSpan - 1 > s) return null
              d.push(this.getCell(i, t.cellIndex))
            }
          }
        }
        return d
      },
      clearSelected: function () {
        t.removeSelectedClass(this.selectedTds), this.selectedTds = [], this.cellsRange = {}
      },
      setSelected: function (e) {
        var i = this.getCells(e)
        t.addSelectedClass(i), this.selectedTds = i, this.cellsRange = e
      },
      isFullRow: function () {
        var e = this.cellsRange
        return e.endColIndex - e.beginColIndex + 1 == this.colsNum
      },
      isFullCol: function () {
        var e = this.cellsRange,
          t = this.table,
          i = t.getElementsByTagName('th'),
          n = e.endRowIndex - e.beginRowIndex + 1
        return i.length ? n == this.rowsNum || n == this.rowsNum - 1 : n == this.rowsNum
      },
      getNextCell: function (t, i, n) {
        try {
          var o, r, a = this.getCellInfo(t),
            s = this.selectedTds.length && !n,
            l = this.cellsRange
          return !i && a.rowIndex == 0 || i && (s ? l.endRowIndex == this.rowsNum - 1 : a.rowIndex + a.rowSpan > this.rowsNum - 1) ? null : (o = i ? s ? l.endRowIndex + 1 : a.rowIndex + a.rowSpan : s ? l.beginRowIndex - 1 : a.rowIndex - 1, r = s ? l.beginColIndex : a.colIndex, this.getCell(this.indexTable[o][r].rowIndex, this.indexTable[o][r].cellIndex))
        } catch (d) {
          e(d)
        }
      },
      getPreviewCell: function (t, i) {
        try {
          var n, o, r = this.getCellInfo(t),
            a = this.selectedTds.length,
            s = this.cellsRange
          return !i && (a ? !s.beginColIndex : !r.colIndex) || i && (a ? s.endColIndex == this.colsNum - 1 : r.rowIndex > this.colsNum - 1) ? null : (n = i ? a ? s.beginRowIndex : r.rowIndex < 1 ? 0 : r.rowIndex - 1 : a ? s.beginRowIndex : r.rowIndex, o = i ? a ? s.endColIndex + 1 : r.colIndex : a ? s.beginColIndex - 1 : r.colIndex < 1 ? 0 : r.colIndex - 1, this.getCell(this.indexTable[n][o].rowIndex, this.indexTable[n][o].cellIndex))
        } catch (l) {
          e(l)
        }
      },
      moveContent: function (e, i) {
        if (!t.isEmptyBlock(i)) {
          if (t.isEmptyBlock(e)) return void (e.innerHTML = i.innerHTML)
          var n = e.lastChild
          for (n.nodeType != 3 && dtd.$block[n.tagName] || e.appendChild(e.ownerDocument.createElement('br')); n = i.firstChild;) e.appendChild(n)
        }
      },
      mergeRight: function (e) {
        var t = this.getCellInfo(e),
          i = t.colIndex + t.colSpan,
          n = this.indexTable[t.rowIndex][i],
          o = this.getCell(n.rowIndex, n.cellIndex)
        e.colSpan = t.colSpan + n.colSpan, e.removeAttribute('width'), this.moveContent(e, o), this.deleteCell(o, n.rowIndex), this.update()
      },
      mergeDown: function (e) {
        var t = this.getCellInfo(e),
          i = t.rowIndex + t.rowSpan,
          n = this.indexTable[i][t.colIndex],
          o = this.getCell(n.rowIndex, n.cellIndex)
        e.rowSpan = t.rowSpan + n.rowSpan, e.removeAttribute('height'), this.moveContent(e, o), this.deleteCell(o, n.rowIndex), this.update()
      },
      mergeRange: function () {
        var e = this.cellsRange,
          t = this.getCell(e.beginRowIndex, this.indexTable[e.beginRowIndex][e.beginColIndex].cellIndex)
        if (t.tagName == 'TH' && e.endRowIndex !== e.beginRowIndex) {
          var i = this.indexTable,
            n = this.getCellInfo(t)
          t = this.getCell(1, i[1][n.colIndex].cellIndex), e = this.getCellsRange(t, this.getCell(i[this.rowsNum - 1][n.colIndex].rowIndex, i[this.rowsNum - 1][n.colIndex].cellIndex))
        }
        for (var o, r = this.getCells(e), a = 0; o = r[a++];) o !== t && (this.moveContent(t, o), this.deleteCell(o))
        if (t.rowSpan = e.endRowIndex - e.beginRowIndex + 1, t.rowSpan > 1 && t.removeAttribute('height'), t.colSpan = e.endColIndex - e.beginColIndex + 1, t.colSpan > 1 && t.removeAttribute('width'), t.rowSpan == this.rowsNum && t.colSpan != 1 && (t.colSpan = 1), t.colSpan == this.colsNum && t.rowSpan != 1) {
          var s = t.parentNode.rowIndex
          if (this.table.deleteRow) { for (var a = s + 1, l = s + 1, d = t.rowSpan; d > a; a++) this.table.deleteRow(l) } else {
            for (var a = 0, d = t.rowSpan - 1; d > a; a++) {
              var c = this.table.rows[s + 1]
              c.parentNode.removeChild(c)
            }
          }
          t.rowSpan = 1
        }
        this.update()
      },
      insertRow: function (e, t) {
        function i (e, t, i) {
          if (e == 0) {
            var n = i.nextSibling || i.previousSibling,
              o = n.cells[e]
            o.tagName == 'TH' && (o = t.ownerDocument.createElement('th'), o.appendChild(t.firstChild), i.insertBefore(o, t), domUtils.remove(t))
          } else if (t.tagName == 'TH') {
            var r = t.ownerDocument.createElement('td')
            r.appendChild(t.firstChild), i.insertBefore(r, t), domUtils.remove(t)
          }
        }
        var n, o = this.colsNum,
          r = this.table,
          a = r.insertRow(e),
          s = typeof t === 'string' && t.toUpperCase() == 'TH'
        if (e == 0 || e == this.rowsNum) { for (var l = 0; o > l; l++) n = this.cloneCell(t, !0), this.setCellContent(n), n.getAttribute('vAlign') && n.setAttribute('vAlign', n.getAttribute('vAlign')), a.appendChild(n), s || i(l, n, a) } else {
          var d = this.indexTable[e]
          for (l = 0; o > l; l++) {
            var c = d[l]
            c.rowIndex < e ? (n = this.getCell(c.rowIndex, c.cellIndex), n.rowSpan = c.rowSpan + 1) : (n = this.cloneCell(t, !0), this.setCellContent(n), a.appendChild(n)), s || i(l, n, a)
          }
        }
        return this.update(), a
      },
      deleteRow: function (e) {
        for (var t = this.table.rows[e], i = this.indexTable[e], n = this.colsNum, o = 0, r = 0; n > r;) {
          var a = i[r],
            s = this.getCell(a.rowIndex, a.cellIndex)
          if (s.rowSpan > 1 && a.rowIndex == e) {
            var l = s.cloneNode(!0)
            l.rowSpan = s.rowSpan - 1, l.innerHTML = '', s.rowSpan = 1
            var d, c = e + 1,
              u = this.table.rows[c],
              m = this.getPreviewMergedCellsNum(c, r) - o
            r > m ? (d = r - m - 1, domUtils.insertAfter(u.cells[d], l)) : u.cells.length && u.insertBefore(l, u.cells[0]), o += 1
          }
          r += s.colSpan || 1
        }
        var f = [],
          h = {}
        for (r = 0; n > r; r++) {
          var p = i[r].rowIndex,
            g = i[r].cellIndex,
            v = p + '_' + g
          h[v] || (h[v] = 1, s = this.getCell(p, g), f.push(s))
        }
        var b = []
        utils.each(f, function (e) {
          e.rowSpan == 1 ? e.parentNode.removeChild(e) : b.push(e)
        }), utils.each(b, function (e) {
          e.rowSpan--
        }), t.parentNode.removeChild(t), this.update()
      },
      insertCol: function (e, t, i) {
        function n (e, t, i) {
          if (e == 0) {
            var n = t.nextSibling || t.previousSibling
            n.tagName == 'TH' && (n = t.ownerDocument.createElement('th'), n.appendChild(t.firstChild), i.insertBefore(n, t), domUtils.remove(t))
          } else if (t.tagName == 'TH') {
            var o = t.ownerDocument.createElement('td')
            o.appendChild(t.firstChild), i.insertBefore(o, t), domUtils.remove(t)
          }
        }
        var o, r, a, s = this.rowsNum,
          l = 0,
          d = parseInt((this.table.offsetWidth - 20 * (this.colsNum + 1) - (this.colsNum + 1)) / (this.colsNum + 1), 10),
          c = typeof t === 'string' && t.toUpperCase() == 'TH'
        if (e == 0 || e == this.colsNum) { for (; s > l; l++) o = this.table.rows[l], a = o.cells[e == 0 ? e : o.cells.length], r = this.cloneCell(t, !0), this.setCellContent(r), r.setAttribute('vAlign', r.getAttribute('vAlign')), a && r.setAttribute('width', a.getAttribute('width')), e ? domUtils.insertAfter(o.cells[o.cells.length - 1], r) : o.insertBefore(r, o.cells[0]), c || n(l, r, o) } else {
          for (; s > l; l++) {
            var u = this.indexTable[l][e]
            u.colIndex < e ? (r = this.getCell(u.rowIndex, u.cellIndex), r.colSpan = u.colSpan + 1) : (o = this.table.rows[l], a = o.cells[u.cellIndex], r = this.cloneCell(t, !0), this.setCellContent(r), r.setAttribute('vAlign', r.getAttribute('vAlign')), a && r.setAttribute('width', a.getAttribute('width')), a ? o.insertBefore(r, a) : o.appendChild(r)), c || n(l, r, o)
          }
        }
        this.update(), this.updateWidth(d, i || {
          tdPadding: 10,
          tdBorder: 1
        })
      },
      updateWidth: function (e, i) {
        var n = this.table,
          o = t.getWidth(n) - 2 * i.tdPadding - i.tdBorder + e
        if (o < n.ownerDocument.body.offsetWidth) return void n.setAttribute('width', o)
        var r = domUtils.getElementsByTagName(this.table, 'td th')
        utils.each(r, function (t) {
          t.setAttribute('width', e)
        })
      },
      deleteCol: function (e) {
        for (var t = this.indexTable, i = this.table.rows, n = this.table.getAttribute('width'), o = 0, r = this.rowsNum, a = {}, s = 0; r > s;) {
          var l = t[s],
            d = l[e],
            c = d.rowIndex + '_' + d.colIndex
          if (!a[c]) {
            a[c] = 1
            var u = this.getCell(d.rowIndex, d.cellIndex)
            o || (o = u && parseInt(u.offsetWidth / u.colSpan, 10).toFixed(0)), u.colSpan > 1 ? u.colSpan-- : i[s].deleteCell(d.cellIndex), s += d.rowSpan || 1
          }
        }
        this.table.setAttribute('width', n - o), this.update()
      },
      splitToCells: function (e) {
        var t = this,
          i = this.splitToRows(e)
        utils.each(i, function (e) {
          t.splitToCols(e)
        })
      },
      splitToRows: function (e) {
        var t = this.getCellInfo(e),
          i = t.rowIndex,
          n = t.colIndex,
          o = []
        e.rowSpan = 1, o.push(e)
        for (var r = i, a = i + t.rowSpan; a > r; r++) {
          if (r != i) {
            var s = this.table.rows[r],
              l = s.insertCell(n - this.getPreviewMergedCellsNum(r, n))
            l.colSpan = t.colSpan, this.setCellContent(l), l.setAttribute('vAlign', e.getAttribute('vAlign')), l.setAttribute('align', e.getAttribute('align')), e.style.cssText && (l.style.cssText = e.style.cssText), o.push(l)
          }
        }
        return this.update(), o
      },
      getPreviewMergedCellsNum: function (e, t) {
        for (var i = this.indexTable[e], n = 0, o = 0; t > o;) {
          var r = i[o].colSpan,
            a = i[o].rowIndex
          n += r - (a == e ? 1 : 0), o += r
        }
        return n
      },
      splitToCols: function (e) {
        var t = (e.offsetWidth / e.colSpan - 22).toFixed(0),
          i = this.getCellInfo(e),
          n = i.rowIndex,
          o = i.colIndex,
          r = []
        e.colSpan = 1, e.setAttribute('width', t), r.push(e)
        for (var a = o, s = o + i.colSpan; s > a; a++) {
          if (a != o) {
            var l = this.table.rows[n],
              d = l.insertCell(this.indexTable[n][a].cellIndex + 1)
            if (d.rowSpan = i.rowSpan, this.setCellContent(d), d.setAttribute('vAlign', e.getAttribute('vAlign')), d.setAttribute('align', e.getAttribute('align')), d.setAttribute('width', t), e.style.cssText && (d.style.cssText = e.style.cssText), e.tagName == 'TH') {
              var c = e.ownerDocument.createElement('th')
              c.appendChild(d.firstChild), c.setAttribute('vAlign', e.getAttribute('vAlign')), c.rowSpan = d.rowSpan, l.insertBefore(c, d), domUtils.remove(d)
            }
            r.push(d)
          }
        }
        return this.update(), r
      },
      isLastCell: function (e, t, i) {
        t = t || this.rowsNum, i = i || this.colsNum
        var n = this.getCellInfo(e)
        return n.rowIndex + n.rowSpan == t && n.colIndex + n.colSpan == i
      },
      getLastCell: function (e) {
        e = e || this.table.getElementsByTagName('td')
        var t, i = (this.getCellInfo(e[0]), this),
          n = e[0],
          o = n.parentNode,
          r = 0,
          a = 0
        return utils.each(e, function (e) {
          e.parentNode == o && (a += e.colSpan || 1), r += e.rowSpan * e.colSpan || 1
        }), t = r / a, utils.each(e, function (e) {
          return i.isLastCell(e, t, a) ? (n = e, !1) : void 0
        }), n
      },
      selectRow: function (e) {
        var t = this.indexTable[e],
          i = this.getCell(t[0].rowIndex, t[0].cellIndex),
          n = this.getCell(t[this.colsNum - 1].rowIndex, t[this.colsNum - 1].cellIndex),
          o = this.getCellsRange(i, n)
        this.setSelected(o)
      },
      selectTable: function () {
        var e = this.table.getElementsByTagName('td'),
          t = this.getCellsRange(e[0], e[e.length - 1])
        this.setSelected(t)
      },
      setBackground: function (e, t) {
        if (typeof t === 'string') {
          utils.each(e, function (e) {
            e.style.backgroundColor = t
          })
        } else if (typeof t === 'object') {
          t = utils.extend({
            repeat: !0,
            colorList: ['#ddd', '#fff']
          }, t)
          for (var i, n = this.getCellInfo(e[0]).rowIndex, o = 0, r = t.colorList, a = function (e, t, i) {
              return e[t] ? e[t] : i ? e[t % e.length] : ''
            }, s = 0; i = e[s++];) {
            var l = this.getCellInfo(i)
            i.style.backgroundColor = a(r, n + o == l.rowIndex ? o : ++o, t.repeat)
          }
        }
      },
      removeBackground: function (e) {
        utils.each(e, function (e) {
          e.style.backgroundColor = ''
        })
      }
    }
  }()),
  (function () {
    function e (e, i) {
      var n = domUtils.getElementsByTagName(e, 'td th')
      utils.each(n, function (e) {
        e.removeAttribute('width')
      }), e.setAttribute('width', t(i, !0, a(i, e)))
      var o = []
      setTimeout(function () {
        utils.each(n, function (e) {
          e.colSpan == 1 && o.push(e.offsetWidth)
        }), utils.each(n, function (e, t) {
          e.colSpan == 1 && e.setAttribute('width', o[t] + '')
        })
      }, 0)
    }

    function t (e, t, i) {
      var n = e.body
      return n.offsetWidth - (t ? 2 * parseInt(domUtils.getComputedStyle(n, 'margin-left'), 10) : 0) - 2 * i.tableBorder - (e.options.offsetWidth || 0)
    }

    function i (e) {
      var t = o(e).cell
      if (t) {
        var i = s(t)
        return i.selectedTds.length ? i.selectedTds : [t]
      }
      return []
    }
    var n = UE.UETable,
      o = function (e) {
        return n.getTableItemsByRange(e)
      },
      r = function (e) {
        return n.getUETableBySelected(e)
      },
      a = function (e, t) {
        return n.getDefaultValue(e, t)
      },
      s = function (e) {
        return n.getUETable(e)
      }
    UE.commands.inserttable = {
      queryCommandState: function () {
        return o(this).table ? -1 : 0
      },
      execCommand: function (e, t) {
        function i (e, t) {
          for (var i = [], n = e.numRows, o = e.numCols, r = 0; n > r; r++) {
            i.push('<tr' + (r == 0 ? ' class="firstRow"' : '') + '>')
            for (var a = 0; o > a; a++) i.push('<td width="' + t + '"  vAlign="' + e.tdvalign + '" >' + (browser.ie && browser.version < 11 ? domUtils.fillChar : '<br/>') + '</td>')
            i.push('</tr>')
          }
          return '<table><tbody>' + i.join('') + '</tbody></table>'
        }
        t || (t = utils.extend({}, {
          numCols: this.options.defaultCols,
          numRows: this.options.defaultRows,
          tdvalign: this.options.tdvalign
        }))
        var n = this,
          o = this.selection.getRange(),
          r = o.startContainer,
          s = domUtils.findParent(r, function (e) {
            return domUtils.isBlockElm(e)
          }, !0) || n.body,
          l = a(n),
          d = s.offsetWidth,
          c = Math.floor(d / t.numCols - 2 * l.tdPadding - l.tdBorder)
        !t.tdvalign && (t.tdvalign = n.options.tdvalign), n.execCommand('inserthtml', i(t, c))
      }
    }, UE.commands.insertparagraphbeforetable = {
      queryCommandState: function () {
        return o(this).cell ? 0 : -1
      },
      execCommand: function () {
        var e = o(this).table
        if (e) {
          var t = this.document.createElement('p')
          t.innerHTML = browser.ie ? '&nbsp;' : '<br />', e.parentNode.insertBefore(t, e), this.selection.getRange().setStart(t, 0).setCursor()
        }
      }
    }, UE.commands.deletetable = {
      queryCommandState: function () {
        var e = this.selection.getRange()
        return domUtils.findParentByTagName(e.startContainer, 'table', !0) ? 0 : -1
      },
      execCommand: function (e, t) {
        var i = this.selection.getRange()
        if (t = t || domUtils.findParentByTagName(i.startContainer, 'table', !0)) {
          var n = t.nextSibling
          n || (n = domUtils.createElement(this.document, 'p', {
            innerHTML: browser.ie ? domUtils.fillChar : '<br/>'
          }), t.parentNode.insertBefore(n, t)), domUtils.remove(t), i = this.selection.getRange(), n.nodeType == 3 ? i.setStartBefore(n) : i.setStart(n, 0), i.setCursor(!1, !0), this.fireEvent('tablehasdeleted')
        }
      }
    }, UE.commands.cellalign = {
      queryCommandState: function () {
        return i(this).length ? 0 : -1
      },
      execCommand: function (e, t) {
        var n = i(this)
        if (n.length) { for (var o, r = 0; o = n[r++];) o.setAttribute('align', t) }
      }
    }, UE.commands.cellvalign = {
      queryCommandState: function () {
        return i(this).length ? 0 : -1
      },
      execCommand: function (e, t) {
        var n = i(this)
        if (n.length) { for (var o, r = 0; o = n[r++];) o.setAttribute('vAlign', t) }
      }
    }, UE.commands.insertcaption = {
      queryCommandState: function () {
        var e = o(this).table
        return e && e.getElementsByTagName('caption').length == 0 ? 1 : -1
      },
      execCommand: function () {
        var e = o(this).table
        if (e) {
          var t = this.document.createElement('caption')
          t.innerHTML = browser.ie ? domUtils.fillChar : '<br/>', e.insertBefore(t, e.firstChild)
          var i = this.selection.getRange()
          i.setStart(t, 0).setCursor()
        }
      }
    }, UE.commands.deletecaption = {
      queryCommandState: function () {
        var e = this.selection.getRange(),
          t = domUtils.findParentByTagName(e.startContainer, 'table')
        return t ? t.getElementsByTagName('caption').length == 0 ? -1 : 1 : -1
      },
      execCommand: function () {
        var e = this.selection.getRange(),
          t = domUtils.findParentByTagName(e.startContainer, 'table')
        if (t) {
          domUtils.remove(t.getElementsByTagName('caption')[0])
          var i = this.selection.getRange()
          i.setStart(t.rows[0].cells[0], 0).setCursor()
        }
      }
    }, UE.commands.inserttitle = {
      queryCommandState: function () {
        var e = o(this).table
        if (e) {
          var t = e.rows[0]
          return t.cells[t.cells.length - 1].tagName.toLowerCase() != 'th' ? 0 : -1
        }
        return -1
      },
      execCommand: function () {
        var e = o(this).table
        e && s(e).insertRow(0, 'th')
        var t = e.getElementsByTagName('th')[0]
        this.selection.getRange().setStart(t, 0).setCursor(!1, !0)
      }
    }, UE.commands.deletetitle = {
      queryCommandState: function () {
        var e = o(this).table
        if (e) {
          var t = e.rows[0]
          return t.cells[t.cells.length - 1].tagName.toLowerCase() == 'th' ? 0 : -1
        }
        return -1
      },
      execCommand: function () {
        var e = o(this).table
        e && domUtils.remove(e.rows[0])
        var t = e.getElementsByTagName('td')[0]
        this.selection.getRange().setStart(t, 0).setCursor(!1, !0)
      }
    }, UE.commands.inserttitlecol = {
      queryCommandState: function () {
        var e = o(this).table
        if (e) {
          var t = e.rows[e.rows.length - 1]
          return t.getElementsByTagName('th').length ? -1 : 0
        }
        return -1
      },
      execCommand: function (t) {
        var i = o(this).table
        i && s(i).insertCol(0, 'th'), e(i, this)
        var n = i.getElementsByTagName('th')[0]
        this.selection.getRange().setStart(n, 0).setCursor(!1, !0)
      }
    }, UE.commands.deletetitlecol = {
      queryCommandState: function () {
        var e = o(this).table
        if (e) {
          var t = e.rows[e.rows.length - 1]
          return t.getElementsByTagName('th').length ? 0 : -1
        }
        return -1
      },
      execCommand: function () {
        var t = o(this).table
        if (t) { for (var i = 0; i < t.rows.length; i++) domUtils.remove(t.rows[i].children[0]) }
        e(t, this)
        var n = t.getElementsByTagName('td')[0]
        this.selection.getRange().setStart(n, 0).setCursor(!1, !0)
      }
    }, UE.commands.mergeright = {
      queryCommandState: function (e) {
        var t = o(this),
          i = t.table,
          n = t.cell
        if (!i || !n) return -1
        var r = s(i)
        if (r.selectedTds.length) return -1
        var a = r.getCellInfo(n),
          l = a.colIndex + a.colSpan
        if (l >= r.colsNum) return -1
        var d = r.indexTable[a.rowIndex][l],
          c = i.rows[d.rowIndex].cells[d.cellIndex]
        return c && n.tagName == c.tagName && d.rowIndex == a.rowIndex && d.rowSpan == a.rowSpan ? 0 : -1
      },
      execCommand: function (e) {
        var t = this.selection.getRange(),
          i = t.createBookmark(!0),
          n = o(this).cell,
          r = s(n)
        r.mergeRight(n), t.moveToBookmark(i).select()
      }
    }, UE.commands.mergedown = {
      queryCommandState: function (e) {
        var t = o(this),
          i = t.table,
          n = t.cell
        if (!i || !n) return -1
        var r = s(i)
        if (r.selectedTds.length) return -1
        var a = r.getCellInfo(n),
          l = a.rowIndex + a.rowSpan
        if (l >= r.rowsNum) return -1
        var d = r.indexTable[l][a.colIndex],
          c = i.rows[d.rowIndex].cells[d.cellIndex]
        return c && n.tagName == c.tagName && d.colIndex == a.colIndex && d.colSpan == a.colSpan ? 0 : -1
      },
      execCommand: function () {
        var e = this.selection.getRange(),
          t = e.createBookmark(!0),
          i = o(this).cell,
          n = s(i)
        n.mergeDown(i), e.moveToBookmark(t).select()
      }
    }, UE.commands.mergecells = {
      queryCommandState: function () {
        return r(this) ? 0 : -1
      },
      execCommand: function () {
        var e = r(this)
        if (e && e.selectedTds.length) {
          var t = e.selectedTds[0]
          e.mergeRange()
          var i = this.selection.getRange()
          domUtils.isEmptyBlock(t) ? i.setStart(t, 0).collapse(!0) : i.selectNodeContents(t), i.select()
        }
      }
    }, UE.commands.insertrow = {
      queryCommandState: function () {
        var e = o(this),
          t = e.cell
        return t && (t.tagName == 'TD' || t.tagName == 'TH' && e.tr !== e.table.rows[0]) && s(e.table).rowsNum < this.options.maxRowNum ? 0 : -1
      },
      execCommand: function () {
        var e = this.selection.getRange(),
          t = e.createBookmark(!0),
          i = o(this),
          n = i.cell,
          r = i.table,
          a = s(r),
          l = a.getCellInfo(n)
        if (a.selectedTds.length) { for (var d = a.cellsRange, c = 0, u = d.endRowIndex - d.beginRowIndex + 1; u > c; c++) a.insertRow(d.beginRowIndex, n) } else a.insertRow(l.rowIndex, n)
        e.moveToBookmark(t).select(), r.getAttribute('interlaced') === 'enabled' && this.fireEvent('interlacetable', r)
      }
    }, UE.commands.insertrownext = {
      queryCommandState: function () {
        var e = o(this),
          t = e.cell
        return t && t.tagName == 'TD' && s(e.table).rowsNum < this.options.maxRowNum ? 0 : -1
      },
      execCommand: function () {
        var e = this.selection.getRange(),
          t = e.createBookmark(!0),
          i = o(this),
          n = i.cell,
          r = i.table,
          a = s(r),
          l = a.getCellInfo(n)
        if (a.selectedTds.length) { for (var d = a.cellsRange, c = 0, u = d.endRowIndex - d.beginRowIndex + 1; u > c; c++) a.insertRow(d.endRowIndex + 1, n) } else a.insertRow(l.rowIndex + l.rowSpan, n)
        e.moveToBookmark(t).select(), r.getAttribute('interlaced') === 'enabled' && this.fireEvent('interlacetable', r)
      }
    }, UE.commands.deleterow = {
      queryCommandState: function () {
        var e = o(this)
        return e.cell ? 0 : -1
      },
      execCommand: function () {
        var e = o(this).cell,
          t = s(e),
          i = t.cellsRange,
          n = t.getCellInfo(e),
          r = t.getVSideCell(e),
          a = t.getVSideCell(e, !0),
          l = this.selection.getRange()
        if (utils.isEmptyObject(i)) t.deleteRow(n.rowIndex)
        else { for (var d = i.beginRowIndex; d < i.endRowIndex + 1; d++) t.deleteRow(i.beginRowIndex) }
        var c = t.table
        if (c.getElementsByTagName('td').length) {
          if (n.rowSpan == 1 || n.rowSpan == i.endRowIndex - i.beginRowIndex + 1)(a || r) && l.selectNodeContents(a || r).setCursor(!1, !0)
          else {
            var u = t.getCell(n.rowIndex, t.indexTable[n.rowIndex][n.colIndex].cellIndex)
            u && l.selectNodeContents(u).setCursor(!1, !0)
          }
        } else {
          var m = c.nextSibling
          domUtils.remove(c), m && l.setStart(m, 0).setCursor(!1, !0)
        }
        c.getAttribute('interlaced') === 'enabled' && this.fireEvent('interlacetable', c)
      }
    }, UE.commands.insertcol = {
      queryCommandState: function (e) {
        var t = o(this),
          i = t.cell
        return i && (i.tagName == 'TD' || i.tagName == 'TH' && i !== t.tr.cells[0]) && s(t.table).colsNum < this.options.maxColNum ? 0 : -1
      },
      execCommand: function (e) {
        var t = this.selection.getRange(),
          i = t.createBookmark(!0)
        if (this.queryCommandState(e) != -1) {
          var n = o(this).cell,
            r = s(n),
            a = r.getCellInfo(n)
          if (r.selectedTds.length) { for (var l = r.cellsRange, d = 0, c = l.endColIndex - l.beginColIndex + 1; c > d; d++) r.insertCol(l.beginColIndex, n) } else r.insertCol(a.colIndex, n)
          t.moveToBookmark(i).select(!0)
        }
      }
    }, UE.commands.insertcolnext = {
      queryCommandState: function () {
        var e = o(this),
          t = e.cell
        return t && s(e.table).colsNum < this.options.maxColNum ? 0 : -1
      },
      execCommand: function () {
        var e = this.selection.getRange(),
          t = e.createBookmark(!0),
          i = o(this).cell,
          n = s(i),
          r = n.getCellInfo(i)
        if (n.selectedTds.length) { for (var a = n.cellsRange, l = 0, d = a.endColIndex - a.beginColIndex + 1; d > l; l++) n.insertCol(a.endColIndex + 1, i) } else n.insertCol(r.colIndex + r.colSpan, i)
        e.moveToBookmark(t).select()
      }
    }, UE.commands.deletecol = {
      queryCommandState: function () {
        var e = o(this)
        return e.cell ? 0 : -1
      },
      execCommand: function () {
        var e = o(this).cell,
          t = s(e),
          i = t.cellsRange,
          n = t.getCellInfo(e),
          r = t.getHSideCell(e),
          a = t.getHSideCell(e, !0)
        if (utils.isEmptyObject(i)) t.deleteCol(n.colIndex)
        else { for (var l = i.beginColIndex; l < i.endColIndex + 1; l++) t.deleteCol(i.beginColIndex) }
        var d = t.table,
          c = this.selection.getRange()
        if (d.getElementsByTagName('td').length) domUtils.inDoc(e, this.document) ? c.setStart(e, 0).setCursor(!1, !0) : a && domUtils.inDoc(a, this.document) ? c.selectNodeContents(a).setCursor(!1, !0) : r && domUtils.inDoc(r, this.document) && c.selectNodeContents(r).setCursor(!0, !0)
        else {
          var u = d.nextSibling
          domUtils.remove(d), u && c.setStart(u, 0).setCursor(!1, !0)
        }
      }
    }, UE.commands.splittocells = {
      queryCommandState: function () {
        var e = o(this),
          t = e.cell
        if (!t) return -1
        var i = s(e.table)
        return i.selectedTds.length > 0 ? -1 : t && (t.colSpan > 1 || t.rowSpan > 1) ? 0 : -1
      },
      execCommand: function () {
        var e = this.selection.getRange(),
          t = e.createBookmark(!0),
          i = o(this).cell,
          n = s(i)
        n.splitToCells(i), e.moveToBookmark(t).select()
      }
    }, UE.commands.splittorows = {
      queryCommandState: function () {
        var e = o(this),
          t = e.cell
        if (!t) return -1
        var i = s(e.table)
        return i.selectedTds.length > 0 ? -1 : t && t.rowSpan > 1 ? 0 : -1
      },
      execCommand: function () {
        var e = this.selection.getRange(),
          t = e.createBookmark(!0),
          i = o(this).cell,
          n = s(i)
        n.splitToRows(i), e.moveToBookmark(t).select()
      }
    }, UE.commands.splittocols = {
      queryCommandState: function () {
        var e = o(this),
          t = e.cell
        if (!t) return -1
        var i = s(e.table)
        return i.selectedTds.length > 0 ? -1 : t && t.colSpan > 1 ? 0 : -1
      },
      execCommand: function () {
        var e = this.selection.getRange(),
          t = e.createBookmark(!0),
          i = o(this).cell,
          n = s(i)
        n.splitToCols(i), e.moveToBookmark(t).select()
      }
    }, UE.commands.adaptbytext = UE.commands.adaptbywindow = {
      queryCommandState: function () {
        return o(this).table ? 0 : -1
      },
      execCommand: function (t) {
        var i = o(this),
          n = i.table
        if (n) {
          if (t == 'adaptbywindow') e(n, this)
          else {
            var r = domUtils.getElementsByTagName(n, 'td th')
            utils.each(r, function (e) {
              e.removeAttribute('width')
            }), n.removeAttribute('width')
          }
        }
      }
    }, UE.commands.averagedistributecol = {
      queryCommandState: function () {
        var e = r(this)
        return e && (e.isFullRow() || e.isFullCol()) ? 0 : -1
      },
      execCommand: function (e) {
        function t () {
          var e, t = o.table,
            i = 0,
            r = 0,
            s = a(n, t)
          if (o.isFullRow()) i = t.offsetWidth, r = o.colsNum
          else { for (var l, d = o.cellsRange.beginColIndex, c = o.cellsRange.endColIndex, u = d; c >= u;) l = o.selectedTds[u], i += l.offsetWidth, u += l.colSpan, r += 1 }
          return e = Math.ceil(i / r) - 2 * s.tdBorder - 2 * s.tdPadding
        }

        function i (e) {
          utils.each(domUtils.getElementsByTagName(o.table, 'th'), function (e) {
            e.setAttribute('width', '')
          })
          var t = o.isFullRow() ? domUtils.getElementsByTagName(o.table, 'td') : o.selectedTds
          utils.each(t, function (t) {
            t.colSpan == 1 && t.setAttribute('width', e)
          })
        }
        var n = this,
          o = r(n)
        o && o.selectedTds.length && i(t())
      }
    }, UE.commands.averagedistributerow = {
      queryCommandState: function () {
        var e = r(this)
        return e ? e.selectedTds && /th/gi.test(e.selectedTds[0].tagName) ? -1 : e.isFullRow() || e.isFullCol() ? 0 : -1 : -1
      },
      execCommand: function (e) {
        function t () {
          var e, t, i = 0,
            r = o.table,
            s = a(n, r),
            l = parseInt(domUtils.getComputedStyle(r.getElementsByTagName('td')[0], 'padding-top'))
          if (o.isFullCol()) {
            var d, c, u = domUtils.getElementsByTagName(r, 'caption'),
              m = domUtils.getElementsByTagName(r, 'th')
            u.length > 0 && (d = u[0].offsetHeight), m.length > 0 && (c = m[0].offsetHeight), i = r.offsetHeight - (d || 0) - (c || 0), t = m.length == 0 ? o.rowsNum : o.rowsNum - 1
          } else {
            for (var f = o.cellsRange.beginRowIndex, h = o.cellsRange.endRowIndex, p = 0, g = domUtils.getElementsByTagName(r, 'tr'), v = f; h >= v; v++) i += g[v].offsetHeight, p += 1
            t = p
          }
          return e = browser.ie && browser.version < 9 ? Math.ceil(i / t) : Math.ceil(i / t) - 2 * s.tdBorder - 2 * l
        }

        function i (e) {
          var t = o.isFullCol() ? domUtils.getElementsByTagName(o.table, 'td') : o.selectedTds
          utils.each(t, function (t) {
            t.rowSpan == 1 && t.setAttribute('height', e)
          })
        }
        var n = this,
          o = r(n)
        o && o.selectedTds.length && i(t())
      }
    }, UE.commands.cellalignment = {
      queryCommandState: function () {
        return o(this).table ? 0 : -1
      },
      execCommand: function (e, t) {
        var i = this,
          n = r(i)
        if (n) {
          utils.each(n.selectedTds, function (e) {
            domUtils.setAttributes(e, t)
          })
        } else {
          var o = i.selection.getStart(),
            a = o && domUtils.findParentByTagName(o, ['td', 'th', 'caption'], !0);
          /caption/gi.test(a.tagName) ? (a.style.textAlign = t.align, a.style.verticalAlign = t.vAlign) : domUtils.setAttributes(a, t), i.selection.getRange().setCursor(!0)
        }
      },
      queryCommandValue: function (e) {
        var t = o(this).cell
        if (t || (t = i(this)[0]), t) {
          var n = UE.UETable.getUETable(t).selectedTds
          return !n.length && (n = t), UE.UETable.getTableCellAlignState(n)
        }
        return null
      }
    }, UE.commands.tablealignment = {
      queryCommandState: function () {
        return browser.ie && browser.version < 8 ? -1 : o(this).table ? 0 : -1
      },
      execCommand: function (e, t) {
        var i = this,
          n = i.selection.getStart(),
          o = n && domUtils.findParentByTagName(n, ['table'], !0)
        o && o.setAttribute('align', t)
      }
    }, UE.commands.edittable = {
      queryCommandState: function () {
        return o(this).table ? 0 : -1
      },
      execCommand: function (e, t) {
        var i = this.selection.getRange(),
          n = domUtils.findParentByTagName(i.startContainer, 'table')
        if (n) {
          var o = domUtils.getElementsByTagName(n, 'td').concat(domUtils.getElementsByTagName(n, 'th'), domUtils.getElementsByTagName(n, 'caption'))
          utils.each(o, function (e) {
            e.style.borderColor = t
          })
        }
      }
    }, UE.commands.edittd = {
      queryCommandState: function () {
        return o(this).table ? 0 : -1
      },
      execCommand: function (e, t) {
        var i = this,
          n = r(i)
        if (n) {
          utils.each(n.selectedTds, function (e) {
            e.style.backgroundColor = t
          })
        } else {
          var o = i.selection.getStart(),
            a = o && domUtils.findParentByTagName(o, ['td', 'th', 'caption'], !0)
          a && (a.style.backgroundColor = t)
        }
      }
    }, UE.commands.settablebackground = {
      queryCommandState: function () {
        return i(this).length > 1 ? 0 : -1
      },
      execCommand: function (e, t) {
        var n, o
        n = i(this), o = s(n[0]), o.setBackground(n, t)
      }
    }, UE.commands.cleartablebackground = {
      queryCommandState: function () {
        var e = i(this)
        if (!e.length) return -1
        for (var t, n = 0; t = e[n++];) { if (t.style.backgroundColor !== '') return 0 }
        return -1
      },
      execCommand: function () {
        var e = i(this),
          t = s(e[0])
        t.removeBackground(e)
      }
    }, UE.commands.interlacetable = UE.commands.uninterlacetable = {
      queryCommandState: function (e) {
        var t = o(this).table
        if (!t) return -1
        var i = t.getAttribute('interlaced')
        return e == 'interlacetable' ? i === 'enabled' ? -1 : 0 : i && i !== 'disabled' ? 0 : -1
      },
      execCommand: function (e, t) {
        var i = o(this).table
        e == 'interlacetable' ? (i.setAttribute('interlaced', 'enabled'), this.fireEvent('interlacetable', i, t)) : (i.setAttribute('interlaced', 'disabled'), this.fireEvent('uninterlacetable', i))
      }
    }, UE.commands.setbordervisible = {
      queryCommandState: function (e) {
        var t = o(this).table
        return t ? 0 : -1
      },
      execCommand: function () {
        var e = o(this).table
        utils.each(domUtils.getElementsByTagName(e, 'td'), function (e) {
          e.style.borderWidth = '1px', e.style.borderStyle = 'solid'
        })
      }
    }
  }()), UE.plugins.table = function () {
    function e (e) {}

    function t (e, t) {
      i(e, 'width', !0), i(e, 'height', !0)
    }

    function i (e, t, i) {
      e.style[t] && (i && e.setAttribute(t, parseInt(e.style[t], 10)), e.style[t] = '')
    }

    function n (e) {
      if (e.tagName == 'TD' || e.tagName == 'TH') return e
      var t
      return (t = domUtils.findParentByTagName(e, 'td', !0) || domUtils.findParentByTagName(e, 'th', !0)) ? t : null
    }

    function o (e) {
      var t = new RegExp(domUtils.fillChar, 'g')
      if (e[browser.ie ? 'innerText' : 'textContent'].replace(/^\s*$/, '').replace(t, '').length > 0) return 0
      for (var i in dtd.$isNotEmpty) { if (e.getElementsByTagName(i).length) return 0 }
      return 1
    }

    function r (e) {
      return e.pageX || e.pageY ? {
        x: e.pageX,
        y: e.pageY
      } : {
        x: e.clientX + H.document.body.scrollLeft - H.document.body.clientLeft,
        y: e.clientY + H.document.body.scrollTop - H.document.body.clientTop
      }
    }

    function a (t) {
      if (!T()) {
        try {
          var i, o = n(t.target || t.srcElement)
          if (V && (H.body.style.webkitUserSelect = 'none', (Math.abs(X.x - t.clientX) > W || Math.abs(X.y - t.clientY) > W) && (y(), V = !1, j = 0, N(t))), ie && se) return j = 0, H.body.style.webkitUserSelect = 'none', H.selection.getNative()[browser.ie9below ? 'empty' : 'removeAllRanges'](), i = r(t), m(H, !0, ie, i, o), void (ie == 'h' ? ae.style.left = c(se, t) + 'px' : ie == 'v' && (ae.style.top = u(se, t) + 'px'))
          if (o) {
            if (H.fireEvent('excludetable', o) === !0) return
            i = r(t)
            var a = f(o, i),
              l = domUtils.findParentByTagName(o, 'table', !0)
            if (d(l, o, t, !0)) {
              if (H.fireEvent('excludetable', l) === !0) return
              H.body.style.cursor = 'url(' + H.options.cursorpath + 'h.png),pointer'
            } else if (d(l, o, t)) {
              if (H.fireEvent('excludetable', l) === !0) return
              H.body.style.cursor = 'url(' + H.options.cursorpath + 'v.png),pointer'
            } else {
              H.body.style.cursor = 'text';
              /\d/.test(a) && (a = a.replace(/\d/, ''), o = G(o).getPreviewCell(o, a == 'v')), m(H, o ? !!a : !1, o ? a : '', i, o)
            }
          } else s(!1, l, H)
        } catch (h) {
          e(h)
        }
      }
    }

    function s (e, t, i) {
      if (e) l(t, i)
      else {
        if (re) return
        ue = setTimeout(function () {
          !re && oe && oe.parentNode && oe.parentNode.removeChild(oe)
        }, 2e3)
      }
    }

    function l (e, t) {
      function i (i, n) {
        clearTimeout(a), a = setTimeout(function () {
          t.fireEvent('tableClicked', e, n)
        }, 300)
      }

      function n (i) {
        clearTimeout(a)
        var n = G(e),
          o = e.rows[0].cells[0],
          r = n.getLastCell(),
          s = n.getCellsRange(o, r)
        t.selection.getRange().setStart(o, 0).setCursor(!1, !0), n.setSelected(s)
      }
      var o = domUtils.getXY(e),
        r = e.ownerDocument
      if (oe && oe.parentNode) return oe
      oe = r.createElement('div'), oe.contentEditable = !1, oe.innerHTML = '', oe.style.cssText = 'width:15px;height:15px;background-image:url(' + t.options.UEDITOR_HOME_URL + 'dialogs/table/dragicon.png);position: absolute;cursor:move;top:' + (o.y - 15) + 'px;left:' + o.x + 'px;', domUtils.unSelectable(oe), oe.onmouseover = function (e) {
        re = !0
      }, oe.onmouseout = function (e) {
        re = !1
      }, domUtils.on(oe, 'click', function (e, t) {
        i(t, this)
      }), domUtils.on(oe, 'dblclick', function (e, t) {
        n(t)
      }), domUtils.on(oe, 'dragstart', function (e, t) {
        domUtils.preventDefault(t)
      })
      var a
      r.body.appendChild(oe)
    }

    function d (e, t, i, n) {
      var o = r(i),
        a = f(t, o)
      if (n) {
        var s = e.getElementsByTagName('caption')[0],
          l = s ? s.offsetHeight : 0
        return a == 'v1' && o.y - domUtils.getXY(e).y - l < 8
      }
      return a == 'h1' && o.x - domUtils.getXY(e).x < 8
    }

    function c (e, t) {
      var i = G(e)
      if (i) {
        var n = i.getSameEndPosCells(e, 'x')[0],
          o = i.getSameStartPosXCells(e)[0],
          a = r(t).x,
          s = (n ? domUtils.getXY(n).x : domUtils.getXY(i.table).x) + 20,
          l = o ? domUtils.getXY(o).x + o.offsetWidth - 20 : H.body.offsetWidth + 5 || parseInt(domUtils.getComputedStyle(H.body, 'width'), 10)
        return s += q, l -= q, s > a ? s : a > l ? l : a
      }
    }

    function u (t, i) {
      try {
        var n = domUtils.getXY(t).y,
          o = r(i).y
        return n > o ? n : o
      } catch (a) {
        e(a)
      }
    }

    function m (t, i, n, o, r) {
      try {
        t.body.style.cursor = n == 'h' ? 'col-resize' : n == 'v' ? 'row-resize' : 'text', browser.ie && (!n || le || J(t) ? L(t) : (R(t, t.document), D(n, r))), ne = i
      } catch (a) {
        e(a)
      }
    }

    function f (e, t) {
      var i = domUtils.getXY(e)
      return i ? i.x + e.offsetWidth - t.x < z ? 'h' : t.x - i.x < z ? 'h1' : i.y + e.offsetHeight - t.y < z ? 'v' : t.y - i.y < z ? 'v1' : '' : ''
    }

    function h (e, t) {
      if (!T()) {
        if (X = {
          x: t.clientX,
          y: t.clientY
        }, t.button == 2) {
          var i = J(H),
            n = !1
          if (i) {
            var o = M(H, t)
            utils.each(i.selectedTds, function (e) {
              e === o && (n = !0)
            }), n ? (o = i.selectedTds[0], setTimeout(function () {
              H.selection.getRange().setStart(o, 0).setCursor(!1, !0)
            }, 0)) : (Q(domUtils.getElementsByTagName(H.body, 'th td')), i.clearSelected())
          }
        } else g(t)
      }
    }

    function p (e) {
      j = 0, e = e || H.window.event
      var t = n(e.target || e.srcElement)
      if (t) {
        var i
        if (i = f(t, r(e))) {
          if (L(H), i == 'h1') {
            if (i = 'h', d(domUtils.findParentByTagName(t, 'table'), t, e)) H.execCommand('adaptbywindow')
            else if (t = G(t).getPreviewCell(t)) {
              var o = H.selection.getRange()
              o.selectNodeContents(t).setCursor(!0, !0)
            }
          }
          if (i == 'h') {
            var a = G(t),
              s = a.table,
              l = k(t, s, !0)
            l = b(l, 'left'), a.width = a.offsetWidth
            var c = [],
              u = []
            utils.each(l, function (e) {
              c.push(e.offsetWidth)
            }), utils.each(l, function (e) {
              e.removeAttribute('width')
            }), window.setTimeout(function () {
              var e = !0
              utils.each(l, function (t, i) {
                var n = t.offsetWidth
                return n > c[i] ? (e = !1, !1) : void u.push(n)
              })
              var t = e ? u : c
              utils.each(l, function (e, i) {
                e.width = t[i] - A()
              })
            }, 0)
          }
        }
      }
    }

    function g (e) {
      if (Q(domUtils.getElementsByTagName(H.body, 'td th')), utils.each(H.document.getElementsByTagName('table'), function (e) {
        e.ueTable = null
      }), ee = M(H, e)) {
        var t = domUtils.findParentByTagName(ee, 'table', !0)
        ut = G(t), ut && ut.clearSelected(), ne ? v(e) : (H.document.body.style.webkitUserSelect = '', le = !0, H.addListener('mouseover', w))
      }
    }

    function v (e) {
      browser.ie && (e = C(e)), y(), V = !0, F = setTimeout(function () {
        N(e)
      }, Y)
    }

    function b (e, t) {
      for (var i = [], n = null, o = 0, r = e.length; r > o; o++) n = e[o][t], n && i.push(n)
      return i
    }

    function y () {
      F && clearTimeout(F), F = null
    }

    function C (e) {
      var t = ['pageX', 'pageY', 'clientX', 'clientY', 'srcElement', 'target'],
        i = {}
      if (e) { for (var n, o, r = 0; n = t[r]; r++) o = e[n], o && (i[n] = o) }
      return i
    }

    function N (e) {
      if (V = !1, ee = e.target || e.srcElement) {
        var t = f(ee, r(e));
        /\d/.test(t) && (t = t.replace(/\d/, ''), ee = G(ee).getPreviewCell(ee, t == 'v')), L(H), R(H, H.document), H.fireEvent('saveScene'), D(t, ee), le = !0, ie = t, se = ee
      }
    }

    function x (e, t) {
      if (!T()) {
        if (y(), V = !1, ne && (j = ++j % 3, X = {
          x: t.clientX,
          y: t.clientY
        }, $ = setTimeout(function () {
          j > 0 && j--
        }, Y), j === 2)) return j = 0, void p(t)
        if (t.button != 2) {
          var i = this,
            n = i.selection.getRange(),
            o = domUtils.findParentByTagName(n.startContainer, 'table', !0),
            r = domUtils.findParentByTagName(n.endContainer, 'table', !0)
          if ((o || r) && (o === r ? (o = domUtils.findParentByTagName(n.startContainer, ['td', 'th', 'caption'], !0), r = domUtils.findParentByTagName(n.endContainer, ['td', 'th', 'caption'], !0), o !== r && i.selection.clearRange()) : i.selection.clearRange()), le = !1, i.document.body.style.webkitUserSelect = '', ie && se && (i.selection.getNative()[browser.ie9below ? 'empty' : 'removeAllRanges'](), j = 0, ae = i.document.getElementById('ue_tableDragLine'))) {
            var a = domUtils.getXY(se),
              s = domUtils.getXY(ae)
            switch (ie) {
              case 'h':
                E(se, s.x - a.x)
                break
              case 'v':
                S(se, s.y - a.y - se.offsetHeight)
            }
            return ie = '', se = null, L(i), void i.fireEvent('saveScene')
          }
          if (ee) {
            var l = G(ee),
              d = l ? l.selectedTds[0] : null
            if (d) n = new dom.Range(i.document), domUtils.isEmptyBlock(d) ? n.setStart(d, 0).setCursor(!1, !0) : n.selectNodeContents(d).shrinkBoundary().setCursor(!1, !0)
            else if (n = i.selection.getRange().shrinkBoundary(), !n.collapsed) {
              var o = domUtils.findParentByTagName(n.startContainer, ['td', 'th'], !0),
                r = domUtils.findParentByTagName(n.endContainer, ['td', 'th'], !0);
              (o && !r || !o && r || o && r && o !== r) && n.setCursor(!1, !0)
            }
            ee = null, i.removeListener('mouseover', w)
          } else {
            var c = domUtils.findParentByTagName(t.target || t.srcElement, 'td', !0)
            if (c || (c = domUtils.findParentByTagName(t.target || t.srcElement, 'th', !0)), c && (c.tagName == 'TD' || c.tagName == 'TH')) {
              if (i.fireEvent('excludetable', c) === !0) return
              n = new dom.Range(i.document), n.setStart(c, 0).setCursor(!1, !0)
            }
          }
          i._selectionChange(250, t)
        }
      }
    }

    function w (e, t) {
      if (!T()) {
        var i = this,
          n = t.target || t.srcElement
        if (te = domUtils.findParentByTagName(n, 'td', !0) || domUtils.findParentByTagName(n, 'th', !0), ee && te && (ee.tagName == 'TD' && te.tagName == 'TD' || ee.tagName == 'TH' && te.tagName == 'TH') && domUtils.findParentByTagName(ee, 'table') == domUtils.findParentByTagName(te, 'table')) {
          var o = G(te)
          if (ee != te) {
            i.document.body.style.webkitUserSelect = 'none', i.selection.getNative()[browser.ie9below ? 'empty' : 'removeAllRanges']()
            var r = o.getCellsRange(ee, te)
            o.setSelected(r)
          } else i.document.body.style.webkitUserSelect = '', o.clearSelected()
        }
        t.preventDefault ? t.preventDefault() : t.returnValue = !1
      }
    }

    function U (e, t, i) {
      var n = parseInt(domUtils.getComputedStyle(e, 'line-height'), 10),
        o = i + t
      t = n > o ? n : o, e.style.height && (e.style.height = ''), e.rowSpan == 1 ? e.setAttribute('height', t) : e.removeAttribute && e.removeAttribute('height')
    }

    function E (e, t) {
      var i = G(e)
      if (i) {
        var n = i.table,
          o = k(e, n)
        if (n.style.width = '', n.removeAttribute('width'), t = B(t, e, o), e.nextSibling) {
          utils.each(o, function (e) {
            e.left.width = +e.left.width + t, e.right && (e.right.width = +e.right.width - t)
          })
        } else {
          utils.each(o, function (e) {
            e.left.width -= -t
          })
        }
      }
    }

    function T () {
      return H.body.contentEditable === 'false'
    }

    function S (e, t) {
      if (!(Math.abs(t) < 10)) {
        var i = G(e)
        if (i) { for (var n, o = i.getSameEndPosCells(e, 'y'), r = o[0] ? o[0].offsetHeight : 0, a = 0; n = o[a++];) U(n, t, r) }
      }
    }

    function k (e, t, i) {
      if (t || (t = domUtils.findParentByTagName(e, 'table')), !t) return null
      for (var n = (domUtils.getNodeIndex(e), e), o = t.rows, r = 0; n;) n.nodeType === 1 && (r += n.colSpan || 1), n = n.previousSibling
      n = null
      var a = []
      return utils.each(o, function (e) {
        var t = e.cells,
          n = 0
        utils.each(t, function (e) {
          return n += e.colSpan || 1, n === r ? (a.push({
            left: e,
            right: e.nextSibling || null
          }), !1) : n > r ? (i && a.push({
            left: e
          }), !1) : void 0
        })
      }), a
    }

    function B (e, t, i) {
      if (e -= A(), e < 0) return 0
      e -= I(t)
      var n = e < 0 ? 'left' : 'right'
      return e = Math.abs(e), utils.each(i, function (t) {
        var i = t[n]
        i && (e = Math.min(e, I(i) - q))
      }), e = e < 0 ? 0 : e, n === 'left' ? -e : e
    }

    function I (e) {
      var t = 0,
        t = e.offsetWidth - A()
      e.nextSibling || (t -= _(e)), t = t < 0 ? 0 : t
      try {
        e.width = t
      } catch (i) {}
      return t
    }

    function _ (e) {
      if (tab = domUtils.findParentByTagName(e, 'table', !1), void 0 === tab.offsetVal) {
        var t = e.previousSibling
        t ? tab.offsetVal = e.offsetWidth - t.offsetWidth === K.borderWidth ? K.borderWidth : 0 : tab.offsetVal = 0
      }
      return tab.offsetVal
    }

    function A () {
      if (void 0 === K.tabcellSpace) {
        var e = H.document.createElement('table'),
          t = H.document.createElement('tbody'),
          i = H.document.createElement('tr'),
          n = H.document.createElement('td'),
          o = null
        n.style.cssText = 'border: 0;', n.width = 1, i.appendChild(n), i.appendChild(o = n.cloneNode(!1)), t.appendChild(i), e.appendChild(t), e.style.cssText = 'visibility: hidden;', H.body.appendChild(e), K.paddingSpace = n.offsetWidth - 1
        var r = e.offsetWidth
        n.style.cssText = '', o.style.cssText = '', K.borderWidth = (e.offsetWidth - r) / 3, K.tabcellSpace = K.paddingSpace + K.borderWidth, H.body.removeChild(e)
      }
      return A = function () {
        return K.tabcellSpace
      }, K.tabcellSpace
    }

    function R (e, t) {
      le || (ae = e.document.createElement('div'), domUtils.setAttributes(ae, {
        id: 'ue_tableDragLine',
        unselectable: 'on',
        contenteditable: !1,
        onresizestart: 'return false',
        ondragstart: 'return false',
        onselectstart: 'return false',
        style: 'background-color:blue;position:absolute;padding:0;margin:0;background-image:none;border:0px none;opacity:0;filter:alpha(opacity=0)'
      }), e.body.appendChild(ae))
    }

    function L (e) {
      if (!le) { for (var t; t = e.document.getElementById('ue_tableDragLine');) domUtils.remove(t) }
    }

    function D (e, t) {
      if (t) {
        var i, n = domUtils.findParentByTagName(t, 'table'),
          o = n.getElementsByTagName('caption'),
          r = n.offsetWidth,
          a = n.offsetHeight - (o.length > 0 ? o[0].offsetHeight : 0),
          s = domUtils.getXY(n),
          l = domUtils.getXY(t)
        switch (e) {
          case 'h':
            i = 'height:' + a + 'px;top:' + (s.y + (o.length > 0 ? o[0].offsetHeight : 0)) + 'px;left:' + (l.x + t.offsetWidth), ae.style.cssText = i + 'px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)'
            break
          case 'v':
            i = 'width:' + r + 'px;left:' + s.x + 'px;top:' + (l.y + t.offsetHeight), ae.style.cssText = i + 'px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)'
        }
      }
    }

    function O (e, t) {
      for (var i, n, o = domUtils.getElementsByTagName(e.body, 'table'), r = 0; n = o[r++];) {
        var a = domUtils.getElementsByTagName(n, 'td')
        a[0] && (t ? (i = a[0].style.borderColor.replace(/\s/g, ''), /(#ffffff)|(rgb\(255,255,255\))/gi.test(i) && domUtils.addClass(n, 'noBorderTable')) : domUtils.removeClasses(n, 'noBorderTable'))
      }
    }

    function P (e, t, i) {
      var n = e.body
      return n.offsetWidth - (t ? 2 * parseInt(domUtils.getComputedStyle(n, 'margin-left'), 10) : 0) - 2 * i.tableBorder - (e.options.offsetWidth || 0)
    }

    function M (e, t) {
      var i = domUtils.findParentByTagName(t.target || t.srcElement, ['td', 'th'], !0),
        n = null
      if (!i) return null
      if (n = f(i, r(t)), !i) return null
      if (n === 'h1' && i.previousSibling) {
        var o = domUtils.getXY(i),
          a = i.offsetWidth
        Math.abs(o.x + a - t.clientX) > a / 3 && (i = i.previousSibling)
      } else if (n === 'v1' && i.parentNode.previousSibling) {
        var o = domUtils.getXY(i),
          s = i.offsetHeight
        Math.abs(o.y + s - t.clientY) > s / 3 && (i = i.parentNode.previousSibling.firstChild)
      }
      return i && e.fireEvent('excludetable', i) !== !0 ? i : null
    }
    var H = this,
      F = null,
      $ = null,
      q = 5,
      V = !1,
      z = 5,
      W = 10,
      j = 0,
      X = null,
      Y = 360,
      K = UE.UETable,
      G = function (e) {
        return K.getUETable(e)
      },
      J = function (e) {
        return K.getUETableBySelected(e)
      },
      Z = function (e, t) {
        return K.getDefaultValue(e, t)
      },
      Q = function (e) {
        return K.removeSelectedClass(e)
      }
    H.ready(function () {
      var e = this,
        t = e.selection.getText
      e.selection.getText = function () {
        var i = J(e)
        if (i) {
          var n = ''
          return utils.each(i.selectedTds, function (e) {
            n += e[browser.ie ? 'innerText' : 'textContent']
          }), n
        }
        return t.call(e.selection)
      }
    })
    var ee = null,
      te = null,
      ie = '',
      ne = !1,
      oe = null,
      re = !1,
      ae = null,
      se = null,
      le = !1,
      de = !0
    H.setOpt({
      maxColNum: 20,
      maxRowNum: 100,
      defaultCols: 5,
      defaultRows: 5,
      tdvalign: 'top',
      cursorpath: H.options.UEDITOR_HOME_URL + 'themes/default/images/cursor_',
      tableDragable: !1,
      classList: ['ue-table-interlace-color-single', 'ue-table-interlace-color-double']
    }), H.getUETable = G
    var ce = {
      deletetable: 1,
      inserttable: 1,
      cellvalign: 1,
      insertcaption: 1,
      deletecaption: 1,
      inserttitle: 1,
      deletetitle: 1,
      mergeright: 1,
      mergedown: 1,
      mergecells: 1,
      insertrow: 1,
      insertrownext: 1,
      deleterow: 1,
      insertcol: 1,
      insertcolnext: 1,
      deletecol: 1,
      splittocells: 1,
      splittorows: 1,
      splittocols: 1,
      adaptbytext: 1,
      adaptbywindow: 1,
      adaptbycustomer: 1,
      insertparagraph: 1,
      insertparagraphbeforetable: 1,
      averagedistributecol: 1,
      averagedistributerow: 1
    }
    H.ready(function () {
      utils.cssRule('table', '.selectTdClass{background-color:#edf5fa !important}table.noBorderTable td,table.noBorderTable th,table.noBorderTable caption{border:1px dashed #ddd !important}table{margin-bottom:10px;border-collapse:collapse;display:table;}td,th{padding: 5px 10px;border: 1px solid #DDD;}caption{border:1px dashed #DDD;border-bottom:0;padding:3px;text-align:center;}th{border-top:1px solid #BBB;background-color:#F7F7F7;}table tr.firstRow th{border-top-width:2px;}.ue-table-interlace-color-single{ background-color: #fcfcfc; } .ue-table-interlace-color-double{ background-color: #f7faff; }td p{margin:0;padding:0;}', H.document)
      var e, i, r
      H.addListener('keydown', function (t, n) {
        var a = this,
          s = n.keyCode || n.which
        if (s == 8) {
          var l = J(a)
          l && l.selectedTds.length && (l.isFullCol() ? a.execCommand('deletecol') : l.isFullRow() ? a.execCommand('deleterow') : a.fireEvent('delcells'), domUtils.preventDefault(n))
          var d = domUtils.findParentByTagName(a.selection.getStart(), 'caption', !0),
            c = a.selection.getRange()
          if (c.collapsed && d && o(d)) {
            a.fireEvent('saveScene')
            var u = d.parentNode
            domUtils.remove(d), u && c.setStart(u.rows[0].cells[0], 0).setCursor(!1, !0), a.fireEvent('saveScene')
          }
        }
        if (s == 46 && (l = J(a))) {
          a.fireEvent('saveScene')
          for (var m, f = 0; m = l.selectedTds[f++];) domUtils.fillNode(a.document, m)
          a.fireEvent('saveScene'), domUtils.preventDefault(n)
        }
        if (s == 13) {
          var h = a.selection.getRange(),
            d = domUtils.findParentByTagName(h.startContainer, 'caption', !0)
          if (d) {
            var u = domUtils.findParentByTagName(d, 'table')
            return h.collapsed ? d && h.setStart(u.rows[0].cells[0], 0).setCursor(!1, !0) : (h.deleteContents(), a.fireEvent('saveScene')), void domUtils.preventDefault(n)
          }
          if (h.collapsed) {
            var u = domUtils.findParentByTagName(h.startContainer, 'table')
            if (u) {
              var p = u.rows[0].cells[0],
                g = domUtils.findParentByTagName(a.selection.getStart(), ['td', 'th'], !0),
                v = u.previousSibling
              if (p === g && (!v || v.nodeType == 1 && v.tagName == 'TABLE') && domUtils.isStartInblock(h)) {
                var b = domUtils.findParent(a.selection.getStart(), function (e) {
                  return domUtils.isBlockElm(e)
                }, !0)
                b && (/t(h|d)/i.test(b.tagName) || b === g.firstChild) && (a.execCommand('insertparagraphbeforetable'), domUtils.preventDefault(n))
              }
            }
          }
        }
        if ((n.ctrlKey || n.metaKey) && n.keyCode == '67') {
          e = null
          var l = J(a)
          if (l) {
            var y = l.selectedTds
            i = l.isFullCol(), r = l.isFullRow(), e = [
              [l.cloneCell(y[0], null, !0)]
            ]
            for (var m, f = 1; m = y[f]; f++) m.parentNode !== y[f - 1].parentNode ? e.push([l.cloneCell(m, null, !0)]) : e[e.length - 1].push(l.cloneCell(m, null, !0))
          }
        }
      }), H.addListener('tablehasdeleted', function () {
        m(this, !1, '', null), oe && domUtils.remove(oe)
      }), H.addListener('beforepaste', function (n, a) {
        var s = this,
          l = s.selection.getRange()
        if (domUtils.findParentByTagName(l.startContainer, 'caption', !0)) {
          var d = s.document.createElement('div')
          return d.innerHTML = a.html, void (a.html = d[browser.ie9below ? 'innerText' : 'textContent'])
        }
        var c = J(s)
        if (e) {
          s.fireEvent('saveScene')
          var u, m, l = s.selection.getRange(),
            f = domUtils.findParentByTagName(l.startContainer, ['td', 'th'], !0)
          if (f) {
            var h = G(f)
            if (r) {
              var p = h.getCellInfo(f).rowIndex
              f.tagName == 'TH' && p++
              for (var g, v = 0; g = e[v++];) {
                for (var b, y = h.insertRow(p++, 'td'), C = 0; b = g[C]; C++) {
                  var N = y.cells[C]
                  N || (N = y.insertCell(C)), N.innerHTML = b.innerHTML, b.getAttribute('width') && N.setAttribute('width', b.getAttribute('width')), b.getAttribute('vAlign') && N.setAttribute('vAlign', b.getAttribute('vAlign')), b.getAttribute('align') && N.setAttribute('align', b.getAttribute('align')), b.style.cssText && (N.style.cssText = b.style.cssText)
                }
                for (var b, C = 0;
                  (b = y.cells[C]) && g[C]; C++) b.innerHTML = g[C].innerHTML, g[C].getAttribute('width') && b.setAttribute('width', g[C].getAttribute('width')), g[C].getAttribute('vAlign') && b.setAttribute('vAlign', g[C].getAttribute('vAlign')), g[C].getAttribute('align') && b.setAttribute('align', g[C].getAttribute('align')), g[C].style.cssText && (b.style.cssText = g[C].style.cssText)
              }
            } else {
              if (i) {
                U = h.getCellInfo(f)
                for (var b, x = 0, C = 0, g = e[0]; b = g[C++];) x += b.colSpan || 1
                for (s.__hasEnterExecCommand = !0, v = 0; x > v; v++) s.execCommand('insertcol')
                s.__hasEnterExecCommand = !1, f = h.table.rows[0].cells[U.cellIndex], f.tagName == 'TH' && (f = h.table.rows[1].cells[U.cellIndex])
              }
              for (var g, v = 0; g = e[v++];) {
                u = f
                for (var b, C = 0; b = g[C++];) {
                  if (f) f.innerHTML = b.innerHTML, b.getAttribute('width') && f.setAttribute('width', b.getAttribute('width')), b.getAttribute('vAlign') && f.setAttribute('vAlign', b.getAttribute('vAlign')), b.getAttribute('align') && f.setAttribute('align', b.getAttribute('align')), b.style.cssText && (f.style.cssText = b.style.cssText), m = f, f = f.nextSibling
                  else {
                    var w = b.cloneNode(!0)
                    domUtils.removeAttributes(w, ['class', 'rowSpan', 'colSpan']), m.parentNode.appendChild(w)
                  }
                }
                if (f = h.getNextCell(u, !0, !0), !e[v]) break
                if (!f) {
                  var U = h.getCellInfo(u)
                  h.table.insertRow(h.table.rows.length), h.update(), f = h.getVSideCell(u, !0)
                }
              }
            }
            h.update()
          } else {
            c = s.document.createElement('table')
            for (var g, v = 0; g = e[v++];) {
              for (var b, y = c.insertRow(c.rows.length), C = 0; b = g[C++];) w = K.cloneCell(b, null, !0), domUtils.removeAttributes(w, ['class']), y.appendChild(w)
              C == 2 && w.rowSpan > 1 && (w.rowSpan = 1)
            }
            var E = Z(s),
              T = s.body.offsetWidth - (de ? 2 * parseInt(domUtils.getComputedStyle(s.body, 'margin-left'), 10) : 0) - 2 * E.tableBorder - (s.options.offsetWidth || 0)
            s.execCommand('insertHTML', '<table  ' + (i && r ? 'width="' + T + '"' : '') + '>' + c.innerHTML.replace(/>\s*</g, '><').replace(/\bth\b/gi, 'td') + '</table>')
          }
          return s.fireEvent('contentchange'), s.fireEvent('saveScene'), a.html = '', !0
        }
        var S, d = s.document.createElement('div')
        d.innerHTML = a.html, S = d.getElementsByTagName('table'), domUtils.findParentByTagName(s.selection.getStart(), 'table') ? (utils.each(S, function (e) {
          domUtils.remove(e)
        }), domUtils.findParentByTagName(s.selection.getStart(), 'caption', !0) && (d.innerHTML = d[browser.ie ? 'innerText' : 'textContent'])) : utils.each(S, function (e) {
          t(e, !0), domUtils.removeAttributes(e, ['style', 'border']), utils.each(domUtils.getElementsByTagName(e, 'td'), function (e) {
            o(e) && domUtils.fillNode(s.document, e), t(e, !0)
          })
        }), a.html = d.innerHTML
      }), H.addListener('afterpaste', function () {
        utils.each(domUtils.getElementsByTagName(H.body, 'table'), function (e) {
          if (e.offsetWidth > H.body.offsetWidth) {
            var t = Z(H, e)
            e.style.width = H.body.offsetWidth - (de ? 2 * parseInt(domUtils.getComputedStyle(H.body, 'margin-left'), 10) : 0) - 2 * t.tableBorder - (H.options.offsetWidth || 0) + 'px'
          }
        })
      }), H.addListener('blur', function () {
        e = null
      })
      var l
      H.addListener('keydown', function () {
        clearTimeout(l), l = setTimeout(function () {
          var e = H.selection.getRange(),
            t = domUtils.findParentByTagName(e.startContainer, ['th', 'td'], !0)
          if (t) {
            var i = t.parentNode.parentNode.parentNode
            i.offsetWidth > i.getAttribute('width') && (t.style.wordBreak = 'break-all')
          }
        }, 100)
      }), H.addListener('selectionchange', function () {
        m(H, !1, '', null)
      }), H.addListener('contentchange', function () {
        var e = this
        if (L(e), !J(e)) {
          var t = e.selection.getRange(),
            i = t.startContainer
          i = domUtils.findParentByTagName(i, ['td', 'th'], !0), utils.each(domUtils.getElementsByTagName(e.document, 'table'), function (t) {
            e.fireEvent('excludetable', t) !== !0 && (t.ueTable = new K(t), t.onmouseover = function () {
              e.fireEvent('tablemouseover', t)
            }, t.onmousemove = function () {
              e.fireEvent('tablemousemove', t), e.options.tableDragable && s(!0, this, e), utils.defer(function () {
                e.fireEvent('contentchange', 50)
              }, !0)
            }, t.onmouseout = function () {
              e.fireEvent('tablemouseout', t), m(e, !1, '', null), L(e)
            }, t.onclick = function (t) {
              t = e.window.event || t
              var i = n(t.target || t.srcElement)
              if (i) {
                var o, r = G(i),
                  a = r.table,
                  s = r.getCellInfo(i),
                  l = e.selection.getRange()
                if (d(a, i, t, !0)) {
                  var c = r.getCell(r.indexTable[r.rowsNum - 1][s.colIndex].rowIndex, r.indexTable[r.rowsNum - 1][s.colIndex].cellIndex)
                  return void (t.shiftKey && r.selectedTds.length ? r.selectedTds[0] !== c ? (o = r.getCellsRange(r.selectedTds[0], c), r.setSelected(o)) : l && l.selectNodeContents(c).select() : i !== c ? (o = r.getCellsRange(i, c), r.setSelected(o)) : l && l.selectNodeContents(c).select())
                }
                if (d(a, i, t)) {
                  var u = r.getCell(r.indexTable[s.rowIndex][r.colsNum - 1].rowIndex, r.indexTable[s.rowIndex][r.colsNum - 1].cellIndex)
                  t.shiftKey && r.selectedTds.length ? r.selectedTds[0] !== u ? (o = r.getCellsRange(r.selectedTds[0], u), r.setSelected(o)) : l && l.selectNodeContents(u).select() : i !== u ? (o = r.getCellsRange(i, u), r.setSelected(o)) : l && l.selectNodeContents(u).select()
                }
              }
            })
          }), O(e, !0)
        }
      }), domUtils.on(H.document, 'mousemove', a), domUtils.on(H.document, 'mouseout', function (e) {
        var t = e.target || e.srcElement
        t.tagName == 'TABLE' && m(H, !1, '', null)
      }), H.addListener('interlacetable', function (e, t, i) {
        if (t) {
          for (var n = this, o = t.rows, r = o.length, a = function (e, t, i) {
              return e[t] ? e[t] : i ? e[t % e.length] : ''
            }, s = 0; r > s; s++) o[s].className = a(i || n.options.classList, s, !0)
        }
      }), H.addListener('uninterlacetable', function (e, t) {
        if (t) { for (var i = this, n = t.rows, o = i.options.classList, r = n.length, a = 0; r > a; a++) domUtils.removeClasses(n[a], o) }
      }), H.addListener('mousedown', h), H.addListener('mouseup', x), domUtils.on(H.body, 'dragstart', function (e) {
        x.call(H, 'dragstart', e)
      }), H.addOutputRule(function (e) {
        utils.each(e.getNodesByTagName('div'), function (e) {
          e.getAttr('id') == 'ue_tableDragLine' && e.parentNode.removeChild(e)
        })
      })
      var c = 0
      H.addListener('mousedown', function () {
        c = 0
      }), H.addListener('tabkeydown', function () {
        var e = this.selection.getRange(),
          t = e.getCommonAncestor(!0, !0),
          i = domUtils.findParentByTagName(t, 'table')
        if (i) {
          if (domUtils.findParentByTagName(t, 'caption', !0)) {
            var n = domUtils.getElementsByTagName(i, 'th td')
            n && n.length && e.setStart(n[0], 0).setCursor(!1, !0)
          } else {
            var n = domUtils.findParentByTagName(t, ['td', 'th'], !0),
              r = G(n)
            c = n.rowSpan > 1 ? c : r.getCellInfo(n).rowIndex
            var a = r.getTabNextCell(n, c)
            a ? o(a) ? e.setStart(a, 0).setCursor(!1, !0) : e.selectNodeContents(a).select() : (H.fireEvent('saveScene'), H.__hasEnterExecCommand = !0, this.execCommand('insertrownext'), H.__hasEnterExecCommand = !1, e = this.selection.getRange(), e.setStart(i.rows[i.rows.length - 1].cells[0], 0).setCursor(), H.fireEvent('saveScene'))
          }
          return !0
        }
      }), browser.ie && H.addListener('selectionchange', function () {
        m(this, !1, '', null)
      }), H.addListener('keydown', function (e, t) {
        var i = this,
          n = t.keyCode || t.which
        if (n != 8 && n != 46) {
          var o = !(t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)
          o && Q(domUtils.getElementsByTagName(i.body, 'td'))
          var r = J(i)
          r && o && r.clearSelected()
        }
      }), H.addListener('beforegetcontent', function () {
        O(this, !1), browser.ie && utils.each(this.document.getElementsByTagName('caption'), function (e) {
          domUtils.isEmptyNode(e) && (e.innerHTML = '&nbsp;')
        })
      }), H.addListener('aftergetcontent', function () {
        O(this, !0)
      }), H.addListener('getAllHtml', function () {
        Q(H.document.getElementsByTagName('td'))
      }), H.addListener('fullscreenchanged', function (e, t) {
        if (!t) {
          var i = this.body.offsetWidth / document.body.offsetWidth,
            n = domUtils.getElementsByTagName(this.body, 'table')
          utils.each(n, function (e) {
            if (e.offsetWidth < H.body.offsetWidth) return !1
            var t = domUtils.getElementsByTagName(e, 'td'),
              n = []
            utils.each(t, function (e) {
              n.push(e.offsetWidth)
            })
            for (var o, r = 0; o = t[r]; r++) o.setAttribute('width', Math.floor(n[r] * i))
            e.setAttribute('width', Math.floor(P(H, de, Z(H))))
          })
        }
      })
      var u = H.execCommand
      H.execCommand = function (e, t) {
        var i = this
        e = e.toLowerCase()
        var n, r, a = J(i),
          s = new dom.Range(i.document),
          l = i.commands[e] || UE.commands[e]
        if (l) {
          if (!a || ce[e] || l.notNeedUndo || i.__hasEnterExecCommand) r = u.apply(i, arguments)
          else {
            i.__hasEnterExecCommand = !0, i.fireEvent('beforeexeccommand', e), n = a.selectedTds
            for (var d, c, m, f = -2, h = -2, p = 0; m = n[p]; p++) o(m) ? s.setStart(m, 0).setCursor(!1, !0) : s.selectNode(m).select(!0), c = i.queryCommandState(e), d = i.queryCommandValue(e), c != -1 && (f === c && h === d || (i._ignoreContentChange = !0, r = u.apply(i, arguments), i._ignoreContentChange = !1), f = i.queryCommandState(e), h = i.queryCommandValue(e), domUtils.isEmptyBlock(m) && domUtils.fillNode(i.document, m))
            s.setStart(n[0], 0).shrinkBoundary(!0).setCursor(!1, !0), i.fireEvent('contentchange'), i.fireEvent('afterexeccommand', e), i.__hasEnterExecCommand = !1, i._selectionChange()
          }
          return r
        }
      }
    })
    var ue
  }, UE.UETable.prototype.sortTable = function (e, t) {
    var i = this.table,
      n = i.rows,
      o = [],
      r = n[0].cells[0].tagName === 'TH',
      a = 0
    if (this.selectedTds.length) {
      for (var s = this.cellsRange, l = s.endRowIndex + 1, d = s.beginRowIndex; l > d; d++) o[d] = n[d]
      o.splice(0, s.beginRowIndex), a = s.endRowIndex + 1 === this.rowsNum ? 0 : s.endRowIndex + 1
    } else { for (var d = 0, l = n.length; l > d; d++) o[d] = n[d] }
    var c = {
      reversecurrent: function (e, t) {
        return 1
      },
      orderbyasc: function (e, t) {
        var i = e.innerText || e.textContent,
          n = t.innerText || t.textContent
        return i.localeCompare(n)
      },
      reversebyasc: function (e, t) {
        var i = e.innerHTML,
          n = t.innerHTML
        return n.localeCompare(i)
      },
      orderbynum: function (e, t) {
        var i = e[browser.ie ? 'innerText' : 'textContent'].match(/\d+/),
          n = t[browser.ie ? 'innerText' : 'textContent'].match(/\d+/)
        return i && (i = +i[0]), n && (n = +n[0]), (i || 0) - (n || 0)
      },
      reversebynum: function (e, t) {
        var i = e[browser.ie ? 'innerText' : 'textContent'].match(/\d+/),
          n = t[browser.ie ? 'innerText' : 'textContent'].match(/\d+/)
        return i && (i = +i[0]), n && (n = +n[0]), (n || 0) - (i || 0)
      }
    }
    i.setAttribute('data-sort-type', t && typeof t === 'string' && c[t] ? t : ''), r && o.splice(0, 1), o = utils.sort(o, function (i, n) {
      var o
      return o = t && typeof t === 'function' ? t.call(this, i.cells[e], n.cells[e]) : t && typeof t === 'number' ? 1 : t && typeof t === 'string' && c[t] ? c[t].call(this, i.cells[e], n.cells[e]) : c.orderbyasc.call(this, i.cells[e], n.cells[e])
    })
    for (var u = i.ownerDocument.createDocumentFragment(), m = 0, l = o.length; l > m; m++) u.appendChild(o[m])
    var f = i.getElementsByTagName('tbody')[0]
    a ? f.insertBefore(u, n[a - s.endRowIndex + s.beginRowIndex - 1]) : f.appendChild(u)
  }, UE.plugins.tablesort = function () {
    var e = this,
      t = UE.UETable,
      i = function (e) {
        return t.getUETable(e)
      },
      n = function (e) {
        return t.getTableItemsByRange(e)
      }
    e.ready(function () {
      utils.cssRule('tablesort', 'table.sortEnabled tr.firstRow th,table.sortEnabled tr.firstRow td{padding-right:20px;background-repeat: no-repeat;background-position: center right;   background-image:url(' + e.options.themePath + e.options.theme + '/images/sortable.png);}', e.document), e.addListener('afterexeccommand', function (e, t) {
        t != 'mergeright' && t != 'mergedown' && t != 'mergecells' || this.execCommand('disablesort')
      })
    }), UE.commands.sorttable = {
      queryCommandState: function () {
        var e = this,
          t = n(e)
        if (!t.cell) return -1
        for (var i, o = t.table, r = o.getElementsByTagName('td'), a = 0; i = r[a++];) { if (i.rowSpan != 1 || i.colSpan != 1) return -1 }
        return 0
      },
      execCommand: function (e, t) {
        var o = this,
          r = o.selection.getRange(),
          a = r.createBookmark(!0),
          s = n(o),
          l = s.cell,
          d = i(s.table),
          c = d.getCellInfo(l)
        d.sortTable(c.cellIndex, t), r.moveToBookmark(a)
        try {
          r.select()
        } catch (u) {}
      }
    }, UE.commands.enablesort = UE.commands.disablesort = {
      queryCommandState: function (e) {
        var t = n(this).table
        if (t && e == 'enablesort') {
          for (var i = domUtils.getElementsByTagName(t, 'th td'), o = 0; o < i.length; o++) { if (i[o].getAttribute('colspan') > 1 || i[o].getAttribute('rowspan') > 1) return -1 }
        }
        return t ? e == 'enablesort' ^ t.getAttribute('data-sort') != 'sortEnabled' ? -1 : 0 : -1
      },
      execCommand: function (e) {
        var t = n(this).table
        t.setAttribute('data-sort', e == 'enablesort' ? 'sortEnabled' : 'sortDisabled'), e == 'enablesort' ? domUtils.addClass(t, 'sortEnabled') : domUtils.removeClasses(t, 'sortEnabled')
      }
    }
  }, UE.plugins.contextmenu = function () {
    var e = this
    if (e.setOpt('enableContextMenu', !0), e.getOpt('enableContextMenu') !== !1) {
      var t, i = e.getLang('contextMenu'),
        n = e.options.contextMenu || [{
          label: i.selectall,
          cmdName: 'selectall'
        }, {
          label: i.cleardoc,
          cmdName: 'cleardoc',
          exec: function () {
            confirm(i.confirmclear) && this.execCommand('cleardoc')
          }
        }, '-', {
          label: i.unlink,
          cmdName: 'unlink'
        }, '-', {
          group: i.paragraph,
          icon: 'justifyjustify',
          subMenu: [{
            label: i.justifyleft,
            cmdName: 'justify',
            value: 'left'
          }, {
            label: i.justifyright,
            cmdName: 'justify',
            value: 'right'
          }, {
            label: i.justifycenter,
            cmdName: 'justify',
            value: 'center'
          }, {
            label: i.justifyjustify,
            cmdName: 'justify',
            value: 'justify'
          }]
        }, '-', {
          group: i.table,
          icon: 'table',
          subMenu: [{
            label: i.inserttable,
            cmdName: 'inserttable'
          }, {
            label: i.deletetable,
            cmdName: 'deletetable'
          }, '-', {
            label: i.deleterow,
            cmdName: 'deleterow'
          }, {
            label: i.deletecol,
            cmdName: 'deletecol'
          }, {
            label: i.insertcol,
            cmdName: 'insertcol'
          }, {
            label: i.insertcolnext,
            cmdName: 'insertcolnext'
          }, {
            label: i.insertrow,
            cmdName: 'insertrow'
          }, {
            label: i.insertrownext,
            cmdName: 'insertrownext'
          }, '-', {
            label: i.insertcaption,
            cmdName: 'insertcaption'
          }, {
            label: i.deletecaption,
            cmdName: 'deletecaption'
          }, {
            label: i.inserttitle,
            cmdName: 'inserttitle'
          }, {
            label: i.deletetitle,
            cmdName: 'deletetitle'
          }, {
            label: i.inserttitlecol,
            cmdName: 'inserttitlecol'
          }, {
            label: i.deletetitlecol,
            cmdName: 'deletetitlecol'
          }, '-', {
            label: i.mergecells,
            cmdName: 'mergecells'
          }, {
            label: i.mergeright,
            cmdName: 'mergeright'
          }, {
            label: i.mergedown,
            cmdName: 'mergedown'
          }, '-', {
            label: i.splittorows,
            cmdName: 'splittorows'
          }, {
            label: i.splittocols,
            cmdName: 'splittocols'
          }, {
            label: i.splittocells,
            cmdName: 'splittocells'
          }, '-', {
            label: i.averageDiseRow,
            cmdName: 'averagedistributerow'
          }, {
            label: i.averageDisCol,
            cmdName: 'averagedistributecol'
          }, '-', {
            label: i.edittd,
            cmdName: 'edittd',
            exec: function () {
              UE.ui.edittd && new UE.ui.edittd(this), this.getDialog('edittd').open()
            }
          }, {
            label: i.edittable,
            cmdName: 'edittable',
            exec: function () {
              UE.ui.edittable && new UE.ui.edittable(this), this.getDialog('edittable').open()
            }
          }, {
            label: i.setbordervisible,
            cmdName: 'setbordervisible'
          }]
        }, {
          group: i.tablesort,
          icon: 'tablesort',
          subMenu: [{
            label: i.enablesort,
            cmdName: 'enablesort'
          }, {
            label: i.disablesort,
            cmdName: 'disablesort'
          }, '-', {
            label: i.reversecurrent,
            cmdName: 'sorttable',
            value: 'reversecurrent'
          }, {
            label: i.orderbyasc,
            cmdName: 'sorttable',
            value: 'orderbyasc'
          }, {
            label: i.reversebyasc,
            cmdName: 'sorttable',
            value: 'reversebyasc'
          }, {
            label: i.orderbynum,
            cmdName: 'sorttable',
            value: 'orderbynum'
          }, {
            label: i.reversebynum,
            cmdName: 'sorttable',
            value: 'reversebynum'
          }]
        }, {
          group: i.borderbk,
          icon: 'borderBack',
          subMenu: [{
            label: i.setcolor,
            cmdName: 'interlacetable',
            exec: function () {
              this.execCommand('interlacetable')
            }
          }, {
            label: i.unsetcolor,
            cmdName: 'uninterlacetable',
            exec: function () {
              this.execCommand('uninterlacetable')
            }
          }, {
            label: i.setbackground,
            cmdName: 'settablebackground',
            exec: function () {
              this.execCommand('settablebackground', {
                repeat: !0,
                colorList: ['#bbb', '#ccc']
              })
            }
          }, {
            label: i.unsetbackground,
            cmdName: 'cleartablebackground',
            exec: function () {
              this.execCommand('cleartablebackground')
            }
          }, {
            label: i.redandblue,
            cmdName: 'settablebackground',
            exec: function () {
              this.execCommand('settablebackground', {
                repeat: !0,
                colorList: ['red', 'blue']
              })
            }
          }, {
            label: i.threecolorgradient,
            cmdName: 'settablebackground',
            exec: function () {
              this.execCommand('settablebackground', {
                repeat: !0,
                colorList: ['#aaa', '#bbb', '#ccc']
              })
            }
          }]
        }, {
          group: i.aligntd,
          icon: 'aligntd',
          subMenu: [{
            cmdName: 'cellalignment',
            value: {
              align: 'left',
              vAlign: 'top'
            }
          }, {
            cmdName: 'cellalignment',
            value: {
              align: 'center',
              vAlign: 'top'
            }
          }, {
            cmdName: 'cellalignment',
            value: {
              align: 'right',
              vAlign: 'top'
            }
          }, {
            cmdName: 'cellalignment',
            value: {
              align: 'left',
              vAlign: 'middle'
            }
          }, {
            cmdName: 'cellalignment',
            value: {
              align: 'center',
              vAlign: 'middle'
            }
          }, {
            cmdName: 'cellalignment',
            value: {
              align: 'right',
              vAlign: 'middle'
            }
          }, {
            cmdName: 'cellalignment',
            value: {
              align: 'left',
              vAlign: 'bottom'
            }
          }, {
            cmdName: 'cellalignment',
            value: {
              align: 'center',
              vAlign: 'bottom'
            }
          }, {
            cmdName: 'cellalignment',
            value: {
              align: 'right',
              vAlign: 'bottom'
            }
          }]
        }, {
          group: i.aligntable,
          icon: 'aligntable',
          subMenu: [{
            cmdName: 'tablealignment',
            className: 'left',
            label: i.tableleft,
            value: 'left'
          }, {
            cmdName: 'tablealignment',
            className: 'center',
            label: i.tablecenter,
            value: 'center'
          }, {
            cmdName: 'tablealignment',
            className: 'right',
            label: i.tableright,
            value: 'right'
          }]
        }, '-', {
          label: i.insertparagraphbefore,
          cmdName: 'insertparagraph',
          value: !0
        }, {
          label: i.insertparagraphafter,
          cmdName: 'insertparagraph'
        }, {
          label: i.copy,
          cmdName: 'copy'
        }, {
          label: i.paste,
          cmdName: 'paste'
        }]
      if (n.length) {
        var o = UE.ui.uiUtils
        e.addListener('contextmenu', function (r, a) {
          var s = o.getViewportOffsetByEvent(a)
          e.fireEvent('beforeselectionchange'), t && t.destroy()
          for (var l, d = 0, c = []; l = n[d]; d++) {
            var u
            !(function (t) {
              function n () {
                switch (t.icon) {
                  case 'table':
                    return e.getLang('contextMenu.table')
                  case 'justifyjustify':
                    return e.getLang('contextMenu.paragraph')
                  case 'aligntd':
                    return e.getLang('contextMenu.aligntd')
                  case 'aligntable':
                    return e.getLang('contextMenu.aligntable')
                  case 'tablesort':
                    return i.tablesort
                  case 'borderBack':
                    return i.borderbk
                  default:
                    return ''
                }
              }
              if (t == '-')(u = c[c.length - 1]) && u !== '-' && c.push('-')
              else if (t.hasOwnProperty('group')) {
                for (var o, r = 0, a = []; o = t.subMenu[r]; r++) {
                  !(function (t) {
                    t == '-' ? (u = a[a.length - 1]) && u !== '-' ? a.push('-') : a.splice(a.length - 1) : (e.commands[t.cmdName] || UE.commands[t.cmdName] || t.query) && (t.query ? t.query() : e.queryCommandState(t.cmdName)) > -1 && a.push({
                      label: t.label || e.getLang('contextMenu.' + t.cmdName + (t.value || '')) || '',
                      className: 'edui-for-' + t.cmdName + (t.className ? ' edui-for-' + t.cmdName + '-' + t.className : ''),
                      onclick: t.exec ? function () {
                        t.exec.call(e)
                      } : function () {
                        e.execCommand(t.cmdName, t.value)
                      }
                    })
                  }(o))
                }
                a.length && c.push({
                  label: n(),
                  className: 'edui-for-' + t.icon,
                  subMenu: {
                    items: a,
                    editor: e
                  }
                })
              } else {
                (e.commands[t.cmdName] || UE.commands[t.cmdName] || t.query) && (t.query ? t.query.call(e) : e.queryCommandState(t.cmdName)) > -1 && c.push({
                  label: t.label || e.getLang('contextMenu.' + t.cmdName),
                  className: 'edui-for-' + (t.icon ? t.icon : t.cmdName + (t.value || '')),
                  onclick: t.exec ? function () {
                    t.exec.call(e)
                  } : function () {
                    e.execCommand(t.cmdName, t.value)
                  }
                })
              }
            }(l))
          }
          if (c[c.length - 1] == '-' && c.pop(), t = new UE.ui.Menu({
            items: c,
            className: 'edui-contextmenu',
            editor: e
          }), t.render(), t.showAt(s), e.fireEvent('aftershowcontextmenu', t), domUtils.preventDefault(a), browser.ie) {
            var m
            try {
              m = e.selection.getNative().createRange()
            } catch (f) {
              return
            }
            if (m.item) {
              var h = new dom.Range(e.document)
              h.selectNode(m.item(0)).select(!0, !0)
            }
          }
        }), e.addListener('aftershowcontextmenu', function (t, i) {
          if (e.zeroclipboard) {
            var n = i.items
            for (var o in n) n[o].className == 'edui-for-copy' && e.zeroclipboard.clip(n[o].getDom())
          }
        })
      }
    }
  }, UE.plugins.shortcutmenu = function () {
    var e, t = this,
      i = t.options.shortcutMenu || []
    i.length && (t.addListener('contextmenu mouseup', function (t, n) {
      var o = this,
        r = {
          type: t,
          target: n.target || n.srcElement,
          screenX: n.screenX,
          screenY: n.screenY,
          clientX: n.clientX,
          clientY: n.clientY
        }
      if (setTimeout(function () {
        var n = o.selection.getRange()
        n.collapsed !== !1 && t != 'contextmenu' || (e || (e = new baidu.editor.ui.ShortCutMenu({
          editor: o,
          items: i,
          theme: o.options.theme,
          className: 'edui-shortcutmenu'
        }), e.render(), o.fireEvent('afterrendershortcutmenu', e)), e.show(r, !!UE.plugins.contextmenu))
      }), t == 'contextmenu' && (domUtils.preventDefault(n), browser.ie9below)) {
        var a
        try {
          a = o.selection.getNative().createRange()
        } catch (n) {
          return
        }
        if (a.item) {
          var s = new dom.Range(o.document)
          s.selectNode(a.item(0)).select(!0, !0)
        }
      }
    }), t.addListener('keydown', function (t) {
      t == 'keydown' && e && !e.isHidden && e.hide()
    }))
  }, UE.plugins.basestyle = function () {
    var e = {
        bold: ['strong', 'b'],
        italic: ['em', 'i'],
        subscript: ['sub'],
        superscript: ['sup']
      },
      t = function (e, t) {
        return domUtils.filterNodeList(e.selection.getStartElementPath(), t)
      },
      i = this
    i.addshortcutkey({
      Bold: 'ctrl+66',
      Italic: 'ctrl+73',
      Underline: 'ctrl+85'
    }), i.addInputRule(function (e) {
      utils.each(e.getNodesByTagName('b i'), function (e) {
        switch (e.tagName) {
          case 'b':
            e.tagName = 'strong'
            break
          case 'i':
            e.tagName = 'em'
        }
      })
    })
    for (var n in e) {
      !(function (e, n) {
        i.commands[e] = {
          execCommand: function (e) {
            var o = i.selection.getRange(),
              r = t(this, n)
            if (o.collapsed) {
              if (r) {
                var a = i.document.createTextNode('')
                o.insertNode(a).removeInlineStyle(n), o.setStartBefore(a), domUtils.remove(a)
              } else {
                var s = o.document.createElement(n[0])
                e != 'superscript' && e != 'subscript' || (a = i.document.createTextNode(''), o.insertNode(a).removeInlineStyle(['sub', 'sup']).setStartBefore(a).collapse(!0)), o.insertNode(s).setStart(s, 0)
              }
              o.collapse(!0)
            } else e != 'superscript' && e != 'subscript' || r && r.tagName.toLowerCase() == e || o.removeInlineStyle(['sub', 'sup']), r ? o.removeInlineStyle(n) : o.applyInlineStyle(n[0])
            o.select()
          },
          queryCommandState: function () {
            return t(this, n) ? 1 : 0
          }
        }
      }(n, e[n]))
    }
  }, UE.plugins.elementpath = function () {
    var e, t, i = this
    i.setOpt('elementPathEnabled', !0), i.options.elementPathEnabled && (i.commands.elementpath = {
      execCommand: function (n, o) {
        var r = t[o],
          a = i.selection.getRange()
        e = 1 * o, a.selectNode(r).select()
      },
      queryCommandValue: function () {
        var i = [].concat(this.selection.getStartElementPath()).reverse(),
          n = []
        t = i
        for (var o, r = 0; o = i[r]; r++) {
          if (o.nodeType != 3) {
            var a = o.tagName.toLowerCase()
            if (a == 'img' && o.getAttribute('anchorname') && (a = 'anchor'), n[r] = a, e == r) {
              e = -1
              break
            }
          }
        }
        return n
      }
    })
  }, UE.plugins.formatmatch = function () {
    function e (r, a) {
      function s (e) {
        return m && e.selectNode(m), e.applyInlineStyle(n[n.length - 1].tagName, null, n)
      }
      if (browser.webkit) var l = a.target.tagName == 'IMG' ? a.target : null
      i.undoManger && i.undoManger.save()
      var d = i.selection.getRange(),
        c = l || d.getClosedNode()
      if (t && c && c.tagName == 'IMG') c.style.cssText += ';float:' + (t.style.cssFloat || t.style.styleFloat || 'none') + ';display:' + (t.style.display || 'inline'), t = null
      else if (!t) {
        var u = d.collapsed
        if (u) {
          var m = i.document.createTextNode('match')
          d.insertNode(m).select()
        }
        i.__hasEnterExecCommand = !0
        var f = i.options.removeFormatAttributes
        i.options.removeFormatAttributes = '', i.execCommand('removeformat'), i.options.removeFormatAttributes = f, i.__hasEnterExecCommand = !1, d = i.selection.getRange(), n.length && s(d), m && d.setStartBefore(m).collapse(!0), d.select(), m && domUtils.remove(m)
      }
      i.undoManger && i.undoManger.save(), i.removeListener('mouseup', e), o = 0
    }
    var t, i = this,
      n = [],
      o = 0
    i.addListener('reset', function () {
      n = [], o = 0
    }), i.commands.formatmatch = {
      execCommand: function (r) {
        if (o) return o = 0, n = [], void i.removeListener('mouseup', e)
        var a = i.selection.getRange()
        if (t = a.getClosedNode(), !t || t.tagName != 'IMG') {
          a.collapse(!0).shrinkBoundary()
          var s = a.startContainer
          n = domUtils.findParents(s, !0, function (e) {
            return !domUtils.isBlockElm(e) && e.nodeType == 1
          })
          for (var l, d = 0; l = n[d]; d++) {
            if (l.tagName == 'A') {
              n.splice(d, 1)
              break
            }
          }
        }
        i.addListener('mouseup', e), o = 1
      },
      queryCommandState: function () {
        return o
      },
      notNeedUndo: 1
    }
  }, UE.plugin.register('searchreplace', function () {
    function e (e, t, i) {
      var n = t.searchStr; t.dir == -1 && (e = e.split('').reverse().join(''), n = n.split('').reverse().join(''), i = e.length - i)
      for (var o, r = new RegExp(n, 'g' + (t.casesensitive ? '' : 'i')); o = r.exec(e);) { if (o.index >= i) return t.dir == -1 ? e.length - o.index - t.searchStr.length : o.index }
      return -1
    }

    function t (t, i, n) {
      var o, r, s = n.all || n.dir == 1 ? 'getNextDomNode' : 'getPreDomNode'
      domUtils.isBody(t) && (t = t.firstChild)
      for (var l = 1; t;) {
        if (o = t.nodeType == 3 ? t.nodeValue : t[browser.ie ? 'innerText' : 'textContent'], r = e(o, n, i), l = 0, r != -1) {
          return {
            node: t,
            index: r
          }
        }
        for (t = domUtils[s](t); t && a[t.nodeName.toLowerCase()];) t = domUtils[s](t, !0)
        t && (i = n.dir == -1 ? (t.nodeType == 3 ? t.nodeValue : t[browser.ie ? 'innerText' : 'textContent']).length : 0)
      }
    }

    function i (e, t, n) {
      for (var o, r = 0, a = e.firstChild, s = 0; a;) {
        if (a.nodeType == 3) {
          if (s = a.nodeValue.replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, '').length, r += s, r >= t) {
            return {
              node: a,
              index: s - (r - t)
            }
          }
        } else if (!dtd.$empty[a.tagName] && (s = a[browser.ie ? 'innerText' : 'textContent'].replace(/(^[\t\r\n]+)|([\t\r\n]+$)/, '').length, r += s, r >= t && (o = i(a, s - (r - t), n)))) return o
        a = domUtils.getNextDomNode(a)
      }
    }

    function n (e, n) {
      var r, a = e.selection.getRange(),
        s = n.searchStr,
        l = e.document.createElement('span')
      if (l.innerHTML = '$$ueditor_searchreplace_key$$', a.shrinkBoundary(!0), !a.collapsed) {
        a.select()
        var d = e.selection.getText()
        if (new RegExp('^' + n.searchStr + '$', n.casesensitive ? '' : 'i').test(d)) {
          if (void 0 != n.replaceStr) return o(a, n.replaceStr), a.select(), !0
          a.collapse(n.dir == -1)
        }
      }
      a.insertNode(l), a.enlargeToBlockElm(!0), r = a.startContainer
      var c = r[browser.ie ? 'innerText' : 'textContent'].indexOf('$$ueditor_searchreplace_key$$')
      a.setStartBefore(l), domUtils.remove(l)
      var u = t(r, c, n)
      if (u) {
        var m = i(u.node, u.index, s),
          f = i(u.node, u.index + s.length, s)
        return a.setStart(m.node, m.index).setEnd(f.node, f.index), void 0 !== n.replaceStr && o(a, n.replaceStr), a.select(), !0
      }
      a.setCursor()
    }

    function o (e, t) {
      t = r.document.createTextNode(t), e.deleteContents().insertNode(t)
    }
    var r = this,
      a = {
        table: 1,
        tbody: 1,
        tr: 1,
        ol: 1,
        ul: 1
      }
    return {
      commands: {
        searchreplace: {
          execCommand: function (e, t) {
            utils.extend(t, {
              all: !1,
              casesensitive: !1,
              dir: 1
            }, !0)
            var i = 0
            if (t.all) {
              var o = r.selection.getRange(),
                a = r.body.firstChild
              for (a && a.nodeType == 1 ? (o.setStart(a, 0), o.shrinkBoundary(!0)) : a.nodeType == 3 && o.setStartBefore(a), o.collapse(!0).select(!0), void 0 !== t.replaceStr && r.fireEvent('saveScene'); n(this, t);) i++
              i && r.fireEvent('saveScene')
            } else void 0 !== t.replaceStr && r.fireEvent('saveScene'), n(this, t) && i++, i && r.fireEvent('saveScene')
            return i
          },
          notNeedUndo: 1
        }
      }
    }
  }), UE.plugins.customstyle = function () {
    var e = this
    e.setOpt({
      customstyle: [{
        tag: 'h1',
        name: 'tc',
        style: 'font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:center;margin:0 0 20px 0;'
      }, {
        tag: 'h1',
        name: 'tl',
        style: 'font-size:32px;font-weight:bold;border-bottom:#ccc 2px solid;padding:0 4px 0 0;text-align:left;margin:0 0 10px 0;'
      }, {
        tag: 'span',
        name: 'im',
        style: 'font-size:16px;font-style:italic;font-weight:bold;line-height:18px;'
      }, {
        tag: 'span',
        name: 'hi',
        style: 'font-size:16px;font-style:italic;font-weight:bold;color:rgb(51, 153, 204);line-height:18px;'
      }]
    }), e.commands.customstyle = {
      execCommand: function (e, t) {
        var i, n, o = this,
          r = t.tag,
          a = domUtils.findParent(o.selection.getStart(), function (e) {
            return e.getAttribute('label')
          }, !0),
          s = {}
        for (var l in t) void 0 !== t[l] && (s[l] = t[l])
        if (delete s.tag, a && a.getAttribute('label') == t.label) {
          if (i = this.selection.getRange(), n = i.createBookmark(), i.collapsed) {
            if (dtd.$block[a.tagName]) {
              var d = o.document.createElement('p')
              domUtils.moveChild(a, d), a.parentNode.insertBefore(d, a), domUtils.remove(a)
            } else domUtils.remove(a, !0)
          } else {
            var c = domUtils.getCommonAncestor(n.start, n.end),
              u = domUtils.getElementsByTagName(c, r)
            new RegExp(r, 'i').test(c.tagName) && u.push(c)
            for (var m, f = 0; m = u[f++];) {
              if (m.getAttribute('label') == t.label) {
                var h = domUtils.getPosition(m, n.start),
                  p = domUtils.getPosition(m, n.end)
                if ((h & domUtils.POSITION_FOLLOWING || h & domUtils.POSITION_CONTAINS) && (p & domUtils.POSITION_PRECEDING || p & domUtils.POSITION_CONTAINS) && dtd.$block[r]) {
                  var d = o.document.createElement('p')
                  domUtils.moveChild(m, d), m.parentNode.insertBefore(d, m)
                }
                domUtils.remove(m, !0)
              }
            }
            a = domUtils.findParent(c, function (e) {
              return e.getAttribute('label') == t.label
            }, !0), a && domUtils.remove(a, !0)
          }
          i.moveToBookmark(n).select()
        } else if (dtd.$block[r]) {
          if (this.execCommand('paragraph', r, s, 'customstyle'), i = o.selection.getRange(), !i.collapsed) {
            i.collapse(), a = domUtils.findParent(o.selection.getStart(), function (e) {
              return e.getAttribute('label') == t.label
            }, !0)
            var g = o.document.createElement('p')
            domUtils.insertAfter(a, g), domUtils.fillNode(o.document, g), i.setStart(g, 0).setCursor()
          }
        } else {
          if (i = o.selection.getRange(), i.collapsed) return a = o.document.createElement(r), domUtils.setAttributes(a, s), void i.insertNode(a).setStart(a, 0).setCursor()
          n = i.createBookmark(), i.applyInlineStyle(r, s).moveToBookmark(n).select()
        }
      },
      queryCommandValue: function () {
        var e = domUtils.filterNodeList(this.selection.getStartElementPath(), function (e) {
          return e.getAttribute('label')
        })
        return e ? e.getAttribute('label') : ''
      }
    }, e.addListener('keyup', function (t, i) {
      var n = i.keyCode || i.which
      if (n == 32 || n == 13) {
        var o = e.selection.getRange()
        if (o.collapsed) {
          var r = domUtils.findParent(e.selection.getStart(), function (e) {
            return e.getAttribute('label')
          }, !0)
          if (r && dtd.$block[r.tagName] && domUtils.isEmptyNode(r)) {
            var a = e.document.createElement('p')
            domUtils.insertAfter(r, a), domUtils.fillNode(e.document, a), domUtils.remove(r), o.setStart(a, 0).setCursor()
          }
        }
      }
    })
  }, UE.plugins.catchremoteimage = function () {
    var me = this,
      ajax = UE.ajax
    me.options.catchRemoteImageEnable !== !1 && (me.setOpt({
      catchRemoteImageEnable: !1
    }), me.addListener('afterpaste', function () {
      me.fireEvent('catchRemoteImage')
    }), me.addListener('catchRemoteImage', function () {
      function catchremoteimage (e, t) {
        var i = utils.serializeParam(me.queryCommandValue('serverparam')) || '',
          n = utils.formatUrl(catcherActionUrl + (catcherActionUrl.indexOf('?') == -1 ? '?' : '&') + i),
          o = utils.isCrossDomainUrl(n),
          r = {
            method: 'POST',
            dataType: o ? 'jsonp' : '',
            timeout: 6e4,
            onsuccess: t.success,
            onerror: t.error
          }
        r[catcherFieldName] = e, ajax.request(n, r)
      }
      for (var catcherLocalDomain = me.getOpt('catcherLocalDomain'), catcherActionUrl = me.getActionUrl(me.getOpt('catcherActionName')), catcherUrlPrefix = me.getOpt('catcherUrlPrefix'), catcherFieldName = me.getOpt('catcherFieldName'), remoteImages = [], imgs = domUtils.getElementsByTagName(me.document, 'img'), test = function (e, t) {
          if (e.indexOf(location.host) != -1 || /(^\.)|(^\/)/.test(e)) return !0
          if (t) {
            for (var i, n = 0; i = t[n++];) { if (e.indexOf(i) !== -1) return !0 }
          }
          return !1
        }, i = 0, ci; ci = imgs[i++];) {
        if (!ci.getAttribute('word_img')) {
          var src = ci.getAttribute('_src') || ci.src || '';
          /^(https?|ftp):/i.test(src) && !test(src, catcherLocalDomain) && remoteImages.push(src)
        }
      }
      remoteImages.length && catchremoteimage(remoteImages, {
        success: function (r) {
          try {
            var info = void 0 !== r.state ? r : eval('(' + r.responseText + ')')
          } catch (e) {
            return
          }
          var i, j, ci, cj, oldSrc, newSrc, list = info.list
          for (i = 0; ci = imgs[i++];) {
            for (oldSrc = ci.getAttribute('_src') || ci.src || '', j = 0; cj = list[j++];) {
              if (oldSrc == cj.source && cj.state == 'SUCCESS') {
                newSrc = catcherUrlPrefix + cj.url, domUtils.setAttributes(ci, {
                  src: newSrc,
                  _src: newSrc
                })
                break
              }
            }
          }
          me.fireEvent('catchremotesuccess')
        },
        error: function () {
          me.fireEvent('catchremoteerror')
        }
      })
    }))
  }, UE.plugin.register('snapscreen', function () {
    function getLocation (e) {
      var t, i = document.createElement('a'),
        n = utils.serializeParam(me.queryCommandValue('serverparam')) || ''
      return i.href = e, browser.ie && (i.href = i.href), t = i.search, n && (t = t + (t.indexOf('?') == -1 ? '?' : '&') + n, t = t.replace(/[&]+/gi, '&')), {
        port: i.port,
        hostname: i.hostname,
        path: i.pathname + t || +i.hash
      }
    }
    var me = this,
      snapplugin
    return {
      commands: {
        snapscreen: {
          execCommand: function (cmd) {
            function onSuccess (rs) {
              try {
                if (rs = eval('(' + rs + ')'), rs.state == 'SUCCESS') {
                  var opt = me.options
                  me.execCommand('insertimage', {
                    src: opt.snapscreenUrlPrefix + rs.url,
                    _src: opt.snapscreenUrlPrefix + rs.url,
                    alt: rs.title || '',
                    floatStyle: opt.snapscreenImgAlign
                  })
                } else alert(rs.state)
              } catch (e) {
                alert(lang.callBackErrorMsg)
              }
            }
            var url, local, res, lang = me.getLang('snapScreen_plugin')
            if (!snapplugin) {
              var container = me.container,
                doc = me.container.ownerDocument || me.container.document
              snapplugin = doc.createElement('object')
              try {
                snapplugin.type = 'application/x-pluginbaidusnap'
              } catch (e) {
                return
              }
              snapplugin.style.cssText = 'position:absolute;left:-9999px;width:0;height:0;', snapplugin.setAttribute('width', '0'), snapplugin.setAttribute('height', '0'), container.appendChild(snapplugin)
            }
            url = me.getActionUrl(me.getOpt('snapscreenActionName')), local = getLocation(url), setTimeout(function () {
              try {
                res = snapplugin.saveSnapshot(local.hostname, local.path, local.port)
              } catch (e) {
                return void me.ui._dialogs.snapscreenDialog.open()
              }
              onSuccess(res)
            }, 50)
          },
          queryCommandState: function () {
            return navigator.userAgent.indexOf('Windows', 0) != -1 ? 0 : -1
          }
        }
      }
    }
  }), UE.commands.insertparagraph = {
    execCommand: function (e, t) {
      for (var i, n = this, o = n.selection.getRange(), r = o.startContainer; r && !domUtils.isBody(r);) i = r, r = r.parentNode
      if (i) {
        var a = n.document.createElement('p')
        t ? i.parentNode.insertBefore(a, i) : i.parentNode.insertBefore(a, i.nextSibling), domUtils.fillNode(n.document, a), o.setStart(a, 0).setCursor(!1, !0)
      }
    }
  }, UE.plugin.register('webapp', function () {
    function e (e, i) {
      return i ? '<iframe class="edui-faked-webapp" title="' + e.title + '" ' + (e.align && !e.cssfloat ? 'align="' + e.align + '"' : '') + (e.cssfloat ? 'style="float:' + e.cssfloat + '"' : '') + 'width="' + e.width + '" height="' + e.height + '"  scrolling="no" frameborder="0" src="' + e.url + '" logo_url = "' + e.logo + '"></iframe>' : '<img title="' + e.title + '" width="' + e.width + '" height="' + e.height + '" src="' + t.options.UEDITOR_HOME_URL + 'themes/default/images/spacer.gif" _logo_url="' + e.logo + '" style="background:url(' + e.logo + ') no-repeat center center; border:1px solid gray;" class="edui-faked-webapp" _url="' + e.url + '" ' + (e.align && !e.cssfloat ? 'align="' + e.align + '"' : '') + (e.cssfloat ? 'style="float:' + e.cssfloat + '"' : '') + '/>'
    }
    var t = this
    return {
      outputRule: function (t) {
        utils.each(t.getNodesByTagName('img'), function (t) {
          var i
          if (t.getAttr('class') == 'edui-faked-webapp') {
            i = e({
              title: t.getAttr('title'),
              width: t.getAttr('width'),
              height: t.getAttr('height'),
              align: t.getAttr('align'),
              cssfloat: t.getStyle('float'),
              url: t.getAttr('_url'),
              logo: t.getAttr('_logo_url')
            }, !0)
            var n = UE.uNode.createElement(i)
            t.parentNode.replaceChild(n, t)
          }
        })
      },
      inputRule: function (t) {
        utils.each(t.getNodesByTagName('iframe'), function (t) {
          if (t.getAttr('class') == 'edui-faked-webapp') {
            var i = UE.uNode.createElement(e({
              title: t.getAttr('title'),
              width: t.getAttr('width'),
              height: t.getAttr('height'),
              align: t.getAttr('align'),
              cssfloat: t.getStyle('float'),
              url: t.getAttr('src'),
              logo: t.getAttr('logo_url')
            }))
            t.parentNode.replaceChild(i, t)
          }
        })
      },
      commands: {
        webapp: {
          execCommand: function (t, i) {
            var n = this,
              o = e(utils.extend(i, {
                align: 'none'
              }), !1)
            n.execCommand('inserthtml', o)
          },
          queryCommandState: function () {
            var e = this,
              t = e.selection.getRange().getClosedNode(),
              i = t && t.className == 'edui-faked-webapp'
            return i ? 1 : 0
          }
        }
      }
    }
  }), UE.plugins.template = function () {
    UE.commands.template = {
      execCommand: function (e, t) {
        t.html && this.execCommand('inserthtml', t.html)
      }
    }, this.addListener('click', function (e, t) {
      var i = t.target || t.srcElement,
        n = this.selection.getRange(),
        o = domUtils.findParent(i, function (e) {
          return e.className && domUtils.hasClass(e, 'ue_t') ? e : void 0
        }, !0)
      o && n.selectNode(o).shrinkBoundary().select()
    }), this.addListener('keydown', function (e, t) {
      var i = this.selection.getRange()
      if (!i.collapsed && !(t.ctrlKey || t.metaKey || t.shiftKey || t.altKey)) {
        var n = domUtils.findParent(i.startContainer, function (e) {
          return e.className && domUtils.hasClass(e, 'ue_t') ? e : void 0
        }, !0)
        n && domUtils.removeClasses(n, ['ue_t'])
      }
    })
  }, UE.plugin.register('music', function () {
    function e (e, i, n, o, r, a) {
      return a ? '<embed type="application/x-shockwave-flash" class="edui-faked-music" pluginspage="http://www.macromedia.com/go/getflashplayer" src="' + e + '" width="' + i + '" height="' + n + '" ' + (o && !r ? 'align="' + o + '"' : '') + (r ? 'style="float:' + r + '"' : '') + ' wmode="transparent" play="true" loop="false" menu="false" allowscriptaccess="never" allowfullscreen="true" >' : '<img ' + (o && !r ? 'align="' + o + '"' : '') + (r ? 'style="float:' + r + '"' : '') + ' width="' + i + '" height="' + n + '" _url="' + e + '" class="edui-faked-music" src="' + t.options.langPath + t.options.lang + '/images/music.png" />'
    }
    var t = this
    return {
      outputRule: function (t) {
        utils.each(t.getNodesByTagName('img'), function (t) {
          var i
          if (t.getAttr('class') == 'edui-faked-music') {
            var n = t.getStyle('float'),
              o = t.getAttr('align')
            i = e(t.getAttr('_url'), t.getAttr('width'), t.getAttr('height'), o, n, !0)
            var r = UE.uNode.createElement(i)
            t.parentNode.replaceChild(r, t)
          }
        })
      },
      inputRule: function (t) {
        utils.each(t.getNodesByTagName('embed'), function (t) {
          if (t.getAttr('class') == 'edui-faked-music') {
            var i = t.getStyle('float'),
              n = t.getAttr('align')
            html = e(t.getAttr('src'), t.getAttr('width'), t.getAttr('height'), n, i, !1)
            var o = UE.uNode.createElement(html)
            t.parentNode.replaceChild(o, t)
          }
        })
      },
      commands: {
        music: {
          execCommand: function (t, i) {
            var n = this,
              o = e(i.url, i.width || 400, i.height || 95, 'none', !1)
            n.execCommand('inserthtml', o)
          },
          queryCommandState: function () {
            var e = this,
              t = e.selection.getRange().getClosedNode(),
              i = t && t.className == 'edui-faked-music'
            return i ? 1 : 0
          }
        }
      }
    }
  }), UE.plugin.register('autoupload', function () {
    function e (e, t) {
      var i, n, o, r, a, s, l, d, c = t,
        u = /image\/\w+/i.test(e.type) ? 'image' : 'file',
        m = 'loading_' + (+new Date()).toString(36)
      if (i = c.getOpt(u + 'FieldName'), n = c.getOpt(u + 'UrlPrefix'), o = c.getOpt(u + 'MaxSize'), r = c.getOpt(u + 'AllowFiles'), a = c.getActionUrl(c.getOpt(u + 'ActionName')), l = function (e) {
        var t = c.document.getElementById(m)
        t && domUtils.remove(t), c.fireEvent('showmessage', {
          id: m,
          content: e,
          type: 'error',
          timeout: 4e3
        })
      }, u == 'image' ? (s = '<img class="loadingclass" id="' + m + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif" title="' + (c.getLang('autoupload.loading') || '') + '" >', d = function (e) {
        var t = n + e.url,
          i = c.document.getElementById(m)
        i && (i.setAttribute('src', t), i.setAttribute('_src', t), i.setAttribute('title', e.title || ''), i.setAttribute('alt', e.original || ''), i.setAttribute('uploadpic', e.url || ''), i.removeAttribute('id'), domUtils.removeClasses(i, 'loadingclass'))
      }) : (s = '<p><img class="loadingclass" id="' + m + '" src="' + c.options.themePath + c.options.theme + '/images/spacer.gif" title="' + (c.getLang('autoupload.loading') || '') + '" ></p>', d = function (e) {
        var t = n + e.url,
          i = c.document.getElementById(m),
          o = c.selection.getRange(),
          r = o.createBookmark()
        o.selectNode(i).select(), c.execCommand('insertfile', {
          url: t
        }), o.moveToBookmark(r).select()
      }), c.execCommand('inserthtml', s), !c.getOpt(u + 'ActionName')) return void l(c.getLang('autoupload.errorLoadConfig'))
      if (e.size > o) return void l(c.getLang('autoupload.exceedSizeError'))
      var f = e.name ? e.name.substr(e.name.lastIndexOf('.')) : ''
      if (f && u != 'image' || r && (r.join('') + '.').indexOf(f.toLowerCase() + '.') == -1) return void l(c.getLang('autoupload.exceedTypeError'))
      var h = new XMLHttpRequest(),
        p = new FormData(),
        g = utils.serializeParam(c.queryCommandValue('serverparam')) || '',
        v = utils.formatUrl(a + (a.indexOf('?') == -1 ? '?' : '&') + g)
      p.append(i, e, e.name || 'blob.' + e.type.substr('image/'.length)), p.append('type', 'ajax'), h.open('post', v, !0), h.setRequestHeader('X-Requested-With', 'XMLHttpRequest'), h.addEventListener('load', function (e) {
        try {
          var t = new Function('return ' + utils.trim(e.target.response))()
          t.state == 'SUCCESS' && t.url ? d(t) : l(t.state)
        } catch (i) {
          l(c.getLang('autoupload.loadError'))
        }
      }), h.send(p)
    }

    function t (e) {
      return e.clipboardData && e.clipboardData.items && e.clipboardData.items.length == 1 && /^image\//.test(e.clipboardData.items[0].type) ? e.clipboardData.items : null
    }

    function i (e) {
      return e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : null
    }
    return {
      outputRule: function (e) {
        utils.each(e.getNodesByTagName('img'), function (e) {
          /\b(loaderrorclass)|(bloaderrorclass)\b/.test(e.getAttr('class')) && e.parentNode.removeChild(e)
        }), utils.each(e.getNodesByTagName('p'), function (e) {
          /\bloadpara\b/.test(e.getAttr('class')) && e.parentNode.removeChild(e)
        })
      },
      bindEvents: {
        ready: function (n) {
          var o = this
          window.FormData && window.FileReader && (domUtils.on(o.body, 'paste drop', function (n) {
            var r, a = !1
            if (r = n.type == 'paste' ? t(n) : i(n)) {
              for (var s, l = r.length; l--;) s = r[l], s.getAsFile && (s = s.getAsFile()), s && s.size > 0 && (e(s, o), a = !0)
              a && n.preventDefault()
            }
          }), domUtils.on(o.body, 'dragover', function (e) {
            e.dataTransfer.types[0] == 'Files' && e.preventDefault()
          }), utils.cssRule('loading', ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-left:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document))
        }
      }
    }
  }), UE.plugin.register('autosave', function () {
    function e (e) {
      var r
      if (!(new Date() - i < n)) {
        if (!e.hasContents()) return void (o && t.removePreferences(o))
        i = new Date(), e._saveFlag = null, r = t.body.innerHTML, e.fireEvent('beforeautosave', {
          content: r
        }) !== !1 && (t.setPreferences(o, r), e.fireEvent('afterautosave', {
          content: r
        }))
      }
    }
    var t = this,
      i = new Date(),
      n = 20,
      o = null
    return {
      defaultOptions: {
        saveInterval: 500
      },
      bindEvents: {
        ready: function () {
          var e = '-drafts-data',
            i = null
          i = t.key ? t.key + e : (t.container.parentNode.id || 'ue-common') + e, o = (location.protocol + location.host + location.pathname).replace(/[.:\/]/g, '_') + i
        },
        contentchange: function () {
          o && (t._saveFlag && window.clearTimeout(t._saveFlag), t.options.saveInterval > 0 ? t._saveFlag = window.setTimeout(function () {
            e(t)
          }, t.options.saveInterval) : e(t))
        }
      },
      commands: {
        clearlocaldata: {
          execCommand: function (e, i) {
            o && t.getPreferences(o) && t.removePreferences(o)
          },
          notNeedUndo: !0,
          ignoreContentChange: !0
        },
        getlocaldata: {
          execCommand: function (e, i) {
            return o ? t.getPreferences(o) || '' : ''
          },
          notNeedUndo: !0,
          ignoreContentChange: !0
        },
        drafts: {
          execCommand: function (e, i) {
            o && (t.body.innerHTML = t.getPreferences(o) || '<p>' + domUtils.fillHtml + '</p>', t.focus(!0))
          },
          queryCommandState: function () {
            return o ? t.getPreferences(o) === null ? -1 : 0 : -1
          },
          notNeedUndo: !0,
          ignoreContentChange: !0
        }
      }
    }
  }), UE.plugin.register('charts', function () {
    function e (e) {
      var t = null,
        i = 0
      if (e.rows.length < 2) return !1
      if (e.rows[0].cells.length < 2) return !1
      t = e.rows[0].cells, i = t.length
      for (var n, o = 0; n = t[o]; o++) { if (n.tagName.toLowerCase() !== 'th') return !1 }
      for (var r, o = 1; r = e.rows[o]; o++) {
        if (r.cells.length != i) return !1
        if (r.cells[0].tagName.toLowerCase() !== 'th') return !1
        for (var n, a = 1; n = r.cells[a]; a++) {
          var s = utils.trim(n.innerText || n.textContent || '')
          if (s = s.replace(new RegExp(UE.dom.domUtils.fillChar, 'g'), '').replace(/^\s+|\s+$/g, ''), !/^\d*\.?\d+$/.test(s)) return !1
        }
      }
      return !0
    }
    var t = this
    return {
      bindEvents: {
        chartserror: function () {}
      },
      commands: {
        charts: {
          execCommand: function (i, n) {
            var o = domUtils.findParentByTagName(this.selection.getRange().startContainer, 'table', !0),
              r = [],
              a = {}
            if (!o) return !1
            if (!e(o)) return t.fireEvent('chartserror'), !1
            a.title = n.title || '', a.subTitle = n.subTitle || '', a.xTitle = n.xTitle || '', a.yTitle = n.yTitle || '', a.suffix = n.suffix || '', a.tip = n.tip || '', a.dataFormat = n.tableDataFormat || '', a.chartType = n.chartType || 0
            for (var s in a) a.hasOwnProperty(s) && r.push(s + ':' + a[s])
            o.setAttribute('data-chart', r.join(';')), domUtils.addClass(o, 'edui-charts-table')
          },
          queryCommandState: function (t, i) {
            var n = domUtils.findParentByTagName(this.selection.getRange().startContainer, 'table', !0)
            return n && e(n) ? 0 : -1
          }
        }
      },
      inputRule: function (e) {
        utils.each(e.getNodesByTagName('table'), function (e) {
          void 0 !== e.getAttr('data-chart') && e.setAttr('style')
        })
      },
      outputRule: function (e) {
        utils.each(e.getNodesByTagName('table'), function (e) {
          void 0 !== e.getAttr('data-chart') && e.setAttr('style', 'display: none;')
        })
      }
    }
  }), UE.plugin.register('section', function () {
    function e (e) {
      this.tag = '', this.level = -1, this.dom = null, this.nextSection = null, this.previousSection = null, this.parentSection = null, this.startAddress = [], this.endAddress = [], this.children = []
    }

    function t (t) {
      var i = new e()
      return utils.extend(i, t)
    }

    function i (e, t) {
      for (var i = t, n = 0; n < e.length; n++) {
        if (!i.childNodes) return null
        i = i.childNodes[e[n]]
      }
      return i
    }
    var n = this
    return {
      bindMultiEvents: {
        type: 'aftersetcontent afterscencerestore',
        handler: function () {
          n.fireEvent('updateSections')
        }
      },
      bindEvents: {
        ready: function () {
          n.fireEvent('updateSections'), domUtils.on(n.body, 'drop paste', function () {
            n.fireEvent('updateSections')
          })
        },
        afterexeccommand: function (e, t) {
          t == 'paragraph' && n.fireEvent('updateSections')
        },
        keyup: function (e, t) {
          var i = this,
            n = i.selection.getRange()
          if (n.collapsed != 1) i.fireEvent('updateSections')
          else {
            var o = t.keyCode || t.which
            o != 13 && o != 8 && o != 46 || i.fireEvent('updateSections')
          }
        }
      },
      commands: {
        getsections: {
          execCommand: function (e, i) {
            function n (e) {
              for (var t = 0; t < r.length; t++) { if (r[t](e)) return t }
              return -1
            }

            function o (e, i) {
              for (var r, a, l, c = null, u = e.childNodes, m = 0, f = u.length; f > m; m++) {
                if (l = u[m], r = n(l), r >= 0) {
                  var h = s.selection.getRange().selectNode(l).createAddress(!0).startAddress,
                    p = t({
                      tag: l.tagName,
                      title: l.innerText || l.textContent || '',
                      level: r,
                      dom: l,
                      startAddress: utils.clone(h, []),
                      endAddress: utils.clone(h, []),
                      children: []
                    })
                  for (d.nextSection = p, p.previousSection = d, a = d; r <= a.level;) a = a.parentSection
                  p.parentSection = a, a.children.push(p), c = d = p
                } else l.nodeType === 1 && o(l, i), c && c.endAddress[c.endAddress.length - 1]++
              }
            }
            for (var r = i || ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], a = 0; a < r.length; a++) {
              typeof r[a] === 'string' ? r[a] = (function (e) {
                return function (t) {
                  return t.tagName == e.toUpperCase()
                }
              }(r[a])) : typeof r[a] !== 'function' && (r[a] = function (e) {
                return null
              })
            }
            var s = this,
              l = t({
                level: -1,
                title: 'root'
              }),
              d = l
            return o(s.body, l), l
          },
          notNeedUndo: !0
        },
        movesection: {
          execCommand: function (e, t, n, o) {
            function r (e, t, i) {
              for (var n = !1, o = !1, r = 0; r < e.length && !(r >= i.length); r++) {
                if (i[r] > e[r]) {
                  n = !0
                  break
                }
                if (i[r] < e[r]) break
              }
              for (var r = 0; r < t.length && !(r >= i.length); r++) {
                if (i[r] < e[r]) {
                  o = !0
                  break
                }
                if (i[r] > e[r]) break
              }
              return n && o
            }
            var a, s, l = this
            if (t && n && n.level != -1 && (a = o ? n.endAddress : n.startAddress, s = i(a, l.body), a && s && !r(t.startAddress, t.endAddress, a))) {
              var d, c, u = i(t.startAddress, l.body),
                m = i(t.endAddress, l.body)
              if (o) { for (d = m; d && !(domUtils.getPosition(u, d) & domUtils.POSITION_FOLLOWING) && (c = d.previousSibling, domUtils.insertAfter(s, d), d != u);) d = c } else { for (d = u; d && !(domUtils.getPosition(d, m) & domUtils.POSITION_FOLLOWING) && (c = d.nextSibling, s.parentNode.insertBefore(d, s), d != m);) d = c }
              l.fireEvent('updateSections')
            }
          }
        },
        deletesection: {
          execCommand: function (e, t, i) {
            function n (e) {
              for (var t = o.body, i = 0; i < e.length; i++) {
                if (!t.childNodes) return null
                t = t.childNodes[e[i]]
              }
              return t
            }
            var o = this
            if (t) {
              var r, a = n(t.startAddress),
                s = n(t.endAddress),
                l = a
              if (i) domUtils.remove(l)
              else { for (; l && domUtils.inDoc(s, o.document) && !(domUtils.getPosition(l, s) & domUtils.POSITION_FOLLOWING);) r = l.nextSibling, domUtils.remove(l), l = r }
              o.fireEvent('updateSections')
            }
          }
        },
        selectsection: {
          execCommand: function (e, t) {
            if (!t && !t.dom) return !1
            var i = this,
              n = i.selection.getRange(),
              o = {
                startAddress: utils.clone(t.startAddress, []),
                endAddress: utils.clone(t.endAddress, [])
              }
            return o.endAddress[o.endAddress.length - 1]++, n.moveToAddress(o).select().scrollToView(), !0
          },
          notNeedUndo: !0
        },
        scrolltosection: {
          execCommand: function (e, t) {
            if (!t && !t.dom) return !1
            var i = this,
              n = i.selection.getRange(),
              o = {
                startAddress: t.startAddress,
                endAddress: t.endAddress
              }
            return o.endAddress[o.endAddress.length - 1]++, n.moveToAddress(o).scrollToView(), !0
          },
          notNeedUndo: !0
        }
      }
    }
  }), UE.plugin.register('simpleupload', function () {
    function e () {
      var e = t.offsetWidth || 20,
        o = t.offsetHeight || 20,
        r = document.createElement('iframe'),
        a = 'display:block;width:' + e + 'px;height:' + o + 'px;overflow:hidden;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;'
      domUtils.on(r, 'load', function () {
        var t, s, l, d = (+new Date()).toString(36)
        s = r.contentDocument || r.contentWindow.document, l = s.body, t = s.createElement('div'), t.innerHTML = '<form id="edui_form_' + d + '" target="edui_iframe_' + d + '" method="POST" enctype="multipart/form-data" action="' + i.getOpt('serverUrl') + '" style="' + a + '"><input id="edui_input_' + d + '" type="file" accept="image/*" name="' + i.options.imageFieldName + '" style="' + a + '"></form><iframe id="edui_iframe_' + d + '" name="edui_iframe_' + d + '" style="display:none;width:0;height:0;border:0;margin:0;padding:0;position:absolute;"></iframe>', t.className = 'edui-' + i.options.theme, t.id = i.ui.id + '_iframeupload', l.style.cssText = a, l.style.width = e + 'px', l.style.height = o + 'px', l.appendChild(t), l.parentNode && (l.parentNode.style.width = e + 'px', l.parentNode.style.height = e + 'px')
        var c = s.getElementById('edui_form_' + d),
          u = s.getElementById('edui_input_' + d),
          m = s.getElementById('edui_iframe_' + d)
        domUtils.on(u, 'change', function () {
          function e () {
            try {
              var o, r, a, s = (m.contentDocument || m.contentWindow.document).body,
                l = s.innerText || s.textContent || ''
              r = new Function('return ' + l)(), o = i.options.imageUrlPrefix + r.url, r.state == 'SUCCESS' && r.url ? (a = i.document.getElementById(n), a.setAttribute('src', o), a.setAttribute('_src', o), a.setAttribute('title', r.title || ''), a.setAttribute('alt', r.original || ''), a.setAttribute('uploadpic', r.url || ''), a.removeAttribute('id'), domUtils.removeClasses(a, 'loadingclass')) : t && t(r.state)
            } catch (d) {
              t && t(i.getLang('simpleupload.loadError'))
            }
            c.reset(), domUtils.un(m, 'load', e)
          }

          function t (e) {
            if (n) {
              var t = i.document.getElementById(n)
              t && domUtils.remove(t), i.fireEvent('showmessage', {
                id: n,
                content: e,
                type: 'error',
                timeout: 4e3
              })
            }
          }
          if (u.value) {
            var n = 'loading_' + (+new Date()).toString(36),
              o = utils.serializeParam(i.queryCommandValue('serverparam')) || '',
              r = i.getActionUrl(i.getOpt('imageActionName')),
              a = i.getOpt('imageAllowFiles')
            if (i.focus(), i.execCommand('inserthtml', '<img class="loadingclass" id="' + n + '" src="' + i.options.themePath + i.options.theme + '/images/spacer.gif" title="' + (i.getLang('simpleupload.loading') || '') + '" >'), !i.getOpt('imageActionName')) return void errorHandler(i.getLang('autoupload.errorLoadConfig'))
            var s = u.value,
              l = s ? s.substr(s.lastIndexOf('.')) : ''
            if (!l || a && (a.join('') + '.').indexOf(l.toLowerCase() + '.') == -1) return void t(i.getLang('simpleupload.exceedTypeError'))
            domUtils.on(m, 'load', e), c.action = utils.formatUrl(r + (r.indexOf('?') == -1 ? '?' : '&') + o), c.submit()
          }
        })
        var f
        i.addListener('selectionchange', function () {
          clearTimeout(f), f = setTimeout(function () {
            var e = i.queryCommandState('simpleupload'); e == -1 ? u.disabled = 'disabled' : u.disabled = !1
          }, 400)
        }), n = !0
      }), r.style.cssText = a, t.appendChild(r)
    }
    var t, i = this,
      n = !1
    return {
      bindEvents: {
        ready: function () {
          utils.cssRule('loading', ".loadingclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loading.gif') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n.loaderrorclass{display:inline-block;cursor:default;background: url('" + this.options.themePath + this.options.theme + "/images/loaderror.png') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}", this.document)
        },
        simpleuploadbtnready: function (n, o) {
          t = o, i.afterConfigReady(e)
        }
      },
      outputRule: function (e) {
        utils.each(e.getNodesByTagName('img'), function (e) {
          /\b(loaderrorclass)|(bloaderrorclass)\b/.test(e.getAttr('class')) && e.parentNode.removeChild(e)
        })
      },
      commands: {
        simpleupload: {
          queryCommandState: function () {
            return n ? 0 : -1
          }
        }
      }
    }
  }), UE.plugin.register('serverparam', function () {
    var e = {}
    return {
      commands: {
        serverparam: {
          execCommand: function (t, i, n) {
            void 0 === i || i === null ? e = {} : utils.isString(i) ? void 0 === n || n === null ? delete e[i] : e[i] = n : utils.isObject(i) ? utils.extend(e, i, !0) : utils.isFunction(i) && utils.extend(e, i(), !0)
          },
          queryCommandValue: function () {
            return e || {}
          }
        }
      }
    }
  }), UE.plugin.register('insertfile', function () {
    function e (e) {
      var t = e.substr(e.lastIndexOf('.') + 1).toLowerCase(),
        i = {
          rar: 'icon_rar.gif',
          zip: 'icon_rar.gif',
          tar: 'icon_rar.gif',
          gz: 'icon_rar.gif',
          bz2: 'icon_rar.gif',
          doc: 'icon_doc.gif',
          docx: 'icon_doc.gif',
          pdf: 'icon_pdf.gif',
          mp3: 'icon_mp3.gif',
          xls: 'icon_xls.gif',
          chm: 'icon_chm.gif',
          ppt: 'icon_ppt.gif',
          pptx: 'icon_ppt.gif',
          avi: 'icon_mv.gif',
          rmvb: 'icon_mv.gif',
          wmv: 'icon_mv.gif',
          flv: 'icon_mv.gif',
          swf: 'icon_mv.gif',
          rm: 'icon_mv.gif',
          exe: 'icon_exe.gif',
          psd: 'icon_psd.gif',
          txt: 'icon_txt.gif',
          jpg: 'icon_jpg.gif',
          png: 'icon_jpg.gif',
          jpeg: 'icon_jpg.gif',
          gif: 'icon_jpg.gif',
          ico: 'icon_jpg.gif',
          bmp: 'icon_jpg.gif'
        }
      return i[t] ? i[t] : i.txt
    }
    var t = this
    return {
      commands: {
        insertfile: {
          execCommand: function (i, n) {
            n = utils.isArray(n) ? n : [n]
            var o, r, a, s, l = '',
              d = t.getOpt('UEDITOR_HOME_URL'),
              c = d + (d.substr(d.length - 1) == '/' ? '' : '/') + 'dialogs/attachment/fileTypeImages/'
            for (o = 0; o < n.length; o++) r = n[o], a = c + e(r.url), s = r.title || r.url.substr(r.url.lastIndexOf('/') + 1), l += '<p style="line-height: 16px;"><img style="vertical-align: middle; margin-right: 2px;" src="' + a + '" _src="' + a + '" /><a style="font-size:12px; color:#0066cc;" href="' + r.url + '" title="' + s + '">' + s + '</a></p>'
            t.execCommand('insertHtml', l)
          }
        }
      }
    }
  }), UE.plugins.xssFilter = function () {
    function e (e) {
      var t = e.tagName,
        n = e.attrs
      return i.hasOwnProperty(t) ? void UE.utils.each(n, function (n, o) {
        i[t].indexOf(o) === -1 && e.setAttr(o)
      }) : (e.parentNode.removeChild(e), !1)
    }
    var t = UEDITOR_CONFIG,
      i = t.whitList
    i && t.xssFilterRules && (this.options.filterRules = (function () {
      var t = {}
      return UE.utils.each(i, function (i, n) {
        t[n] = function (t) {
          return e(t)
        }
      }), t
    }()))
    var n = []
    UE.utils.each(i, function (e, t) {
      n.push(t)
    }), i && t.inputXssFilter && this.addInputRule(function (t) {
      t.traversal(function (t) {
        return t.type !== 'element' ? !1 : void e(t)
      })
    }), i && t.outputXssFilter && this.addOutputRule(function (t) {
      t.traversal(function (t) {
        return t.type !== 'element' ? !1 : void e(t)
      })
    })
  }
  var baidu = baidu || {}
  baidu.editor = baidu.editor || {}, UE.ui = baidu.editor.ui = {},
  (function () {
    function e () {
      var e = document.getElementById('edui_fixedlayer')
      l.setViewportOffset(e, {
        left: 0,
        top: 0
      })
    }

    function t (t) {
      n.on(window, 'scroll', e), n.on(window, 'resize', baidu.editor.utils.defer(e, 0, !0))
    }
    var i = baidu.editor.browser,
      n = baidu.editor.dom.domUtils,
      o = '$EDITORUI',
      r = window[o] = {},
      a = 'ID' + o,
      s = 0,
      l = baidu.editor.ui.uiUtils = {
        uid: function (e) {
          return e ? e[a] || (e[a] = ++s) : ++s
        },
        hook: function (e, t) {
          var i
          return e && e._callbacks ? i = e : (i = function () {
            var t
            e && (t = e.apply(this, arguments))
            for (var n = i._callbacks, o = n.length; o--;) {
              var r = n[o].apply(this, arguments)
              void 0 === t && (t = r)
            }
            return t
          }, i._callbacks = []), i._callbacks.push(t), i
        },
        createElementByHtml: function (e) {
          var t = document.createElement('div')
          return t.innerHTML = e, t = t.firstChild, t.parentNode.removeChild(t), t
        },
        getViewportElement: function () {
          return i.ie && i.quirks ? document.body : document.documentElement
        },
        getClientRect: function (e) {
          var t
          try {
            t = e.getBoundingClientRect()
          } catch (i) {
            t = {
              left: 0,
              top: 0,
              height: 0,
              width: 0
            }
          }
          for (var o, r = {
            left: Math.round(t.left),
            top: Math.round(t.top),
            height: Math.round(t.bottom - t.top),
            width: Math.round(t.right - t.left)
          };
            (o = e.ownerDocument) !== document && (e = n.getWindow(o).frameElement);) t = e.getBoundingClientRect(), r.left += t.left, r.top += t.top
          return r.bottom = r.top + r.height, r.right = r.left + r.width, r
        },
        getViewportRect: function () {
          var e = l.getViewportElement(),
            t = 0 | (window.innerWidth || e.clientWidth),
            i = 0 | (window.innerHeight || e.clientHeight)
          return {
            left: 0,
            top: 0,
            height: i,
            width: t,
            bottom: i,
            right: t
          }
        },
        setViewportOffset: function (e, t) {
          var i = l.getFixedLayer()
          e.parentNode === i ? (e.style.left = t.left + 'px', e.style.top = t.top + 'px') : n.setViewportOffset(e, t)
        },
        getEventOffset: function (e) {
          var t = e.target || e.srcElement,
            i = l.getClientRect(t),
            n = l.getViewportOffsetByEvent(e)
          return {
            left: n.left - i.left,
            top: n.top - i.top
          }
        },
        getViewportOffsetByEvent: function (e) {
          var t = e.target || e.srcElement,
            i = n.getWindow(t).frameElement,
            o = {
              left: e.clientX,
              top: e.clientY
            }
          if (i && t.ownerDocument !== document) {
            var r = l.getClientRect(i)
            o.left += r.left, o.top += r.top
          }
          return o
        },
        setGlobal: function (e, t) {
          return r[e] = t, o + '["' + e + '"]'
        },
        unsetGlobal: function (e) {
          delete r[e]
        },
        copyAttributes: function (e, t) {
          for (var o = t.attributes, r = o.length; r--;) {
            var a = o[r]
            a.nodeName == 'style' || a.nodeName == 'class' || i.ie && !a.specified || e.setAttribute(a.nodeName, a.nodeValue)
          }
          t.className && n.addClass(e, t.className), t.style.cssText && (e.style.cssText += ';' + t.style.cssText)
        },
        removeStyle: function (e, t) {
          if (e.style.removeProperty) e.style.removeProperty(t)
          else {
            if (!e.style.removeAttribute) throw ''
            e.style.removeAttribute(t)
          }
        },
        contains: function (e, t) {
          return e && t && (e === t ? !1 : e.contains ? e.contains(t) : 16 & e.compareDocumentPosition(t))
        },
        startDrag: function (e, t, i) {
          function n (e) {
            var i = e.clientX - a,
              n = e.clientY - s
            t.ondragmove(i, n, e), e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
          }

          function o (e) {
            i.removeEventListener('mousemove', n, !0), i.removeEventListener('mouseup', o, !0), window.removeEventListener('mouseup', o, !0), t.ondragstop()
          }

          function r () {
            l.releaseCapture(), l.detachEvent('onmousemove', n), l.detachEvent('onmouseup', r), l.detachEvent('onlosecaptrue', r), t.ondragstop()
          }
          var i = i || document,
            a = e.clientX,
            s = e.clientY
          if (i.addEventListener) i.addEventListener('mousemove', n, !0), i.addEventListener('mouseup', o, !0), window.addEventListener('mouseup', o, !0), e.preventDefault()
          else {
            var l = e.srcElement
            l.setCapture(), l.attachEvent('onmousemove', n), l.attachEvent('onmouseup', r), l.attachEvent('onlosecaptrue', r), e.returnValue = !1
          }
          t.ondragstart()
        },
        getFixedLayer: function () {
          var n = document.getElementById('edui_fixedlayer')
          return n == null && (n = document.createElement('div'), n.id = 'edui_fixedlayer', document.body.appendChild(n), i.ie && i.version <= 8 ? (n.style.position = 'absolute', t(), setTimeout(e)) : n.style.position = 'fixed', n.style.left = '0', n.style.top = '0', n.style.width = '0', n.style.height = '0'), n
        },
        makeUnselectable: function (e) {
          if (i.opera || i.ie && i.version < 9) {
            if (e.unselectable = 'on', e.hasChildNodes()) { for (var t = 0; t < e.childNodes.length; t++) e.childNodes[t].nodeType == 1 && l.makeUnselectable(e.childNodes[t]) }
          } else void 0 !== e.style.MozUserSelect ? e.style.MozUserSelect = 'none' : void 0 !== e.style.WebkitUserSelect ? e.style.WebkitUserSelect = 'none' : void 0 !== e.style.KhtmlUserSelect && (e.style.KhtmlUserSelect = 'none')
        }
      }
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.uiUtils,
      i = baidu.editor.EventBase,
      n = baidu.editor.ui.UIBase = function () {}
    n.prototype = {
      className: '',
      uiName: '',
      initOptions: function (e) {
        var i = this
        for (var n in e) i[n] = e[n]
        this.id = this.id || 'edui' + t.uid()
      },
      initUIBase: function () {
        this._globalKey = e.unhtml(t.setGlobal(this.id, this))
      },
      render: function (e) {
        for (var i, n = this.renderHtml(), o = t.createElementByHtml(n), r = domUtils.getElementsByTagName(o, '*'), a = 'edui-' + (this.theme || this.editor.options.theme), s = document.getElementById('edui_fixedlayer'), l = 0; i = r[l++];) domUtils.addClass(i, a)
        domUtils.addClass(o, a), s && (s.className = '', domUtils.addClass(s, a))
        var d = this.getDom()
        d != null ? (d.parentNode.replaceChild(o, d), t.copyAttributes(o, d)) : (typeof e === 'string' && (e = document.getElementById(e)), e = e || t.getFixedLayer(), domUtils.addClass(e, a), e.appendChild(o)), this.postRender()
      },
      getDom: function (e) {
        return e ? document.getElementById(this.id + '_' + e) : document.getElementById(this.id)
      },
      postRender: function () {
        this.fireEvent('postrender')
      },
      getHtmlTpl: function () {
        return ''
      },
      formatHtml: function (e) {
        var t = 'edui-' + this.uiName
        return e.replace(/##/g, this.id).replace(/%%-/g, this.uiName ? t + '-' : '').replace(/%%/g, (this.uiName ? t : '') + ' ' + this.className).replace(/\$\$/g, this._globalKey)
      },
      renderHtml: function () {
        return this.formatHtml(this.getHtmlTpl())
      },
      dispose: function () {
        var e = this.getDom()
        e && baidu.editor.dom.domUtils.remove(e), t.unsetGlobal(this.id)
      }
    }, e.inherits(n, i)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.UIBase,
      i = baidu.editor.ui.Separator = function (e) {
        this.initOptions(e), this.initSeparator()
      }
    i.prototype = {
      uiName: 'separator',
      initSeparator: function () {
        this.initUIBase()
      },
      getHtmlTpl: function () {
        return '<div id="##" class="edui-box %%"></div>'
      }
    }, e.inherits(i, t)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.dom.domUtils,
      i = baidu.editor.ui.UIBase,
      n = baidu.editor.ui.uiUtils,
      o = baidu.editor.ui.Mask = function (e) {
        this.initOptions(e), this.initUIBase()
      }
    o.prototype = {
      getHtmlTpl: function () {
        return '<div id="##" class="edui-mask %%" onclick="return $$._onClick(event, this);" onmousedown="return $$._onMouseDown(event, this);"></div>'
      },
      postRender: function () {
        var e = this
        t.on(window, 'resize', function () {
          setTimeout(function () {
            e.isHidden() || e._fill()
          })
        })
      },
      show: function (e) {
        this._fill(), this.getDom().style.display = '', this.getDom().style.zIndex = e
      },
      hide: function () {
        this.getDom().style.display = 'none', this.getDom().style.zIndex = ''
      },
      isHidden: function () {
        return this.getDom().style.display == 'none'
      },
      _onMouseDown: function () {
        return !1
      },
      _onClick: function (e, t) {
        this.fireEvent('click', e, t)
      },
      _fill: function () {
        var e = this.getDom(),
          t = n.getViewportRect()
        e.style.width = t.width + 'px', e.style.height = t.height + 'px'
      }
    }, e.inherits(o, i)
  }()),
  (function () {
    function e (e, t) {
      for (var i = 0; i < a.length; i++) {
        var n = a[i]
        if (!n.isHidden() && n.queryAutoHide(t) !== !1) {
          if (e && /scroll/gi.test(e.type) && n.className == 'edui-wordpastepop') return
          n.hide()
        }
      }
      a.length && n.editor.fireEvent('afterhidepop')
    }
    var t = baidu.editor.utils,
      i = baidu.editor.ui.uiUtils,
      n = baidu.editor.dom.domUtils,
      o = baidu.editor.ui.UIBase,
      r = baidu.editor.ui.Popup = function (e) {
        this.initOptions(e), this.initPopup()
      },
      a = []
    r.postHide = e
    var s = ['edui-anchor-topleft', 'edui-anchor-topright', 'edui-anchor-bottomleft', 'edui-anchor-bottomright']
    r.prototype = {
      SHADOW_RADIUS: 5,
      content: null,
      _hidden: !1,
      autoRender: !0,
      canSideLeft: !0,
      canSideUp: !0,
      initPopup: function () {
        this.initUIBase(), a.push(this)
      },
      getHtmlTpl: function () {
        return '<div id="##" class="edui-popup %%" onmousedown="return false;"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">' + this.getContentHtmlTpl() + '  </div> </div></div>'
      },
      getContentHtmlTpl: function () {
        return this.content ? typeof this.content === 'string' ? this.content : this.content.renderHtml() : ''
      },
      _UIBase_postRender: o.prototype.postRender,
      postRender: function () {
        if (this.content instanceof o && this.content.postRender(), this.captureWheel && !this.captured) {
          this.captured = !0
          var e = (document.documentElement.clientHeight || document.body.clientHeight) - 80,
            t = this.getDom().offsetHeight,
            r = i.getClientRect(this.combox.getDom()).top,
            a = this.getDom('content'),
            s = this.getDom('body').getElementsByTagName('iframe'),
            l = this
          for (s.length && (s = s[0]); r + t > e;) t -= 30
          a.style.height = t + 'px', s && (s.style.height = t + 'px'), window.XMLHttpRequest ? n.on(a, 'onmousewheel' in document.body ? 'mousewheel' : 'DOMMouseScroll', function (e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1, e.wheelDelta ? a.scrollTop -= e.wheelDelta / 120 * 60 : a.scrollTop -= e.detail / -3 * 60
          }) : n.on(this.getDom(), 'mousewheel', function (e) {
            e.returnValue = !1, l.getDom('content').scrollTop -= e.wheelDelta / 120 * 60
          })
        }
        this.fireEvent('postRenderAfter'), this.hide(!0), this._UIBase_postRender()
      },
      _doAutoRender: function () {
        !this.getDom() && this.autoRender && this.render()
      },
      mesureSize: function () {
        var e = this.getDom('content')
        return i.getClientRect(e)
      },
      fitSize: function () {
        if (this.captureWheel && this.sized) return this.__size
        this.sized = !0
        var e = this.getDom('body')
        e.style.width = '', e.style.height = ''
        var t = this.mesureSize()
        if (this.captureWheel) {
          e.style.width = -(-20 - t.width) + 'px'
          var i = parseInt(this.getDom('content').style.height, 10)
          !window.isNaN(i) && (t.height = i)
        } else e.style.width = t.width + 'px'
        return e.style.height = t.height + 'px', this.__size = t, this.captureWheel && (this.getDom('content').style.overflow = 'auto'), t
      },
      showAnchor: function (e, t) {
        this.showAnchorRect(i.getClientRect(e), t)
      },
      showAnchorRect: function (e, t, o) {
        this._doAutoRender()
        var r = i.getViewportRect()
        this.getDom().style.visibility = 'hidden', this._show()
        var a, l, d, c, u = this.fitSize()
        t ? (a = this.canSideLeft && e.right + u.width > r.right && e.left > u.width, l = this.canSideUp && e.top + u.height > r.bottom && e.bottom > u.height, d = a ? e.left - u.width : e.right, c = l ? e.bottom - u.height : e.top) : (a = this.canSideLeft && e.right + u.width > r.right && e.left > u.width, l = this.canSideUp && e.top + u.height > r.bottom && e.bottom > u.height, d = a ? e.right - u.width : e.left, c = l ? e.top - u.height : e.bottom)
        var m = this.getDom()
        i.setViewportOffset(m, {
          left: d,
          top: c
        }), n.removeClasses(m, s), m.className += ' ' + s[2 * (l ? 1 : 0) + (a ? 1 : 0)], this.editor && (m.style.zIndex = 1 * this.editor.container.style.zIndex + 10, baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = m.style.zIndex - 1), this.getDom().style.visibility = 'visible'
      },
      showAt: function (e) {
        var t = e.left,
          i = e.top,
          n = {
            left: t,
            top: i,
            right: t,
            bottom: i,
            height: 0,
            width: 0
          }
        this.showAnchorRect(n, !1, !0)
      },
      _show: function () {
        if (this._hidden) {
          var e = this.getDom()
          e.style.display = '', this._hidden = !1, this.fireEvent('show')
        }
      },
      isHidden: function () {
        return this._hidden
      },
      show: function () {
        this._doAutoRender(), this._show()
      },
      hide: function (e) {
        !this._hidden && this.getDom() && (this.getDom().style.display = 'none', this._hidden = !0, e || this.fireEvent('hide'))
      },
      queryAutoHide: function (e) {
        return !e || !i.contains(this.getDom(), e)
      }
    }, t.inherits(r, o), n.on(document, 'mousedown', function (t) {
      var i = t.target || t.srcElement
      e(t, i)
    }), n.on(window, 'scroll', function (t, i) {
      e(t, i)
    })
  }()),
  (function () {
    function e (e, t) {
      for (var i = '<div id="##" class="edui-colorpicker %%"><div class="edui-colorpicker-topbar edui-clearfix"><div unselectable="on" id="##_preview" class="edui-colorpicker-preview"></div><div unselectable="on" class="edui-colorpicker-nocolor" onclick="$$._onPickNoColor(event, this);">' + e + '</div></div><table  class="edui-box" style="border-collapse: collapse;" onmouseover="$$._onTableOver(event, this);" onmouseout="$$._onTableOut(event, this);" onclick="return $$._onTableClick(event, this);" cellspacing="0" cellpadding="0"><tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;padding-top: 2px"><td colspan="10">' + t.getLang('themeColor') + '</td> </tr><tr class="edui-colorpicker-tablefirstrow" >', n = 0; n < o.length; n++) n && n % 10 === 0 && (i += '</tr>' + (n == 60 ? '<tr style="border-bottom: 1px solid #ddd;font-size: 13px;line-height: 25px;color:#39C;"><td colspan="10">' + t.getLang('standardColor') + '</td></tr>' : '') + '<tr' + (n == 60 ? ' class="edui-colorpicker-tablefirstrow"' : '') + '>'), i += n < 70 ? '<td style="padding: 0 2px;"><a hidefocus title="' + o[n] + '" onclick="return false;" href="javascript:" unselectable="on" class="edui-box edui-colorpicker-colorcell" data-color="#' + o[n] + '" style="background-color:#' + o[n] + ';border:solid #ccc;' + (n < 10 || n >= 60 ? 'border-width:1px;' : n >= 10 && n < 20 ? 'border-width:1px 1px 0 1px;' : 'border-width:0 1px 0 1px;') + '"></a></td>' : ''
      return i += '</tr></table></div>'
    }
    var t = baidu.editor.utils,
      i = baidu.editor.ui.UIBase,
      n = baidu.editor.ui.ColorPicker = function (e) {
        this.initOptions(e), this.noColorText = this.noColorText || this.editor.getLang('clearColor'), this.initUIBase()
      }
    n.prototype = {
      getHtmlTpl: function () {
        return e(this.noColorText, this.editor)
      },
      _onTableClick: function (e) {
        var t = e.target || e.srcElement,
          i = t.getAttribute('data-color')
        i && this.fireEvent('pickcolor', i)
      },
      _onTableOver: function (e) {
        var t = e.target || e.srcElement,
          i = t.getAttribute('data-color')
        i && (this.getDom('preview').style.backgroundColor = i)
      },
      _onTableOut: function () {
        this.getDom('preview').style.backgroundColor = ''
      },
      _onPickNoColor: function () {
        this.fireEvent('picknocolor')
      }
    }, t.inherits(n, i)
    var o = 'ffffff,000000,eeece1,1f497d,4f81bd,c0504d,9bbb59,8064a2,4bacc6,f79646,f2f2f2,7f7f7f,ddd9c3,c6d9f0,dbe5f1,f2dcdb,ebf1dd,e5e0ec,dbeef3,fdeada,d8d8d8,595959,c4bd97,8db3e2,b8cce4,e5b9b7,d7e3bc,ccc1d9,b7dde8,fbd5b5,bfbfbf,3f3f3f,938953,548dd4,95b3d7,d99694,c3d69b,b2a2c7,92cddc,fac08f,a5a5a5,262626,494429,17365d,366092,953734,76923c,5f497a,31859b,e36c09,7f7f7f,0c0c0c,1d1b10,0f243e,244061,632423,4f6128,3f3151,205867,974806,c00000,ff0000,ffc000,ffff00,92d050,00b050,00b0f0,0070c0,002060,7030a0,'.split(',')
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.uiUtils,
      i = baidu.editor.ui.UIBase,
      n = baidu.editor.ui.TablePicker = function (e) {
        this.initOptions(e), this.initTablePicker()
      }
    n.prototype = {
      defaultNumRows: 10,
      defaultNumCols: 10,
      maxNumRows: 20,
      maxNumCols: 20,
      numRows: 10,
      numCols: 10,
      lengthOfCellSide: 22,
      initTablePicker: function () {
        this.initUIBase()
      },
      getHtmlTpl: function () {
        return '<div id="##" class="edui-tablepicker %%"><div class="edui-tablepicker-body"><div class="edui-infoarea"><span id="##_label" class="edui-label"></span></div><div class="edui-pickarea" onmousemove="$$._onMouseMove(event, this);" onmouseover="$$._onMouseOver(event, this);" onmouseout="$$._onMouseOut(event, this);" onclick="$$._onClick(event, this);"><div id="##_overlay" class="edui-overlay"></div></div></div></div>'
      },
      _UIBase_render: i.prototype.render,
      render: function (e) {
        this._UIBase_render(e), this.getDom('label').innerHTML = '0' + this.editor.getLang('t_row') + ' x 0' + this.editor.getLang('t_col')
      },
      _track: function (e, t) {
        var i = this.getDom('overlay').style,
          n = this.lengthOfCellSide
        i.width = e * n + 'px', i.height = t * n + 'px'
        var o = this.getDom('label')
        o.innerHTML = e + this.editor.getLang('t_col') + ' x ' + t + this.editor.getLang('t_row'), this.numCols = e, this.numRows = t
      },
      _onMouseOver: function (e, i) {
        var n = e.relatedTarget || e.fromElement
        t.contains(i, n) || i === n || (this.getDom('label').innerHTML = '0' + this.editor.getLang('t_col') + ' x 0' + this.editor.getLang('t_row'), this.getDom('overlay').style.visibility = '')
      },
      _onMouseOut: function (e, i) {
        var n = e.relatedTarget || e.toElement
        t.contains(i, n) || i === n || (this.getDom('label').innerHTML = '0' + this.editor.getLang('t_col') + ' x 0' + this.editor.getLang('t_row'), this.getDom('overlay').style.visibility = 'hidden')
      },
      _onMouseMove: function (e, i) {
        var n = (this.getDom('overlay').style, t.getEventOffset(e)),
          o = this.lengthOfCellSide,
          r = Math.ceil(n.left / o),
          a = Math.ceil(n.top / o)
        this._track(r, a)
      },
      _onClick: function () {
        this.fireEvent('picktable', this.numCols, this.numRows)
      }
    }, e.inherits(n, i)
  }()),
  (function () {
    var e = baidu.editor.browser,
      t = baidu.editor.dom.domUtils,
      i = baidu.editor.ui.uiUtils,
      n = 'onmousedown="$$.Stateful_onMouseDown(event, this);" onmouseup="$$.Stateful_onMouseUp(event, this);"' + (e.ie ? ' onmouseenter="$$.Stateful_onMouseEnter(event, this);" onmouseleave="$$.Stateful_onMouseLeave(event, this);"' : ' onmouseover="$$.Stateful_onMouseOver(event, this);" onmouseout="$$.Stateful_onMouseOut(event, this);"')
    baidu.editor.ui.Stateful = {
      alwalysHoverable: !1,
      target: null,
      Stateful_init: function () {
        this._Stateful_dGetHtmlTpl = this.getHtmlTpl, this.getHtmlTpl = this.Stateful_getHtmlTpl
      },
      Stateful_getHtmlTpl: function () {
        var e = this._Stateful_dGetHtmlTpl()
        return e.replace(/stateful/g, function () {
          return n
        })
      },
      Stateful_onMouseEnter: function (e, t) {
        this.target = t, this.isDisabled() && !this.alwalysHoverable || (this.addState('hover'), this.fireEvent('over'))
      },
      Stateful_onMouseLeave: function (e, t) {
        this.isDisabled() && !this.alwalysHoverable || (this.removeState('hover'), this.removeState('active'), this.fireEvent('out'))
      },
      Stateful_onMouseOver: function (e, t) {
        var n = e.relatedTarget
        i.contains(t, n) || t === n || this.Stateful_onMouseEnter(e, t)
      },
      Stateful_onMouseOut: function (e, t) {
        var n = e.relatedTarget
        i.contains(t, n) || t === n || this.Stateful_onMouseLeave(e, t)
      },
      Stateful_onMouseDown: function (e, t) {
        this.isDisabled() || this.addState('active')
      },
      Stateful_onMouseUp: function (e, t) {
        this.isDisabled() || this.removeState('active')
      },
      Stateful_postRender: function () {
        this.disabled && !this.hasState('disabled') && this.addState('disabled')
      },
      hasState: function (e) {
        return t.hasClass(this.getStateDom(), 'edui-state-' + e)
      },
      addState: function (e) {
        this.hasState(e) || (this.getStateDom().className += ' edui-state-' + e)
      },
      removeState: function (e) {
        this.hasState(e) && t.removeClasses(this.getStateDom(), ['edui-state-' + e])
      },
      getStateDom: function () {
        return this.getDom('state')
      },
      isChecked: function () {
        return this.hasState('checked')
      },
      setChecked: function (e) {
        !this.isDisabled() && e ? this.addState('checked') : this.removeState('checked')
      },
      isDisabled: function () {
        return this.hasState('disabled')
      },
      setDisabled: function (e) {
        e ? (this.removeState('hover'), this.removeState('checked'), this.removeState('active'), this.addState('disabled')) : this.removeState('disabled')
      }
    }
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.UIBase,
      i = baidu.editor.ui.Stateful,
      n = baidu.editor.ui.Button = function (e) {
        if (e.name) {
          var t = e.name,
            i = e.cssRules
          e.className || (e.className = 'edui-for-' + t), e.cssRules = '.edui-default  .edui-for-' + t + ' .edui-icon {' + i + '}'
        }
        this.initOptions(e), this.initButton()
      }
    n.prototype = {
      uiName: 'button',
      label: '',
      title: '',
      showIcon: !0,
      showText: !0,
      cssRules: '',
      initButton: function () {
        this.initUIBase(), this.Stateful_init(), this.cssRules && e.cssRule('edui-customize-' + this.name + '-style', this.cssRules)
      },
      getHtmlTpl: function () {
        return '<div id="##" class="edui-box %%"><div id="##_state" stateful><div class="%%-wrap"><div id="##_body" unselectable="on" ' + (this.title ? 'title="' + this.title + '"' : '') + ' class="%%-body" onmousedown="return $$._onMouseDown(event, this);" onclick="return $$._onClick(event, this);">' + (this.showIcon ? '<div class="edui-box edui-icon"></div>' : '') + (this.showText ? '<div class="edui-box edui-label">' + this.label + '</div>' : '') + '</div></div></div></div>'
      },
      postRender: function () {
        this.Stateful_postRender(), this.setDisabled(this.disabled)
      },
      _onMouseDown: function (e) {
        var t = e.target || e.srcElement,
          i = t && t.tagName && t.tagName.toLowerCase()
        return i == 'input' || i == 'object' || i == 'object' ? !1 : void 0
      },
      _onClick: function () {
        this.isDisabled() || this.fireEvent('click')
      },
      setTitle: function (e) {
        var t = this.getDom('label')
        t.innerHTML = e
      }
    }, e.inherits(n, t), e.extend(n.prototype, i)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.uiUtils,
      i = (baidu.editor.dom.domUtils, baidu.editor.ui.UIBase),
      n = baidu.editor.ui.Stateful,
      o = baidu.editor.ui.SplitButton = function (e) {
        this.initOptions(e), this.initSplitButton()
      }
    o.prototype = {
      popup: null,
      uiName: 'splitbutton',
      title: '',
      initSplitButton: function () {
        this.initUIBase(), this.Stateful_init()
        if (this.popup != null) {
          var e = this.popup
          this.popup = null, this.setPopup(e)
        }
      },
      _UIBase_postRender: i.prototype.postRender,
      postRender: function () {
        this.Stateful_postRender(), this._UIBase_postRender()
      },
      setPopup: function (i) {
        this.popup !== i && (this.popup != null && this.popup.dispose(), i.addListener('show', e.bind(this._onPopupShow, this)), i.addListener('hide', e.bind(this._onPopupHide, this)), i.addListener('postrender', e.bind(function () {
          i.getDom('body').appendChild(t.createElementByHtml('<div id="' + this.popup.id + '_bordereraser" class="edui-bordereraser edui-background" style="width:' + (t.getClientRect(this.getDom()).width + 20) + 'px"></div>')), i.getDom().className += ' ' + this.className
        }, this)), this.popup = i)
      },
      _onPopupShow: function () {
        this.addState('opened')
      },
      _onPopupHide: function () {
        this.removeState('opened')
      },
      getHtmlTpl: function () {
        return '<div id="##" class="edui-box %%"><div ' + (this.title ? 'title="' + this.title + '"' : '') + ' id="##_state" stateful><div class="%%-body"><div id="##_button_body" class="edui-box edui-button-body" onclick="$$._onButtonClick(event, this);"><div class="edui-box edui-icon"></div></div><div class="edui-box edui-splitborder"></div><div class="edui-box edui-arrow" onclick="$$._onArrowClick();"></div></div></div></div>'
      },
      showPopup: function () {
        var e = t.getClientRect(this.getDom())
        e.top -= this.popup.SHADOW_RADIUS, e.height += this.popup.SHADOW_RADIUS, this.popup.showAnchorRect(e)
      },
      _onArrowClick: function (e, t) {
        this.isDisabled() || this.showPopup()
      },
      _onButtonClick: function () {
        this.isDisabled() || this.fireEvent('buttonclick')
      }
    }, e.inherits(o, i), e.extend(o.prototype, n, !0)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.uiUtils,
      i = baidu.editor.ui.ColorPicker,
      n = baidu.editor.ui.Popup,
      o = baidu.editor.ui.SplitButton,
      r = baidu.editor.ui.ColorButton = function (e) {
        this.initOptions(e), this.initColorButton()
      }
    r.prototype = {
      initColorButton: function () {
        var e = this
        this.popup = new n({
          content: new i({
            noColorText: e.editor.getLang('clearColor'),
            editor: e.editor,
            onpickcolor: function (t, i) {
              e._onPickColor(i)
            },
            onpicknocolor: function (t, i) {
              e._onPickNoColor(i)
            }
          }),
          editor: e.editor
        }), this.initSplitButton()
      },
      _SplitButton_postRender: o.prototype.postRender,
      postRender: function () {
        this._SplitButton_postRender(),
        this.getDom('button_body').appendChild(t.createElementByHtml('<div id="' + this.id + '_colorlump" class="edui-colorlump"></div>')), this.getDom().className += ' edui-colorbutton'
      },
      setColor: function (e) {
        this.getDom('colorlump').style.backgroundColor = e, this.color = e
      },
      _onPickColor: function (e) {
        this.fireEvent('pickcolor', e) !== !1 && (this.setColor(e), this.popup.hide())
      },
      _onPickNoColor: function (e) {
        this.fireEvent('picknocolor') !== !1 && this.popup.hide()
      }
    }, e.inherits(r, o)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.Popup,
      i = baidu.editor.ui.TablePicker,
      n = baidu.editor.ui.SplitButton,
      o = baidu.editor.ui.TableButton = function (e) {
        this.initOptions(e), this.initTableButton()
      }
    o.prototype = {
      initTableButton: function () {
        var e = this
        this.popup = new t({
          content: new i({
            editor: e.editor,
            onpicktable: function (t, i, n) {
              e._onPickTable(i, n)
            }
          }),
          editor: e.editor
        }), this.initSplitButton()
      },
      _onPickTable: function (e, t) {
        this.fireEvent('picktable', e, t) !== !1 && this.popup.hide()
      }
    }, e.inherits(o, n)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.UIBase,
      i = baidu.editor.ui.AutoTypeSetPicker = function (e) {
        this.initOptions(e), this.initAutoTypeSetPicker()
      }
    i.prototype = {
      initAutoTypeSetPicker: function () {
        this.initUIBase()
      },
      getHtmlTpl: function () {
        var e = this.editor,
          t = e.options.autotypeset,
          i = e.getLang('autoTypeSet'),
          n = 'textAlignValue' + e.uid,
          o = 'imageBlockLineValue' + e.uid,
          r = 'symbolConverValue' + e.uid
        return '<div id="##" class="edui-autotypesetpicker %%"><div class="edui-autotypesetpicker-body"><table ><tr><td nowrap><input type="checkbox" name="mergeEmptyline" ' + (t.mergeEmptyline ? 'checked' : '') + '>' + i.mergeLine + '</td><td colspan="2"><input type="checkbox" name="removeEmptyline" ' + (t.removeEmptyline ? 'checked' : '') + '>' + i.delLine + '</td></tr><tr><td nowrap><input type="checkbox" name="removeClass" ' + (t.removeClass ? 'checked' : '') + '>' + i.removeFormat + '</td><td colspan="2"><input type="checkbox" name="indent" ' + (t.indent ? 'checked' : '') + '>' + i.indent + '</td></tr><tr><td nowrap><input type="checkbox" name="textAlign" ' + (t.textAlign ? 'checked' : '') + '>' + i.alignment + '</td><td colspan="2" id="' + n + '"><input type="radio" name="' + n + '" value="left" ' + (t.textAlign && t.textAlign == 'left' ? 'checked' : '') + '>' + e.getLang('justifyleft') + '<input type="radio" name="' + n + '" value="center" ' + (t.textAlign && t.textAlign == 'center' ? 'checked' : '') + '>' + e.getLang('justifycenter') + '<input type="radio" name="' + n + '" value="right" ' + (t.textAlign && t.textAlign == 'right' ? 'checked' : '') + '>' + e.getLang('justifyright') + '</td></tr><tr><td nowrap><input type="checkbox" name="imageBlockLine" ' + (t.imageBlockLine ? 'checked' : '') + '>' + i.imageFloat + '</td><td nowrap id="' + o + '"><input type="radio" name="' + o + '" value="none" ' + (t.imageBlockLine && t.imageBlockLine == 'none' ? 'checked' : '') + '>' + e.getLang('default') + '<input type="radio" name="' + o + '" value="left" ' + (t.imageBlockLine && t.imageBlockLine == 'left' ? 'checked' : '') + '>' + e.getLang('justifyleft') + '<input type="radio" name="' + o + '" value="center" ' + (t.imageBlockLine && t.imageBlockLine == 'center' ? 'checked' : '') + '>' + e.getLang('justifycenter') + '<input type="radio" name="' + o + '" value="right" ' + (t.imageBlockLine && t.imageBlockLine == 'right' ? 'checked' : '') + '>' + e.getLang('justifyright') + '</td></tr><tr><td nowrap><input type="checkbox" name="clearFontSize" ' + (t.clearFontSize ? 'checked' : '') + '>' + i.removeFontsize + '</td><td colspan="2"><input type="checkbox" name="clearFontFamily" ' + (t.clearFontFamily ? 'checked' : '') + '>' + i.removeFontFamily + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="removeEmptyNode" ' + (t.removeEmptyNode ? 'checked' : '') + '>' + i.removeHtml + '</td></tr><tr><td nowrap colspan="3"><input type="checkbox" name="pasteFilter" ' + (t.pasteFilter ? 'checked' : '') + '>' + i.pasteFilter + '</td></tr><tr><td nowrap><input type="checkbox" name="symbolConver" ' + (t.bdc2sb || t.tobdc ? 'checked' : '') + '>' + i.symbol + '</td><td id="' + r + '"><input type="radio" name="bdc" value="bdc2sb" ' + (t.bdc2sb ? 'checked' : '') + '>' + i.bdc2sb + '<input type="radio" name="bdc" value="tobdc" ' + (t.tobdc ? 'checked' : '') + '>' + i.tobdc + '</td><td nowrap align="right"><button >' + i.run + '</button></td></tr></table></div></div>'
      },
      _UIBase_render: t.prototype.render
    }, e.inherits(i, t)
  }()),
  (function () {
    function e (e) {
      for (var i, n = {}, o = e.getDom(), r = e.editor.uid, a = null, s = null, l = domUtils.getElementsByTagName(o, 'input'), d = l.length - 1; i = l[d--];) {
        if (a = i.getAttribute('type'), a == 'checkbox') {
          if (s = i.getAttribute('name'), n[s] && delete n[s], i.checked) {
            var c = document.getElementById(s + 'Value' + r)
            if (c) {
              if (/input/gi.test(c.tagName)) n[s] = c.value
              else {
                for (var u, m = c.getElementsByTagName('input'), f = m.length - 1; u = m[f--];)
                  {if (u.checked) {
                    n[s] = u.value
                    break
                  }} 
              }
            } else n[s] = !0
          } else n[s] = !1
        } else n[i.getAttribute('value')] = i.checked
      }
      for (var h, p = domUtils.getElementsByTagName(o, 'select'), d = 0; h = p[d++];) {
        var g = h.getAttribute('name')
        n[g] = n[g] ? h.value : ''
      }
      t.extend(e.editor.options.autotypeset, n), e.editor.setPreferences('autotypeset', n)
    }
    var t = baidu.editor.utils,
      i = baidu.editor.ui.Popup,
      n = baidu.editor.ui.AutoTypeSetPicker,
      o = baidu.editor.ui.SplitButton,
      r = baidu.editor.ui.AutoTypeSetButton = function (e) {
        this.initOptions(e), this.initAutoTypeSetButton()
      }
    r.prototype = {
      initAutoTypeSetButton: function () {
        var t = this
        this.popup = new i({
          content: new n({
            editor: t.editor
          }),
          editor: t.editor,
          hide: function () {
            !this._hidden && this.getDom() && (e(this), this.getDom().style.display = 'none', this._hidden = !0, this.fireEvent('hide'))
          }
        })
        var o = 0
        this.popup.addListener('postRenderAfter', function () {
          var i = this
          if (!o) {
            var n = this.getDom(),
              r = n.getElementsByTagName('button')[0]
            r.onclick = function () {
              e(i), t.editor.execCommand('autotypeset'), i.hide()
            }, domUtils.on(n, 'click', function (n) {
              var o = n.target || n.srcElement,
                r = t.editor.uid
              if (o && o.tagName == 'INPUT') {
                if (o.name == 'imageBlockLine' || o.name == 'textAlign' || o.name == 'symbolConver') {
                  for (var a = o.checked, s = document.getElementById(o.name + 'Value' + r), l = s.getElementsByTagName('input'), d = {
                      imageBlockLine: 'none',
                      textAlign: 'left',
                      symbolConver: 'tobdc'
                    }, c = 0; c < l.length; c++) a ? l[c].value == d[o.name] && (l[c].checked = 'checked') : l[c].checked = !1
                }
                if (o.name == 'imageBlockLineValue' + r || o.name == 'textAlignValue' + r || o.name == 'bdc') {
                  var u = o.parentNode.previousSibling.getElementsByTagName('input')
                  u && (u[0].checked = !0)
                }
                e(i)
              }
            }), o = 1
          }
        }), this.initSplitButton()
      }
    }, t.inherits(r, o)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.Popup,
      i = baidu.editor.ui.Stateful,
      n = baidu.editor.ui.UIBase,
      o = baidu.editor.ui.CellAlignPicker = function (e) {
        this.initOptions(e), this.initSelected(), this.initCellAlignPicker()
      }
    o.prototype = {
      initSelected: function () {
        var e = {
          valign: {
            top: 0,
            middle: 1,
            bottom: 2
          },
          align: {
            left: 0,
            center: 1,
            right: 2
          },
          count: 3
        }
        this.selected && (this.selectedIndex = e.valign[this.selected.valign] * e.count + e.align[this.selected.align])
      },
      initCellAlignPicker: function () {
        this.initUIBase(), this.Stateful_init()
      },
      getHtmlTpl: function () {
        for (var e = ['left', 'center', 'right'], t = 9, i = null, n = -1, o = [], r = 0; t > r; r++) i = this.selectedIndex === r ? ' class="edui-cellalign-selected" ' : '', n = r % 3, n === 0 && o.push('<tr>'), o.push('<td index="' + r + '" ' + i + ' stateful><div class="edui-icon edui-' + e[n] + '"></div></td>'), n === 2 && o.push('</tr>')
        return '<div id="##" class="edui-cellalignpicker %%"><div class="edui-cellalignpicker-body"><table onclick="$$._onClick(event);">' + o.join('') + '</table></div></div>'
      },
      getStateDom: function () {
        return this.target
      },
      _onClick: function (e) {
        var i = e.target || e.srcElement;
        /icon/.test(i.className) && (this.items[i.parentNode.getAttribute('index')].onclick(), t.postHide(e))
      },
      _UIBase_render: n.prototype.render
    }, e.inherits(o, n), e.extend(o.prototype, i, !0)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.Stateful,
      i = baidu.editor.ui.uiUtils,
      n = baidu.editor.ui.UIBase,
      o = baidu.editor.ui.PastePicker = function (e) {
        this.initOptions(e), this.initPastePicker()
      }
    o.prototype = {
      initPastePicker: function () {
        this.initUIBase(), this.Stateful_init()
      },
      getHtmlTpl: function () {
        return '<div class="edui-pasteicon" onclick="$$._onClick(this)"></div><div class="edui-pastecontainer"><div class="edui-title">' + this.editor.getLang('pasteOpt') + '</div><div class="edui-button"><div title="' + this.editor.getLang('pasteSourceFormat') + '" onclick="$$.format(false)" stateful><div class="edui-richtxticon"></div></div><div title="' + this.editor.getLang('tagFormat') + '" onclick="$$.format(2)" stateful><div class="edui-tagicon"></div></div><div title="' + this.editor.getLang('pasteTextFormat') + '" onclick="$$.format(true)" stateful><div class="edui-plaintxticon"></div></div></div></div></div>'
      },
      getStateDom: function () {
        return this.target
      },
      format: function (e) {
        this.editor.ui._isTransfer = !0, this.editor.fireEvent('pasteTransfer', e)
      },
      _onClick: function (e) {
        var t = domUtils.getNextDomNode(e),
          n = i.getViewportRect().height,
          o = i.getClientRect(t)
        o.top + o.height > n ? t.style.top = -o.height - e.offsetHeight + 'px' : t.style.top = '', /hidden/gi.test(domUtils.getComputedStyle(t, 'visibility')) ? (t.style.visibility = 'visible', domUtils.addClass(e, 'edui-state-opened')) : (t.style.visibility = 'hidden', domUtils.removeClasses(e, 'edui-state-opened'))
      },
      _UIBase_render: n.prototype.render
    }, e.inherits(o, n), e.extend(o.prototype, t, !0)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.uiUtils,
      i = baidu.editor.ui.UIBase,
      n = baidu.editor.ui.Toolbar = function (e) {
        this.initOptions(e), this.initToolbar()
      }
    n.prototype = {
      items: null,
      initToolbar: function () {
        this.items = this.items || [], this.initUIBase()
      },
      add: function (e, t) {
        void 0 === t ? this.items.push(e) : this.items.splice(t, 0, e)
      },
      getHtmlTpl: function () {
        for (var e = [], t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml()
        return '<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">' + e.join('') + '</div>'
      },
      postRender: function () {
        for (var e = this.getDom(), i = 0; i < this.items.length; i++) this.items[i].postRender()
        t.makeUnselectable(e)
      },
      _onMouseDown: function (e) {
        var t = e.target || e.srcElement,
          i = t && t.tagName && t.tagName.toLowerCase()
        return i == 'input' || i == 'object' || i == 'object' ? !1 : void 0
      }
    }, e.inherits(n, i)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.dom.domUtils,
      i = baidu.editor.ui.uiUtils,
      n = baidu.editor.ui.UIBase,
      o = baidu.editor.ui.Popup,
      r = baidu.editor.ui.Stateful,
      a = baidu.editor.ui.CellAlignPicker,
      s = baidu.editor.ui.Menu = function (e) {
        this.initOptions(e), this.initMenu()
      },
      l = {
        renderHtml: function () {
          return '<div class="edui-menuitem edui-menuseparator"><div class="edui-menuseparator-inner"></div></div>'
        },
        postRender: function () {},
        queryAutoHide: function () {
          return !0
        }
      }
    s.prototype = {
      items: null,
      uiName: 'menu',
      initMenu: function () {
        this.items = this.items || [], this.initPopup(), this.initItems()
      },
      initItems: function () {
        for (var e = 0; e < this.items.length; e++) {
          var t = this.items[e]
          t == '-' ? this.items[e] = this.getSeparator() : t instanceof d || (t.editor = this.editor, t.theme = this.editor.options.theme, this.items[e] = this.createItem(t))
        }
      },
      getSeparator: function () {
        return l
      },
      createItem: function (e) {
        return e.menu = this, new d(e)
      },
      _Popup_getContentHtmlTpl: o.prototype.getContentHtmlTpl,
      getContentHtmlTpl: function () {
        if (this.items.length == 0) return this._Popup_getContentHtmlTpl()
        for (var e = [], t = 0; t < this.items.length; t++) {
          var i = this.items[t]
          e[t] = i.renderHtml()
        }
        return '<div class="%%-body">' + e.join('') + '</div>'
      },
      _Popup_postRender: o.prototype.postRender,
      postRender: function () {
        for (var e = this, n = 0; n < this.items.length; n++) {
          var o = this.items[n]
          o.ownerMenu = this, o.postRender()
        }
        t.on(this.getDom(), 'mouseover', function (t) {
          t = t || event
          var n = t.relatedTarget || t.fromElement,
            o = e.getDom()
          i.contains(o, n) || o === n || e.fireEvent('over')
        }), this._Popup_postRender()
      },
      queryAutoHide: function (e) {
        if (e) {
          if (i.contains(this.getDom(), e)) return !1
          for (var t = 0; t < this.items.length; t++) {
            var n = this.items[t]
            if (n.queryAutoHide(e) === !1) return !1
          }
        }
      },
      clearItems: function () {
        for (var e = 0; e < this.items.length; e++) {
          var t = this.items[e]
          clearTimeout(t._showingTimer), clearTimeout(t._closingTimer), t.subMenu && t.subMenu.destroy()
        }
        this.items = []
      },
      destroy: function () {
        this.getDom() && t.remove(this.getDom()), this.clearItems()
      },
      dispose: function () {
        this.destroy()
      }
    }, e.inherits(s, o)
    var d = baidu.editor.ui.MenuItem = function (e) {
      if (this.initOptions(e), this.initUIBase(), this.Stateful_init(), this.subMenu && !(this.subMenu instanceof s)) {
        if (e.className && e.className.indexOf('aligntd') != -1) {
          var i = this
          this.subMenu.selected = this.editor.queryCommandValue('cellalignment'), this.subMenu = new o({
            content: new a(this.subMenu),
            parentMenu: i,
            editor: i.editor,
            destroy: function () {
              this.getDom() && t.remove(this.getDom())
            }
          }), this.subMenu.addListener('postRenderAfter', function () {
            t.on(this.getDom(), 'mouseover', function () {
              i.addState('opened')
            })
          })
        } else this.subMenu = new s(this.subMenu)
      }
    }
    d.prototype = {
      label: '',
      subMenu: null,
      ownerMenu: null,
      uiName: 'menuitem',
      alwalysHoverable: !0,
      getHtmlTpl: function () {
        return '<div id="##" class="%%" stateful onclick="$$._onClick(event, this);"><div class="%%-body">' + this.renderLabelHtml() + '</div></div>'
      },
      postRender: function () {
        var e = this
        this.addListener('over', function () {
          e.ownerMenu.fireEvent('submenuover', e), e.subMenu && e.delayShowSubMenu()
        }), this.subMenu && (this.getDom().className += ' edui-hassubmenu', this.subMenu.render(), this.addListener('out', function () {
          e.delayHideSubMenu()
        }), this.subMenu.addListener('over', function () {
          clearTimeout(e._closingTimer), e._closingTimer = null, e.addState('opened')
        }), this.ownerMenu.addListener('hide', function () {
          e.hideSubMenu()
        }), this.ownerMenu.addListener('submenuover', function (t, i) {
          i !== e && e.delayHideSubMenu()
        }), this.subMenu._bakQueryAutoHide = this.subMenu.queryAutoHide, this.subMenu.queryAutoHide = function (t) {
          return t && i.contains(e.getDom(), t) ? !1 : this._bakQueryAutoHide(t)
        }), this.getDom().style.tabIndex = '-1', i.makeUnselectable(this.getDom()), this.Stateful_postRender()
      },
      delayShowSubMenu: function () {
        var e = this
        e.isDisabled() || (e.addState('opened'), clearTimeout(e._showingTimer), clearTimeout(e._closingTimer), e._closingTimer = null, e._showingTimer = setTimeout(function () {
          e.showSubMenu()
        }, 250))
      },
      delayHideSubMenu: function () {
        var e = this
        e.isDisabled() || (e.removeState('opened'), clearTimeout(e._showingTimer), e._closingTimer || (e._closingTimer = setTimeout(function () {
          e.hasState('opened') || e.hideSubMenu(), e._closingTimer = null
        }, 400)))
      },
      renderLabelHtml: function () {
        return '<div class="edui-arrow"></div><div class="edui-box edui-icon"></div><div class="edui-box edui-label %%-label">' + (this.label || '') + '</div>'
      },
      getStateDom: function () {
        return this.getDom()
      },
      queryAutoHide: function (e) {
        return this.subMenu && this.hasState('opened') ? this.subMenu.queryAutoHide(e) : void 0
      },
      _onClick: function (e, t) {
        this.hasState('disabled') || this.fireEvent('click', e, t) !== !1 && (this.subMenu ? this.showSubMenu() : o.postHide(e))
      },
      showSubMenu: function () {
        var e = i.getClientRect(this.getDom())
        e.right -= 5, e.left += 2, e.width -= 7, e.top -= 4, e.bottom += 4, e.height += 8, this.subMenu.showAnchorRect(e, !0, !0)
      },
      hideSubMenu: function () {
        this.subMenu.hide()
      }
    }, e.inherits(d, n), e.extend(d.prototype, r, !0)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.uiUtils,
      i = baidu.editor.ui.Menu,
      n = baidu.editor.ui.SplitButton,
      o = baidu.editor.ui.Combox = function (e) {
        this.initOptions(e), this.initCombox()
      }
    o.prototype = {
      uiName: 'combox',
      onbuttonclick: function () {
        this.showPopup()
      },
      initCombox: function () {
        var e = this
        this.items = this.items || []
        for (var t = 0; t < this.items.length; t++) {
          var n = this.items[t]
          n.uiName = 'listitem', n.index = t, n.onclick = function () {
            e.selectByIndex(this.index)
          }
        }
        this.popup = new i({
          items: this.items,
          uiName: 'list',
          editor: this.editor,
          captureWheel: !0,
          combox: this
        }), this.initSplitButton()
      },
      _SplitButton_postRender: n.prototype.postRender,
      postRender: function () {
        this._SplitButton_postRender(), this.setLabel(this.label || ''), this.setValue(this.initValue || '')
      },
      showPopup: function () {
        var e = t.getClientRect(this.getDom())
        e.top += 1, e.bottom -= 1, e.height -= 2, this.popup.showAnchorRect(e)
      },
      getValue: function () {
        return this.value
      },
      setValue: function (e) {
        var t = this.indexByValue(e); t != -1 ? (this.selectedIndex = t, this.setLabel(this.items[t].label), this.value = this.items[t].value) : (this.selectedIndex = -1, this.setLabel(this.getLabelForUnknowValue(e)), this.value = e)
      },
      setLabel: function (e) {
        this.getDom('button_body').innerHTML = e, this.label = e
      },
      getLabelForUnknowValue: function (e) {
        return e
      },
      indexByValue: function (e) {
        for (var t = 0; t < this.items.length; t++) { if (e == this.items[t].value) return t }
        return -1
      },
      getItem: function (e) {
        return this.items[e]
      },
      selectByIndex: function (e) {
        e < this.items.length && this.fireEvent('select', e) !== !1 && (this.selectedIndex = e, this.value = this.items[e].value, this.setLabel(this.items[e].label))
      }
    }, e.inherits(o, n)
  }()),
  (function () {
    var e, t, i, n = baidu.editor.utils,
      o = baidu.editor.dom.domUtils,
      r = baidu.editor.ui.uiUtils,
      a = baidu.editor.ui.Mask,
      s = baidu.editor.ui.UIBase,
      l = baidu.editor.ui.Button,
      d = baidu.editor.ui.Dialog = function (e) {
        if (e.name) {
          var t = e.name,
            i = e.cssRules
          e.className || (e.className = 'edui-for-' + t), i && (e.cssRules = '.edui-default .edui-for-' + t + ' .edui-dialog-content  {' + i + '}')
        }
        this.initOptions(n.extend({
          autoReset: !0,
          draggable: !0,
          onok: function () {},
          oncancel: function () {},
          onclose: function (e, t) {
            return t ? this.onok() : this.oncancel()
          },
          holdScroll: !1
        }, e)), this.initDialog()
      }
    d.prototype = {
      draggable: !1,
      uiName: 'dialog',
      initDialog: function () {
        var o = this,
          r = this.editor.options.theme
        if (this.cssRules && n.cssRule('edui-customize-' + this.name + '-style', this.cssRules), this.initUIBase(), this.modalMask = e || (e = new a({
          className: 'edui-dialog-modalmask',
          theme: r,
          onclick: function () {
            i && i.close(!1)
          }
        })), this.dragMask = t || (t = new a({
          className: 'edui-dialog-dragmask',
          theme: r
        })), this.closeButton = new l({
          className: 'edui-dialog-closebutton',
          title: o.closeDialog,
          theme: r,
          onclick: function () {
            o.close(!1)
          }
        }), this.fullscreen && this.initResizeEvent(), this.buttons) {
          for (var s = 0; s < this.buttons.length; s++) {
            this.buttons[s] instanceof l || (this.buttons[s] = new l(n.extend(this.buttons[s], {
              editor: this.editor
            }, !0)))
          }
        }
      },
      initResizeEvent: function () {
        var e = this
        o.on(window, 'resize', function () {
          e._hidden || void 0 === e._hidden || (e.__resizeTimer && window.clearTimeout(e.__resizeTimer), e.__resizeTimer = window.setTimeout(function () {
            e.__resizeTimer = null
            var t = e.getDom(),
              i = e.getDom('content'),
              n = UE.ui.uiUtils.getClientRect(t),
              o = UE.ui.uiUtils.getClientRect(i),
              a = r.getViewportRect()
            i.style.width = a.width - n.width + o.width + 'px', i.style.height = a.height - n.height + o.height + 'px', t.style.width = a.width + 'px', t.style.height = a.height + 'px', e.fireEvent('resize')
          }, 100))
        })
      },
      fitSize: function () {
        var e = this.getDom('body'),
          t = this.mesureSize()
        return e.style.width = t.width + 'px', e.style.height = t.height + 'px', t
      },
      safeSetOffset: function (e) {
        var t = this,
          i = t.getDom(),
          n = r.getViewportRect(),
          o = r.getClientRect(i),
          a = e.left
        a + o.width > n.right && (a = n.right - o.width)
        var s = e.top
        s + o.height > n.bottom && (s = n.bottom - o.height), i.style.left = Math.max(a, 0) + 'px', i.style.top = Math.max(s, 0) + 'px'
      },
      showAtCenter: function () {
        var e = r.getViewportRect()
        if (this.fullscreen) {
          var t = this.getDom(),
            i = this.getDom('content')
          t.style.display = 'block'
          var n = UE.ui.uiUtils.getClientRect(t),
            a = UE.ui.uiUtils.getClientRect(i)
          t.style.left = '-100000px', i.style.width = e.width - n.width + a.width + 'px', i.style.height = e.height - n.height + a.height + 'px', t.style.width = e.width + 'px', t.style.height = e.height + 'px', t.style.left = 0, this._originalContext = {
            html: {
              overflowX: document.documentElement.style.overflowX,
              overflowY: document.documentElement.style.overflowY
            },
            body: {
              overflowX: document.body.style.overflowX,
              overflowY: document.body.style.overflowY
            }
          }, document.documentElement.style.overflowX = 'hidden', document.documentElement.style.overflowY = 'hidden', document.body.style.overflowX = 'hidden', document.body.style.overflowY = 'hidden'
        } else {
          this.getDom().style.display = ''
          var s = this.fitSize(),
            l = 0 | this.getDom('titlebar').offsetHeight,
            d = e.width / 2 - s.width / 2,
            c = e.height / 2 - (s.height - l) / 2 - l,
            u = this.getDom()
          this.safeSetOffset({
            left: Math.max(0 | d, 0),
            top: Math.max(0 | c, 0)
          }), o.hasClass(u, 'edui-state-centered') || (u.className += ' edui-state-centered')
        }
        this._show()
      },
      getContentHtml: function () {
        var e = ''
        return typeof this.content === 'string' ? e = this.content : this.iframeUrl && (e = '<span id="' + this.id + '_contmask" class="dialogcontmask"></span><iframe id="' + this.id + '_iframe" class="%%-iframe" height="100%" width="100%" frameborder="0" src="' + this.iframeUrl + '"></iframe>'), e
      },
      getHtmlTpl: function () {
        var e = ''
        if (this.buttons) {
          for (var t = [], i = 0; i < this.buttons.length; i++) t[i] = this.buttons[i].renderHtml()
          e = '<div class="%%-foot"><div id="##_buttons" class="%%-buttons">' + t.join('') + '</div></div>'
        }
        return '<div id="##" class="%%"><div ' + (this.fullscreen ? 'class="%%-wrap edui-dialog-fullscreen-flag"' : 'class="%%"') + '><div id="##_body" class="%%-body"><div class="%%-shadow"></div><div id="##_titlebar" class="%%-titlebar"><div class="%%-draghandle" onmousedown="$$._onTitlebarMouseDown(event, this);"><span class="%%-caption">' + (this.title || '') + '</span></div>' + this.closeButton.renderHtml() + '</div><div id="##_content" class="%%-content">' + (this.autoReset ? '' : this.getContentHtml()) + '</div>' + e + '</div></div></div>'
      },
      postRender: function () {
        this.modalMask.getDom() || (this.modalMask.render(), this.modalMask.hide()), this.dragMask.getDom() || (this.dragMask.render(), this.dragMask.hide())
        var e = this
        if (this.addListener('show', function () {
          e.modalMask.show(this.getDom().style.zIndex - 2)
        }), this.addListener('hide', function () {
          e.modalMask.hide()
        }), this.buttons) { for (var t = 0; t < this.buttons.length; t++) this.buttons[t].postRender() }
        o.on(window, 'resize', function () {
          setTimeout(function () {
            e.isHidden() || e.safeSetOffset(r.getClientRect(e.getDom()))
          })
        }), this._hide()
      },
      mesureSize: function () {
        var e = this.getDom('body'),
          t = r.getClientRect(this.getDom('content')).width,
          i = e.style
        return i.width = t, r.getClientRect(e)
      },
      _onTitlebarMouseDown: function (e, t) {
        if (this.draggable) {
          var i, n = (r.getViewportRect(), this)
          r.startDrag(e, {
            ondragstart: function () {
              i = r.getClientRect(n.getDom()), n.getDom('contmask').style.visibility = 'visible', n.dragMask.show(n.getDom().style.zIndex - 1)
            },
            ondragmove: function (e, t) {
              var o = i.left + e,
                r = i.top + t
              n.safeSetOffset({
                left: o,
                top: r
              })
            },
            ondragstop: function () {
              n.getDom('contmask').style.visibility = 'hidden', o.removeClasses(n.getDom(), ['edui-state-centered']), n.dragMask.hide()
            }
          })
        }
      },
      reset: function () {
        this.getDom('content').innerHTML = this.getContentHtml(), this.fireEvent('dialogafterreset')
      },
      _show: function () {
        this._hidden && (this.getDom().style.display = '', this.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * this.editor.container.style.zIndex + 10), this._hidden = !1, this.fireEvent('show'), baidu.editor.ui.uiUtils.getFixedLayer().style.zIndex = this.getDom().style.zIndex - 4)
      },
      isHidden: function () {
        return this._hidden
      },
      _hide: function () {
        if (!this._hidden) {
          var e = this.getDom()
          e.style.display = 'none', e.style.zIndex = '', e.style.width = '', e.style.height = '', this._hidden = !0, this.fireEvent('hide')
        }
      },
      open: function () {
        if (this.autoReset) {
          try {
            this.reset()
          } catch (e) {
            this.render(), this.open()
          }
        }
        if (this.showAtCenter(), this.iframeUrl) {
          try {
            this.getDom('iframe').focus()
          } catch (t) {}
        }
        i = this
      },
      _onCloseButtonClick: function (e, t) {
        this.close(!1)
      },
      close: function (e) {
        if (this.fireEvent('close', e) !== !1) {
          this.fullscreen && (document.documentElement.style.overflowX = this._originalContext.html.overflowX, document.documentElement.style.overflowY = this._originalContext.html.overflowY, document.body.style.overflowX = this._originalContext.body.overflowX, document.body.style.overflowY = this._originalContext.body.overflowY, delete this._originalContext), this._hide()
          var t = this.getDom('content'),
            i = this.getDom('iframe')
          if (t && i) {
            var n = i.contentDocument || i.contentWindow.document
            n && (n.body.innerHTML = ''), o.remove(t)
          }
        }
      }
    }, n.inherits(d, s)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.Menu,
      i = baidu.editor.ui.SplitButton,
      n = baidu.editor.ui.MenuButton = function (e) {
        this.initOptions(e), this.initMenuButton()
      }
    n.prototype = {
      initMenuButton: function () {
        var e = this
        this.uiName = 'menubutton', this.popup = new t({
          items: e.items,
          className: e.className,
          editor: e.editor
        }), this.popup.addListener('show', function () {
          for (var t = this, i = 0; i < t.items.length; i++) t.items[i].removeState('checked'), t.items[i].value == e._value && (t.items[i].addState('checked'), this.value = e._value)
        }), this.initSplitButton()
      },
      setValue: function (e) {
        this._value = e
      }
    }, e.inherits(n, i)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.Popup,
      i = baidu.editor.ui.SplitButton,
      n = baidu.editor.ui.MultiMenuPop = function (e) {
        this.initOptions(e), this.initMultiMenu()
      }
    n.prototype = {
      initMultiMenu: function () {
        var e = this
        this.popup = new t({
          content: '',
          editor: e.editor,
          iframe_rendered: !1,
          onshow: function () {
            this.iframe_rendered || (this.iframe_rendered = !0, this.getDom('content').innerHTML = '<iframe id="' + e.id + '_iframe" src="' + e.iframeUrl + '" frameborder="0"></iframe>', e.editor.container.style.zIndex && (this.getDom().style.zIndex = 1 * e.editor.container.style.zIndex + 1))
          }
        }), this.onbuttonclick = function () {
          this.showPopup()
        }, this.initSplitButton()
      }
    }, e.inherits(n, i)
  }()),
  (function () {
    function e (e) {
      var t = e.target || e.srcElement,
        i = a.findParent(t, function (e) {
          return a.hasClass(e, 'edui-shortcutmenu') || a.hasClass(e, 'edui-popup')
        }, !0)
      if (!i) { for (var n, o = 0; n = s[o++];) n.hide() }
    }
    var t, i = baidu.editor.ui,
      n = i.UIBase,
      o = i.uiUtils,
      r = baidu.editor.utils,
      a = baidu.editor.dom.domUtils,
      s = [],
      l = !1,
      d = i.ShortCutMenu = function (e) {
        this.initOptions(e), this.initShortCutMenu()
      }
    d.postHide = e, d.prototype = {
      isHidden: !0,
      SPACE: 5,
      initShortCutMenu: function () {
        this.items = this.items || [], this.initUIBase(), this.initItems(), this.initEvent(), s.push(this)
      },
      initEvent: function () {
        var e = this,
          i = e.editor.document
        a.on(i, 'mousemove', function (i) {
          if (e.isHidden === !1) {
            if (e.getSubMenuMark() || e.eventType == 'contextmenu') return
            var n = !0,
              o = e.getDom(),
              r = o.offsetWidth,
              a = o.offsetHeight,
              s = r / 2 + e.SPACE,
              l = a / 2,
              d = Math.abs(i.screenX - e.left),
              c = Math.abs(i.screenY - e.top)
            clearTimeout(t), t = setTimeout(function () {
              c > 0 && l > c ? e.setOpacity(o, '1') : c > l && l + 70 > c ? (e.setOpacity(o, '0.5'), n = !1) : c > l + 70 && l + 140 > c && e.hide(), n && d > 0 && s > d ? e.setOpacity(o, '1') : d > s && s + 70 > d ? e.setOpacity(o, '0.5') : d > s + 70 && s + 140 > d && e.hide()
            })
          }
        }), browser.chrome && a.on(i, 'mouseout', function (t) {
          var i = t.relatedTarget || t.toElement
          i != null && i.tagName != 'HTML' || e.hide()
        }), e.editor.addListener('afterhidepop', function () {
          e.isHidden || (l = !0)
        })
      },
      initItems: function () {
        if (r.isArray(this.items)) {
          for (var e = 0, t = this.items.length; t > e; e++) {
            var n = this.items[e].toLowerCase()
            i[n] && (this.items[e] = new i[n](this.editor), this.items[e].className += ' edui-shortcutsubmenu ')
          }
        }
      },
      setOpacity: function (e, t) {
        browser.ie && browser.version < 9 ? e.style.filter = 'alpha(opacity = ' + 100 * parseFloat(t) + ');' : e.style.opacity = t
      },
      getSubMenuMark: function () {
        l = !1
        for (var e, t = o.getFixedLayer(), i = a.getElementsByTagName(t, 'div', function (e) {
            return a.hasClass(e, 'edui-shortcutsubmenu edui-popup')
          }), n = 0; e = i[n++];) e.style.display != 'none' && (l = !0)
        return l
      },
      show: function (e, t) {
        function i (e) {
          e.left < 0 && (e.left = 0), e.top < 0 && (e.top = 0), l.style.cssText = 'position:absolute;left:' + e.left + 'px;top:' + e.top + 'px;'
        }

        function n (e) {
          e.tagName || (e = e.getDom()), s.left = parseInt(e.style.left), s.top = parseInt(e.style.top), s.top -= l.offsetHeight + 15, i(s)
        }
        var r = this,
          s = {},
          l = this.getDom(),
          d = o.getFixedLayer()
        if (r.eventType = e.type, l.style.cssText = 'display:block;left:-9999px', e.type == 'contextmenu' && t) {
          var c = a.getElementsByTagName(d, 'div', 'edui-contextmenu')[0]
          c ? n(c) : r.editor.addListener('aftershowcontextmenu', function (e, t) {
            n(t)
          })
        } else s = o.getViewportOffsetByEvent(e), s.top -= l.offsetHeight + r.SPACE, s.left += r.SPACE + 20, i(s), r.setOpacity(l, 0.2)
        r.isHidden = !1, r.left = e.screenX + l.offsetWidth / 2 - r.SPACE, r.top = e.screenY - l.offsetHeight / 2 - r.SPACE, r.editor && (l.style.zIndex = 1 * r.editor.container.style.zIndex + 10, d.style.zIndex = l.style.zIndex - 1)
      },
      hide: function () {
        this.getDom() && (this.getDom().style.display = 'none'), this.isHidden = !0
      },
      postRender: function () {
        if (r.isArray(this.items)) { for (var e, t = 0; e = this.items[t++];) e.postRender() }
      },
      getHtmlTpl: function () {
        var e
        if (r.isArray(this.items)) {
          e = []
          for (var t = 0; t < this.items.length; t++) e[t] = this.items[t].renderHtml()
          e = e.join('')
        } else e = this.items
        return '<div id="##" class="%% edui-toolbar" data-src="shortcutmenu" onmousedown="return false;" onselectstart="return false;" >' + e + '</div>'
      }
    }, r.inherits(d, n), a.on(document, 'mousedown', function (t) {
      e(t)
    }), a.on(window, 'scroll', function (t) {
      e(t)
    })
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui.UIBase,
      i = baidu.editor.ui.Breakline = function (e) {
        this.initOptions(e), this.initSeparator()
      }
    i.prototype = {
      uiName: 'Breakline',
      initSeparator: function () {
        this.initUIBase()
      },
      getHtmlTpl: function () {
        return '<br/>'
      }
    }, e.inherits(i, t)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.dom.domUtils,
      i = baidu.editor.ui.UIBase,
      n = baidu.editor.ui.Message = function (e) {
        this.initOptions(e), this.initMessage()
      }
    n.prototype = {
      initMessage: function () {
        this.initUIBase()
      },
      getHtmlTpl: function () {
        return '<div id="##" class="edui-message %%"> <div id="##_closer" class="edui-message-closer">×</div> <div id="##_body" class="edui-message-body edui-message-type-info"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="about:blank"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-message-content">  </div> </div></div>'
      },
      reset: function (e) {
        var t = this
        e.keepshow || (clearTimeout(this.timer), t.timer = setTimeout(function () {
          t.hide()
        }, e.timeout || 4e3)), void 0 !== e.content && t.setContent(e.content), void 0 !== e.type && t.setType(e.type), t.show()
      },
      postRender: function () {
        var e = this,
          i = this.getDom('closer')
        i && t.on(i, 'click', function () {
          e.hide()
        })
      },
      setContent: function (e) {
        this.getDom('content').innerHTML = e
      },
      setType: function (e) {
        e = e || 'info'
        var t = this.getDom('body')
        t.className = t.className.replace(/edui-message-type-[\w-]+/, 'edui-message-type-' + e)
      },
      getContent: function () {
        return this.getDom('content').innerHTML
      },
      getType: function () {
        var e = this.getDom('body').match(/edui-message-type-([\w-]+)/)
        return e ? e[1] : ''
      },
      show: function () {
        this.getDom().style.display = 'block'
      },
      hide: function () {
        var e = this.getDom()
        e && (e.style.display = 'none', e.parentNode && e.parentNode.removeChild(e))
      }
    }, e.inherits(n, i)
  }()),
  (function () {
    var e = baidu.editor.utils,
      t = baidu.editor.ui,
      i = t.Dialog
    t.buttons = {}, t.Dialog = function (e) {
      var t = new i(e)
      return t.addListener('hide', function () {
        if (t.editor) {
          var e = t.editor
          try {
            if (browser.gecko) {
              var i = e.window.scrollY,
                n = e.window.scrollX
              e.body.focus(), e.window.scrollTo(n, i)
            } else e.focus()
          } catch (o) {}
        }
      }), t
    }
    for (var n, o = {
        anchor: '~/dialogs/anchor/anchor.html',
        insertimage: '~/dialogs/image/image.html',
        link: '~/dialogs/link/link.html',
        spechars: '~/dialogs/spechars/spechars.html',
        searchreplace: '~/dialogs/searchreplace/searchreplace.html',
        map: '~/dialogs/map/map.html',
        gmap: '~/dialogs/gmap/gmap.html',
        insertvideo: '~/dialogs/video/video.html',
        help: '~/dialogs/help/help.html',
        preview: '~/dialogs/preview/preview.html',
        emotion: '~/dialogs/emotion/emotion.html',
        wordimage: '~/dialogs/wordimage/wordimage.html',
        attachment: '~/dialogs/attachment/attachment.html',
        insertframe: '~/dialogs/insertframe/insertframe.html',
        edittip: '~/dialogs/table/edittip.html',
        edittable: '~/dialogs/table/edittable.html',
        edittd: '~/dialogs/table/edittd.html',
        webapp: '~/dialogs/webapp/webapp.html',
        snapscreen: '~/dialogs/snapscreen/snapscreen.html',
        scrawl: '~/dialogs/scrawl/scrawl.html',
        music: '~/dialogs/music/music.html',
        template: '~/dialogs/template/template.html',
        background: '~/dialogs/background/background.html',
        charts: '~/dialogs/charts/charts.html'
      }, r = ['undo', 'redo', 'formatmatch', 'bold', 'italic', 'underline', 'fontborder', 'touppercase', 'tolowercase', 'strikethrough', 'subscript', 'superscript', 'source', 'indent', 'outdent', 'blockquote', 'pasteplain', 'pagebreak', 'selectall', 'print', 'horizontal', 'removeformat', 'time', 'date', 'unlink', 'insertparagraphbeforetable', 'insertrow', 'insertcol', 'mergeright', 'mergedown', 'deleterow', 'deletecol', 'splittorows', 'splittocols', 'splittocells', 'mergecells', 'deletetable', 'drafts'], a = 0; n = r[a++];) {
      n = n.toLowerCase(), t[n] = (function (e) {
        return function (i) {
          var n = new t.Button({
            className: 'edui-for-' + e,
            title: i.options.labelMap[e] || i.getLang('labelMap.' + e) || '',
            onclick: function () {
              i.execCommand(e)
            },
            theme: i.options.theme,
            showText: !1
          })
          return t.buttons[e] = n, i.addListener('selectionchange', function (t, o, r) {
            var a = i.queryCommandState(e); a == -1 ? (n.setDisabled(!0), n.setChecked(!1)) : r || (n.setDisabled(!1), n.setChecked(a))
          }), n
        }
      }(n))
    }
    t.cleardoc = function (e) {
      var i = new t.Button({
        className: 'edui-for-cleardoc',
        title: e.options.labelMap.cleardoc || e.getLang('labelMap.cleardoc') || '',
        theme: e.options.theme,
        onclick: function () {
          confirm(e.getLang('confirmClear')) && e.execCommand('cleardoc')
        }
      })
      return t.buttons.cleardoc = i, e.addListener('selectionchange', function () {
        i.setDisabled(e.queryCommandState('cleardoc') == -1)
      }), i
    }
    var s = {
      justify: ['left', 'right', 'center', 'justify'],
      imagefloat: ['none', 'left', 'center', 'right'],
      directionality: ['ltr', 'rtl']
    }
    for (var l in s) {
      !(function (e, i) {
        for (var n, o = 0; n = i[o++];) {
          !(function (i) {
            t[e.replace('float', '') + i] = function (n) {
              var o = new t.Button({
                className: 'edui-for-' + e.replace('float', '') + i,
                title: n.options.labelMap[e.replace('float', '') + i] || n.getLang('labelMap.' + e.replace('float', '') + i) || '',
                theme: n.options.theme,
                onclick: function () {
                  n.execCommand(e, i)
                }
              })
              return t.buttons[e] = o, n.addListener('selectionchange', function (t, r, a) {
                o.setDisabled(n.queryCommandState(e) == -1), o.setChecked(n.queryCommandValue(e) == i && !a)
              }), o
            }
          }(n))
        }
      }(l, s[l]))
    }
    for (var n, a = 0; n = ['backcolor', 'forecolor'][a++];) {
      t[n] = (function (e) {
        return function (i) {
          var n = new t.ColorButton({
            className: 'edui-for-' + e,
            color: 'default',
            title: i.options.labelMap[e] || i.getLang('labelMap.' + e) || '',
            editor: i,
            onpickcolor: function (t, n) {
              i.execCommand(e, n)
            },
            onpicknocolor: function () {
              i.execCommand(e, 'default'), this.setColor('transparent'), this.color = 'default'
            },
            onbuttonclick: function () {
              i.execCommand(e, this.color)
            }
          })
          return t.buttons[e] = n, i.addListener('selectionchange', function () {
            n.setDisabled(i.queryCommandState(e) == -1)
          }), n
        }
      }(n))
    }
    var d = {
      noOk: ['searchreplace', 'help', 'spechars', 'webapp', 'preview'],
      ok: ['attachment', 'anchor', 'link', 'insertimage', 'map', 'gmap', 'insertframe', 'wordimage', 'insertvideo', 'insertframe', 'edittip', 'edittable', 'edittd', 'scrawl', 'template', 'music', 'background', 'charts']
    }
    for (var l in d) {
      !(function (i, n) {
        for (var r, a = 0; r = n[a++];) {
          browser.opera && r === 'searchreplace' || !(function (n) {
            t[n] = function (r, a, s) {
              a = a || (r.options.iframeUrlMap || {})[n] || o[n], s = r.options.labelMap[n] || r.getLang('labelMap.' + n) || ''
              var l
              a && (l = new t.Dialog(e.extend({
                iframeUrl: r.ui.mapUrl(a),
                editor: r,
                className: 'edui-for-' + n,
                title: s,
                holdScroll: n === 'insertimage',
                fullscreen: /charts|preview/.test(n),
                closeDialog: r.getLang('closeDialog')
              }, i == 'ok' ? {
                buttons: [{
                  className: 'edui-okbutton',
                  label: r.getLang('ok'),
                  editor: r,
                  onclick: function () {
                    l.close(!0)
                  }
                }, {
                  className: 'edui-cancelbutton',
                  label: r.getLang('cancel'),
                  editor: r,
                  onclick: function () {
                    l.close(!1)
                  }
                }]
              } : {})), r.ui._dialogs[n + 'Dialog'] = l)
              var d = new t.Button({
                className: 'edui-for-' + n,
                title: s,
                onclick: function () {
                  if (l) {
                    switch (n) {
                      case 'wordimage':
                        var e = r.execCommand('wordimage')
                        e && e.length && (l.render(), l.open())
                        break;
                      case 'scrawl':
                        r.queryCommandState('scrawl') != -1 && (l.render(), l.open())
                        break;
                      default:
                        l.render(), l.open()
                    }
                  }
                },
                theme: r.options.theme,
                disabled: n == 'scrawl' && r.queryCommandState('scrawl') == -1 || n == 'charts'
              })
              return t.buttons[n] = d, r.addListener('selectionchange', function () {
                var e = {
                  edittable: 1
                }
                if (!(n in e)) {
                  var t = r.queryCommandState(n)
                  d.getDom() && (d.setDisabled(t == -1), d.setChecked(t))
                }
              }), d
            }
          }(r.toLowerCase()))
        }
      }(l, d[l]))
    }
    t.snapscreen = function (e, i, n) {
      n = e.options.labelMap.snapscreen || e.getLang('labelMap.snapscreen') || ''
      var r = new t.Button({
        className: 'edui-for-snapscreen',
        title: n,
        onclick: function () {
          e.execCommand('snapscreen')
        },
        theme: e.options.theme
      })
      if (t.buttons.snapscreen = r, i = i || (e.options.iframeUrlMap || {}).snapscreen || o.snapscreen) {
        var a = new t.Dialog({
          iframeUrl: e.ui.mapUrl(i),
          editor: e,
          className: 'edui-for-snapscreen',
          title: n,
          buttons: [{
            className: 'edui-okbutton',
            label: e.getLang('ok'),
            editor: e,
            onclick: function () {
              a.close(!0)
            }
          }, {
            className: 'edui-cancelbutton',
            label: e.getLang('cancel'),
            editor: e,
            onclick: function () {
              a.close(!1)
            }
          }]
        })
        a.render(), e.ui._dialogs.snapscreenDialog = a
      }
      return e.addListener('selectionchange', function () {
        r.setDisabled(e.queryCommandState('snapscreen') == -1)
      }), r
    }, t.insertcode = function (i, n, o) {
      n = i.options.insertcode || [], o = i.options.labelMap.insertcode || i.getLang('labelMap.insertcode') || ''
      var r = []
      e.each(n, function (e, t) {
        r.push({
          label: e,
          value: t,
          theme: i.options.theme,
          renderLabelHtml: function () {
            return '<div class="edui-label %%-label" >' + (this.label || '') + '</div>'
          }
        })
      })
      var a = new t.Combox({
        editor: i,
        items: r,
        onselect: function (e, t) {
          i.execCommand('insertcode', this.items[t].value)
        },
        onbuttonclick: function () {
          this.showPopup()
        },
        title: o,
        initValue: o,
        className: 'edui-for-insertcode',
        indexByValue: function (e) {
          if (e) {
            for (var t, i = 0; t = this.items[i]; i++) { if (t.value.indexOf(e) != -1) return i }
          }
          return -1
        }
      })
      return t.buttons.insertcode = a, i.addListener('selectionchange', function (e, t, n) {
        if (!n) {
          var r = i.queryCommandState('insertcode')
          if (r == -1) a.setDisabled(!0)
          else {
            a.setDisabled(!1)
            var s = i.queryCommandValue('insertcode')
            if (!s) return void a.setValue(o)
            s && (s = s.replace(/['"]/g, '').split(',')[0]), a.setValue(s)
          }
        }
      }), a
    }, t.fontfamily = function (i, n, o) {
      if (n = i.options.fontfamily || [], o = i.options.labelMap.fontfamily || i.getLang('labelMap.fontfamily') || '', n.length) {
        for (var r, a = 0, s = []; r = n[a]; a++) {
          var l = i.getLang('fontfamily')[r.name] || ''
          !(function (t, n) {
            s.push({
              label: t,
              value: n,
              theme: i.options.theme,
              renderLabelHtml: function () {
                return '<div class="edui-label %%-label" style="font-family:' + e.unhtml(this.value) + '">' + (this.label || '') + '</div>'
              }
            })
          }(r.label || l, r.val))
        }
        var d = new t.Combox({
          editor: i,
          items: s,
          onselect: function (e, t) {
            i.execCommand('FontFamily', this.items[t].value)
          },
          onbuttonclick: function () {
            this.showPopup()
          },
          title: o,
          initValue: o,
          className: 'edui-for-fontfamily',
          indexByValue: function (e) {
            if (e) {
              for (var t, i = 0; t = this.items[i]; i++) { if (t.value.indexOf(e) != -1) return i }
            }
            return -1
          }
        })
        return t.buttons.fontfamily = d, i.addListener('selectionchange', function (e, t, n) {
          if (!n) {
            var o = i.queryCommandState('FontFamily')
            if (o == -1) d.setDisabled(!0)
            else {
              d.setDisabled(!1)
              var r = i.queryCommandValue('FontFamily')
              r && (r = r.replace(/['"]/g, '').split(',')[0]), d.setValue(r)
            }
          }
        }), d
      }
    }, t.fontsize = function (e, i, n) {
      if (n = e.options.labelMap.fontsize || e.getLang('labelMap.fontsize') || '', i = i || e.options.fontsize || [], i.length) {
        for (var o = [], r = 0; r < i.length; r++) {
          var a = i[r] + 'px'
          o.push({
            label: a,
            value: a,
            theme: e.options.theme,
            renderLabelHtml: function () {
              return '<div class="edui-label %%-label" style="line-height:1;font-size:' + this.value + '">' + (this.label || '') + '</div>'
            }
          })
        }
        var s = new t.Combox({
          editor: e,
          items: o,
          title: n,
          initValue: n,
          onselect: function (t, i) {
            e.execCommand('FontSize', this.items[i].value)
          },
          onbuttonclick: function () {
            this.showPopup()
          },
          className: 'edui-for-fontsize'
        })
        return t.buttons.fontsize = s, e.addListener('selectionchange', function (t, i, n) {
          if (!n) {
            var o = e.queryCommandState('FontSize'); o == -1 ? s.setDisabled(!0) : (s.setDisabled(!1), s.setValue(e.queryCommandValue('FontSize')))
          }
        }), s
      }
    }, t.paragraph = function (i, n, o) {
      if (o = i.options.labelMap.paragraph || i.getLang('labelMap.paragraph') || '', n = i.options.paragraph || [], !e.isEmptyObject(n)) {
        var r = []
        for (var a in n) {
          r.push({
            value: a,
            label: n[a] || i.getLang('paragraph')[a],
            theme: i.options.theme,
            renderLabelHtml: function () {
              return '<div class="edui-label %%-label"><span class="edui-for-' + this.value + '">' + (this.label || '') + '</span></div>'
            }
          })
        }
        var s = new t.Combox({
          editor: i,
          items: r,
          title: o,
          initValue: o,
          className: 'edui-for-paragraph',
          onselect: function (e, t) {
            i.execCommand('Paragraph', this.items[t].value)
          },
          onbuttonclick: function () {
            this.showPopup()
          }
        })
        return t.buttons.paragraph = s, i.addListener('selectionchange', function (e, t, n) {
          if (!n) {
            var o = i.queryCommandState('Paragraph')
            if (o == -1) s.setDisabled(!0)
            else {
              s.setDisabled(!1)
              var r = i.queryCommandValue('Paragraph'),
                a = s.indexByValue(r); a != -1 ? s.setValue(r) : s.setValue(s.initValue)
            }
          }
        }), s
      }
    }, t.customstyle = function (e) {
      var i = e.options.customstyle || [],
        n = e.options.labelMap.customstyle || e.getLang('labelMap.customstyle') || ''
      if (i.length) {
        for (var o, r = e.getLang('customstyle'), a = 0, s = []; o = i[a++];) {
          !(function (t) {
            var i = {}
            i.label = t.label ? t.label : r[t.name], i.style = t.style, i.className = t.className, i.tag = t.tag, s.push({
              label: i.label,
              value: i,
              theme: e.options.theme,
              renderLabelHtml: function () {
                return '<div class="edui-label %%-label"><' + i.tag + ' ' + (i.className ? ' class="' + i.className + '"' : '') + (i.style ? ' style="' + i.style + '"' : '') + '>' + i.label + '</' + i.tag + '></div>'
              }
            })
          }(o))
        }
        var l = new t.Combox({
          editor: e,
          items: s,
          title: n,
          initValue: n,
          className: 'edui-for-customstyle',
          onselect: function (t, i) {
            e.execCommand('customstyle', this.items[i].value)
          },
          onbuttonclick: function () {
            this.showPopup()
          },
          indexByValue: function (e) {
            for (var t, i = 0; t = this.items[i++];) { if (t.label == e) return i - 1 }
            return -1
          }
        })
        return t.buttons.customstyle = l, e.addListener('selectionchange', function (t, i, n) {
          if (!n) {
            var o = e.queryCommandState('customstyle')
            if (o == -1) l.setDisabled(!0)
            else {
              l.setDisabled(!1)
              var r = e.queryCommandValue('customstyle'),
                a = l.indexByValue(r); a != -1 ? l.setValue(r) : l.setValue(l.initValue)
            }
          }
        }), l
      }
    }, t.inserttable = function (e, i, n) {
      n = e.options.labelMap.inserttable || e.getLang('labelMap.inserttable') || ''
      var o = new t.TableButton({
        editor: e,
        title: n,
        className: 'edui-for-inserttable',
        onpicktable: function (t, i, n) {
          e.execCommand('InsertTable', {
            numRows: n,
            numCols: i,
            border: 1
          })
        },
        onbuttonclick: function () {
          this.showPopup()
        }
      })
      return t.buttons.inserttable = o, e.addListener('selectionchange', function () {
        o.setDisabled(e.queryCommandState('inserttable') == -1)
      }), o
    }, t.lineheight = function (e) {
      var i = e.options.lineheight || []
      if (i.length) {
        for (var n, o = 0, r = []; n = i[o++];) {
          r.push({
            label: n,
            value: n,
            theme: e.options.theme,
            onclick: function () {
              e.execCommand('lineheight', this.value)
            }
          })
        }
        var a = new t.MenuButton({
          editor: e,
          className: 'edui-for-lineheight',
          title: e.options.labelMap.lineheight || e.getLang('labelMap.lineheight') || '',
          items: r,
          onbuttonclick: function () {
            var t = e.queryCommandValue('LineHeight') || this.value
            e.execCommand('LineHeight', t)
          }
        })
        return t.buttons.lineheight = a, e.addListener('selectionchange', function () {
          var t = e.queryCommandState('LineHeight')
          if (t == -1) a.setDisabled(!0)
          else {
            a.setDisabled(!1)
            var i = e.queryCommandValue('LineHeight')
            i && a.setValue((i + '').replace(/cm/, '')), a.setChecked(t)
          }
        }), a
      }
    }
    for (var c, u = ['top', 'bottom'], m = 0; c = u[m++];) {
      !(function (e) {
        t['rowspacing' + e] = function (i) {
          var n = i.options['rowspacing' + e] || []
          if (!n.length) return null
          for (var o, r = 0, a = []; o = n[r++];) {
            a.push({
              label: o,
              value: o,
              theme: i.options.theme,
              onclick: function () {
                i.execCommand('rowspacing', this.value, e)
              }
            })
          }
          var s = new t.MenuButton({
            editor: i,
            className: 'edui-for-rowspacing' + e,
            title: i.options.labelMap['rowspacing' + e] || i.getLang('labelMap.rowspacing' + e) || '',
            items: a,
            onbuttonclick: function () {
              var t = i.queryCommandValue('rowspacing', e) || this.value
              i.execCommand('rowspacing', t, e)
            }
          })
          return t.buttons[e] = s, i.addListener('selectionchange', function () {
            var t = i.queryCommandState('rowspacing', e)
            if (t == -1) s.setDisabled(!0)
            else {
              s.setDisabled(!1)
              var n = i.queryCommandValue('rowspacing', e)
              n && s.setValue((n + '').replace(/%/, '')), s.setChecked(t)
            }
          }), s
        }
      }(c))
    }
    for (var f, h = ['insertorderedlist', 'insertunorderedlist'], p = 0; f = h[p++];) {
      !(function (e) {
        t[e] = function (i) {
          var n = i.options[e],
            o = function () {
              i.execCommand(e, this.value)
            },
            r = []
          for (var a in n) {
            r.push({
              label: n[a] || i.getLang()[e][a] || '',
              value: a,
              theme: i.options.theme,
              onclick: o
            })
          }
          var s = new t.MenuButton({
            editor: i,
            className: 'edui-for-' + e,
            title: i.getLang('labelMap.' + e) || '',
            items: r,
            onbuttonclick: function () {
              var t = i.queryCommandValue(e) || this.value
              i.execCommand(e, t)
            }
          })
          return t.buttons[e] = s, i.addListener('selectionchange', function () {
            var t = i.queryCommandState(e)
            if (t == -1) s.setDisabled(!0)
            else {
              s.setDisabled(!1)
              var n = i.queryCommandValue(e)
              s.setValue(n), s.setChecked(t)
            }
          }), s
        }
      }(f))
    }
    t.fullscreen = function (e, i) {
      i = e.options.labelMap.fullscreen || e.getLang('labelMap.fullscreen') || ''
      var n = new t.Button({
        className: 'edui-for-fullscreen',
        title: i,
        theme: e.options.theme,
        onclick: function () {
          e.ui && e.ui.setFullScreen(!e.ui.isFullScreen()), this.setChecked(e.ui.isFullScreen())
        }
      })
      return t.buttons.fullscreen = n, e.addListener('selectionchange', function () {
        var t = e.queryCommandState('fullscreen')
        n.setDisabled(t == -1), n.setChecked(e.ui.isFullScreen())
      }), n
    }, t.emotion = function (e, i) {
      var n = 'emotion',
        r = new t.MultiMenuPop({
          title: e.options.labelMap[n] || e.getLang('labelMap.' + n) || '',
          editor: e,
          className: 'edui-for-' + n,
          iframeUrl: e.ui.mapUrl(i || (e.options.iframeUrlMap || {})[n] || o[n])
        })
      return t.buttons[n] = r, e.addListener('selectionchange', function () {
        r.setDisabled(e.queryCommandState(n) == -1)
      }), r
    }, t.autotypeset = function (e) {
      var i = new t.AutoTypeSetButton({
        editor: e,
        title: e.options.labelMap.autotypeset || e.getLang('labelMap.autotypeset') || '',
        className: 'edui-for-autotypeset',
        onbuttonclick: function () {
          e.execCommand('autotypeset')
        }
      })
      return t.buttons.autotypeset = i, e.addListener('selectionchange', function () {
        i.setDisabled(e.queryCommandState('autotypeset') == -1)
      }), i
    }, t.simpleupload = function (e) {
      var i = 'simpleupload',
        n = new t.Button({
          className: 'edui-for-' + i,
          title: e.options.labelMap[i] || e.getLang('labelMap.' + i) || '',
          onclick: function () {},
          theme: e.options.theme,
          showText: !1
        })
      return t.buttons[i] = n, e.addListener('ready', function () {
        var t = n.getDom('body'),
          i = t.children[0]
        e.fireEvent('simpleuploadbtnready', i)
      }), e.addListener('selectionchange', function (t, o, r) {
        var a = e.queryCommandState(i); a == -1 ? (n.setDisabled(!0), n.setChecked(!1)) : r || (n.setDisabled(!1), n.setChecked(a))
      }), n
    }
  }()),
  (function () {
    function e (e) {
      this.initOptions(e), this.initEditorUI()
    }
    var t = baidu.editor.utils,
      i = baidu.editor.ui.uiUtils,
      n = baidu.editor.ui.UIBase,
      o = baidu.editor.dom.domUtils,
      r = []
    e.prototype = {
      uiName: 'editor',
      initEditorUI: function () {
        function e (e, t) {
          e.setOpt({
            wordCount: !0,
            maximumWords: 1e4,
            wordCountMsg: e.options.wordCountMsg || e.getLang('wordCountMsg'),
            wordOverFlowMsg: e.options.wordOverFlowMsg || e.getLang('wordOverFlowMsg')
          })
          var i = e.options,
            n = i.maximumWords,
            o = i.wordCountMsg,
            r = i.wordOverFlowMsg,
            a = t.getDom('wordcount')
          if (i.wordCount) {
            var s = e.getContentLength(!0)
            s > n ? (a.innerHTML = r, e.fireEvent('wordcountoverflow')) : a.innerHTML = o.replace('{#leave}', n - s).replace('{#count}', s)
          }
        }
        this.editor.ui = this, this._dialogs = {}, this.initUIBase(), this._initToolbars()
        var t = this.editor,
          i = this
        t.addListener('ready', function () {
          function n () {
            e(t, i), o.un(t.document, 'click', arguments.callee)
          }
          t.getDialog = function (e) {
            return t.ui._dialogs[e + 'Dialog']
          }, o.on(t.window, 'scroll', function (e) {
            baidu.editor.ui.Popup.postHide(e)
          }), t.ui._actualFrameWidth = t.options.initialFrameWidth, UE.browser.ie && UE.browser.version === 6 && t.container.ownerDocument.execCommand('BackgroundImageCache', !1, !0), t.options.elementPathEnabled && (t.ui.getDom('elementpath').innerHTML = '<div class="edui-editor-breadcrumb">' + t.getLang('elementPathTip') + ':</div>'), t.options.wordCount && (o.on(t.document, 'click', n), t.ui.getDom('wordcount').innerHTML = t.getLang('wordCountTip')), t.ui._scale(), t.options.scaleEnabled ? (t.autoHeightEnabled && t.disableAutoHeight(), i.enableScale()) : i.disableScale(), t.options.elementPathEnabled || t.options.wordCount || t.options.scaleEnabled || (t.ui.getDom('elementpath').style.display = 'none', t.ui.getDom('wordcount').style.display = 'none', t.ui.getDom('scale').style.display = 'none'), t.selection.isFocus() && t.fireEvent('selectionchange', !1, !0)
        }), t.addListener('mousedown', function (e, t) {
          var i = t.target || t.srcElement
          baidu.editor.ui.Popup.postHide(t, i), baidu.editor.ui.ShortCutMenu.postHide(t)
        }), t.addListener('delcells', function () {
          UE.ui.edittip && new UE.ui.edittip(t), t.getDialog('edittip').open()
        })
        var n, r, a = !1
        t.addListener('afterpaste', function () {
          t.queryCommandState('pasteplain') || (baidu.editor.ui.PastePicker && (n = new baidu.editor.ui.Popup({
            content: new baidu.editor.ui.PastePicker({
              editor: t
            }),
            editor: t,
            className: 'edui-wordpastepop'
          }), n.render()), a = !0)
        }), t.addListener('afterinserthtml', function () {
          clearTimeout(r), r = setTimeout(function () {
            if (n && (a || t.ui._isTransfer)) {
              if (n.isHidden()) {
                var e = o.createElement(t.document, 'span', {
                    style: 'line-height:0px;',
                    innerHTML: '\ufeff'
                  }),
                  i = t.selection.getRange()
                i.insertNode(e)
                var r = getDomNode(e, 'firstChild', 'previousSibling')
                r && n.showAnchor(r.nodeType == 3 ? r.parentNode : r), o.remove(e)
              } else n.show()
              delete t.ui._isTransfer, a = !1
            }
          }, 200)
        }), t.addListener('contextmenu', function (e, t) {
          baidu.editor.ui.Popup.postHide(t)
        }), t.addListener('keydown', function (e, t) {
          n && n.dispose(t)
          var i = t.keyCode || t.which
          t.altKey && i == 90 && UE.ui.buttons.fullscreen.onclick()
        }), t.addListener('wordcount', function (t) {
          e(this, i)
        }), t.addListener('selectionchange', function () {
          t.options.elementPathEnabled && i[(t.queryCommandState('elementpath') == -1 ? 'dis' : 'en') + 'ableElementPath'](), t.options.scaleEnabled && i[(t.queryCommandState('scale') == -1 ? 'dis' : 'en') + 'ableScale']()
        })
        var s = new baidu.editor.ui.Popup({
          editor: t,
          content: '',
          className: 'edui-bubble',
          _onEditButtonClick: function () {
            this.hide(), t.ui._dialogs.linkDialog.open()
          },
          _onImgEditButtonClick: function (e) {
            this.hide(), t.ui._dialogs[e] && t.ui._dialogs[e].open()
          },
          _onImgSetFloat: function (e) {
            this.hide(), t.execCommand('imagefloat', e)
          },
          _setIframeAlign: function (e) {
            var t = s.anchorEl,
              i = t.cloneNode(!0)
            switch (e) {
              case -2:
                i.setAttribute('align', '')
                break
              case -1:
                i.setAttribute('align', 'left')
                break
              case 1:
                i.setAttribute('align', 'right')
            }
            t.parentNode.insertBefore(i, t), o.remove(t), s.anchorEl = i, s.showAnchor(s.anchorEl)
          },
          _updateIframe: function () {
            var e = t._iframe = s.anchorEl
            o.hasClass(e, 'ueditor_baidumap') ? (t.selection.getRange().selectNode(e).select(), t.ui._dialogs.mapDialog.open(), s.hide()) : (t.ui._dialogs.insertframeDialog.open(), s.hide())
          },
          _onRemoveButtonClick: function (e) {
            t.execCommand(e), this.hide()
          },
          queryAutoHide: function (e) {
            return e && e.ownerDocument == t.document && (e.tagName.toLowerCase() == 'img' || o.findParentByTagName(e, 'a', !0)) ? e !== s.anchorEl : baidu.editor.ui.Popup.prototype.queryAutoHide.call(this, e)
          }
        })
        s.render(), t.options.imagePopup && (t.addListener('mouseover', function (e, i) {
          i = i || window.event
          var n = i.target || i.srcElement
          if (t.ui._dialogs.insertframeDialog && /iframe/gi.test(n.tagName)) {
            var o = s.formatHtml('<nobr>' + t.getLang('property') + ': <span onclick=$$._setIframeAlign(-2) class="edui-clickable">' + t.getLang('default') + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(-1) class="edui-clickable">' + t.getLang('justifyleft') + '</span>&nbsp;&nbsp;<span onclick=$$._setIframeAlign(1) class="edui-clickable">' + t.getLang('justifyright') + '</span>&nbsp;&nbsp; <span onclick="$$._updateIframe( this);" class="edui-clickable">' + t.getLang('modify') + '</span></nobr>')
            o ? (s.getDom('content').innerHTML = o, s.anchorEl = n, s.showAnchor(s.anchorEl)) : s.hide()
          }
        }), t.addListener('selectionchange', function (e, i) {
          if (i) {
            var n = '',
              r = '',
              a = t.selection.getRange().getClosedNode(),
              l = t.ui._dialogs
            if (a && a.tagName == 'IMG') {
              var d = 'insertimageDialog'
              if (a.className.indexOf('edui-faked-video') == -1 && a.className.indexOf('edui-upload-video') == -1 || (d = 'insertvideoDialog'), a.className.indexOf('edui-faked-webapp') != -1 && (d = 'webappDialog'), a.src.indexOf('http://api.map.baidu.com') != -1 && (d = 'mapDialog'), a.className.indexOf('edui-faked-music') != -1 && (d = 'musicDialog'), a.src.indexOf('http://maps.google.com/maps/api/staticmap') != -1 && (d = 'gmapDialog'), a.getAttribute('anchorname') && (d = 'anchorDialog', n = s.formatHtml('<nobr>' + t.getLang('property') + ': <span onclick=$$._onImgEditButtonClick("anchorDialog") class="edui-clickable">' + t.getLang('modify') + "</span>&nbsp;&nbsp;<span onclick=$$._onRemoveButtonClick('anchor') class=\"edui-clickable\">" + t.getLang('delete') + '</span></nobr>')), a.getAttribute('word_img') && (t.word_img = [a.getAttribute('word_img')], d = 'wordimageDialog'), (o.hasClass(a, 'loadingclass') || o.hasClass(a, 'loaderrorclass')) && (d = ''), !l[d]) return
              r = '<nobr>' + t.getLang('property') + ': <span onclick=$$._onImgSetFloat("none") class="edui-clickable">' + t.getLang('default') + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("left") class="edui-clickable">' + t.getLang('justifyleft') + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("right") class="edui-clickable">' + t.getLang('justifyright') + '</span>&nbsp;&nbsp;<span onclick=$$._onImgSetFloat("center") class="edui-clickable">' + t.getLang('justifycenter') + "</span>&nbsp;&nbsp;<span onclick=\"$$._onImgEditButtonClick('" + d + '\');" class="edui-clickable">' + t.getLang('modify') + '</span></nobr>', !n && (n = s.formatHtml(r))
            }
            if (t.ui._dialogs.linkDialog) {
              var c, u = t.queryCommandValue('link')
              if (u && (c = u.getAttribute('_href') || u.getAttribute('href', 2))) {
                var m = c
                c.length > 30 && (m = c.substring(0, 20) + '...'), n && (n += '<div style="height:5px;"></div>'), n += s.formatHtml('<nobr>' + t.getLang('anthorMsg') + ': <a target="_blank" href="' + c + '" title="' + c + '" >' + m + '</a> <span class="edui-clickable" onclick="$$._onEditButtonClick();">' + t.getLang('modify') + '</span> <span class="edui-clickable" onclick="$$._onRemoveButtonClick(\'unlink\');"> ' + t.getLang('clear') + '</span></nobr>'), s.showAnchor(u)
              }
            }
            n ? (s.getDom('content').innerHTML = n, s.anchorEl = a || u, s.showAnchor(s.anchorEl)) : s.hide()
          }
        }))
      },
      _initToolbars: function () {
        for (var e = this.editor, i = this.toolbars || [], n = [], o = 0; o < i.length; o++) {
          for (var r = i[o], a = new baidu.editor.ui.Toolbar({
              theme: e.options.theme
            }), s = 0; s < r.length; s++) {
            var l = r[s],
              d = null
            if (typeof l === 'string') {
              if (l = l.toLowerCase(), l == '|' && (l = 'Separator'), l == '||' && (l = 'Breakline'), baidu.editor.ui[l] && (d = new baidu.editor.ui[l](e)), l == 'fullscreen') {
                n && n[0] ? n[0].items.splice(0, 0, d) : d && a.items.splice(0, 0, d)
                continue
              }
            } else d = l
            d && d.id && a.add(d)
          }
          n[o] = a
        }
        t.each(UE._customizeUI, function (t, i) {
          var n, o
          return t.id && t.id != e.key ? !1 : (n = t.execFn.call(e, e, i), void (n && (o = t.index, void 0 === o && (o = a.items.length), a.add(n, o))))
        }), this.toolbars = n
      },
      getHtmlTpl: function () {
        return '<div id="##" class="%%"><div id="##_toolbarbox" class="%%-toolbarbox">' + (this.toolbars.length ? '<div id="##_toolbarboxouter" class="%%-toolbarboxouter"><div class="%%-toolbarboxinner">' + this.renderToolbarBoxHtml() + '</div></div>' : '') + '<div id="##_toolbarmsg" class="%%-toolbarmsg" style="display:none;"><div id = "##_upload_dialog" class="%%-toolbarmsg-upload" onclick="$$.showWordImageDialog();">' + this.editor.getLang('clickToUpload') + '</div><div class="%%-toolbarmsg-close" onclick="$$.hideToolbarMsg();">x</div><div id="##_toolbarmsg_label" class="%%-toolbarmsg-label"></div><div style="height:0;overflow:hidden;clear:both;"></div></div><div id="##_message_holder" class="%%-messageholder"></div></div><div id="##_iframeholder" class="%%-iframeholder"></div><div id="##_bottombar" class="%%-bottomContainer"><table><tr><td id="##_elementpath" class="%%-bottombar"></td><td id="##_wordcount" class="%%-wordcount"></td><td id="##_scale" class="%%-scale"><div class="%%-icon"></div></td></tr></table></div><div id="##_scalelayer"></div></div>'
      },
      showWordImageDialog: function () {
        this._dialogs.wordimageDialog.open()
      },
      renderToolbarBoxHtml: function () {
        for (var e = [], t = 0; t < this.toolbars.length; t++) e.push(this.toolbars[t].renderHtml())
        return e.join('')
      },
      setFullScreen: function (e) {
        var t = this.editor,
          i = t.container.parentNode.parentNode
        if (this._fullscreen != e) {
          if (this._fullscreen = e, this.editor.fireEvent('beforefullscreenchange', e), baidu.editor.browser.gecko) var n = t.selection.getRange().createBookmark()
          if (e) {
            for (;
              i.tagName != 'BODY';) {
              var o = baidu.editor.dom.domUtils.getComputedStyle(i, 'position')
              r.push(o), i.style.position = 'static', i = i.parentNode
            }
            this._bakHtmlOverflow = document.documentElement.style.overflow, this._bakBodyOverflow = document.body.style.overflow, this._bakAutoHeight = this.editor.autoHeightEnabled, this._bakScrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop), this._bakEditorContaninerWidth = t.iframe.parentNode.offsetWidth, this._bakAutoHeight && (t.autoHeightEnabled = !1, this.editor.disableAutoHeight()), document.documentElement.style.overflow = 'hidden', window.scrollTo(0, window.scrollY), this._bakCssText = this.getDom().style.cssText, this._bakCssText1 = this.getDom('iframeholder').style.cssText, t.iframe.parentNode.style.width = '', this._updateFullScreen()
          } else {
            for (;
              i.tagName != 'BODY';) i.style.position = r.shift(), i = i.parentNode
            this.getDom().style.cssText = this._bakCssText, this.getDom('iframeholder').style.cssText = this._bakCssText1, this._bakAutoHeight && (t.autoHeightEnabled = !0, this.editor.enableAutoHeight()), document.documentElement.style.overflow = this._bakHtmlOverflow, document.body.style.overflow = this._bakBodyOverflow, t.iframe.parentNode.style.width = this._bakEditorContaninerWidth + 'px', window.scrollTo(0, this._bakScrollTop)
          }
          if (browser.gecko && t.body.contentEditable === 'true') {
            var a = document.createElement('input')
            document.body.appendChild(a), t.body.contentEditable = !1, setTimeout(function () {
              a.focus(), setTimeout(function () {
                t.body.contentEditable = !0, t.fireEvent('fullscreenchanged', e), t.selection.getRange().moveToBookmark(n).select(!0), baidu.editor.dom.domUtils.remove(a), e && window.scroll(0, 0)
              }, 0)
            }, 0)
          }
          t.body.contentEditable === 'true' && (this.editor.fireEvent('fullscreenchanged', e), this.triggerLayout())
        }
      },
      _updateFullScreen: function () {
        if (this._fullscreen) {
          var e = i.getViewportRect()
          if (this.getDom().style.cssText = 'border:0;position:absolute;left:0;top:' + (this.editor.options.topOffset || 0) + 'px;width:' + e.width + 'px;height:' + e.height + 'px;z-index:' + (1 * this.getDom().style.zIndex + 100), i.setViewportOffset(this.getDom(), {
            left: 0,
            top: this.editor.options.topOffset || 0
          }), this.editor.setHeight(e.height - this.getDom('toolbarbox').offsetHeight - this.getDom('bottombar').offsetHeight - (this.editor.options.topOffset || 0), !0), browser.gecko) {
            try {
              window.onresize()
            } catch (t) {}
          }
        }
      },
      _updateElementPath: function () {
        var e, t = this.getDom('elementpath')
        if (this.elementPathEnabled && (e = this.editor.queryCommandValue('elementpath'))) {
          for (var i, n = [], o = 0; i = e[o]; o++) n[o] = this.formatHtml('<span unselectable="on" onclick="$$.editor.execCommand(&quot;elementpath&quot;, &quot;' + o + '&quot;);">' + i + '</span>')
          t.innerHTML = '<div class="edui-editor-breadcrumb" onmousedown="return false;">' + this.editor.getLang('elementPathTip') + ': ' + n.join(' &gt; ') + '</div>'
        } else t.style.display = 'none'
      },
      disableElementPath: function () {
        var e = this.getDom('elementpath')
        e.innerHTML = '', e.style.display = 'none', this.elementPathEnabled = !1
      },
      enableElementPath: function () {
        var e = this.getDom('elementpath')
        e.style.display = '', this.elementPathEnabled = !0, this._updateElementPath()
      },
      _scale: function () {
        function e () {
          h = o.getXY(s), p || (p = a.options.minFrameHeight + d.offsetHeight + c.offsetHeight), m.style.cssText = 'position:absolute;left:0;display:;top:0;background-color:#41ABFF;opacity:0.4;filter: Alpha(opacity=40);width:' + s.offsetWidth + 'px;height:' + s.offsetHeight + 'px;z-index:' + (a.options.zIndex + 1), o.on(r, 'mousemove', t), o.on(l, 'mouseup', i), o.on(r, 'mouseup', i)
        }

        function t (e) {
          n()
          var t = e || window.event
          v = t.pageX || r.documentElement.scrollLeft + t.clientX, b = t.pageY || r.documentElement.scrollTop + t.clientY, y = v - h.x, C = b - h.y, y >= g && (f = !0, m.style.width = y + 'px'), C >= p && (f = !0, m.style.height = C + 'px')
        }

        function i () {
          f && (f = !1, a.ui._actualFrameWidth = m.offsetWidth - 2, s.style.width = a.ui._actualFrameWidth + 'px', a.setHeight(m.offsetHeight - c.offsetHeight - d.offsetHeight - 2, !0)), m && (m.style.display = 'none'), n(), o.un(r, 'mousemove', t), o.un(l, 'mouseup', i), o.un(r, 'mouseup', i)
        }

        function n () {
          browser.ie ? r.selection.clear() : window.getSelection().removeAllRanges()
        }
        var r = document,
          a = this.editor,
          s = a.container,
          l = a.document,
          d = this.getDom('toolbarbox'),
          c = this.getDom('bottombar'),
          u = this.getDom('scale'),
          m = this.getDom('scalelayer'),
          f = !1,
          h = null,
          p = 0,
          g = a.options.minFrameWidth,
          v = 0,
          b = 0,
          y = 0,
          C = 0,
          N = this
        this.editor.addListener('fullscreenchanged', function (e, t) {
          if (t) N.disableScale()
          else if (N.editor.options.scaleEnabled) {
            N.enableScale()
            var i = N.editor.document.createElement('span')
            N.editor.body.appendChild(i), N.editor.body.style.height = Math.max(o.getXY(i).y, N.editor.iframe.offsetHeight - 20) + 'px', o.remove(i)
          }
        }), this.enableScale = function () {
          a.queryCommandState('source') != 1 && (u.style.display = '', this.scaleEnabled = !0, o.on(u, 'mousedown', e))
        }, this.disableScale = function () {
          u.style.display = 'none', this.scaleEnabled = !1, o.un(u, 'mousedown', e)
        }
      },
      isFullScreen: function () {
        return this._fullscreen
      },
      postRender: function () {
        n.prototype.postRender.call(this)
        for (var e = 0; e < this.toolbars.length; e++) this.toolbars[e].postRender()
        var t, i = this,
          o = baidu.editor.dom.domUtils,
          r = function () {
            clearTimeout(t), t = setTimeout(function () {
              i._updateFullScreen()
            })
          }
        o.on(window, 'resize', r), i.addListener('destroy', function () {
          o.un(window, 'resize', r), clearTimeout(t)
        })
      },
      showToolbarMsg: function (e, t) {
        if (this.getDom('toolbarmsg_label').innerHTML = e, this.getDom('toolbarmsg').style.display = '', !t) {
          var i = this.getDom('upload_dialog')
          i.style.display = 'none'
        }
      },
      hideToolbarMsg: function () {
        this.getDom('toolbarmsg').style.display = 'none'
      },
      mapUrl: function (e) {
        return e ? e.replace('~/', this.editor.options.UEDITOR_HOME_URL || '') : ''
      },
      triggerLayout: function () {
        var e = this.getDom()
        e.style.zoom == '1' ? e.style.zoom = '100%' : e.style.zoom = '1'
      }
    }, t.inherits(e, baidu.editor.ui.UIBase)
    var a = {}
    UE.ui.Editor = function (i) {
      var n = new UE.Editor(i)
      n.options.editor = n, t.loadFile(document, {
        href: n.options.themePath + n.options.theme + '/css/ueditor.css',
        tag: 'link',
        type: 'text/css',
        rel: 'stylesheet'
      })
      var r = n.render
      return n.render = function (i) {
        i.constructor === String && (n.key = i, a[i] = n), t.domReady(function () {
          function t () {
            if (n.setOpt({
              labelMap: n.options.labelMap || n.getLang('labelMap')
            }), new e(n.options), i && (i.constructor === String && (i = document.getElementById(i)), i && i.getAttribute('name') && (n.options.textarea = i.getAttribute('name')), i && /script|textarea/gi.test(i.tagName))) {
              var t = document.createElement('div')
              i.parentNode.insertBefore(t, i)
              var a = i.value || i.innerHTML
              n.options.initialContent = /^[\t\r\n ]*$/.test(a) ? n.options.initialContent : a.replace(/>[\n\r\t]+([ ]{4})+/g, '>').replace(/[\n\r\t]+([ ]{4})+</g, '<').replace(/>[\n\r\t]+</g, '><'), i.className && (t.className = i.className), i.style.cssText && (t.style.cssText = i.style.cssText), /textarea/i.test(i.tagName) ? (n.textarea = i, n.textarea.style.display = 'none') : i.parentNode.removeChild(i), i.id && (t.id = i.id, o.removeAttributes(i, 'id')), i = t, i.innerHTML = ''
            }
            o.addClass(i, 'edui-' + n.options.theme), n.ui.render(i)
            var s = n.options
            n.container = n.ui.getDom()
            for (var l, d = o.findParents(i, !0), c = [], u = 0; l = d[u]; u++) c[u] = l.style.display, l.style.display = 'block'
            if (s.initialFrameWidth) s.minFrameWidth = s.initialFrameWidth
            else {
              s.minFrameWidth = s.initialFrameWidth = i.offsetWidth
              var m = i.style.width;
              /%$/.test(m) && (s.initialFrameWidth = m)
            }
            s.initialFrameHeight ? s.minFrameHeight = s.initialFrameHeight : s.initialFrameHeight = s.minFrameHeight = i.offsetHeight
            for (var l, u = 0; l = d[u]; u++) l.style.display = c[u]
            i.style.height && (i.style.height = ''), n.container.style.width = s.initialFrameWidth + (/%$/.test(s.initialFrameWidth) ? '' : 'px'), n.container.style.zIndex = s.zIndex, r.call(n, n.ui.getDom('iframeholder')), n.fireEvent('afteruiready')
          }
          n.langIsReady ? t() : n.addListener('langReady', t)
        })
      }, n
    }, UE.getEditor = function (e, t) {
      var i = a[e]
      return i || (i = a[e] = new UE.ui.Editor(t), i.render(e)), i
    }, UE.delEditor = function (e) {
      var t;
      (t = a[e]) && (t.key && t.destroy(), delete a[e])
    }, UE.registerUI = function (e, i, n, o) {
      t.each(e.split(/\s+/), function (e) {
        UE._customizeUI[e] = {
          id: o,
          execFn: i,
          index: n
        }
      })
    }
  }()), UE.registerUI('message', function (e) {
    function t () {
      var e = a.ui.getDom('toolbarbox')
      e && (i.style.top = e.offsetHeight + 3 + 'px'), i.style.zIndex = Math.max(a.options.zIndex, a.iframe.style.zIndex) + 1
    }
    var i, n = baidu.editor.ui,
      o = n.Message,
      r = [],
      a = e
    a.addListener('ready', function () {
      i = document.getElementById(a.ui.id + '_message_holder'), t(), setTimeout(function () {
        t()
      }, 500)
    }), a.addListener('showmessage', function (e, n) {
      n = utils.isString(n) ? {
        content: n
      } : n
      var s = new o({
          timeout: n.timeout,
          type: n.type,
          content: n.content,
          keepshow: n.keepshow,
          editor: a
        }),
        l = n.id || 'msg_' + (+new Date()).toString(36)
      return s.render(i), r[l] = s, s.reset(n), t(), l
    }), a.addListener('updatemessage', function (e, t, n) {
      n = utils.isString(n) ? {
        content: n
      } : n
      var o = r[t]
      o.render(i), o && o.reset(n)
    }), a.addListener('hidemessage', function (e, t) {
      var i = r[t]
      i && i.hide()
    })
  }), UE.registerUI('autosave', function (e) {
    var t = null,
      i = null
    e.on('afterautosave', function () {
      clearTimeout(t), t = setTimeout(function () {
        i && e.trigger('hidemessage', i), i = e.trigger('showmessage', {
          content: e.getLang('autosave.success'),
          timeout: 2e3
        })
      }, 2e3)
    })
  })
}())
