import './styles/index.css';
import { createCard, deleteCallback, likeCallback } from './scripts/card.js';
import { openModal, closeModal, closePopupByClick } from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { postCard, getCards, avatarUpdate, patchUserData, getUserData } from './scripts/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button__inactive',
  inputErrorClass: '.popup__input_type_error',
  errorClass: '.popup__input-error_active'
};

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

  clearValidation(editProfileForm, validationConfig);

  openModal(profileEditPopup);
});

// New-place popup
const profileAddButton = document.querySelector('.profile__add-button');
const profileAddPopup = document.querySelector('.popup_type_new-card');

profileAddButton.addEventListener('click', () => {
  clearValidation(newPlaceForm, validationConfig);

  openModal(profileAddPopup)
}
);

// Image popup
const cardImagePopup = document.querySelector('.popup_type_image');

// Avatar popup
const profileAvatarPopup = document.querySelector('.popup_type_avatar');
const profileAvatar = document.querySelector('.profile__image');
const profileAvatarButton = document.querySelector('.profile__image-container');

profileAvatarButton.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);

  openModal(profileAvatarPopup)
}
);

// Close popup
document.addEventListener('click', closePopupByClick);

// Popup forms
const editProfileForm = document.forms['edit-profile'];
const profileTitle = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const nameInput = editProfileForm.querySelector('.popup__input_type_name');
const jobInput = editProfileForm.querySelector('.popup__input_type_description');

editProfileForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  
  editProfileForm.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранение...';

  patchUserData(name, job)
    .then((userData) => {
      profileTitle.textContent = userData.name; 
      profileJob.textContent = userData.about; 
      closeModal(profileEditPopup); 
    })
    .catch(err => console.log(err))
    .finally(() => editProfileForm.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранить');
});

const newPlaceForm = document.forms['new-place'];
const cardNameInput = newPlaceForm.querySelector('.popup__input_type_card-name');
const cardLinkInput = newPlaceForm.querySelector('.popup__input_type_url');
let userId;

newPlaceForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const name = cardNameInput.value;
  const link = cardLinkInput.value;
  const card = {
    name, link
  };
  
  newPlaceForm.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранение...';

  postCard(card)
    .then(card => {
      cardsList.prepend(createCard(card, deleteCallback, likeCallback, openImagePopup, userId)) 
        newPlaceForm.reset(); 
        closeModal(profileAddPopup); 
    })
    .catch(err => console.log(err))
    .finally(() => newPlaceForm.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранить');
});

const avatarForm = document.forms['avatar'];
const avatarLinkInput = avatarForm.querySelector('.popup__input_type_url');

avatarForm.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const link = avatarLinkInput.value;
  
  avatarForm.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранение...';

  avatarUpdate(link)
    .then(() => {
      document.querySelector('.profile__image').setAttribute('style', `background-image: url(${link})`);
      avatarForm.reset();
      closeModal(profileAvatarPopup);
    })
    .catch(err => console.log(err))
    .finally(() => avatarForm.querySelector(validationConfig.submitButtonSelector).textContent = 'Сохранить');
});

enableValidation(validationConfig);

Promise.all([getCards(), getUserData()])
  .then(([cards, userData]) => {
    userId = userData['_id'];

    cards.forEach((card) => { 
      const createdCard = createCard(card, deleteCallback, likeCallback, openImagePopup, userId); 
      addCard(createdCard); 
    });

    profileTitle.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.setAttribute('style', `background-image: url(${userData.avatar})`);
  })
  .catch(err => console.log(err));
