import { cardTemplate } from '../index.js';
import { deleteCardApi, putLike, deleteLike } from './api.js'

// Функция создания карточки
export function createCard(card, deleteCallback, likeCallback, openImagePopup) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeСounter = cardElement.querySelector('.card__like-сounter');

  deleteButton.addEventListener('click', () => deleteCallback(card, deleteButton));
  likeButton.addEventListener('click', () => likeCallback(card, likeButton, likeСounter));
  cardImage.addEventListener('click', () => openImagePopup(cardImage));

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  return cardElement;
}

// Функция удаления карточки

export function deleteCard(deleteButton) {
  deleteButton.parentElement.remove();
}

export function deleteCallback(card, deleteButton) {
  deleteCardApi(card['_id'])
    .then(() => deleteCard(deleteButton))
    .catch(err => console.log(err));
}

// Функция лайка карточки
export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export function likeCallback(card, likeButton, likeСounter) {
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putLike(card['_id'])
      .then(() => {
        likeCard(likeButton);
        const currentCount = parseInt(likeСounter.textContent, 10);
        likeСounter.textContent = currentCount + 1;
      })
      .catch(err => console.log(err));
  } else {
    deleteLike(card['_id'])
      .then(() => {
        likeCard(likeButton);
        const currentCount = parseInt(likeСounter.textContent, 10);
        likeСounter.textContent = currentCount - 1;
      })
      .catch(err => console.log(err));
  }
}
