// Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardIndex, deleteCard) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  deleteButton.addEventListener('click', () => deleteCard(deleteButton));

  cardElement.querySelector('.card__image').src = initialCards[cardIndex].link;
  cardElement.querySelector('.card__image').alt = initialCards[cardIndex].name;
  cardElement.querySelector('.card__title').textContent = initialCards[cardIndex].name;

  return cardElement;
}

// Функция добавления карточки
function addCard(createCard) {
  cardsList.append(createCard);
}

// Функция удаления карточки
function deleteCard(deleteButton) {
  deleteButton.closest('.card').remove();
}

// Вывод карточек на страницу
initialCards.forEach((card) => addCard(createCard(initialCards.indexOf(card), deleteCard)));
