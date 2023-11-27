export function openModal(modal) {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
}

export function closeModal(modal) {
  document.removeEventListener('keydown', keyHandler);
  modal.classList.remove('popup_is-opened');
}

export function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup') ||  
     evt.target.classList.contains('popup__close')) { 
     closeModal(document.querySelector('.popup_is-opened')); 
  } 
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
    }
}
