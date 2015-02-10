(function() {
  var SarineImage,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  SarineImage = (function(_super) {
    __extends(SarineImage, _super);

    function SarineImage(options) {
      SarineImage.__super__.constructor.call(this, options);
      this.imagesArr = options.imagesArr;
    }

    SarineImage.prototype.convertElement = function() {
      return this.element;
    };

    SarineImage.prototype.first_init = function() {
      var defer, index, name, _i, _len, _ref, _t;
      defer = $.Deferred();
      defer.notify(this.id + " : start load first image");
      _t = this;
      _ref = this.imagesArr;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        name = _ref[index];
        this.loadImage(this.src + name).then(function(img) {
          var canvas, ctx;
          canvas = $("<canvas>");
          ctx = canvas[0].getContext('2d');
          canvas.attr({
            width: img.width,
            height: img.height
          });
          ctx.drawImage(img, 0, 0, img.width, img.height);
          _t.element.append(canvas);
          return defer.resolve();
        });
      }
      return defer;
    };

    SarineImage.prototype.full_init = function() {};

    SarineImage.prototype.play = function() {};

    SarineImage.prototype.stop = function() {};

    return SarineImage;

  })(Viewer);

  this.SarineImage = SarineImage;

}).call(this);
