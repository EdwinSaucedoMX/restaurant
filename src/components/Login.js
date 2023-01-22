import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

const Login = () => {
    const [register, setRegister] = useState(false);

    const handleRegister = () => {
        setRegister(!register);
    }

    return (
        <>
            <Form>
                {!register && <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <br />
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <br />
                    <br />
                    <Form.Text className="text-muted">
                        For testing purposes, you can use the following credentials:
                        <br />
                        Email: root
                        <br />
                        Password: admin
                    </Form.Text>
                    <br />
                    <br />
                    <Form.Text>
                        Don't have an account? <a role='button' onClick={handleRegister}>Sign up</a>
                    </Form.Text>
                </Form.Group>}

                {register && <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    <br />
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    
                </Form.Group>}
            </Form>
        </>

    );
}

export default Login;