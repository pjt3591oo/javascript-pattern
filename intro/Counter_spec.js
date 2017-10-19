/**
 * Created by bagjeongtae on 2017. 10. 19..
 */
describe('ClickCounter 모듈', () => {
    var counter;

    beforeEach(() => {
        counter = ClickCounter();
    });
    describe('getCount()', () => {
        it('초기값이 0인 카운터 값을 반환', () => {
            expect(counter.getCounter()).toBe(0)
        });
    });

    describe('increse()', () => {
        it('카운터 값을 1만큼 증가', () => {
            const initalValue = counter.getCounter();
            counter.increse();
            expect(counter.getCounter()).toBe(initalValue + 1);
        })
    })
});