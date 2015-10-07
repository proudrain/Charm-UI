'use strict'

//  ==================================================
//  Include: AddressList AddressSearch
//
//  TODO:
//  ==================================================

var AddressPicker = React.createClass({
  getInitialState: function() {
    return {
      city: "北京",
      currentCity: null,
      address: null
    };
  },
  getDefaultProps: function() {
    return {};
  },
  componentWillMount: function() {
    var myCity = new BMap.LocalCity();
    myCity
      .get(function(res) {
        var currentCity = res.name;
        this.setState({
            currentCity: currentCity
        });
      }.bind(this));
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
    var addressPickerActiveStyle = this.state.address
      ? this.props.addressPickerActiveStyle
      : {};
    return (
      <div className="address-picker" style={addressPickerActiveStyle}>
        <AddressList setCity={this.setCity} localAddress={this.state.currentCity} addressData={this.props.addressData}/>
        <AddressInput {...this.props} city={this.state.city} searchSubmitHandler={this.setAddress}/>
        <AddressMap addressKeyword={this.state.address} city={this.props.city} theme={this.props.theme} />
      </div>
    );
  }
});
