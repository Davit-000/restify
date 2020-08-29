# Restify

Make Rest API request's

# installation

`npm install vue-restify` 

# Usage

## basic example 

```
    import { Restify } from "vue-restify"
    
    class Maker extends Restify {
      static fields = {id: null, name: ''};
     
      constructor() {
        super({
            fields: Maker.fields
        });    
      }
    }
    
    const maker = new Maker();

    maker
      .create()
      .only(['name'])    
      .prefix('admin')
      .suffix('create')
      .send()
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .finally(() => console.log('finally'))
```