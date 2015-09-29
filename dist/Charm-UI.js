// 整体组件
var AddressList = React.createClass({displayName: "AddressList",
    getInitialState: function() {
        return {
            nowAddress: this.props.localAddress,
            isWrapShow: false,
            isSecondShow: false
        };
    },
    getDefaultProps: function() {
        return {
            localAddress: "西安",
        };
    },
    secondAddressData: {

    },
    handleBtnClick: function() {
        if(!this.state.isWrapShow) {
            this.setState({isWrapShow: true});
            this.setState({isSecondShow: false});
        } else {
            this.setState({isWrapShow: false});
        }
    },
    handleSelectAddress: function(selectAddress , key , name) {
        this.setState({nowAddress: selectAddress});
        if(key) {
            var data = this.props.addressData[key];
            var secondData = data[name];
            var jslength=0;
                for(var js2 in secondData){
                jslength++;
            }
            if(!jslength) {
                this.setState({isWrapShow: false});
                return ;
            }
            this.setState({isSecondShow: true});
            this.secondAddressData = secondData;
            return ;
        }
        this.setState({isWrapShow: false});
    },
    render: function() {
        return (
            React.createElement("div", {className: "AddressList"}, 
                React.createElement(AddressDropButton, {triangleState: this.state.isWrapShow, onClick: this.handleBtnClick}, 
                    this.state.nowAddress
                ), 
                this.state.isWrapShow?
                    React.createElement(AddressWrap, {addressData: this.props.addressData, localAddress: this.props.localAddress, handleSelectAddress: this.handleSelectAddress, secondAddressData: this.secondAddressData, isSecondShow: this.state.isSecondShow})
                    :null
                
            )
        );
    }
});

// 下拉按钮
var AddressDropButton = React.createClass({displayName: "AddressDropButton",
    getInitialState: function() {
        return {};
    },
    getDefaultProps: function() {
        return {};
    },
    handleClick: function() {
        this.props.onClick();
    },
    render: function() {
        return (
            React.createElement("button", {className: "AddressDropButton", onClick: this.handleClick}, 
                this.props.children, 
                React.createElement("span", {className: "triangle "+this.props.triangleState})
            )
        );
    }
});

// 地址操作框容器
var AddressWrap = React.createClass({displayName: "AddressWrap",
    getInitialState: function() {
        return {};
    },
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        if(this.props.isSecondShow) {
            return (
                React.createElement("div", {className: "AddressWrap"}, 
                    React.createElement(AddressSecondWrap, {secondAddressData: this.props.secondAddressData})
                )
            );
        }
        return (
            React.createElement("div", {className: "AddressWrap"}, 
                React.createElement(AddressLocation, {localAddress: this.props.localAddress, handleSelectAddress: this.props.handleSelectAddress}), 
                React.createElement(AddressSearchInput, {handleSelectAddress: this.props.handleSelectAddress}), 
                React.createElement(AddressListWrap, {addressData: this.props.addressData, handleSelectAddress: this.props.handleSelectAddress})
            )
        );
    }
});

// 定位当前地址
var AddressLocation = React.createClass({displayName: "AddressLocation",
    getInitialState: function() {
        return {

        };
    },
    getDefaultProps: function() {
        return {

        };
    },
    handleClick: function() {
        this.props.handleSelectAddress(this.props.localAddress);
    },
    render: function() {
        return (
            React.createElement("div", null, 
                "猜你在：", React.createElement("span", {onClick: this.handleClick}, this.props.localAddress)
            )
        );
    }
});

// 地址搜索
var AddressSearchInput = React.createClass({displayName: "AddressSearchInput",
    getInitialState: function() {
        return {};
    },
    getDefaultProps: function() {
        return {};
    },
    handleSearch: function(event) {
        var cont = event.target.value;
        console.log(cont);
    },
    render: function() {
        return (
            React.createElement("div", {className: "AddressSearch"}, 
                "搜索：", 
                React.createElement("input", {onChange: this.handleSearch})
            )
        );
    }
});

