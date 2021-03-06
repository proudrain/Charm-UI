'use strict';

//  ==================================================
//  Component: Items
//
//  Props:  items theme guide
//
//  Include: ItemGroup Items Item ItemBadge ItemImg ItemInfo ItemTip
//
//  Use: index.html search.html
//
//  TODO: 厂商页　bug
//  ==================================================

var ItemBadge = React.createClass({
  getDefaultProps: function() {
    return {
      text: '新品',
      color: '#ed4300'
    }
  },
  render: function() {
    var badgeStyle = {
      backgroundColor: this.props.color
    }
    return (
      <span className="item-badge" style={badgeStyle}>
        {this.props.text}
      </span>
    );
  }
});

var ItemImg = React.createClass({
  render: function() {
    return (
      <a href={"/item/" + this.props.id} className="item-img" title={this.props.item}>
        <img src={this.props.imgUrl} alt={this.props.item} />
      </a>
    );
  }
});

var ItemInfo = React.createClass({
  formatPrice: function(price) {
    if(price / 10000 >= 1) {
      return (price / 10000).toFixed(2) + '万';
    } else if(price / 1000 >= 1) {
      return (price / 1000).toFixed(2) + '千';
    } else {
      return price.toFixed(2);
    }
  },
  render: function() {
    return (
      <div className="item-info">
        <h5>
          <a href={'/item/' + this.props.id} title={this.props.item}>
            {this.props.item}
          </a>
        </h5>
        <p className="price">
          {this.formatPrice(this.props.price)}
        </p>
      </div>
    );
  }
});

var ItemTip = React.createClass({
  render: function() {
    return (
      <div className="item-tip">
        <span className="go-expe">
          <a href={'/item/' + this.props.id + '?open'}>去体验馆</a>
        </span>
        <span className="go-comp">
          <a href="#">对比</a>
        </span>
      </div>
    );
  }
});

var Item = React.createClass({
  render: function() {
    return (
      <div className="item">
        {
          // <ItemBadge  />
        }
        <ItemImg
          id={this.props.item.id}
          imgUrl={this.props.item.image_url}
          item={this.props.item.item}
        />
        <ItemInfo
          id={this.props.item.id}
          item={this.props.item.item}
          price={this.props.item.price}
        />
        {
          this.props.theme === 'normal' ?
          <ItemTip id={this.props.item.id} /> :
          null
        }
      </div>
    );
  }
});

var Items = React.createClass({
  getDefaultProps: function() {
    return {
      theme: 'normal'
    }
  },
  render: function() {
    var flagStyle = {
      bakcgroundColor: this.props.color
    };
    return (
      <div className={'items ' + this.props.theme}>
        {
          this.props.theme === 'tight' ?
          <div className="items-flag" style={flagStyle}></div> :
          null
        }
        {this.props.items.map(function(item, i) {
          return <Item item={item} key={i} theme={this.props.theme} />;
        }.bind(this))}
      </div>
    );
  }
});

var GroupGuide = React.createClass({
  render: function() {
    var titleStyle = {
      bakcgroundColor: this.props.guide.color
    };
    return (
      <div className="group-guide">
        <div className="guide-title" style={titleStyle}>
          <a href={this.props.guide.url}>
            {this.props.guide.title}
          </a>
          <a href="/more" className="more am-icon-angle-right">更多</a>
        </div>
        <img
          src={this.props.guide.img}
          alt={this.props.guide.title}
          className="guide-img"
        />
      </div>
    );
  }
});

var ItemGroup = React.createClass({
  getDefaultProps: function() {
    return {
      theme: 'normal'
    }
  },
  render: function() {
    return (
      <div className="item-group">
        <GroupGuide guide={this.props.guide} />
        <Items
          items={this.props.items}
          color={this.props.guide.color}
          theme="tight"
        />
      </div>
    );
  }
});
