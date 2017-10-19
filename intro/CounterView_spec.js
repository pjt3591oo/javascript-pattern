/**
 * Created by bagjeongtae on 2017. 10. 19..
 */
describe('ClickCountView 모듈', () => {

    var updateEl;
    var triggerEl;
    var clickCounter;
    var view;

    beforeEach(() => {
        updateEl = $('<span></span>');
        triggerEl = $('<button></button>');
        clickCounter = ClickCounter();
        view = ClickCounterView(clickCounter, {updateEl, triggerEl});
    });

    describe('updateView()', () => {
        it('ClickCounter의 getCounter() 값을 출력', () =>{
            const counterValue = clickCounter.getCounter().toString();
            view.updateView();
            expect(updateEl.text()).toBe(counterValue);
        });

        it('ClickCounter를 주입하지 않으면 에러를 던짐', () => {
            const updateEl = $('<span></span>');
            const actual = () => ClickCounterView(null, updateEl);

            expect(actual).toThrowError();
        });
        it('updateEl를 주입하지 않으면 에러를 던짐', () => {
            const clickCounter = ClickCounter();
            const actual = () => ClickCounterView(clickCounter, null);

            expect(actual).toThrowError();
        });
    });

    describe('increaseAndUpdateView()', () => {
        it('ClickCounter의 increse를 실행', () => {
            spyOn(clickCounter, 'increse');
            view.increseAndUpdateView();
            expect(clickCounter.increse).toHaveBeenCalled();
        });

        it('updateView를 실행', () => {
            spyOn(view, 'updateView');
            view.increseAndUpdateView();
            expect(view.updateView).toHaveBeenCalled();
        });
    });


    describe('ClickCountView 모듈', ()=>{
        it('클릭 이벤트가 발생하면 increseAndUpdateView를 실행한다', () => {
            spyOn(view, 'increseAndUpdateView');
            triggerEl.trigger('click');
            expect(view.increseAndUpdateView).toHaveBeenCalled();
        });
    });

});