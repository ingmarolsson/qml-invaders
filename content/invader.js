.import "vector2d.js" as Vector2d
.import "objectFactory.js" as ObjectFactory
.import "invaderPhysicsModel.js" as InvaderPhysicsModel

function create(options, doneCallback) {

    var _invader = (function(options, doneCallback){

        var _exports = {};

        var _dataModel = null;
        var _view = null;

        var _deleteMe = false;

        _exports.deleteLater = function(){
            _dataModel.deleteLater();
            _deleteMe = true;
        }

        _exports.isToBeDeleted = function(){
            return _deleteMe;
        }

        _exports.setPosition = function(x, y){
            if(_physicsModel !== null && _physicsModel !== undefined){
                _physicsModel.physicsBody.setPosition(x, y);
            }
            else {
                console.log("Error: No physics model created for invader. Can't set position for physics model.");
            }

            if(_view !== null && _view !== undefined){
                _view.x = x;
                _view.y = y;
            }
            else{
                console.log("Error: No view created for invader. Can't set position for view.");
            }

            //PS.PubSub.publish(Constants.TOPIC_invader_POSITION, { x: _position._x, y: _position._y });
        }

        _exports.setX = function(x){
            if(_physicsModel !== null && _physicsModel !== undefined){
                _physicsModel.physicsBody.setX(x);
            }
            else {
                console.log("Error: No physics model created for invader. Can't set position for physics model.");
            }

            if(_view !== null && _view !== undefined){
                _view.x = x;
            }
            else{
                console.log("Error: No view created for invader. Can't set position for view.");
            }

            //PS.PubSub.publish(Constants.TOPIC_invader_POSITION, { x: _position._x, y: _position._y });
        }

        _exports.setY = function(y){
            if(_physicsModel !== null && _physicsModel !== undefined){
                _physicsModel.physicsBody.setY(y);
            }
            else {
                console.log("Error: No physics model created for invader. Can't set position for physics model.");
            }

            if(_view !== null && _view !== undefined){
                _view.y = y;
            }
            else{
                console.log("Error: No view created for invader. Can't set position for view.");
            }

            //PS.PubSub.publish(Constants.TOPIC_invader_POSITION, { x: _position._x, y: _position._y });
        }

        // Return a copy of the position object so
        // that the original can not be modified.
        _exports.getPosition = function(){
            if(_physicsModel === null || _physicsModel === undefined){
                console.log("Error: No physics model created for invader. Can't get position.");
                return null;
            }

            return _physicsModel.physicsBody.getPosition();
        }

        var _onCollision = function(collidingObject){
            //console.log("DEBUG: Invader was hit by '" + collidingObject + "'");
            _exports.deleteLater();
        }

        var _onViewObjectCreated = function(object){
            if(object === null || object === undefined){
                console.log("Error: Failed to create View object for invader.");
                doneCallback(null);
                return;
            }

            _view = object;
            _createPhysicsModel();
        }

        var _createPhysicsModel = function(){
            _dataModel = InvaderPhysicsModel.create(_view.width, _view.height, _onCollision);

            if(_dataModel === null || _dataModel === undefined){
                console.log("Error: Failed to create Physics model for invader.");
                doneCallback(null);
                return;
            }

            _dataModel.physicsBody.setPosition(_view.x, _view.y);

            _onFinishedCreation();
        }

        var _onFinishedCreation = function(){
            _exports.view = _view;
            _exports.physicsObject = _dataModel;

            doneCallback(_exports);
        }

        var texture;
        if(options.invadertype === 'invader1'){
            texture = 'qrc:/content/images/invader1.png';
        }
        else if(options.invadertype === 'invader2'){
            texture = 'qrc:/content/images/invader2.png';
        }
        else if(options.invadertype === 'invader3'){
            texture = 'qrc:/content/images/invader3.png';
        }
        else{
            console.log("Error: options.invadertype not set, aborting creation.");
        }

        var _options = { qmlfile: 'EnemyShip.qml',
                        qmlparameters: { x: options.x, y: options.y },
                        qmlpostparameters: { source: texture } };

        ObjectFactory.createObject(_options, _onViewObjectCreated);



        return _exports;

    }(options, doneCallback));

    return _invader;
}

