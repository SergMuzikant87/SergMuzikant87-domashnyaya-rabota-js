package framework

import (
	"domashnyaya-rabota-js/internal/storage"

	"github.com/gin-gonic/gin"
)

type Framework struct {
	Router *gin.Engine
	Data   *storage.Cart
}

func (f *Framework) Setup(data *storage.Cart) {
	f.Data = data
	f.Router = gin.Default()
}
func (f *Framework) Start() error {
	f.Router.LoadHTMLFiles("public/index.html")
	f.Router.Static("/css", "public/css")
	f.Router.Static("/js", "public/js")
	f.Router.Static("/img", "public/img")
	f.Route()
	return f.Router.Run(":5000")
}
