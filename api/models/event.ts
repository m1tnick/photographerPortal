import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
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


export default mongoose.model('EventModel', eventSchema);
