/*
    Здесь в этом модуле просто создаются классы товаров, они же могут быть разные и с разными характеристиками.
*/

class Chip {
    constructor(id=0, name="", brend="", power = 5, current = 0.05){
        this.id = {key:"Идентификатор", value:id};
        this.power = {key:"Напряжение питания (В)", value:power};
        this.current = {key:"Максимальный ток (А)", value:current};
        this.name = {key:"Модель", value:name};
        this.brend ={key:"Производитель", value:brend};
    }
}

class Logic extends Chip{
    constructor(id=0, name="SN74LS00", brend = "", power=5, current=0.05, instruction="2ИЛИ-НЕ", channels=4){
        super(id=id, name, brend, power, current);
        this.type = {key:"Тип", value:"Логика"};
        this.instruction = {key:"Вид логики", value:instruction};
        this.channels= {key:"Количество каналов", value:channels};
    }
}

class CPU extends Chip{
    constructor(id=0, name="Atmega328p-pu", brend="Atmel", power = 5, current= 0.05, arh="RISC", flash=32, ram=4, eeprom=16, data_bits=8, max_freq=16, input_output=16, i2c=1, uart=1, spi=1, adc=3, timers=3, interrupts=4){
        super(id=id, name, brend, power, current);
        this.type = {key:"Тип", value:"Микроконтроллер"};
        this.arh = {key:"Архитектура", value:arh};
        this.data_bits={key:"Шина даных (бит)", value:data_bits};
        this.max_freq = {key:"Максимальная частота (МГц)", value:max_freq};
        this.flash= {key:"Память программы (кБайт)", value:flash};
        this.ram= {key:"Оперативная память (кБайт)", value:ram};
        this.eeprom= {key:"Память EEPROM (кБайт)", value:eeprom};
        this.input_output= {key:"Входы/выходы (шт)", value:input_output};
        this.uart= {key:"UART (шт)", value:uart};
        this.spi= {key:"Шина SPI (шт)", value:spi};
        this.i2c= {key:"Шина I2C (шт)", value:i2c};
        this.adc= {key:"Каналы АЦП (шт)", value:adc};
        this.timers= {key:"Таймеры (шт)", value:timers};
        this.interrupts= {key:"Внешние прерывания (шт)", value:interrupts};
    }
}

