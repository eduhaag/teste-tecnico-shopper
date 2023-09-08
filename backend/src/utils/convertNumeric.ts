export function convertNumeric(data: any) {
  const number = parseFloat(data)

  if(!isNaN(number)) {
    return number
  } else {
    return data
  }
}