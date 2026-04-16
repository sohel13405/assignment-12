const LoadingSpinner = ({ size = "md", color = "black" }) => {
    const sizes = {
      sm: "w-6 h-6 border-2",
      md: "w-10 h-10 border-4",
      lg: "w-16 h-16 border-4",
    };
  
    return (
      <div className="flex items-center justify-center w-full py-10">
        <div
          className={`
            ${sizes[size]}
            rounded-full
            border-${color}
            border-t-transparent
            animate-spin
          `}
        />
      </div>
    );
  }
  export default LoadingSpinner;