# State Pattern (상태패턴)

state pattern은 상태에 따른 액션을 효율적으로 관리하기 위한 패턴.


## 기존 코드의 단점 및 한계점

 프로그램을 구성하다 보면  상태에 따라 서로다른 동작을 구현하는 경우가 많습니다. 
이러한 경우 가장 쉽게 생각할 수 있는 방법은 if, switch문을 이용하여 상태에 따라 분기하여 특정 로직을 실행합니다.

 간단한 코드로 상태패턴의 필요성을 알아보겠습니다.

```javascript
// app.js

class Light {
	constructor () {
		this.state = true;
  }

	buttonPress () {
		console.log(`${this.state ? ‘on’: ‘off’}`);
		this.state = !this.state;
	}
}

let light = new Light()
light.buttonPress()
light.buttonPress()
light.buttonPress()
light.buttonPress()
```

 해당 예시코드는 하나의 버튼을 이용하여 불을 껐다/켰다하는 코드입니다.
 
 state 변수를 toggle(토글)하는 buttonPress를 호출하여 불을 껐다켰다 할 수 있습니다.
해당 코드는 상태가 true/false만 가지고 있기 때문에 `not` 비트연산을 이용하여 간단하게 토글을 구현할 수 있지만 3개 이상의 상태를 가진다면 `if/switch`가 늘어납니다.

 앞의 코드에서 `on/off`의 상태에서 `sleep` 모드를 추가해보겠습니다.

```javascript
// app.js

class Light {
	constructor () {
		Light.OFF = 1;
		Light.ON = 2;
		Light.SLEEP = 3;
		this.state = Light.OFF
	}

	buttonPress () {
		if (this.state == Light.OFF) {
			console.log(‘전원을 킵니다.’)
			this.state = Light.ON
		} else if (this.state == Light.ON) {
			console.log(‘전원을 슬립모드로 변경합니다’)
			this.state = Light.SLEEP
		} else if (this.state == Light.SLEEP) {
			console.log(‘전원을 끕니다’)
			this.state = Light.OFF
		} else {
			console.log(‘알 수 없는 동작입니다. 전원을 OFF 합니다.’)
		}
	}
}

let light = new Light()

light.buttonPress()
light.buttonPress()
light.buttonPress()
light.buttonPress()
light.buttonPress()
light.buttonPress()
```

 buttonPress 메서드가 매우 복잡해집니다. 머 어찌저찌 해당 코드를 이용하여 프로젝트를 진행하던 중.... 지나가던 기획자가 `저.... 버튼 하나를 이용하여 전원을 제어하다보니 버튼을 계속 눌러야하는 점이 불편해서 상태에 따른 버튼을 독립적으로 만들어 주시면 좋을 것 같아요`라는 말을 했다고 치겠습니다. 

여기서 한가지 생각할 점은 각 상태에 따라서 다른 상태의 버튼또는 해당상태의 버튼을 누르면 다음과 같습니다.

```
OFF 상태일 때
	ON 버튼을 누를 때    : 동작 O
	OFF 버튼을 누를 때   : 동작 X 
	SLEEP 버튼을 누를 때 : 동작 X 

ON 상태일 때
	ON 버튼을 누를 때    : 동작 X
	OFF 버튼을 누를 때   : 동작 O 
	SLEEP 버튼을 누를 때 : 동작 O 

SLEEP 상태일 때
	ON 버튼을 누를 때    : 동작 O
	OFF 버튼을 누를 때   : 동작 O
	SLEEP 버튼을 누를 때 : 동작 X
```

조건이 상당히 많아집니다. 여기서 상태가 더 늘어난다면???? 생각하기도 싫습니다. 이러한 복잡한 상태를 좀 더 편하게 관리할 수 있는 패턴이 state pattern 입니다.

# 구현

상태패턴은 각 상태에 따라 클래스를 구현합니다. 단, 동일한 인터페이스를 가져야 합니다.

## UML

[image:2AB2E6B7-8ED2-4186-9A51-0AA60FC050AC-1650-000001A6BA7D856B/image.png]

## interface

interface는 상태가 동작할 기능들에 대한 기능리스트 입니다.

```javascript
// app.js

class StateInterface {
	on () {}
	off () {}
}
```

해당 인터페이스에서는 `on/off` 상태에 따른 기능만 정의해보겠습니다.

## state

state는 해당 상태에서의 실제 로직을 포함합니다.

