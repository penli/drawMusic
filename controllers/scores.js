const express = require("express");
const router = express. Router();

const Score = require('../models/Score');
const Note = require('../models/Note');

router.get("/", (req, res) => {
    Score.find({}).then(scores => {
        console.log(req.body);
        res.json(scores);
    })
});
router.get('/:id', (req, res) => {
    Score.findOne( { _id: req.params.id }, req.body)
        .then(score =>
            // res.json(score));
            res.render("showScoreNotes", score));
});
router.post('/', (req, res) => {
    Score.create(req.body).then(newScore => res.json(newScore));
});

// router.post('/new', (req, res) => {
//
//     Score.findById(req.params.id).then(addToScore => {
//         Note.create(req.body.notes).then(newNote => {
//         // push the new note into score.notes array
//         addToScore.notes.push(newNote);
//         //save the note in the array
//         newNote.save();
//         addToScore.save();
//         console.log(newNote);
//         console.log(addToScore);
//         res.json(newNote);
//         res.json(addToScore);
//     })
//     })
// });
// update a note inside a score
router.put('/:id', (req, res) => {
    const scoreId = req.params.id;
    const takeNote = req.body.id;
    Score.findByIdAndUpdate({ _id: scoreId}, req.body.pitch, req.body.rhythm).then(updateNote => {
        Note.findOne({ _id: takeNote}).then(addNote => {
            console.log(addNote);
            console.log(addNote.pitch);
            console.log(addNote.rhythm);
            console.log(addNote.pitch + addNote.rhythm);
            //console.log(takeNote.pitch.rhythm);
            updateNote.notes.push(addNote.pitch + addNote.rhythm);
           //newNote.save();
           updateNote.save();
           res.json(updateNote);
          console.log(updateNote);
        })
    })
});

router.delete("/:id", (req, res) => {
    Score.findOneAndDelete({ _id: req.params.id })
        .then(deleted => res.json(deleted));
});

module.exports = router;