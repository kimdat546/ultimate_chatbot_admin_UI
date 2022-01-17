export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:5000/api"
        : "https://ultimate-chatbot-server.herokuapp.com/api";
export const apiModel = "https://ultimate-chatbot.tk/";
export const LOCAL_STORAGE_TOKEN = "accessToken";
export const INTENTS_LOADED_SUCCESS = "INTENTS_LOADED_SUCCESS";
export const INTENTS_LOADED_FAIL = "INTENTS_LOADED_FAIL";
export const ADD_INTENT = "ADD_INTENT";
export const DELETE_INTENT = "DELETE_INTENT";
export const UPDATE_INTENT = "UPDATE_INTENT";
export const TRAIN_INTENT = "TRAIN_INTENT";
export const LOADED_FAIL = "LOADED_FAIL";
