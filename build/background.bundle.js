(()=>{"use strict";var e={p:"/"};e.p,e.p;var t={};chrome.runtime.onConnect.addListener((function(e){var n=function(n,o,s){var a=n.type,r=n.tabId;"init"!=a||(t[r]=e)};e.onMessage.addListener(n),e.onDisconnect.addListener((function(e){e.onMessage.removeListener(n);for(var o=Object.keys(t),s=0,a=o.length;s<a;s++)if(t[o[s]]==e){delete t[o[s]];break}}))})),chrome.runtime.onMessage.addListener((function(e,n,o){console.log("request",e);var s=e.isToContent,a=e.tabId,r=e.info;if(s&&chrome.tabs.sendMessage(a,r,(function(e){console.log("response from content",e),t[a].postMessage({type:r.type,info:e})})),"copy"===r.type){var c=document.getElementById("app-textarea");c.value=r.data,c.select(),document.execCommand("copy"),t[a].postMessage({type:r.type,info:""})}}))})();