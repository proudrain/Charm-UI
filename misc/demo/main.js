/**
 * Created by rain on 15/8/11.
 */
angular.module('uiSimbaDemon', ['ui.simba'])

.controller('UiSimbaController', ['$scope', 'FilterGroupCore',
    function ($scope, FilterGroupCore) {
        $scope.tableCount = 1312;
        var conf = $scope.filterOptions = {};

        conf.filterDefs = [
            {name: '所属BU', field: 'biz_line', canMultiSelect: true},
            {name: '数据类目', field: 'category', treeView: true},
            {name: '所属应用', field: 'app_guid'},
            {name: '责任人', field: 'owner_name'},
        ];

        conf.values = {
            biz_line: [
                {value: '1688事业部', count: 1},
                {value: 'CTO'},
                {value: 'OS事业群', count: 1321},
                {value: '共享业务事业部'}
            ],
            category: [
                {value: '公共中间层'},
                {value: '天猫'},
                {value: '蚂蚁金服'},
                {value: '其他'}
            ],
            app_guid: [
                {value: 'odps.abif'},
                {value: 'odps.ad_boss_sas'},
                {value: 'odps.ad_effect'},
                {value: 'odps.ad_nz_dw'},
                {value: 'odps.ad_p4p_dw'}
            ],
            owner_name: [
                {value: '谨书'},
                {value: '三要'},
                {value: '刘顺'}
            ],
        };

        conf.initialState = {
            biz_line: {value: '1688事业部'},
            category: {value: '公共中间层'},
        };

        conf.onchange = function (filterState) {
            console.log('state changed: + \n', filterState);
        };

        FilterGroupCore.changeState({
            biz_line: {value: '1688事业部'},
            category: ['天猫'],
        });
    }
]);
