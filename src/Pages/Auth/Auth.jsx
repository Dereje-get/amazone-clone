import React,{useState, useContext} from 'react'
import classes from './Signup.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../../Utility/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import {ClipLoader} from 'react-spinners'

function Auth() {
    const [ email, setEmail ] = useState("")
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState({
        signIn: false,
        signUp:false
    })

    const [{ user }, dispatch] = useContext(DataContext)
    const navigate = useNavigate()
    const navStateData = useLocation()
    console.log(navStateData);
    
    console.log(user);

    const authHandler = async(e) => {
        e.preventDefault() 
        console.log(e.target.name); 
        if (e.target.name == 'signin') {
            setLoading({...loading, signIn:true})
            signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
                dispatch({
                    type: Type.SET_USER,
                    user: userInfo.user,
                })
                setLoading({ ...loading, signIn: false })
                navigate(navStateData?.state?.redirect || "/");
            }).catch ((error) => {
                setError(error.message);
                setLoading({ ...loading, signIn: false });
            })

        } else {
            setLoading({ ...loading, signUp: true });
            createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
                dispatch({
                    type: Type.SET_USER,
                    user: userInfo.user,
                })
                setLoading({ ...loading, signUp: false });
                navigate(navStateData?.state?.redirect || "/");
            }).catch((error) => {
                setError(error.message);
                setLoading({ ...loading, signUp: false });
            })
        }
    
    }
    
    // console.log(password, email);
    return (
        <section className={classes.login}>
            <Link to={"/"}>
                <img src="https://download.logo.wine/logo/Amazon_(company)/Amazon_(company)-Logo.wine.png" alt="" />
            </Link>
            <div className={classes.login__container}>
                <h1>Sign-in</h1>
                {navStateData?.state?.msg && (
                    <small style={{
                        padding: '5px',
                        textAlign: 'center',
                        color: 'red',
                        fontWeight: 'bold',
                }}>
                        {navStateData?.state?.msg}
                    </small>
                )}
                <form action="">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email'/>
                    </div>
                    <div>
                        <label htmlFor="password">password</label>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password'/>
                    </div>
                    <button type='submit' name='signin' onClick={authHandler} className={classes.login__signInButton}>
                        {
                            loading.signIn? (<ClipLoader color='#000' size={15}></ClipLoader>): ('Sign-In')
                        }
                        </button>
                </form>
                <p>By signing-in you agree to the AMAZON FAKE CLONE conditions of Use &Sale. Please see our Privecy Notice, our COOKIES NOTICE and our Interst- Based Ads Notice</p>
                <button type='submit' name='signup' onClick={authHandler} className={classes.login__registerButton}>
                {
                            loading.signUp? (<ClipLoader color='#000' size={15}></ClipLoader>): ('Create Your Amazon Account')
                        }
                    </button>
                {error && <small style={{ paddingTop: '5px', color: 'red' }}>{error}</small>}
            </div>
        </section>
    );
}

export default Auth