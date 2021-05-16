class FedEx {
  constructor () {}
  calculate(p) {
    return 'FedEx'
  }

}

// 전략2
class UPS {
  constructor () {}
  calculate (p) {
    return 'UPS'
  }
}

// 전략3
class USPS {
  constructor () {}
  calculate (p) {
    return 'USPS'
  }
}

// 전략관리 클래스
class Strategy {
  constructor () {
    this.company = null
  }

  setStrategy (company) {
    this.company = company;
  }

  calculate (p) {
    console.log('this.company')
    if (!this.company) {return}
    return this.company.calculate(p);
  }
}

// 사용
const fedex = new FedEx();
const ups = new UPS();
const usps = new USPS();

const p = { from: 'Alabama',to:'Georgia',weight:1.5};

const strategy = new Strategy();
strategy.setStrategy(fedex); // 런타임 환경에서 ups, usps를 전달할 수 있음
console.log(`Fedex: ${strategy.calculate(p)}`);  // Fedex: FedEx