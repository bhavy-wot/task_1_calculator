import { Component, OnInit } from '@angular/core';
import { last } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})


export class CalculatorComponent implements OnInit  { 

  input:string = '';
  result:string = '';
  history: any = [];
  temp_answer: string = '';
  first : string = '';

  ngOnInit(): void {
    //Get Local storage
    this.history = (localStorage.getItem('calc')) ? JSON.parse(localStorage.getItem('calc')!) : [];
  }
  
  //To get the number pressed
  pressNum(num: string) {
    //Do not allow . more than once
    // if (num==".") {
    //   if (this.input !="" ) {
    //     const lastNum=this.getLastOperand()
    //     console.log(lastNum.lastIndexOf("."))
    //     if (lastNum.lastIndexOf(".") >= 0) return;
    //   }
    // }
 
    //Do not allow 0 at. 
    if (num=="0") {
      // if (this.input=="" ) { return; }
      // if(this.input == "0"){return}
      const PrevKey = this.input[this.input.length - 1];
      // if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')  { return; }
    }
 
    this.input = this.input + num
    this.first = this.input;
    this.calcAnswer();    
  }
 
  //To get the last operator inserted after symbol (2nd number)
  getLastOperand() {
    let position:number;
    console.log(this.input)
    position=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > position)
     position=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > position)
     position=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > position)
     position=this.input.lastIndexOf("/")
    console.log('Last '+ this.input.substr(position+1))

    return this.input.substr(position+1)
  }
 
  //Func for symbol press
  pressOperator(op: string) {
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '%')  {
      return;
    }
    this.input = this.input + op
    this.calcAnswer();
  }
 
  //To remove the last typed digit or symbol
  clear() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
 
  //To clear the whole output screen
  allClear() {
    this.input = '';
  }
 
  //Function to calculate
  calcAnswer() {
    let formula = this.input;
    let lastKey = formula[formula.length - 1];

    // console.log("lastkey ",  lastKey);
    

    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    // if(lastKey === "+"){
    //   formula=formula.substr(0,formula.length - 1);
    //   console.log("formula is ", eval(`${formula} + ${formula}`))
    // }

    // if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.' || lastKey === '%')  {
    //   formula=formula.substr(0,formula.length - 1);
    //   console.log("hehe", formula)
    // }



    // console.log("You clicked " + formula);
    this.temp_answer = formula;

    if(formula === "0/0"){
      this.input = "Invalid";
    }
    this.result = eval(formula);
  }
 

  //On click of equals(=)
  getAnswer() {
    this.calcAnswer();
    // this.result = this.result;
    this.input = this.result;
    if (this.input=="0") 
    {
      this.input="";
    }
    
    this.temp_answer = `${this.result}`;
    console.log(this.input);
      
    this.history.push(this.first + "=" + this.input);

    console.log(this.history);
    
    //Set local storage
    localStorage.setItem('calc', JSON.stringify(this.history));

  }

  clearRow(){
    this.input = '';
    this.result = '';
  }

  //Square root
  sqrt(){
    let sqrt_val: any = this.input;
    let temp_sqrt_v: any = "";
    temp_sqrt_v = this.input;
    sqrt_val = Math.sqrt(sqrt_val);
    this.input = sqrt_val;
    this.result = sqrt_val;
    this.history.push(`sqrt(${temp_sqrt_v}) = ${this.input}`);
  }

  //Logarithm
  log(){
    let log_val: any = this.input;
    let temp_log_v: any = "";
    temp_log_v = this.input;
    log_val = Math.log10(log_val);
    this.input = log_val;
    this.result = log_val;
    this.history.push(`log(${temp_log_v}) = ${this.input}`);
  }

  //1 divide by x
  oneByX(){
    let one_val: any = this.input;
    let temp_divx: any = "";
    temp_divx = this.input;
    one_val = 1 / one_val;
    this.input = one_val;
    this.result = one_val;
    this.history.push(`1/${temp_divx} is ${this.input}`);
  }

  //Square 
  square(){
    let square_val: any = this.input;
    let temp_sq_v:any = "";
    temp_sq_v = this.input;
    square_val *= square_val;
    this.input = square_val;
    this.result = square_val;
    this.history.push(`${temp_sq_v}^2 = ${this.input}`);
  }

  //Delete History
  delete(){
    this.history = []; //clear the history div 
    this.input = "";
    this.result = "";
    localStorage.clear(); //clear local storage on click of delete history
    console.log("HISTORY DELETED!!!!");
    
  }
}