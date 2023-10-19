// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы

// @todo: Функция создания карточки
function addCard(name, link) {
  const cardElement = cardTemplate.content.cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  
  document.querySelector('.places__list').appendChild(cardElement);
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => addCard(`${item.name}`, `${item.link}`))
