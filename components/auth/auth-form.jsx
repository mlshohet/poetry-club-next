import { Fragment, useState, useRef} from 'react';
import { signIn } from 'next-auth/client';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { getPoet } from '../../lib/poets-utils'; 

import classes from './auth-form.module.css';


async function createUser(email, password) {
  console.log("in create User function");

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  console.log("data: ",data);
  return data;
}

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let result;
    if (isLogin) {
      result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      console.log("result: ", result);

      if (!result.error) {

        router.back();
      }
      
    } else {
      try {
          const result = await createUser(enteredEmail, enteredPassword);
          console.log(result);
      } catch(error) {
          console.log(error);
      }
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      if (!result.error) {
        router.replace('/');
      }
    }
  }

  return (
    <Fragment>
    <div className={classes.authContainer}>
      <section className={classes.auth}>
        <div className={classes.titleContainer}>
          <Link href='/'><a>
              <div className={classes.title}>
                noontide
              </div>
              <div className={classes.secondLine}>
                poetry club
              </div></a>
          </Link>
        </div>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form
          onSubmit={submitHandler}

        >
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input 
              type='email' 
               id='email' 
               required 
               ref={emailInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input 
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
      </div>
   
    </Fragment>
  );
}


export default AuthForm;




