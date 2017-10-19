# 시작하기 전에...

책을 시작하기 전에 책에서 사용하는 자스민을 어떤식으로 이용하여 테스트 코드를 작성할 수 있는지 봐보자.


## 자스민 사용방법


* 테스트 러너파일 작성

  테스트 러너란 자스민 코드와 소스파일, 스펙을 참조하는 html 파일
    
    
**`app_spec.html`**

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 재스민 라이브러리 파일 -->
    <link data-require="jasmine@*" data-semver="2.0.0" rel="stylesheet" href="http://cdn.jsdelivr.net/jasmine/2.0.0/jasmine.css" />
    <script data-require="jasmine@*" data-semver="2.0.0" src="http://cdn.jsdelivr.net/jasmine/2.0.0/jasmine.js"></script>
    <script data-require="jasmine@*" data-semver="2.0.0" src="http://cdn.jsdelivr.net/jasmine/2.0.0/jasmine-html.js"></script>
    <script data-require="jasmine@*" data-semver="2.0.0" src="http://cdn.jsdelivr.net/jasmine/2.0.0/boot.js"></script>

    <!-- 테스트 대상 코드 -->
    <script src="Counter.js"></script>

    <!-- 단위 테스트 -->
    <script src="app_test.js"></script>
  </head>
</html>
```

> 테스트 코드를 작성하기 전에 첫째로 js 파일을 UI에서 완전히 분리하여 작성하는 것이 중요하다. 


## 모듈패턴

테스트 코드가 가능한 코드를 작성하기 위해서는 **모듈패턴**을 사용하도록 합니다. 모듈패턴이란? 함수로 데이터를 감추고, 모듈 API를 담고있는 객체를 반환하는 형태다. 모듈패턴은 자바스크립트에서 가장 많이 사용하는 패턴입니다. 두 가지 형태로 모듈패턴을 사용할 수 있습니다. 

첫 번째는 호출하는 방식으로 사용합니다. 두 번째는 즉시 실행 함수 기반으로 사용할 수 있습니다. 여기서 즉시 실행 함수를 **IIFE(Immediately Invoked Function Expression)**라고 합니다.

모듈 패턴 코드를 어떤식으로 작성할 수 있는지 간단하게 확인해보겠습니다.

```javascript
// 공간생성
let App = App || {};

// 생성된 공간에 함수를 추가한다. 인자로 함수를 넘긴다.( == 의존성 있는 함수를 주입)
App.Person = function(God){
    let name = God.makeName();

    // API 노출
    return {
        getName: function(){return name;},
        setName: function(newName){name = newName;}
    }
};
```

App 변수를 생성합니다.

생선된 변수에 Person() 함수를 만듭니다. person() 함수는 첫 번째 인자로 함수를 전달받습니다.

return을 이용하여 객체를 반환합니다. 반환되는 객체를 API라고 표현할 수 있고, API를 이용하여 해당 기능을 사용합니다.

이렇게 만든 모듈 패턴은 다음과 같이 사용할 수 있습니다.

```javascript
const person = App.Person(God);
person.getName()
```

God() 이라는 함수가 있다고 가정을 하고 인자로 넘깁니다. God()에서 makeName()을 호출하여 이름을 만듭니다. 만들어진 이름을 getName()을 호출하여 가져올 수 있습니다. 반대로 setName()을 이용하면 이름을 바꿀수 있습니다.

이 방식은 모듈패턴을 사용하는 첫 번째 방식입니다. App을 호출하여 사용하고 있습니다. 두 번째 방식인 즉시 실행 함수(IFF)를 이용하는 방법은 다음과 같이 코드를 작성할 수 있습니다.

```javascript
let App = App || {};

App.Person = (function(){
    var name = '';

    return{
        getName: function(God){
            name = name || God.makeName();
            return name
        },
        setName: function(newName){
            name = newName;
        }
    }
})();

