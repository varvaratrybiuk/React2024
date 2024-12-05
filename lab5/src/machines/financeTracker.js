import { assign, fromPromise, setup } from "xstate";

import {
  loadUserCards,
  addCard,
  deleteCard,
  addExpense,
} from "../services/cardOperations";
export const financeTrackerMachine = setup({
  actors: {
    loadCardsAction: fromPromise(async () => {
      try {
        console.log("Завантаження карток");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Симуляція затримки
        // throw new Error("Завантаження не вдалося");
        const cards = loadUserCards();
        return cards;
      } catch (error) {
        throw error.message;
      }
    }),
    addCardAction: fromPromise(async ({ input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляція затримки
        console.log("Я тут в додаванні");
        // throw new Error("Ой щось пішло не так при додаванні");
        addCard(input.cardField);
        return "Card added successfully";
      } catch (error) {
        throw error.message;
      }
    }),
    deleteCardAction: fromPromise(async ({ input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляція затримки
        //throw new Error("Видалення не вдалося.");
        deleteCard(input.cardId);
        return "Card deleted successfully";
      } catch (error) {
        throw error.message;
      }
    }),
    addExpenseAction: fromPromise(async ({ input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляція затримки
        addExpense(
          input.expenseField.amount,
          input.expenseField.description,
          input.expenseField.cardId
        );
        return "Expense added successfully";
      } catch (error) {
        throw error.message;
      }
    }),
  },
  guards: {
    isCardValid: ({ context }) => context.cardField.title !== "",
    isExpenseValid: ({ event }) => event.amount > 0,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWA7AhugxmAKgE6Y4DWYhAdADYD2mEGUAwpoRLAMQS3piUYAbrXI16EVu1gBtAAwBdRKAAOtWKgAuqXkpAAPRAEYAbACZTlAByWA7ABYArKYc2bAThumANCACeiAGY3Q0o3YLNZYwc3WyiAXzifNCxcAmIyCjEGJkkOTgpCWiplakwNZCKAWyyJNg45RSQQVXUtHSaDBEMAywcrMOtbZ2C7AJ9-BFM3C2NZh2M3O1tZa3sEpIxsPCISciocOtgAGXFITgBlAFEjy+Z8AH1mAEEAJQARBt0WzW10XU7DDZDJZQoZTEtIp5nGM-IhLKYAqF7LFbNYFusQMktmldpkDlITgwzk83m9Hq8Pgovmofu1QACzBZVo5nK4PN5YQhLCEpmEbCtjJYIuYMVjUjsMvtDoSIMTSeT3tJDI0VDS2n8OkZLMFKAsBgEzMY7IDjONEEbEcZ7PZplNZC47KLNuL0ntKLAwNQwDgtOgWHVOCSyZcABoABUuADkrp8mt91f9EOYLPMEQ5oqYFqYbGaEPNZEiltnAbI3D03E6UttXZkPV6fTkA0H7qGI9HLkqVc01b9E5NzJRUwF09MsznOfzLeD4YZjUsHLJTJXsRK3XXvb7-exOG9rpd8JcFZSu-He5r+ymzMOM2Pc0E3JRSzEYtaHENly7cVQGIw-bluLw-BCCI-A-rksaqq0Z70nC2qUNmdgjIslgBM4uamLIIRGmEgI2MYsgrGES6JJizrVl+lA-o224FEUlAlGUFSENUYF1BB3ZQXS+iwQ+CFIUsqEOOhbh9LIiFuEaDh2PhQSRB+5GSpREC-lAlx6MoYDoB6AF8AI6DCKIP5qRpWlgOxp5cZ01i8Tas7IYJuYuMYuojA4ASAt0sgGvJOKKVRfrGZp2m0cUpTlFUSkQIFpnmT2lk8fBtmIQJaGcksdiUAExrzA4s52CyKE+aumSyl6m7-jwunAaIpVgBoYDgVScZxRqMFcnBfF2SlQmctOmWIdY0kiQEskBEVNZULV5UBiF9FhUx1RTQ1bFNZBtKtdx7U2YhXUoalExBCEOHzHYGGmIYuXjRRhB1YQvicC8+4vAAmrFnEbQChhlo+AT2KM+Umgad5uAWO34XYXlSTONgJCR6C0LK8BNGKCl7NS719gAtKanLY4+BEE4TBPnVdil0Nkf6HOj619t03SggiqwYZYkQ4wdIOPiYLhiVMslGqTbr4hwMqQNTCbnl9oyZTa1gLgiCy5gsIK-UsRriXyhgC7WnobtREBi9Bm2nbm3IZYudg2Nq7mOLOlha9+yl6wb8V5vYlCnTtoyyGyozofy7thMEQJltENgOPbkVMNFHrOx9iBuYiljiYYYnSVJImOb9urIllKcW8HEdTU7zUY+eUkFmWqHGp4f2YXeYeUO4YT2oKs4YYCEc3Rod2x7T3uJyrxqoR5NgwhMQ-u1zYTRMY3Rh7DcRAA */
  id: "financeTracker",
  initial: "loadingCards",
  context: {
    errorMessage: "",
    cardsHolder: [],
    cardId: "",
    cardField: {},
    expenseField: {},
  },
  states: {
    loadingCards: {
      invoke: {
        id: "loadCards",
        src: "loadCardsAction",
        onDone: {
          target: "cardsLoaded",
          actions: assign({
            cardsHolder: ({ event }) => event.output,
          }),
        },
        onError: {
          target: "retry",
          actions: assign({
            errorMessage: ({ event }) => event.error,
          }),
        },
      },
    },

    cardsLoaded: {
      on: {
        SELECT_CARD: {
          target: "selectingCard",
        },

        ADD_CARD: [
          {
            guard: "isCardValid",
            target: "addingCard",
          },
          { target: "cardsLoaded" },
        ],
      },
    },

    selectingCard: {
      on: {
        ADD_EXPENSE: [
          {
            guard: "isExpenseValid",
            target: "addingExpense",
          },
          { target: "cardsLoaded" },
        ],
        DELETE_CARD: "deletingCard",
      },
    },

    addingCard: {
      invoke: {
        id: "addCard",
        src: "addCardAction",
        input: ({ event }) => ({
          cardField: {
            title: event.card.title,
            currency: event.card.currency,
            cardColor: event.card.cardColor,
          },
        }),
        onDone: {
          target: "loadingCards",
        },
        onError: {
          target: "retry",
          actions: assign({
            errorMessage: ({ event }) => event.error,
          }),
        },
      },
    },

    addingExpense: {
      invoke: {
        id: "addExpense",
        src: "addExpenseAction",
        input: ({ event }) => ({
          expenseField: {
            amount: event.amount,
            description: event.description,
            cardId: event.cardId,
          },
        }),
        onDone: {
          target: "loadingCards",
        },
        onError: {
          target: "retry",
          actions: assign({
            errorMessage: ({ event }) => event.error,
          }),
        },
      },
    },
    deletingCard: {
      invoke: {
        id: "deleteCard",
        src: "deleteCardAction",
        input: ({ event }) => ({ cardId: event.cardId }),

        onDone: {
          target: "loadingCards",
        },
        onError: {
          target: "retry",
          actions: assign({
            errorMessage: ({ event }) => event.error,
          }),
        },
      },
    },
    retry: {
      on: {
        RETRY: {
          target: "loadingCards",
          actions: assign({
            errorMessage: () => "",
          }),
        },
      },
    },
  },
});
