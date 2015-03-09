(function () {
  'use strict';

  angular.module('dimApp')
    .directive('dimStoreItems', StoreItems);

  function StoreItems() {
    return {
      bindToController: true,
      controller: StoreItemsCtrl,
      controllerAs: 'vm',
      replace: true,
      scope: {
        'store': '=storeData'
      },
      template: [
        '<div>',
          '<div class="items {{ vm.store.id }}" data-type="item" data-character="{{ vm.store.id }}">',
          '<div class="section weapons">',
            '<div class="title"><span ng-if="$parent.$index === 0 || vm.store.id === \'vault\'">Weapons</span><span class="bucket-count" ng-if="vm.store.id === \'vault\'">{{vm.store.bucketCounts.Weapons}}/20</span></div>',
            '<div class="sub-section sort-primary">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Primary\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Primary\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-special">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Special\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Special\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-heavy">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Heavy\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Heavy\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
          '</div>',
          '<div class="section armor">',
            '<div class="title"><span ng-if="$parent.$index === 0 || vm.store.id === \'vault\'">Armor</span><span class="bucket-count" ng-if="vm.store.id === \'vault\'">{{vm.store.bucketCounts.Armor}}/20</span></div>',
            '<div class="sub-section sort-helmet">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Helmet\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Helmet\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-gauntlets">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Gauntlets\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Gauntlets\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-chest">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Chest\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Chest\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-leg">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Leg\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Leg\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-classitem">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'ClassItem\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'ClassItem\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
          '</div>',
          '<div class="section general">',
            '<div class="title"><span ng-if="$parent.$index === 0 || vm.store.id === \'vault\'">General</span><span class="bucket-count" ng-if="vm.store.id === \'vault\'">{{vm.store.bucketCounts.General}}/20</span></div>',
            '<div class="sub-section sort-emblem">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Emblem\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Emblem\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-armor">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Armor\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Armor\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-ghost">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Ghost\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Ghost\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-ship">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Ship\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Ship\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-vehicle">',
              '<div class="equipped equippable" ng-if="vm.store.id !== \'vault\'">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Vehicle\' } | filter:{ equipped : true }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
              '<div class="unequipped equippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Vehicle\' } | filter:{ equipped : false }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-consumable">',
              '<div class="unequippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Consumable\' }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-material">',
              '<div class="unequippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Material\' }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
            '<div class="sub-section sort-currency">',
              '<div class="unequippable">',
                '<div ng-repeat="(key, item) in vm.store.items | filter:{ type : \'Currency\' }" dim-store-item store-data="vm.store" item-data="item"></div>',
              '</div>',
            '</div>',
          '</div>',
        '</div>'].join('')
    };

    function StoreItemsCtrl($scope) {
      var vm = this;
    }
  }
})();
