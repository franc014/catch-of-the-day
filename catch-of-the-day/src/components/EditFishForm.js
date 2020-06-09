import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component {
  static propTypes = {
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired
  };

  handleChange = event => {
    //console.log(event.currentTarget.value);
    const updatedFish = {
      ...this.props.fish, //1. make a copy of current fish
      [event.currentTarget.name]: event.currentTarget.value //2. override the property changed
      //ecma script 6: computed property names
    };
    //console.log(updatedFish);
    this.props.updateFish(this.props.index, updatedFish);
  };

  render() {
    return (
      <div className="fish-edit">
        <input
          name="name"
          value={this.props.fish.name}
          onChange={this.handleChange}
        />
        <input
          name="price"
          value={this.props.fish.price}
          onChange={this.handleChange}
        />
        <select
          name="status"
          value={this.props.fish.status}
          onChange={this.handleChange}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          value={this.props.fish.desc}
          onChange={this.handleChange}
        />
        <input
          name="image"
          value={this.props.fish.image}
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.deleteFish(this.props.index)}>
          Delete Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
