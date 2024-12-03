import data from "../data/cards.json";

//Робота з картками
export const loadUserCards = () => {
  try {
    const storedCards = localStorage.getItem(Object.keys(data)[0]);
    if (storedCards) {
      return JSON.parse(storedCards);
    } else {
      const cards = data[Object.keys(data)[0]];
      if (!cards || !cards[0]) {
        throw new Error("Карток не існує");
      }
      localStorage.setItem(Object.keys(data)[0], JSON.stringify(cards));
      return cards;
    }
  } catch (e) {
    throw new Error(e.message || "Помилка при завантаженні карток");
  }
};

export const addCard = (card) => {
  try {
    const data = loadUserCards();
    card.id = Date.now().toString();
    card.amount = 0;
    card.history = [];
    data.push(card);

    localStorage.setItem("cards", JSON.stringify(data));
  } catch (e) {
    throw new Error(e.message || "Помилка при додаванні картки");
  }
};

export const deleteCard = (cardId) => {
  try {
    const data = loadUserCards();
    console.log("Тут")
    const updatedCards = data.filter((card) => card.id !== cardId);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  } catch (e) {
    throw new Error(e.message || "Помилка при видаленні картки");
  }
};

export const addExpense = (amount, description, cardId) => {
  try {
    const data = loadUserCards();
    let card = data.find((card) => card.id === cardId);

    if (card) {
      const newExpense = {
        id: Date.now().toString(),
        amount: parseFloat(amount),
        description: description,
        date: new Date().toLocaleDateString(),
      };

      card.amount = parseFloat(card.amount) + newExpense.amount;
      card.history.push(newExpense);
      localStorage.setItem("cards", JSON.stringify(data));

      console.log("Витрати додано успішно");
    } else {
      throw new Error("Картка не знайдена");
    }
  } catch (e) {
    throw new Error(e.message || "Помилка при додаванні витрат");
  }
};
