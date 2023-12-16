import './styles/index.css';
import initialCards from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './scripts/card.js';
import { openModal, closeModal, closePopupByClick } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { postCard, getCards, avatarUpdate, patchUserData, getUserData } from './scripts/api.js';

// Темплейт карточки
export const cardTemplate = document.querySelector('#card-template');
const cardsList = document.querySelector('.places__list');

// Функция добавления карточки
export function addCard(card) {
  cardsList.append(card);
}

// Функция попапа с картинкой
export function openImagePopup(image) {
  const card = image.parentElement;
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  document.querySelector('.popup__image').src = cardImage.src;
  document.querySelector('.popup__image').alt = cardImage.alt;
  document.querySelector('.popup__caption').textContent = cardTitle.textContent;
  openModal(cardImagePopup);
}

// Edit-profile popup
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileJob.textContent;

  clearValidation(editProfileForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: '.button__inactive',
    inputErrorClass: '.popup__input_type_error',
    errorClass: '.popup__input-error_active'
  });

  openModal(profileEditPopup);
});

// New-place popup
const profileAddButton = document.querySelector('.profile__add-button');
const profileAddPopup = document.querySelector('.popup_type_new-card');

profileAddButton.addEventListener('click', () => {
  clearValidation(newPlaceForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: '.button__inactive',
    inputErrorClass: '.popup__input_type_error',
    errorClass: '.popup__input-error_active'
  });

  openModal(profileAddPopup)}
);

// Image popup
const cardImagePopup = document.querySelector('.popup_type_image');

// Avatar popup
const profileAvatarPopup = document.querySelector('.popup_type_avatar');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarButton = document.querySelector('.profile__image-container');

profileAvatarButton.addEventListener('click', () => {
  clearValidation(avatarForm, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: '.button__inactive',
    inputErrorClass: '.popup__input_type_error',
    errorClass: '.popup__input-error_active'
  });

  openModal(profileAvatarPopup)}
);

// Close popup
document.addEventListener('click', closePopupByClick);

// Popup forms
const editProfileForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

getUserData(profileTitle, profileJob, profileAvatar);

editProfileForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileJob.textContent = job;
  patchUserData(name, job);
  
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

  postCard(card);

  newPlaceForm.reset();
  closeModal(profileAddPopup);
});

const avatarForm = document.forms['avatar'];
const avatarLinkInput = avatarForm.querySelector('.popup__input_type_url');

avatarForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  const link = avatarLinkInput.value;
  document.querySelector('.profile__image').setAttribute('style', `background-image: url(${link})`);
  avatarUpdate(link);

  avatarForm.reset();
  closeModal(profileAvatarPopup);
});

enableValidation();
getCards;
