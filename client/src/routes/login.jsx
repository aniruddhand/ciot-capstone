import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '../components/authprovider';

let queried = false;

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation()
  const auth = useAuth();

  const [sessionChecked, setSessionChecked] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  let lastLoc = location.state?.from?.pathname || '/';

  function doLogin(event) {
    event.preventDefault();
    
    setAuthenticating(true);
    let formData = new FormData(event.currentTarget);
    
    let email = formData.get('email');
    let pin = formData.get('pin');

    auth.signIn(email, pin, (error) => {
      if (!error) {
        navigate(lastLoc, {replace: true});
      } else {
        setAuthenticating(false);
        console.log(error);
      }
    });
  }

  useEffect(() => {
    if (!auth.user && !sessionChecked) {
      if (!queried) {
        queried = true;
        fetch('/api/session').then(response => {
            if (response.status === 200) {
                response.json().then(body => {
                    auth.user = body;
                    navigate('/', {replace: true});
                });
            } else {
                setSessionChecked(true);
            }
        });
      } else {
        setSessionChecked(true);
      }
    } else {
      setSessionChecked(true);
    }

    return () => {
        setSessionChecked(true);
    }
  }, [sessionChecked, auth, navigate]);

  if (sessionChecked && !auth.user) {
    return(
      <div className='container vh-100'>
        <div className='row align-items-center vh-100'>
            <div className='col'></div>
            <div className='col'>
              <form onSubmit={doLogin}>
                <h3>Sign in</h3>
                <div className='form-floating mb-3'>
                  <input name='email' type='email' className='form-control' id='floatingInput' placeholder='name@example.com' required></input>
                  <label htmlFor='floatingInput'>Email address</label>
                </div>
                <div className='form-floating'>
                  <input name='pin' type='password' className='form-control' id='floatingPassword' placeholder='Pin' required></input>
                  <label htmlFor='floatingPassword'>Pin</label>
                </div>
                <button type='submit' className='btn btn-primary' style={{marginTop: '10px'}} disabled={authenticating}>
                  {authenticating && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                  {authenticating && ' Sign in'}
                  {!authenticating && 'Sign in'}
                </button>
                <div className='form-text'>Not registered? <a href='/register' className='link-primary'>Register here</a></div>
              </form>
            </div>
            <div className='col'></div>
          </div>
      </div>
    );
  } else {
    return <div></div>
  }
}

export default LoginPage;