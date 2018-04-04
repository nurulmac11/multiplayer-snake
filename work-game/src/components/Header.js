import React, { Component } from 'react';
import {MyContext} from '../Context'



class Header extends Component {
  render() {
    return (
      <div className="Header">
        <MyContext.Consumer>
        {(context) => (
        <div className="row">
            <div className="col">
                <i className="fas fa-heartbeat fa-5x"></i><br/>
                Heart rate
                <div class="progress">
                  <div class="progress-bar bg-danger" style={{width:context.state.heart+"%"}}></div>
                </div>
            </div>
            <div className="col">
                <i className="fas fa-bed fa-5x"></i><br/>
                Insomnia 
                <div class="progress">
                  <div class="progress-bar bg-dark" style={{width:context.state.insomnia+"%"}}></div>
                </div>
            </div>
            <div className="col">
                <i className="fas fa-frown fa-5x"></i><br/>
                Bored
                <div class="progress">
                  <div class="progress-bar bg-secondary" style={{width:context.state.bored+"%"}}></div>
                </div>
            </div>
            <div className="col">
                <i className="fas fa-briefcase fa-5x"></i><br/>
                Work
                <div class="progress">
                  <div class="progress-bar bg-info" style={{width:context.state.work+"%"}}></div>
                </div>
            </div>
        </div>
        )}
        </MyContext.Consumer>
      </div>
    );
  }
}

export default Header;
