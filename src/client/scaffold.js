'use strict';
(() => {

  const async = require('async');
  const chalk = require('chalk');
  const fs = require('fs');
  const prompt = require('prompt');
  const inquirer = require("inquirer");

  const path = require('../utils/path.js');
  const walk = require('../utils/walk.js');

  const scaffoldUtil = require('./model/scaffold/scaffold-util.js');
  const Schema = require('./model/scaffold/schema.js');
  const verString = require('./model/version/VersionString.js');

  exports.scaffold = function(options, projectInfo) {

    if (!projectInfo) {
      console.log('此操作会根据下面的问题，为efes项目在当前目录创建三个配置文件：');
      console.log(chalk.green(chalk.bold('.eslintrc')) + ': eslint检测规则，同时也是Sublime的插件Sublime-contrib-eslint配置文件');
      console.log(chalk.green(chalk.bold('.csslintrc')) + ': csslint检测规则');
      console.log(chalk.green(chalk.bold('.efesconfig')) + ': efes项目配置文件');
      projectInfo = {};
    }

    if (!options.force && fs.readdirSync(process.cwd()).length) {

      console.log(chalk.yellow('\nWarning: 此命令将会覆盖某些文件！，请使用 --force(-f) 继续。'));
      console.log(chalk.red('\n存在警告，放弃操作。'));
      return;

    }

    console.log(chalk.bold('\n请回答下列问题：'));


    let schema = new Schema(false);

    schema.start(options, function(info) {

      scaffoldUtil.scaffolding(info, function(error) {
        if (error) {
          console.log(chalk.red('\nAborted due to warnings.'));
        } else {
          console.log(chalk.green('\nDone, without errors.'));

        }
      });

    });

  };

})();