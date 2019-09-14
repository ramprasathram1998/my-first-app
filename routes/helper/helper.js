const fs = require('fs');
const _ = require('lodash');
const https = require('https');

const imageFolder = '/home/ramprasath/Desktop/express project/public/images/'

module.exports.getImageToLocal = (url) => {
  const fileNameArray = _.split(url, '/');
  let fileName = _.chain(fileNameArray).last().split('?').head().value();
  const imageExtension = _.chain(fileName).split('.').last().value();
  const extensions = ['jpg', 'jpeg', 'png'];

  const checkForExtensions = _.find(extensions, (item) => {
    if (item == imageExtension) return item;
  });

  if(_.isEmpty(checkForExtensions)) fileName = fileName+'.jpg';

  return new Promise( (resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode == 200) {
          response.pipe(fs.createWriteStream(imageFolder+fileName));
          resolve(fileName);
        }
        else {
          reject();
        }
    });
  });
}
