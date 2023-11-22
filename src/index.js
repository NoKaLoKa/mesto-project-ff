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

// Edit-profile popup
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const closeEditButton = profileEditPopup.querySelector('.popup__close');

profileEditButton.addEventListener('click', () => openModal(profileEditPopup));
closeEditButton.addEventListener('click', () => closeModal(profileEditPopup));

// New-place popup
const profileAddButton = document.querySelector('.profile__add-button');
const profileAddPopup = document.querySelector('.popup_type_new-card');
const closeAddButton = profileAddPopup.querySelector('.popup__close');

profileAddButton.addEventListener('click', () => openModal(profileAddPopup));
closeAddButton.addEventListener('click', () => closeModal(profileAddPopup));

// Image popup
const profileImagePopup = document.querySelector('.popup_type_image');
const closeImageButton = profileImagePopup.querySelector('.popup__close');

closeImageButton.addEventListener('click', () => closeModal(profileImagePopup));


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
    openModal(profileImagePopup);
  } 
});


//const editProfile = document.forms.edit-profile;
//const profileTitle = document.querySelector('.profile__title');
//const profileDescription = document.querySelector('.profile__description');

//editProfile.addEventListener('submit', function (evt) {
//  evt.preventDefault();

//  profileTitle = editProfile.elements.name;
//  profileDescription = editProfile.elements.description;
  
//  editProfile.reset;
//});
