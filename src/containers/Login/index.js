import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Modal,
  Container,
  Segment,
  Input,
  Grid,
  Header,
  Form
} from 'semantic-ui-react'
import * as globalActions from 'actions/global'
import * as authActions from 'actions/auth'
import { saveItem } from 'utils/localStorage'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  toggleShowErrorInfo = () => this.setState({ showError: !this.state.showError })

  handleSubmit = (event) => {
    event.preventDefault()
    const { setUserLoggedIn, history, users, setUserData } = this.props
    const { username, password } = this.state
    const user = users.find((user) => {
      return user.username === username && user.password === password
    })
    if (user) {
      saveItem('userData', user)
      setUserData(user)
      setUserLoggedIn(true)
      history.push('/')
    } else {
      this.toggleShowErrorInfo()
    }
  }

  render() {
    const { showError } = this.state
    return (
      <Container fluid style={{ paddingTop: '10%' }}>
        <Grid>
          <Grid.Row centered>
            <Grid.Column tablet={12} mobile={14} largeScreen={6} widescreen={6}>
              <Segment textAlign="center" style={{ padding: '10%' }}>
                <Header textAlign="center" as='h2'>LOGIN</Header>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <Input name="username" onChange={this.handleChange} fluid type="text" placeholder='username' />
                  </Form.Field>
                  <Form.Field>
                    <Input name="password" onChange={this.handleChange} fluid type="password" placeholder='password' />
                  </Form.Field>
                  <Button fluid primary>Login</Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Modal size="mini" open={showError} onClose={this.toggleShowErrorInfo}>
          <Modal.Header>
            Error
          </Modal.Header>
          <Modal.Content>
            Incorrect username and password
          </Modal.Content>
          <Modal.Actions style={{ textAlign: 'center' }}>
            <Button primary onClick={this.toggleShowErrorInfo}>OK</Button>
          </Modal.Actions>
        </Modal>
      </Container>
    )
  }
}

const mapDispatchToProps = {
  setUserLoggedIn: globalActions.setUserLoggedIn,
  setUserData: authActions.setUserData,
  setLoginError: authActions.setLoginError
}

const mapStateToProps = (state) => ({
  users: state.global.users
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)