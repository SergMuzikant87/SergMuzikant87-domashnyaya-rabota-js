package main

import (
	"domashnyaya-rabota-js/internal/framework"
	"domashnyaya-rabota-js/internal/storage"
)

func main() {
	var app framework.Framework
	var cart_store storage.Cart
	var product_list_store storage.Products
	app.Setup(&cart_store, &product_list_store)
	app.Start()
}
