import React from 'react';
import PropTypes from 'prop-types';
import './GoogleLogin.css';

export default class GoogleLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true
    };
  }
  componentDidMount() {
    if (this.state.disabled) {
      const {
        clientId,
        cookiePolicy,
        loginHint,
        fetchBasicProfile,
        redirectUri,
        discoveryDocs,
        onFailure,
        uxMode,
        scope,
        jsSrc
      } = this.props;
      ((d, s, id, callback) => {
        let js,
          gs = d.getElementsByTagName(s)[0];
        js = d.createElement(s);
        js.id = id;
        js.src = jsSrc;
        gs && gs.parentNode && gs.parentNode.insertBefore(js, gs);
        js.onload = callback;
      })(document, 'script', 'google-platform', () => {
        window.gapi.load('auth2', () => {
          this.setState({
            disabled: false
          });
          if (!window.gapi.auth2.getAuthInstance()) {
            const params = {
              client_id: clientId,
              cookie_policy: cookiePolicy,
              login_hint: loginHint,
              discoveryDocs,
              ux_mode: uxMode,
              fetch_basic_profile: fetchBasicProfile,
              scope: scope,
              redirect_uri: redirectUri
            };
            window.gapi.auth2.init(params).then(
              GoogleAuth => {
                if (GoogleAuth.isSignedIn.get()) {
                  this.handleSigninSuccess(GoogleAuth.currentUser.get());
                }
              },
              error => {
                console.log(error);
                onFailure();
              }
            );
          }
        });
      });
    }
  }
  signIn = e => {
    if (e) {
      e.preventDefault(); // to prevent submit if used within form
    }
    if (!this.state.disabled) {
      const auth2 = window.gapi.auth2.getAuthInstance();
      const { onFailure, prompt } = this.props;
      const options = {
        prompt
      };
      auth2.signIn(options).then(res => this.handleSigninSuccess(res), err => onFailure(err));
    }
  };
  handleSigninSuccess(GoogleUser) {
    const response = Object.assign({}, GoogleUser);
    const basicProfile = GoogleUser.getBasicProfile();
    const authResponse = GoogleUser.getAuthResponse(true);
    response.googleId = basicProfile.getId();
    response.tokenObj = authResponse;
    response.tokenId = authResponse.id_token;
    response.accessToken = authResponse.access_token;
    response.profileObj = {
      googleId: basicProfile.getId(),
      imageUrl: basicProfile.getImageUrl(),
      email: basicProfile.getEmail(),
      name: basicProfile.getName(),
      givenName: basicProfile.getGivenName(),
      familyName: basicProfile.getFamilyName()
    };
    this.props.onSuccess(response);
  }

  render() {
    let { buttonText } = this.props;

    if (this.state.disabled) {
      return <div>Loading....</div>;
    }

    return (
      <button className='button google-oauth-login' onClick={this.signIn}>
        <span className='svgIcon t-popup-svg'>
          <svg className='svgIcon-use' width='25' height='37' viewBox='0 0 25 25'>
            <g fill='none' fillRule='evenodd'>
              <path
                d='M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z'
                fill='#4285F4'
              />
              <path
                d='M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z'
                fill='#34A853'
              />
              <path
                d='M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z'
                fill='#FBBC05'
              />
              <path
                d='M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z'
                fill='#EA4335'
              />
            </g>
          </svg>
        </span>
        <span className='button-label'>{buttonText}</span>
      </button>
    );
  }
}
GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  scope: PropTypes.string,
  jsSrc: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string
};

GoogleLogin.defaultProps = {
  buttonText: 'Sign in with Google',
  scope: 'profile email',
  redirectUri: '',
  accessType: 'online',
  prompt: 'consent',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  jsSrc: 'https://apis.google.com/js/client:platform.js'
};
