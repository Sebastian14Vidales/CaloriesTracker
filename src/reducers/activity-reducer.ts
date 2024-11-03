import { Activities } from "../types"
//Activities has information in Form. category, name, calories.

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activities } } |//We must define our actions and payload. What actions am I going to do?
    { type: 'set-activeId', payload: { id: Activities['id'] } } |
    { type: 'delete-activity', payload: { id: Activities['id'] } } |
    { type: 'restart-app'}

export type ActivityState = {
    activities: Activities[],
    activeId: Activities['id'],
}

const localStorageActivities = () : Activities[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: '',
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions

) => {

    if (action.type === "save-activity") {
        //this code has the logic for update the state
        let updatedActivities: Activities[] = []
        if (state.activeId) {
            updatedActivities = state.activities.map(acitivity => acitivity.id === state.activeId ? action.payload.newActivity : acitivity)
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }

    if (action.type === "set-activeId") {
        console.log(action.payload.id);
        return {
            ...state,
            activeId: action.payload.id
        }
    }
    
    if(action.type === "delete-activity") {
        const deleteActivity = state.activities.filter(activity => activity.id !== action.payload.id)

        return {
            ...state,
            activities: deleteActivity
        }
    }

    if(action.type === "restart-app") {
        
        return {
            activities: [],
            activeId: ''
        }
    }

    return state

}