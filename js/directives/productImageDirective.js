export default ($compile) => {
    return {
        restrict: 'E',
        scope: {
            src: '=',
            quantity: '='
        },
        link: function(scope, element) {
            let imageElement = angular.element(`<div></div>`);
            imageElement.css('height', '100px');
            imageElement.css('width', '100px');
            imageElement.css('background-repeat', 'no-repeat');
            
            switch(scope.quantity) {
                case 3:
                    imageElement.css('background-image', 'url("./resources/imgs/{{src}}"), url("./resources/imgs/{{src}}"), url("./resources/imgs/{{src}}")');
                    imageElement.css('background-position', 'bottom left, 20% 60%, 40% 30%');
                    imageElement.css('background-size', '65px 85px, 65px 85px, 65px 85px');
                    break;
                case 2:
                    imageElement.css('background-image', 'url("./resources/imgs/{{src}}"), url("./resources/imgs/{{src}}")');
                    imageElement.css('background-position', 'bottom left, 20% 60%');
                    imageElement.css('background-size', '65px 85px, 65px 85px');
                    break;
                case 1:
                    imageElement.css('background-image', 'url("./resources/imgs/{{src}}")');
                    imageElement.css('background-position', 'bottom left');
                    imageElement.css('background-size', '65px 85px');
                    break;
                case 0:
                    break;
                default:
                    imageElement.css('background-image', 'url("./resources/imgs/{{src}}"), url("./resources/imgs/{{src}}"), url("./resources/imgs/{{src}}"), url("./resources/imgs/{{src}}');
                    imageElement.css('background-position', 'bottom left, 20% 60%, 40% 30%, 65% 0%');
                    imageElement.css('background-size', '65px 85px, 65px 85px, 65px 85px, 65px 85px');
            }
            element.append(imageElement);
            $compile(imageElement)(scope);
        }
    }
}