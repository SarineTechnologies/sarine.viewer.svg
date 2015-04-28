
/*!
sarine.viewer.svg - v0.0.0 -  Tuesday, April 28th, 2015, 2:19:01 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

(function() {
  var SarineSvg, Viewer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Viewer = (function() {
    var error, rm;

    rm = ResourceManager.getInstance();

    function Viewer(options) {
      console.log("");
      this.first_init_defer = $.Deferred();
      this.full_init_defer = $.Deferred();
      this.src = options.src, this.element = options.element, this.autoPlay = options.autoPlay, this.callbackPic = options.callbackPic;
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

    Viewer.prototype.setTimeout = function(delay, callback) {
      return rm.setTimeout.apply(this, [this.delay, callback]);
    };

    return Viewer;

  })();

  this.Viewer = Viewer;

  SarineSvg = (function(_super) {
    __extends(SarineSvg, _super);

    function SarineSvg(options) {
      SarineSvg.__super__.constructor.call(this, options);
      this.imagesArr = options.imagesArr, this.jsonFileName = options.jsonFileName, this.svg = options.svg;
      this.version = $(this.element).data("version") || "v1";
      this.viewersBaseUrl = stones[0].viewersBaseUrl;
    }

    SarineSvg.prototype.convertElement = function() {
      return this.element;
    };

    SarineSvg.prototype.first_init = function() {
      var defer, _t;
      _t = this;
      defer = $.Deferred();
      $.getJSON(this.src + this.jsonFileName, function(data) {
        _t.data = data;
        return $(_t.element).load(_t.viewersBaseUrl + "atomic/" + _t.version + "/assets/" + _t.svg, function(data) {
          _t.element.find("#SVG_width_mm").text(_t.data.Width.mm + "mm");
          _t.element.find("#SVG_table_pre").text(_t.data["Table Size"].percentages + "%");
          _t.element.find("#SVG_crown_pre").text(_t.data["Crown"]["height-percentages"] + "%");
          _t.element.find("#SVG_crown_mm").text(_t.data["Crown"]["height-mm"] + "mm");
          _t.element.find("#SVG_pavillion_pre").text(_t.data["Pavilion"]["height-percentages"] + "%");
          _t.element.find("#SVG_pavillion_mm").text(_t.data["Pavilion"]["height-mm"] + "mm");
          _t.element.find("#SVG_girdle_pre").text(_t.data["Girdle"]["Thickness-percentages"] + "%");
          _t.element.find("#SVG_girdle_mm").text(_t.data["Girdle"]["Thickness-mm"] + "mm");
          _t.element.find("#SVG_culet_mm").text(_t.data["Culet Size"].mm + "mm");
          _t.element.find("#SVG_crown_rounded").text(_t.data["Crown"]["angel-deg"] + "°");
          _t.element.find("#SVG_pavillion_rounded").text(_t.data["Pavilion"]["angel-deg"] + "°");
          return defer.resolve(_t);
        });
      });
      return defer;
    };

    SarineSvg.prototype.full_init = function() {
      var defer;
      defer = $.Deferred();
      defer.resolve(this);
      return defer;
    };

    SarineSvg.prototype.play = function() {};

    SarineSvg.prototype.stop = function() {};

    return SarineSvg;

  })(Viewer);

  this.SarineSvg = SarineSvg;

}).call(this);
