var canadianDoller = 0.91

// 私有方法
function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100
}

// 引入模块后可以使用的方法
exports.canadianToUs = function(canadian) {
  return roundTwoDecimals(canadian * canadianDoller)
}

exports.UsToCanadian = function(us) {
  return roundTwoDecimals(us / canadianDoller)
}
