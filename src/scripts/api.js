import  { addCard, openImagePopup } from '../index.js';
import  { createCard, deleteCard, likeCard } from './card.js';

export const getCards = fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/cards', {
    headers: {
        authorization: '44bd843a-83af-4683-8cc6-5f335d510854'
    }
})
    .then(res => res.json())
    .then((res) => {
        res.forEach((card) => {
            const cardElement = createCard(card, deleteCard, likeCard, openImagePopup);
            const likeСounter = cardElement.querySelector('.card__like-сounter');
            const deleteButton = cardElement.querySelector('.card__delete-button');

            if(card.owner['_id'] !== 'a5cd3f67283bc26d3ca91bb7') {
                deleteButton.remove();
            };
            
            addCard(cardElement);

            likeСounter.textContent = card.likes.length;
        })
    
    })
    .catch((err) => {
        console.log(err); 
        });

export const postCard = (card) => {
    fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/cards', {
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

export const deleteCardApi = (card) => {
    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/${card['_id']}`, {
        method: 'DELETE',
        headers: {
            authorization: '44bd843a-83af-4683-8cc6-5f335d510854'
        }
    })
};

export const putLike = (card) => {
    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/likes/${card['_id']}`, {
        method: 'PUT',
        headers: {
            authorization: '44bd843a-83af-4683-8cc6-5f335d510854',
            'Content-Type': 'application/json'
        }  
    });
};

export const deleteLike = (card) => {
    fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-2/cards/likes/${card['_id']}`, {
        method: 'DELETE',
        headers: {
            authorization: '44bd843a-83af-4683-8cc6-5f335d510854',
            'Content-Type': 'application/json'
        }
    });
};

export const patchUserData = (name, about) => fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me', {
    method: 'PATCH',
    headers: {
        authorization: '44bd843a-83af-4683-8cc6-5f335d510854',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
    })
})

export const getUserData = (profileTitle, profileJob, profileAvatar) =>fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me', {
    headers: {
        authorization: '44bd843a-83af-4683-8cc6-5f335d510854'
    }
})
    .then(res => res.json())
    .then((res) => {
        profileTitle.textContent = res.name;
        profileJob.textContent = res.about;
        profileAvatar.setAttribute('style', `background-image: url(${res.avatar})`);
    });

export const avatarUpdate = (link) => {
    fetch('https://mesto.nomoreparties.co/v1/wff-cohort-2/users/me/avatar', {
    method: 'PATCH',
    headers: {
        authorization: '44bd843a-83af-4683-8cc6-5f335d510854',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        avatar: `${link}`,
    })
});
};
