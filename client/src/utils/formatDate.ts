export function formatDate(date) {
  const newDate = date.split('T')[0].split('-')
  return `${newDate[1]}/${newDate[2]}/${newDate[0]}`
}