```javascript
// app.js

class OnState extends StateInterface {
	getInstance () {
		return factory.ON
	}

	on (light) {
		light.setState(factory.ON.getInstance())
		console.log(‘동작하지 않음...’)
  }

	off (light) {
		light.setState(factory.OFF.getInstance())
		console.log(‘OFF’)
 	}
}

class OffState extends StateInterface {
	getInstance () {
		return factory.OFF
	}

	on (light) {
		light.setState(factory.ON.getInstance())
		console.log(‘on’)
	}

	off (light) {
		light.setState(factory.OFF.getInstance())
		console.log(‘동작하지 않음’)
	}
}	

const factory = {
	ON: new OnState(),
	OFF: new OffState()
}
```

 상태패턴에 대한 구현을 완료했습니다. 여기서 factory는 OnState와 OffState 객체를 싱글톤 형태로 사용하기 위함입니다. 굳이 factory 변수로 관리하지 않더라도 OnState와 OffState 내부에서도 구현가능합니다.

 해당 구현체를 이용하여 Light 클래스를 구현해보곘습니다.

## 활용

```javascript
// app.js

class Light {
	constructor () {
		this.state = factory.ON.getInstance()
	}

	setState (state) {
		this.state = state
	}

	onBtnPress () {
		this.state.on(this)
	}

	offBtnPress () {
		this.state.off(this)
	}
}

let light = new Light()

light.onBtnPress()
light.onBtnPress()
light.onBtnPress()

light.offBtnPress()
light.offBtnPress()

light.onBtnPress()
```

 Light 클래스는 StateInterface를 상속받는 OnState와 OffState 처럼 두 가지 이상의 상태 객체를 가질 수 있습니다.  해당 코드에서는 두 가지의 상태를 갖지만 기획에 따라 더 많은 상태를 가질 수 있게 됩니다.  

 코드는 늘어났지만 로직은 심플합니다. 상태객체는 분리한 상태의 액션을 추상화 했기 때문입니다.

 여기서 중요한 점은, 구현체인 Light 클래스의 `this.state`는 해당 객체의 상태를 의미합니다.  즉, 해당 객체의 상태에 따라 다른 상태 객체를 가지고 있습니다. 상태들이 인터페이스를 통일하는 이유는 어떤 상황에서도 메서드 호출이 가능하기 때문입니다. offBtnPress 버튼은 `on/off` 상태 모두(`light.onBtnPress()`, `light.offBtnPress()`) 호출 가능하고, 해당 기능은 호출된 상태객체의 메서드(`this.state.on(this)`, `this.state.off(this)`)에서 로직을 포함합니다. 호출된 메서드는 클래스 자체가 상태를 의미하기 때문에상태 정보를 별도로 저장하지 않습니다.

## 과제.
	 1. OnState, OffState를 factory 변수 형태로 하지 않고 singleton 형태로 바꿔보기
	 2. 크롤러를 상태패턴을 이용하여 구현해보기


--- 

## 과제해답

1. 상태객체에서 singleton 형태로 구현

```javascript
// singletonState.js

class StateInterface {
  on () {}
  off () {}
}

class OnState extends StateInterface {
  constructor() {
    super()
    this.stateName = 'ON'
  }
  
  static getInstance () {
    OnState.instance = OnState.instance ? OnState.instance : new OnState()
    return OnState.instance
  }

  on (light) {
    light.setState(OnState.getInstance())
    console.log('... 동작하지 않음')
  }

  off (light) {
    light.setState(OffState.getInstance())
    console.log('전원 off')
  }
}

class OffState extends StateInterface{
  
  constructor() {
    super()
    this.stateName = 'OFF'
  }
  
  static getInstance () {
    OffState.instance = OffState.instance ? OffState.instance : new OffState()
    return OffState.instance
  }

  on (light) {
    light.setState(OnState.getInstance())
    console.log('전원 on')
  }

  off (light) {
    light.setState(OffState.getInstance())
    console.log('... 동작하지 않음')
  }
}

class Light {
  constructor () {
    this.state = OffState.getInstance()
  }

  showState() {
    console.log(`current state: ${this.state.stateName} \n`)
  }

  setState (state) {
    this.state = state
  }

  onButtonPress () {
    this.state.on(this)
  }

  offButtonPress () {
    this.state.off(this)
  }
}

let l = new Light()
l.showState()

l.onButtonPress()
l.showState()

l.offButtonPress()
l.showState()

l.offButtonPress()
l.showState()

l.onButtonPress()
l.showState()

l.onButtonPress()
l.showState()

l.onButtonPress()
l.showState()
```