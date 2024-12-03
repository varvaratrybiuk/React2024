

export const cardsLoader = async (financeTrackerActor) => {
  financeTrackerActor.start();
  const card = await new Promise((resolve) => {
    financeTrackerActor.subscribe((snapshot) => {
      resolve(snapshot.context.cardsHolder);
    });
  });
  return card;
};
