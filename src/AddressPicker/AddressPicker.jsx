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
      city: "西安",
      address: null
    };
  },
  getDefaultProps: function() {
    return {

    }
  },
  setAddress: function(ad) {
    this.setState({
      address: ad
    });
  },
  setCity: function(ct) {
    this.setState({
      city: ct
    });
  },
  render: function() {
    var addressPickerActiveStyle = this.state.address ? this.props.addressPickerActiveStyle : {};
    console.log(addressPickerActiveStyle);
    return (
      <div className="address-picker" style={addressPickerActiveStyle}>
        <AddressList localAddress={this.state.city}/>
        <AddressInput city={this.state.city} searchSubmitHandler={this.setAddress} />
        {this.state.address
          ? <AddressMap addressKeyword={this.state.address} city={this.props.city}/>
          : null}
    </div>
    );
  }
});
