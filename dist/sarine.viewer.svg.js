
/*!
sarine.viewer.svg - v1.4.0 -  Thursday, September 3rd, 2015, 12:11:26 PM 
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
      this.viewersBaseUrl = options.baseUrl;
      this.stoneProperties = options.stoneProperties;
    }

    SarineSvg.prototype.convertElement = function() {
      return this.element;
    };

    SarineSvg.prototype.first_init = function() {
      var defer, _t;
      _t = this;
      defer = $.Deferred();
      $.getJSON(this.src + this.jsonFileName, function(data) {
        var SVG_width_mm, arr, stoneShape;
        if ("Round" !== _t.stoneProperties.shape) {
          arr = _t.svg.split('.');
          arr.splice(1, 0, _t.stoneProperties.shape.replace('Modified', ''));
          _t.svg = arr.join('.');
        }
        stoneShape = _t.stoneProperties.shape.replace('Modified', '');
        SVG_width_mm = stoneShape === 'Round' ? 'Diameter' : 'Width';
        _t.data = data;
        return $(_t.element).load(_t.viewersBaseUrl + "atomic/" + _t.version + "/assets/" + _t.svg, function(data) {
          _t.element.find("#SVG_width_mm").text(parseFloat(_t.data[SVG_width_mm].mm).toFixed(2) + "mm");
          _t.element.find("#SVG_table_pre").text(parseFloat(_t.data["Table Size"].percentages) + "%");
          _t.element.find("#SVG_crown_pre").text(parseFloat(_t.data["Crown"]["height-percentages"]).toFixed(1) + "%");
          _t.element.find("#SVG_crown_mm").text(parseFloat(_t.data["Crown"]["height-mm"]).toFixed(2) + "mm");
          _t.element.find("#SVG_pavillion_pre").text(parseFloat(_t.data["Pavilion"]["height-percentages"]).toFixed(1) + "%");
          _t.element.find("#SVG_pavillion_mm").text(parseFloat(_t.data["Pavilion"]["height-mm"]).toFixed(2) + "mm");
          _t.element.find("#SVG_girdle_pre").text(parseFloat(_t.data["Girdle"]["Thickness-percentages"]).toFixed(1) + "%");
          _t.element.find("#SVG_girdle_mm").text(parseFloat(_t.data["Girdle"]["Thickness-mm"]).toFixed(2) + "mm");
          _t.element.find("#SVG_culet_mm").text(parseFloat(_t.data["Culet Size"].percentages) + "%");
          _t.element.find("#SVG_crown_rounded").text(parseFloat(_t.data["Crown"]["angel-deg"]).toFixed(1) + "°");
          _t.element.find("#SVG_pavillion_rounded").text(parseFloat(_t.data["Pavilion"]["angel-deg"]).toFixed(1) + "°");
          _t.element.find("#SVG_total_depth_per").text(parseFloat(_t.data["Total Depth"]["mm"]).toFixed(2) + "mm");
          _t.element.find("#SVG_total_depth_mm").text(parseFloat(_t.data["Total Depth"]["percentages"]) + "%");
          return defer.resolve(_t);
        });
      }).fail(function() {
        return _t.loadImage(_t.callbackPic).then(function(img) {
          var canvas;
          canvas = $("<canvas >");
          canvas.attr({
            "class": "no_stone",
            "width": img.width,
            "height": img.height
          });
          canvas[0].getContext("2d").drawImage(img, 0, 0, img.width, img.height);
          _t.element.append(canvas);
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