// 地址列表容器
var AddressListWrap = React.createClass({displayName: "AddressListWrap",
    getInitialState: function() {
        return {};
    },
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        var addressData = this.props.addressData;
        var handleSelectAddress = this.props.handleSelectAddress;
        var rowNodes = function(data) {
            var cont = [];
            var i = 0;
            for(var key in data) {
                cont[i]  = React.createElement(AddressListRow, {keyData: key, data: data[key], handleSelectAddress: handleSelectAddress});
                i++;
            }
            return cont;
        }(addressData);
        return (
            React.createElement("div", {className: "AddressListWrap"}, 
                rowNodes
            )
        );
    }
});

// 地址列表行
var AddressListRow = React.createClass({displayName: "AddressListRow",
    getInitialState: function() {
        return {

        };
    },
    getDefaultProps: function() {
        return {

        };
    },
    handleClick: function(e) {
        var keyData = this.props.keyData;
        var i = e.target.getAttribute('data');
        var name = e.target.innerHTML;
        this.props.handleSelectAddress(name , keyData , i);
    },
    render: function() {
        var handleClick = this.handleClick;
        var dataNodes = function(data) {
            var cont = [];
            var i = 0;
            for(var key in data) {
                cont[i]  = React.createElement("span", null, React.createElement("span", {data: key, key: i, onClick: handleClick}, key));
                i++;
            }
            return cont;
        }(this.props.data);
        return (
            React.createElement("div", {className: "AddressListRow"}, 
                React.createElement("span", {className: "keyData"}, this.props.keyData), 
                React.createElement("span", {className: "dataWrap"}, dataNodes)
            )
        );
    }
});

// 二级地址列表容器
var AddressSecondWrap = React.createClass({displayName: "AddressSecondWrap",
    getInitialState: function() {
        return {};
    },
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        var secondAddressData = this.props.secondAddressData;
        // var handleSelectAddress = this.props.handleSelectAddress;
        var rowNodes = function(data) {
            var cont = [];
            var i = 0;
            for(var key in data) {
                cont[i]  = React.createElement(AddressSecondRow, {keyData: key, data: data[key]});
                i++;
            }
            return cont;
        }(secondAddressData);
        return (
            React.createElement("div", {className: "AddressSecondWrap"}, 
                rowNodes
            )
        );
    }
});

// 二级地址列表行
var AddressSecondRow = React.createClass({displayName: "AddressSecondRow",
    getInitialState: function() {
        return { };
    },
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        var dataNodes = function(data) {
            var cont = [];
            var i = 0;
            for(var key in data) {
                cont[i]  = React.createElement("span", null, React.createElement("a", {data: key, key: i, href: data[key]}, key));
                i++;
            }
            return cont;
        }(this.props.data);
        return (
            React.createElement("div", {className: "AddressListRow"}, 
                React.createElement("span", {className: "keyData"}, this.props.keyData), 
                React.createElement("span", {className: "dataWrap"}, dataNodes)
            )
        );
    }
});

// 滚动条组件
var ScrollBar = React.createClass({displayName: "ScrollBar",
    getInitialState: function() {
        return {

        };
    },
    getDefaultProps: function() {
        return {

        };
    },
    render: function() {
        return (
            React.createElement("div", null)
        );
    }
});

'use strict'

//  ==================================================
//  Component: AddressPicker
//
//  Include: AddressList AddressSearch
//
//  Description:  Jsx for AddressPicker
//
//  TODO: [@TongchengQiu] AddressList 更换城市后调用 setCity 设置城市
//          你可以根据 AddressPicker 的 state.address 判断是否已经进行了搜索
//  ==================================================

