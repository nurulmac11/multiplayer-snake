import React, { Component } from 'react';

// first we will make a new context
export const MyContext = React.createContext();

// Then create a provider Component
export class MyProvider extends Component {
  initCase = 8
  state = {
    heart: 50,
    insomnia: 50,
    bored: 50,
    work: 50,
    q: this.initCase,
    qtext: qs[this.initCase],
    years: 0,
    class: "card",
    record: 0,
  }
  checkQ(q) {
    if(q+1 > qs.length-1)
      return this.initCase
    else
      return q+1
  }
  whenDie() {
    var warning = "card bg-warning"
    this.setState({
      class: warning,
      record: this.state.years+1 > this.state.record ? this.state.years+1 : this.state.record
    })
    var oldRecord = localStorage.getItem("record");
    if(oldRecord < this.state.years+1)
      localStorage.setItem("record", this.state.years+1);
  }
  checkStatus(newer) {
    if(this.state.q < this.initCase){ // reset game
      this.setState({
        heart: 50,
        insomnia: 50,
        bored: 50,
        work: 50,
        q: this.initCase,
        qtext: qs[this.initCase],
        class: "card",
        years: 0
      })
      return -1
    }
    if(this.state.heart + newer[0] >= 100) {
      this.whenDie()
      return 0;
    } else if(this.state.heart + newer[0] <= 0){
      this.whenDie()
      return 1;
    } else if(this.state.insomnia + newer[1]<=0){
      this.whenDie()
      return 2;
    } else if(this.state.insomnia + newer[1]>=100){
      this.whenDie()
      return 3;
    } else if(this.state.bored + newer[2] <= 0){
      this.whenDie()
      return 4;
    } else if(this.state.bored + newer[2] >= 100){
      this.whenDie()
      return 5;
    } else if(this.state.work + newer[3] <= 0){
      this.whenDie()
      return 6;
    } else if(this.state.work + newer[3] >= 100){
      this.whenDie()
      return 7;
    }
    return this.checkQ(this.state.q);
  }

  componentDidMount() {
    var oldRecord = localStorage.getItem("record");
    this.setState({
      record: oldRecord > this.state.record ? oldRecord : this.state.record
    })
  }
  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        clickFirst: () => {
          var resultCheck = this.checkStatus(qs[this.state.q].res1);
          if(resultCheck>=0)
          this.setState({
            heart: this.state.heart + qs[this.state.q].res1[0],
            insomnia: this.state.insomnia + qs[this.state.q].res1[1],
            bored: this.state.bored + qs[this.state.q].res1[2],
            work: this.state.work + qs[this.state.q].res1[3],
            q: resultCheck,
            qtext: qs[resultCheck],
            years: this.state.years + 1
          })
        },
        clickSec: () => {
          var resultCheck = this.checkStatus(qs[this.state.q].res2);
          if(resultCheck>=0)
          this.setState({
            heart: this.state.heart + qs[this.state.q].res2[0],
            insomnia: this.state.insomnia + qs[this.state.q].res2[1],
            bored: this.state.bored + qs[this.state.q].res2[2],
            work: this.state.work + qs[this.state.q].res2[3],
            q: resultCheck,
            qtext: qs[resultCheck],
            years: this.state.years + 1
          })
        }
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

// heart, insomnia, bored
export const qs = [
    {
        title : "HEART ATTACK",
        text  : "You drink so much coffee...",
        but1  : "Hell",
        but2  : "Heaven",
        res1: [0,0,0,0],
        res2: [0,0,0,0]
    },
    {
        title : "Dead Bodies...",
        text  : "You need to be alive to work.",
        but1  : "Hell",
        but2  : "Heaven",
        res1: [0,0,0,0],
        res2: [0,0,0,0]
    },
    {
        title : "FIRED !",
        text  : "You are full of energy. Screaming in the middle of the office.",
        but1  : "Go home",
        but2  : "I quit",
        res1: [0,0,0,0],
        res2: [0,0,0,0]
    }, 
    {
        title : "Wake Up Buddy !",
        text  : "Normal people sleep at night !",
        but1  : "Go home",
        but2  : "I quit",
        res1: [0,0,0,0],
        res2: [0,0,0,0]
    }, 
    {
        title : "You are fired !", // bored<0
        text  : "You gotta work.",
        but1  : "Go home",
        but2  : "I quit",
        res1: [0,0,0,0],
        res2: [0,0,0,0]
    }, 
    {
        title : "You resigned.", // bored>100
        text  : "You bored as fuck, so resigned.",
        but1  : "Go home",
        but2  : "I quit",
        res1: [0,0,0,0],
        res2: [0,0,0,0]
    }, 
    {
        title : "You are fired!", // work<0
        text  : "You gotta work !",
        but1  : "Go home",
        but2  : "I quit",
        res1: [0,0,0,0],
        res2: [0,0,0,0]
    }, 
    {
        title : "You overworked.", // work>100
        text  : "You can't handle this.",
        but1  : "Go home",
        but2  : "I quit",
        res1: [0,0,0,0],
        res2: [0,0,0,0]
    }, 
    { 
        title : "Drink?",
        text  : "Would you drink coffee or tea?",
        but2  : "Coffee",
        but1  : "Tea",
        res2: [10,-10,0,10],
        res1: [5,-5,0,5]
    },
    {
        title : "Cigarattes?",
        text  : "Would you drink cigarette or continue to work?",
        but1  : "Cigarattes",
        but2  : "Work",
        res1: [5,-5,-5,-5],
        res2: [-5,15,10,5]
    },
    {
        title : "Python or JS",
        text  : "Code with python or js?",
        but2  : "Python",
        but1  : "Js",
        res2: [-5, -5,-5,10],
        res1: [10,10,10,5]
    },
    {
        title : "Walk or bus?",
        text  : "How do you go to work?",
        but1  : "Walk",
        but2  : "Take bus",
        res1: [-5, -10,-5,-5],
        res2: [5,10,5,5]
    }
]
