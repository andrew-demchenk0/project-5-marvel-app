import './spinner.scss';


const Spinner = () =>{
    return (
        <div className="loader">
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{ "--i": i + 1 }} className="loader_item" />
        ))}
      </div>      
    )
}

export default Spinner;