import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LEDElement } from 'src/app/models/LEDElement';
import { AquariumService } from 'src/app/services/aquarium-service/aquarium.service';
var map = "04 03 02 01                                     25 26 27 28\n05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24\n48 47 46 45 44 43 42 41 40 39 38 37 36 35 34 33 32 31 30 29\n49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68\n84 83 72 81 80 79 78 77             76 75 74 73 72 71 70 69 \n".trim();
//To rows
var rows = [];
var r = map.split("\n");
var count = 0;
for (var i = 0; i < r.length; i++) {
    var row = r[i].replace(/\s\s\s/g, " XX").split(" ");
    var d = [];
    for (var j = 0; j < row.length; j++) {
        var id = row[j];
        var l = new LEDElement();
        if (id == "XX") {
            l.active = false;
            l.id = 0;
        }
        else {
            l.id = parseInt(id);
            l.active = true;
        }
        d.push(l);
    }
    rows[i] = d;
}
var LightingComponent = /** @class */ (function () {
    function LightingComponent(aquariumService, dialog) {
        this.aquariumService = aquariumService;
        this.dialog = dialog;
        this.rows = rows;
    }
    LightingComponent.prototype.ngOnInit = function () {
        console.log(this.rows);
    };
    LightingComponent.prototype.sendUpdate = function () {
        //Get all the leds
        var leds = [];
        for (var i = 0; i < this.rows.length; i++)
            this.rows[i].forEach(function (l) {
                if (!l.active)
                    return;
                var color = hexToRgb(l.color);
                if (color) {
                    l.r = color.r;
                    l.g = color.g;
                    l.b = color.b;
                }
                leds.push(l);
            });
        var config = {
            ledData: leds
        };
        this.aquariumService.SendLightingConfiguration(config);
    };
    LightingComponent = tslib_1.__decorate([
        Component({
            selector: 'lighting-page-component',
            templateUrl: './lighting.component.html',
            styleUrls: ['./lighting.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [AquariumService,
            MatDialog])
    ], LightingComponent);
    return LightingComponent;
}());
export { LightingComponent };
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
//# sourceMappingURL=lighting.component.js.map