App.Person.getName(God)
```

이렇게 즉시 실행이 가능한 형태로 작성하면, 앞의 방식처럼 호출을 하지 않아도 실행과 동시에 호출이 됩니다. 호출을 하지 않았지만 실행이 됬기 때문에 App은 바로 사용가능 합니다. 이렇게 생성된 App은 **싱글톤 인스턴스**가 됩니다.

* 모듈 생성 원칙

1. 단일 책임 원칙에 따라 모듈은 한 가지 역할만 한다.
2. 모듈 자신이 사용할 객체가 있다면 의존성 주입 형태로 제공한다.

이 두가지 원칙은 테스트를 좀더 편하게 할 수 있도록 도와줍니다.


## 자스민을 사용하여 테스트할 시나리오 - 1

웹 페이지에서 가장 많이사용하는 클릭 이벤트를 통해 발생되는 데이터를 다루는 모듈을 테스트 합니다.

counter 변수를 ClickCounter안에서 관리.

* 첫 번째 스펙

ClickCounter 모듈의 getCounter 함수는 카운터 값을 반환.

Counter_spec.js에 해당 스펙에 대한 내용을 작성한다.

**`Counter_spec.js`**

```javascript
describe('ClickCounter 모듈', () => {
    describe('getCount()', () => {
        it('초기값이 0인 카운터 값을 반환', () => {
            const counter = ClickCounter();
            expect(counter.getCounter()).toBe(0)
        });
    });
});
```

테스트 러너 파일인 **app_spec.html**을 실행시키면, 1 spec, 1 failure가 뜰 입니다. app_spec.js에서 getCounter로 가져온 값이 0이 맞는지 검사를 하고 있기 때문에 해당 테스트가 통과할 수 있도록 app.js에 코드를 작성합니다.

**`Counter.js`**

```javascript
var ClickCounter = function() {
    return {
        getCounter(){
            return 0;
        }
    }
};
```

테스트 러너파일을 실행하면 테스트를 성공적으로 마칩니다. 하지만 ClickCounter는 항상 0을 반환합니다. 코드를 다음과 같이 수정합니다. 다시 테스트 러너 파일을 실행하여 테스트의 결과를 확인합니다. 성공적으로 테스트를 마쳤다고 녹색으로 표시될 것입니다.

ClickCounter의 첫 번째 스펙을 확인하는 코드를 작성해봤습니다. 여기서 중요한점은 **Red - Green - Refactor** 단계로 테스트 코드를 작성한다는 것입니다. 

1. Red는 어떤 테스트를 할지 스펙을 정하는 단계가 됩니다.
2. Green는 해당 스펙이 통과 가능할 정도의 코드만 작성합니다.
3. Refactor은 해당 코드의 보안 개선합니다. Refactor 과정에서는 테스트 러너 파일을 실행하면서 실수없이 진행하고 있는지 확인하면서 작성이 가능합니다.

첫 번째 스펙을 테스트 했으니 두 번째 스펙을 정의한 후 테스트 합니다.

* 두 번째 스펙

ClickCounter 모듈의 increse()는 counter 값을 1 증가한다.

**`Counter_spec.js`**

```javascript
describe('ClickCounter 모듈', () => {
    describe('getCount()', () => {
        it('초기값이 0인 카운터 값을 반환', () => {
            const counter = ClickCounter();
            expect(counter.getCounter()).toBe(0)
        });
    });

    describe('increse()', () => {
        it('카운터 값을 1만큼 증가', () => {
            const counter = ClickCounter();
            counter.increse();
            expect(counter.getCounter()).toBe(1);
        })
    })
});
```

describe를 추가하여 다음 스펙을 정의합니다. 테스트 러너 파일을 실행하면, 2 specs, 1 failure와 함께 적색 표시가 됩니다. 구현할 기능에 대해서 정의를 했으니 기능을 구현합니다.

**`Counter.js`**

```javascript
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
```

다시 테스트 러너 파일을 실행하면 2개의 스펙이 성공했다고 녹색으로 표시를 합니다. 

테스트 코드 파일인 Counter_spec.js 코드를 보면 코드에서 '구린내가 난다', '더럽다'라고 표현합니다. 프로그램을 만들때 첫번째 원칙중 하나는 반복되는 코드는 분리입니다. 테스트 코드를 보면 ClickCounter() 모듈을 생성하는 코드가 반복합니다. 

우리는 로직을 담고 있는 Counter.js 파일뿐 아니라 테스트 코드인 Counter_spec.js도 리펙토링을 같이 진행을 합니다.

it 함수 호출 전, 후에 실행되는 **befoeEach()**와 **afterEach()**를 이용하여 중복되는 코드를 제거할 수 있습니다.

**`Counter_spec.js`**

```javascipt
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
            counter.increse();
            expect(counter.getCounter()).toBe(1);
        })
    })
});
```

beforeEach() 함수는 자스민에서 지원하는 함수 중 하나이며, 각각의 스펙을 테스트 하기전에 실행되는 함수입니다.

테스트 코드를 보면 '카운터 값을 1만큼 증가' 하는 부분에서 increse() 함수를 호출하면 반드시 1이 될지 고려해야 합니다. 우선 값의 초기값에 따라 increse()후의 counter 값은 달라지기 때문에 수정이 필요합니다.

**`Counter_spec.js`**

```javascript
describe('increse()', () => {
    it('카운터 값을 1만큼 증가', () => {
        const initalValue = counter.getCounter();
        counter.increse();
        expect(counter.getCounter()).toBe(initalValue + 1);
    })
})
```

getCounter()로 가져온 카운터 값과 increse() 호출된 값을 비교하여 검사합니다. 테스트 러너 파일을 실행하면 테스트 결과를 녹색으로 띄워줍니다. 

## 자스민을 사용하여 테스트할 시나리오 - 2

지금까지 카운터 모듈을 통해서 카운터 변수를 관리하는 모듈을 테스트했습니다. 카운터 모듈을 통해 관리하는 카운터 값을 돔에 반영하기 위한 테스트 합니다. 돔에 반영하기 위해 ClickCountView 모듈을 만들것이며 이 모듈은 데이터를 출력, 이벤트 핸들러 바인딩하는 일을 담당합니다.

새로운 모듈을 생성하기 위해 필요한 파일 생성과 테스트 러너 파일을 수정합니다.

ClickCountView 모듈을 만들고 테스트 할 2개의 파일을 생성합니다. **CounterView.js**, **CounterView_spen.js**을 생성한 후 테스트 러너 파일을 수정합니다.

**`app_spec.html`**

```html
<!DOCTYPE html>
<html>
  <head>
    <!-- 재스민 라이브러리 파일 -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link data-require="jasmine@*" data-semver="2.0.0" rel="stylesheet" href="http://cdn.jsdelivr.net/jasmine/2.0.0/jasmine.css" />
    <script data-require="jasmine@*" data-semver="2.0.0" src="http://cdn.jsdelivr.net/jasmine/2.0.0/jasmine.js"></script>
    <script data-require="jasmine@*" data-semver="2.0.0" src="http://cdn.jsdelivr.net/jasmine/2.0.0/jasmine-html.js"></script>
    <script data-require="jasmine@*" data-semver="2.0.0" src="http://cdn.jsdelivr.net/jasmine/2.0.0/boot.js"></script>

    <!-- 테스트 대상 코드 -->
    <script src="Counter.js"></script>
    <script src="CounterView.js"></script>

    <!-- 단위 테스트 -->
    <script src="Counter_spec.js"></script>
    <script src="CounterView_spec.js"></script>
  </head>
