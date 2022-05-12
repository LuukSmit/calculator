const fs = require('fs');
const request = require('request');
const recursive = require('recursive-readdir');
const size = require('image-size');
const path = require('path');

const exceptions = ['ico', 'mp4', 'svg'];
const fileExceptions = ['tap_dial.png', 'dial_question.png'];

const download = (uri, fileName, callback) => {
  request.head(uri, () => {
    request(uri).pipe(fs.createWriteStream(fileName)).on('close', callback);
  });
};

const getPlaceholders = (prefix) => {
  recursive(path.resolve('src', 'assets/images'), (err, files) => {
    if (err) throw err;
    const filteredFiles = files.filter(file => !exceptions.includes(file.substring(file.lastIndexOf('.') + 1)));

    filteredFiles.forEach((file) => {
      const fileIndex = file.lastIndexOf('\\') + 1;
      const fileName = file.substring(fileIndex);
      const { width, height } = size(file);
      const url = `http://via.placeholder.com/${width}x${height}/FF42A0/FFF?text=${fileName}`;
      if (!fileExceptions.includes(fileName)) {
        download(url, `${file.substring(0, fileIndex)}${prefix ? '_placeholder_' : ''}${fileName}`, () => {
          console.info(`${fileName} written`);
        });
      }
    });
  });
};

module.exports = getPlaceholders;
