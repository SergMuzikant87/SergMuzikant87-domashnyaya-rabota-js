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
    //Добавление 1-й единицы одного товара в корзину
    addProduct(product){
        //Есть такой товар в корзине или нет
        let productIsFound = false;
        //Поиск такого товара в корзине
        for(let i=0; i<this.products.length;i++){
            if(product.property.id==this.products[i].id){
                //Если есть, то увличиваем его количество
                productIsFound=true;
                this.products[i].count++;
                break;
            }
        }
        //Если же такого товара в корзине нету, то добавляем и говорим что такого товара 1 единица
        if(!productIsFound){
            let newProduct = {
                id: product.property.id,
                name: product.property.name,
                price: product.price,
                count: 1,
                discount: 0.0,
                total: 0.0
            }
            this.products.push(newProduct)
        }
    }
    //Удаление 1-й единицы 1-го товара из корзины  (НЕ ТЕСТИРОВАЛ ВОЗМОЖНО ЕСТЬ ОШИБКИ)
    removeProduct(id){
        if(this.products.length>0){
            for(let i=0; i<this.products.length;i++){
                if(this.products[i].id===id){
                    if(this.products[i].count>0){
                        this.products[i].count--;
                    }
                    else{
                        this.products.splice(this.products.indexOf(this.products[i]),1);
                    }
                }
                break;
            }
        }
    }
    //Очистка корзины
    clearCart(){
        this.products = []
        this.summNoDiscount = 0.0;
        this.summ = 0.0;
        this.count = 0;
        this.discount=0.0
    }

    /**
     * Пересчёт итоговой стоимости товаров
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
                    //Непосредственно линейная онтерполяция
                    for(let j=0;j<x.length-1;j++)
                    {
                        if((this.products[i].count>=x[j])&&(this.products[i].count<x[j+1])){
                            this.products[i].discount 
                            = 
                            ( ( (this.products[i].count - x[j]) * (y[j+1] - y[j]) ) / (x[j+1] -x[j]) ) +y[j];
                            //Здесь можно было не округлять, чтобы точность расчётов была выше, а округлять надо для отображения
                            //this.products[i].discount=Math.round(this.products[i].discount*100.0)/100;
                            break;
                        }
                        
                    }
                }
                //Затем вычислим стоимость каждого из товаров в корзине с учётом скидок
                this.products[i].total=this.products[i].price*this.products[i].count*(1.0-this.products[i].discount)
                //this.products[i].total=Math.round(this.products[i].total*100.0)/100

                //Инкрементируем общую сумму товаров в корзине
                this.summ+=this.products[i].total

                this.summNoDiscount+=(this.products[i].price*this.products[i].count)
                //Инкрементируем общую скидку в абсолютных единицах измерения (в рублях)
                this.discount+=this.products[i].total*(this.products[i].discount)
                //this.discount=Math.round(this.discount*100.0)/100
                //Инкрементируем общее количество товара в корзине
                this.count+=this.products[i].count    
            }
        }
    }
    
    //Генерация HTML разметки для корзины
    generateHTML(){
     

    }

}