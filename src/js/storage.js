function saveToLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function loadFromLocal(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}
