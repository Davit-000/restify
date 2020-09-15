const { Model } = require("./Model");
const { Config } = require("./Config");

// class Maker extends Model {
//   static fields = {
//     id: null,
//     name: '',
//     slug: '',
//     logo: '',
//   };
//
//   static request = {
//     prefix: 'admin/vehicle',
//   }
//
//   constructor() {
//     super({
//       fields: Maker.fields,
//       request: Maker.request
//     });
//   }
// }
//
// const maker = new Maker();
//
// maker.set({id: 1, name: 'Maker 1'});
//
// maker
//   .update()
//   .only(['name'])
//   .send()
//   .finally(() => {
//     maker.reset();
//     maker.set({id: 1, name: 'Maker 1'});
//     maker.update().only(['name']).send()
//   });

module.exports = {
  Restify: Model,
  RestifyConfig: Config
};