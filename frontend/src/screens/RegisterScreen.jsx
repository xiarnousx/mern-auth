import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [register, {isLoading, error}] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      
      if (password !== confirm) {
        return toast.error(`Password do not match`);
      }

      const res = await register({
        name,
        email,
        password
      }).unwrap();

      dispatch(setCredentials({...res}));
      navigate("/", {replace: true});
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className='my-2' controlId='confirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder='Confirm password' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </Form.Group>
        {isLoading && <Loader />}
        <Button type="submit" variant='primary' className='mt-3'>Sign up</Button>
        <Row className='py-3'>
          <Col>Already a Customer? <Link to="/login">Login</Link></Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default RegisterScreen