</html>
```

모듈 파일을 생성했으니, 테스트 대상 코드와 테스트 코드를 추가합니다.

* 첫 번째 스펙

ClickCountView 모듈의 updateView()는 카운트 값을 출력한다.

**`CounterView_spec.js`**

```javascript
describe('ClickCountView 모듈', () => {
    describe('updateView()', () => {
        it('ClickCounter의 getCounter() 값을 출력', () =>{

        })
    })
});
```

이번에도 앞의 첫 번째 시나리오에서 하듯이 테스트 코드에 스펙을 먼저 작성을 합니다. 그런데 여기서 2가지의 문제가 있습니다. 

1. 데이터를 조회할 ClickCounter를 얻는 방법.
2. 데이터를 출력할 돔 엘리먼트를 테스트하는 방법.

이 두가지를 해결하는 방법이 **`주입`** 입니다.

1. ClickCounter는 객체를 만들어 파라미터로 전달.
2. 데이터를 출력할 돔 엘리멘트도 만들어 파라미터로 전달.

이렇게 하면 단일 책임 원칙을 지킬 수 있습니다.

```javascript
describe('ClickCountView 모듈', () => {

    var updateEl;
    var clickCounter;
    var view;

    beforeEach(() => {
        updateEl = $('<span></span>');
        clickCounter = ClickCounter();
        view = ClickCounterView(clickCounter, updateEl);
    });

    describe('updateView()', () => {
        it('ClickCounter의 getCounter() 값을 출력', () =>{
            const counterValue = clickCounter.getCounter().toString();
            view.updateView();
            expect(updateEl.text()).toBe(counterValue);
        })
    })
});
```

테스트 러너 파일을 실행하면 3개의 스펙중 하나가 실해했다고 적색표시가 됩니다.

코드가 갑자기 길어졌습니다. 하지만 한 줄씩 해석하면 어렵지 않습니다.

updateEl, ClickCounter, view 3개의 변수가 있습니다. updateEl은 값이 출력될 돔이 저장되는 변수이고, ClickCounter 변수는 앞에서 만든 카운터 모듈을 저장하는 변수입니다. view는 이번에 만들어질 카운터 모듈의 데이터를 돔에 출력하는 모듈입니다.

CounterView 모듈은 2개의 인자를 받습니다. 카운터와 돔을 받습니다.

it 함수를 살펴보면 카운터 모듈에서 카운터 값을 가져온 후 counterView 모듈의 updateView() 함수를 호출합니다. 다음으로 updateEl의 값과 카운터 값을 비교합니다. 여기서 $는 제이쿼리를 의미함며 .text()는 태그의 값을 가져오는 jquery의 함수입니다.

스펙을 정의 했으니 해당 스펙의 테스트 결과가 성공할 수 있도록 카운터뷰 모듈 기능을 추가합니다.

**`CounterView.js`**

```javascript
var ClickCounterView = function(clickCounter, updateEl){
    return {
        updateView(){
            updateEl.text(clickCounter.getCounter());
        }
    }
}
```

카운터뷰 모듈의 구현을 마쳤습니다. 테스트 러너 파일을 실행하면 테스트 결과가 녹색으로 뜹니다. 

첫 번째 스펙을 마치기 전에 추가적으로 테스트를 저 해줍니다.

이렇게 작성된 코드는 그냥 기능만 구현한 겁니다. 하지만 우리는 수 많은 예외를 생각하고 처리를 해야합니다. 수 많은 예외중 간단하게 생각할 수 있는것이 인자를 잘 전달 받았는지 테스트 하는겁니다. 이것을 의존성 주입 테스트라고 합니다. 쉽게 말하면 필요한 모듈을 넘겨 주지 않았을때 처리를 하는 코드를 작성하면 됩니다.

코드를 작성하기 먼저 CounterView_spec에 어떤 기능을 테스트할지 작성합니다.

**`CounterView_spec.js`**

```javascript
describe('ClickCountView 모듈', () => {

    var updateEl;
    var clickCounter;
    var view;

    beforeEach(() => {
        updateEl = $('<span></span>');
        clickCounter = ClickCounter();
        view = ClickCounterView(clickCounter, updateEl);
    });

    describe('updateView()', () => {
        it('ClickCounter의 getCounter() 값을 출력', () =>{
            const counterValue = clickCounter.getCounter().toString();
            view.updateView();
            expect(updateEl.text()).toBe(counterValue);
        });

        it('ClickCounter를 주입하지 않으면 에러를 던짐', () => {

        });
        it('updateEl를 주입하지 않으면 에러를 던짐', () => {

        });
    });
});
```

스펙을 정의하다보니 의문이 생깁니다. 에러를 어떻게 확인할 수 있을까?

```javascript
expect(function() { throw new Error()}).toThrowError()
```

toThrowError() 함수를 이용하여 에러를 확인할 수 있습니다.

```javascript
it('ClickCounter를 주입하지 않으면 에러를 던짐', () => {
    const updateEl = $('<span></span>');
    const actual = () => ClickCounterView(null, updateEl);

    expect(actual).toThrowError();
});
```

첫 번째 인자인 카운터에 null값을 넣습니다. 그리고 에러가 발생하는지 확인하는 코드를 작성합니다. 테스트 러너 파일을 실행하면 테스트 결과는 실패가 되고 적색표시가 됩니다.

**`CounterView.js`**

```javascript
var ClickCounterView = function(clickCounter, updateEl){
    if(!clickCounter) throw new Error();
    return {
        updateView(){
            updateEl.text(clickCounter.getCounter());
        }
    }
};
```

카운터뷰 모듈은 첫 번째 인자를 검사한 후 에러를 발생시킵니다.

테스트 러너 파일을 실행하면 테스트 결과가 성공적으로 마치고 녹색표시를 띄워줍니다.

똑같은 방법으로 두번째 인자의 주입을 확인할 수 있습니다.

**`CounterView_spec.js`**

```javascript```
it('updateEl를 주입하지 않으면 에러를 던짐', () => {
    const clickCounter = ClickCounter();
    const actual = () => ClickCounterView(clickCounter, null);

    expect(actual).toThrowError();
});
```

