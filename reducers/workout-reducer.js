import { State } from "react-native-gesture-handler";

// const INITIAL_STATE = {
//     userid: 0,
//     workouts:

//         [
//             {
//                 "id": 0,
//                 "name": "Leg Day",
//                 "exercises": [
//                     "Benchpress",
//                     "Squat",
//                     "Lateral extensions",
//                     "Bicep curls",
//                     "Tricep extensions",
//                     "Shrugs"
//                 ]
//             },
//             {
//                 "id": 1,
//                 "name": "Arm Day",
//                 "exercises": [
//                     "Jumping Jacks",
//                     "Hack squats",
//                     "Tricep curls",
//                     "Flying"
//                 ]
//             },
//             {
//                 "id": 2,
//                 "name": "Bum Day",
//                 "exercises": [
//                     "Jumping Jacks",
//                     "Hack squats",
//                     "Tricep curls",
//                     "Flying"
//                 ]
//             }
//         ]
// }
const INITIAL_STATE = {
    userid: 1,
    workouts: []
}

export const workoutReducer = (state = INITIAL_STATE, action) => {
   

    switch (action.type) {
        case 'ADD_BLANK_WORKOUT':
        console.log('ADD_BLANK_WORKOUT fired')
            let blankState = INITIAL_STATE
            blankState.userid = action.payload
            console.log("Workout reducer, blank state: ", blankState)
            return blankState
        case 'ADD_INITIAL_WORKOUT':
        console.log('ADD_INITIAL_WORKOUT fired')
            return action.payload
        case 'ADD_WORKOUT':
        console.log("ADD_WORKOUT fired")
            return { userid: state.userid, workouts: [...state.workouts, action.payload] }
        case 'ADD_EXERCISE_TO_WORKOUT':
        console.log('ADD_EXERCISE_TO_WORKOUT fired')
        // There is no check for repeat exercises as some people may want to perform the same exercise more than once/ as a superset.
            const { workoutId, exercises } = action.payload
            // Extracts the workout object - to update the exercises inside it.
            const newState = state.workouts.filter((workout) => {
                return workout.id === workoutId
            })   
            newState[0].exercises = [...newState[0].exercises, ...exercises]
            
            // create a new array of workouts without the current workout object
            const workouts = state.workouts.filter(workout => {
                return workout.id !== workoutId
            })
            
            // create new state from old workouts appending the new workout object which has been updated with a new exercise.
            return {userid: state.userId, workouts: [...workouts, ...newState]}
        case 'DELETE_EXERCISE_FROM_WORKOUT':
        console.log('DELETE_EXERCISE_FROM_WORKOUT fired')
            const {exercisesToRemove, newWorkoutId} = action.payload
            const workoutObject = state.workouts.filter((workout) => {
                return workout.id === newWorkoutId
            })
            const newExerciseArr = workoutObject[0].exercises.filter(ex => {
                if(!exercisesToRemove.includes(ex._id)){
                    return ex
                } else return
            })
            // add newExerciseArr to the workout workoutObject
            workoutObject[0].exercises = newExerciseArr
            // add workoutObject back to state and return it
            const otherWorkouts = state.workouts.filter(workout => {
                return workout.id !== newWorkoutId
            })
            return {userid: state.userId, workouts: [...otherWorkouts, ...workoutObject]}
        // //  ! UNTESTED !
        // case 'DELETE_WORKOUT':
        //     const deletedItem = action.payload
        //     const newState = state.filter((item) => item != deletedItem)
        //     return newState
        // case 'EDIT_WORKOUT':
        //     const updatedItem = action.payload
        //     const newState = state.filter((item) => item != updatedItem)
        //     newState.push(updatedItem)
        //     return [...state, newState]
        default:
            return state
    }
}

export default workoutReducer