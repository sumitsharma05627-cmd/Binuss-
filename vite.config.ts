import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function suppressHmrPlugin(): Plugin {
  return {
    name: 'suppress-hmr-websocket',
    enforce: 'pre',
    transformIndexHtml: {
      order: 'pre',
      handler() {
        return [
          {
            tag: 'script',
            injectTo: 'head-prepend',
            children: `
              (function() {
                if (typeof window === 'undefined') return;
                function DummyWebSocket(url, protocols) {
                  this.url = url;
                  this.protocols = protocols;
                  this.readyState = 1;
                  this.bufferedAmount = 0;
                  this.extensions = '';
                  this.protocol = Array.isArray(protocols) ? protocols[0] || '' : (protocols || '');
                  this.binaryType = 'blob';
                  var listeners = {};
                  this.addEventListener = function(t, l) { if (!listeners[t]) listeners[t] = []; listeners[t].push(l); };
                  this.removeEventListener = function(t, l) { if (!listeners[t]) return; listeners[t] = listeners[t].filter(function(x){ return x !== l; }); };
                  this.dispatchEvent = function(e) {
                    var list = listeners[e.type] || [];
                    for (var i = 0; i < list.length; i++) { try { list[i].call(this, e); } catch(err){} }
                    if (typeof this['on' + e.type] === 'function') { try { this['on' + e.type].call(this, e); } catch(err){} }
                    return true;
                  };
                  this.send = function() {};
                  this.close = function() { this.readyState = 3; };
                  var self = this;
                  setTimeout(function() { if (self.readyState === 1) self.dispatchEvent({ type: 'open', target: self }); }, 0);
                }
                DummyWebSocket.CONNECTING = 0; DummyWebSocket.OPEN = 1; DummyWebSocket.CLOSING = 2; DummyWebSocket.CLOSED = 3;
                try { Object.defineProperty(window, 'WebSocket', { value: DummyWebSocket, writable: true, configurable: true }); }
                catch(e) { window.WebSocket = DummyWebSocket; }
                var origConsoleError = console.error;
                console.error = function() {
                  var args = Array.prototype.slice.call(arguments);
                  var msg = args.map(function(a) { return (a && a.message) ? a.message : String(a); }).join(' ');
                  if (msg.indexOf('[vite] failed to connect to websocket') !== -1 || msg.indexOf('WebSocket closed without opened') !== -1 || (msg.indexOf('WebSocket') !== -1 && msg.indexOf('failed') !== -1)) return;
                  return origConsoleError.apply(console, arguments);
                };
                window.addEventListener('unhandledrejection', function(e) {
                  var reason = e && (e.reason || e);
                  var msg = (reason && reason.message) ? reason.message : String(reason);
                  if (msg.indexOf('WebSocket') !== -1 || msg.indexOf('websocket') !== -1 || msg.indexOf('failed to connect') !== -1) {
                    e.preventDefault();
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                  }
                }, true);
                window.addEventListener('error', function(e) {
                  var msg = e && (e.message || (e.error && e.error.message)) ? (e.message || e.error.message) : '';
                  if (msg.indexOf('WebSocket') !== -1 || msg.indexOf('websocket') !== -1 || msg.indexOf('failed to connect') !== -1) {
                    e.preventDefault();
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                  }
                }, true);
              })();
            `
          }
        ];
      }
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [suppressHmrPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        '@vercel/speed-insights/next': path.resolve(__dirname, 'node_modules/@vercel/speed-insights/dist/react/index.mjs'),
      },
    },
    server: {
      hmr: false,
      watch: null,
    },
  };
});
