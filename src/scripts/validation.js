// Form validation
function showInputError(formElement, inputElement, errorMessage, validationConfig){
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
}

function checkInputValidity(formElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
        showInputError(formElement, inputElement, inputElement.dataset.errorMessage, validationConfig);
    } else if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
        buttonElement.setAttribute('disabled', '');
    } else {
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });

        const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
        const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', function () {
                checkInputValidity(formElement, inputElement, validationConfig);
                toggleButtonState(inputList, buttonElement, validationConfig);
            });
        });
    });
}

export function clearValidation(formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => hideInputError(formElement, inputElement, validationConfig));

    toggleButtonState(inputList, buttonElement, validationConfig);
}