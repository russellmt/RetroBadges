var path = require('path');

function setupRoutes(router, viewPath) {
    listGamesPage(router, viewPath);
    createGamePage(router, viewPath);
}

function listGamesPage(router, viewPath) {
    router.route('/games')
        .get(function(req, res) {
            res.status(200).sendFile(path.join(viewPath + '/list_games.html'));
        });
}

function createGamePage(router, viewPath) {
    router.route('/games/create')
        .get(function(req, res) {
            res.status(200).sendFile(path.join(viewPath + '/create_game.html'));
        });
}

module.exports = {
    setupRoutes: setupRoutes
};