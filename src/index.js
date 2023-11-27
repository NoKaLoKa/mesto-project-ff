import './styles/index.css';
import { createCard, deleteCard, likeCard, imagePopup } from './scripts/card.js';
import initialCards from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';

// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.places__list');

// Функционал карточки
cardsList.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('card__delete-button')) {
    deleteCard(evt.target);
  } else if (evt.target.classList.contains('card__like-button')){
    likeCard(evt.target);
  } else if (evt.target.classList.contains('card__image')) {
    imagePopup(evt.target);
  }
});

// Функция добавления карточки
function addCard(card) {
  cardsList.append(card);
}

// Вывод карточек на страницу
initialCards.forEach((card) => addCard(createCard(card, deleteCard, likeCard, imagePopup)));

// Edit-profile popup
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

profileEditButton.addEventListener('click', () => openModal(profileEditPopup));

// New-place popup
const profileAddButton = document.querySelector('.profile__add-button');
const profileAddPopup = document.querySelector('.popup_type_new-card');

profileAddButton.addEventListener('click', () => openModal(profileAddPopup));

// Image popup
const cardImagePopup = document.querySelector('.popup_type_image')

// Popup close
document.addEventListener('click', function(evt) {
  if (evt.target.classList.contains('popup') || 
      evt.target.classList.contains('popup__close')) {
    closeModal(document.querySelector('.popup_is-opened'));
  }
});

document.addEventListener('keydown', function(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'))
    }
});

// Popup forms
const editProfileForm = document.forms['edit-profile'];
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

editProfileForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileJob = document.querySelector('.profile__description');

  profileTitle.textContent = name;
  profileJob.textContent = job;
  closeModal(profileEditPopup);
});

const newPlaceForm = document.forms['new-place'];
const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newPlaceForm.querySelector('.popup__input_type_url');

newPlaceForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const card = {};
  const name = cardNameInput.value;
  const link = cardLinkInput.value;

  card.name = name;
  card.link = link;

  cardsList.prepend(createCard(card, deleteCard, likeCard, imagePopup));

  newPlaceForm.reset();
  closeModal(profileAddPopup);
});
