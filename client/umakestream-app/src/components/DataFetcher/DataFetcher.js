import React, { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import CustomLoader from '../CustomLoader/CustomLoader';
import MovieSlider from '../MovieSlider/MovieSlider'

const RequestStatus = {
  FAILURE: 'failure',
  SUCCESS: 'success',
  IN_PROGRESS: 'inProgress',
};

const DataFetcher = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(RequestStatus.IN_PROGRESS);

  const fetchData = useCallback(async () => {
    try {
      const jwtToken = Cookies.get('jwt_token');
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoading(RequestStatus.SUCCESS);
      } else {
        setLoading(RequestStatus.FAILURE);
      }
    } catch (error) {
      setLoading(RequestStatus.FAILURE);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderFetchData = () => {
    switch (loading) {
      case RequestStatus.SUCCESS:
        return  <div>
                 <MovieSlider data={data.message} />

      </div>;
      case RequestStatus.IN_PROGRESS:
        return <CustomLoader height="85vh" width="100vw" />;
      case RequestStatus.FAILURE:
        return (
          <div>
            <p>Failure</p>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderFetchData()}</>;
};

export default DataFetcher;
