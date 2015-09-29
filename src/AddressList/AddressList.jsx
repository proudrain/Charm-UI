// 整体组件
var AddressList = React.createClass({
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
            <div className="AddressList">
                <AddressDropButton triangleState={this.state.isWrapShow} onClick={this.handleBtnClick}>
                    {this.state.nowAddress}
                </AddressDropButton>
                {this.state.isWrapShow?
                    <AddressWrap addressData={this.props.addressData} localAddress={this.props.localAddress} handleSelectAddress={this.handleSelectAddress} secondAddressData={this.secondAddressData} isSecondShow={this.state.isSecondShow}/>
                    :null
                }
            </div>
        );
    }
});

// 下拉按钮
var AddressDropButton = React.createClass({
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
            <button className="AddressDropButton" onClick={this.handleClick}>
                {this.props.children}
                <span className={"triangle "+this.props.triangleState}></span>
            </button>
        );
    }
});

// 地址操作框容器
var AddressWrap = React.createClass({
    getInitialState: function() {
        return {};
    },
    getDefaultProps: function() {
        return {};
    },
    render: function() {
        if(this.props.isSecondShow) {
            return (
                <div className="AddressWrap">
                    <AddressSecondWrap secondAddressData={this.props.secondAddressData}/>
                </div>
            );
        }
        return (
            <div className="AddressWrap">
                <AddressLocation localAddress={this.props.localAddress} handleSelectAddress={this.props.handleSelectAddress} />
                <AddressSearchInput handleSelectAddress={this.props.handleSelectAddress} />
                <AddressListWrap addressData={this.props.addressData} handleSelectAddress={this.props.handleSelectAddress} />
            </div>
        );
    }
});

// 定位当前地址
var AddressLocation = React.createClass({
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
            <div>
                猜你在：<span onClick={this.handleClick}>{this.props.localAddress}</span>
            </div>
        );
    }
});

// 地址搜索
var AddressSearchInput = React.createClass({
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
            <div className="AddressSearch">
                搜索：
                <input onChange={this.handleSearch} />
            </div>
        );
    }
});

// 地址列表容器
var AddressListWrap = React.createClass({
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
                cont[i]  = <AddressListRow keyData={key} data={data[key]} handleSelectAddress={handleSelectAddress} />;
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
                cont[i]  = <span><span data={key} key={i}  onClick={handleClick} >{key}</span></span>;
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

// 二级地址列表容器
var AddressSecondWrap = React.createClass({
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
                cont[i]  = <AddressSecondRow keyData={key} data={data[key]} />;
                i++;
            }
            return cont;
        }(secondAddressData);
        return (
            <div className="AddressSecondWrap">
                {rowNodes}
            </div>
        );
    }
});

// 二级地址列表行
var AddressSecondRow = React.createClass({
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
                cont[i]  = <span><a data={key} key={i} href={data[key]} >{key}</a></span>;
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

// 滚动条组件
var ScrollBar = React.createClass({
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
            <div></div>
        );
    }
});
