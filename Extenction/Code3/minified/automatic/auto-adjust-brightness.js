function changeBrightness(e){document.querySelector("body").style.filter=`brightness(${e})`}var initDegree=100;const calculate_decreasement=(e,t)=>36e5*t/e;window.addEventListener("DOMContentLoaded",function(){setInterval(()=>{initDegree<=40||(changeBrightness(`${initDegree-=1}%`),console.log("%c BIPA watchs after you! the brightness of this page decreased.","background: #e8b3d0; color: #080808"))},calculate_decreasement(40,2))});

// todo
// reduce glare

// todo
// health care clock

// todo
// warn 20.20.20 rule

// todo
// add scale and standard coloring