**`CounterView.js`**

```javascript
var ClickCounterView = function(clickCounter, updateEl){
    if(!clickCounter) throw new Error();
    if(!updateEl) throw new Error();
    
    return {
        updateView(){
            updateEl.text(clickCounter.getCounter());
        }
    }
};
```

첫 번째 스펙 테스트를 마쳤습니다. 

* 두 번째 스펙

카운트뷰 모듈의 increseAndUpdateView()는 카운트 값을 증가하고 그 값을 출력한다.

카운터의 increse() 함수 실행 -> updateView 함수 실행

**`CounterView_spec.js`**

```javascript
describe('increaseAndUpdateView()', () => {
    it('ClickCounter의 increse를 실행', () => {
		    view.increseAndUpdateView();
    });

    it('updateView를 실행', () => {

    });
})
```

스펙과 해당 스펙의 테스트 케이스 정의를 했습니다. 카운트뷰 모듈인 view에서 increseAndUpdateView() 함수를 호출합니다. 해당 함수는 카운터 모듈의 카운터를 증가하는 함수를 호출합니다. 하지만 해당 테스트 코드에서 카운터를 증가하는 함수인 clickCounter.increase()함수가 호출된 것을 어떻게 검증할 수 있을까요?

이럴때는 테스트 더블을 사용합니다. 자스민에서 테스트 더블을 스파이스(spies)이라고 부릅니다. 테스트 더블이란 단위 테스트 패턴으로, 테스트하기 곤란한 컴포넌트를 대체하여 테스트하는 것을 의미합니다. 특정한 동작을 흉내만 낼뿐이지만 테스트 하기에는 적합합니다. 다음 5가지를 통칭하여 테스트 더블이라고 합니다.

