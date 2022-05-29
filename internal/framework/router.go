package framework

import (
	"github.com/gin-gonic/gin"
)

func (f *Framework) Route() error {
	

	f.Router.GET("/", func(ctx *gin.Context) {
		ctx.HTML(200, "index.html", gin.H{})
	})
	f.Router.GET("/cart", func(ctx *gin.Context) {
		producti_v_korzine := f.Data.Get_cart_list_from_DB()
		ctx.JSONP(200, gin.H{
			"Data":  producti_v_korzine,
			"Error": nil,
		})
	})
	return nil
}
