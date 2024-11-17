"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[4930,6403],{9701:e=>{function t(e){!function(e){function t(e,t){return"___"+e.toUpperCase()+t+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(n,a,r,i){if(n.language===a){var o=n.tokenStack=[];n.code=n.code.replace(r,(function(e){if("function"===typeof i&&!i(e))return e;for(var r,s=o.length;-1!==n.code.indexOf(r=t(a,s));)++s;return o[s]=e,r})),n.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(n,a){if(n.language===a&&n.tokenStack){n.grammar=e.languages[a];var r=0,i=Object.keys(n.tokenStack);!function o(s){for(var g=0;g<s.length&&!(r>=i.length);g++){var l=s[g];if("string"===typeof l||l.content&&"string"===typeof l.content){var u=i[r],p=n.tokenStack[u],c="string"===typeof l?l:l.content,f=t(a,u),d=c.indexOf(f);if(d>-1){++r;var k=c.substring(0,d),E=new e.Token(a,e.tokenize(p,n.grammar),"language-"+a,p),m=c.substring(d+f.length),S=[];k&&S.push.apply(S,o([k])),S.push(E),m&&S.push.apply(S,o([m])),"string"===typeof l?s.splice.apply(s,[g,1].concat(S)):l.content=S}}else l.content&&o(l.content)}return s}(n.tokens)}}}})}(e)}e.exports=t,t.displayName="markupTemplating",t.aliases=[]},8817:(e,t,n)=>{var a=n(9701);function r(e){e.register(a),function(e){e.languages.tt2=e.languages.extend("clike",{comment:/#.*|\[%#[\s\S]*?%\]/,keyword:/\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|SWITCH|TAGS|THROW|TRY|UNLESS|USE|WHILE|WRAPPER)\b/,punctuation:/[[\]{},()]/}),e.languages.insertBefore("tt2","number",{operator:/=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|not|or)\b/,variable:{pattern:/\b[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*\b/i}}),e.languages.insertBefore("tt2","keyword",{delimiter:{pattern:/^(?:\[%|%%)-?|-?%\]$/,alias:"punctuation"}}),e.languages.insertBefore("tt2","string",{"single-quoted-string":{pattern:/'[^\\']*(?:\\[\s\S][^\\']*)*'/,greedy:!0,alias:"string"},"double-quoted-string":{pattern:/"[^\\"]*(?:\\[\s\S][^\\"]*)*"/,greedy:!0,alias:"string",inside:{variable:{pattern:/\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i}}}}),delete e.languages.tt2.string,e.hooks.add("before-tokenize",(function(t){e.languages["markup-templating"].buildPlaceholders(t,"tt2",/\[%[\s\S]+?%\]/g)})),e.hooks.add("after-tokenize",(function(t){e.languages["markup-templating"].tokenizePlaceholders(t,"tt2")}))}(e)}e.exports=r,r.displayName="tt2",r.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_tt2.360bc4fc.chunk.js.map