function isEligibleForDiscount(age, member) {
    return (age > 60) | member ? "true" : "false"
}
console.log(isEligibleForDiscount(65, false)); // Output: true
console.log(isEligibleForDiscount(30, true));  // Output: true
console.log(isEligibleForDiscount(45, false)); // Output: false
