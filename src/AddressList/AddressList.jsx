// 整体组件
var AddressList = React.createClass({
    getInitialState: function() {
        return {
            nowAddress: null,
            isWrapShow: false
        };
    },
    handleBtnClick: function() {
        this.setState({isWrapShow: !this.state.isWrapShow});
    },
    handleSelectAddress: function(selectCt) {
        this.setState({nowAddress: selectCt,isWrapShow: false});
        if(this.props.setCity) {
            this.props.setCity(selectCt);
        }
    },
    render: function() {
        return (
            <div className="AddressList">
                <AddressDropButton triangleState={this.state.isWrapShow} onClick={this.handleBtnClick}>
                    {this.state.nowAddress?this.state.nowAddress:this.props.localAddress}
                </AddressDropButton>
                {this.state.isWrapShow?
                    <AddressWrap addressData={this.props.addressData} localAddress={this.props.localAddress} handleSelectAddress={this.handleSelectAddress}/>
                    :null
                }
            </div>
        );
    }
});

// 下拉按钮
var AddressDropButton = React.createClass({
    handleClick: function() {
        this.props.onClick();
    },
    render: function() {
        return (
            <button className="AddressDropButton" onClick={this.handleClick}>
                {this.props.children}
                <span className={"triangle "+this.props.triangleState}></span>
            </button>
        );
    }
});

// 地址操作框容器
var AddressWrap = React.createClass({
    render: function() {
        return (
            <div className="AddressWrap">
                <div className="AddressCont">
                    <AddressLocation localAddress={this.props.localAddress} handleSelectAddress={this.props.handleSelectAddress} />
                    <AddressSearchInput addressData={this.props.addressData} handleSelectAddress={this.props.handleSelectAddress} />
                    <AddressListWrap addressData={this.props.addressData} handleSelectAddress={this.props.handleSelectAddress} />
                </div>
            </div>
        );
    }
});

// 定位当前地址
var AddressLocation = React.createClass({
    handleClick: function() {
        this.props.handleSelectAddress(this.props.localAddress);
    },
    render: function() {
        return (
            <div className="AddressLocation">
                猜你在：<span onClick={this.handleClick}>{this.props.localAddress}</span>
            </div>
        );
    }
});

// 地址搜索
var AddressSearchInput = React.createClass({
    getInitialState: function() {
        return {
            result: [],
        };
    },
    handleResultClick: function(e) {
        var address = e.target.getAttribute('data');
        this.props.handleSelectAddress(address);
    },
    handleSearch: function(event) {
        var cont = event.target.value;
        var len = cont.length;
        var addressData = this.props.addressData;
        // 判断是汉字还是拼音
        var reg=/^[\u4E00-\u9FA5]+$/;
        if(reg.test(cont)) {
            // 是汉字处理
            var _resultH = [];
            var j = 0;
            for(var keyH in addressData) {
                for(var keyHS in addressData[keyH]) {
                    if(addressData[keyH][keyHS].city.substring(0,len) == cont) {
                        _resultH[j]  = addressData[keyH][keyHS].city;
                        j++;
                    }
                }
            }
            this.setState({result: _resultH});
            return ;
        }
        // 是拼音
        var FL = cont.substring(0,1).toLocaleUpperCase();
        var resultFL = addressData[FL];
        var _result = [];
        var i = 0;
        for(var key in resultFL) {
            if(key.substring(0,len) == cont.toLocaleLowerCase()) {
                _result[i]  = resultFL[key].city;
            }
            i++;
        }
        this.setState({result: _result});
    },
    render: function() {
        var _handleResultClick = this.handleResultClick;
        var resultNodes = this.state.result.map(function (result) {
            return (
                <li data={result} onClick={_handleResultClick}>{result}</li>
            );
        });
        return (
            <div className="AddressSearch">
                直接搜索
                <input onChange={this.handleSearch} placeholder="请输入城市名" />
                <ul className="AddressSearchResult">
                    {resultNodes}
                </ul>
            </div>
        );
    }
});

// 地址列表容器
var AddressListWrap = React.createClass({
    render: function() {
        var addressData = this.props.addressData;
        var handleSelectAddress = this.props.handleSelectAddress;
        var rowNodes = function(data) {
            var cont = [];
            var i = 0;
            for(var key in data) {
                cont[i]  = <AddressListRow key={key} keyData={key} data={data[key]} handleSelectAddress={handleSelectAddress} />;
                i++;
            }
            return cont;
        }(addressData);
        return (
            <div className="AddressListWrap">
                {rowNodes}
            </div>
        );
    }
});

// 地址列表行
var AddressListRow = React.createClass({
    handleClick: function(e) {
        var address = e.target.getAttribute('data');
        this.props.handleSelectAddress(address);
    },
    render: function() {
        var handleClick = this.handleClick;
        var dataNodes = function(data) {
            var cont = [];
            var i = 0;
            for(var key in data) {
                cont[i]  = <span key={"p"+key}><span data={data[key].city} key={i}  onClick={handleClick} >{data[key].city}</span></span>;
                i++;
            }
            return cont;
        }(this.props.data);
        return (
            <div className="AddressListRow">
                <span className="keyData">{this.props.keyData}</span>
                <span className="dataWrap">{dataNodes}</span>
            </div>
        );
    }
});
