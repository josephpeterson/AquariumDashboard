import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Species } from 'src/app/models/Species';
import { Update } from '@ngrx/entity';

export enum SpeciesActions {
  LoadSpecies = '[Species] LoadByAquarium',
  LoadSpeciesSuccess = '[Species] LoadSpeciesSuccess',
  LoadAllSpeciesFail = '[Species] LoadAllSpeciesFail',

  AddSpecies = '[Species] AddSpecies',
  AddSpeciesSuccess = '[Species] AddSpeciesSuccess',
  AddSpeciesFail = '[Species] AddSpeciesFail',

  UpdateSpecies = '[Species] UpdateSpecies',
  UpdateSpeciesSuccess = '[Species] UpdateSpeciesSuccess',
  UpdateSpeciesFail = '[Species] UpdateSpeciesFail',

  DeleteSpecies = '[Species] DeleteSpecies',
  DeleteSpeciesSuccess = '[Species] DeleteSpeciesSuccess',
  DeleteSpeciesFail = '[Species] DeleteSpeciesFail',

  Reset = '[Species] Reset',
}

/* Loading */
export class SpeciesLoadAction implements Action {
  readonly type = SpeciesActions.LoadSpecies
}
export class SpeciesLoadSuccessAction implements Action {
  readonly type = SpeciesActions.LoadSpeciesSuccess
  constructor(public payload: Species[]) { }
}
export class SpeciesLoadFailAction implements Action {
  readonly type = SpeciesActions.LoadAllSpeciesFail
  constructor(public payload: HttpErrorResponse) { }
}

/* Creating Species */
export class SpeciesAddAction implements Action {
  readonly type = SpeciesActions.AddSpecies
  constructor(public payload: Species) { }
}
export class SpeciesAddSuccessAction implements Action {
  readonly type = SpeciesActions.AddSpeciesSuccess
  constructor(public payload: Species) { }
}
export class SpeciesAddFailAction implements Action {
  readonly type = SpeciesActions.AddSpeciesFail
  constructor(public payload: HttpErrorResponse) { }
}

/* Updating Species */
export class SpeciesUpdateAction implements Action {
  readonly type = SpeciesActions.UpdateSpecies
  constructor(public payload: Species) { }
}
export class SpeciesUpdateSuccessAction implements Action {
  readonly type = SpeciesActions.UpdateSpeciesSuccess
  constructor(public payload: Update<Species>) { }
}
export class SpeciesUpdateFailAction implements Action {
  readonly type = SpeciesActions.UpdateSpeciesFail
  constructor(public payload: HttpErrorResponse) { }
}

/* Deleting Species */
export class SpeciesDeleteAction implements Action {
  readonly type = SpeciesActions.DeleteSpecies
  constructor(public payload: Species) { }
}
export class SpeciesDeleteSuccessAction implements Action {
  readonly type = SpeciesActions.DeleteSpeciesSuccess
  constructor(public payload: Species) { }
}
export class SpeciesDeleteFailAction implements Action {
  readonly type = SpeciesActions.DeleteSpeciesFail
  constructor(public payload: HttpErrorResponse) { }
}

export class SpeciesResetAction implements Action {
  readonly type = SpeciesActions.Reset
}
export type AllSpeciesActions =
  SpeciesLoadAction |
  SpeciesLoadSuccessAction |
  SpeciesLoadFailAction |

  SpeciesAddAction |
  SpeciesAddSuccessAction |
  SpeciesAddFailAction |

  SpeciesUpdateAction |
  SpeciesUpdateSuccessAction |
  SpeciesUpdateFailAction |

  SpeciesDeleteAction |
  SpeciesDeleteSuccessAction |
  SpeciesDeleteFailAction |

  SpeciesResetAction;