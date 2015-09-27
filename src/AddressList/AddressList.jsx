// 整体组件
var AddressList = React.createClass({
    getInitialState: function() {
        return {
            nowAddress: this.props.localAddress,
            isWrapShow: false
        };
    },
    getDefaultProps: function() {
        return {
            
        };
    },
    handleBtnClick: function() {
        if(!this.state.isWrapShow) {
            this.setState({isWrapShow: true});
            // 出现列表事件
            console.log('000000000000000');
        } else {
            this.setState({isWrapShow: false});
        }
    },
    handleSelectAddress: function(selectAddress) {
        this.setState({nowAddress: selectAddress});
        this.setState({isWrapShow: false});
    },
    render: function() {
        var addressWrap = this.state.isWrapShow?<AddressWrap localAddress={this.props.localAddress} selectAddress={this.handleSelectAddress}/>:null;
        return (
            <div className="AddressList">
                <AddressDropButton isClick={this.state.isWrapShow} onClick={this.handleBtnClick}>{this.state.nowAddress}</AddressDropButton>
                {addressWrap}
            </div>
        );
    }
});

// 下拉按钮
var AddressDropButton = React.createClass({
    getInitialState: function() {
        return {

        };
    },
    getDefaultProps: function() {
        return {

        };
    },
    handleClick: function() {
        this.props.onClick();
    },
    render: function() {
        return (
            <button className="AddressDropButton" onClick={this.handleClick}>
                {this.props.children}
                <span className={"triangle "+this.props.isClick}></span>
            </button>
        );
    }
});

// 地址操作框容器
var AddressWrap = React.createClass({
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
            <div className="AddressWrap">
                <AddressWrapTop localAddress={this.props.localAddress} selectAddress={this.props.selectAddress} />
            </div>
        );
    }
});

// 地址列表头部
var AddressWrapTop = React.createClass({
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
            <div className="AddressWrapTop">
                <AddressLocation localAddress={this.props.localAddress} selectAddress={this.props.selectAddress} />
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
        this.props.selectAddress(this.props.localAddress);
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
var AddressSearch = React.createClass({
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

// 地址列表容器
var AddressListWrap = React.createClass({
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
    render: function() {
        return (
            <div></div>
        );
    }
});

// 二级地址列表容器
var AddressSecondWrap = React.createClass({
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

// 二级地址列表容器
var AddressSecondWrap = React.createClass({
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

// 二级地址列表行
var AddressSecondRow = React.createClass({
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
