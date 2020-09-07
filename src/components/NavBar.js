import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class MenuExampleInvertedSegment extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted className="nav-bar">
        <Menu inverted secondary>
          <Menu.Item
            as={Link}
            to='/home'
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/profile'
            name='my profile'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            as={Link}
            to='/search'
            name='ask'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              as={Link}
              to='/login'
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.props.logOut}
            />
          </Menu.Menu>
        </Menu>
      </Segment>
    )
  }
}