export function getRoomWord(count) {
  switch (true) {
    case count === 1:
      return 'комната';
    case count >= 2 && count <= 4:
      return 'комнаты';
    default:
      return 'комнат';
  }
}

export function getGuestWord(count) {
  switch (true) {
    case count === 1:
      return 'гостя';
    default:
      return 'гостей';
  }
}
