var util = {
  // 获取年月日时分秒
  formatDateTime (cst) {
    var num = [31, this.is_leap(cst.getFullYear()) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return {
      year: cst.getFullYear().toString(),
      month: this.paddNum(cst.getMonth() + 1),
      day: this.paddNum(cst.getDate()),
      hour: this.paddNum(cst.getHours()).toString(),
      minute: this.paddNum(cst.getMinutes()),
      second: this.paddNum(cst.getSeconds()).toString(),
      monthDays: num[cst.getMonth()],
      week: cst.getDay()
    };
  },
  is_leap (year) { // 是否是闰年
    if (((year % 4) === 0) && ((year % 100) !== 0) || ((year % 400) === 0)) return 1;
    else return 0;
  },
  // 前面补零
  paddNum (num) {
    num += '';
    return num.replace(/^(\d)$/, '0$1');
  },
  // 格式化CST日期的字串
  formatCSTDate (strDate, format) {
    return this.formatDate(new Date(strDate), format);
  },
  // 格式化日期,
  formatDate (date, format) {
    // 指定格式字符
    var cfg = {
      yyyy: date.getFullYear(), // 年 : 4位
      yy: date.getFullYear().toString().substring(2), // 年 : 2位
      M: date.getMonth() + 1, // 月 : 如果1位的时候不补0
      MM: this.paddNum(date.getMonth() + 1), // 月 : 如果1位的时候补0
      d: date.getDate(), // 日 : 如果1位的时候不补0
      dd: this.paddNum(date.getDate()), // 日 : 如果1位的时候补0
      hh: this.paddNum(date.getHours()), // 时 : 如果1位的时候补0
      mm: this.paddNum(date.getMinutes()), // 分
      ss: date.getSeconds() // 秒
    };
    format || (format = 'yyyy-MM-dd hh:mm:ss');
    return format.replace(/([a-z])(\1)*/ig, (m) => {
      return cfg[m];
    });
  }
};
export default util;
