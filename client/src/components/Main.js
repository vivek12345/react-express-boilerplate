import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Layout } from 'antd';
import GoogleLogin from './GoogleLogin';
import Header from './Header';
import Footer from './Footer';
import constants from '@constants';
import { api } from '@helpers/ApiLibrary';
import { storage } from '@helpers/Storage';

import PropTypes from 'prop-types';

const { Content } = Layout;

class Main extends Component {
  constructor(props) {
    super(props);
    const user = storage.get('user');
    let token = null;
    if (user && user.token) {
      token = user.token;
      api.setAuthorizationToken(token);
    }
    this.state = {
      user: user
    };
  }
  handleLogin = googleUser => {
    const request = {
      method: 'POST',
      url: '/auth/google',
      data: {
        access_token: googleUser.accessToken
      }
    };
    api.request(request).then(response => {
      const {
        data: { user }
      } = response;
      const { token } = user;
      api.setAuthorizationToken(token);
      this.setState({
        user: user,
        loginModal: false
      });
      storage.set('user', user);
      browserHistory.push({
        pathname: '/products'
      });
    });
  };
  handleFailure = error => {
    console.log(error);
  };

  handleLogout = () => {
    api.setAuthorizationToken(null);
    this.setState({
      user: null
    });
    storage.remove('user');
    browserHistory.push({
      pathname: '/'
    });
  };

  renderChildrens() {
    return React.Children.map(this.props.children, child => {
      let clonedProps = {
        ...child.props
      };
      return React.cloneElement(child, clonedProps);
    });
  }

  render() {
    const { user } = this.state;
    let content = null;
    if (!user) {
      content = (
        <GoogleLogin
          clientId={constants.GOOGLE_CLIENT_ID}
          onSuccess={this.handleLogin}
          onFailure={this.handleFailure}
        />
      );
    } else {
      content = this.renderChildrens();
    }
    return (
      <Layout>
        <Header
          location={this.props.location}
          user={user}
          handleLogout={this.handleLogout}
          clientId={constants.GOOGLE_CLIENT_ID}
        />
        <Layout style={{ padding: '24px 0', background: '#fff' }}>
          <Content style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {content}
          </Content>
        </Layout>
        <Footer />
      </Layout>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
};

export default Main;
