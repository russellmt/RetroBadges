function BadgeComponent(_data, _gameId) {
    Component.call(this);

    var me = this;
    var el;
    var id = _data._id;
    var title = _data.title;
    var desc = _data.desc;
    var gameId = _gameId;
    
    //Override
    this.createElement = function() {
        el = document.createElement('div');
        el.id = 'badge-' + id;
        el.setAttribute('class', 'badge-component');
        
        var titleEl = document.createElement('h4');
        titleEl.setAttribute('class', 'badge-title');
        titleEl.innerHTML = title;
        
        var metaEl = document.createElement('div');
        metaEl.setAttribute('class', 'badge-meta');
        metaEl.innerHTML = '<div class="badge-desc">' + desc + '</div>';
        
        el.appendChild(titleEl);
        appendAdminLinks(el);
        el.appendChild(metaEl);
        
        return el;
    };

    this.updateElement = function(newData) {
        for (var key in newData) {
            var children = el.getElementsByClassName('badge-' + key);
            if (children && children.length > 0) {
                children[0].innerHTML = newData[key];
            }
        }
    };
    
    function appendAdminLinks() {
        var updateBtn = new UpdateComponent(
            handleEdit,
            'Update Badge Information'
        ).createElement();
        
        var removeBtn = new RemoveComponent(
            'Are you sure you want to remove badge?',
            handleRemove,
            'Remove Badge'
        ).createElement();
        
        el.appendChild(removeBtn);
        el.appendChild(updateBtn);
    }

    function handleEdit() {
        var modal = new ModalComponent(
            'Edit Badge',
            new BadgeFormComponent(
                'update',
                'Cancel Badge Modification',
                'Are you sure you want to cancel edits to this badge?',
                updateBadgeCallBack,
                gameId,
                _data
            )
        ).createElement();
        document.body.appendChild(modal);
    }
    
    function handleRemove() {
        var badgeRequest = new BadgeRequestMaker();
        badgeRequest.deleteOne(function(response) {
            el.parentNode.removeChild(el);
        }, gameId, id);
    }

    function updateBadgeCallBack(data) {
        title = data.title;
        desc = data.desc;

        me.updateElement(data);
    }
    
    


}