import React,{useEffect} from 'react'

const StockProduct = (props) => {
  useEffect(() => {
    props.setPageTitle('Kelola Stok Produk');
  },[props])

  return (
    <div>StockProduct</div>
  )
}

export default StockProduct