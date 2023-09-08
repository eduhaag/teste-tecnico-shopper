export function currencyFormat(number: any) {
  if(typeof number === 'number'){
    return 'R$ ' + number.toFixed(2).toString()
  }

  return number
}