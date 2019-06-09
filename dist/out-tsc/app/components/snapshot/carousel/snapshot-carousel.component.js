import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { isLoadingSnapshots, getAllSnapshots } from 'src/app/store/snapshot/snapshot.selector';
import { take } from 'rxjs/operators';
import { SnapshotLoadByAquariumAction } from 'src/app/store/snapshot/snapshot.actions';
import { getSelectedAquarium } from 'src/app/store/aquarium/aquarium.selector';
var SnapshotCarouselComponent = /** @class */ (function () {
    function SnapshotCarouselComponent(store) {
        this.store = store;
        this.selectedId = 0;
        this.componentLifeCycle = new Subject();
        this.loading$ = this.store.select(isLoadingSnapshots);
        this.data$ = this.store.select(getAllSnapshots);
        this.aquarium$ = this.store.select(getSelectedAquarium);
    }
    SnapshotCarouselComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data$.subscribe(function (data) {
            var photos = data.filter(function (snapshot) { return (snapshot.photoPath != null); });
            _this.photoSnapshots = photos.sort(function (a, b) { return b.id - a.id; });
        });
        this.aquarium$.pipe(take(1)).subscribe(function (aq) {
            _this.store.dispatch(new SnapshotLoadByAquariumAction(aq.id));
            _this.aquarium = aq;
        });
    };
    SnapshotCarouselComponent.prototype.ngOnDestroy = function () {
        this.componentLifeCycle.next();
        this.componentLifeCycle.unsubscribe();
    };
    //Deprecated
    SnapshotCarouselComponent.prototype.scrollScroller = function (event) {
        var scroller = this.scroller.nativeElement;
        scroller.scrollTop += event.deltaY;
        event.preventDefault();
    };
    SnapshotCarouselComponent.prototype.handleKey = function (event) {
        event.preventDefault();
        event.key === 'ArrowUp' ? this.propagate(-1) : this.propagate(1);
    };
    SnapshotCarouselComponent.prototype.setSelectedId = function (id) {
        //Handle overflow
        if (id < 0)
            id = this.photoSnapshots.length - 1;
        else if (id >= this.photoSnapshots.length)
            id = 0;
        this.selectedId = id;
    };
    SnapshotCarouselComponent.prototype.propagate = function (num) {
        this.setSelectedId(this.selectedId + num);
        var snapshots = this.scroller.nativeElement.getElementsByClassName("content");
        snapshots[this.selectedId].scrollIntoView({ behavior: "auto", block: "end", inline: "nearest" });
    };
    //Move this to the service
    SnapshotCarouselComponent.prototype.getSnapshotSrc = function (snapshot) {
        return "http://65.29.174.115/v1/Snapshot/Photo/" + snapshot.id + "?" + snapshot.date;
    };
    SnapshotCarouselComponent.prototype.readableDate = function (dateString) {
        return new Date(dateString).toLocaleTimeString('en-US');
    };
    SnapshotCarouselComponent.prototype.generateChart = function () {
    };
    tslib_1.__decorate([
        ViewChild("scroller"),
        tslib_1.__metadata("design:type", Object)
    ], SnapshotCarouselComponent.prototype, "scroller", void 0);
    SnapshotCarouselComponent = tslib_1.__decorate([
        Component({
            selector: 'snapshot-carousel',
            templateUrl: './snapshot-carousel.component.html',
            styleUrls: ['./snapshot-carousel.component.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [Store])
    ], SnapshotCarouselComponent);
    return SnapshotCarouselComponent;
}());
export { SnapshotCarouselComponent };
//# sourceMappingURL=snapshot-carousel.component.js.map