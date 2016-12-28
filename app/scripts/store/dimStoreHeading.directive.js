(function() {
  'use strict';

  angular.module('dimApp')
    .directive('dimStoreHeading', StoreHeading);

  function StoreHeading() {
    return {
      controller: StoreHeadingCtrl,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        store: '=storeData'
      },
      restrict: 'E',
      templateUrl: 'scripts/store/dimStoreHeading.directive.html'
    };
  }

  StoreHeadingCtrl.$inject = ['$scope', 'ngDialog'];

  function StoreHeadingCtrl($scope, ngDialog) {
    var vm = this;
    var dialogResult = null;

    function getLevelBar() {
      if (vm.store.percentToNextLevel) {
        return vm.store.percentToNextLevel;
      }
      if (vm.store.progression && vm.store.progression.progressions) {
        var prestige = _.findWhere(vm.store.progression.progressions, {
          progressionHash: 2030054750
        });
        vm.xpTillMote = 'Prestige level: ' + prestige.level + '\n' +
          (prestige.nextLevelAt - prestige.progressToNextLevel) +
          'xp until 5 motes of light';
        return prestige.progressToNextLevel / prestige.nextLevelAt;
      }
      return 0;
    }

    $scope.$watch([
      'store.percentToNextLevel',
      'store.progression.progressions'
    ], function() {
      vm.levelBar = getLevelBar();
    });

    vm.openLoadoutPopup = function openLoadoutPopup(e) {
      e.stopPropagation();

      if (dialogResult === null) {
        ngDialog.closeAll();

        dialogResult = ngDialog.open({
          template: 'scripts/store/dimStoreHeading.directive-2.html',
          appendTo: 'div[loadout-id="' + vm.store.id + '"]',
          overlay: false,
          className: 'loadout-popup',
          showClose: false,
          scope: $scope
        });

        dialogResult.closePromise.then(function() {
          dialogResult = null;
        });
      } else {
        dialogResult.close();
      }
    };
  }
})();
