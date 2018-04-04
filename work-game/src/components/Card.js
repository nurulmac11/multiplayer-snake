import React, { Component } from 'react';
import {MyContext} from '../Context'
import './Other.css'

class Card extends Component {
  render() {
    return (
      <div className="Card">
        <MyContext.Consumer>
        {(context) => (
        <React.Fragment>
            <div class={context.state.class}>
              <div class="card-body">
                <h5 class="card-title">{context.state.qtext.title}</h5>
                <p class="card-text">{context.state.qtext.text}</p>
              </div>
              <button type="button" onClick={context.clickFirst} class="btn btn-light">
              {context.state.qtext.but1}</button>
              <button type="button" onClick={context.clickSec} class="btn btn-dark">
              {context.state.qtext.but2}</button>
            </div>
        <div className="middle">
            {context.state.years} years have passed...
            Record is {context.state.record} years.
        </div>
        </React.Fragment>
        )}
        </MyContext.Consumer>
      </div>
    );
  }
}

export default Card;

