import * as actions from '../actions/types'

const initialState = [
    {
        id: "0000001",
        type: "To-Do",
        name: "Grocery",
        checklist: ["Tomato","Bacon","Milk","Steak"],
        date: null,
        due: null,
        duration: null,
    },
    {
        id: "0000002",
        type: "Habit",
        name: "Read",
        checklist: [],
        date: null,
        due: null,
        duration: 30,
    },
    {
        id: "0000003",
        type: "Daily",
        name: "Family Time",
        checklist: [],
        date: null,
        due: null,
        duration: 10,
    },
    {
        id: "0000004",
        type: "To-Do",
        name: "Interview",
        checklist: [],
        date: "2020-04-11",
        due: null,
        duration: null,
    },
]

export default function(state = initialState, action) {
    switch(action.type) {
        case actions.GET_LISTS:
            return state

        case actions.CREATE_LISTS:
            const newItem = { 
                id: action.payload.id,
                type: action.payload.type,
                name: action.payload.name
            }
            return [...state, newItem]

        default:
            return state
    }
}