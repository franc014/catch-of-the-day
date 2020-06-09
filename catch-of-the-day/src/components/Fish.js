import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  static propTypes = {
    addToOrder: PropTypes.func.isRequired,
    details: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    }),
    index: PropTypes.string.isRequired
  };

  checkFishInOrder = index => {
    if (!this.props.orderHasFish(index)) {
      return "disabled";
    } else {
      return 4;
    }
  };
  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === "available";
    const buttonText = isAvailable ? "Add to Order" : "Sold Out";
    return (
      <li className="menuFish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>

        <button
          onClick={() => this.props.addToOrder(index)}
          disabled={!isAvailable}
        >
          {buttonText}
        </button>
      </li>
    );
  }
}

export default Fish;
