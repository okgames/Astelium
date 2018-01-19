import Model from "client/gamecore/model";

export default class Renderer {

    public static renderModel(model: Model) {        
        const element = document.createElement('div');        
        element.id = model._selector;            
        element.innerHTML = model._HTMLTemplate;       
        model._HTMLTemplate = element.innerHTML;        
        document.querySelector(`#${model._parentSelector}`).innerHTML += element.outerHTML;            
    }
}