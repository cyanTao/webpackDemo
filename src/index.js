import $ from 'jquery'
$('html').html('<button>跟我讲饿哦</button>')
import _ from 'lodash'
import common from '@/assets/js/common'
import * as echart from 'echarts'
import loadsh from 'loadsh'
import app1 from '@/pages/app1'
import app2 from '@/pages/app2/const.js'
function component () {
  common.fn()
  var element = document.createElement('div')
  var button = document.createElement('button')
  var br = document.createElement('br')

  button.innerHTML = 'Click me and look at the console!'
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.appendChild(br)
  element.appendChild(button)

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  //  懒加载

  //eslint-disable-next-line
  button.onclick = async (e) => {
    console.log(e)
    import('./print').then(res => {
      console.log(res)
      console.log(echart)
      console.log(loadsh)
    })
    // import(/* webpackChunkName: "loadash" */ 'loadsh')
    // require.ensure([], () => require('echarts'), 'echarts')
  }

  return element
}
console.log(app1, app2)
document.body.appendChild(component())