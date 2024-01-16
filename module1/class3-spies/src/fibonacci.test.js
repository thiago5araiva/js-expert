const { createSandbox } = require("sinon")
const Fibonacci = require("./fibonacci")
const assert = require("assert")
const sinon = createSandbox()

;(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    for (const sequece of fibonacci.execute(5)) {
    }
    const expectedCallCount = 6
    assert.strictEqual(spy.callCount, expectedCallCount)
    const { args } = spy.getCall(2)
    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(
      args,
      expectedParams,
      "original params must be [3, 1, 2]"
    )
  }
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const [...results] = fibonacci.execute(5)
    const expectedCallCount = 6
    assert.strictEqual(spy.callCount, expectedCallCount)
    const { args } = spy.getCall(2)

    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams, "the params must be [3, 1, 2]")

    const expectedResult = [0, 1, 1, 2, 3]
    assert.deepStrictEqual(
      results,
      expectedResult,
      "the results must be [0, 1, 1, 2, 3]"
    )
  }
})()
