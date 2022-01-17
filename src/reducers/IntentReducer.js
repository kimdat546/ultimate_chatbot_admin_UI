import {
    INTENTS_LOADED_FAIL,
    INTENTS_LOADED_SUCCESS,
    ADD_INTENT,
    DELETE_INTENT,
    UPDATE_INTENT,
    TRAIN_INTENT,
    LOADED_FAIL,
} from "variables.js";

export const IntentReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case INTENTS_LOADED_SUCCESS:
            return {
                ...state,
                intents: payload,
                intentsLoading: false,
            };

        case INTENTS_LOADED_FAIL:
            return {
                ...state,
                intents: [],
                intentsLoading: false,
            };

        case ADD_INTENT:
            return {
                ...state,
                intents: [...state.intents, payload],
            };

        case DELETE_INTENT:
            return {
                ...state,
                intents: state.intents.filter(
                    (intent) => intent._id !== payload
                ),
            };

        case UPDATE_INTENT:
            const newIntents = state.intents.map((intent) =>
                intent._id === payload._id ? payload : intent
            );

            return {
                ...state,
                intents: newIntents,
            };

        case TRAIN_INTENT:
            return {
                ...state,
                trainLoading: false,
            };
        case LOADED_FAIL:
            return {
                ...state,
                trainLoading: true,
            };
        default:
            return state;
    }
};
