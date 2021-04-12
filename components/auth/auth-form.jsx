import { Fragment, useState, useRef} from 'react';
import { signIn } from 'next-auth/client';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { getPoet } from '../../lib/poets-utils'; 

import classes from './auth-form.module.css';


async function createUser(name, email, password) {

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || "Error. Something went wrong.");
  }
  return data;
}

function AuthForm() {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event) {
    event.preventDefault();

    let enteredName;
    if (!isLogin) {
        enteredName = nameInputRef.current.value;
    }
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (isLogin) {      
      try {
         const result = await signIn('credentials', {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword,
          });

          if (!result.error) {
            router.back();
          } else {
            alert(result.error);
            return;
          }

      } catch (error) {
        alert("Error. Something went wrong.");
        return;
      }
    } else {
      try {
          const result = await createUser(enteredName, enteredEmail, enteredPassword);
      } catch(error) {
          alert(error.message);
          return;
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
        <form
          onSubmit={submitHandler}
        > {
            !isLogin && (
                <div className={classes.control}>
                  <input 
                    type='name' 
                    id='name'
                    placeholder='Name'
                    ref={nameInputRef}
                  />
                </div>
            )
          }
          <div className={classes.control}>

            <input 
              type='email' 
               id='email' 
               placeholder='Email'
               required 
               ref={emailInputRef}
            />
          </div>
          <div className={classes.control}>
   
            <input 
              type='password'
              id='password'
              placeholder='Password'
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
            <div className={classes.toggleContainer}>
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
            </div>
          </div>
        </form>
      </section>
      </div>
   
    </Fragment>
  );
}


export default AuthForm;




