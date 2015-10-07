'use strict'

//  ==================================================
//  Include: AddressInput AddressMap
//
//  TODO: [add] 增加各项参数
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
      city: "北京",
      theme: "dark"
    }
  },
  componentWillMount: function() {
    var myCity = new BMap.LocalCity();
    myCity
      .get(function(res) {
        var currentCity = res.name;
        this.setCity(currentCity);
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
    return (
      <div className="address-search">
        <AddressInput {...this.props} searchSubmitHandler={this.setAddress}/>
        <AddressMap addressKeyword={this.state.address} city={this.props.city} theme={this.props.theme} />
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
      city: "北京",
      theme: "light"
    }
  },
  searchSubmit: function() {
    var keyword = this.getDOMNode()
      .children[0]
      .value;
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
    var conClassName = "address-input";
    switch (this.props.theme) {
      case 'light':
        break;
      case 'dark':
        conClassName += " dark";
        break;
      default:

    }
    return (
      <div className={conClassName}>
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
      itemsNumber: 0,
      itemsList: [],
      itemActive: 0
    };
  },
  getDefaultProps: function() {
    return {
      mapSearchgeotableId: 121763,
      mapSearchTags: "",
      mapSearchFilter: "",
      theme: "light"
    }
  },
  componentDidMount: function() {
    this.map = new BMap.Map("_addressMapMain", {
      enableMapClick: false
    });
    this.map
      .centerAndZoom(this.props.city, 12);
  },
  componentWillReceiveProps: function(nextProps) {
    nextProps.addressKeyword && this.getNearby(nextProps.addressKeyword);
  },
  getNearby: function(keyword, page) {
    // 地址解析获取经纬度
    var myGeo = new BMap.Geocoder();
    var _this = this;
    myGeo
      .getPoint(keyword, function(point) { // 解析成功后的回调 搜索信息
        if (point) {
          $.ajax({
            type: 'get',
            url: 'http://api.map.baidu.com/geosearch/v3/nearby',
            dataType : "jsonp",
            data: {
              ak: 'sdp9qCbToS7E23nDRxaAAwbh',
              geotable_id: 121763,
              location: point.lng + ',' + point.lat,
              radius: 10000,
              page_index: page || 0,
              page_size: 50
            },
            jsonp: 'callback',
            success: function(res) {
              _this.setState({
                itemsNumber: res.total,
                itemsList: res.contents
              });
              _this.showNearby();
              _this.map
                .centerAndZoom(_this.props.addressKeyword, 12);
            }
          })
        } else {
          alert("未找到该区域信息");
        }
      }.bind(this), this.props.city);
  },
  showNearby: function() {
    var _this = this;
    for (var k in this.state.itemsList) {
      var point = new BMap.Point(this.state.itemsList[k].location[0], this.state.itemsList[k].location[1]);
      var marker = new BMap.Marker(point);
      var label = new BMap.Label(String.fromCharCode(65 + parseInt(k)), {
        offset: new BMap.Size(4, 2)
      });
      label.setStyle({
        border: 'none',
        backgroundColor: 'transparent',
        color: '#FAFAFA'
      });
      marker.setLabel(label);
      marker.setTitle(this.state.itemsList[k].title);
      marker
        .addEventListener('click', function(e) {
          _this.showInfoWindow(this.getLabel().content.charCodeAt(0) - 65);
        });
      this.map
        .addOverlay(marker);
    }
    this.state.itemsList.length && this.showInfoWindow(0);
  },
  showInfoWindow: function(index) {
    if (index !== this.state.itemActive || 1) {
      var point = new BMap.Point(this.state.itemsList[index].location[0], this.state.itemsList[index].location[1]);
      var itemInfo = this.state.itemsList[index];
      var title = itemInfo.title;
      var address = itemInfo.address;
      var tel = itemInfo.tel;
      var content = '<p class="map-info-window">地址：' + address + '</p>';
      var infoWindow = new BMap.InfoWindow(content, {
        title: title,
        width: 290,
        panel: "panel",
        enableAutoPan: true,
        offset: new BMap.Size(0, -25)
      });
      this.setState({
        itemActive: + index
      });
      this.map
        .openInfoWindow(infoWindow, point);
    }
  },
  clickMapItem: function(e) {
    var ele = e.target;
    var eleClass = ele.getAttribute('class');
    var itemIndex = 0;
    if (eleClass === "map-item") {
      itemIndex = ele.getAttribute('data-key');
    } else if (eleClass === "map-item-mark" || eleClass === "map-item-main") {
      itemIndex = ele.parentNode
        .getAttribute('data-key');
    } else if (!eleClass) {
      itemIndex = ele.parentNode
        .parentNode
        .parentNode
        .getAttribute('data-key');
    } else {
      itemIndex = ele.parentNode
        .parentNode
        .getAttribute('data-key');
    }
    this.showInfoWindow(itemIndex);
  },
  render: function() {
    var conClassName = "address-map";
    switch (this.props.theme) {
      case 'light':
        break;
      case 'dark':
        conClassName += " dark";
        break;
      default:

    }
    var mapItemActieStyle = {
      backgroundColor: "#181211"
    };
    return (
      <div className={conClassName} style={{
        display: this.props.addressKeyword
          ? "block"
          : "none"
      }}>
        <div className="map-nav">
          <div className="map-nav-title">
            附近有
            <span className="map-nav-number">
              {this.state.itemsNumber}
            </span>
            家体验店
          </div>
          <ul className="map-items" id="_addressMapItems" onClick={this.clickMapItem}>
            {this
              .state
              .itemsList
              .map(function (item, i) {
                return <li className="map-item" data-key={i} key={i} style={(i === this.state.itemActive)
                    ? mapItemActieStyle
                    :
                      {}}>
                    <span className="map-item-mark">{String.fromCharCode(65 + i)}</span>
                    <div className="map-item-main">
                      <div className="map-item-title">{item.title}</div>
                      <div className="map-item-address">地址：{item.address}</div>
                      <div className="map-item-tel">电话：{item.tel}</div>
                    </div>
                  </li>;
              }.bind(this))}
          </ul>
        </div>
        <div className="map-main" id="_addressMapMain"></div>
      </div>
    );
  }
});
