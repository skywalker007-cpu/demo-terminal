"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[6814],{7389:e=>{function r(e){!function(e){for(var r=/"(?:\\.|[^\\"\r\n])*"|'(?:\\.|[^\\'\r\n])*'/.source,t=/\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))*\*\//.source,n=/(?:[^\\()[\]{}"'/]|<string>|\/(?![*/])|<comment>|\(<expr>*\)|\[<expr>*\]|\{<expr>*\}|\\[\s\S])/.source.replace(/<string>/g,(function(){return r})).replace(/<comment>/g,(function(){return t})),a=0;a<2;a++)n=n.replace(/<expr>/g,(function(){return n}));n=n.replace(/<expr>/g,"[^\\s\\S]"),e.languages.qml={comment:{pattern:/\/\/.*|\/\*[\s\S]*?\*\//,greedy:!0},"javascript-function":{pattern:RegExp(/((?:^|;)[ \t]*)function\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*\(<js>*\)\s*\{<js>*\}/.source.replace(/<js>/g,(function(){return n})),"m"),lookbehind:!0,greedy:!0,alias:"language-javascript",inside:e.languages.javascript},"class-name":{pattern:/((?:^|[:;])[ \t]*)(?!\d)\w+(?=[ \t]*\{|[ \t]+on\b)/m,lookbehind:!0},property:[{pattern:/((?:^|[;{])[ \t]*)(?!\d)\w+(?:\.\w+)*(?=[ \t]*:)/m,lookbehind:!0},{pattern:/((?:^|[;{])[ \t]*)property[ \t]+(?!\d)\w+(?:\.\w+)*[ \t]+(?!\d)\w+(?:\.\w+)*(?=[ \t]*:)/m,lookbehind:!0,inside:{keyword:/^property/,property:/\w+(?:\.\w+)*/}}],"javascript-expression":{pattern:RegExp(/(:[ \t]*)(?![\s;}[])(?:(?!$|[;}])<js>)+/.source.replace(/<js>/g,(function(){return n})),"m"),lookbehind:!0,greedy:!0,alias:"language-javascript",inside:e.languages.javascript},string:{pattern:/"(?:\\.|[^\\"\r\n])*"/,greedy:!0},keyword:/\b(?:as|import|on)\b/,punctuation:/[{}[\]:;,]/}}(e)}e.exports=r,r.displayName="qml",r.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_qml.4b29acfe.chunk.js.map