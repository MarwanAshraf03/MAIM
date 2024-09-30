function calculateTotalPrice(price, quantity) {
    let total = price * quantity
    if (quantity > 5)
    return (total - (0.1 * total)) + "(10% discount applied)"
    return (total) + "(No discount)"
}
console.log(calculateTotalPrice(100, 3)); // Output: 300 (No discount)
console.log(calculateTotalPrice(100, 6)); // Output: 540 (10% discount applied)
console.log(calculateTotalPrice(200, 6)); // Output: 540 (10% discount applied)
