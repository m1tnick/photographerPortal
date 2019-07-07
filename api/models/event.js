const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TheEvent = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  date: {
    type: String
  },
  type: {
    type: String
  }
},{
    collection: 'theevent'
});

module.exports = mongoose.model('TheEvent', TheEvent);
