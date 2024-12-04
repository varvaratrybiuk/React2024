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
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Симуляція затримки
        const cards = loadUserCards();
        console.log("я ЗАВАНТАЖУЮ");
        return cards;
      } catch (error) {
        throw error.message;
      }
    }),
    addCardAction: fromPromise(async ({ input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляція затримки
        addCard(input.cardField);
        return "Card added successfully";
      } catch (error) {
        throw error.message;
      }
    }),
    deleteCardAction: fromPromise(async ({ input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляція затримки
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
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWA7AhugxmAKgE6Y4DWYhAdADYD2mEGUAwpoRLAMQS3piUYAbrXI16EVu1gBtAAwBdRKAAOtWKgAuqXkpAAPRAEYAzMYDslAByGATAFYAbDcuzZDhwBYHAGhABPRGMHQ0pZO0tzWQBOKOMPWQ8PAF8k3zQsXAJiMgoxBiZJDk4KQloqZWpMDWQygFs8iTYOOUUkEFV1LR02gwRDaLsre1kbDzMzQyiTXwCEYyjZUNGYj1HjQwcElLSMbDwiEnIqHCbYABlxSE4AZQBRM9vmfAB9ZgBBACUAERbdDs1tOhdL0TB4QkF7OZHJYHC4bDNENZKMZXK55nZRuFgtsQOk9llDrkTlILgwrm8vl9Xp8fgo-moAd1QCD3DZKGYnOMEsY7JF4f5EDZjJZKPEIjY3B4onYxqscXjMgccsdTqSIFc9LANFV+JhkBoKAAKfqogCUnAV+2yR0oxI4asgvza-y6QJ6RgxIWhUzMNmWPI8CL6plCZilZksUQc40mdnlu0V1tysDA1DAOC06BYTU4FKptwAGgAFW4AOTuTpUDNdwMFtkojlGDgWqw2hksQfig3MUpili8Ng5ZjjqVxCathKoKbTGYKOa+91u+Fu1O+lfa1cBtYQNnrja8Ld3wQ7AoQdn6lGjdlktlkQUMdkc8YyE+VlAYjCzhW4vH4QhEuoQI07Dri6W7un0YYeFYaIODybhmKYZhBhigyPhEkwuF45hRM++JKjaH5zuwxSEKU5SVNUdTvkBhSgZuTL6EYYYOJQJgRjYniWBiozIaehheKE4QoliUy2P2eGJpONGflAtx6MoYDoCmP58AI6DCKIH7yYpylgPRnTgcyiLzJQg5SnEu4JHeJ6zK2oRTNG5iGEOUSWJJr6EUBTA6UpKklGUlAVFUNSEPU2kKX5+l0s6DFusZCARFEZlhrErbWcKQYSiEDjXq4kyxBCHjuaOloEm+6pppm2YkTwan-qIlVgAadExVWhmMb0SUpRZ6XxJlp7nmyLlSv2HjzLl1geeVNp0PkX6nJwmraga776kaJquOaZUEbkc2yYUMhtRuHXxUxfS3g2qIbBKThpUGcTGMiyw+sKYJhiko7oLQ6rwG0O1JoQ9KnduAC0PinqDgwxDDsNw8Y027VQ+3ERwwOMmdIIjE9ERhsOsQLDKhidpYFhQq4CxCnYURSskpXjjNRKqpcEDozWEEPtEbHXgJmy8vMlj8rMQqLKsvY9tYROI4DlDTum1WFGzRnnasnYxFYsPjdEmx3tL0lEQt7BK51RgLKxdjDkE4zjI4WUPmxsgYRyQRubCetvgbcmRXpxuY4g144+Ld5RtKUR8bMwpsrIqVRhEznYvTL6M1QTUK00vvbteyU3a2SXDiTZPDhT2PUyOKRAA */
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

        ADD_CARD: {
          target: "addingCard",
          guard: "isCardValid",
        },
      },
    },

    selectingCard: {
      on: {
        ADD_EXPENSE: {
          target: "addingExpense",
          guard: "isExpenseValid",
        },
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
