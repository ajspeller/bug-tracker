import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import Issue from './models/Issue';
import {
  INSPECT_MAX_BYTES
} from 'buffer';

const PORT = process.env.PORT || 3100;

const app = express();

const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://ajspeller:ajspeller1@ds125831.mlab.com:25831/ajs_bugtracker");

const connection = mongoose.connection;

connection.once('open', () => {
  console.log(`MongoDB connection established ...`);
});

router.route('/issues').get((req, res) => {
  Issue.find((err, issues) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(issues);
    }
  });
});

router.route('/issues/:id').get((req, res) => {
  const id = req.params.id;
  Issue.findById(id, (err, issue) => {
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(issue);
    }
  });
});

router.route('/issues/update/:id').put((req, res) => {
  const id = req.params.id;
  Issue.findById(id, (err, issue) => {
    if (!issue) {
      return next(new Error('Could not load document'));
    } else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.issue = req.body.issue;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue.save()
        .then(() => {
          res.status(200).send('Update successful!');
        })
        .catch(() => {
          res.status(400).send('Update failed!');
        });
    }
  });
});

router.route('/issues/add').post((req, res) => {
  let issue = new Issue(req.body);

  issue.save()
    .then(issue => res.status(200).send({
      status: 'Add Succeed!'
    }))
    .catch(err => res.status(400).send({
      status: 'Add Failed!'
    }));
});

router.route('/issues/delete/:id').delete((req, res) => {
  Issue.findByIdAndRemove({
    _id: req.params.id
  }, (err, issue) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send('Removed successfully');
    }
  });
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server listening on port ... ${PORT}`);
})