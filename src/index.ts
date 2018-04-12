import Component,{createDecorator} from 'vue-class-component';
import Vue,{ComponentOptions, VueConstructor, PluginObject} from "vue";
import decamelize from "decamelize"
// export interface RefExtendsOptions{
//     /**
//      * refName => member
//      */
//     $$__refs : {[key:string] : string}
// }
/**
 * decorator of an inject
 * @param key key
 * @return PropertyDecorator
 */
export function Ref(refName?:string) : PropertyDecorator{
    return <any>createDecorator((componentOptions, k) => {
        if (typeof (<any>componentOptions).$$__refs === 'undefined') {
            (<any>componentOptions).$$__refs = {};
        }
        if(!refName){
            refName = k;
        }
        (<any>componentOptions).$$__refs[refName] = k;
    });
}


export let Plugin : any =  {
    install : function (Vue:VueConstructor , options:any) : void {
        
        Vue.mixin({
            mounted: function (this:Vue) {
                let refs = (<any>this).$options.$$__refs;
                if(refs){
                    let keys = Object.keys(refs);
                    for (let key of keys){
                        let componenet = this.$refs[ key ];
                        if(componenet == null){
                            componenet = this.$refs[ decamelize(key,'-') ];
                        }
                        if(componenet){
                            (<any>this)[refs[key]] = componenet;
                        }else{
                            console.warn("@Ref not found ref componet '"+key+"'");
                        }
                    }
                }
            }
        });
    }
}