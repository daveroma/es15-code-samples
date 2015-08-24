

// Static methods are often used to create utility functions for an application.

const rules = {
  dti: {
    fha: 0.42,
    conv: 0.36
  },
  downpayment: {
    min: {
      fha: 0.05,
      conv: 0.1
    }
  }
}

class DTICalc {
  constructor(d, i) {
    this.debt = d;
    this.income = i / 12;
  }
  calculateDTI() {
    return this.debt / this.income;
  }
}

class LoanCalc {
  constructor(l,r,t,tx=0,ins=0) {
    this.loanAmount = l;
    this.rate = (r / 100) / 12;
    this.term = t * 12;
    this.tax = tx;
    this.insurance = ins;
  }

  calculatePayment() {
    console.log(`Loam Amount: ${this.loanAmount}`);
    console.log(`Rate: ${this.rate}`);
    console.log(`Term: ${this.term}`);
    console.log(`Tax: ${this.tax}`);
    console.log(`Insurance: ${this.insurance}`);
    let p =  (this.loanAmount * this.rate) / (1 - Math.pow(1 + this.rate, -this.term));
    console.log(`Payment: ${p}`);
    return {
      p,
      pi: p+this.tax
    }
  }
}

class PurchaseCalc extends LoanCalc {
  constructor(value, downPayment, rate, term, tax, insurance) {
    let loanAmount = value - downPayment;
    super(loanAmount, rate, term, tax, insurance);
  }
}

class HomeAffordabilityCalc extends DTICalc {
  constructor(d, i) {
    super(d, i);
  }
  calculateDTI() {
    return super.calculateDTI();
  }
  calculateAffordibility() {
    // max mortgage amount
    // max home purchase amount
    return {
      maxPayment: this.income * rules.dti.fha,
      maxLoanAmount: 0,
      maxPurchasePrice: 0
    }
  }
}


let p = new HomeAffordabilityCalc(2000, 100000);

console.log(p.calculateAffordibility());
