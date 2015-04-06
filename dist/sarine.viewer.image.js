
/*!
sarine.viewer.image - v0.1.0 -  Monday, April 6th, 2015, 6:48:37 PM 
 The source code, name, and look and feel of the software are Copyright © 2015 Sarine Technologies Ltd. All Rights Reserved. You may not duplicate, copy, reuse, sell or otherwise exploit any portion of the code, content or visual design elements without express written permission from Sarine Technologies Ltd. The terms and conditions of the sarine.com website (http://sarine.com/terms-and-conditions/) apply to the access and use of this software.
 */

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
          var canvas, ctx, imgName;
          canvas = $("<canvas>");
          ctx = canvas[0].getContext('2d');
          imgName = img.src.substr(img.src.lastIndexOf("/") + 1, img.src.lastIndexOf("/")).slice(0, -4);
          canvas.attr({
            width: img.width,
            height: img.height,
            "class": imgName
          });
          ctx.drawImage(img, 0, 0, img.width, img.height);
          _t.element.append(canvas);
          return defer.resolve(_t);
        });
      }
      return defer;
    };

    SarineImage.prototype.full_init = function() {
      var defer;
      defer = $.Deferred();
      defer.resolve(this);
      return defer;
    };

    SarineImage.prototype.play = function() {};

    SarineImage.prototype.stop = function() {};

    return SarineImage;

  })(Viewer);

  this.SarineImage = SarineImage;

}).call(this);
