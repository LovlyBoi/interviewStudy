onconnect = function(e) {
    var port = e.ports[0];

    port.addEventListener('message', function(e) {
      var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
    //   port.postMessage(workerResult);
    console.log("workResult", workerResult, e);
    });

    port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}