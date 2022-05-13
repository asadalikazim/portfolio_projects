//this is the default state
const classesState = {
  classes: [],
}

//the following are all the actions available
const storeClasses = classes => {
  return {
    type: "storeClasses",
    classes: classes,
  }
}

//bundled up the actions for easy export
const actions = {
  storeClasses,
}

//handler for all the different actions
const reducer = (state = classesState, action) => {
  switch (action.type) {
    case "storeClasses":
      return { ...state, classes: action.classes }
    default:
      return state
  }
}

export default {
  actions,
  reducer,
}
