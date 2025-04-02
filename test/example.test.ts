//file name specifically made not to be tested by unit-test script found in package.json
var assert = require('assert')

describe("some feature", () => {
    before(function () {
        //logic running before testing "some feature"
        console.log("before")

    });

    beforeEach(function () {
        //logic running before each test case
        console.log("beforeEach")
    });

    after(function () {
        //logic running after all test cases
        console.log("after")
    });

    afterEach(function () {
        //logic running after each test case
        console.log("afterEach")
    });

    it("test 1", function () {
        //test case 1
        console.log("test 1")
    })

    it("test 2", function () {
        //test case 2
        console.log("test 2")
    })

    it("test 3", function () {
        //test case 3
        console.log("test 3")
    })

    it("test 4", function () {
        //test case 4
        console.log("test 4")
    })
    
})


