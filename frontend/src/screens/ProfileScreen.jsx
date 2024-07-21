import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';
import { useProfileMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [update, {isLoading, error}] = useProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      
      if (password !== confirm) {
        return toast.error(`Password do not match`);
      }

      const res = await update({
        _id: userInfo._id,
        name,
        email,
        password
      }).unwrap();

      dispatch(setCredentials({...res}));
      toast.success('Profile Updated');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <FormContainer>
      <h1>Update Profile</h1>
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
        <Button type="submit" variant='primary' className='mt-3'>Update Profile</Button>
      </Form>
    </FormContainer>
  )
}

export default ProfileScreen