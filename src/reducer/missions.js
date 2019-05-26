import {FAIL, LOAD_MISSION, ADD_MISSION, START, SUCCESS} from '../constans';
import {OrderedMap, Record} from 'immutable';

const DefaultReducerState = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false
});


export default (missions = new DefaultReducerState(), action) => {
    const {type, payload} = action;

    function arrayToMap(arr) {
        return arr.reduce((acc, el) => acc.set(el.date, el), new OrderedMap({}))
    }

    switch (type) {
        case LOAD_MISSION + START:
            return missions
                .set('loading', true);

        case LOAD_MISSION + SUCCESS:
            return missions
                .set('entities', arrayToMap(payload.response))
                .set('loading', false)
                .set('loaded', true);

        case LOAD_MISSION + FAIL:
            return missions
                .set('error', "Something was wrong!")
                .set('loading', false)
                .set('loaded', true);

        case ADD_MISSION + START:
            return missions
                .set('loading', true);

        case ADD_MISSION + SUCCESS:
            return missions
                .set('loading', false);



        default:
            return missions
    }
}
