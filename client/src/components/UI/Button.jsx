const Button = ({ label }) => {
  return (
    <button className="flex justify-center items-center gap-2 px-8 py-3.5 border font-montserrat text-lg leading-none bg-primary rounded-full text-[#ffff] ">
      {label}
    </button>
  );
};

export default Button;
