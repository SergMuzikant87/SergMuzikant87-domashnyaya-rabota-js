package framework

import (
	"github.com/gin-gonic/gin"
)

func (f *Framework) Route() error {
	//Запрос на получение главной страницы
	f.Router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(200, "index.html", gin.H{})
	})
	//Обработка запроса на получение списка товаров в корзине
	f.Router.GET("/cart", func(ctx *gin.Context) {
		producti_v_korzine := f.Cart.Get_cart_list_from_DB()
		ctx.JSONP(200, gin.H{
			"Data":  producti_v_korzine,
			"Error": nil,
		})
	})
	//Обработка запроса на получение списка всех товаров
	f.Router.GET("/product_list", func(ctx *gin.Context) {
		spisok_productov := f.Product_List.Get_products_from_db()
		ctx.JSONP(200, gin.H{
			"Data":  spisok_productov,
			"Error": nil,
		})
	})
	return nil
}
