package framework

import (
	"domashnyaya-rabota-js/internal/storage"

	"github.com/gin-gonic/gin"
)

type Framework struct {
	Router       *gin.Engine
	Cart         *storage.Cart
	Product_List *storage.Products
}

func (f *Framework) Setup(cart *storage.Cart, product_list *storage.Products) {
	f.Cart = cart
	f.Product_List = product_list
	//Создаём объект фреймворка с настройками по умолчанию
	f.Router = gin.Default()
}
func (f *Framework) Start() error {
	//Указываем страницы, которые сервер будет отдавать
	//f.Router.LoadHTMLFiles("public/index.html")
	//Указываем статические файлы
	//f.Router.Static("/css", "public/css")
	//f.Router.Static("/js", "public/js")
	//f.Router.Static("/img", "public/img")
	f.Router.Static("/public", "public")
	//Запускаем функцию обработки маршрутов
	f.Route()
	//Запускаем сервер на порту 5000 и возвращаем ошибку
	return f.Router.Run(":5000")
}
