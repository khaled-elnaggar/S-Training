var EasyLevel = /** @class */ (function () {
    function EasyLevel() {
        this.EMOJIS = ["😇", "🙃", "🤪", "😂", "😜", "🥺"];
        this.currLevel = 1;
        this.randomCount = 1;
    }
    EasyLevel.prototype.incLevel = function () {
        this.currLevel++;
        this.randomCount = this.currLevel;
    };
    EasyLevel.prototype.getCurrLevel = function () { return this.currLevel; };
    ;
    EasyLevel.prototype.decRandomCount = function () { this.randomCount--; };
    ;
    EasyLevel.prototype.getImageCount = function () { return this.currLevel * 8; };
    ;
    EasyLevel.prototype.getRandomCount = function () { return this.randomCount; };
    ;
    EasyLevel.prototype.getImageSize = function () { return Math.max(50, 100 - (10 * this.currLevel)); };
    ;
    EasyLevel.prototype.getEmoji = function () { return (this.currLevel < 4) ? this.EMOJIS[this.currLevel - 1] : this.EMOJIS[Math.floor(this.EMOJIS.length * Math.random())]; };
    ;
    EasyLevel.prototype.resetLevel = function () { this.currLevel = 1; };
    ;
    return EasyLevel;
}());
var TenFiveScore = /** @class */ (function () {
    function TenFiveScore() {
        this.score = 0;
    }
    TenFiveScore.prototype.getScore = function () { return this.score; };
    ;
    TenFiveScore.prototype.incScore = function () { this.score += 10; };
    ; // Decrease the amount of random images from level inside image factory LEVEL.decRandomCount()
    TenFiveScore.prototype.decScore = function () { this.score -= 5; };
    ;
    TenFiveScore.prototype.resetScore = function () { this.score = 0; };
    ;
    return TenFiveScore;
}());
var HTMLView = /** @class */ (function () {
    function HTMLView(level, score) {
        this.LEFT_CARD = document.getElementById('left-card');
        this.RIGHT_CARD = document.getElementById('right-card');
        this.SCORE_SPAN = document.getElementById('score-span');
        this.LEVEL_SPAN = document.getElementById('level-span');
        this.IMAGES_LEFT_SPAN = document.getElementById('mismatched-span');
        this.level = level;
        this.score = score;
    }
    HTMLView.prototype.updateGame = function () {
        this.SCORE_SPAN.innerHTML = String(this.score.getScore());
        this.IMAGES_LEFT_SPAN.innerHTML = String(this.level.getRandomCount());
        this.LEVEL_SPAN.innerHTML = String(this.level.getCurrLevel());
        if (this.level.getRandomCount() == 0) {
            this.goToNextLevet();
        }
    };
    HTMLView.prototype.goToNextLevet = function () {
        this.LEFT_CARD.replaceChildren();
        this.RIGHT_CARD.replaceChildren();
        this.level.incLevel();
        this.updateGame();
    };
    return HTMLView;
}());
//===========================================================================================================================
var ImageFactory = /** @class */ (function () {
    function ImageFactory(level, score, view) {
        this.LEFT_CARD = document.getElementById('left-card');
        this.RIGHT_CARD = document.getElementById('right-card');
        this.level = level;
        this.score = score;
        this.view = view;
    }
    ImageFactory.prototype.genAnImage = function () {
        var offset = this.level.getImageSize() / 5;
        var left = Math.random() * (100 - offset) + "%";
        var top = Math.random() * (100 - offset) + "%";
        var image = document.createElement('span');
        image.style.left = left;
        image.style.top = top;
        image.style.fontSize = this.level.getImageSize() + "px";
        image.style.position = "absolute";
        image.style.cursor = "crosshair";
        image.innerHTML = this.level.getEmoji();
        return image;
    };
    ImageFactory.prototype.genLeftAndRight = function () {
        var _this = this;
        var imageLeft = this.genAnImage();
        imageLeft.addEventListener('click', function () {
            _this.score.decScore();
            _this.view.updateGame();
        });
        this.LEFT_CARD.appendChild(imageLeft);
        var imageRight = imageLeft.cloneNode();
        imageRight.innerHTML = imageLeft.innerHTML;
        imageRight.addEventListener('click', function () {
            _this.score.decScore();
            _this.view.updateGame();
        });
        this.RIGHT_CARD.appendChild(imageRight);
    };
    ImageFactory.prototype.genRandomLeft = function () {
        var _this = this;
        var randomImage = this.genAnImage();
        randomImage.addEventListener('click', function (e) {
            var currLvl = _this.level.getCurrLevel();
            _this.score.incScore();
            _this.LEFT_CARD.removeChild(e.target);
            _this.level.decRandomCount();
            _this.view.updateGame();
            if (currLvl != _this.level.getCurrLevel()) {
                _this.genAllImages();
            }
        });
        this.LEFT_CARD.appendChild(randomImage);
    };
    ImageFactory.prototype.genAllImages = function () {
        for (var i = 0; i < this.level.getImageCount(); i++) {
            this.genLeftAndRight();
        }
        for (var i = 0; i < this.level.getRandomCount(); i++) {
            this.genRandomLeft();
        }
    };
    return ImageFactory;
}());
(function main() {
    console.log('compiled successfully');
    var level = new EasyLevel();
    var scoreSystem = new TenFiveScore();
    var gameView = new HTMLView(level, scoreSystem);
    var imgFactory = new ImageFactory(level, scoreSystem, gameView);
    imgFactory.genAllImages();
})();
