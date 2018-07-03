import mongoose from 'mongoose';


const IssueSchema = mongoose.Schema;

const Issue = new IssueSchema({
  title: {
    type: String
  },
  responsible: {
    type: String
  },
  description: {
    type: String
  },
  issue: {
    type: String
  },
  severity: {
    type: String
  },
  status: {
    type: String,
    default: 'Open'
  }
});

export default mongoose.model('Issue', Issue);