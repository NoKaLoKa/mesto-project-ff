import { cardTemplate } from '../index.js';
import { deleteCardApi, putLike, deleteLike } from './api.js'

// Функция создания карточки
export function createCard(card, deleteCallback, likeCallback, openImagePopup, userId) {
  const cardElement = cardTemplate.content.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeСounter = cardElement.querySelector('.card__like-сounter');

  deleteButton.addEventListener('click', () => deleteCallback(card, deleteButton));
  likeButton.addEventListener('click', () => likeCallback(card, likeButton, likeСounter));
  cardImage.addEventListener('click', () => openImagePopup(cardImage));

  likeСounter.textContent = card.likes.length;

  if(card.likes.some((like) => like['_id'] === userId)) { 
    likeButton.classList.add('card__like-button_is-active'); 
  };

  if(userId === card.owner['_id']) {
    deleteButton.addEventListener('click', () => deleteCallback(card, deleteButton)); 
  } else {
    deleteButton.remove()
  };

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
  const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? deleteLike : putLike;
  likeMethod(card['_id'])
    .then((card) => {
      likeCard(likeButton);
      likeСounter.textContent = card.likes.length;
    }) 
    .catch(err => console.log(err));
}
