self.onmessage = function (event) {
  const code = event.data;
  const logs = [];

  // Override console.log inside Worker
  console.log = function (...args) {
    logs.push(args.join(" "));
    // Don't call original console.log anymore!
  };

  try {
    eval(code);
    postMessage({ logs });
  } catch (error) {
    postMessage({ error: error.message, logs });
  }
};
