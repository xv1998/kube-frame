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
  TYPE: 'Select the project type'
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
  .option('--rn', 'React Native project')
  .description('create a project')
  .action(function(proName, options){
    let opt = Object.keys(options);
    if(opt.length > 1){
      log.error('You can only create one type project');
      return;
    }else if(opt.length){
      create(proName, opt[0]);
    }else {
      inquirer.prompt([{
        type: 'list',
        name: PROMPT_QES.TYPE,
        choices: ['ts', 'rn']
      }]).then((answers) => {
        let type = answers[PROMPT_QES.TYPE];
        create(proName, type);
      })
    }
  })

if (!process.argv.slice(2).length) {
  program.help()
}
program.parse(process.argv);