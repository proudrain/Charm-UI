
var foo = 1;
console.log(foo);

var ToolTip = React.createClass({displayName: "ToolTip",
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
            default:
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
        return (
            React.createElement("span", {className: "tooltip "+this.state.position}, 
                React.createElement("span", {ref: "cont", onMouseOver: this.handleMouseOver, onMouseOut: this.handleMouseOut, onClick: this.handleClick}, this.props.children), 
                React.createElement("div", {onMouseOver: this.handleTipMouseOver, onMouseOut: this.handleTipMouseOut, className: "tip", ref: "tip", style: this.getTipStyle()}, this.props.tip)
            )
        );
    }
});

'use strict'

var Spinner = React.createClass({displayName: "Spinner",
  render: function() {
    return (
      React.createElement("div", {className: "cu-spinner"})
    );
  }
});

var Progressbar = React.createClass({displayName: "Progressbar",
	getInitialState: function() {
    return {
    	rate: null,
    	done: false
    };
  },
  getDefaultProps: function() {
    return {
      speed: 0.6,
      spinner: true,
      easing: 'ease',
      maxRate: 0.98,
      incStep: 0.04,
      minStep: 0.005,
      maxStep: 0.03,
      trickle: true,
      trickleSpeed: 800,
      setTrickle: false
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
  	if(n === 100) {
  		/* done */
  		this.setState({
  			rate: 100
  		});
  	} else {
  		n = n > this.props.maxRate * 100 ? this.props.maxRate * 100 : n;
  		this.setState({
  			rate: n
  		});
  	}
  },
  inc: function(n) {
  	this._init();
  	this.props.trickle && this._autoInc();
  	n = n ? this. _format(n) : this.props.incStep * 100;
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
  _format: function(data) {
  	if(typeof data === 'number') {
  		return data > 1 ? this.pros.maxRate * 100 : data * 100;
  	} else if(typeof data === 'string') {
  		return parseFloat(data) > 100 ? this.props.maxRate * 100 : parseFloat(data);
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
			if(newRate > this.props.maxRate * 100) {
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
  		opacity: this.state.done ? 0 : 1,
  		transition: 'opacity ' + this.props.speed * 2 + 's ' + this.props.easing
  	};
    var barStyle = {
  		width: !this.state.rate ? 0 : this.state.rate + '%',
  		transition: 'width ' + this.props.speed + 's ' + this.props.easing
		};
  	return this.state.rate ? (
      React.createElement("div", {className: "cu-progress", style: progressStyle}, 
      	React.createElement("div", {className: "cu-progress-bar", style: barStyle}), 
      	this.props.spinner ? React.createElement(Spinner, null) : null
      )
    ) : null;
  }
});
<<<<<<< HEAD


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
=======
>>>>>>> 3eaaeba4ae0922c0acd21e57ef24fcf338f09e8f