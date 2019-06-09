var Vector = /** @class */ (function () {
    function Vector(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    ;
    return Vector;
}());
var CameraConfiguration = /** @class */ (function () {
    function CameraConfiguration() {
        this.height = 1080;
        this.width = 1920;
        this.sharpness = 0;
        this.contrast = 0;
        this.saturation = 0;
        this.brightness = 50;
        this.exposureMode = 'auto';
        this.iso = 100;
        this.hFlip = false;
        this.vFlip = false;
        this.roiX = 0;
        this.roiY = 0;
        this.roiW = 1;
        this.roiH = 1;
        this.rotation = 0;
    }
    return CameraConfiguration;
}());
export { CameraConfiguration };
export var CameraExposureModes = [
    { value: "auto", viewValue: "auto" },
    { value: "night", viewValue: "night" },
    { value: "nightpreview", viewValue: "nightpreview" },
    { value: "backlight", viewValue: "backlight" },
    { value: "spotlight", viewValue: "spotlight" },
    { value: "sports", viewValue: "sports" },
    { value: "beach", viewValue: "beach" },
    { value: "verylong", viewValue: "verylong" },
    { value: "fixedfps", viewValue: "fixedfps" },
    { value: "antishake", viewValue: "antishake" },
    { value: "fireworks", viewValue: "fireworks" }
];
//# sourceMappingURL=CameraConfiguration.js.map