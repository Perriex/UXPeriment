function highlightRegex(e){let t=document.querySelector("body"),n=[],l=document.createTreeWalker(t,NodeFilter.SHOW_TEXT);for(;l.nextNode();){let r=l.currentNode,o=RegExp(e,"ig").exec(r.textContent);o&&n.push({node:r,matches:o})}n.forEach(({node:e,matches:t})=>{let n=document.createElement("span"),l=0;t.forEach(t=>{let r=e.textContent.indexOf(t,l),o=e.textContent.substring(l,r),i=e.textContent.substr(r,t.length);o&&n.appendChild(document.createTextNode(o));let c=document.createElement("span");c.textContent=i,c.style.backgroundColor="yellow",c.style.color="black",c.className="BIPA-find-regex",n.appendChild(c),l=r+t.length});let r=e.textContent.substring(l);r&&n.appendChild(document.createTextNode(r)),e.replaceWith(n)})}document.addEventListener("keydown",function(e){if(e.ctrlKey&&("["===e.key||"ج"===e.key)){highlightRegex(prompt("BIPA: Type here"));let t=document.querySelectorAll(".BIPA-find-regex")[0];t&&t.scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"})}}),document.addEventListener("keydown",function(e){if(e.ctrlKey&&("]"===e.key||"چ"===e.key)){let t=document.querySelectorAll(".BIPA-find-regex");t.forEach(e=>{e.style={},e.classList.remove("BIPA-find-regex")})}});