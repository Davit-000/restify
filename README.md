# Restify

Make Rest API request's

# installation

`npm install vue-restify` 

# Usage

## basic example 

```
    import Restify from "vue-restify"
    
    class Maker extends Model {
      static fields = {id: null, name: ''};
     
      constructor(fields = {}) {
        super(Object.assign(Maker.fields));
    
        this.models = fields.models || [];
      }
    }
    
    const maker = new Maker();
    maker
      .only(['name'])
      .create()
      .prefix('admin')
      .suffix('create')
      .send();
```