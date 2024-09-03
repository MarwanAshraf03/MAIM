function describeUser(name, age, is_student) {
    if (is_student)
        return name + " is " + age + " years old and is a student."
    return name + " is " + age + " years old and is not a student."
}
console.log(describeUser('John', 25, true)); // Output: "John is 25 years old and is a student."
console.log(describeUser('Jane', 30, false)); // Output: "Jane is 30 years old and is not a student."
