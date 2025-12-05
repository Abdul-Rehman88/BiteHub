import React from 'react'

function Button(
    {
        children,
        className,
        onClick,
        type,
        ...props
    }
) {
  return (
    <button
        className={className}
        onClick={onClick}
        type={type}
        {...props}
    >
        {children}
    </button>
  )
}

export default Button