import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@Components/Button';
import { Cancel, CheckCircle } from '@material-ui/icons';

export default (h) => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="flex-standard flex-column mt-5">
      {isSuccess ? (
        <div className="text-center">
          <h1 className="text-dark">Upload Successful !</h1>
          <CheckCircle className="my-5" style={{ fontSize: 200, color: '#03A69A' }} />
          <h2 className="text-dark">Data will be updated shortly !</h2>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-dark">Upload Unsuccessful !</h1>
          <Cancel className="my-5" style={{ fontSize: 200, color: '#03A69A' }} />
          <h2 className="text-dark">Upload unsuccessful, please retry in a moment !!!</h2>
        </div>
      )}
      <Link to="/asset">
        <Button className="mt-5">
          RETURN TO HOMEPAGE
        </Button>
      </Link>
    </div>
  );
};
