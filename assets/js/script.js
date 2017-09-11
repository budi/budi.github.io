'use strict';
var l = document.links;
var i = 0;
for (l; l[i]; i++) {
  if (l[i].host !== location.host) {
    l[i].target = '_blank';
  }
}
document.getElementById('navigation-link').onclick = function(e) {
  e.preventDefault();
  document.getElementById('navigation-wrap').classList.toggle('active');
};
