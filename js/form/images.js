const createImageElement = (src, isAvatar = false) => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = isAvatar ? 'Аватар пользователя' : 'Фотография жилья';
  img.width = isAvatar ? 40 : 45;
  img.height = isAvatar ? 44 : 40;
  img.style.objectFit = 'cover';

  return img;
};

const validateImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  return validTypes.includes(file.type);
};

const showImageError = (message, targetElement) => {
  const existingError = targetElement.parentNode.querySelector('.image-error');
  if (existingError) {
    existingError.remove();
  }

  const errorElement = document.createElement('div');
  errorElement.className = 'image-error';
  errorElement.textContent = message;

  errorElement.style.cssText = `
    position: absolute;
    top: 100%;
    left: 0;
    background: #ff4444;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    margin-top: 5px;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;

  targetElement.parentNode.style.position = 'relative';
  targetElement.parentNode.appendChild(errorElement);

  setTimeout(() => {
    if (errorElement.parentNode) {
      errorElement.remove();
    }
  }, 5000);
};

const hideImageError = (targetElement) => {
  const existingError = targetElement.parentNode.querySelector('.image-error');
  if (existingError) {
    existingError.remove();
  }
};

const onAvatarChange = (evt) => {
  const file = evt.target.files[0];
  hideImageError(evt.target);

  if (!validateImageFile(file)) {
    showImageError('Пожалуйста, выберите файл изображения (JPEG, PNG, GIF, WebP)', evt.target);
    evt.target.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const avatarPreview = document.querySelector('.ad-form-header__preview img');
    avatarPreview.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

const onImagesChange = (evt) => {
  const files = Array.from(evt.target.files);
  hideImageError(evt.target);

  if (files.length === 0) { return; }

  const invalidFiles = files.filter((file) => !validateImageFile(file));
  if (invalidFiles.length > 0) {
    showImageError('Некоторые файлы не являются изображениями. Пожалуйста, выберите только файлы изображений (JPEG, PNG, GIF, WebP)', evt.target);
    evt.target.value = '';
    return;
  }

  const imagesContainer = document.querySelector('.ad-form__photo');
  imagesContainer.innerHTML = '';

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = createImageElement(event.target.result);
      imagesContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
};

export const initImageHandlers = () => {
  const avatarInput = document.querySelector('#avatar');
  const imagesInput = document.querySelector('#images');

  avatarInput.addEventListener('change', onAvatarChange);
  imagesInput.addEventListener('change', onImagesChange);
};

export const resetImages = () => {
  const avatarPreview = document.querySelector('.ad-form-header__preview img');
  const imagesContainer = document.querySelector('.ad-form__photo');
  const avatarInput = document.querySelector('#avatar');
  const imagesInput = document.querySelector('#images');

  avatarPreview.src = 'img/muffin-grey.svg';
  imagesContainer.innerHTML = '';
  avatarInput.value = '';
  imagesInput.value = '';

  const allErrors = document.querySelectorAll('.image-error');
  allErrors.forEach((error) => error.remove());
};