var AddressPicker = React.createClass({displayName: "AddressPicker",
  getInitialState: function() {
    return {
      city: "北京",
      address: null
    };
  },
  getDefaultProps: function() {
    return {}
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
      React.createElement("div", {className: "address-picker", style: addressPickerActiveStyle}, 
        React.createElement(AddressList, {localAddress: this.state.city}), 
        React.createElement(AddressInput, {city: this.state.city, searchSubmitHandler: this.setAddress}), 
        React.createElement(AddressMap, {addressKeyword: this.state.address, city: this.props.city})
      )
    );
  }
});

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
var AddressSearch = React.createClass({displayName: "AddressSearch",
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
      React.createElement("div", {className: "address-search"}, 
        React.createElement(AddressInput, {city: this.props.city, inputTip: this.props.inputTip, inputWidth: this.props.inputWidth, searchBtnText: this.props.searchBtnText, searchSubmitHandler: this.setAddress}), 
        React.createElement(AddressMap, {addressKeyword: this.state.address, city: this.props.city})
      )
    );
  }
});

/* AddressInput */
var AddressInput = React.createClass({displayName: "AddressInput",
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
      React.createElement("div", {className: "address-input"}, 
        React.createElement("input", {className: "input-keyword", id: "_addressSearchKeyword", onKeyUp: this.checkEnter, placeholder: this.props.inputTip, style: keywordStyle}), 
        React.createElement("button", {className: "input-commit", onClick: this.searchSubmit}, this.props.searchBtnText)
      )
    );
  }
});

/* AddressMap */
var AddressMap = React.createClass({displayName: "AddressMap",
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
      React.createElement("div", {className: "address-map", style: {
        display: this.props.addressKeyword
          ? "block"
          : "none"
      }}, 
        React.createElement("div", {className: "map-nav"}, 
          React.createElement("div", {className: "map-nav-title"}, 
            "找到", 
            React.createElement("span", {className: "map-nav-number"}, 
              this.state.itemsNumber
            ), 
            "家体验店"
          ), 
          React.createElement("div", {className: "map-items", id: "_addressMapItems"})
        ), 
        React.createElement("div", {className: "map-main", id: "_addressMapMain"})
      )
    );
  }
});



'use strict'

//  ==================================================
//  Component: ProgressBar
//
//  Include: Spinner
//
//  Description: Jsx for ProgressBar
//
//  TODO: [fix] 修正初始时 transition 不生效的问题
//  ==================================================

/* Spinner */
var Spinner = React.createClass({displayName: "Spinner",
  render: function() {
    return (
      React.createElement("div", {className: "cu-spinner"})
    );
  }
});

