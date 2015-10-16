'use strict'

//  ==================================================
//  Component: ProgressBar
//
//  Include: PaginationBtn
//
//  TODO:
//  ==================================================

/* PaginationBtn */
var PaginationBtn = React.createClass({
  getDefaultProps: function() {
    return {
      text: 1,
      type: "num"
    };
  },
  render: function() {
    var text = (this.props.type === 'dot') ? '...' : this.props.text;
    var itemClass = this.props.active
      ? "item active"
      : "item";
    if(this.props.type !== 'num') {
      itemClass += (" page " + this.props.type);
    }
    if(this.props.disabled) {
      itemClass += ' disabled';
    }
    return (
      <li className={itemClass} onClick={this.props.changePage}>
        <a>{text}</a>
      </li>
    );
  }
});

/* Pagination */
var Pagination = React.createClass({
  propTypes: {
    pages: React.PropTypes.number
  },
  getInitialState: function() {
    return {
      activePage: this.props.activePage || 1,
      pageItems: this.getPageItems(1)
    };
  },
  getDefaultProps: function() {
    return {
      first: null, // 首页 null || string
      prev: "上一页", // 上一页 null || string
      basePages: 2, // first prev base ... mid ... next last
      midPages: 5, // first prev base ... mid ... next last
      ellipsis: true, // 省略号 boolen
      next: "下一页", // 下一页 null || string
      last: null, // 末页 null || string
      theme: "light", // 主题
      selected: function(page) { // 页码切换时回调
        console.log(page);
      }
    }
  },
  handleItemClick: function(type, page) {
    if (type === "first") {
      page = 1;
    } else if (type === "prev") {
      page = (this.state.activePage === 1) ? 1 : this.state.activePage - 1;
    } else if (type === "next") {
      page = (this.state.activePage === this.props.pages) ? this.props.pages : this.state.activePage + 1;
    } else if (type === "last") {
      page = this.props.pages;
    } else {
      page = page;
    }
    var pageItems = this.getPageItems(page);
    if (page !== this.state.activePage) {
      this.setState({
        activePage: page,
        pageItems: pageItems
      });
      this.props.selected(page);
    }
  },
  getPageItems: function(n) {
    var list = [];
    var b = this.props.basePages;
    var m = this.props.midPages;
    var p = this.props.pages;
    if(n <= parseInt(m / 2) + 1) { // 1
      list = this._getSeriesNumber(1, p <= b + m ? p : m);
    } else if((n <= parseInt(m / 2) + 1 + b) || p <= b + m)  { // 1'
      list = this._getSeriesNumber(1, p <= b + m ? p : n + 2);
    } else if((n < p - parseInt(m / 2) - 1)) {  // 2
      list = this._getSeriesNumber(1, this.props.basePages);
      list.push('e');
      list = list.concat(this._getSeriesNumber(n-2, m));
      if(p > m + b + 2) {
        list.push('e');
      }
    } else if(n === p - parseInt(m / 2) - 1) {  // 3
      list = this._getSeriesNumber(1, this.props.basePages);
      list.push('e');
      list = list.concat(this._getSeriesNumber(p - m, m + 1));
    } else {  // 4
      list = this._getSeriesNumber(1, this.props.basePages);
      list.push('e');
      list = list.concat(this._getSeriesNumber(p - m + 1, m));
    }
    return list;
  },
  _getSeriesNumber: function(start, length) {
    start = start;
    length = length;
    var series = [];
    while(length--) {
      series.push(start++);
    }
    return series;
  },
  render: function() {
    var start = this.getPageItems(this.state.activePage);
    var startBlock = [];
    var endBlock = [];
    if(this.props.pages > 0) {
      if(this.props.first) {
        startBlock.push(<PaginationBtn text={this.props.first} disabled={(this.state.activePage === 1) ? true : false} type="prev" type="first" changePage={this.handleItemClick.bind(this, 'first')} />);
      }
      if(this.props.prev) {
        startBlock.push(<PaginationBtn text={this.props.prev} disabled={(this.state.activePage === 1) ? true : false} type="prev" changePage={this.handleItemClick.bind(this, 'prev')} />);
      }
      if(this.props.next) {
        endBlock.push(<PaginationBtn text={this.props.next} type="next" disabled={(this.state.activePage === this.props.pages) ? true : false} changePage={this.handleItemClick.bind(this, 'next')} />);
      }
      if(this.props.last) {
        endBlock.push(<PaginationBtn text={this.props.last} type="last" disabled={(this.state.activePage === this.props.pages) ? true : false} changePage={this.handleItemClick.bind(this, 'last')} />);
      }
    }
    var pagiClass = (this.props.theme === 'light') ? 'pagination' : 'pagination ' + this.props.theme;
    return (
      <ul className={pagiClass}>
        {startBlock}
        {
          (this.props.pages > 0) && this.state.pageItems.map(function(item, i) {
              return (
                <PaginationBtn text={item} type={item === 'e' ? 'dot' : 'num'} active={(item === this.state.activePage) ? true : false} changePage={item === 'e' ? null : this.handleItemClick.bind(this, 'num', item)} key={i} />
              )
            }.bind(this))
        }
        {endBlock}
      </ul>
    )
  }
});
