import React from 'react'

function Button(
    {
        children,
        className = '',
        onClick,
        type,
        ...props
    }
) {
  return (
    <button
        className={`           
          text-[15px] capitalize text-(--button-text-color) hover:text-(--button-hover-text-color)
          bg-(--button-bg-color) hover:bg-transparent border border-(--button-bg-color) hover:border-(--button-hover-text-color)
          px-8 py-2 rounded transition-all duration-300"
     ${className}`}
        onClick={onClick}
        type={type}
        {...props}
    >
        {children}
    </button>
  )
}

export default Button