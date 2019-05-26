import {LOAD_MISSION, ADD_MISSION, SAVE_ARCHIVE, START, SUCCESS, FAIL} from '../constans'
import {postRequest, deleteRequest} from './requests';

export function loadMissions() {
    return (dispatch) => {
        dispatch({
            type: LOAD_MISSION + START,
        });

        fetch(`http://localhost:3000/agents?_sort=country&_order=asc`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((response) => dispatch({
                type: LOAD_MISSION + SUCCESS,
                payload: {response}
            }))
            .catch(() => {
                dispatch({
                    type: LOAD_MISSION + FAIL,
                })
            });
    }
}

export function addMission(mission) {

    return (dispatch) => {
        dispatch({
            type: ADD_MISSION + START,
        });

        postRequest('http://localhost:3000/agents', mission)
            .then(() => dispatch({
                type: ADD_MISSION + SUCCESS,
            }))
            .then(() => {fetch(`http://localhost:3000/agents?_sort=country&_order=asc`)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then((response) => response.json())
                .then((response) => dispatch({
                    type: LOAD_MISSION + SUCCESS,
                    payload: {response}
                }))
                .catch(() => {
                    dispatch({
                        type: LOAD_MISSION + FAIL,
                    })
                })})
            .catch(error => console.error(error));
    }
}

export function saveArchive() {

    return (dispatch) => {
        dispatch({
            type: SAVE_ARCHIVE + START,
        });

        deleteRequest('http://localhost:3000/archives')
            .then(() => dispatch({
                type: SAVE_ARCHIVE + SUCCESS,
            }))
            .then(() => {fetch(`http://localhost:3000/agents?_sort=country&_order=asc`)
                .then((response) => {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then((response) => response.json())
                .then((response) => dispatch({
                    type: LOAD_MISSION + SUCCESS,
                    payload: {response}
                }))
                .catch(() => {
                    dispatch({
                        type: LOAD_MISSION + FAIL,
                    })
                })})
            .catch(error => console.error(error));
    }
}
