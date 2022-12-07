const urlValidator = require('valid-url');

function validateUrl(url) {
    return urlValidator.isUri(url);
}
  
module.exports = { validateUrl };