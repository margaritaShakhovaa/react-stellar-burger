const apiIngredients = 'https://norma.nomoreparties.space/api/ingredients';
const apiOrderNumber = 'https://norma.nomoreparties.space/api/orders';

export const getIngredientsRequest = () => {
  return fetch(apiIngredients)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
}

export const getOrderNumberRequest = (ingredients) => {
  return fetch((apiOrderNumber), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: ingredients
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
}