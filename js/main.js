// Clone the ECG row so the next sweep starts while the previous one is still
// being erased (timing is set by --offset in css/styles.css).
(function () {
  var stack = document.querySelector('.ecg-stack');
  if (!stack) return;

  var row = stack.querySelector('.ecg-row');
  var copy = row.cloneNode(true);
  copy.classList.add('ecg-row-next');
  copy.setAttribute('aria-hidden', 'true');
  stack.appendChild(copy);
})();
