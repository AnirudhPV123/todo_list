import React,{useId} from 'react'

function InputBox({placeholder,type="text",...props},ref) {
  const id = useId()
  return (
    <input
      type={type}
      className="w-full h-12 bg-transparent outline-none text-lg border rounded-sm  px-3 mb-3"
      placeholder={placeholder}
      {...props}
      ref={ref}
      id={id}
    />
  );
}

export default React.forwardRef(InputBox)
