# Restify

MAke Rest API request's

#installation

`npm install restify` 

#Usage

##basic example; 

```
    import restify from "restify"
    
    class Maker extends Model {
      static fields = {id: null, name: ''};
     
      constructor(fields = {}) {
        super(Object.assign(Maker.fields);
    
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