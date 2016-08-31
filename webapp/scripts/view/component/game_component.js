inherits(GameComponent, Component);

function GameComponent(_data) {
    Component.call(this);

    var me = this;
    var el;

    var id = _data._id;
    var title,
        genre,
        year,
        publisher,
        developer,
        platforms;

    setData(_data);
    
    var expanded = false; 
    var makingBadgeRequest = false;
    var gameElId = 'game-' + id;
    var badgeListId = 'badge-list-' + id;
    var showBadgesText = '&rtrif; Show badges';
    var hideBadgesText = '&dtrif; Hide badges';

    //Override
    this.createElement = function() {
        el = document.createElement('div');
        el.id = gameElId;
        el.setAttribute('class', 'game-component');

        var titleEl = document.createElement('h3');
        titleEl.setAttribute('class', 'game-title');
        titleEl.innerHTML = title;

        var metaEl = document.createElement('div');
        metaEl.setAttribute('class', 'game-meta');
        metaEl.innerHTML =
            '<div class="game-genre-container">' +
                '<span class="genre-label">Genre: </span>' +
                '<span class="game-genre">' + genre + '</span>' +
            '</div>' +
            '<div class="game-year-container">' +
                '<span class="year-label">Release Year: </span>' +
                '<span class="game-year">' + year + '</span>' +
            '</div>' +
            '<div class="game-publisher-container">' +
                '<span class="publisher-label">Publisher: </span>' +
                '<span class="game-publisher">' + publisher + '</span>' +
            '</div>' +
            '<div class="game-developer-container">' +
                '<span class="developer-label">Developer: </span>' +
                '<span class="game-developer">' + developer + '</span>' +
            '</div>';  //add platforms

        var badgeListEl = document.createElement('div');
        badgeListEl.id = badgeListId;
        badgeListEl.setAttribute('class', 'show-badges');

        var badgeListElTitle = document.createElement('div');
        badgeListElTitle.setAttribute('class', 'show-badges-title no-select');
        //todo: figure out an efficient way to keep track of count - show in parens - perhaps store as field in game record
        badgeListElTitle.innerHTML = showBadgesText;
        badgeListEl.appendChild(badgeListElTitle);
        badgeListElTitle.onclick = toggleShowBadges;

        el.appendChild(titleEl);
        appendAdminLinks();
        el.appendChild(metaEl);
        el.appendChild(badgeListEl);

        return el;
    };

    this.updateElement = function(newData) {
        for (var key in newData) {
            var children = el.getElementsByClassName('game-' + key);
            if (children && children.length > 0) {
                children[0].innerHTML = newData[key];
            }
        }
    };

    this.getGameId = function() {
        return id;
    };


    // private functions

    function setData(__data) {
        title = __data.title;
        genre = __data.genre;
        year = __data.year;
        publisher = __data.publisher;
        developer = __data.developer;
        platforms = __data.platforms;
    }
    
    function appendAdminLinks() {
        //todo: add admin check to show any of these...
        var addBtn = new AddComponent(
            handleClickAdd,
            'Add Badge'
        ).createElement();

        var updateBtn = new UpdateComponent(
            handleClickUpdate,
            'Update Game Information'
        ).createElement();

        var removeBtn = new RemoveComponent(
            'Are you sure you want to delete this game and all of its badges?!',
            handleClickRemove,
            'Remove Game'
        ).createElement();

        el.appendChild(removeBtn);
        el.appendChild(updateBtn);
        el.appendChild(addBtn);
    }

    function toggleShowBadges(e) {
        var titleEl = e.currentTarget;
        var el = titleEl.parentNode;

        if (!expanded && !makingBadgeRequest) { //creates badge list
            var badgeRequest = new BadgeRequestMaker();
            badgeRequest.getAll(function(response) {
                expanded = true;
                makingBadgeRequest = false;
                titleEl.innerHTML = hideBadgesText;

                var childEl = document.createElement('div');
                el.appendChild(childEl);

                var badgeList = new BadgeList(response, childEl, id);
                badgeList.renderBadgeList();
            }, id);
            makingBadgeRequest = true;

        } else if (expanded) {  //removes all children to collapse
            el.removeChild(el.lastChild);
            titleEl.innerHTML = showBadgesText;
            expanded = false;
        }
    }

    function handleClickAdd() {
        showModal(
            'Create Badge',
            new BadgeFormComponent(
                'create',
                'Cancel Badge Creation',
                'Are you sure you want to cancel badge creation?',
                createBadgeCallBack,
                id
            )
        );
    }

    function handleClickUpdate() {
        showModal(
            'Edit Game',
            new GameFormComponent(
                'update',
                'Cancel Game Modification',
                'Are you sure you want to cancel any edits made to this game?',
                updateGameCallBack,
                _data
            )
        );
    }
    
    function showModal(title, innerComponent) {
        var modal = new ModalComponent(
            title,
            innerComponent
        ).createElement();
        document.body.appendChild(modal);
    }

    function handleClickRemove() {
        var gameRequest = new GameRequestMaker();
        gameRequest.deleteOne(function(response) {
            el.parentNode.removeChild(el);
        }, id);
    }

    function createBadgeCallBack(data) {
        if (expanded) {
            var badge = new BadgeComponent(data, id);
            var badgeListEl = document.getElementById(badgeListId).lastChild;
            badgeListEl.appendChild(
                badge.createElement()
            );
        }
    }

    function updateGameCallBack(data) {
        setData(data);
        me.updateElement(data);
    }
}