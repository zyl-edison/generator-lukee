'use strict';

const fs = require('fs-extra');
const path = require('path');
const Generator = require('yeoman-generator');
const Q = require('q');
const projectUrl = 'https://github.com/zyl-edison/lukee/archive/master.zip';
const archiveFileName = projectUrl.split(/\//).pop();
const decompressedDirectoryName = 'lukee-master';


const request = require('request');
const decompress = require('decompress');

module.exports = class extends Generator {
  downloadArchieve() {
    const deferred = Q.defer();
    const writeStream = fs.createWriteStream(this.destinationRoot() + '/' + archiveFileName);

    this.log('Downloading Lukee archive ...');

    request(projectUrl).pipe(writeStream);

    writeStream.on('finish', () => {
      deferred.resolve();
    });

    return deferred.promise;
  }

  decompressArchive() {
    const destinationRoot = this.destinationRoot();

    this.log('Decompressing the downloaded archive ...');
    return decompress(
      destinationRoot + '/' + archiveFileName,
      destinationRoot,
      {
        filter: file => (path.extname(file.path) !== '.yml') && (path.basename(file.path, '.md') !== 'index')
      });
  }

  copyFiles() {
    this.log('Copying all files ...');
    fs.copySync(this.destinationRoot() + '/' + decompressedDirectoryName, this.destinationRoot());
  }

  removeArchive() {
    this.log('Removing archive and decompressed directory ...');
    const destinationRoot = this.destinationRoot();

    fs.removeSync(destinationRoot + '/' + decompressedDirectoryName);
    fs.removeSync(destinationRoot + '/' + archiveFileName);
  }

  install() {
    this.log('Installing dependencies ...');
    this.npmInstall();
  }
};