/* ProgressBar */
var ProgressBar = React.createClass({displayName: "ProgressBar",
  getInitialState: function() {
    return {
      rate: null,
      done: false
    };
  },
  getDefaultProps: function() {
    return {
      speed: 0.6,  // 动画速度
      spinner: true,  // 是否有圈圈
      easing: 'ease',  // 动画缓动曲线
      maxRate: 0.96,  // 进度条最大宽度
      incStep: 0.04,  // inc 增长步幅
      minStep: 0.005,  // 随机增长的最小步幅
      maxStep: 0.03,  // 随机增长的最大步幅
      trickle: true,  // 是否自动增长
      trickleSpeed: 800,  // 自动增长的间隔时间
      setTrickle: false  // set 后是否自动增长（未启用）
    };
  },
  start: function() {
    this._init();
    this.set('0.5%');
    this.props.trickle && this._autoInc();
  },
  set: function(n, trickle) {
    !trickle && this._init();
    n = this._format(n);
    if (n === 100) {
      /* done */
      this.setState({
        rate: 100
      });
    } else {
      n = n > this.props.maxRate * 100
        ? this.props.maxRate * 100
        : n;
      this.setState({
        rate: n
      });
    }
  },
  inc: function(n) {
    this._init();
    this.props.trickle && this._autoInc();
    n = n
      ? this._format(n)
      : this.props.incStep * 100;
    var newRate = this.state.rate + n;
    this.set(newRate + '%', true);
  },
  done: function() {
    this.set('100%');
    setTimeout(function() {
      this.setState({
        done: true
      });
      setTimeout(function() {
        this.setState({
          rate: null
        });
      }.bind(this), this.props.speed * 2 * 1000);
    }.bind(this), this.props.speed * 1000);
  },
  _format: function(data) {  // 格式化为 0-100 的整数
    if (typeof data === 'number') {  // 0-1 的小数
      return data > 1
        ? this.pros.maxRate * 100
        : data * 100;
    } else if (typeof data === 'string') {  // 百分比
      return parseFloat(data) > 100
        ? this.props.maxRate * 100
        : parseFloat(data);
    } else {
      return;
    }
  },
  _init: function() {
    this.state.done && this.setState({
      done: false
    });
    this.timer && this._clearInterval();
  },
  _autoInc: function() {
    var newRate;
    var random;
    this.timer = setInterval(function() {
      random = this._getRadomStep();
      newRate = this.state.rate + random;
      console.log(random);
      if (newRate > this.props.maxRate * 100) {
        console.log(this.props.maxRate * 100);
        this._clearInterval();
        return;
      }
      console.log(newRate);
      this.set(newRate + '%', true);
    }.bind(this), this.props.trickleSpeed);
  },
  _clearInterval: function() {
    this.timer && clearInterval(this.timer);
  },
  _getRadomStep: function(min, max) {
    min = min || this.props.minStep * 100;
    max = max || this.props.maxStep * 100;
    return Math.random() * (max - min) + min;
  },
  render: function() {
    var progressStyle = {
      //display: (!this.state.rate && typeof this.state.rate === 'object') ? 'none' : 'block',
      opacity: this.state.done
        ? 0
        : 1,
      transition: 'opacity ' + this.props.speed * 2 + 's ' + this.props.easing
    };
    var barStyle = {
      width: !this.state.rate
        ? 0
        : this.state.rate + '%',
      transition: 'width ' + this.props.speed + 's ' + this.props.easing
    };
    return this.state.rate
      ? (
        React.createElement("div", {className: "cu-progress", style: progressStyle}, 
          React.createElement("div", {className: "cu-progress-bar", style: barStyle}), 
          this.props.spinner
            ? React.createElement(Spinner, null)
            : null
        )
      )
      : null;
  }
});

