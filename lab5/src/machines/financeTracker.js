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
        return cards;
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    addCardAction: fromPromise(async ({ input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляція затримки
        addCard(input.cardField);
        return "Card added successfully";
      } catch (error) {
        throw new Error(error.message);
      }
    }),
    deleteCardAction: fromPromise(async ({ input }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Симуляція затримки
        deleteCard(input.cardId);
        return "Card deleted successfully";
      } catch (error) {
        throw new Error(error.message);
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
        throw new Error(error.message);
      }
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWA7AhugxmAKgE6Y4DWYhAdADYD2mEGUAwpoRLAMQS3piUYAbrXI16EVu1gBtAAwBdRKAAOtWKgAuqXkpAAPRAA4AnLMrGAbACYALAHYLd0wFYAjLJsAaEAE9ENgGZnSjtZQytLYwCrALtQmwBfBO80LFwCYjIKMQYmSQ5OCkJaKmVqTA1kEoBbHIk2DjlFJBBVdS0dFoMECxtDczsbY2dnY2NXK0MAw28-BGizIbGo2VdhmMTkkFTsPCISciocBtgAGXFITgBlAFFTm+Z8AH1mAEEAJQARJt02zW10LpuhMguYJn13IZnHFZFZZoheq5KDYbK4LL1nJMURZnEkUhhdhkDtljlJzgxLq9Pp8Xh9vgpfmp-p1QN1xsZKK5BlE7IZUejjHZ4QgrLIzK4lsYbM5DLzQs5Nvi0ntModKLAwNQwDgtOgWA1OFSaTcABoABRuADlbj8Wn8OoCuogQcFxrZDJDoaE4b5EA4bJQrDKAiiArILCYAnjtgT0vsslQNVqdXkDZ87jd8DdaV9bSomQ6gc7nBYzIZZTZrLIAr1jIYLMK7CXOU2xTXeWtLNGdnHVdkGIw9fluLx+EIRPwB-k860CwCi-NjFZkbYokFVqF0cKAsNzEtYqirK5XKNu7GVcSqAPU+xCoRiqVypUapQpw0Z-b507F8ubKuAuuXLhg2vo9GKgZhNEOLHq4HoWGeypEgmr4QIOUA3HoyhgOgGojnwAjoMIogDhhWE4WAH5ziy+iIDuv7-oBm4gXMKLLrWdZipYQwnghhLxmq156qR2G4UUJSUGUFRVIQtQkZhIkUQydpUY6rK0UuK5DABzgbsBwq9BY5iQdMorHn+UZbD2F7IRAmpgLq+q3jw+HjqItlahoYDTkp+btF+akICepaUOWgxVjWQz1sKHqBsswwmAq9iorxvaXpQ7n2TeEB3g+ElPtJtQZZ53nNL5zKqTRgUlsuVirqYtjONEcTCpiy6jGiOJTKWGxJFs6C0LZ8AtFZSGHIyfnUd0AC0zGIFNrpxYtyx2FYKXWWqdC5EOJzjeVC7QoZdaDAB1auNMsrCqidghUsdgTLVUKwmto0kic5K2RAu2Ft+kI1csNZhBK3r6QByLBjWooehMrjPfx2RJtqDn5F9-mVRKsjBNEQzgyi4xeKBTaGVYrarBGEoojDlnni9V6oVlKOTUY13QlpEprFYFhRDMoE1v07FuLB4R0YqMaIXDtNocJ5EMxV3R-vptiUKWUwRE1OmU0qfF9lQRX08pE2y86gzXXdthxKECwRo2EwhHFThnQEZ29QkQA */
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
          target: "loadingCards",
          actions: assign({
            errorMessage: ({ event }) => event.data,
          }),
        },
      },
    },

    cardsLoaded: {
      on: {
        SELECT_CARD: {
          target: "selectingCard",
        },

        ADD_CARD: "addingCard",
      },
    },

    selectingCard: {
      on: {
        ADD_EXPENSE: "addingExpense",
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
          target: "cardsLoaded",
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
          target: "cardsLoaded",
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
          target: "cardsLoaded",
        },
      },
    },
  },
});
