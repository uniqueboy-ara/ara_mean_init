const express = require('express');
const router = express.Router();
const { Log } = require('../util/mongooseErrorLoger')
const Media = require('../models/media.model');
const { GetAll, Insert, DeleteById } = require('../util/GenericMethods');
const fs = require('fs');

router.route('/:id?')
    .get((req, res) => {
        GetAll(Media, req, res);
    });

router.post('/', async (req, res) => {
    console.log("TCL: req.files", req.files)
    if (req.files) {

        for (file in req.files) {
            console.log("TCL: req.files[file]", req.files[file])
            let ext = req.files[file].name.split('.');
            let filePath = './media/' + req.files[file].md5 + '.' + ext[ext.length - 1];
            req.files[file].mv(filePath, async (err, result) => {
                if (err)
                    return res.json(Object.assign(req.base, {
                        result: false,
                        data: err
                    }))

                let media = Media();
                media.timeToSend = req.body.timeToSend || new Date();
                media.file = req.files[file].md5 + "." + ext[ext.length - 1];
                media.type = ext[ext.length - 1];
                media.mimetype = req.files[file].mimetype;
                media.md5 = req.files[file].md5;

                try {
                    await media.save();
                    return res.json(Object.assign(req.base, {
                        data: result
                    }))
                }
                catch (ex) {
                    fs.unlinkSync(filePath)

                    if (ex.code == 11000)
                        return res.json(Object.assign(req.base, {
                            result: false,
                            data: "Duplicated file!"
                        }))
                    return res.json(Object.assign(req.base, {
                        result: false,
                        data: Log(ex)
                    }))
                }

            })
        }
    }
    else
        res.json(Object.assign(req.base, {
            result: false
        }))
});



// router.route('/')
//     .get(async (req, res) => await GetAll(media, req, res))
//     .post((req, res) => {
//         console.log(req.files);
//         if (req.files) {
//             for (file in req.files) {
//                 req.files[file].mv('./media/' + req.files[file].name, (err, result) => {
//                     if (err)
//                         res.json(Object.assign(req.base({
//                             result: false,
//                             data: err
//                         })))
//                 })
//             }
//         }
//         // res.json(Object.assign(req.base({
//         //     data: req.files
//         // })))
//         res.send("HI");
//     })
//     .delete(async (req, res) => await DeleteById(media, req, res));

module.exports = router;
