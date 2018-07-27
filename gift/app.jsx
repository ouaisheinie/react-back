// 基础jsx代码
// 这些都比较熟悉了

import React from 'react';
import ReactDOM from 'react-dom';

let name = 'ZZY';
let flag = true;
let jsx = (
    <div>
      {
        flag ? <p>I am {name}</p>:<p> I am not {name}</p>
      }
    </div>
    );

ReactDOM.render(
  jsx,
  document.getElementById('app')
)