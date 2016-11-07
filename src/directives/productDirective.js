export default ($compile) => ({
    restrict: 'E',
    scope: {
        src: '=',
        quantity: '='
    },
    link: function (scope, element) {
        let imageElement = angular.element(`<div></div>`);
        imageElement.addClass('product-image');

        scope.$watch('quantity', () => {
            //console.log("quantity: ",scope.quantity);
            switch (scope.quantity) {
                case 3:
                    imageElement.css('background-image', `url("./resources/imgs/${scope.src}"), url("./resources/imgs/${scope.src}"), url("./resources/imgs/${scope.src}")`);
                    imageElement.css('background-position', 'bottom left, 20% 60%, 40% 30%');
                    break;
                case 2:
                    imageElement.css('background-image', `url("./resources/imgs/${scope.src}"), url("./resources/imgs/${scope.src}")`);
                    imageElement.css('background-position', 'bottom left, 20% 60%');
                    break;
                case 1:
                    imageElement.css('background-image', `url("./resources/imgs/${scope.src}")`);
                    imageElement.css('background-position', 'bottom left');
                    break;
                case 0:
                    imageElement.css('background-image', `none`);
                    break;
                default:
                    imageElement.css('background-image', `url("./resources/imgs/${scope.src}"), url("./resources/imgs/${scope.src}"), url("./resources/imgs/${scope.src}"), url("./resources/imgs/${scope.src}`);
                    imageElement.css('background-position', 'bottom left, 20% 60%, 40% 30%, 65% 0%');
            }
        });
        element.append(imageElement);
        $compile(imageElement)(scope);
    }
})