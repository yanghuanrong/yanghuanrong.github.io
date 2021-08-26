function RandomNum(Min, Max) {
  const Range = Max - Min;
  const Rand = Math.random();
  return Min + Math.round(Rand * Range);
}

function loading({ onloading, done }) {
  const resources = ['pingfang', 'pingfang Bold'];
  for (let i = 0; i < resources.length; i++) {
    document.fonts.load('12px ' + resources[i]).then(loadfun);
  }
  const total = 100;
  let iLoaded = 0;
  let num = 0;
  let node = parseInt(total / resources.length);
  let time;
  let asyncTime = 1;
  function nums() {
    clearInterval(time);
    time = setInterval(() => {
      if (node === total || num === total) {
        done(total);
        clearInterval(time);
        time = null;
      }
      if (num < node) {
        num++;
        onloading(num);
      } else {
        clearInterval(time);
        asyncTime++;
        if (num !== total && total - num > 1) {
          setTimeout(() => {
            node = RandomNum(num, num + total - num);
            nums();
          }, 1000 * asyncTime);
        }
      }
    }, 30);
  }
  nums();
  function loadfun() {
    node = Math.ceil((++iLoaded / resources.length) * total);
    nums();
  }
}

export default loading;
