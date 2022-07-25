import api from './api';

const ProdutosService = {

    get: (uri) => {
      // let uri = '/products'
      return api.get(uri);
    },
    edit: (dados, id) => {
        let uri = '/products/' + id;
        return api['put'].call(api, uri, dados);
    },
	  post: (dados) => {
        let uri = '/products';
        return api['post'].call(api, uri, dados);
    },
    delete(id) {
      let uri = '/products/' + id
      return api['delete'].call(api, uri);
    }
};

export default ProdutosService;
