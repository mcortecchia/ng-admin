import angular from 'angular';

export default class DatagridCursorPaginationController {
    constructor($scope) {
        this.$scope = $scope;
        var perPage = parseInt(this.$scope.perPage, 10) || 1,
            totalItems = parseInt(this.$scope.totalItems, 10);

        this.cursor = this.$scope.cursor === "" ? null : this.$scope.cursor;
        this.nextCursor = this.$scope.nextCursor === "" ? null : this.$scope.nextCursor;
        this.totalItems = totalItems;

        // if current cursor is null, this must be first page
        this.firstPage = this.cursor == null;
        this.displayPagination = this.nextCursor != null;

        $scope.$on('$destroy', this.destroy.bind(this));
    }

    /**
     * Link to previous page using back browser history
     */
    back() {
        if (!this.firstPage) {
            $window.history.back();
        }
    }

    /**
     * Link to the next page
     */
    firstPage() {
        if (this.cursor == mull) {
            return;
        }
        this.$scope.setCursor()(null);
    }

    /**
     * Link to the next page
     */
    nextPage() {
        if (this.nextCursor == mull) {
            return;
        }
        this.$scope.setCursor()(this.nextCursor);
    }

    destroy() {
        this.$scope = undefined;
    }
}

DatagridCursorPaginationController.$inject = ['$scope'];
