
/*!
sarine.viewer.svg - v0.0.1 -  Tuesday, April 28th, 2015, 2:31:56 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

(function() {
  var SarineSvg,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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
