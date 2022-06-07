//Товар
class Product {
    constructor(property={}, price=0){
       
        this.property=property;
        this.id=this.property.id.value;
        this.image=`img/${this.id}.jpg`;
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

    //Запрос серверу на получение списка товаров
    getProductsFromServer(url, obj){
        let fetchPromise = fetch(url);
        fetchPromise.then(promiseResult=>{
           console.log(promiseResult)
           /*
             Если получать данные с сайта, который указан
             в методичке, то promiseResult.json() делать не нужно и так данные в JSON,
             а если с сервера, который в этом проекте, то нужно. Видимо браузер не понял
             что это JSON. Наверное нужно заголовок ответа редактировать.
           */
           promiseResult.json().then(data =>{
               //console.log(data)
               this.products = []
               //То что пришло с сервера копируем в объекты
               //И добавляем эти обьекты в массив товаров 
               for(let i=0; i<data.Data.length;i++){
                    let newProduct = new Product(new CPU(),100)
                    newProduct.price=data.Data[i].Price;
                    newProduct.id=data.Data[i].Property.Id;
                    newProduct.name=data.Data[i].Property.Name;
                    newProduct.image=`img/${newProduct.id}.jpg`;
                    for(let key in data.Data[i].Property){
                        let key_lowwer_case = String(key);
                        key_lowwer_case=key_lowwer_case.toLowerCase()
                        newProduct.property[key_lowwer_case].value=data.Data[i].Property[key]
                    }  
                   //console.log(newProduct)
                   this.products.push(newProduct)   
               }
               
              
               obj.innerHTML = this.generatePageHTML()
           })
           //Обработка ошибок
           .catch(err =>{
               console.log("Ошибка") 
           })   
           
        })
        //Обработка ошибок
        .catch(err =>{
            console.log("Ошибка")     
        })     
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