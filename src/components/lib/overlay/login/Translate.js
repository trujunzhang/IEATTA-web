const translate = {
  'en': {
    'App': {
      'version': 'Version'
    },
    'Header': {
      'current_state': 'Current State',
      'see_console': 'see console',
      'update_state': 'Update State'
    },
    'Subview': {
      'subview': 'Subview',
      'back': 'Back'
    },
    'Snowflake': {
      'logout': 'Log out',
      'main': 'Main',
      'profile': 'Profile'
    },
    'Main': {
      'navigate': 'Navigate to Subview'
    },
    'Profile': {
      'username': 'User name',
      'email': 'Email',
      'update': 'Update Profile',
      'verified': 'Email verified',
      'display': 'display only'
    },
    'LoginForm': {
      'username': 'User name',
      'email': 'Email',
      'password': 'Password',
      'password_again': 'Password again'
    },
    'LoginRender': {
      'forgot_password': 'Forgot Password?',
      'already_have_account': 'Already have an account?',
      'register': 'Register',
      'show_password': 'Show Password'
    },
    'ForgotPassword': {
      'reset_password': 'Reset password'
    },
    'Login': {
      'login': 'Log in'
    },
    'Register': {
      'register': 'Register'
    },
    'FieldValidation': {
      'valid_user_name': '6-12 in length with letters or numbers',
      'valid_email': 'Provide valid email',
      'valid_password': '6-12 in length, with a number and special character: !@#$%^&*',
      'valid_password_again': 'Passwords must match'
    }
  }
}

function t (id) {
  const s = id.split('.')
  let value = translate.en
  for (let i = 0; i < s.length; i++) {
    value = value[s[i]]
  }
  return value
}

export default {t}
