export function loggerDecorator(fn, level = "INFO") {
  return async function (...args) {
    const start = performance.now();

    console.log(`[${level}] Function started`);
    console.log("Arguments:", args);

    try {
      const result = await fn(...args);

      console.log(`[${level}] Function result:`, result);

      const end = performance.now();

      console.log(`[${level}] Execution time: ${(end - start).toFixed(2)} ms`);

      return result;
    } catch (error) {
      console.error("[ERROR]", error);

      throw error;
    }
  };
}
