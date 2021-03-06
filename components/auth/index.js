import React from "react";
import { Button, StyleSheet, Text, View, AsyncStorage } from "react-native";
import LoginScreen from './login'
import WorkoutList from '../exercise-list/workoutList'
// import RegisterScreen from './register'

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userSignedIn: false,
      currentUserId: undefined,
      client: undefined
    };
  }

  //   Checking local storage if user id is stored
  componentDidMount() {
    console.log("User signed in")

    AsyncStorage.getItem("gym-tracker-userId")
      .then(user => {
        const retUser = user
       
        if (retUser) {
          this.setState({
            currentUserId: retUser,
            userSignedIn: true
          });
        } else {
          this.setState({
            currentUserId: undefined,
            userSignedIn: false
          });
        }
    });
  }

  render() {
    {
      if (this.state.userSignedIn) {
        return(
          <WorkoutList />
        )
        
      } else {
        return (
        
            <LoginScreen />
          
        );
      }
    }
  }
}