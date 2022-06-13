---
title: 表达式求值并处理精度问题
date: 2022-06-13
duration: 5min
---

起因是公司项目中需要用到公式计算，直接使用的`eval`进行处理，精度问题无可避免。在安装了皮佬的[babel-plugin-arithmetic](https://github.com/JachinZou/babel-plugin-arithmetic)插件后，依然没有得到解决，原因是执行`eval`函数并不会走`babel`编译。

### 要做的事情

```js
function formula(params) {}
formula(`0.1 + 0.2`) // 0.3
```

实现一个函数，输入字符串公式，返回的结果，且无精度问题

### 实现

```js
function formula(list) {
  const result = calc(list, 0, list.length - 1);
  console.log(`计算的结果值等于${result}`);
}

function calc(s, l, r) {
  let op = -1,
    pri = 1000 - 1,
    cur_pri,
    temp = 0,
    i = l;

  while (i <= r) {
    cur_pri = 1000;
    switch (s[i]) {
      case '+':
      case '-':
        cur_pri = 1 + temp;
        break;
      case '*':
      case '/':
        cur_pri = 2 + temp;
        break;
      case '(':
        temp += 100;
        break;
      case ')':
        temp -= 100;
        break;
    }
    if (cur_pri <= pri) {
      pri = cur_pri;
      op = i;
    }
    i++;
  }

  if (op === -1) {
    let num = 0;
    let val = s.slice(l, r + 1).trim();
    if (/^[+-]?(0|([1-9]\d*))(\.\d+)?$/.test(val)) {
      return parseFloat(val);
    }
    for (let i = l; i <= r; i++) {
      if (s[i] < '0' || s[i] > '9') continue;
      num = num * 10 + (s[i] - '0');
    }
    return num;
  }

  let a = calc(s, l, op - 1);
  let b = calc(s, op + 1, r);
  switch (s[op]) {
    case '+':
      return accAdd(a, b);
    case '-':
      return accSub(a, b);
    case '*':
      return accMul(a, b);
    case '/':
      return accDiv(a, b);
  }
  return 0;
}
```

最后计算的四个函数直接拿了[babel-plugin-arithmetic](https://github.com/JachinZou/babel-plugin-arithmetic/blob/master/src/calc.js)中的源码，程序员拷代码的事能叫抄吗？
