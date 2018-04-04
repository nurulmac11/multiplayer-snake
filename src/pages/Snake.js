import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import openSocket from 'socket.io-client';
import '../App.css';

class Rtext extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:this.props.name, 
            score:this.props.score,
            class: "",
        }
        this.gotit = 0
    }

    componentWillReceiveProps(nextProps) {
        const newer = nextProps
        if(this.state.score !== nextProps.score){
                var kl = this.state.name
                setTimeout(function() {
                  try{
                    document.getElementById(kl).classList.add('animator'); } catch(err) { console.log(err)};
                }, 100)
                
                setTimeout(function() {
                  try {
                    document.getElementById(kl).classList.remove('animator');}catch(err) {console.log(err)};
                }, 2000)

        }
        this.setState({
            name:newer.name, 
            score:newer.score, 
        })
  }
  render() {
    return (
        <li id={this.state.name} className={this.state.class}>
            {this.state.name} - {this.state.score}
        </li>
    );
  }
}

class ColoredRect extends Component {

    constructor() {
        super()
        while(1){
        var personname = prompt("Please enter your name:", "");
          try{
        if (personname.match(/^[0-9a-z]+$/))
          break;
        else
          alert("inappropriate name");
          } catch(e) {
          console.log("no")
          }
        }
        this.mynameis = personname;
        let person = {id:1, name:this.mynameis, x:0, y:0, rx:0, ry:0, score:0}
        let apple = {ax:50, ay:50}
        this.state = {
            color: 'pink',
            apple: apple,
            me:    person,
            people: {[this.mynameis]:person},
            serverRule: 0
        };

      this.socket = openSocket('localhost:8000');
        this.subscribeToTimer(
            (err, timestamp) => {
                this.setState({
                     people: timestamp
                })
            }
        );
        this.socket.on('moved', msg => {
              this.setState({
                     people: msg,
                     serverRule: 1
                })
        });
        this.socket.on('apple', msg => {
              this.setState({
                     apple: msg
                })  
        });
    }

    subscribeToTimer(cb) {
      this.socket.on(this.mynameis, timestamp => cb(null, timestamp));
      this.socket.emit('subscribeToTimer', this.mynameis);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
 
    componentDidMount() {
        setInterval(this.game.bind(this), 1000/8)
        document.addEventListener('keydown',this.keyPress.bind(this));
    }

    keyPress(event) {
        let people = {...this.state.me}
        if(event.key==="ArrowLeft"){
            people.rx = -1;
            people.ry =  0;
        }
        if(event.key==="ArrowRight"){
            people.rx = 1;
            people.ry =  0;
        }
        if(event.key==="ArrowDown"){
            people.rx = 0;
            people.ry = 1;
        }
        if(event.key==="ArrowUp"){
            people.rx = 0;
            people.ry = -1;
        }
        let me = {...this.state.me}
        this.socket.emit('move', {id:1, name:this.mynameis, x:me.x, y:me.y, rx:people.rx, ry:people.ry,score:me.score});
        this.setState({
          me: people
        })
    }

    otherGames() {
        Object.keys(this.state.people).map((item, i) => {
            let people = {...this.state.people}
            let speed = 7
            let x =  people[item].x+people[item].rx* speed
            let y =  people[item].y+people[item].ry * speed

            if(x < 0 ) x = 500
            if(x > 501 ) x = 0
            if(y < 0 ) y = 500
            if(y > 500 ) y = 0
            
            people[item].x = x;
            people[item].y = y;
            this.setState({
                people: people
            })
            return true;
        })

    }

    game() {
        let people = {...this.state.me}
        let speed = 7
        let x =  people.x+people.rx* speed
        let y =  people.y+people.ry * speed
        let rx = people.rx;
        let ry = people.ry;
        let score = people.score;

        if(x < 0 ) x = 500
        if(x > 501 ) x = 0
        if(y < 0 ) y = 500
        if(y > 500 ) y = 0

        if(x-5 < this.state.apple.ax && this.state.apple.ax < x+5 
            && this.state.apple.ay-5 < y  && y < this.state.apple.ay+5) {
            score = score + 1
            people.score = score
            let apple = {ax:this.getRandomInt(0,500),ay:this.getRandomInt(0,500)}
            this.socket.emit('move', {id:1, name:this.mynameis, x:x, y:y, rx:rx, ry:ry, score:score});
            this.socket.emit('Ieat', apple);
            this.setState({
                apple: apple
            })
        }
        
        people.x = x;
        people.y = y;
        this.setState({
            me: people
        })
        this.socket.emit('dontforgetme', {id:1, name:this.mynameis, x:x, y:y, rx:rx, ry:ry, score:score});
        if(!this.state.serverRule)
            this.otherGames();
        else
            this.setState({
                serverRule: 0
            })
    }

    render() {
      const image = new window.Image();
      image.src = "https://cdn.tutsplus.com/mobile/uploads/legacy/Corona-SDK_Build-A-Snake-Game/1/6.png"
        return (
            <React.Fragment>
            <div className="col">
            <Stage width={500} height={500}>
            <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={500}
                    height={500}
                    fillPatternImage={image}
              />
                        <Text 
                            text={this.mynameis} 
                            x={this.state.me.x}
                            y={this.state.me.y+10}
                            />
                        <Rect
                            x={this.state.me.x}
                            y={this.state.me.y}
                            width={10}
                            height={10}
                            fill="blue"
                        />
              {Object.keys(this.state.people).map((item, i) => 
                {
                  return this.state.people[item].name !== this.mynameis ?
                    <React.Fragment>
                        <Text 
                            text={this.state.people[item].name} 
                            x={this.state.people[item].x}
                            y={this.state.people[item].y+10}
                            />
                        <Rect
                            x={this.state.people[item].x}
                            y={this.state.people[item].y}
                            width={10}
                            height={10}
                            fill="blue"
                        />
                    </React.Fragment>
                    : null
                     }
                )
              }

              <Rect
                    x={this.state.apple.ax}
                    y={this.state.apple.ay}
                    width={10}
                    height={10}
                    fill="red"
              /> 
            </Layer>
            </Stage>
            </div>
            <div className="col">
                <h1> Score Table </h1>
                <ul>
              {Object.keys(this.state.people).map((item, i) => (
                    <Rtext name={this.state.people[item].name}
                    score={this.state.people[item].score} /> 
                    ))}
                </ul>
            </div>
      </React.Fragment>
        );
    }
}

export default ColoredRect
