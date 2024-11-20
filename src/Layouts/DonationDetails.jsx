import {  useLoaderData } from 'react-router-dom'
import DeatailsCard from './DeatailsCard';
import ErrorPage from './ErrorPage';

const DonationDetails = () => {
    const data=useLoaderData();
    const dataType=typeof(data);
    const obj=data[0];
    // console.log(dataType)
  return (
    <div>
        {/* <h2>{`${data&&}`}</h2> */}
        {data&&dataType=='object' ?<DeatailsCard data={obj}/>:<ErrorPage />}
       
    </div>
  )
}

export default DonationDetails