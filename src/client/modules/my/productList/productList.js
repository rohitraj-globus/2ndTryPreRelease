/* eslint-disable no-alert */
import { LightningElement, track } from 'lwc';

var index=0;
var allPro,listOfProducts,bannerImages = [];
var clickedProduct;
var slideIndex = 1;

export default class ProductList extends LightningElement {
    @track allProducts = [];
    @track products = [];
    @track listOfProducts =[];
    @track bannerImages = [];
    @track clickedProduct;
    @track mainImageUrl;

    //@api recordId;

    connectedCallback() {
        fetch('data/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                this.products = this.allProducts = allPro = products;
                this.bannerImageArray(products);
            });
    }

    bannerImageArray(products){
        bannerImages =[];
        for(let i=0 ; i<products.length ; i++){
            if(products[i].category === 'Banner Image'){
                bannerImages.push(products[i]);
            }
        }
        this.bannerImages=bannerImages;
        console.log(bannerImages);
        
         // carousel
        //this.showSlides(slideIndex);

        let self = this;
        this.timer = setInterval(function() {
            self.showSlides(slideIndex);
            slideIndex++;
        }, 7000);
    }

    categoryClicked(event){
        var category = event.currentTarget.getAttribute("data-id");
        var initialEle = document.getElementById("myAppEle");
        var ele = initialEle.shadowRoot.childNodes;
        this.elementIndexPickerById(ele,'contentEle-1');
        ele = ele[index].getElementsByClassName('myProductListEle');
        ele = ele[0].shadowRoot.childNodes;
        //this.elementIndexPickerById(ele,'myProductListEle-1');
        ele[1].getElementsByClassName('firstPage')[0].classList.add('hide');
        ele[1].getElementsByClassName('secondPage')[0].classList.remove('hide');
        //console.log(ProductItemTile);
        //ele[3].innerHTML =  ;
        //alert(category);
        console.log(category);
        this.listOfProductsOnBasisOfcategory(category);
    }

    productClicked(event){
        var product = event.currentTarget.getAttribute("data-id");
        var initialEle = document.getElementById("myAppEle");
        var ele = initialEle.shadowRoot.childNodes;
        this.elementIndexPickerById(ele,'contentEle-1');
        ele = ele[index].getElementsByClassName('myProductListEle');
        ele = ele[0].shadowRoot.childNodes;
        //this.elementIndexPickerById(ele,'myProductListEle-1');
        ele[1].getElementsByClassName('secondPage')[0].classList.add('hide');
        ele[1].getElementsByClassName('thirdPage')[0].classList.remove('hide');

        this.clickedProductDetail(listOfProducts,product);
        console.log(product);
        console.log(listOfProducts);
    }
    elementIndexPickerByClassName(element,searchParameter){
        var i = index = 0;
        element.forEach(childNode => {
            if(childNode.id === searchParameter){
                index = i ;
                return 0;
            }else{i++;}
        })
    }

    elementIndexPickerById(element,searchParameter){
        var i = index = 0;
        element.forEach(childNode => {
            if(childNode.id === searchParameter){
                index = i ;
                return 0;
            }else{i++;}
        })
    }

    listOfProductsOnBasisOfcategory(category){
        listOfProducts =[];
        for(let i=0 ; i<allPro.length ; i++){
            if(allPro[i].category === category){
                listOfProducts.push(allPro[i]);
            }
        }
        this.listOfProducts=listOfProducts;
    }

    clickedProductDetail(duplicateListOfProducts,productId){
        for(let i=0 ; i<listOfProducts.length ; i++){
            if(listOfProducts[i].sfid === productId){
                clickedProduct = listOfProducts[i];
            }
        }
        this.clickedProduct=clickedProduct;
        this.mainImageUrl = clickedProduct.picture;
    }

    changeImg(event){
        this.mainImageUrl = event.currentTarget.getAttribute("data-id");
    }

    /* Image Carousel */
    
    
    /*
    setInterval(function(){ 
    slideIndex++;
    showSlides(slideIndex);
    }, 7000);  // Change image every 7 seconds
    
    function plusSlides(n) {
    showSlides(slideIndex += n);
    //clearInterval(interval);
    }

    function currentSlide(n) {
    showSlides(slideIndex = n);
    }
    */

    showSlides(n){
        let i;
        //var slides = document.getElementsByClassName("mySlides");
        //var dots = document.getElementsByClassName("dot");

        var initialEle = document.getElementById("myAppEle");
        var ele = initialEle.shadowRoot.childNodes;
        this.elementIndexPickerById(ele,'contentEle-1');
        ele = ele[index].getElementsByClassName('myProductListEle');
        ele = ele[0].shadowRoot.childNodes;
        let slides = ele[1].getElementsByClassName('mySlides');
        ele[1].getElementsByClassName('gallery')[0].classList.remove('hide');
        let removeAnimation = ele[1].getElementsByClassName('animate') ; 
        for(let a=0 ; a<removeAnimation.length; a++){
            removeAnimation[a].classList.remove('animate');
        }
        //let dots = ele[1].getElementsByClassName('dot');
        if (n > slides.length) {slideIndex = 1}    
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
        }
        slides[slideIndex-1].style.display = "block";  
    /*for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    //dots[slideIndex-1].className += " active";
    */
    }
    /* Image Carousel */


    //on change of Quantity, append that in the correct array element
    /*handleQuantityChange(event) {
        const productId = event.detail.productId;
        const qty = event.detail.quantity;
        if (qty > 0) {
            for (let i = 0; i < this.allProducts.length; i++) {
                if (this.allProducts[i].id === productId) {
                    this.allProducts[i].quantity = qty;
                }
            }
        }
    }*/

    //this will search on product name based on search input
    /*handleSearchKeyChange(event) {
        const searchKey = event.target.value.toLowerCase();
        this.products = this.allProducts.filter(product =>
            product.name.toLowerCase().includes(searchKey)
        );
    }*/

    /*
    handleClick(){
        //now call apex controller to insert the order items.
        submitOrder({contactId: this.recordId,
                    productList: JSON.stringify(this.allProducts)})
           
            .then(result => {
                alert(result);
            })
            .catch(error => {
                alert(error.body.message);
            });
        
    }
    */

    /*handleClick() {
        let emailaddress = this.template.querySelector('.emailaddress').value;
        let obj = {
            email: emailaddress,
            productList: JSON.stringify(this.allProducts)
        };
        if (emailaddress.length === 0) {
            // eslint-disable-next-line no-alert
            alert('Please enter email address');
        } else {
            fetch('data/placeOrder', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(obj), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // eslint-disable-next-line no-alert
                    alert(data);
                });
        }
    }*/
}
/*const yoyo = (event) => {
    return 'rohit';
}
export (yoyo) */
