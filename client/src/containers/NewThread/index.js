import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { withRouter, Link } from 'react-router-dom'

import { createThread } from 'actions/threadActions'

const renderField = ({input, label, type, El = 'input', meta: {touched, error, warning}}) => (
  <div className='field'>
    <label className='label'>{label}</label>
    <div className='control'>
      <El {...input} placeholder={label} type={type} className={El} />
    </div>
    <p className='help is-danger'>
      {touched &&
      ((error && <span>{error}</span>) ||
        (warning && <span>{warning}</span>))
      }
    </p>
  </div>
)

export class NewThread extends Component {
  componentDidMount () {
    this.props.initialize({ board: this.props.boardName })
  }

  submitForm = values => {
    this.props.createThread({ ...values, history: this.props.history })
  }

  render () {
    return (
      <div>
        <h2 className='title'>Create a new thread</h2>
        <form onSubmit={this.props.handleSubmit(values => this.submitForm(values))}>
          <Field
            name='title'
            type='text'
            component={renderField}
            label='Thread title'
          />
          <Field
            name='body'
            type='input'
            component={renderField}
            label='Thread body'
            El='textarea'
          />
          <Field
            name='password'
            type='password'
            component={renderField}
            label='Password'
          />
          <Field
            name='board'
            type='text'
            component={renderField}
            label='Board'
          />

          <div className='field is-grouped'>
            <div className='control'>
              <button className='button is-link'>Create Thread</button>
            </div>
            <div className='control'>
              <button className='button is-text'>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const validate = ({ title, body, password, board }) => {
  const errors = {}

  if (!title) errors.title = 'Add a title for your thread'

  if (!body) errors.body = 'Your thread cannot be blank...'

  if (!password) errors.password = 'Add a password to edit or delete your thread later'

  if (!board) errors.board = 'We could not auto detect what board you want it on, please specify one.'

  return errors
}

const withForm = reduxForm({
  form: 'newThreadForm',
  validate
})(NewThread)

const mapStateToProps = ({ form: { newThreadForm: values }, threadsByBoard: { boardName } }) => ({
  ...values,
  boardName
})

export default connect(mapStateToProps, { createThread })(withRouter(withForm))
