'use strict';

//  ==================================================
//  Component: Index
//
//  Props:
//
//  Include:
//
//  Use: index.html
//
//  TODO:
//  ==================================================

var TopBar = React.createClass({
  render: function() {
    return (
      <div className="top-bar">
        <div className="user-info">
          <span className="hello">欢迎来到万木家，</span>
          <span className="login">
            <a href="/login">请登录</a>
          </span>
          <span className="reg">
            免费
            <a className="reg-btn" href="/reg">注册</a>
          </span>
        </div>
        <div className="site-info">
          <span className="fav">
            <a href="/fav">收藏夹</a>
          </span>
          <span className="my">
            <a href="/my">我的万木家</a>
          </span>
          <span className="comp">
            <a href="/com">商品对比</a>
          </span>
          <span className="crtl-d">
            <a href="/star">收藏本站</a>
          </span>
          <span className="tel">
            服务电话：400 0117 440
          </span>
        </div>
      </div>
    );
  }
});

var NavMainBtn = React.createClass({
  render: function() {
    var itemClass = this.props.item.active ? "nav-main-item active" : "nav-main-item";
    return (
      <li className={itemClass}>
        <a href={this.props.item.link} title={this.props.item.title}>
          {this.props.item.title}
        </a>
      </li>
    );
  }
});

var NavMain = React.createClass({
  getDefaultProps: function() {
    return {
      items: [
        {
          id: 0,
          title: '首页',
          link: '/index',
          active: true
        }, {
          id: 1,
          title: '家具大全',
          link: '/overview'
        }, {
          id: 2,
          title: '品牌馆',
          link: '/brand'
        }, {
          id: 3,
          title: '红木百科',
          link: '/baike'
        }
      ]
    }
  },
  render: function() {
    return (
      <div className="nav-main">
        {this.props.items.map(function(item, i) {
          return <NavMainBtn item={item} key={i} />;
        })}
      </div>
    );
  }
});

var Banner = React.createClass({
  render: function() {
    return (
      <div className="banner">
        <div className="logo">
          <img src="logo.png" title="万木家" />
        </div>
        <div className="city">
          选城市
        </div>
        <div className="search">
          <div className="am-input-group">
            <input type="text" className="am-form-field" placeholder="搜索您喜欢的红木产品" />
            <span className="am-input-group-btn">
              <button className="am-btn am-btn-default" type="button">搜索</button>
            </span>
          </div>
        </div>
        <div className="qrcode">
          <img src="qrcode.png" title="扫一扫关注我们" />
        </div>
      </div>
    );
  }
});

var Slider = React.createClass({
  render: function() {
    return (
      <AMUIReact.Slider {...this.props}>
        {this.props.items.map(function(item, i) {
          return (
            <AMUIReact.Slider.Item key={i}>
              <a href={item.url} title={item.title}>
                <img src={item.img} />
              </a>
            </AMUIReact.Slider.Item>
          );
        })}
      </AMUIReact.Slider>
    );
  }
});

var Header = React.createClass({
  render: function() {
    return (
      <div className="header">
        <Banner />
        <Nav {...this.props} />
        <NavMain />
      </div>
    );
  }
});
