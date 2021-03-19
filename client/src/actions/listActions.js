import * as actions from './types'

export const getList = () => {
    return {
        type: actions.GET_LISTS
    }
}

export const addList = (name, type) => {
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var ID_LENGTH = 10;

    var generate = function() {
        var rtn = '';
        for (var i = 0; i < ID_LENGTH; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
        }
        return rtn;
    }
    return {
        type: actions.CREATE_LISTS,
        payload: { 
            id: generate(),
            type: type,
            name: name
        }
    }
}

export const editList = (id, type, change) => async => {

}

export const deleteList = (id) => {

}