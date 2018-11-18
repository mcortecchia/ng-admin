import angular from 'angular';

export default class DatagridCursorPaginationController {
    constructor($scope, $stateParams, $window) {
        this.$scope = $scope;
        this.$stateParams = $stateParams;
        this.$window = $window;
        var perPage = parseInt(this.$scope.perPage, 10) || 1,
            pageItems = parseInt(this.$scope.totalItems, 10),
            totalItems = 0;

        this.currentCursor = this.$scope.currentCursor === "" ? null : this.$scope.currentCursor;
        this.nextCursor = this.$scope.nextCursor === "" ? null : this.$scope.nextCursor;
        this.cursors = $stateParams.cursorHistory.cursors || [];

        this.cursors.forEach(cursor => {
            totalItems += cursor.count ? cursor.count : 0;
        });

        this.offsetBegin = 0;
        this.cursorPage = 1;
        for (var i in this.cursors) {
            if (this.cursors[i].cursor != this.currentCursor) {
                this.offsetBegin += this.cursors[i].count ? this.cursors[i].count : 0;
                this.cursorPage++;
            } else {
                break;
            }
        }
        this.offsetEnd = this.offsetBegin + pageItems;
        this.totalItemsDisplay = totalItems + (this.nextCursor != null ? "+" : "");

        // if there is only onepage (it's the first page, and there is no next cursor)
        this.displayPagination = !(this.currentCursor == null && this.nextCursor == null);
        this.pageItems = pageItems;
        this.totalItems = totalItems;
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

    /**
     * Link to the next page
     */
    setCursor(cursor) {
        if (cursor === undefined) {
            return;
        }
        this.$scope.setCursor()(cursor);
    }

    /**
     * Link to the next page
     */
    setCursorIndex(index) {
        if (index === undefined || index < 1 || index - 1 > this.cursors.length) {
            return;
        }
        
        const record = this.cursors[index - 1];
        this.$scope.setCursor()(record.cursor);
    }
    /**
     * Return an array with the range between min & max, useful for pagination
     *
     * @param {int} min
     * @param {int} max
     * @returns {Array}
     */
    range(cursorPage) {
        var input = [];
        
        for (let index = 0; index < this.cursors.length; index++) {
            const record = this.cursors[index];

            if (index < 2 ||
                index >= this.cursors.length - 2 || 
                Math.abs(cursorPage - index - 1) < 2) {
                input.push( '' + (index + 1));
            } else {
                if (input.length == 0 || input[input.length - 1] !== '.') {
                    input.push( '.' );
                }
            }
        };

        return input;
    }

    destroy() {
        this.$scope = undefined;
    }
}

DatagridCursorPaginationController.$inject = ['$scope', '$stateParams', '$window'];
