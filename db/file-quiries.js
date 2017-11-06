// Init db.
var promise = require('bluebird');
var db = require('./db-connect');

/**
 * All DB actions for LinksUser.
 */ 
function getAllFilesForUser(req, res, next) {
    const user_id = parseInt(req.params.id);
    db.any('select * from "LinksFile" where "userId" = $1', user_id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved All files for one Links user'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateFile(req, res, next) {
    const file_id = parseInt(req.params.id);
    var data = req.body.file_data;
    if (data == null || data == undefined || data.length == 0) return;
    db.none('update "LinksFile" set "data"=$1 where "fileId"=$2', [data, file_id])
        .then(function () {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated Links File with id: ' + file_id
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

module.exports = {
    getAllFilesForUser: getAllFilesForUser,
    updateFile: updateFile
};