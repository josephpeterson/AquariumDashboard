import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { WaterChange } from 'src/app/models/WaterChange';
import { WaterDosing } from 'src/app/models/WaterDosing';
import { AquariumService } from 'src/app/services/aquarium.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AquariumLoadSuccessAction, AquariumLoadFailAction } from '../aquarium/aquarium.actions';
import { ParameterActions, ParameterSelectDateAction, ParameterSelectDateActionPayload, ParameterSelectDateFailAction, ParameterWaterParameterSuccessAction, ParameterWaterATOSuccessAction, ParameterWaterChangeSuccessAction, ParameterWaterDoseSuccessAction } from './parameter.actions';

@Injectable()
export class ParameterEffects {
    constructor(private aquariumService: AquariumService,
        private notificationService: NotificationService,
        private actions$: Actions) {

    }

    @Effect()
    loadPaginatedParameters$ = this.actions$.pipe(
        ofType<ParameterSelectDateAction>(
            ParameterActions.SelectDate
        ),
        map((action: ParameterSelectDateAction) => action.payload),
        mergeMap((payload: ParameterSelectDateActionPayload) =>
            this.aquariumService.getWaterParameters(payload.aquariumId,payload.pagination).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (parameters: AquariumSnapshot[]) =>
                    {
                        //this.notificationService.notify("success","Parameters loaded successfully: " + parameters.length);
                        return new ParameterWaterParameterSuccessAction(parameters)
                    }
                ),
                catchError(err => {
                    this.notificationService.notify("error","Could not load aquarium parameters");
                    console.error(err);
                    return of(new ParameterSelectDateFailAction(err))
                })
            )
        )
    );
    @Effect()
    loadPaginatedATOStatuses$ = this.actions$.pipe(
        ofType<ParameterSelectDateAction>(
            ParameterActions.SelectDate
        ),
        map((action: ParameterSelectDateAction) => action.payload),
        mergeMap((payload: ParameterSelectDateActionPayload) =>
            this.aquariumService.getWaterATOsByAquarium(payload.aquariumId,payload.pagination).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (atoStatuses: ATOStatus[]) =>
                    {
                        //this.notificationService.notify("success","Water ATOs loaded successfully: " + atoStatuses.length);
                        console.debug("Water ATOs loaded successfully: " + atoStatuses.length);
                        return new ParameterWaterATOSuccessAction(atoStatuses)
                    }
                ),
                catchError(err => {
                    this.notificationService.notify("error","Could not load water ATOs");
                    return of(new ParameterSelectDateFailAction(err))
                })
            )
        )
    );
    @Effect()
    loadPaginatedWaterChanges$ = this.actions$.pipe(
        ofType<ParameterSelectDateAction>(
            ParameterActions.SelectDate
        ),
        map((action: ParameterSelectDateAction) => action.payload),
        mergeMap((payload: ParameterSelectDateActionPayload) =>
            this.aquariumService.getWaterChangesByAquarium(payload.aquariumId,payload.pagination).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (waterChanges: WaterChange[]) =>
                    {
                        //this.notificationService.notify("success","Water changes loaded successfully: " + atoStatuses.length);
                        console.debug("Water changes loaded successfully: " + waterChanges.length);
                        return new ParameterWaterChangeSuccessAction(waterChanges)
                    }
                ),
                catchError(err => {
                    this.notificationService.notify("error","Could not load water changes");
                    return of(new ParameterSelectDateFailAction(err))
                })
            )
        )
    );
    @Effect()
    loadPaginatedWaterDosings$ = this.actions$.pipe(
        ofType<ParameterSelectDateAction>(
            ParameterActions.SelectDate
        ),
        map((action: ParameterSelectDateAction) => action.payload),
        mergeMap((payload: ParameterSelectDateActionPayload) =>
            this.aquariumService.getWaterDosesByAquarium(payload.aquariumId,payload.pagination).pipe(
                map(
                    //We can either return a new AquariumLoadAction, OR just update our store
                    (waterDosings: WaterDosing[]) =>
                    {
                        //this.notificationService.notify("success","Water ATOs loaded successfully: " + atoStatuses.length);
                        console.debug("Water doses loaded successfully: " + waterDosings.length);
                        return new ParameterWaterDoseSuccessAction(waterDosings)
                    }
                ),
                catchError(err => {
                    this.notificationService.notify("error","Could not load water doses");
                    return of(new ParameterSelectDateFailAction(err))
                })
            )
        )
    );
}