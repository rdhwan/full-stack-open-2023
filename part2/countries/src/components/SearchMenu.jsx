const SearchMenu = ({ onInputChange }) => {
    return (
      <div>
        find countries
        <input onChange={onInputChange}></input>
      </div>
    );
  };


  export {SearchMenu}