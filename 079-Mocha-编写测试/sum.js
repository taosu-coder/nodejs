module.exports = function (...rest) {
    var sum = 0
    for (var i of rest) {
        sum += i
    }
    return sum
}