/**
 * Created by bagjeongtae on 2017. 10. 19..
 */

var ClickCounter = function() {
    var counter = 0;
    return {
        getCounter(){
            return counter;
        },
        increse(){
            counter++;
        }
    }
};