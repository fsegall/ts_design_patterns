const obj = {
    test () {
        return function () {
            console.log(this)
        }
    }
}