import React, { Component } from "react";

interface Props {
  title: string;
  text: string;
}

class PeauComponent extends Component<Props, {}> {
  render() {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default PeauComponent;