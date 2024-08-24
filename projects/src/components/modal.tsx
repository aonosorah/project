import React from 'react';
import { IUserModalProps } from '../models/user';

const UserModal: React.FC<IUserModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white  shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>City:</strong> {user.address.city}
        </p>
        <p>
          <strong>Zipcode:</strong> {user.address.zipcode}
        </p>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
        <p>
          <strong>Catch Phrase:</strong> {user.company.catchPhrase}
        </p>
        <p>
          <strong>Business Service:</strong> {user.company.bs}
        </p>
        <p>
          <strong>Website:</strong> {user.website}
        </p>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-sky-400 text-white p-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
