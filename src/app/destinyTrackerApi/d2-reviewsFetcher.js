import _ from 'underscore';
import { D2ItemTransformer } from './d2-itemTransformer';

/**
 * Get the community reviews from the DTR API for a specific item.
 *
 * @class D2ReviewsFetcher
 */
class D2ReviewsFetcher {
  constructor($q, $http, trackerErrorHandler, loadingTracker, reviewDataCache, userFilter) {
    this.$q = $q;
    this.$http = $http;
    this._itemTransformer = new D2ItemTransformer();
    this._trackerErrorHandler = trackerErrorHandler;
    this._loadingTracker = loadingTracker;
    this._reviewDataCache = reviewDataCache;
    this._userFilter = userFilter;
  }

  _getItemReviewsCall(item) {
    return {
      method: 'POST',
      url: 'https://db-api.destinytracker.com/api/external/reviews?page=1', // TODO: pagination
      data: item,
      dataType: 'json'
    };
  }

  _getItemReviewsPromise(item) {
    const postWeapon = this._itemTransformer.getRollAndPerks(item);

    const promise = this.$q
              .when(this._getItemReviewsCall(postWeapon))
              .then(this.$http)
              .then(this._trackerErrorHandler.handleErrors.bind(this._trackerErrorHandler), this._trackerErrorHandler.handleErrors.bind(this._trackerErrorHandler))
              .then((response) => { return response.data; });

    this._loadingTracker.addPromise(promise);

    return promise;
  }

  _getUserReview(reviewData) {
    return _.find(reviewData.reviews, { isReviewer: true });
  }

  _sortAndIgnoreReviews(item) {
    if (item.writtenReviews) {
      item.writtenReviews.sort(this._sortReviews);

      item.writtenReviews.forEach((writtenReview) => {
        writtenReview.isIgnored = this._userFilter.conditionallyIgnoreReview(writtenReview);
      });
    }
  }

  _attachReviews(item, reviewData) {
    const userReview = this._getUserReview(reviewData);

    // TODO: reviewData has two very different shapes depending on whether it's from cache or from the service
    item.totalReviews = reviewData.totalReviews === undefined ? reviewData.ratingCount : reviewData.totalReviews;
    item.writtenReviews = _.filter(reviewData.reviews, 'review');

    this._sortAndIgnoreReviews(item);

    if (userReview) {
      item.userRating = userReview.rating;
      item.userReview = userReview.review;
      item.userReviewPros = userReview.pros;
      item.userReviewCons = userReview.cons;
    }

    this._reviewDataCache.addReviewsData(item, reviewData);
  }

  _sortReviews(a, b) {
    if (a.isReviewer) {
      return -1;
    }

    if (b.isReviewer) {
      return 1;
    }

    if (a.isHighlighted) {
      return -1;
    }

    if (b.isHighlighted) {
      return 1;
    }

    const ratingDiff = b.rating - a.rating;

    if (ratingDiff !== 0) {
      return ratingDiff;
    }

    const aDate = new Date(a.timestamp);
    const bDate = new Date(b.timestamp);

    return bDate - aDate;
  }

  _attachCachedReviews(item,
                       cachedItem) {
    item.communityReviews = cachedItem.reviews;

    this._attachReviews(item, cachedItem);

    if (cachedItem.userRating) {
      item.userRating = cachedItem.userRating;
    }

    if (cachedItem.review) {
      item.userReview = cachedItem.review;
    }

    if (cachedItem.pros) {
      item.userReviewPros = cachedItem.pros;
    }

    if (cachedItem.cons) {
      item.userReviewCons = cachedItem.cons;
    }
  }

  /**
   * Get community (which may include the current user's) reviews for a given item and attach
   * them to the item.
   * Attempts to fetch data from the cache first.
   *
   * @param {any} item
   * @returns {void}
   *
   * @memberof ReviewsFetcher
   */
  getItemReviews(item) {
    if (!item.reviewable) {
      return;
    }
    const ratingData = this._reviewDataCache.getRatingData(item);

    if (ratingData && ratingData.reviewsDataFetched) {
      this._attachCachedReviews(item,
                               ratingData);

      return;
    }

    this._getItemReviewsPromise(item)
      .then((reviewData) => this._attachReviews(item,
                                                reviewData));
  }
}

export { D2ReviewsFetcher };
