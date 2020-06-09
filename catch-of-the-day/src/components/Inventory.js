import React from "react";
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import PropTypes from "prop-types";
import Login from "./Login";
import base, { firebaseApp } from "../base";
import firebase from "firebase";

class Inventory extends React.Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired,
  };

  state = {
    uid: null,
    owner: null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async (authData) => {
    //look up the current store in the firebase database
    //use await to return the store into the vatiable, not the promise from base.fetch
    const store = await base.fetch(this.props.storeId, { context: this });

    //claim it if there is no owner
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    //set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = (provider) => {
    //create auth provider
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
  };

  logout = async () => {
    await firebase.auth().signOut();
    this.setState({
      uid: null,
    });
  };

  render() {
    const logoutbtn = <button onClick={this.logout}>Logout</button>;
    //1. check if they're logged in
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    // 2. check if they're not the owner of the store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          Sorry, you are not the owner!
          {logoutbtn}
        </div>
      );
    }
    //they must be the owner, render inventory
    return (
      <div>
        <h2>Inventory</h2>
        {logoutbtn}
        {Object.keys(this.props.fishes).map((key) => (
          <EditFishForm
            fish={this.props.fishes[key]}
            key={key}
            index={key}
            updateFish={this.props.updateFish}
            deleteFish={this.props.deleteFish}
          />
        ))}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
