package storage

import "domashnyaya-rabota-js/internal/model"

type Products struct {
	Product_List []model.Product
}

//Когда-то может будет база данных и там всё будет
func (p *Products) Get_products_from_db() {

}
