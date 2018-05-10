import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Table, Button, Icon, Header } from 'semantic-ui-react'
import * as globalActions from 'actions/global'
import * as authActions from 'actions/auth'
import constants, { userSeed } from 'constants/actionTypes'
import { removeItem, saveItem } from 'utils/localStorage'
import UserDetail from 'containers/UserDetail'

class Home extends Component {

  state = {
    isUserDetailOpen: false,
    userDetailTitle: null
  }

  deleteAccount = (user) => {
    const { users, setUsers } = this.props
    const newUsers = users.filter(usr => usr.username !== user.username && usr).splice(0)
    setUsers(newUsers)
    saveItem('users', newUsers)
  }

  logout = () => {
    const { history, logout } = this.props
    history.push('/login')
    removeItem('userData')
    logout()
  }

  resetData = () => {
    const { setUsers } = this.props
    removeItem('users')
    setUsers(userSeed)
    saveItem('users', userSeed)
    this.logout()
  }

  getUserList = () => {
    const { users, userData: { type } } = this.props
    let userList
    if (type === constants.MEMBER) {
      userList = users.filter(user => user.type === constants.MANAGER)
    } else if (type === constants.MANAGER) {
      userList = users.filter(user => user.type !== constants.ADMIN)
    } else {
      userList = users
    }
    return userList
  }

  toggleOpenUserDetail = () => {
    this.setState({
      isUserDetailOpen: !this.state.isUserDetailOpen
    })
  }

  editUser(user) {
    this.setState({
      userDetailTitle: 'Edit User'
    })
    this.props.setSelectedUser(user)
    this.toggleOpenUserDetail()
  }

  newUser = () => {
    this.setState({
      userDetailTitle: 'New User'
    })
    this.props.setSelectedUser(null)
    this.toggleOpenUserDetail()
  }

  onSaveUserDetail = (state) => {
    const { users, setUsers } = this.props
    const { username } = state
    let newUsers = users.map(usr => {
      let newUser
      if (usr.username === username) {
        newUser = {...usr, ...state}
        return newUser 
      }
      return usr
    })
    const existingUser = users.find(usr => usr.username === username)
    if (!existingUser) {
      newUsers = [...newUsers, state]
    }
    setUsers(newUsers)
    saveItem('users', newUsers)
    this.toggleOpenUserDetail()
  }

  render() {
    const users = this.getUserList()
    const { userDetailTitle, isUserDetailOpen } = this.state
    const { userData } = this.props
    return (
      <Container fluid style={{ paddingTop: '5%' }}>
        <Grid>
          <Grid.Row centered>
            <Grid.Column textAlign="left" tablet={6} mobile={7} largeScreen={3}>
              <Button inverted color='blue' onClick={this.newUser}>New User</Button>
            </Grid.Column>
            <Grid.Column textAlign="right" tablet={6} mobile={7} largeScreen={3}>
              <Button inverted color='blue' onClick={this.logout}>Logout</Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column tablet={12} mobile={14} largeScreen={6}>
              <Header as='h5'>Welcome, { `${userData.username} (${userData.type})` }</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column tablet={12} mobile={14} largeScreen={6}>
              <Table striped>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>User ID</Table.HeaderCell>
                    <Table.HeaderCell>User Type</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {
                    users.map(user => (
                      <Table.Row key={user.username}>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell>{user.type}</Table.Cell>
                        <Table.Cell>
                          <Icon style={{ cursor: 'pointer' }} onClick={() => this.editUser(user)} name='write' />
                          { 
                            user.type === constants.MEMBER && 
                            userData.username !== user.username &&
                            userData.type === constants.MANAGER && 
                              <Icon style={{ cursor: 'pointer' }} onClick={() => this.deleteAccount(user)} name='delete' />
                          }
                          { 
                            userData.username !== user.username &&
                            userData.type === constants.ADMIN && 
                              <Icon style={{ cursor: 'pointer' }} onClick={() => this.deleteAccount(user)} name='delete' />
                          }
                        </Table.Cell>
                      </Table.Row>
                    ))
                  }
                </Table.Body>
              </Table>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column tablet={12} mobile={14} largeScreen={6}>
              <Button fluid onClick={this.resetData} color='red'>Reset Data</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <UserDetail
          onSubmit={this.onSaveUserDetail}
          title={userDetailTitle}
          isOpen={isUserDetailOpen}
          close={this.toggleOpenUserDetail} />
      </Container>
    )
  }
}

const mapDispatchToProps = {
  setUserLoggedIn: globalActions.setUserLoggedIn,
  setUsers: globalActions.setUsers,
  setSelectedUser: globalActions.setSelectedUser,
  setUserData: authActions.setUserData,
  setLoginError: authActions.setLoginError,
  logout: authActions.logout
}

const mapStateToProps = (state) => ({
  users: state.global.users,
  userData: state.auth.userData
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)