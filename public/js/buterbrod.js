  
        //Какой-то неопределённый компонент
        class Component{
            constructor(category, name, calory, price){
                this.category=category;
                this.name=name;
                this.calory=calory;
                this.price=price;
            }

            my_constructor(category, name, calory, price){
                this.category=category;
                this.name=name;
                this.calory=calory;
                this.price=price;
            }
        }

        //
        class Component_Main extends Component{
            constructor(id=0){
                if(id==0) {super("Размер","Малый",20,50);}
                else if(id==1) {super("Размер","Большой",40,100);}
                else { super("Размер","Не определено",0,0);}
                this.id=id;
            }
            edit(id){
                if(id==0) {this.my_constructor("Размер","Малый",20,50);}
                else if(id==1) {this.my_constructor("Размер","Большой",40,100);}
                else { this.my_constructor("Размер","Не определено",0,0);}
                this.id=id;
            }
        }

        class Component_Type extends Component{
            constructor(id=0){
                if(id==0) super("Вид","С сыром",10,20);
                else if(id==1) super("Вид","Салат",20,5);
                else if(id==2) super("Вид","Картофель",15,10);
                else super("Вид","Не определено",0,0);
                this.id=id;
            }
            edit(id){
                if(id==0) this.my_constructor("Вид","С сыром",10,20);
                else if(id==1) this.my_constructor("Вид","Салат",20,5);
                else if(id==2) this.my_constructor("Вид","Картофель",15,10);
                else this.my_constructor("Вид","Не определено",0,0);
                this.id=id;
            }
        }

        class Component_Other extends Component{
            constructor(id=0){
                if(id==0) super("Дополнительно","С сыром",10,20);
                else if(id==1) super("Дополнительно","Приправа",20,5);
                else if(id==2) super("Дополнительно","Майонез",15,10);
                else super("Дополнительно","Не определено",0,0);
                this.id=id;
            }
            edit(id){
                if(id==0) this.my_constructor("Дополнительно","С сыром",10,20);
                else if(id==1) this.my_constructor("Дополнительно","Приправа",20,5);
                else if(id==2) this.my_constructor("Дополнительно","Майонез",15,10);
                else this.my_constructor("Дополнительно","Не определено",0,0);
                this.id=id;
            }
        }


        class Component_List{
            constructor(){
                this.components=[{component:new Component_Main(-1),count:1},{component:new Component_Type(-1),count:1}];
            }
            editMain(id){
                for(let i=0; i<this.components.length;i++){
                    if(this.components[i].component.category=="Размер"){
                        this.components[i].component.edit(id);
                        break;
                    }
                }
            }
            editType(id){
                for(let i=0; i<this.components.length;i++){
                    if(this.components[i].component.category=="Вид"){
                        this.components[i].component.edit(id);
                        break;
                    }
                }
            }
            addOther(id){
                let finded=false;
                for(let i=0; i<this.components.length;i++){
                    console.log(this.components[i].component.category)
                    if(this.components[i].component.category=="Дополнительно"){
                        if(id==this.components[i].component.id){
                            //console.log(1)
                            finded=true;
                            this.components[i].count++;
                            break;
                        }
                    }
                }

                if(!finded){
                   // console.log(2)
                    this.components.push({component:new Component_Other(id),count:1});
                }
            }
            removeOther(id){
                let finded=false;
                for(let i=0; i<this.components.length;i++){
                    if(this.components[i].component.category=="Дополнительно"){
                        if(id==this.components[i].component.id){
                            if(id==this.components[i].count>1){
                                this.components[i].count--;  
                            }
                            else{       
                                 this.components.splice(i,1);
                            }
                        }
                        break;
                    }
                }
            }

            calcSumm(){
                Summ=0;
                for(let i=0; i<this.components.length;i++){
                    Summ+=(this.components[i].component.price * this.components[i].count);
                }
                return Summ;
            }

            calcCalories(){
                Calory=0;
                for(let i=0; i<this.components.length;i++){
                    Calory+=(this.components[i].component.calory * this.components[i].count);
                }
                return Calory;
            }

            generateHTML(){

            }
        }