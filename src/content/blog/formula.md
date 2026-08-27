---
title: 表达式求值并处理精度问题
description: 公司项目算公式字符串，eval 踩了浮点坑，babel 插件也救不了。最后自己写递归下降，四则运算从 babel-plugin-arithmetic 拷了精确计算。
pubDate: 2022-06-13
---

## eval 能跑，对账对不上

公司项目要算公式，进来的都是字符串，`0.1 + 0.2` 这种，前端算完返回。

我偷懒用了 `eval`，跑是跑得通，测了一下 `0.1 + 0.2`，出来 `0.30000000000000004`，对端对账对不上。

## 装了 babel 插件也没用

皮佬有个 [babel-plugin-arithmetic](https://github.com/JachinZou/babel-plugin-arithmetic)，编译期能把四则运算换成精确版本，我装上了。`eval` 跑的是运行时字符串，`babel` 编译阶段碰不到，插件帮不上忙，只能自己写，函数长这样

```js
function formula(str) {}
formula(`0.1 + 0.2`) // 0.3
```

## 递归下降解析

先把字符串拆开再算。递归下降，从左往右扫，找当前层级最低的运算符。加减设成 1，乘除设成 2，碰到 `(` 给 `temp` 加 100，括号里的优先级整体抬高，`)` 再减回去。找到运算符，式子切两半，左右各自递归，最后用精确四则函数合并。

```js
function formula(list) {
  return calc(list, 0, list.length - 1)
}

function calc(s, l, r) {
  let op = -1,
    pri = 1000 - 1,
    cur_pri,
    temp = 0,
    i = l

  while (i <= r) {
    cur_pri = 1000
    switch (s[i]) {
      case '+':
      case '-':
        cur_pri = 1 + temp
        break
      case '*':
      case '/':
        cur_pri = 2 + temp
        break
      case '(':
        temp += 100
        break
      case ')':
        temp -= 100
        break
    }
    if (cur_pri <= pri) {
      pri = cur_pri
      op = i
    }
    i++
  }

  if (op === -1) {
    const val = s.slice(l, r + 1).trim()
    if (/^[+-]?(0|([1-9]\d*))(\.\d+)?$/.test(val)) {
      return parseFloat(val)
    }
    let num = 0
    for (let i = l; i <= r; i++) {
      if (s[i] < '0' || s[i] > '9') continue
      num = num * 10 + (s[i] - '0')
    }
    return num
  }

  const a = calc(s, l, op - 1)
  const b = calc(s, op + 1, r)
  switch (s[op]) {
    case '+':
      return accAdd(a, b)
    case '-':
      return accSub(a, b)
    case '*':
      return accMul(a, b)
    case '/':
      return accDiv(a, b)
  }
  return 0
}
```

运算部分不能写 `+ - * /`，`accAdd`、`accSub`、`accMul`、`accDiv` 从 <a class="link-github-ext" href="https://github.com/JachinZou/babel-plugin-arithmetic/blob/master/src/calc.js" target="_blank" rel="noopener noreferrer"><svg class="link-github-icon" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg><span>babel-plugin-arithmetic 的 calc.js</span><svg class="link-ext" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M3.5 2.5h6v6M9.5 2.5 2.5 9.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></a> 拷的。插件白装了，这几个函数还能用。

业务里的式子跑完，对账对上了。`eval` 之后再没碰过。
