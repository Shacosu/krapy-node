const mongoose = require('mongoose');
const { mongoUri } = require('../lib/credentials');

mongoose.set("strictQuery", false);
mongoose.connect(mongoUri);

const Note = require('../model/note.model');

module.exports = {
    createNote: async (req, res) => {
        try {
            const note = new Note({  title: 'Shacosu2', content: 'This is a test content' });
            const result = await note.save();
            res.json({
                status: 200,
                body: result
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    },

    getNotes: async (req, res) => {
        try {
            const result = await Note.find({})
            res.json({
                status: 200,
                body: result
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    },

    getNoteById: async (req, res) => {
        const { id } = req.params;
        try {
            const result = await Note.findById(id)
            res.json({
                status: 200,
                body: result
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    },

    editNote: async (req, res) => {
        console.log(req.body);
        res.send(req.body)
        // try {
        //     const result = await Note.findByIdAndUpdate(id, {  title, content });
        //     res.json({
        //         status: 200,
        //         body: result
        //     })
        // } catch (error) {
        //     res.status(500).json({
        //         status: 500,
        //         error: error.message
        //     })
        // }
    },

    deleteNote: async (req, res) => {
        const id = '63db459aedc41dd166d0aa4e';
        try {
            const result = await Note.findByIdAndDelete(id);
            res.json({
                status: 200,
                body: result
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    },
}