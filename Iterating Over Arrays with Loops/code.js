function sumPositiveNumbers(arr) {
    let sum = 0
    let i = -1
    while (++i < arr.length)
        arr[i] > 0 ? sum += arr[i] : null ;
    return sum
}
function sumPositiveNumbers(arr) {
    let sum = 0
    for (i = 0; i < arr.length; i++)
        arr[i] > 0 ? sum += arr[i] : null ;
    return sum
}
console.log(sumPositiveNumbers([1, -2, 3, 4, -5, 9])); // Output: 8

