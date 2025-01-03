const Input = ({ placeholder, value, type = "text", onChange, disabled, label }) => {
    return (
        <div className="w-full">
            {label && <p className="text-xl text-white font-semibold mb-2">{label}</p>}
            <input
            disabled={disabled}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            type={type}
            className="
                w-full
                p-4
                text-lg
                bg-black
                border-2
                border-neutral-800
                rounded-md
                outline-none
                text-white
                focus:border-sky-400
                focus:border-2
                transition
                disabled:bg-neutral-900
                disabled:opacity-70
                disabled:cursor-not-allowed
            "
            />
        </div>
    )
}

export default Input;