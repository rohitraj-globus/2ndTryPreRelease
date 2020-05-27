import { LightningElement, api } from 'lwc';
//import $ from "jquery";
import ProductList from '../productList/productList';
//import { yoyo , categoryClicked1 } from '../productList/productList';

let index = 0;
//let ProductList1 = new ProductList();


export default class headerOne extends LightningElement {
    @api product;

    //this will search on product name based on search input
   toggleMenu(component, event, helper) {
    var initialEle = document.getElementById("myAppEle");
    var ele = initialEle.shadowRoot.childNodes;
    this.elementIndexPickerById(ele,'myHeaderEle-1');
    ele = ele[index].shadowRoot.childNodes;
    this.elementIndexPickerByClassName(ele,'rr_menuContainer');
    //ele[index].classList.toggle('hide');
    ele[index].getElementsByClassName('rr_mobileMenu')[0].classList.toggle('hide');
    component.preventDefault();
    console.log(index);
        //const searchKey = event.target.value.toLowerCase();
        //this.products = this.allProducts.filter(product =>
          //  product.name.toLowerCase().includes(searchKey)
        //);
    }
    homeClicked(component, event, helper){
        var initialEle = document.getElementById("myAppEle");
        var ele = initialEle.shadowRoot.childNodes;
        this.elementIndexPickerById(ele,'contentEle-1');
        ele = ele[index].getElementsByClassName('myProductListEle');
        ele = ele[0].shadowRoot.childNodes;
        ele[1].getElementsByClassName('firstPage')[0].classList.remove('hide');
        ele[1].getElementsByClassName('secondPage')[0].classList.add('hide');
        ele[1].getElementsByClassName('thirdPage')[0].classList.add('hide');
        this.toggleMenu(component, event, helper);
    }
    categoryClicked(component, event, helper){
        //var termOptions = yoyo();
        //termOptions = categoryClicked1('rohit');
        this.toggleMenu(component, event, helper);
        //ProductList1.categoryClicked(component);
        
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
    elementIndexPickerByClassName(element,searchParameter){
        var i = index = 0;
        element.forEach(childNode => {
            if(childNode.className === searchParameter){
                index = i ;
                return 0;
            }else{i++;}
        })
    }
    /*handleQuantityChange(event) {
        this.dispatchEvent(
            new CustomEvent('qtyupdate', {
                detail: {
                    productId: this.product.id,
                    quantity: event.target.value
                }
            })
        );
    }*/
}
