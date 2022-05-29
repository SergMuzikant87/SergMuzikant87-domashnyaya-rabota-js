package storage

import (
	"domashnyaya-rabota-js/internal/model"
)

type Cart_Product struct {
	Product model.Product
	Count   uint16
}
type Cart struct {
	Product_List *[]Cart_Product
}

func (s *Cart) Get_cart_list_from_DB() *[]Cart_Product {
	var cart_products []Cart_Product
	var p Cart_Product
	p.Product = model.AddProduct(
		100.0, 1, "Atmega328", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 20, 32, 2, 2, 1, 1, 1, 8, 3, 16, "Atmel",
	)
	p.Count = 3
	cart_products = append(cart_products, p)

	p.Product = model.AddProduct(
		50.0, 2, "Atmega8", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 16, 8, 1, 2, 1, 1, 1, 8, 3, 10, "Atmel",
	)
	p.Count = 6
	cart_products = append(cart_products, p)

	p.Product = model.AddProduct(
		50.0, 3, "PIC16F84", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 20, 8, 1, 2, 1, 1, 1, 8, 3, 10, "Microchip",
	)
	p.Count = 3
	cart_products = append(cart_products, p)

	p.Product = model.AddProduct(
		100.0, 4, "Atmega328P-PU", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 20, 32, 2, 2, 1, 1, 1, 8, 3, 20, "Atmel",
	)
	p.Count = 4
	cart_products = append(cart_products, p)
	s.Product_List = &cart_products
	return &cart_products
}

func (s *Cart) Add(id uint32) {

}
