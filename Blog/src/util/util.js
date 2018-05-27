export function convertToLocalTime (time, format) {
  var date = new Date(time)
  if (date) {
    var yyyy = date.getFullYear().toString()
    var yy = yyyy.substr(2)
    var M = date.getMonth() + 1
    var MM = (M < 10) ? '0' + M : M
    var d = date.getDate()
    var dd = (d < 10) ? '0' + d : d
    var h = date.getHours()
    var hh = (h < 10) ? '0' + h : h
    var m = date.getMinutes()
    var mm = (m < 10) ? '0' + m : m
    var s = date.getSeconds()
    var ss = (s < 10) ? '0' + s : s
    var result = format.toString()
    result = result.replace('YYYY', yyyy)
    result = result.replace('YY', yy)
    result = result.replace('MM', MM)
    result = result.replace('DD', dd)
    result = result.replace('hh', hh)
    result = result.replace('mm', mm)
    result = result.replace('ss', ss)
    return result
  } else {
    return time
  }
}