var ToolTip = React.createClass({displayName: "ToolTip",
    getDefaultProps: function() {
        return {
            tip: "tip",
            trigger: 'hover',
            delay: 0,
            hoverable: false,
            position: "tip",
            width: "200px",
            type: 'span',
            aHref: "#"
        };
    },
    getInitialState: function() {
        return {
            position: this.props.position,
            isActive: false,
            isOnTip: false,
            tipHeight: ""
        };
    },
    handleMouseOver: function(e) {
        if(this.props.trigger=="hover") {
            this.setState({isActive: true});
        }
    },
    handleMouseOut: function(e) {
        if(this.props.trigger=="hover") {
            setTimeout(function() {
                if(this.state.isOnTip) {
                    return false;
                }
                this.setState({isActive: false});
            }.bind(this) , this.props.delay);
        }
    },
    handleClick: function(e) {
        if(this.props.trigger=="click") {
            if(this.state.isActive) {
                this.setState({isActive: false});
            } else if(!this.state.isActive) {
                this.setState({isActive: true});
            }
        }
    },
    handleTipMouseOver: function(e) {
        if(this.props.hoverable) {
            this.setState({isOnTip: true});
            this.setState({isActive: true});
        }
    },
    handleTipMouseOut: function(e) {
        if(this.props.hoverable) {
            this.setState({isOnTip: false});
            this.setState({isActive: false});
        }
    },
    componentDidUpdate: function() {
        this.setTipPosition();
    },
    setTipPosition: function() {
        var tip = this.refs.tip.getDOMNode();
        var cont = this.refs.cont.getDOMNode();
        if(!this.flag) {
            this.state.tipHeight = tip.offsetHeight;
            this.flag = 1;
        }
        var tipWidth = tip.offsetWidth;
        var tipHeight = tip.offsetHeight;
        var contWidth = cont.offsetWidth;
        var contHeight = cont.offsetHeight;
        switch (this.state.position) {
            case "left":tip.style.top = -(tipHeight-contHeight)/2+"px";
                        tip.style.left = -(tipWidth+20)+"px";
                break;
            case "right":tip.style.top = -(tipHeight-contHeight)/2+"px";
                        tip.style.left = "100%";
                break;
            case "top":tip.style.left = -(tipWidth-contWidth)/2+"px";
                        tip.style.bottom = "100%";
                break;
            case "bottom":tip.style.left = -(tipWidth-contWidth)/2+"px";
                        tip.style.top = "100%";
                break;
            default: tip.style.top = -(tipHeight-contHeight)/2+"px";
                    tip.style.left = -(tipWidth+20)+"px";
        }
        tip.style.height = this.state.tipHeight-20+"px";
        this.prevertTipOverflow();
    },
    prevertTipOverflow: function() {
        var tipX = this.refs.tip.getDOMNode().getBoundingClientRect().left;
        var tipY = this.refs.tip.getDOMNode().getBoundingClientRect().top;
        var tipWidth = this.refs.tip.getDOMNode().offsetWidth;
        var tipHeight = this.refs.tip.getDOMNode().offsetHeight;
        var availWidth = parseInt(document.body.clientWidth);
        if(tipX < 0 && tipX+tipWidth > availWidth) {
            return true;
        }
        if(tipX < 0) {
            if(this.state.position == "left") {
                this.setState({position: "top"});
                return ;
            }
            if(this.state.position == "top" || this.state.position == "bottom") {
                this.setState({position: "right"});
                return ;
            }
        }
        if(tipX+tipWidth > availWidth) {
            if(this.state.position == "right") {
                this.setState({position: "bottom"});
                return ;
            }
            if(this.state.position == "bottom" || this.state.position == "top") {
                this.setState({position: "left"});
                return ;
            }
        }

    },
    getTipStyle: function() {
        return {
            display: this.state.isActive?"block":"none",
            color: "pink",
            backgroundColor: "#333",
            width: this.props.width,
        };
    },
    render: function() {
        if(this.props.type=="span") {
            return (
                React.createElement("span", {className: "tooltip "+this.state.position}, 
                    React.createElement("span", {ref: "cont", onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut, onClick: this.handleClick}, this.props.children), 
                    React.createElement("div", {onMouseOver: this.handleTipMouseOver, onMouseOut: this.handleTipMouseOut, className: "tip", ref: "tip", style: this.getTipStyle()}, this.props.tip)
                )
            );
        }
        if(this.props.type=="a") {
            return (
                React.createElement("span", {className: "tooltip "+this.state.position}, 
                    React.createElement("a", {href: this.props.aHref, ref: "cont", onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut, onClick: this.handleClick}, this.props.children), 
                    React.createElement("div", {onMouseOver: this.handleTipMouseOver, onMouseOut: this.handleTipMouseOut, className: "tip", ref: "tip", style: this.getTipStyle()}, this.props.tip)
                )
            );
        }
        if(this.props.type=="button") {
            return (
                React.createElement("span", {className: "tooltip "+this.state.position}, 
                    React.createElement("button", {ref: "cont", onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut, onClick: this.handleClick}, this.props.children), 
                    React.createElement("div", {onMouseOver: this.handleTipMouseOver, onMouseOut: this.handleTipMouseOut, className: "tip", ref: "tip", style: this.getTipStyle()}, this.props.tip)
                )
            );
        }
    }
});
