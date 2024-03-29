const express = require("express");
//const { readdirSync } = require("fs");
const router = express.Router();
const Note = require("../models/noteModel");

router.route("/create").post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const newNote = new Note({
        //_id,
        title, 
        content
    });

    newNote.save();

});


router.route("/notes").get((req, res) => {
    Note.find()
        .then(foundNotes => res.json(foundNotes))
})

module.exports = router;
