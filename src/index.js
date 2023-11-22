import './styles/index.css';
import createCard from './scripts/card.js'
import initialCards from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js'

// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.places__list');

// Функционал карточки
cardsList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__delete-button')) {
    deleteCard(evt.target);
  } else if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  } else if (evt.target.classList.contains('card__image')) {
    const card = evt.target.parentElement;
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    document.querySelector('.popup__image').src = cardImage.src;
    document.querySelector('.popup__caption').textContent = cardTitle.textContent;
    document.querySelector('.popup_type_image').classList.add('popup_is-opened');
  } 
});

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
