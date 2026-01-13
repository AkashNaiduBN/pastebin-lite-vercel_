export function nowMs(req) {
  if (process.env.TEST_MODE === "1") {
    const h = req.headers.get("x-test-now-ms");
    if (h) return parseInt(h, 10);
  }
  return Date.now();
}
