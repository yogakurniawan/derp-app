import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Button,
  Input,
  Form,
  Grid,
  Dropdown
} from 'semantic-ui-react'
import constants from 'constants/actionTypes'

class UserDetail extends Component {

  state = {
    username: '',
    password: '',
    type: '',
    dirty: false,
    mode: 'new'
  }

  componentDidUpdate() {
    const { selectedUser } = this.props
    if (!this.state.dirty) {
      this.setState({
        ...this.state,
        ...selectedUser,
        dirty: true,
        mode: selectedUser ? 'edit' : 'new'
      })
    }
  }

  componentWillReceiveProps() {
    this.setState({
      username: '',
      password: '',
      type: '',
      dirty: false,
      mode: 'new'
    })
  }

  handleOpen = () => {
    const { selectedUser } = this.props
    this.setState({
      ...this.state,
      ...selectedUser
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleDropdownChange = (event, data) => {
    this.setState({
      type: data.value
    })
  }

  handleSubmit = () => {
    const { onSubmit } = this.props
    const { dirty, mode, ...rest } = this.state
    onSubmit(rest)
  }

  handleClose = () => {
    const { close } = this.props
    this.setState({
      dirty: false
    })
    close()
  }

  render() {
    const { title, isOpen, userData } = this.props
    const { username, password, type, mode } = this.state
    const typeOptions = [
      {
        text: 'Member',
        value: constants.MEMBER
      },
      {
        text: 'Manager',
        value: constants.MANAGER
      },
      {
        text: 'Admin',
        value: constants.ADMIN
      }
    ]
    return (
      <Modal size="small" open={isOpen} onClose={this.handleClose} closeIcon>
        <Modal.Header>
          { title }
        </Modal.Header>
        <Modal.Content>
          <Grid>
            <Grid.Row centered>
              <Grid.Column tablet={12} mobile={14} largeScreen={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <Input disabled={mode === 'edit'} value={username} name="username" onChange={this.handleChange} fluid type="text" placeholder='username' />
                  </Form.Field>
                  <Form.Field>
                    { userData.type === constants.MANAGER && <Input disabled={mode === 'edit' && type !== constants.MEMBER} value={password} name="password" onChange={this.handleChange} fluid type="password" placeholder='password' />}
                    { userData.type === constants.ADMIN && <Input disabled={mode === 'edit' && type === constants.ADMIN} value={password} name="password" onChange={this.handleChange} fluid type="password" placeholder='password' />}
                  </Form.Field>
                  <Form.Field>
                    <Dropdown disabled={mode === 'edit' && userData.type !== constants.ADMIN} value={type} onChange={this.handleDropdownChange} placeholder='Select Type' fluid selection options={typeOptions} />
                  </Form.Field>
                  { userData.type !== constants.ADMIN && <Button disabled={mode === 'edit' && userData.type === constants.MEMBER} fluid primary>Save</Button> }
                  { userData.type === constants.ADMIN && <Button fluid primary>Save</Button> }
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
}

const mapStateToProps = (state) => ({
  selectedUser: state.global.selectedUser,
  userData: state.auth.userData
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetail)