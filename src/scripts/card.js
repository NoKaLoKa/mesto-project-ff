import { cardTemplate } from '../index.js';

// Функция создания карточки
export function createCard(card, deleteCard, likeCard, openImagePopup) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  deleteButton.addEventListener('click', () => deleteCard(deleteButton));
  likeButton.addEventListener('click', () => likeCard(likeButton));
  cardImage.addEventListener('click', () => openImagePopup(cardImage));

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(deleteButton) {
  deleteButton.closest('.card').remove();
}

// Функция лайка карточки
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}
