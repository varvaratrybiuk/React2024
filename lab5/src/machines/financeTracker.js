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
  /** @xstate-layout N4IgpgJg5mDOIC5QDMCWA7AhugxmAKgE6Y4DWYhAdADYD2mEGUAwpoRLAMQS3piUYAbrXI16EVu1gBtAAwBdRKAAOtWKgAuqXkpAAPRAEYAzAA4A7JVOGATOZsA2AKwBOFw4AsH4wBoQAT0RnQ0pZMNlTUwdzJycPJxsAX0S-NCxcAmIyCjEGJkkOTgpCWiplakwNZFKAW1yJNg45RSQQVXUtHVaDBBMLK1t7ZzdPbz9AhGNoymcw82iwmy8XZNSMbDwiEnIqHEbYABlxSE4AZQBRA-PmfAB9ZgBBACUAEWbdds1tdF0ekxcQlNjLIbLIHMYPO5xohzN5KMYnGEHBZPLDYqsQGkNpltjk9lIjgwTg8Xi97s83goPmovl1QH9TGDKIZbKYbADjFNzPZoQhYcZ4YjZE5DJDjIYIhisRkttldvtCRBiaTya9pIYWioaZ0ft0jLEPMzEV5OYZkfEbLzkaZKLC3MZzIzPKCkilMesZVkdpRYGBqGAcFp0CxGpwSWTzgANAAK5wAchd3q1PjrfogbBnKE4HDYRbJzPmlqYPA5eSyHFYPGbjI4XE42ZypR7Nl6cr7-YH8qHw7co7GE+d1Zq2trvmmEBmbFmc3mC-YPMXSwEjCCXDNIfaLFFEcYm+kW7iqO2A0GQ+xOC9Lud8OdVZThymx3qJ5ns7mJXOiyXeZEK25-9EjoeBmKxutKB5ypQDCMMGBTcLw-BCCI-DQQUSZah0T70kYLgREasglt44qeACvJODW+ERAWxbsnEe7YrK3rQV257FKUlDlJU1SEHUqGNOhI6YXS+jpgia7cnEQHGG4Va+MuCAJE4lCgsWwJuPMFhOPRnqHlBEAwVA5x6MoYDoL68F8AI6DCKI0FGSZZlgAJj7CT0URrnYxp1sihiIkuEy5pYnJuGyJi2AurprPuOKQcxwb2aZ5lsWUFRVLUekQAljnOaOrmIO5ykxAR3nWH5P4hOy-72MR7hLNpEHekq-qnnBPCWUhohNWAGhgGhVLJrlurYQgBWecV2alWCvLAoaBFhFENhRNJjrmPVMWNX63UsRARSECUKVcelXU9X1D6DeOo1FZCE2+VN8kspClD-u41iyKKbiRe60WMTkhDdYQ-icE815PAAmjlQlDSJE4eLIa6coyBFzoYLi8pOT12hYdg5u4HjJG66C0Eq8CtOB60UNSkPjgAtP5iDU0pz1M0zu5gc25NUHQeSwfslO0lDfzCgKpgOq4YTeI6Thox4lhi7IUyiqCSNaWz32tvKBLHBAfOps+ZrClYubijYEp1mYdN8nC8SLIYGkEeKa0-Uem2djz7A61h0PAWW7KUJCZoOHM5jirbeOqwx6sZdtHt5ROYJri4uYy-Wkt2HJEwJAKNicsB0nAWCIKO5HcWGcZiVgDHAuIORwtCsRnggt+8kuAKcRmo6uEbjLphF7px3RwNVPPnEU6B4sdZ2Eihg-uCtrhMBLiaS4Xi95Bf0aADlfjkbsjKSYSKOA6IseNNAJZkVy-IsC4qs8kQA */
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
