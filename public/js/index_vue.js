const app = new Vue({
    el: '#app',
    data:{
        products: [],
        products_filtered: [],
        find_text:""
    },
    methods:{
        get_products_from_server(url){
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
                       this.products.push(product);   
                   }
                   console.log(this.products);
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
        }
        
        ,
        filter_products(){
            this.get_products_from_server("/product_list")
        }
    },
    mounted(){
        this.get_products_from_server("/product_list")
    }

   
});