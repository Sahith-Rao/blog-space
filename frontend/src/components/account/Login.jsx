import { Box,TextField,Button,styled } from '@mui/material';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0 /0.6);
`
const Image = styled(`img`)({
    width: 100,
    margin: 'auto',
    display: 'flex'

})
const Login = () => {
    const imageURL = 'https://cdn-icons-png.flaticon.com/512/10026/10026257.png';

    return (
        <Component>
            <Image src = {imageURL} alt = "login" />
            <TextField variant='filled'/>
            <TextField variant='filled'/>
            <Button variant='contained'>Login</Button>
            <Button variant='outlined'>Create an account</Button>
        </Component>
    )
}

export default Login;