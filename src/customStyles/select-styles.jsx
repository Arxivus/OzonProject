const selectStyles = {
    control: (provided) => ({
        ...provided,
        width: "320px",
        fontSize: "18px",
        borderRadius: "8px",
        border: "none",
        boxShadow: "var(--shadow)",
        fontFamily: "Inter",
        padding: "0px 8px",
    }),

    menu: (provided) => ({
        ...provided,
        width: "320px",
        borderRadius: "8px",
        boxShadow: "var(--shadow)",
    }),

    option: (provided, state) => ({
        ...provided,
        maxWidth: "400px",
        backgroundColor: state.isSelected ? "var(--bg-accent-lite)" : state.isFocused ? "var(--bg-accent-lite)" : "white",
        color: state.isSelected ? "white" : "black",
        padding: "8px",
        fontSize: "16px",
    }),

    singleValue: (provided) => ({
        ...provided,
        color: "#000",
    }),
}

export default selectStyles