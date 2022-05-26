//Товар
class Product {
    constructor(property={}, price=0, image="img/1.jpg"){
        this.image=image
        this.property=property;
        console.log(this.property)
        this.id=this.property.id.value;
        this.name=this.property.name.value;
        this.price=0;
        if((price>0) && (!isNaN(price))){
            this.price=price;
        }
      
    }

    endOfTheWordPrice(){
        let val = Math.round(this.price) % 10
        if((val==0)||((val>=5) && (val<=9)))return "Рублей";
        else if(val==1)return "Рубль";
        else return "Рубля";   
    }
    //Построение разметки карточки товара на странице
    generatePageHTML(){
        //Разметка блока харрактеристик товара
        let propertyHTML = "<ul>"
        for (var key in this.property){
            if((key!="id") && (key!="name") && (key!="brend") && (key!="type")){
                propertyHTML+=`<li> ${this.property[key].key} - ${this.property[key].value} </li>`
            }
           
        } 
        propertyHTML+="<ul>"
        //Разметка блока товара целиком
        let HTML =
        ` 
        <div class="productCard">      
            <img src="${this.image}" alt="Картинки нету">                    
            <div class="productCardText">
                <div class="productCardTextName">
                   <h3> ${this.property.name.value} </h3>
                </div>
                <div class="productCardTextType">
                    <p>Тип микросхемы - ${this.property.type.value} </p>
                </div>
                <div class="productCardTextType">
                    <p>Производитель - ${this.property.brend.value} </p>
                </div>
                <div class="productCardTextProperty">
                    <p> Характеристики: </p>
                    <div>${propertyHTML}</div>
                </div>
                <div class="productCardTextPrice">
                    <h4>${this.price} ${this.endOfTheWordPrice()} </h4>
                </div>
            </div>
            <button data-id="${this.id}">
                    Добавить
            </button>

        </div>
        `
        return HTML
    }
}

/*
    Список товаров.
        Позже здесь будут методы для предварительной сортировки и фильтрации перед тем, как генерировать HTML код
*/
class Products{
    constructor(products=[]){
        this.products=products;
    }
    add(product){
        this.products.push(product)
    }
    generatePageHTML(){
        /*
          map использует toString , который разделяет элементы массива запятыми
          поэтому используем join с пустым аргументом
        */
        return this.products.map(product=>product.generatePageHTML()).join("");
    }
}