1. 더미 : 인자를 채우기 위해 사용
2. 스텁 : 더비를 개선하여 실제 동작하게끔 만든 것. 리턴값을 하드 코딩한다
3. 스파이 : 스텁과 유가. 내부적으로 기록을 남기는 추가기능
4. 페이크 : 스텁에서 발전한 실제 코드. 운영에서는 사용할수 없음
5. 목 : 더미, 스텁, 스파이를 혼합한 형태

**`CounterView_spec.js`**

```javascript
describe('increaseAndUpdateView()', () => {
    it('ClickCounter의 increse를 실행', () => {
        spyOn(clickCounter, 'increse');
        view.increseAndUpdateView();
        expect(clickCounter.increse).toHaveBeenCalled();
    });

    it('updateView를 실행', () => {

    });
})
```

spyOn으로 모듈과 감시할 함수를 등록합니다. 테스트 러너 파일을 실행하면 실패하여 적색표시가 됩니다.

**`CounterView.js`**

```javascript
var ClickCounterView = function(clickCounter, updateEl){
    if(!clickCounter) throw new Error();
    if(!updateEl) throw new Error();

    return {
        updateView(){
            updateEl.text(clickCounter.getCounter());
        },
        increseAndUpdateView(){
            clickCounter.increse();
        }
    }
};
```

increseAndUpdateView() 함수를 만들어 준 후 increse() 호출을 합니다. 다시 테스트 러너 파일을 실행하면 성공적으로 테스트를 마칩니다.

다음 테스트 케이스를 테스트 합니다.

**`CounterView_spec.js`**

```javascript
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
})
```

이번에는 카운터뷰 모듈에서 updateView가 호출됬는지 확인합니다. increseAndUpdateView()는 clickCounter.increse()만 호출하고 있기 때문에 해당 테스트 케이스는 실패했다고 적색표시를 합니다.

**`CounterView.js`**

