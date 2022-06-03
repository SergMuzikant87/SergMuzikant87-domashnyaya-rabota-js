//Корзина с товарами. 
//    Здесь будет считаться общая стоимость скидки количество товара
//    а так же генерироваться разметка содержимого корзины

class Cart{
    constructor(){
        this.products = [];
        this.summNoDiscount = 0.0;
        this.summ = 0.0;
        this.count = 0;
        this.discount=0.0
    }
    //Запрос серверу на добавление товара в корзину
    addProduct(){
       
        
    }
    //Запрос серверу на удаление товара из корзины 
    removeProduct(product){

    }

    //Запрос серверу на очистку корзины
    clearCart(){
        const url = "/cart_clear"
        fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(() => {
         
        })
        .catch(()=>{

        })
    }
    
    //Запрос серверу на получение товаров
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
               console.log(data)
               //Очистка списка товаров, обнуление суммы и т п
               this.products = []
               this.summNoDiscount = 0.0;
               this.summ = 0.0;
               this.count = 0;
               this.discount=0.0
               //То что пришло с сервера копируем в объекты
               //И добавляем эти обьекты в массив товаров 
               for(let i=0; i<data.Data.length;i++){
                    let newProduct = {
                        id: data.Data[i].Product.Property.Id,
                        name:data.Data[i].Product.Property.Name,
                        price: data.Data[i].Product.Price,
                        count: data.Data[i].Count,
                        discount: 0.0,
                        total: 0.0
                    }
                   this.products.push(newProduct)
               }
               //Считаем скидки, стоимость товаров
               //Вообще это нужно считать на сервере по сути  
               this.totalUpdate()
               obj.innerHTML = this.generatePartHTML()
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

    /**
     * Пересчёт итоговой стоимости товаров. На входе точки линейной интерполяции, по которой будут скидки.
     * @param {*} x Линейная интерполяция расчёта скидок. Входной массив количества товаров. Значения должны быть по возрастанию и положительные.
     * @param {*} y Линейная интерполяция расчёта скидок. Входной массив скидок. Значения должны быть от 0 до 1. И чаще они идут по возрастанию.
     */
     totalUpdate(x=[1,5,10,100],y=[0.0,0.1,0.15,0.30]){
        if(this.products.length>0)
        {
            this.summ=0.0;
            this.summNoDiscount=0.0;
            this.discount=0.0;
            this.count=0;
            for(let i=0; i<this.products.length;i++)
            {
                /*
                    Сначала вычислим скидку на каждый из товаров в корзине. 
                    Скидку для каждого товара считаем при помощи линейной интерполяции.
                    Координаты точек линейной интерполяции в массивах на входе функции. 
                    Вообще нужно сначала отсортировать массив x по возрастанию, но не будем этого делать
                */
                   
                if(this.products[i].count<=x[0]) 
                {
                    //Обработка выхода за пределы нижнего значения
                    this.products[i].discount=y[0];
                }
                else if (this.products[i].count>=x[x.length-1]) 
                {
                    //Обработка выхода за пределы верхнего значения
                    this.products[i].discount=y[y.length-1]
                }
                else
                {
                    //Непосредственно линейная интерполяция
                    for(let j=0;j<x.length-1;j++)
                    {
                        if((this.products[i].count>=x[j])&&(this.products[i].count<x[j+1])){
                            this.products[i].discount 
                            = 
                            ( ( (this.products[i].count - x[j]) * (y[j+1] - y[j]) ) / (x[j+1] -x[j]) ) +y[j];
                            break;
                        }    
                    }
                }
                //Затем вычислим стоимость каждого из товаров в корзине с учётом скидок
                this.products[i].total=this.products[i].price*this.products[i].count*(1.0-this.products[i].discount);              
                //Инкрементируем общую сумму товаров в корзине
                this.summ+=this.products[i].total;
                this.summNoDiscount+=(this.products[i].price*this.products[i].count);
                //Инкрементируем общую скидку в абсолютных единицах измерения (в рублях)
                this.discount+=this.products[i].total*(this.products[i].discount);
                //Инкрементируем общее количество товара в корзине
                this.count+=this.products[i].count;    
            }
        }
    }

    //Генерация HTML разметки для корзины. Возможно здесь будет таблица.
    generateHTML(){
     

    }

    //Генерация HTML рядом со значком корзины на главной странице 
    generatePartHTML(){
      this.summNoDiscount=Math.round(this.summNoDiscount*100.0)/100
      this.discount=Math.round(this.discount*100.0)/100
      this.summ=Math.round(this.summ*100.0)/100
      let HTML =
      `
     
        <p> Количество ${this.count} шт. </p>
        <p> Стоимость ${this.summNoDiscount} руб. </p>
        <p> Скидки ${this.discount} руб. </p>
        <p> Итого ${this.summ} руб. </p>
      `
      return HTML;
    }

}