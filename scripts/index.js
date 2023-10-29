// Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// Функция создания карточки
function addCard(cardIndex, deleteCard) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  deleteButton.addEventListener('click', (evt) => evt.target = deleteCard(deleteButton));

  cardElement.querySelector('.card__image').src = initialCards[cardIndex].link;
  cardElement.querySelector('.card__title').textContent = initialCards[cardIndex].name;

  document.querySelector('.places__list').appendChild(cardElement);
}

// Функция удаления карточки
function deleteCard(deleteButton) {
  const card = deleteButton.closest('.card');
  card.remove();
}

// Вывод карточек на страницу
initialCards.forEach((card) => addCard(initialCards.indexOf(card), deleteCard));
