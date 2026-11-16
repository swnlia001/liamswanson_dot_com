(function () {
  var stack = document.querySelector('.ecg-stack');
  if (!stack) return;

  var LENGTH = 2000; // long enough to fill a side column on wide screens
  var PERIOD = 100;  // one heartbeat

  // One beat starting at x = o, on a baseline of y = 20.
  function beat(o) {
    return ' H' + (o + 10) + ' C' + (o + 14) + ' 12 ' + (o + 22) + ' 12 ' + (o + 26) + ' 20' +
      ' H' + (o + 34) + ' L' + (o + 38) + ' 24 L' + (o + 44) + ' 2 L' + (o + 50) + ' 34 L' + (o + 54) + ' 20' +
      ' H' + (o + 62) + ' C' + (o + 68) + ' 10 ' + (o + 80) + ' 10 ' + (o + 86) + ' 20' +
      ' H' + (o + PERIOD);
  }

  // Repeated beats from `start` until the trace covers LENGTH.
  function buildTrace(start) {
    var d = 'M0 20' + (start ? ' H' + start : '');
    for (var o = start; o < LENGTH; o += PERIOD) d += beat(o);
    return d;
  }

  // Left trace ends exactly at the text; right trace starts with a short flat lead.
  [['.ecg-left', 0], ['.ecg-right', 14]].forEach(function (item) {
    var svg = stack.querySelector(item[0]);
    if (!svg) return;
    svg.setAttribute('viewBox', '0 0 ' + LENGTH + ' 40');
    svg.querySelector('path').setAttribute('d', buildTrace(item[1]));
  });

  // Clone the row so the next sweep starts while the previous one is still
  // being erased (timing is set by --offset in css/styles.css).
  var row = stack.querySelector('.ecg-row');
  var copy = row.cloneNode(true);
  copy.classList.add('ecg-row-next');
  copy.setAttribute('aria-hidden', 'true');
  stack.appendChild(copy);
})();
