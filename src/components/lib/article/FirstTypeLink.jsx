import React, { Component } from 'react'
import Users from '../../../lib/users'

class FirstTypeLink extends Component {

  constructor (props) {
    super(props)
    this.state = this.initialState = {
      value: '',
      urlResult: {status: 'required', message: 'required'}// ['empty',"required","duplication","invalid"]
    }
  }

  onChange (event) {
    event.preventDefault()

    let input = event.target.value
    this.setState({value: input})

    if (input === '') {

    }
    else if (!!Users.validateUrl(input)) {
      this.context.actions.call('validate.submitted.post.link', input, (error, result) => {
        if (!error) {
          this.setState({urlResult: result})
        }
      })
    } else {
      this.setState({urlResult: {status: 'invalid', message: 'INVALID URL', value: 'the url address is invalidate'}})
    }

  }

  onNextClick () {
    this.props.nextClick(this.state.urlResult)
  }

  render () {
    const {urlResult} = this.state,
      {status, message} = urlResult,
      formStatus = (status !== 'empty') ? '' : 'errorField_1YQ0W',
      alert = (status !== 'empty') ? (
        <span className="notice_33UMT secondaryText_PM80d subtle_1BWOT base_3CbW2">{message}</span>) : ''

    const disabled = status === 'empty' || status === 'required' || status === 'invalid'
    return (
      <div >
        <label className={formStatus + ' field_1LaJb'}>
          <span className="label_2ZD44 text_3Wjo0 subtle_1BWOT base_3CbW2">Link</span>
          <div className="group_1nlHj text_3Wjo0 default_tBeAo base_3CbW2">
            <input
              value={this.state.value}
              onChange={this.onChange.bind(this)}
              id="new-article-link"
              type="text"
              name="url"
              placeholder="Paste a URL (e.g. http://www.nytimes.com/hillary-clinton-donald-trump-president.html)"/>
          </div>
          {alert}
          <hr className="ruler_1ti8u"/>
        </label>
        <div className="right_1jQ6K buttonGroup_2NmU8">
          <button
            className="button_2I1re mediumSize_10tzU secondaryBoldText_1PBCf secondaryText_PM80d orangeSolidColor_B-2gO solidletiant_2wWrf"
            type="submit"
            id="new-article-link-submit"
            onClick={this.onNextClick.bind(this)}
            disabled={disabled}>
            <div className="buttonContainer_wTYxi article_button">Next</div>
          </button>
        </div>
      </div>
    )
  }
}

export default FirstTypeLink
