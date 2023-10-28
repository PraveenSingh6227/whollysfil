const CheckBox = ({ filters, handleCheckBox }) => {
    return (
        <>
            {filters.map((item, id) => (
                <div key={id}>
                    <div className="row">
                        <div className="col-md-1">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name={item.name}
                                value={item.value}
                                checked={item.checked}
                                onChange={(e) => handleCheckBox(e)}
                                id={item.value}
                                
                            />
                            <label className="form-check-label" htmlFor={item.value} style={{textTransform:"capitalize"}}></label>
                        </div>
                        <div className="col-md-3">
                            <span style={{background: item.value,display: 'block',width: '26px',height: '26px',borderRadius: '40px'}}></span>
                        </div>
                    </div>
                    <br/>
                </div>
            ))}
        </>
    );
};

export default CheckBox;
