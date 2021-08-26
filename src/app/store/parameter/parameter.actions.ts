import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { AquariumSnapshot } from 'src/app/models/AquariumSnapshot';
import { ATOStatus } from 'src/app/models/ATOStatus';
import { PaginationSliver } from 'src/app/models/PaginationSliver';
import { WaterChange } from 'src/app/models/WaterChange';
import { WaterDosing } from 'src/app/models/WaterDosing';

export enum ParameterActions {
  SelectDate = '[Parameter] Date Selected',
  LoadParameterSuccess = '[Parameter] Load Success',
  LoadATOSuccess = '[Parameter] Load ATO Success',
  LoadChangeSuccess = '[Parameter] Load Change Success',
  LoadDoseSuccess = '[Parameter] Load Dose Success',
  LoadFail = '[Parameter] Load Failure',
}


export class ParameterSelectDateAction implements Action {
  readonly type = ParameterActions.SelectDate

  constructor(public payload: ParameterSelectDateActionPayload) { }
}
export class ParameterSelectDateActionPayload {
  public pagination: PaginationSliver
  public aquariumId: number
}


export class ParameterWaterParameterSuccessAction implements Action {
  readonly type = ParameterActions.LoadParameterSuccess
  constructor(public payload: AquariumSnapshot[]) {

  }
}
export class ParameterWaterATOSuccessAction implements Action {
  readonly type = ParameterActions.LoadATOSuccess
  constructor(public payload: ATOStatus[]) {

  }
}
export class ParameterWaterChangeSuccessAction implements Action {
  readonly type = ParameterActions.LoadChangeSuccess
  constructor(public payload: WaterChange[]) {

  }
}
export class ParameterWaterDoseSuccessAction implements Action {
  readonly type = ParameterActions.LoadDoseSuccess
  constructor(public payload: WaterDosing[]) {

  }
}


export class ParameterSelectDateFailAction implements Action {
  readonly type = ParameterActions.LoadFail
  constructor(public payload: HttpErrorResponse) {
  }
}



export type AllParameterActions = ParameterSelectDateAction | 
ParameterWaterParameterSuccessAction | 
ParameterSelectDateFailAction |
ParameterWaterChangeSuccessAction |
ParameterWaterDoseSuccessAction |
ParameterWaterATOSuccessAction