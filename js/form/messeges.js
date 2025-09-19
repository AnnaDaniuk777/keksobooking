export const showMessage = (templateId) => {
  const template = document.querySelector(`#${templateId}`);
  const messageElement = template.content.cloneNode(true).firstElementChild;

  document.body.appendChild(messageElement);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onDocumentClick = (evt) => {
    if (messageElement.contains(evt.target)) {
      closeMessage();
    }
  };

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onDocumentClick);
  }

  const onButtonClick = () => {
    closeMessage();
  };

  if (templateId === 'error') {
    const errorButton = messageElement.querySelector('.error__button');

    errorButton.addEventListener('click', onButtonClick);
  }

  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onDocumentClick);
};
