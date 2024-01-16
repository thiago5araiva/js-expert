const { error } = require("./src/constants")
const File = require("./src/file")
const assert = require("assert")
;(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv"
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }
  {
    const filePath = "./mocks/invalid-header.csv"
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }
  {
    const filePath = "./mocks/fiveItems-invalid.csv"
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await assert.rejects(result, expected)
  }
  {
    const filePath = "./mocks/threeItems-valid.csv"
    const expected = [
      { id: 1, name: "teste1", profession: "profession1", age: 11 },
      { id: 2, name: "teste2", profession: "profession2", age: 42 },
      { id: 3, name: "teste3", profession: "profession3", age: 43 },
    ]
    const result = await File.csvToJSON(filePath)
    assert.deepEqual(result, expected)
  }
})()
