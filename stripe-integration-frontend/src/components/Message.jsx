import React from 'react';

const Message = ({ type, text }) => {
  return (
    <p className={`text-sm ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
      {text}
    </p>
  );
};

export default Message;
