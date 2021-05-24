<template>
 <div class="wrap" v-show="value" @click="input">
    <div class="calendar">
      <div class="x-picker" @click.stop>
        <div class="x-mainBody">
          <div class="x-picker_header x-clearfix">
            <span class="leftFirst icon icon-yearArrowLeft x-btn-prve" @click="changePrevYear"></span>
            <span class="icon icon-monthArrowLeft x-btn-prve" @click="changePrevMonth"></span>
            <span>{{nowTime.year}}年 {{nowTime.month}}月</span>
            <span class="icon icon-yearArrowLeft reverse x-btn-next" @click="changeNextYear"></span>
            <span
              class="rightFirst icon icon-monthArrowLeft reverse x-btn-next"
              @click="changeNextMonth"
            ></span>
          </div>
          <ul class="x-picker_week x-clearfix">
            <li v-for="(week,index) in weekArr" :key="index">{{week}}</li>
          </ul>
          <ul class="x-picker_day x-clearfix">
            <li
              v-for="(item, i) in calendarData"
              :key="i"
              @click="changeDay(item)"
              :class="[
                item.type,
                {
                  active: isAactiveDay(item),
                  today: isToDay(item)
                }
              ]">
                <div
                  class="point"
                  v-if="isToDay(item)"
                ></div>
                <div class="itemIcon" v-if="item.status != 2">
                  <!-- <fr-icon :type="item.iconType" :background="item.background" /> -->
                </div>
                <span>{{item.d}}</span>
              </li>
            </ul>
          </div>
          <div class="closeCalendar">
            <div class="date" @click="handleToToday">今日</div>
            <div class="closeBtn" @click="input">
              <span class="icon icon-arrowUp"></span>
              <span>收起</span>
            </div>
          </div>
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import { getNowTime, fillInStr, DateFn } from './tool'

function repair(d) {
  return fillInStr(d, 2)
}

export default {
  name: "xDatepicker",
  props: {
    value: Boolean,
    queryStatus: String,
  },
  data() {
    const { year, month, day } = getNowTime()
    return {
      dateTime: `${year}-${month}-${day}`,
      weekArr: ["日", "一", "二", "三", "四", "五", "六"],
      toDay: DateFn(),
      shareStatusList: []
    };
  },
  computed: {
    nowTime() {
      return getNowTime(this.dateTime)
    },
    calendarData() {
      const { year, month, day, monthDays } = this.nowTime
      const { shareStatusList = [] } = this

      // 当前月数据
      const nowMonthDay = monthDays
      const nowMonthDays = [];
      for (let i = 1; i <= nowMonthDay; i++) {
        const d = repair(i);
        nowMonthDays.push({
          y: year,
          m: month,
          d,
          dateTime: `${year}-${month}-${d}`,
          type: "Now"
        });
      }
      // 上个月数据
      const firstDate = DateFn(nowMonthDays[0].dateTime)
      let prevMonthDay = firstDate.getDay()
      const prevMonthDays = []
      if(42 - prevMonthDay - nowMonthDay > 7) {
        prevMonthDay += 7
      }
      for(let i = 1; i <= prevMonthDay; i++) {
        const { year, month, day } = getNowTime(+firstDate - i * 1000 * 3600 * 24)
        const d = repair(day);
        prevMonthDays.unshift({
          y: year,
          m: repair(month),
          d,
          dateTime: `${year}-${month}-${d}`,
          type: "prve"
        })
      }

      // 下个月数据
      const lastDate = +DateFn(nowMonthDays[monthDays - 1].dateTime)
      const nextMonthDay = 42 - prevMonthDay - nowMonthDay
      const nextMonthDays = [];
      for(let i = 1; i <= nextMonthDay; i++) {
        const { year, month, day } = getNowTime(+lastDate + i * 1000 * 3600 * 24)
        const d = repair(day);
        nextMonthDays.push({
          y: year,
          m: repair(month),
          d,
          dateTime: `${year}-${month}-${d}`,
          type: "next"
        })
      }

      // 添加日期的状态
      return [...prevMonthDays, ...nowMonthDays, ...nextMonthDays]
    }
  },
  methods: {
    input() {
      this.$emit('input', false)
    },
    getNowTime,
    changePrevYear() {
      const { year, month, day } = this.nowTime
      this.dateTime = `${year - 1}-${month}-${1}`
      this.$nextTick(() => {
        this.getShareStatus()
      })
    },
    getShareStatus(){

    },
    changeNextYear() {
      const { year, month, day } = this.nowTime
      this.dateTime = `${year + 1}-${month}-${1}`
      
      this.$nextTick(() => {
        this.getShareStatus()
      })
    },
    // 上个月的事件方法
    changePrevMonth() {
      const { day, timeStamp } = this.nowTime
      const { year, month } = getNowTime(timeStamp - day * 1000 * 3600 * 24)
      this.dateTime = `${year}-${month}-${1}`
      
      this.$nextTick(() => {
        this.getShareStatus()
      })
    },
    // 下个月的事件方法
    changeNextMonth() {
      const { day, timeStamp, monthDays, date } = this.nowTime
      const { year, month } = getNowTime(timeStamp + (monthDays - day + 1) * 1000 * 3600 * 24)
      this.dateTime = `${year}-${month}-${1}`
      this.$nextTick(() => {
        this.getShareStatus()
      })
    },
    isAactiveDay({ dateTime }) {
      return DateFn(this.dateTime).toDateString() == DateFn(dateTime).toDateString()
    },
    isToDay(item) {
      return this.toDay.toDateString() == DateFn(item.dateTime).toDateString()
    },
    // 选择日期
    changeDay({ dateTime, type }) {
      if (type !== "Now") {
        return
      }
      this.dateTime = dateTime
      this.$emit("change", this.dateTime)
      this.input()
    },
    // 跳转到今日
    handleToToday() {
      const { year, month, day } = getNowTime()
      this.dateTime = `${year}-${month}-${day}`
      this.$emit("change", this.dateTime)
      this.input();
      this.$nextTick(() => {
        this.getShareStatus()
      })
    }
  },
  mounted() {
    this.getShareStatus()
  }
};
</script>

