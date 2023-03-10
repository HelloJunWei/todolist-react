import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import  Swal  from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext'

const SignUpPage = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate();

  const  handleClick = async() => {
     if (username.length === 0) {
       return;
     }

     if (password.length === 0) {
       return;
     }

     if(email.length === 0){
      return;
     }

    const success = await register({
      username,
      password,
      email,
    });
    
    if(success){
      Swal.fire({
        title:'註冊成功',
        icon: 'success',
        showConfirmButton: false,
        position: 'top',
        timer: 1000
      })
      return
    }
    Swal.fire({
      title: '註冊失敗',
      text: '帳號或信箱已存在',
      icon: 'error',
      showConfirmButton: false,
      position: 'top',
      timer: 1000,
    });
  }

  useEffect(() => {
    if(isAuthenticated){
      navigate('/todo')
    }
  }, [navigate, isAuthenticated]);

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          value={username}
          placeholder={'請輸入帳號'}
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          label={'Email'}
          value={email}
          placeholder={'請輸入 email'}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder="請輸入密碼"
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
