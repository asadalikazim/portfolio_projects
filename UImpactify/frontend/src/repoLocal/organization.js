//this is the default state
const organizationState = {
  organizations: [],
}

//the following are all the actions available
const storeOrganizations = organizations => {
  return {
    type: "storeOrganizations",
    organizations: organizations,
  }
}

//bundled up the actions for easy export
const actions = {
  storeOrganizations,
}

//handler for all the different actions
const reducer = (state = organizationState, action) => {
  switch (action.type) {
    case "storeOrganizations":
      return { ...state, organizations: action.organizations }
    default:
      return state
  }
}

export default {
  actions,
  reducer,
}
