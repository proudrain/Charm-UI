'use strict'

var Spinner = React.createClass({
  render: function() {
    return (
      <div className="cu-spinner"></div>
    );
  }
});

var Progressbar = React.createClass({
	getInitialState: function() {
    return {
    	rate: 0,
    	done: false,
    	hide: false
    };
  },
  getDefaultProps: function() {
    return {
      speed: .2,
      spinner: true,
      easing: 'ease',
      startReset: false,
      maxRate: .996,
      incStep: .04,
      trickle: true,
      trickleSpeed: 800
    };
  },
  start: function() {
  	this._init();
//	this.props.startReset || !this.state.rate && this.set(0);
  	this.inc();
  },
  set: function(n) {
  	n = this._format(n);
  	if(n === 100) {
  		/* done */
	  	this.setState({
	  		rate: 100
	  	});
  		setTimeout(function(){
  			this.setState({
		  		hide: true
		  	});
		  	setTimeout(function(){
	  			this.setState({
	  				rate: 0,
			  		done: true
			  	});
	  		}.bind(this), this.props.speed * 2 * 1000);
  		}.bind(this), this.props.speed * 1000);
  	} else {
  		this._init();
	  	this.setState({
	  		rate: n
	  	});
  	}
  },
  inc: function(n) {
  	var rate = this.state.rate;
  	console.log(rate);
  	n = this._format(n || this.props.incStep);
  	if(this.state.rate !== 100 && rate + n < this.props.maxRate * 100) {
  		rate += n;
  		this.set(rate / 100);
  		this.props.trickle && this._autoInc(rate);
  	} else{
  		return;
  	}
  },
  done: function() {
  	this.set(1);
  },
  _format: function(data) {
  	if(typeof data === 'number'){
  		return data * 100;
  	} else if(typeof data === 'string') {
  		return parseFloat(data);
  	}
  },
  _autoInc: function(rate) {
		setTimeout(function() {
			if(this.state.rate === 100) {
				return;
			}
			this.inc((Math.random() * 5 + 1) / 100);
		}.bind(this), this.props.trickleSpeed);
	},
	_init: function() {
		this.setState({
  		done: false,
    	hide: false
  	});
	},
  render: function() {
  	var barStyle = {
  		/*transform: 'translate3d(' + (this.state.rate - 100) + '%, 0, 0)',
  		WebkitTransform: 'translate3d(' + (this.state.rate - 100) + '%, 0, 0)',*/
  		width: this.state.rate + '%',
  		transition: 'width ' + this.props.speed + 's ' + this.props.easing + ' ,opacity ' + this.props.speed * 2 + 's ' + this.props.easing  	};
  	var progressStyle = {
  		display: this.state.done ? 'none' : 'block',
  		transition: 'opacity ' + this.props.speed * 2 + 's ' + this.props.easing,
  		opacity: !this.state.rate || this.state.hide ? 0 : 1
  	};
    return (
      <div className="cu-progress" style={progressStyle}>
      	<div className="cu-progress-bar" style={barStyle}></div>
      	{this.props.spinner ? <Spinner /> : null}
      </div>
    );
  }
});

