import React, { Component } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

class ColoredRect extends Component {

    constructor() {
        super()
        this.state = {
            color: 'pink',
            sx: 0,
            sy: 400,
            score: 0,
            jump: 0,
            lastright: 0,
            lastleft: 0,
            ex: 450,
            ey: 490,
            collision: 0,
            escape: 0
        };
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
 
    componentDidMount() {
        setInterval(this.game.bind(this), 1000/500)
        document.addEventListener('keydown',this.keyPress.bind(this));
    }

    keyPress(event) {
        let speed = 15
        if(event.key==="ArrowLeft"){
            this.setState({
                sx: this.state.sx-speed,
                lastleft: Date.now()
            })
        }
        if(event.key==="ArrowRight"){
            this.setState({
                sx: this.state.sx+speed,
                lastright: Date.now()
            })
        }
        if(event.key==="ArrowDown"){
            
        }
        if(event.key==="ArrowUp"){
            if(this.state.jump !== 1 && this.state.jump !== -1){   
            this.setState({ 
                jump: 1
            })
            }
        }
    }

    player() {
        let x = this.state.sx
        let y = this.state.sy
        let jump = this.state.jump
        if(Date.now() - this.state.lastright < 200 && jump){
            x = x+1
            this.setState({
                lastright: Date.now()
            })
        } else if(Date.now() - this.state.lastleft < 200 && jump) {
            x = x-1
            this.setState({
                lastleft: Date.now()
            })
        }
        if(x < 0 ) x = 500
        if(x > 500 ) x = 0
        if(y < 0 ) y = 500
        if(y > 500 ) y = 0
        this.setState({
            sx: x, sy: y
        })
        if(y<400 && jump===-1){
            this.setState({
                sy: y + 1,
                sx: x
            })
        } else if(y>300 && jump===1){
            this.setState({
                sy: y - 1,
                sx: x
            })
        } else if(jump===1){
            this.setState({
                jump: -1
            })
        } else {
            this.setState({
                jump: 0
            })
        }
    }

    enemy() {
        let x = this.state.ex
        let y = this.state.ey
        if(x < 0 ) x = 500
        if(x > 500 ) x = 0
        if(y < 0 ) y = 500
        if(y > 500 ) y = 0
        x -= 1
        y = this.getRandomInt(400,500)
        this.setState({
            ex: x, 
            ey: y
        })
    }

    collision(){
        let px = this.state.sx // 10
        let py = this.state.sy // 100
        let ex = this.state.ex // 50
        let ey = this.state.ey // 10

        if(ex<=px+10 && px<=ex+50 && py<=ey && ey+10<=py+100){
            if(this.state.collision===0){
                this.setState({
                    score: this.state.score - 1,
                    collision: 1
                })
            }
        } else{
            this.setState({
                collision: 0
            })
        }

        if(ex<=px+10 && px<=ex+50 && py+100<=ey){ // escaped
            if(this.state.escape===0){
                this.setState({
                    score: this.state.score + 1,
                    escape: 1
                })
            }
        } else{
            this.setState({
                escape: 0
            })
        }
    }

    game() {
        this.player()
        this.enemy()
        this.collision()
    }

    render() {
        return (
            <React.Fragment>
            <h2>{this.state.score}</h2>
            <Stage width={500} height={500}>
            <Layer>
                <Rect
                    x={0}
                    y={0}
                    width={500}
                    height={500}
                    fill={this.state.color}
              />
              <Rect
                    x={this.state.sx}
                    y={this.state.sy}
                    width={10}
                    height={100}
                    fill="blue"
              />
                <Rect
                    x={this.state.ex}
                    y={this.state.ey}
                    width={50}
                    height={10}
                    fill="red"
              />
            </Layer>
            </Stage>
      </React.Fragment>
        );
    }
}

export default ColoredRect