```javascript
var ClickCounterView = function(clickCounter, updateEl){
    if(!clickCounter) throw new Error();
    if(!updateEl) throw new Error();

    return {
        updateView(){
            updateEl.text(clickCounter.getCounter());
        },
        increseAndUpdateView(){
            clickCounter.increse();
            this.updateView();
        }
    }
};
```

increseAndUpdateView()에서 increse()와 updateView()를 호출하여 성공적으로 테스트가 될 수 있도록 수정했습니다. 테스트 러너 파일을 실행하면 테스트가 성공적으로 마치고 녹색표시가 됩니다.

* 세 번째 스펙

세 번째 스펙은 클릭 이벤트가 발생하면 increseAndUpdateview를 실행한다.

**`CounterView_spec.js`**

```javascript
describe('ClickCountView 모듈', () => {
	. . . 중 략 . . .
	describe('ClickCountView 모듈', ()=>{
	        it('클릭 이벤트가 발생하면 increseAndUpdateView를 실행한다', () => {
	
	        });
	    });
	});
});
```

클릭 이벤트가 발생되면 increseAndUpdateView()가 실행되는지에 대한 테스트 케이스 입니다. 

```javascript
spyOn(view, 'increseAndUpdateView');

// 이벤트 발생
// 핸들러 바인딩

expect(view.increseAndUpdateView).toHaveBeenCalled();
```
spyOn을 이용하여 increseAndUpdateView가 호출되는지 확인할 수 있습니다. 그러나 클릭 이벤트의 발생과 어디에 핸들러를 바인징 해야하는지에 대한 의문이 있습니다.

카운터 모듈에 값을 출력할 돔 엘리먼트 인 updateEl 변수를 주입한 것처럼, 클릭 이벤트 핸들러(increseAndUpdateView)를 바인딩할 돔 엘리먼트를 주입을 받으면 됩니다.

**`CounterView_spec.js`**

```javascript
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
    
    . . .  중 략 . . .
    
    describe('ClickCountView 모듈', ()=>{
        it('클릭 이벤트가 발생하면 increseAndUpdateView를 실행한다', () => {
            spyOn(view, 'increseAndUpdateView');
            triggerEl.trigger('click');
            expect(view.increseAndUpdateView).toHaveBeenCalled();
        });
    });
});
```

카운터 뷰에 인자를 전달하는 방법이 바뀌었습니다. 테스트 러너를 실행하니 많은 에러가 발생합니다. 차근차근 고치면 됩니다.

**`CounterView.js`**

```javascript
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
```

options은 updateEl과 triggerEl을 객체로 받는 인자입니다. updateEl과 triggerEl을 사용하기 위해서는 options.updateEl, options.triggerEl의 형태로 사용할 수 있습니다.

테스트 러너 파일을 실행하면 모든 테스트가 성공적으로 끝났기 때문에 녹색이 표시됩니다.

## 화면에 붙여보자.

지금까지 작성한 코드를 실제 웹 페이지에 넣어서 확인을 합니다.

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"></script>

</head>
<body>
    <span id="counter-display">0</span>
    <button id="btn-increse">increse</button>

    <script src="Counter.js"></script>
    <script src="CounterView.js"></script>
    <script>
        (function(){
            const clickCounter = ClickCounter();
            const updateEl = $('#counter-display');
            const triggerEl = $('#btn-increse');

            const view = ClickCounterView(clickCounter, {updateEl, triggerEl})
            view.updateView();
        })();
    </script>
</body>
</html>
```

이제 해당 파일을 실행한 후 버튼을 클릭하면 수치가 1씩 증가 됩니다.

## 정리

보다 효율적인 테스트 코드를 작성하려면...

1. 단일 책임 원칙을 지킨다(역할에 따라 데이터와 뷰를 분리하여 ClickCounter, ClickCountView 구현)
2. 모듈 단위로 개발한다
3. 뷰 모듈은 돔을 캡슐화 해야한다.

여기서 사용한 자스민 API

1. describe / it/ beforeEach
2. expect / toBe / toThrow
3. spyOn / toHaveBeenCalled

추가적인 자스민 API

1. toEqual / toContain
2. TobeLessThan / toBeGreaterThen
3. jasmine.createSpy / toHaveBeenCalledWith / toHaveBeenCalledTimes