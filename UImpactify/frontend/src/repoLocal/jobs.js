//this is the default state
const jobsState = {
  jobs: [],
}

//the following are all the actions available
const storeJobs = jobs => {
  return {
    type: "storeJobs",
    jobs: jobs,
  }
}

//bundled up the actions for easy export
const actions = {
  storeJobs,
}

//handler for all the different actions
const reducer = (state = jobsState, action) => {
  switch (action.type) {
    case "storeJobs":
      return { ...state, jobs: action.jobs }
    default:
      return state
  }
}

export default {
  actions,
  reducer,
}
