package main

import (
	"domashnyaya-rabota-js/internal/framework"
	"domashnyaya-rabota-js/internal/storage"
)

func main() {
	var app framework.Framework
	var cart_store storage.Cart
	app.Setup(&cart_store)
	app.Start()
}
