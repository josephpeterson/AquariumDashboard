class Vector {
    constructor(public x,public y,public z){};
}
export class CameraConfiguration {
    height: number = 1080;
    width: number = 1920;
    sharpness: number = 0;
    saturation: number = 0;
    contrast: number = 0;
    brightness: number = 0;
    iso: number = 100;
    hFlip: boolean = false;
    vFlip: boolean = false;
    roi: Vector = new Vector(0,0,0);
    rotation: number = 0;
}
