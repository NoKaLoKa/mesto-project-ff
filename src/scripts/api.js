const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-2',
    headers: {
        authorization: '44bd843a-83af-4683-8cc6-5f335d510854',
        'Content-Type': 'application/json'
    }
}

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

export const postCard = (card) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: `${card.name}`,
            link: `${card.link}`
        })
    })
}

export const deleteCardApi = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
}

export const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    });
}

export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    });
}

export const patchUserData = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: `${name}`,
            about: `${about}`
        })
    });
}

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(res => {
        if (res.ok) {
        return res.json();
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

export const avatarUpdate = (link) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link,
        })
    });
}
