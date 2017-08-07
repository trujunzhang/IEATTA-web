import React, {Component} from 'react';

import t from '../../../vendor/tcomb-form'

const Form = t.form.Form;


// define your domain model with tcomb
// https://github.com/gcanti/tcomb
const Person = t.struct({
  name: t.String,
  surname: t.String
});


class TcombCommonExample extends Component {
  constructor(props, context) {
    super(props)

    debugger
  }

  save() {
    // call getValue() to get the values of the form
    let value = this.refs.form.getValue();
    // if validation fails, value will be null
    if (value) {
      // value here is an instance of Person
      console.log(value);
    }
  }

  render() {
    return (
      <div>
        <Form
          ref="form"
          type={Person}
        />
        <button onClick={this.save.bind(this)}>Save</button>
      </div>
    )
  }

}


export default TcombCommonExample;
