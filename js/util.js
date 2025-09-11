export function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

export function getRandomPositiveFloat(a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;

  return +result.toFixed(digits);
}

export function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function getRandomArrayItems(array, count) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

export function createRandomIdFromRangeGenerator(min, max) {
  const availableNumbers = [];
  for (let i = min; i <= max; i++) {
    availableNumbers.push(i);
  }

  return function () {
    if (availableNumbers.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);

    return availableNumbers.splice(randomIndex, 1)[0];
  };
}

export const lat = (Math.random() * 180 - 90).toFixed(5);

export const lng = (Math.random() * 360 - 180).toFixed(5);
