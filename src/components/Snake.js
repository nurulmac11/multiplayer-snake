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
                    document.getElementById(kl).classList.add('animator');
                }, 100)
                
                setTimeout(function() {
                    document.getElementById(kl).classList.remove('animator');
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
        var personname = prompt("Please enter your name:", "");
        this.mynameis = personname;
        let person = {id:1, name:this.mynameis, x:0, y:0, rx:0, ry:0, score:0}
        let apple = {ax:50, ay:50}
        this.state = {
            color: 'pink',
            apple: apple,
            people: {[this.mynameis]:person}
        };

      this.socket = openSocket('http://192.168.1.5:8000/');
        this.subscribeToTimer(
            (err, timestamp) => {
                this.setState({
                     people: timestamp
                })
            }
        );
        this.socket.on('moved', msg => {
              this.setState({
                     people: msg
                })  
        });
        this.socket.on('apple', msg => {
              this.setState({
                     apple: msg
                })  
        });
    }

    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    subscribeToTimer(cb) {
      this.socket.on(this.mynameis, timestamp => cb(null, timestamp));
      this.socket.emit('subscribeToTimer', this.mynameis);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
 
    componentDidMount() {
        setInterval(this.game.bind(this), 1000/10)
        document.addEventListener('keydown',this.keyPress.bind(this));
    }

    keyPress(event) {
        let people = {...this.state.people}
        if(event.key==="ArrowLeft"){
            people[this.mynameis].rx = -1;
            people[this.mynameis].ry =  0;
            this.setState({
                people
            })
        }
        if(event.key==="ArrowRight"){
            people[this.mynameis].rx = 1;
            people[this.mynameis].ry =  0;
            this.setState({
                people
            })
        }
        if(event.key==="ArrowDown"){
            people[this.mynameis].rx = 0;
            people[this.mynameis].ry = 1;
            this.setState({
                people
            })
        }
        if(event.key==="ArrowUp"){
            people[this.mynameis].rx = 0;
            people[this.mynameis].ry = -1;
            this.setState({
                people
            })
        }
        let x = people[this.mynameis].x
        let y = people[this.mynameis].y
        let score = people[this.mynameis].score
        let rx = people[this.mynameis].rx;
        let ry = people[this.mynameis].ry;
        this.socket.emit('move', {id:1, name:this.mynameis, x:x, y:y, rx:rx, ry:ry,score:score});
    }
    game() {
        let people = {...this.state.people}
        let speed = 7
        let x = people[this.mynameis].x+people[this.mynameis].rx* speed
        let y = people[this.mynameis].y+people[this.mynameis].ry * speed
        let rx = people[this.mynameis].rx;
        let ry = people[this.mynameis].ry;
        let score = people[this.mynameis].score;

        if(x < 0 ) x = 500
        if(x > 500 ) x = 0
        if(y < 0 ) y = 500
        if(y > 500 ) y = 0

        if(x-5 < this.state.apple.ax && this.state.apple.ax < x+5 
            && this.state.apple.ay-5 < y  && y < this.state.apple.ay+5) {
            score = score + 1
            let apple = {ax:this.getRandomInt(0,500),ay:this.getRandomInt(0,500)}
            this.setState({
                apple: apple
            })
            this.socket.emit('Ieat', apple);
        }
        
        people[this.mynameis].x = x;
        people[this.mynameis].y = y;
        
        this.setState(prevState => ({
            people: {
                ...prevState.people,
                [this.mynameis] : {
                        ...prevState.people[this.mynameis],
                        x:x,
                        y:y,
                        score:score
                    }
                }
                })
        )
        this.socket.emit('move', {id:1, name:this.mynameis, x:x, y:y, rx:rx, ry:ry, score:score});
    }

    render() {
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
                    fill={this.state.color} 
              />
              {Object.keys(this.state.people).map((item, i) => (
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
                    ))}

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
