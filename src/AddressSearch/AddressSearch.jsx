'use strict'

//  ==================================================
//  Component: AddressSearch
//
//  Include: AddressInput AddressMap
//
//  Description:  Jsx for AddressSearch
//
//  TODO:
//  ==================================================

/* AddressSearch */
var AddressSearch = React.createClass({
  getInitialState: function() {
    return {
      address: null
    };
  },
  getDefaultProps: function() {
    return {
      inputWidth: 400,
      inputTip: "输入想要搜索的地址",
      searchBtnText: "搜索",
      city: "北京"
    }
  },
  setAddress: function(ad) {
    this.setState({
      address: ad
    });
  },
  render: function() {
    return (
      <div className="address-search">
        <AddressInput city={this.props.city} inputTip={this.props.inputTip} inputWidth={this.props.inputWidth} searchBtnText={this.props.searchBtnText} searchSubmitHandler={this.setAddress}/>
        <AddressMap addressKeyword={this.state.address} city={this.props.city}/>
      </div>
    );
  }
});

/* AddressInput */
var AddressInput = React.createClass({
  getInitialState: function() {
    return {
      keyword: null
    };
  },
  getDefaultProps: function() {
    return {
      inputWidth: 400,
      inputTip: "输入想要搜索的地址",
      searchBtnText: "搜索",
      city: "北京"
    }
  },
  searchSubmit: function() {
    var keyword = this.getDOMNode().children[0].value;
    this.props
      .searchSubmitHandler(keyword);
  },
  checkEnter: function(e) {
    (e.keyCode === 13) && this.searchSubmit();
  },
  componentDidMount: function() {
    var mapAutoComplete = new BMap.Autocomplete({
      "input": "_addressSearchKeyword",
      "location": this.props.city
    });
  },
  render: function() {
    var keywordStyle = {
      width: this.props.inputWidth
    };
    return (
      <div className="address-input">
        <input className="input-keyword" id="_addressSearchKeyword" onKeyUp={this.checkEnter} placeholder={this.props.inputTip} style={keywordStyle}></input>
        <button className="input-commit" onClick={this.searchSubmit}>{this.props.searchBtnText}</button>
      </div>
    );
  }
});

/* AddressMap */
var AddressMap = React.createClass({
  getInitialState: function() {
    return {
      mapLocalObj: null,
      itemsNumber: 0
    };
  },
  getDefaultProps: function() {
    return {
      mapSearchgeotableId: 121763,
      mapSearchTags: "",
      mapSearchFilter: ""
    }
  },
  componentDidMount: function() {
    var map = new BMap.Map("_addressMapMain");
    map.centerAndZoom(this.props.city);
    var mapLocalObj = new BMap.LocalSearch(map, {
      renderOptions: {
        map: map,
        panel: "_addressMapItems"
      },
      onSearchComplete: function(e) {
        this.setState({
          itemsNumber: e.getNumPois()
        });
      }.bind(this)
    });
    this.setState({
      mapLocalObj: mapLocalObj
    });
  },
  componentWillReceiveProps: function(nextProps) {
    this.getSearch(nextProps.addressKeyword);
  },
  getSearch: function(keyword) {
    var _this = this;
    keyword && this.state
      .mapLocalObj
      .search(keyword, {
        forceLocal: true,
        customData: {
          geotableId: _this.props.mapSearchgeotableId,
          tags: _this.props.mapSearchTags,
          filter: _this.props.mapSearchFilter
        }
      });
  },
  render: function() {
    return (
      <div className="address-map" style={{
        display: this.props.addressKeyword
          ? "block"
          : "none"
      }}>
        <div className="map-nav">
          <div className="map-nav-title">
            找到
            <span className="map-nav-number">
              {this.state.itemsNumber}
            </span>
            家体验店
          </div>
          <div className="map-items" id="_addressMapItems"></div>
        </div>
        <div className="map-main" id="_addressMapMain"></div>
      </div>
    );
  }
});
