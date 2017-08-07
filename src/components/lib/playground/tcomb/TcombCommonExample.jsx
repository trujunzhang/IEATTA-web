import React, {Component} from 'react';

// import t from '../../../vendor/tcomb-form'

import t from 'tcomb-form';

const Form = t.form.Form;

// define your domain model with tcomb
// https://github.com/gcanti/tcomb
const Person = t.struct({
  name: t.String,
  surname: t.String
});


const options = {
  fields: {
    name: {
      attrs: {
        autoFocus: true,
        placeholder: 'Type your name here',
        onBlur: () => {
          console.log('onBlur on name field!');
        }
      }
    }
  }
};


class TcombCommonExample extends Component {
  constructor(props, context) {
    super(props)
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

      <div className="main-content-wrap main-content-wrap--full">

        <div id="super-container" className="content-container">


          <div className="container">
            <div className="clearfix layout-block layout-full" id="update-biz-details">

              <div className="column column-alpha ">

                <div
                  className="biz-attrib-form yform"
                  id="biz_attrib_form"
                  method="POST"
                  name="biz_attrib_form">

                  <Form
                    ref="form"
                    type={Person}
                    options={options}
                  />
                  <button onClick={this.save.bind(this)}>Save</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}


export default TcombCommonExample;
