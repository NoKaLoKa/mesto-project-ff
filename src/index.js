import './styles/index.css';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import initialCards from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';

// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.places__list');

// Функция добавления карточки
function addCard(card) {
  cardsList.append(card);
}

// Функция попапа с картинкой
function openImagePopup(image) {
  const card = image.parentElement;
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  document.querySelector('.popup__image').src = cardImage.src;
  document.querySelector('.popup__caption').textContent = cardTitle.textContent;
  openModal(cardImagePopup);
}

// Вывод карточек на страницу
initialCards.forEach((card) => addCard(createCard(card, deleteCard, likeCard, openImagePopup)));

// Edit-profile popup
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;

  openModal(profileEditPopup);
});

// New-place popup
const profileAddButton = document.querySelector('.profile__add-button');
const profileAddPopup = document.querySelector('.popup_type_new-card');

profileAddButton.addEventListener('click', () => openModal(profileAddPopup));

// Image popup
const cardImagePopup = document.querySelector('.popup_type_image')

// Popup forms
const editProfileForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

editProfileForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileJob.textContent = job;
  closeModal(profileEditPopup);
});

const newPlaceForm = document.forms['new-place'];
const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newPlaceForm.querySelector('.popup__input_type_url');

newPlaceForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const card = {
    name, link
  };

  cardsList.prepend(createCard(card, deleteCard, likeCard, openImagePopup));

  newPlaceForm.reset();
  closeModal(profileAddPopup);
});
