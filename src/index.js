import _ from 'lodash';
import './assets/css/style.css';
import './assets/less/index.less';
import Icon from './assets/img/jpeg.jpeg'
import json from './assets/lang/en'

import img from './components/my-component/'

function component() {
  console.log(process.env)
  console.log(json)
  var element = document.createElement('div');
  var span = document.createElement('span');

  element.className = 'first'
  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  span.innerHTML = '1233654'
  span.className = 'second'
  element.appendChild(span)
  element.classList.add('hello');
  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  myIcon.src = Icon;
  console.log(myIcon)

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());
document.body.appendChild(img);