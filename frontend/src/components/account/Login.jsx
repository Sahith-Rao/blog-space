import { useState } from 'react';
import { Box,TextField,Button,styled,Typography } from '@mui/material';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 /0.6);
`
const Image = styled(`img`)({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'

})

const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    height: 48px;
    border-radius: 2px;
`;

const SignupButton = styled(Button)`
    text-transform: none;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`;


const Login = () => {
    const imageURL = 'https://cdn-icons-png.flaticon.com/512/10026/10026257.png';
    const [account,toggleAccount] = useState('login');
    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }
    return (
        <Component>
            <Box>
                <Image src = {imageURL} alt = "login" />
                {
                    account === 'login' ?
                        <Wrapper>
                            <TextField variant='filled' label = "Enter Username"/>
                            <TextField variant='filled' label = "Enter Password"/>
                            <LoginButton variant='contained'>Login</LoginButton>
                            <Text>OR</Text>
                            <SignupButton variant='outlined' onClick={() => toggleSignup()}>Create an account</SignupButton>
                        </Wrapper> 
                    :
                        <Wrapper>
                            <TextField variant='filled' label = "Enter Name"/>
                            <TextField variant='filled' label = "Enter Username"/>
                            <TextField variant='filled' label = "Enter Password"/>
                            <SignupButton variant='contained'>Signup</SignupButton>
                            <Text>OR</Text>
                            <LoginButton variant='outlined' onClick={() => toggleSignup()}>Already have an account?</LoginButton>
                        </Wrapper>
}
            </Box>
            
        </Component>
    )
}

export default Login;