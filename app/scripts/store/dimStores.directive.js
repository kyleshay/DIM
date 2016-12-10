(function() {
  'use strict';

  angular.module('dimApp')
    .directive('dimStores', Stores);

  function Stores() {
    return {
      controller: StoresCtrl,
      controllerAs: 'vm',
      bindToController: true,
      scope: {},
      link: Link,
      template: [
        '<div ng-if="vm.stores.length" ng-class="{ \'hide-filtered\': vm.settings.hideFilteredItems }">',
        '  <div class="store-row store-header">',
        '    <div class="store-cell" ng-repeat="store in vm.stores | sortStores:vm.settings.characterOrder track by store.id">',
        '      <dim-store-heading class="character" ng-class="{ current: store.current }" store-data="store"></dim-store-heading>',
        '    </div>',
        '  </div>',
        '  <div ng-repeat="(category, buckets) in ::vm.buckets.byCategory track by category" class="section" ng-class="::category | lowercase">',
        '    <div class="title">',
        '      <span class="collapse-handle" ng-click="vm.toggleSection(category)"><i class="fa collapse" ng-class="vm.settings.collapsedSections[category] ? \'fa-plus-square-o\': \'fa-minus-square-o\'"></i> <span translate="Bucket.{{::category}}"></span></span>',
        //     if the user has input a search query, display the amount of items that match the query
        '      <span ng-hide="vm.search.query === \'\'" class="filter-count">({{ vm.search.filterCounts[category] }} matching current filter)</span>',
        '      <span ng-if="::vm.vault.vaultCounts[category] !== undefined" class="bucket-count">{{ vm.vault.vaultCounts[category] }}/{{::vm.vault.capacityForItem({sort: category})}}</span>',
        '    </div>',
        '    <div class="store-row items" ng-if="!vm.settings.collapsedSections[category]" ng-repeat="bucket in ::buckets track by bucket.id" ng-repeat="bucket in ::buckets track by bucket.id"><i ng-click="vm.toggleSection(bucket.id)" class="fa collapse" ng-class="vm.settings.collapsedSections[bucket.id] ? \'fa-plus-square-o\': \'fa-minus-square-o\'"></i>',
        '      <div ng-if="!vm.settings.collapsedSections[bucket.id]" class="store-cell" ng-class="{ vault: store.isVault }" ng-repeat="store in vm.stores | sortStores:vm.settings.characterOrder track by store.id">',
        '        <dim-store-bucket ng-if="::!store.isVault || vm.vault.vaultCounts[category] !== undefined" store-data="store" bucket-items="store.buckets[bucket.id]" bucket="bucket"></dim-store-bucket>',
        '      </div>',
        '      <div ng-if="vm.settings.collapsedSections[bucket.id]" ng-click="vm.toggleSection(bucket.id)" class="store-text collapse"><span translate="Bucket.Show" translate-values="{ bucket: bucket.name }"></span></div>',
        '    </div>',
        '  </div>',
        '  <div class="title" ng-click="vm.toggleSection(\'Reputation\')">',
        '    <span><i class="fa collapse" ng-class="vm.settings.collapsedSections[\'Reputation\'] ? \'fa-plus-square-o\': \'fa-minus-square-o\'"></i> <span translate="Bucket.Reputation"></span></span>',
        '  </div>',
        '  <div class="store-row items reputation" ng-if="!vm.settings.collapsedSections[\'Reputation\']">',
        '    <div class="store-cell" ng-class="{ vault: store.isVault }" ng-repeat="store in vm.stores | sortStores:vm.settings.characterOrder track by store.id">',
        '      <dim-store-reputation store-data="store"></dim-store-reputation>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('')
    };

    function Link($scope) {
      function stickyHeader(e) {
        $(document.body).toggleClass('something-is-sticky', document.body.scrollTop !== 0);
      }

      $(document).on('scroll', stickyHeader);

      $scope.$on('$destroy', function() {
        $(document).off('scroll', stickyHeader);
      });
    }
  }

  StoresCtrl.$inject = ['dimSettingsService', '$scope', 'dimStoreService', 'dimPlatformService', 'loadingTracker', 'dimBucketService', 'dimInfoService', 'dimSearchService', '$translate'];

  function StoresCtrl(settings, $scope, dimStoreService, dimPlatformService, loadingTracker, dimBucketService, dimInfoService, dimSearchService, $translate) {
    var vm = this;
    const didYouKnowTemplate = `<p>${$translate.instant('DidYouKnow.Collapse')}</p>` +
                               `<p>${$translate.instant('DidYouKnow.Expand')}</p>`;
    // Only show this once per session
    const didYouKnow = _.once(() => {
      dimInfoService.show('collapsed', {
        title: $translate.instant('DidYouKnow'),
        body: didYouKnowTemplate,
        hide: $translate.instant('DidYouKnow.DontShowAgain')
      });
    });

    vm.settings = settings;
    vm.stores = dimStoreService.getStores();
    vm.vault = dimStoreService.getVault();
    vm.buckets = null;
    dimBucketService.then(function(buckets) {
      vm.buckets = angular.copy(buckets);
    });
    vm.search = dimSearchService;
    vm.toggleSection = function(id) {
      didYouKnow();
      vm.settings.collapsedSections[id] = !vm.settings.collapsedSections[id];
      vm.settings.save();
    };

    $scope.$on('dim-stores-updated', function(e, stores) {
      vm.stores = stores.stores;
      vm.vault = dimStoreService.getVault();
    });

    // Update the search service when a filter has been applied. We will need this to:
    //   A) see if there is an active filter (non-empty query string)
    //   B) populate the item count for each category
    $scope.$on('dim-filtered', function(e) {
      vm.search = dimSearchService;
    });

    if (!vm.stores.length && dimPlatformService.getActive()) {
      loadingTracker.addPromise(dimStoreService.reloadStores());
    }
  }
})();
