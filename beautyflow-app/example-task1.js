import { offerGenerator, consumeIteratorWithTimeout } from "beautyflow-library";

const iterator = offerGenerator();

consumeIteratorWithTimeout(iterator, 3, (item) => {
  console.log(
    `Iteration: ${item.iteration}, Time: ${item.time}, Offer: ${item.value}`,
  );
});
