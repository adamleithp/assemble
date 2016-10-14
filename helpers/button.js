var handlebars = require('handlebars');
// Proof of concept, please feel free to actually use this.

// How to use
// {{button 'string'}}
//
// Pretty useless, but can develop some static components from this.
module.exports.button = function(string) {
  var dom = '<button>' + string + '</button>';
  return new handlebars.SafeString(dom);
};
