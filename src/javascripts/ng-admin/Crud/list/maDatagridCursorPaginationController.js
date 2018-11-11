import angular from 'angular';

export default class DatagridCursorPaginationController {
    constructor($scope, $window) {
        this.$scope = $scope;
        this.$window = $window;
        var perPage = parseInt(this.$scope.perPage, 10) || 1,
            totalItems = parseInt(this.$scope.totalItems, 10);

        this.currentCursor = this.$scope.currentCursor === "" ? null : this.$scope.currentCursor;
        this.nextCursor = this.$scope.nextCursor === "" ? null : this.$scope.nextCursor;
        this.totalItems = totalItems;

        // if there is only onepage (it's the first page, and there is no next cursor)
        this.displayPagination = !(this.currentCursor == null && this.nextCursor == null);

        $scope.$on('$destroy', this.destroy.bind(this));
    }

    /**
     * Link to previous page using back browser history
     */
    back() {
        // if current cursor is null, this must be first page
        if (this.currentCursor != null) {
            this.$window.history.back();
        }
    }

    /**
     * Link to the next page
     */
    firstPage() {
        if (this.currentCursor == null) {
            return;
        }
        this.$scope.setCursor()(null);
    }

    /**
     * Link to the next page
     */
    nextPage() {
        if (this.nextCursor == null) {
            return;
        }
        this.$scope.setCursor()(this.nextCursor);
    }

    destroy() {
        this.$scope = undefined;
    }
}

DatagridCursorPaginationController.$inject = ['$scope', '$window'];
