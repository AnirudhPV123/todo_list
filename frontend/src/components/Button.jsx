import React from 'react'

function Button({type,children,...props}) {
  return (
    <button type={type} {...props} className="hover:bg-green-700 duration-150 bg-white hover:text-white text-black text-2xl font-semibold w-full py-2 rounded-sm">
      {children}
    </button>
  );
}

export default Button
