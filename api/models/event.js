import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let EventModel = new Schema({
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


export default mongoose.model('EventModel', EventModel);
