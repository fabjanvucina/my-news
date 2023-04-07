export function handleKeyboardEvent(
  e: React.KeyboardEvent,
  callback: () => void
) {
  e.stopPropagation()

  if (e.key === 'Enter') {
    callback()
  }
}
