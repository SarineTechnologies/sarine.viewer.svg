(function() {
  var Viewer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Viewer = (function() {
    var error, rm;

    rm = ResourceManager.getInstance();

    function Viewer(options) {
      this.first_init_defer = $.Deferred();
      this.full_init_defer = $.Deferred();
      this.src = options.src, this.element = options.element, this.autoPlay = options.autoPlay;
      this.id = this.element[0].id;
      this.element = this.convertElement();
      Object.getOwnPropertyNames(Viewer.prototype).forEach(function(k) {
        if (this[k].name === "Error") {
          return console.error(this.id, k, "Must be implement", this);
        }
      }, this);
      this.element.data("class", this);
      this.element.on("play", function(e) {
        return $(e.target).data("class").play.apply($(e.target).data("class"), [true]);
      });
      this.element.on("stop", function(e) {
        return $(e.target).data("class").stop.apply($(e.target).data("class"), [true]);
      });
      this.element.on("cancel", function(e) {
        return $(e.target).data("class").cancel().apply($(e.target).data("class"), [true]);
      });
    }

    error = function() {
      return console.error(this.id, "must be implement");
    };

    Viewer.prototype.first_init = Error;

    Viewer.prototype.full_init = Error;

    Viewer.prototype.play = Error;

    Viewer.prototype.stop = Error;

    Viewer.prototype.convertElement = Error;

    Viewer.prototype.cancel = function() {
      return rm.cancel(this);
    };

    Viewer.prototype.loadImage = function(src) {
      return rm.loadImage.apply(this, [src]);
    };

    Viewer.prototype.setTimeout = function(fun, delay) {
      return rm.setTimeout.apply(this, [this.delay]);
    };

    return Viewer;

  })();

  console.log("");

  this.Viewer = Viewer;

  Viewer.Image = (function(_super) {
    __extends(Image, _super);

    function Image(options) {
      this.imagesArr = options.imagesArr;
      Image.__super__.constructor.call(this, options);
    }

    Image.prototype.convertElement = function() {
      return this.element;
    };

    Image.prototype.first_init = function() {
      var defer, index, name, _i, _len, _ref, _t;
      defer = $.Deferred();
      defer.notify(this.id + " : start load first image");
      _t = this;
      _ref = this.imagesArr;
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        name = _ref[index];
        this.loadImage(_t.src + name).then(function(img) {
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

    Image.prototype.full_init = function() {};

    Image.prototype.play = function() {};

    Image.prototype.stop = function() {};

    return Image;

  })(Viewer);

}).call(this);