<style lang="less">
* {
  padding: 0;
}
.Now {
  // box-sizing: border-box;
  background-color: rgba(151, 151, 151, 0.07);
  border: 6rpx solid #fff;
  color: #979797;
}
.Prev,
.Next {
  color: rgba(151, 151, 151, 0.4);
  border: 6rpx solid #fff;
}
.Next {
  color: rgba(151, 151, 151, 0.4);
  border: 6rpx solid #fff;
}
.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  // background-color: #fff;
  z-index: 3;
}
.calendar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  .x-picker {
    width: 750rpx;
    // height: 876rpx;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
    z-index: 999;
    .x-mainBody {
      border-bottom: 1rpx solid #c5c5c5;
    }
    .closeCalendar {
      position: relative;
      width: 750rpx;
      height: 84rpx;
      background-color: #fff;
      .date {
        width: 100%;
        text-align: center;
        line-height: 84rpx;
        font-size: 32rpx;
        color: rgba(151, 151, 151, 0.8);
      }
      .closeBtn {
        position: absolute;
        right: 0;
        top: 0;
        width: 138rpx;
        height: 84rpx;
        line-height: 84rpx;
        color: #979797;
        font-weight: 300;
        span {
          &:nth-child(1) {
            font-size: 36rpx;
            margin-right: 7rpx;
          }
          &:nth-child(2) {
            font-size: 28rpx;
          }
        }
      }
    }
  }

  .x-picker_header {
    width: 750rpx;
    height: 92rpx;
    text-align: center;
    line-height: 60rpx;
    padding: 18rpx 60rpx 24rpx 60rpx;
    color: #008afe;
    border-bottom: 1px solid #c5c5c5;
    font-size: 36rpx;
    .leftFirst {
      margin-right: 64rpx;
    }
    .rightFirst {
      margin-right: 64rpx;
    }
  }

  .x-picker_week {
    display: flex;
    width: 750rpx;
    padding: 0 27rpx;
    margin-top: 20rpx;
    color: #979797;
  }

  .x-picker_week li {
    flex: 1;
    border: 6rpx solid #fff;
    list-style: none;
    text-align: center;
    margin-bottom: 10rpx;
  }

  .x-btn-prve {
    float: left;
    color: #979797;
  }

  .x-btn-next {
    float: right;
    color: #979797;
  }
  .x-picker_day {
    width: 750rpx;
    box-sizing: border-box;
    padding-left: 24rpx;
    display: flex;
    flex-wrap: wrap;
    li {
      position: relative;
      list-style: none;
      width: 100rpx;
      height: 100rpx;
      font-size: 36rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #979797;
      cursor: pointer;
      &.Prev,
      &.Next {
        color: #ccc;
      }
      &.active {
        color: #fff;
        background-color: rgba(0, 138, 254, 1);
      }
      span {
        font-family: PingFangSC-Regular, sans-serif;
        position: absolute;
        left: 12rpx;
        top: 6rpx;
        line-height: 44rpx;
        font-size: 32rpx;
      }
      .itemIcon {
        position: absolute;
        right: 6rpx;
        bottom: 6rpx;
        width: 32rpx;
        height: 32rpx;
        font-size: 22rpx;
        color: #fff;
      }
    }
  }
}
.x-clearfix:after {
  content: "";
  display: block;
  clear: both;
}
.reverse {
  transform: rotateY(180deg);
}
.point {
  position: absolute;
  top: 8rpx;
  right: 8rpx;
  display: inline-block;
  box-sizing: border-box;
  width: 12rpx;
  height: 12rpx;
  border-radius: 100%;
  margin-left: 8rpx; 
  background-color: #fff;
}
</style>