/**
 * Created by bagjeongtae on 2017. 10. 19..
 */

var ClickCounterView = function(clickCounter, options){
    if(!clickCounter) throw new Error();
    if(!options.updateEl) throw new Error();

    const view =  {
        updateView(){
            options.updateEl.text(clickCounter.getCounter());
        },
        increseAndUpdateView(){
            clickCounter.increse();
            this.updateView();
        }
    };

    options.triggerEl.on('click', function(){
       view.increseAndUpdateView();
    });

    return view;
};