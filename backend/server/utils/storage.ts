const memoryStorage: Record<string, string> = {}

export function setItem(key: string, value: string) {
  memoryStorage[key] = value
}

export function getItem(key: string) {
  return memoryStorage[key]
}

export function removeItem(key: string) {
  delete memoryStorage[key]
}