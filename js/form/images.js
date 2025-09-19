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

const onAvatarChange = (evt) => {
  const file = evt.target.files[0];

  if (!validateImageFile(file)) {
    alert('Пожалуйста, выберите файл изображения (JPEG, PNG, GIF, WebP)');
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

  const invalidFiles = files.filter((file) => !validateImageFile(file));
  if (invalidFiles.length > 0) {
    alert('Некоторые файлы не являются изображениями. Пожалуйста, выберите только файлы изображений (JPEG, PNG, GIF, WebP)');
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
