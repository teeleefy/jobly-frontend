//import custom hook for accessing local storage state
import useLocalStorageState from './hooks/useLocalStorageState';
//react basic imports
import { useState, useEffect } from "react";

//css import
import "./App.css";
//api and context import
import JoblyApi from "./Api.js";
import UserContext from "./auth/UserContext";
//Route and NavBar imports
import NavBar from "./navigation/Navigation";
import AppRoutes from "./routes/Routes";
import {decodeToken} from "react-jwt";
import Loading from "./navigation/Loading"

function App() {
  //make sure to set isLoading back to true!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  // "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  // "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] =useState();
  const [jobApplications, setJobApplications] = useState();
  const [token, setToken] = useLocalStorageState("token")

   // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    // console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeToken(token);
          // put the token on the Api class so it can use it to call the API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          let jobApplications = new Set(currentUser.applications);
          setCurrentUser(currentUser);
          setJobApplications(jobApplications);
          
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
        // setIsLoading(false);
      }
    }
    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setIsLoading(false);
    getCurrentUser();
  }, [token]);


  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await JoblyApi.loginUser(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  async function updateUser(updatedUserData) {
    try {
      let updatedUser = await JoblyApi.updateUser(currentUser.username, updatedUserData);
      setCurrentUser(updatedUser);
      return { success: true };
    } catch (errors) {
      console.error("Save failed", errors);
      return { success: false, errors };
    }
  }


  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

   /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
   async function signup(signupData) {
    try {
      let token = await JoblyApi.signupUser(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Checks if a job has been applied for. */
  function alreadyApplied(jobId) {
    return jobApplications.has(jobId);
  }

   async function apply(jobId) {
    if(alreadyApplied(jobId)) return;
    try {
      let appliedToJobId = await JoblyApi.apply(currentUser.username, jobId);
      if(appliedToJobId === jobId){
        setJobApplications(new Set([...jobApplications, jobId]));
        return { success: true };
      }
    } catch (errors) {
      console.error("User's Job Application failed.", errors);
      return { success: false, errors };
    }
  }

  if (isLoading) return <Loading/>;

  

  return (
    <UserContext.Provider value={{currentUser, token, setCurrentUser, alreadyApplied, apply}}>
      <div className="App">
          <NavBar logout={logout}/>
          <main>
            <AppRoutes login={login} signup={signup} update={updateUser}/>
          </main>
      </div>
    </UserContext.Provider>  
  );
}

export default App;
