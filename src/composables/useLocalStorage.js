function read(key) {
  return JSON.parse(localStorage.getItem(key)) ? JSON.parse(localStorage.getItem(key)) : null
}

function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function remove(key) {
  localStorage.removeItem(key)
}

const useLocalStorage = {
  read,
  write,
  remove
}

export default useLocalStorage
