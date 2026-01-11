function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function getObjectFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
}
