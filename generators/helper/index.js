'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    // This makes `appname` a required argument.
    this.argument('aaa', { type: String, required: true, desc: 'hello world' });
    this.argument('bbb', { type: String, required: true });

    this.option('coffee', { desc: 'coffeeeeeeee' })

    // And you can then access it later; e.g.
    this.log(this.options);
  }

  // prompting() {
  //   return this.prompt([{
  //     type    : 'input',
  //     name    : 'name',
  //     message : 'Your project name',
  //     store   : true,
  //     default : this.appname // Default to current folder name
  //   }, {
  //     type    : 'confirm',
  //     name    : 'cool',
  //     message : 'Would you like to enable the Cool feature?'
  //   }]).then((answers) => {
  //     this.log('app name', answers.name);
  //     this.log('cool feature', answers.cool);
  //   });
  // }

  paths() {
    this.log(this.destinationRoot());
    this.log(this.contextRoot);

    this.log(this.sourceRoot());
    this.log(this.templatePath('index.js'));
  }
};
