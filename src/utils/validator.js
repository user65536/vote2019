let strategies = {
  isNone: function (value, errorMsg) {
    if(value.trim().length === 0) {
      return errorMsg
    }
  }
}

class Validator {
  rules = []
  strategies = strategies
  add (value, rule, errorMsg) {
    let withParamsRule = rule.split(":")
    this.rules.push(() => {
      let strategy = withParamsRule.shift()
      withParamsRule.unshift(value)
      withParamsRule.push(errorMsg)
      return this.strategies[strategy].apply(this, withParamsRule)
    })
  }
  start () {
    let results = []
    this.rules.forEach((strategy, index) => {
      let result = strategy()
      if(result) {
        results.push(result)
      }
    })
    if(results.length > 0) {
      return results[0]
    }
    return false
  }
}

export default Validator