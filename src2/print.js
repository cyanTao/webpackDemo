import common from './common/common.js'

export default function printMe() {
  console.log(common.a)
  console.log(common.b)
  console.log('I get called from print.js!');
}