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
            text-[15px] font-medium capitalize text-(--button-text-color) bg-(--button-bg-color)
            hover:bg-(--button-hover-bg-color) border border-(--button-bg-color)
            hover:border-(--button-hover-bg-color) px-8 py-2 rounded transition-all duration-150
            active:scale-95 active:translate-y-0.5 
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