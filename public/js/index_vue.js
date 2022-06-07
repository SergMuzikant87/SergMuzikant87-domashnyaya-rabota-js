
const app = new Vue({
    el: '#app',
    data:{
        //Товары на странице
        products: [],
        filter:{
            name:"",
            price_lo:0,
            price_hi:1000,
            is_microcontroller:true,
            is_logic:true,
            is_driver: true,
        },
        products_is_loaded:false,
        //Товары в корзине
        products_in_cart:[],
        products_in_cart_count:0,
        products_in_cart_discount:0,
        products_in_cart_summ_no_discount:0,
        products_in_cart_summ:0,
        products_in_cart_show:false,

    },
    methods:{
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Запрос серверу на получение товаров в корзине
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        get_products_in_cart_from_server(url){
            let fetchPromise = fetch(url);
            fetchPromise.then(promiseResult=>{
               /*
                 Если получать данные с сайта, который указан
                 в методичке, то promiseResult.json() делать не нужно и так данные в JSON,
                 а если с сервера, который в этом проекте, то нужно. Видимо браузер не понял
                 что это JSON. Наверное нужно заголовок ответа редактировать.
               */
               promiseResult.json().then(data =>{             
                   this.products_in_cart = [];
                   //console.log(data)
                   //То что пришло с сервера копируем в объекты
                   //И добавляем эти обьекты в массив товаров 
                   for(let i=0; i<data.Data.length;i++){
                       const product 
                       = 
                       {
                           Id:data.Data[i].Product.Property.Id, 
                           Name:data.Data[i].Product.Property.Name, 
                           Count:data.Data[i].Count,
                           Discount_Percent:0.0,
                           Discount_Absolute:0.0,
                           Price_No_Discount:data.Data[i].Product.Price,
                           Price:0.0,
                           Summ_No_Discount:0.0,
                           Summ:0.0
                       }
                       console.log(product)
                       this.products_in_cart.push(product);   
                   }
                   this.totalUpdate();
                   console.log(this.products_in_cart);
               })
               //Обработка ошибок
               .catch(err =>{
                   console.log("Ошибка",err); 
               })      
            })
            //Обработка ошибок
            .catch(err =>{
                console.log("Ошибка",err);     
            })     
        },
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Запрос серверу на получение каталога товаров на странице
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
        get_products_from_server(url){
            this.products_is_loaded=false;
            let fetchPromise = fetch(url);
            fetchPromise.then(promiseResult=>{
               /*
                 Если получать данные с сайта, который указан
                 в методичке, то promiseResult.json() делать не нужно и так данные в JSON,
                 а если с сервера, который в этом проекте, то нужно. Видимо браузер не понял
                 что это JSON. Наверное нужно заголовок ответа редактировать.
               */
               promiseResult.json().then(data =>{             
                   this.products = [];
                   //То что пришло с сервера копируем в объекты
                   //И добавляем эти обьекты в массив товаров 
                   for(let i=0; i<data.Data.length;i++){
                       const product = {Property:data.Data[i].Property, Price:data.Data[i].Price}
                       product.Img="img/"+product.Property.Id+".jpg";
                       this.products.push(product);   
                   }
                   this.products_is_loaded=true;
               })
               //Обработка ошибок
               .catch(err =>{
                   console.log("Ошибка",err); 
               })      
            })
            //Обработка ошибок
            .catch(err =>{
                console.log("Ошибка",err);     
            })     
        },
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Расчёт стоимости товаров в корзине
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        totalUpdate(x=[1,5,10,100],y=[0.0,0.1,0.15,0.30]){
            if(this.products_in_cart.length>0)
            {
                this.products_in_cart_summ_no_discount=0.0;
                this.products_in_cart_summ=0.0;
                this.products_in_cart_count=0;
                this.products_in_cart_discount=0.0;
                for(let i=0; i<this.products_in_cart.length;i++)
                {
                    /*
                        Сначала вычислим скидку на каждый из товаров в корзине. 
                        Скидку для каждого товара считаем при помощи линейной интерполяции.
                        Координаты точек линейной интерполяции в массивах на входе функции. 
                        Вообще нужно сначала отсортировать массив x по возрастанию, но не будем этого делать
                    */
                       
                    if(this.products_in_cart[i].Count<=x[0]) 
                    {
                        //Обработка выхода за пределы нижнего значения
                        this.products_in_cart[i].Discount_Percent=y[0];
                    }
                    else if (this.products_in_cart[i].Count>=x[x.length-1]) 
                    {
                        //Обработка выхода за пределы верхнего значения
                        this.products_in_cart[i].Discount_Percent=y[y.length-1]
                    }
                    else
                    {
                        //Непосредственно линейная интерполяция
                        for(let j=0;j<x.length-1;j++)
                        {
                            if((this.products_in_cart[i].Count>=x[j])&&(this.products_in_cart[i].Count<x[j+1])){
                                this.products_in_cart[i].Discount_Percent 
                                = 
                                ( ( (this.products_in_cart[i].Count - x[j]) * (y[j+1] - y[j]) ) / (x[j+1] -x[j]) ) +y[j];
                                break;
                            }    
                        }
                    }
                    //Затем вычислим цену каждого из товаров в корзине с учётом скидок
                    this.products_in_cart[i].Price=this.products_in_cart[i].Price_No_Discount*(1.0-this.products_in_cart[i].Discount_Percent);              
                    //Вычислим стоимость 1-го вида товара без учёта скидок
                    this.products_in_cart[i].Summ_No_Discount=this.products_in_cart[i].Price_No_Discount*this.products_in_cart[i].Count;
                    //Вычислим стоимость 1-го вида товара c учётом скидок
                    this.products_in_cart[i].Summ=this.products_in_cart[i].Price*this.products_in_cart[i].Count;
                    //Вычисляем скидку в абсолютных единицах измерения
                    this.products_in_cart[i].Discount_Absolute=this.products_in_cart[i].Price_No_Discount*this.products_in_cart[i].Discount_Percent*this.products_in_cart[i].Count;
                    //Инкрементируем общую сумму товаров в корзине с учётом скидок
                    this.products_in_cart_summ+=this.products_in_cart[i].Summ;       
                    //Инкрементируем общую сумму товаров в корзине без учёта скидок
                    this.products_in_cart_summ_no_discount+=(this.products_in_cart[i].Price_No_Discount*this.products_in_cart[i].Count);  
                    //Инкрементируем общую скидку в абсолютных единицах измерения (в рублях)
                    this.products_in_cart_discount+=this.products_in_cart[i].Discount_Absolute;
                    //Инкрементируем общее количество товара в корзине
                    this.products_in_cart_count+=this.products_in_cart[i].Count;    

                    //Округление чтобы на экране смотрелось лучше, то есть максимум 2 знака после запятой
                   this.products_in_cart[i].Price=Math.round(this.products_in_cart[i].Price*100.0)/100;
                   this.products_in_cart[i].Discount_Percent=Math.round(this.products_in_cart[i].Discount_Percent*10000.0)/100;
                   this.products_in_cart[i].Discount_Absolute=Math.round(this.products_in_cart[i].Discount_Absolute*100.0)/100;
                   this.products_in_cart[i].Summ=Math.round(this.products_in_cart[i].Summ*100.0)/100;
                   this.products_in_cart[i].Summ_No_Discount=Math.round(this.products_in_cart[i].Summ_No_Discount*100.0)/100;
                }
                //Округление чтобы на экране смотрелось лучше, то есть максимум 2 знака после запятой
                this.products_in_cart_summ=Math.round(this.products_in_cart_summ*100.0)/100;
                this.products_in_cart_summ_no_discount=Math.round(this.products_in_cart_summ_no_discount*100.0)/100;
                this.products_in_cart_discount=Math.round(this.products_in_cart_discount*100.0)/100;
                
            }
        },
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Обработчик события кнопки открытия корзины
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
        cart_show(){
            this.products_in_cart_show=true;
        },

        //Закрытие корзины
        cart_hide(){
            this.products_in_cart_show=false;
        },
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        
    },
    mounted(){
        this.get_products_from_server("http://localhost:5000/product_list")
        this.get_products_in_cart_from_server("http://localhost:5000/cart")
    },

    computed: {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Фильтрация каталога товаров на странице
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        products_filtered: function(){
            return this.products.filter((element)=>{
                //Совпадение по имени
                const name_ok = element.Property.Name.match(new RegExp(this.filter.name,"gui") ) ;
                //Совпадение по диапазону цен
                const price_ok = (element.Price>=this.filter.price_lo) && (element.Price<=this.filter.price_hi);
                //Совпадение по тому что тип микросхемы один из выбранных типов
                const type_ok 
                =
                ((element.Property.Type=="Микроконтроллер") && this.filter.is_microcontroller)
                ||
                ((element.Property.Type=="Логика") && this.filter.is_logic)
                ||
                ((element.Property.Type=="Драйвер") && this.filter.is_driver);

                //В итоге если звёзды сошлись, то включаем в выходной массив этот элемент
                return name_ok && price_ok && type_ok;
            })
            
        }

        
    }

   

   
});