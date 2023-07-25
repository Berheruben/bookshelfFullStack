import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<{ userId: string }>(); // Explicitly type the form data
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of users from the backend API
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://localhost:8081/user/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const onSubmit: SubmitHandler<{ userId: string }> = (data) => { 
    const selectedUser = users.find((user) => user.id === parseInt(data.userId, 10));
    if (selectedUser) {
      // Redirect to the list of books page on successful "login"
      navigate(`/books/${selectedUser.id}`);
    } else {
      alert('Invalid user. Please select a valid user.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-3xl font-semibold mb-6">Login</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="userId" className="block font-medium mb-2 text-red-500">
              Select User
            </label>
            <select
              id="userId"
              className="w-full border border-gray-300 rounded-md p-2"
              {...register('userId', { required: true })}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="button" // Change the button type to "button" instead of "submit"
              onClick={handleSubmit(onSubmit)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
