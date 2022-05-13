//this is the default state
const authorizationState = {
  user: {
    loggedIn: false,
    name: null,
    email: null,
    date: null,
    role: null,
  },
}

//the following are all the actions available
const storeUser = (name, email, date, role) => {
  return {
    type: "storeUser",
    name: name,
    email: email,
    date: date,
    role: role,
  }
}

const deleteUser = () => {
  return {
    type: "deleteUser",
  }
}

//bundled up the actions for easy export
const actions = {
  storeUser,
  deleteUser,
}

//handler for all the different actions
const reducer = (state = authorizationState, action) => {
  var updatedUser = null
  switch (action.type) {
    case "storeUser":
      updatedUser = {
        loggedIn: true,
        name: action.name,
        email: action.email,
        date: action.date,
        role: action.role,
      }
      return { ...state, user: updatedUser }
    case "deleteUser":
      updatedUser = {
        loggedIn: false,
        name: null,
        email: null,
        date: null,
        role: null,
      }
      return { ...state, user: updatedUser }
    default:
      return state
  }
}

export default {
  actions,
  reducer,
}
