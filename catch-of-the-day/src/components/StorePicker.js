import React from "react";
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
  storeInput = React.createRef();

  goToStore = (event) => {
    const storeId = this.storeInput.current.value;
    this.props.history.push(`/store/${storeId}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        {/*comment*/}
        <h2>Please enter a Store</h2>
        <input
          type="input"
          ref={this.storeInput}
          required
          placeholder="Store name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store &#8594;</button>
      </form>
    );
  }
}

/* StorePicker.contextTypes = {
  router: React.PropTypes.object
}; */

export default StorePicker;
