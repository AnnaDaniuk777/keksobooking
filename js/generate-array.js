import { getRandomPositiveInteger, getRandomPositiveFloat, getRandomArrayItems, getRandomArrayElement, createRandomIdFromRangeGenerator, lat, lng } from './util.js';
import { TITLES, DESCRIPTIONS, TYPES, CHECKINS, CHECKOUTS, FEATURES, PHOTOS } from './data.js';

const AUTHORS_QUANTITY = 10;

const MINIMUM__AMOUNT = 1;

const Latitudes = {
  FROM: 35.65000,
  TO: 35.70000
};

const Longitudes = {
  FROM: 139.70000,
  TO: 139.80000
};

const Prices = {
  MIN: 1000,
  MAX: 100000
};

const Rooms = {
  MIN: 1,
  MAX: 10
};

const Guests = {
  MIN: 1,
  MAX: 20
};

function generateAuthor() {
  const authors = [];

  for (let i = 1; i <= AUTHORS_QUANTITY; i++) {
    const avatarNumber = i < AUTHORS_QUANTITY ? `0${i}` : `${i}`;

    authors.push({
      avatar: `img/avatars/user${avatarNumber}.png`
    });
  }

  const index = createRandomIdFromRangeGenerator(0, authors.length - 1);

  return function () {
    return authors[index()];
  };
}

const createAuthorGenerator = generateAuthor();

function genearteOffer() {
  return {
    title: getRandomArrayElement(TITLES),
    description: getRandomArrayElement(DESCRIPTIONS),
    address: `${lat}, ${lng}`,
    price: getRandomPositiveInteger(Prices.MIN, Prices.MAX),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(Rooms.MIN, Rooms.MAX),
    guests: getRandomPositiveInteger(Guests.MIN, Guests.MAX),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getRandomArrayItems(FEATURES, getRandomPositiveInteger(MINIMUM__AMOUNT, FEATURES.length)),
    photos: getRandomArrayItems(PHOTOS, getRandomPositiveInteger(MINIMUM__AMOUNT, PHOTOS.length))
  };
}

function generateLocation() {
  return {
    lat: getRandomPositiveFloat(Latitudes.FROM, Latitudes.TO, 5),
    lng: getRandomPositiveFloat(Longitudes.FROM, Longitudes.TO, 5)
  };
}

export function initBookingInfo() {
  return {
    author: createAuthorGenerator(),
    offer: genearteOffer(),
    location: generateLocation()
  };
}


