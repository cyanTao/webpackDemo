var shell = require('shelljs')
var fs = require('fs')

function getLog() {
  let _cmd = `git status && git rev-parse HEAD`
  return new Promise((resolve, reject) => {
    shell.exec(_cmd, (code, stdout, stderr) => {
      if (code) {
        reject(stderr)
      } else {
        resolve(stdout)
      }
    })
  })
}
async function writeFile() {
  let _gitLog = await getLog()
  fs.writeFileSync('./dist/tag.txt', `${_gitLog}\n time: ${new Date().toString()}`, {
    encoding: 'utf-8'
  })
}

writeFile().then(() => {
  console.log('write tag success!')
})