import React,{useEffect} from 'react';
import {useLocation} from 'react-router-dom';

const NotFound = (props) => {
    useEffect(() => {
        props.setPageTitle('Page Not Found');
    },[]);

    const location = useLocation();


  return (
    <div className='h-[60vh] place-content-center flex'>
        <div className="place-content-center text-center">
            <p className='text-2xl font-semibold'>Ooops, Sorry</p>
            <p>Page with url <span className='font-bold mx-2 bg-slate-400 rounded'>{`"${location.pathname}"`}</span> is not found</p>
        </div>
    </div>
  )
}

export default NotFound