package model

type Prop struct {
	Id         uint32
	Name       string
	Power      float32
	Current    float32
	Type       string
	Arh        string
	Data_bits  uint8
	Max_freq   uint16
	Flash      uint16
	Ram        uint16
	Eeprom     uint16
	Uart       uint8
	Spi        uint8
	I2c        uint8
	Adc        uint8
	Timers     uint8
	Interrupts uint8
	Brend string
}

type Product struct {
	Property Prop
	Price    float32
}

func AddProduct(
	Price float32,
	Id uint32,
	Name string,
	Power float32,
	Current float32,
	Type string,
	Arh string,
	Data_bits uint8,
	Max_freq uint16,
	Flash uint16,
	Ram uint16,
	Eeprom uint16,
	Uart uint8,
	Spi uint8,
	I2c uint8,
	Adc uint8,
	Timers uint8,
	Interrupts uint8,
	Brend string) Product {
	var p Product
	p.Price = Price
	p.Property.Id = Id
	p.Property.Name = Name
	p.Property.Power = Power
	p.Property.Current = Current
	p.Property.Type = Type
	p.Property.Arh = Arh
	p.Property.Data_bits = Data_bits
	p.Property.Max_freq = Max_freq
	p.Property.Flash = Flash
	p.Property.Ram = Ram
	p.Property.Eeprom = Eeprom
	p.Property.Uart = Uart
	p.Property.Spi = Spi
	p.Property.I2c = I2c
	p.Property.Timers = Timers
	p.Property.Interrupts = Interrupts
	p.Property.Brend = Brend
	return p
}
