    // export const SortProductByDiscount = (products) => {
    //     products.sort((a,b) => {
    //         return (b.price - b.salePrice) - (a.price - a.salePrice);
    //     })
    //     const newSaleProducts = products.slice(0, 5);
        
    //     return handlePercentDiscount(newSaleProducts);
    // }

export const handlePercentDiscount = (products) => { 
        const newList = products.map(product => {
            const percentDiscount = 100 - Math.round(product.salePrice * 100 / product.price) ;
            // const price = formatPrice(product.price)
            // const salePrice = formatPrice(product.salePrice)


            return {...product, percentDiscount: percentDiscount}
        })
        return newList;
    }

export const formatPrice = (price) => {
        const formatter = new Intl.NumberFormat('vi')
        return formatter.format(price)
    }

export const getFirstCharacterUser = (name) => {
        const arrCharacter = name.split('')[0]
        return arrCharacter
    } 

export const formatDateOrderPaypal = (timestamp) => {
        const d = new Date( timestamp );
        // const date = d.toDateString() + "    ,   Time  :   " + d.getHours() + ":" + d.getMinutes() ;  ('0' + (d.getMonth() + 1))) + '/' + ((d.getDate() > 9)
        // const date =((d.getMonth() > 8) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '/' + ((d.getDate() > 9) ? d.getDate() : ('0' + d.getDate())) + '/' + d.getFullYear() + "    ,   Time  :   " + d.getHours() + ":" + d.getMinutes() ;
        const date =((d.getMonth() > 8) ?
        d.getDate():  ('0' + d.getDate())) + '/' + ((d.getDate() > 9) ? 
         (d.getMonth() + 1) :  ('0' + (d.getMonth() + 1))) + '/' + d.getFullYear() + "    ,   Time  :   " + d.getHours() + ":" + d.getMinutes() ;
        return date
    } 
    
export const  timeSince = (date) => {
        let seconds = Math.floor((Number(Date.now()) - Number(date) * 1000) / 1000);
        let interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " năm";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " tháng";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " ngày";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " giờ";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " phút";
        }
        return Math.floor(seconds) + " giây";
      }

