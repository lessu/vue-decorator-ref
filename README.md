vue-decorator-ref
=====================


# Description
Use along with `vue-class-componenet`

Add a new Decorator `@Ref` to inject refs into class property.

# install
```sh
$ npm install vue-decorator-ref
```
# use example
## 1 add plugin
```ts
import {Plugin as VueComponenetRefPlugin} from "vue-decorator-ref";

... 

Vue.use(VueComponenetRefPlugin);
```

## 2 use in code (typescript)
```typescript

@Component({
    components: {
        TabController
    }
})
export default class TabPage extends Vue{
  
  @Ref()
  tabController : TabController;

  mounted(){
    //use with self.tabController;
    this.tabController;
    ...

  }
}

```


# Usege
```typescript
// case #1
// when refName is not given,then get one whose name is as same as propertyName
@Ref()
property;
// as same as :
// property = this.$refs['property]


// case #2
@Ref("vue")
property;
// as same as :
// property = this.$refs['vue']


// case #3
// camelcased refName will find refName first then try decamelized one
@Ref("someVue")
property;
// as same as :
// property = this.$refs['someVue']
// and if someVue is null then try 
// property = this.$refs['some-vue']

```


# Licence
MIT