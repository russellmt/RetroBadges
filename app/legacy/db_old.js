var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var dbName = 'test';
var url = 'mongodb://localhost:27017/' + dbName;

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Connected to mongodb');

    function createRecord(collection, record, callBack) {
        db.collection(collection).insertOne(record, function(err, result) {
            assert.equal(null, err);
            console.log('Successfully inserted one record into collection \'' + collection + '\'');
            callBack && callBack(result);
        });
    }

    function queryRecords(collection, callBack, query, sort) {
        var col = db.collection(collection);
        var cursor = query ? col.find(query) : col.find();
        sort && cursor.sort();
        cursor.toArray(function(err, documents) {
            assert.equal(null, err);
            console.log('Found ' + documents.length + ' documents');
            callBack(documents);
        });
    }

    function updateRecord(collection, query, recordChange, callBack) {
        db.collection(collection).updateOne(query, {
            $set: recordChange,
            $currentDate: {
                lastModified: true
            }
        }, function(err, result) {
            assert.equal(null, err);
            console.log('Successfully updated one record in collection \'' + collection + '\'');
            callBack && callBack(result);
        });
    }

    function replaceRecord(collection, query, record, callBack) {
        db.collection(collection).replaceOne(query, record, function(err, result) {
            assert.equal(null, err);
            console.log('Successfully replaced one record in collection \'' + collection + '\'');
            callBack && callBack(result);
        });
    }

    function removeRecords(collection, query, callBack) {
        db.collection(collection).deleteMany(query, function(err, result) {
            assert.equal(null, err);
            console.log('Successfully deleted record(s)');
            callBack && callBack(result);
        });
    }

    module.exports = {
        createRecord: createRecord,
        queryRecords: queryRecords,
        updateRecord: updateRecord,
        replaceRecord: replaceRecord,
        removeRecords: removeRecords
    };
    // db.close();  -- prob dont want to close this here
});
