import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addTodo } from '../store/Actions'

class Test extends Component {
  render() {
    let input
    return (
        <div className="Test">

        <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        this.props.onSubmit(input.value)
        input.value = ''
      }}>
        <input className="form-control" ref={node => {
          input = node
        }} />
        <button type="submit" className="btn btn-success">
          Add Todo
        </button>
      </form>

        {this.props.todos.map(item=>
             (
                <li key={item.id}>{item.text}</li>
                ))}
        </div>
    );
  }
}
const Tests = connect(
  (state) => {
      return {
        todos: state.todos
      }
  },
  (dispatch) => {
  return {
    onSubmit: (text) => {
      dispatch(addTodo(text))
    }
  }
}
)(Test)

export default Tests;
