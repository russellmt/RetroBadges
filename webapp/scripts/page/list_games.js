function ListGamePage() {

    var me = this;
    
    this.getItems = function() {
        addAdminLinks();

        var gameRequest = new GameRequestMaker();
        gameRequest.getAll(function(response) {
            var el = document.createElement('div');
            el.id = 'game-list';
            el.setAttribute('class', 'game-list');
            document.body.appendChild(el);

            var gameList = new GameList(response, el);
            gameList.renderGameList();
        });
    };

    function addAdminLinks() {
        var addBtn = new AddComponent(
            function() {
                document.body.appendChild(new ModalComponent(
                    'Enter Game Data',
                    new GameFormComponent(
                        'create',
                        'Cancel Game Creation',
                        'Are you sure you want to cancel game creation?',
                        createGameCallBack
                    )
                ).createElement());
            },
            'Add Game'
        ).createElement();
        addBtn.id = 'add-game';

        document.body.appendChild(addBtn);
    }

    function createGameCallBack() {
        var list = document.getElementById('game-list');
        var topPlus = document.getElementById('add-game');

        document.body.removeChild(list);
        document.body.removeChild(topPlus);

        new ListGamePage().getItems();
    }
}

(function() {
    window.onload = function() {
        var page = new ListGamePage();
        page.getItems();
    };
})();