var Badge = require('./model/badge');
var Game = require('./model/game');

function setupRoutes(router) {
    requestLogMiddleware(router);

    allGameRequests(router);
    gameIdRequests(router);
    platformRequests(router);
    allBadgeRequests(router);
    badgeIdRequests(router);

    errorHandlingMiddleware(router);
}

function requestLogMiddleware(router) {
    router
        .use(function(req, res, next) {
            console.log('Requested ' + req.method + ': ' + req.url);
            next();
        });
}

function errorHandlingMiddleware(router) {
    router.use(function(req, res, next) {
        res.status(404);
        res.json({
            status: 404,
            message: 'Not Found'
        });
        console.log('Requested information not found.');
    });
}

function allGameRequests(router) {
    router.route('/games')
        .post(function(req, res) {
            var game = new Game();
            updateItem(game, req.body);
            game.save(function(err) {
                sendMessage(res, err, 'Game successfully created.');
            });
        })
        .get(function(req, res) {
            var findObj = Game.find({});
            handleSort(req.query, findObj).exec(function(err, games) {
                sendResult(res, err, games);
            });
        });
}

function gameIdRequests(router) {
    router.route('/games/:game_id')
        .get(function(req, res) {
            Game.findById(req.params.game_id, function(err, game) {
                sendResult(res, err, game);
            });
        })
        .put(function(req, res) {
            Game.findByIdAndUpdate(req.params.game_id, {
                $set: req.body
            }, function(err) {
                sendMessage(res, err, 'Game successfully updated.');
            });
        })
        .delete(function(req, res) {
            Game.findByIdAndRemove(req.params.game_id, function(err) {
                sendMessage(res, err, 'Game successfully removed.');
            });
        });
}

function platformRequests(router) {
    router.route('/games/:game_id/platforms')
        .put(function(req, res) {
            Game.findByIdAndUpdate(req.params.game_id, {
                $push: {
                    platforms: {
                        $each: req.body.platforms
                    }
                }
            }, {
                upsert: true
            }, function(err) {
                sendMessage(res, err, 'Game platforms successfully appended.');
            })
        });
}

function allBadgeRequests(router) {
    router.route('/games/:game_id/badges')
        .post(function(req, res) {
            var badge = new Badge();
            updateItem(badge, req.body);
            Game.findByIdAndUpdate(req.params.game_id, {
                $push: {
                    badges: badge
                }
            }, function(err) {
                sendMessage(res, err, 'Badge successfully added.');
            });
        })
        .get(function(req, res) {
            Game.findById(req.params.game_id, function(err, game) {
                sendResult(res, err, game.badges);
            });
        })
        .delete(function(req, res) {
            Game.findByIdAndUpdate(req.params.game_id, {
                $set: {
                    badges: []
                }
            }, function(err) {
                sendMessage(res, err, 'All game badges deleted!');
            });
        });
}

function badgeIdRequests(router) {
    router.route('/games/:game_id/badges/:badge_id')
        .get(function(req, res) {
            Game.findById(req.params.game_id, function(err, game) {
                sendResult(res, err, game.badges.id(req.params.badge_id));
            });
        })
        .put(function(req, res) {
            var updateFields = {};
            for (var key in req.body) {
                updateFields['badges.$.' + key] = req.body[key];
            }
            Game.update({
                _id: req.params.game_id,
                'badges._id': req.params.badge_id
            }, {
                $set: updateFields
            }, function(err) {
                sendMessage(res, err, 'Updated badge within game.');
            });
        })
        .delete(function(req, res) {
            Game.update({
                _id: req.params.game_id
            }, {
                $pull: {
                    badges: {
                        _id: req.params.badge_id
                    }
                }
            }, function(err) {
                sendMessage(res, err, 'Deleted badge from game.');
            });
        });
}


// HELPERS
function updateItem(item, body) {
    for (var key in body) {
        item[key] = body[key];
    }
}

function sendResult(res, err, json) {
    if (err) {
        res.status(500).send(err);
    } else {
        res.status(200).json(json);
    }
}

function handleSort(params, findObj) {
    var sortField = params.sortField;

    var direction;
    (params.direction === 'ASC') &&
        (direction = 1);
    (params.direction === 'DSC') &&
        (direction = -1);

    (sortField && direction) &&
        (findObj = findObj.sort([[sortField, direction]]));
    return findObj;
}

function sendMessage(res, err, message) {
    sendResult(res, err, {message: message});
}




module.exports = {
    setupRoutes: setupRoutes
};