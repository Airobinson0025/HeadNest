import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="max-w-md m-6">
      <div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
