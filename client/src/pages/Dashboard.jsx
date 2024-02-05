import React from 'react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <>
      <h1>DASHBOARD</h1>
      <Link to="/login" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Log in
      </Link>
    </>
  );
};