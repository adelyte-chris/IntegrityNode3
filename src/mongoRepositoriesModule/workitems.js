(function (workitems) {

    var database = require("./database");
    var q = require("q");


    workitems.getByTitle = function(title){
        var deferred = q.defer();
        database.getDb(function(err, db){
            if (err){
                deferred.reject("Database initialization failed with error: " + err);
                return;
            }
            if (!title){
                deferred.reject("A title must be passed into the getByTitle method");
            }
            db.workitems.findOne({ title: title }, function(err, workitemFound){
                if (err) {
                    deferred.reject("Find of workitem with title " + title + " failed with error: " + err);
                    return;
                }
                deferred.resolve(workitemFound);
            })
        });
        return deferred.promise;
    };

    workitems.insert = function(workitem){
        return database.passToDb(function(deferred, db){
            db.workitems.insert(workitem, function(err) {
                if (err) {
                    console.log("Failed to insert workitem into database.");
                    deferred.reject("Failed to insert workitem into the database. Error:" + err);
                }
                else deferred.resolve(workitem);
            });
        });
    };

    workitems.update = function(workitem){
        return database.passToDb(function(deferred, db){
            db.workitems.update({id:workitem.id}, workitem, null, function(err){
                if (err){
                    deferred.reject("Update of workitem id " + workitem.id + " failed with error: " + err);
                } else{
                    deferred.resolve(workitem);
                }
            });
        });
    };

    workitems.remove = function(id){
        return database.passToDb(function(deferred, db){
            db.workitems.remove({id:id}, function(err, result){
                if (err) {
                    deferred.reject("Remove of workitem with id " + id + " failed with error: " + err);
                    return;
                }
                deferred.resolve(id);
            })
        });
    };

    workitems.get = function(id){
        if (!id){
            var defer = q.defer();
            defer.reject("An id is required for a get operation")
            return defer.promise
        }
        return database.passToDb(function(deferred, db){
            db.workitems.findOne({"id": id }, function (err, workitemFound){
                if (err){
                    deferred.reject("Find of workitem with id " + id + " failed with error: " + err);
                    return;
                }
                deferred.resolve(workitemFound);
            });
        });
    };

})(module.exports);

