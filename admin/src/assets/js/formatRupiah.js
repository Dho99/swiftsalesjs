const formatRupiah = (number) => {
    let rupiah = number.toLocaleString("id-ID");
    return `Rp. ${rupiah}`;
}

export default formatRupiah;