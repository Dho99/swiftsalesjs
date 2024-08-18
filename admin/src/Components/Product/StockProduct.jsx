import React,{useEffect} from 'react'
import Refresh from "../Token/Refresh";


const StockProduct = (props) => {
  useEffect(() => {
    props.setPageTitle('Kelola Stok Produk');
  },[props])

  return (
    <>
    <Refresh/>
    <div>StockProduct</div>
    </>
  )
}

export default StockProduct