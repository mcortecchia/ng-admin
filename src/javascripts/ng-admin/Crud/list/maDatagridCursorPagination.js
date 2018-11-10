import cursorpPaginationView from './maDatagridCursorPagination.html';
import DatagridCursorPaginationController from './maDatagridCursorPaginationController';

export default function maDatagridCursorPagination() {
    return {
        restrict: 'E',
        scope: {
            cursor: '@',
            nextCursor: '@',
            perPage: '@',
            totalItems: '@',
            setCursor: '&'
        },
        template: cursorpPaginationView,
        controllerAs: 'paginationCtrl',
        controller: DatagridCursorPaginationController
    };
}

maDatagridCursorPagination.$inject = [];
