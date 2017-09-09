import _ from 'underscore';

/**
 * Rate perks on an item (based off of its attached user reviews).
 *
 * @class PerkRater
 */
class PerkRater {
  /**
   * Rate the perks on an item based off of its attached user reviews.
   *
   * @param {any} item
   * @memberof PerkRater
   */
  ratePerks(item) {
    console.log(item);

    if ((!item.writtenReviews) ||
        (!item.writtenReviews.length)) {
      return null;
    }

    const selectedPerksAndRatings = _.map(item.writtenReviews, (review) => { this._getSelectedPerksAndRating(review); });

    const maxColumn = this._getMaxColumn(item);
    console.log(maxColumn);

    for (let i = 1; i < maxColumn; i++) {
      const perksInColumn = this._getNodesInColumn(item, i);

      console.log(perksInColumn);
    }

    console.log(selectedPerksAndRatings);

    const availablePerks = item.talentGrid.dtrRoll.replace('o', '').split(';');

    _.each(availablePerks, (availablePerk) => { this._getPerkRatingAndReviewCount(availablePerk, item.reviews); });

    const matchingReviews = this._getMatchingReviews(item);

    return matchingReviews.length;
  }

  _getMaxColumn(item) {
    return _.max(item.talentGrid.nodes, (node) => { return node.column; }).column;
  }

  _getNodesInColumn(item,
                    column) {
    const nodesInColumn = _.where(item.talentGrid.nodes, (node) => { return node.column === column; });
    return _.map(nodesInColumn, (nodeInColumn) => nodeInColumn.roll);
  }

  _getPerkRatingAndReviewCount(perk,
                               reviews) {
    const matchingReviews = this._getMatchingReviews(perk, reviews);

    console.log(reviews.length, matchingReviews.length);

    const ratingCount = matchingReviews.length;
    const averageReview = matchingReviews.reduce((memo, num) => memo + num, 0) / matchingReviews.length || 1;

    const ratingAndReview = {
      ratingCount: ratingCount,
      averageReview: averageReview
    };

    console.log(perk, ratingAndReview);

    return ratingAndReview;
  }

  _getSelectedPerksAndRating(review) {
    const selectedPerks = this._getSelectedPerks(review);

    return {
      selectedPerks: selectedPerks,
      rating: review.rating,
      isHighlighted: review.isHighlighted
    };
  }

  _getMatchingReviews(perk,
                      reviews) {
    return _.filter(reviews, (review) => { return this._allSelectedPerksApply(perk, review); });
  }

  _allSelectedPerksApply(perk,
                         review) {
    const reviewSelectedPerks = this._getSelectedPerks(review);

    return _.every(reviewSelectedPerks, (reviewSelectedPerk) => { return _.contains(perk, reviewSelectedPerk); });
  }

  _getSelectedPerks(review) {
    const allSelectedPerks = _.where(review.roll.split(';'), ((str) => { return str.indexOf('o') > -1; }));

    return _.select(allSelectedPerks, (selectedPerk) => { selectedPerk.replace('o', ''); });
  }
}

export { PerkRater };
