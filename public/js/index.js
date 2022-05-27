///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Обьект группы товаров
product_list = new Products()
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Добавление товаров (отладка и тестирование)
product_list.add(new Product(new CPU(0),50,"img/1.jpg"))
product_list.add(new Product(new CPU(1,"Atmega8","Atmel",52,0.01,"RISC",8,1,1,8,16,16,1,3,1,5,2,2),125,"img/1.jpg"))
product_list.add(new Product(new CPU(2,"PIC16F628A","Microchip",100,0.01,"RISC",2,1,1,8,8,10,1,2,1,5,2,2),82,"img/3.jpg"))
product_list.add(new Product(new Logic(3),124,"img/2.jpg"))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Генерация страницы с товарами (отладка и тестирование)
let good_list = document.getElementsByClassName("goods-list")[0];
good_list.innerHTML=product_list.generatePageHTML();
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Корзина (отладка и тестирование)
cart = new Cart()
cart.addProduct(product_list.products[0]);
cart.addProduct(product_list.products[0]);
cart.addProduct(product_list.products[1]);
cart.addProduct(product_list.products[2]);
cart.addProduct(product_list.products[2]);
cart.addProduct(product_list.products[2]);
cart.addProduct(product_list.products[2]);
cart.addProduct(product_list.products[2]);
cart.addProduct(product_list.products[1]);
cart.removeProduct(1);
cart.totalUpdate();
console.log(cart);
document.getElementById("cart-text").innerHTML=cart.generatePartHTML()
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////