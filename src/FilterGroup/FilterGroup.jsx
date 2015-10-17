
// FilterGroup
var FilterOption = React.createClass({
  render: function () {
    var inputStyle = {
      display: this.props.isMultiSelect ? 'inline' : 'none'
    };
    var optionValue = this.props.value;
    var select = this.props.onSelect.bind(this, optionValue.value);
    return (
      <div>
        <a href="#" onClick={select}>
          <input style={inputStyle} type="checkbox" name={optionValue.name} value={optionValue.value} />
          <span ng-bind={optionValue.value}></span>
        </a>
      </div>
    );
  }
});

var FilterAction = React.createClass({
  render: function () {
    return (
      <div className="filter-action">
        <a style={{display: this.props.multiToggleStatus ? 'inline' : 'none'}}
          ng-click="multiToggle()" href="#" className="multi-toggle">多选</a>
        <a ng-click="expandToggle()" href="#">
          { this.props.expandToggleStatus ? '更多' : '收起' }
          <i className="glyphicon glyphicon-menu-down"></i>
        </a>
      </div>
    );
  }
});

var Filter = React.createClass({
  getInitialState: function () {
    return {
      isMultiSelect: false,
      isExpanded: false
    };
  },
  getDefaultProps: function () {
    return {
      canMultiSelect: false,
      treeView: false,
      options: [],
    };
  },
  render: function () {
    var optionNodes = this.props.options.map(function (option) {
      return (
        <li className="filter-items">
          <FilterOption value={option} onSelect={this.props.onSelectOption} isMultiSelect={this.state.isMultiSelect} />
        </li>
      );
    });

    return (
      <div className={"filter" + this.state.isExpanded ? " expanded" : ""}>
        <div className="head">
          <h4 className="filter-name">{this.props.name}</h4>
        </div>

        <div className="body">
          <ul className="filter-items">
            {optionNodes}
          </ul>
        </div>

        <div className="foot">
          <FilterAction
            expandToggleStatus={!this.state.isExpanded}
            multiToggleStatus={this.props.canMultiSelect &&
              !this.state.isMultiSelect} />
        </div>
      </div>
    );
  }
});

var FilterStateTag = React.createClass({
  render: function () {
    var tagValueNodes;
    var currStateValues = this.props.value;
    tagValueNodes = currStateValues.map(function (value, index, values) {
      if (this.props.treeView) {
        // state 为 treeView
        return (
          <span>
            {value.value}
            <span class="tag-remove">
              <a ng-click="removeState(tag.field, value)" href="#">&times;</a>
            </span>
            {
              index == values.length - 1 ?
                (<span>&gt;</span>) :
                null
            }
          </span>
        );
      }
      // state 不是 treeView 但可能为多选状态
      return (
        <span>
          {
            index == values.length - 1 ?
              value.value + ',' :
              value.value
          }
          <span class="tag-remove">
            <a ng-click="removeState(tag.field, value)" href="#">&times;</a>
          </span>
        </span>
      );
    });

    return (
      <div class="filter-tag">
        <div class="tag-name">{this.props.name + ':'}</div>
        <div class="tag-value">
          {tagValueNodes}
        </div>
      </div>
    );
  }
});

var FilterStateBar = React.createClass({
  render: function () {
    var stateTagNodes = Object.keys(this.props.filterState)
      .map(function (state) {
        var field = state.field;
        var def = this.props.getFilterDef(field);
        return (
          <FilterStateTag
            field={field}
            name={def.name}
            value={state.value}
            treeView={def.treeView}
          />
        );
      });
    return (
      <div class="filter-state">
        <div class="custom-content">
          {this.props.children}
        </div>
        <div class="filter-tags">
          {stateTagNodes}
        </div>
      </div>
    );
  }
});

/**
 * [props]
 * filterDefs
 * filterValues
 */
var FilterGroup = React.createClass({
  getInitialState: function () {
    return {
      filterValues: this.props.filterValues || {},
      filterState: {}
    };
  },
  _getFilterDef: function (field) {
    return this.props.filterDefs[field];
  },
  render: function () {
    var filterNodes = this.props.filterDefs.map(function (def) {
      var options = this.state.filterValues[def.field] || [];
      return (
        <li style={{display: options.length > 0 ? 'block' : 'none'}}>
          <Filter
            name={def.name}
            field={def.field}
            canMultiSelect={def.canMultiSelect}
            treeView={def.treeView}
            options={options}
            onSelectOption={this.handleSelect}
          />
        </li>
      );
    });

    return (
      <div>
        <FilterStateBar
          filterState={this.state.filterState}
          getFilterDef={this._getFilterDef}
        >
          {this.props.children}
        </FilterStateBar>
        <ul class="filter-group">
          {filterNodes}
        </ul>
      </div>
    );
  }
});
