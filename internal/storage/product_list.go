package storage

import "domashnyaya-rabota-js/internal/model"

type Products struct {
	Product_List *[]model.Product
}

//Когда-то может будет база данных и там всё будет
func (prd *Products) Get_products_from_db() *[]model.Product {
	var products []model.Product
	var p model.Product
	p = model.AddProduct(
		100.0, 1, "Atmega328", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 20, 32, 2, 2, 1, 1, 1, 8, 3, 16, "Atmel",
	)
	products = append(products, p)

	p = model.AddProduct(
		50.0, 2, "Atmega8", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 16, 8, 1, 2, 1, 1, 1, 8, 3, 10, "Atmel",
	)
	products = append(products, p)

	p = model.AddProduct(
		50.0, 3, "PIC16F84", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 20, 8, 1, 2, 1, 1, 1, 8, 2, 10, "Microchip",
	)
	products = append(products, p)

	p = model.AddProduct(
		100.0, 4, "Atmega328P-PU", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 20, 32, 2, 2, 1, 1, 1, 8, 3, 20, "Atmel",
	)
	products = append(products, p)

	p = model.AddProduct(
		100.0, 5, "Atmega8085", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 16, 48, 2, 2, 1, 2, 1, 10, 5, 4, "Atmel",
	)
	products = append(products, p)

	p = model.AddProduct(
		100.0, 6, "Atmega32A-PU", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 20, 32, 2, 2, 1, 1, 1, 8, 3, 20, "Atmel",
	)
	products = append(products, p)

	p = model.AddProduct(
		500.0, 7, "Atmega2560", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 20, 256, 32, 2, 1, 1, 1, 8, 6, 20, "Atmel",
	)
	products = append(products, p)

	p = model.AddProduct(
		350.0, 8, "Atmega128", 5.0, 0.01, "Микроконтроллер", "RISC", 8, 20, 128, 32, 2, 1, 1, 1, 8, 6, 20, "Atmel",
	)
	products = append(products, p)

	prd.Product_List = &products
	return &products
}
