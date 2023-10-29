// Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(card, deleteCard) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  
  deleteButton.addEventListener('click', () => deleteCard(deleteButton));

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  return cardElement;
}

// Функция добавления карточки
function addCard(card) {
  cardsList.append(card);
}

// Функция удаления карточки
function deleteCard(deleteButton) {
  deleteButton.closest('.card').remove();
}

// Вывод карточек на страницу
initialCards.forEach((card) => addCard(createCard(card, deleteCard)));
