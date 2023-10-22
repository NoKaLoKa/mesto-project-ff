// Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
let cards = [];

// @todo: Функция создания карточки
function addCard(name, link) {
  cards.push({name, link});
}

// @todo: Функция удаления карточки
function deleteCard (name, link) {
  cards.forEach((card) => {
    let index = cards.indexOf(card);
  
    if (card.name === name && card.link === link) {
      delete(cards[index]);
    }
  })
}

// Вывод карточек на страницу
initialCards.forEach((card) => addCard(`${card.name}`, `${card.link}`));
addCard('oleg', 'https://images.unsplash.com/photo-1682685797507-d44d838b0ac7?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

cards.forEach((card) => {
  const cardElement = cardTemplate.content.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  deleteButton.addEventListener('click', () => {
    deleteCard(`${card.name}`, `${card.link}`)
    console.log('card deleted')
  })

  document.querySelector('.places__list').appendChild(cardElement);
})

// функция addCard добавляет card в массив cards
// функция deleteCard удаляет card из массива
// а в самом конце выводится содержимое массива cards


// Реализация работы попапов
//const closeButton = document.querySelectorAll('.popup__close');

//closeButton.forEach(item => item.addEventListener('click', () => profileAddPopup.classList.remove('popup_is-opened')))

//const profileEditButton = document.querySelector('.profile__edit-button')
//const profileEditPopup = document.querySelector('.popup_type_edit')

//profileEditButton.addEventListener('click', () => profileEditPopup.classList.add('popup_is-opened'))

//const profileAddButton = document.querySelector('.profile__add-button');
//const profileAddPopup = document.querySelector('.popup_type_new-card');

//profileAddButton.addEventListener('click', () => profileAddPopup.classList.add('popup_is-opened'))

//const cardImageButton = document.querySelector('.popup__image');
//const cardImagePopup = document.querySelector('.popup_type_image');

//cardImageButton.addEventListener('click', () => cardImagePopup.classList.add('popup_is-opened'))
