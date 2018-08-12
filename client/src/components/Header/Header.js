import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleLogout from '@components/GoogleLogout';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router';
import { util } from '@helpers/utils';
import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    if (this.props.location) {
      let currentRoute = util.getCurrentActiveRoute(this.props.location.pathname);
      let upcasedPathName = currentRoute.charAt(0).toUpperCase() + currentRoute.substring(1);
      this.state = {
        activeLink: upcasedPathName
      };
    }
  }
  handleClick(event, item) {
    this.setState({
      activeLink: item
    });
  }
  renderLeftNavItems() {
    const leftNavItems = ['Products'];
    return leftNavItems.map(item => {
      let downcasedItemName = item
        .split(' ')
        .join('-')
        .toLowerCase();
      let url = `/${downcasedItemName}`;
      return (
        <Menu.Item key={item} onClick={(event, item) => this.handleClick(event, item)}>
          <Link to={url}>{item}</Link>
        </Menu.Item>
      );
    });
  }
  render() {
    const { activeLink } = this.state;
    const { user, clientId } = this.props;
    let leftNavItems = this.renderLeftNavItems();
    let rightAccountSection = [];
    if (user) {
      rightAccountSection = rightAccountSection.concat([
        <Menu.Item key={'signout'} className='logout'>
          <GoogleLogout onLogoutSuccess={this.props.handleLogout} clientId={clientId} />
        </Menu.Item>
      ]);
    }

    return (
      <Layout.Header className='header'>
        <div className='logo' />
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[activeLink]} style={{ lineHeight: '64px' }}>
          {leftNavItems}
          {rightAccountSection}
        </Menu>
      </Layout.Header>
    );
  }
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired
};

export default Header;
