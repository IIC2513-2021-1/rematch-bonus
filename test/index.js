const exportedResults = require('../src');
const resultJson = require('./result.json');

exportedResults.forEach((queryResult, index) => {
  console.log(`CONSULTA ${index + 1}`);
  const strResultArray = queryResult.map((match) =>
    match.groups().map((group) => group.trim())
  )
  const hasCorrectLength = strResultArray.length === resultJson[index].length;
  const hasCorrectContent = strResultArray.every((strResult, i) => {
    return strResult.every((strResultElem, j) => strResultElem === resultJson[index][i][j]);
  })
  console.log('Has correct length', hasCorrectLength);
  console.log('Has correct content', hasCorrectContent);
  console.log(`${hasCorrectContent && hasCorrectLength ? 'PASS ✅' : 'FAIL ❌'}`)
});
