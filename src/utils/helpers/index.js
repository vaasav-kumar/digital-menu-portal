export function amountFormat (amount) {
  amount = parseFloat(amount)
  if (typeof amount === 'number' && !isNaN(amount)) {
    return amount.toLocaleString('en-IN', {style: 'currency', currency: 'INR', minimumFractionDigits: 1, maximumFractionDigits: 2})
  } else {
    return ''
  }
}
