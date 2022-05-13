import React from "react"
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux"
import auth from "./authorization"
import classes from "./classes"
import jobs from "./jobs"
import orgs from "./organization"

//combine all the reducers for different tasks
const reducer = combineReducers(
  auth.reducer,
  classes.reducer,
  jobs.reducer,
  orgs.reducer
)

//hook up the store to the entire website, used in gatsby-ssr and gatsby-browser
// eslint-disable-next-line react/display-name
export default ({ element }) => {
  const store = createStore(reducer)
  return <Provider store={store}>{element}</Provider>
}

/**
 * current structure of the store
 * {
 *  user: {
 *      loggedIn: Boolean
 *      name: String
 *      email: String
 *      date: {}
 *      role: String
 *  }
 *  classes: [...classes...]
 *  jobs: [...jobs...]
 *  organizations: [...organizations...]
 * }
 */

/**
 * USAGE
 *
 * Reading a Value
 *     import { useSelector } from "react-redux"
 *     const valueToRenderSomewherePerhaps = useSelector(state => state.user.loggedIn)
 *
 * Writing a Value
 *     import { useDispatch } from "react-redux"
 *     import Example from "[frontend/src/repoLocal/example-filename.js"
 *     useDispatch(Example.actions.actionYouWantToPerform(params))
 */
