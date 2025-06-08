const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-2">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer flex-row-reverse justify-start ${
            selectedGender === "male" ? "bg-gray-700 rounded-lg px-2" : ""
          }`}
        >
          <span className="label-text">Male</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer flex-row-reverse justify-start ${
            selectedGender === "female" ? "bg-gray-700 rounded-lg px-2" : ""
          }`}
        >
          <span className="label-text">Female</span>
          <input
            type="checkbox"
            className="checkbox border-slate-900"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
