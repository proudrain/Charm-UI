'use strict'

//  ==================================================
//  Component: AddressPicker
//
//  Include: AddressList AddressSearch
//
//  Description:  Jsx for AddressPicker
//
//  TODO:
//  ==================================================

var AddressPicker = React.createClass({
  getInitialState: function() {
    return {
      city: "西安"
    };
  },
  getDefaultProps: function() {
    return {

    }
  },
  render: function() {
    return (
      <div className="address-picker">
        <AddressList localAddress={this.state.city}/>
        <AddressSearch city={this.state.city}/>
      </div>
    );
  }
});
