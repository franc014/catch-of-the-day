import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const { params } = this.props.match;
    //firsr reinstate our localstorage
    const loacalStorageRef = localStorage.getItem(params.storeId);
    if (loacalStorageRef) {
      this.setState({ order: JSON.parse(loacalStorageRef) });
    }
    //this.setState = JSON.parse(loacalStorageRef);

    this.ref = base.syncState(`${params.storeId}/fishess`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(`${params.storeId}`, JSON.stringify(this.state.order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  loadSampleFishes = (event) => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addFish = (fish) => {
    const fishes = { ...this.state.fishes };
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    this.setState({ fishes });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = null;
    this.setState({ fishes });
  };

  deleteFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  addToOrder = (fish) => {
    //fish as fishes key

    const order = { ...this.state.order };
    //order[fish] = order[fish] ? order[fish] + 1 : 1;
    order[fish] = order[fish] + 1 || 1;
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul>
            {Object.keys(this.state.fishes).map((fish) => {
              return (
                <Fish
                  addToOrder={this.addToOrder}
                  key={fish}
                  index={fish}
                  details={this.state.fishes[fish]}
                />
              );
            })}
          </ul>
        </div>
        {/* <Order order={this.state.order} fishes={this.state.fishes} /> */}
        {/* <Order {...this.state} /> */}
        <Order
          order={this.state.order}
          fishes={this.state.fishes}
          deleteFromOrder={this.deleteFromOrder}
        />
        <Inventory
          storeId={this.props.match.params.storeId}
          fishes={this.state.fishes}
          loadSampleFishes={this.loadSampleFishes}
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
        />
      </div>
    );
  }
}

export default App;
