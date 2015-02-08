(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Viewer.Image = (function(_super) {
    __extends(Image, _super);

    function Image(options) {
      Image.__super__.constructor.call(this, options);
      this.debugBaseId = this.id + "_" + this.element.data("type");
    }

    Image.prototype.convertElement = function() {
      this.img = $("<img>");
      return this.element.append(this.img);
    };

    Image.prototype.first_init = function() {
      var defer, _t;
      defer = $.Deferred();
      defer.notify(this.id + " : start load first image");
      window.performance.measure(this.debugBaseId + "_first_init");
      window.performance.mark(this.debugBaseId + "_first_init_start");
      _t = this;
      this.loadImage(this.src).then(function(img) {
        var measure, totalTime;
        _t.img.attr({
          'src': img.src,
          'width': img.width,
          'height': img.height
        });
        defer.resolve();
        window.performance.mark(_t.debugBaseId + "_first_init_end");
        measure = window.performance.getEntriesByName(_t.debugBaseId + "_first_init")[0];
        totalTime = measure.duration + measure.startTime;
        return performanceManager.WriteToLog(_t.debugBaseId + "_first_init", totalTime);
      });
      return defer;
    };

    Image.prototype.full_init = function() {
      performanceManager.WriteToLog(this.debugBaseId + "_full_init", 0);
    };

    Image.prototype.play = function() {};

    Image.prototype.stop = function() {};

    return Image;

  })(Viewer);

}).call(this);
