import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div>
      <div className="max-w-md m-6">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
