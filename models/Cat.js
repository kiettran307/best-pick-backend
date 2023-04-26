const mongoose = require('mongoose');
const { Schema } = mongoose;

const CatSchema = new Schema({
  name: String,
  age: Number,
});

mongoose.model('cat', CatSchema);