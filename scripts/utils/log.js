const chalk = require('chalk');

class Log{
  constructor(options){
    this.options = Object.assign({
      template: text => `============== * ${text} * ==============`
    }, options|| {})
    this.template = this.options.template;
    this.breakLine = false;
    this.log = null;
    this.init();
  }
  init(){
    this.log = (text, chalkColor) => {
      console.log(`${this.breakLine ? '\n' : ''}${chalkColor(this.template(text))}`);
      this.breakLine = false;
    }
  }
  ln(){
    this.breakLine = true;
    return this;
  }
  red(text) {
    this.log(text, chalk.red, 'red');
    return this;
  }
  green(text) {
    this.log(text, chalk.green, 'green');
    return this;
  }
  yellow(text) {
    this.log(text, chalk.yellow, 'yellow');
    return this;
  }
  blue(text) {
    this.log(text, chalk.blue, 'blue');
    return this;
  }
}
module.exports = Log;