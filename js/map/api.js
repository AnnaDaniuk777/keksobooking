const API_URL = 'https://25.javascript.htmlacademy.pro/keksobooking';

const showError = (message) => {
  const errorTemplate = document.querySelector('#error');
  const errorElement = errorTemplate.content.cloneNode(true);
  const errorContainer = errorElement.querySelector('.error');
  const errorMessage = errorContainer.querySelector('.error__message');

  errorMessage.textContent = message;
  const closeButton = errorContainer.querySelector('.error__button');

  closeButton.addEventListener('click', () => {
    errorContainer.remove();
  });

  document.body.appendChild(errorContainer);

  setTimeout(() => {
    if (errorContainer.parentNode) {
      errorContainer.remove();
    }
  }, 5000);
};

const loadData = async () => {
  try {
    const response = await fetch(`${API_URL}/data`);

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    showError(`Не удалось загрузить объявления: ${error.message}`);
    throw error;
  }
};

const sendData = async (formData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Ошибка отправки: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    showError(`Не удалось отправить объявление: ${error.message}`);
    throw error;
  }
};

export { loadData, sendData, showError };
