const Generator = require('yeoman-generator');
const gitRemoteOriginUrl = require('git-remote-origin-url');

module.exports = class WxApp extends Generator {
  constructor(args, options) {
    super(args, options);

    this.config.save();
  }
  async prompting() {
    this.props = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What\'s the name of project this time?',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Any description?'
      },
      {
        type: 'input',
        name: 'version',
        message: 'What\'s the basic version?',
        default: '0.1.0'
      }
    ]);
    try {
      this.props.git = await gitRemoteOriginUrl();
    } catch (e) {
      this.props.git = '';
      console.log('Git not ready.');
    }
  }

  writing() {
    [
      'package.json',
      '.babelrc',
      '.eslintrc.js',
      '.gitignore',
      'gulpfile.babel.js',
      'app.js',
      'app.styl',
      'libs/Weixin.js',
      'styl/button.styl',
      'styl/form.styl',
      'util/datetime.js',
    ].forEach( filename => {
      this.fs.copyTpl(
        this.templatePath(filename),
        this.destinationPath(filename),
        this.props,
      );
    });
  }

  installing() {
    this.npmInstall();
  }
};
