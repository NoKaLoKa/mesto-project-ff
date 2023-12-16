import  { addCard, openImagePopup } from '../index.js';
import  { createCard, deleteCard, likeCard } from './card.js';

export const postCard = (card) => {
    fetch('https://nomoreparties.co/v1/wff-cohort-2/cards', {
        method: 'POST',
        headers: {
        authorization: '44bd843a-83af-4683-8cc6-5f335d510854',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: `${card.name}`,
        link: `${card.link}`
        })
    })
};

export const getCards = fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/cards', {
    headers: {
        authorization: '44bd843a-83af-4683-8cc6-5f335d510854'
    }
})
    .then(res => res.json())
    .then((res) => {
        console.log(res);
        res.forEach((card) => {
        addCard(createCard(card, deleteCard, likeCard, openImagePopup))
        });
    });

fetch('https://nomoreparties.co/v1/wff-cohort-2/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '44bd843a-83af-4683-8cc6-5f335d510854',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: '-_-',
    about: 'JavaScript enjoyer'
  })
});
