const { program } = require('commander');
const { pathResolve, TipsLog } = require('../utils');
const inquirer = require('inquirer');
const $package = require(pathResolve('./package.json'));
const log = new TipsLog();
const create = require('./custom/create');

const COMMAMD = {
  CREATE: 'create',
}

const PROMPT_QES = {
  TYPE: 'Select the project type',
  OPTIONS: 'Other options?'
}
program
  .version($package.version, '-v, --version')
  .on('--help', () => {
    console.log('Examples:');
    console.log('$ kube-react -v');
    console.log('$ kube-react -h');
  })


program
  .command(COMMAMD.CREATE)
  .argument('<projectName>')
  .option('--ts', 'Typescript project')
  .option('--js', 'Javascript project')
  .description('create a project')
  .action(function(proName, options){
    let opt = Object.keys(options);
    if(opt.length > 1){
      log.error('You can only create one type project');
      return;
    }else if(opt.length){
      create(proName, opt[0]);
    }else {
      inquirer.prompt([
        {
        type: 'list',
        name: PROMPT_QES.TYPE,
        choices: ['ts', 'js']
      },{
        type: 'checkbox',
        name: PROMPT_QES.OPTIONS,
        choices: ['redux', 'router']
      }]).then((answers) => {
        let type = answers[PROMPT_QES.TYPE];
        let options = answers[PROMPT_QES.OPTIONS];
        create(proName, type, options);
      })
    }
  })

if (!process.argv.slice(2).length) {
  program.help()
}
program.parse(process.argv);