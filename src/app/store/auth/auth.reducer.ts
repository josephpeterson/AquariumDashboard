import { AquariumAccount } from "src/app/models/AquariumAccount";
import { AuthActions, AuthActionTypes } from "./auth.actions";


export interface AuthState {
	authenticatedUser: AquariumAccount | null
};

const initialState: AuthState = {
	authenticatedUser: null
};

export function AuthReducer(state = initialState, action: AuthActions): AuthState {
	switch (action.type) {
		case AuthActionTypes.SetAuthenticatedUser: {
			const user = action.payload;

			return Object.assign({}, state, {
				authenticatedUser: user
			});
		}
		default: {
			return state;
		}
	}
}
