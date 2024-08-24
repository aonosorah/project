import { useState, useEffect } from 'react';
import { fetchUsers } from '../utility/api';
import { IUser } from '../models/user';
import UserModal from '../components/modal';

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleFetchUsers = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((value, key) => value[key], obj);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers: IUser[] = [...filteredUsers].sort((a, b) => {
    if (sortColumn) {
      const valueA = getNestedValue(a, sortColumn);
      const valueB = getNestedValue(b, sortColumn);

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
    }
    return 0;
  });

  const handleUserClick = (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th
              className="border p-2 text-white cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name{' '}
              {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="border p-2 text-white cursor-pointer"
              onClick={() => handleSort('username')}
            >
              Username{' '}
              {sortColumn === 'username' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="border p-2 text-white cursor-pointer"
              onClick={() => handleSort('email')}
            >
              Email{' '}
              {sortColumn === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="border p-2 text-white cursor-pointer"
              onClick={() => handleSort('phone')}
            >
              Phone{' '}
              {sortColumn === 'phone' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="border p-2 text-white cursor-pointer"
              onClick={() => handleSort('address.city')}
            >
              City{' '}
              {sortColumn === 'address.city' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th
              className="border p-2 text-white cursor-pointer"
              onClick={() => handleSort('company.name')}
            >
              Company{' '}
              {sortColumn === 'company.name' &&
                (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id} onClick={() => handleUserClick(user)}>
              <td className="border p-2 text-white">{user.name}</td>
              <td className="border p-2 text-white">{user.username}</td>
              <td className="border p-2 text-white">{user.email}</td>
              <td className="border p-2 text-white">{user.phone}</td>
              <td className="border p-2 text-white">{user.address.city}</td>
              <td className="border p-2 text-white">{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
