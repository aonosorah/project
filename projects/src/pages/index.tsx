import { useState } from 'react';
import { fetchUsers } from '../utility/api';
import { IUser } from '../models/user';

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFetchUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Users</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 w-full text-black-700 bg-red-80"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 mt-2"
          onClick={handleFetchUsers}
        >
          Fetch Users
        </button>
      </div>
      <table className="table-auto w-full border-collapse text-white">
        <thead>
          <tr>
            <th className="border p-2 text-white">Name</th>
            <th className="border p-2 text-white">Username</th>
            <th className="border p-2 text-white">Email</th>
            <th className="border p-2 text-white">Phone</th>
            <th className="border p-2 text-white">City</th>
            <th className="border p-2 text-white">Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.phone}</td>
              <td className="border p-2">{user.address.city}</td>
              <td className="border p-2">{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
