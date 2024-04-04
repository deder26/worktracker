import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue = null) {
  let value = read(key)

  if (!value) value = defaultValue
  let data = ref(value)
  watch(data, () => {
    write(key, data)
  })
  return data
}

export function read(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function write(key, data) {
  localStorage.setItem(key, JSON.stringify(data.value))
}
