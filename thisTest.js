var obj = {
    a: 1,
    testArrow: () => {
        console.log('Arrow function as method', this)
        return this
    },
    testFunc: function () {
        console.log('Function as method', this)
        return this
    },
    test: function () {
        return () => {
            console.log('Arrow function inside method', this);
        };
    },
    testInnerFunc: function () {
        return function () {
            console.log('Function inside method', this);
        };
    }
};
obj.testArrow().a
console.log(obj.testFunc().a)
obj.test()()
obj.testInnerFunc()()

