export async function consumeIteratorWithTimeout(
  iterator,
  seconds,
  callback,
  shouldContinue,
) {
  const endTime = Date.now() + seconds * 1000;
  let iteration = 0;

  while (Date.now() < endTime) {
    if (!shouldContinue()) {
      break;
    }

    const { value } = iterator.next();
    iteration++;

    callback(value, iteration);

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}
