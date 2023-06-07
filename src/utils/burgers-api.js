const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => {
  return fetch(apiUrl)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
      })
};