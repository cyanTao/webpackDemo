import axios from 'axios'
class Common {
  constructor () {
    this.name = '1232'
  }

  static pp = ''
  // static fn() {
  //   const test = '3213'
  //   console.log(test)
  //   console.log(this.name, process.env.NODE_ENV)
  // }

  static http (params) {
    return axios(params)
  }
}
export default Common