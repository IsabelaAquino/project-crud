<template>
  <form class="">
    <v-col
      cols="12"
      md="12"
    >
      <v-text-field
        id="nome"
        name="nome"
        color="primary"
        label="Produto:"
        v-model="produto.title"
      />
    </v-col>
    <v-col
      cols="12"
      md="12"
    >
      <v-text-field
        type="number"
        id="preco"
        name="preco"
        color="primary"
        label="Preço (R$):"
        v-model="produto.price"
      />
    </v-col>
    <v-col cols="12">
      <label for="fotos">Imagem: </label>
      <input id="fotos" name="fotos" type="file" multiple ref="fotos">
    </v-col>
    <v-col cols="12">
      <v-text-field
        color="primary"
        id="descricao"
        name="descricao"
        label="Descrição do Produto"
        v-model="produto.description"
      />
    </v-col>
    <v-col
      cols="12"
      md="12"
    >
      <v-text-field
        id="categoria"
        name="categoria"
        color="primary"
        label="Categoria:"
        v-model="produto.category"
      />
    </v-col>
    <v-btn
      color="#00aeff"
      min-width="150"
      @click.prevent="adicionarEditarProduto"
      class="btn"
      v-bind:disabled="produto.title == '' ? true : false"
    >
      {{produto.id != undefined ? 'Editar Produto' : 'Adicionar Produto'}}
    </v-btn>
  </form>
</template>

<script>
import ProdutosService from "../../../services/services";

export default {
  name: "ProdutoAdicionar",
  props: {
    produto: {
      type: Object,
      default: {
        id: "",
        title: "",
        price: "",
        description: "",
        image: null,
        category: ""
      }
    },
  },
  data() {
    return {
      produto: {
        id: "",
        title: "",
        price: "",
        description: "",
        image: null,
        category: ""
      }
    };
  },
  created() {
    // console.log("props", props)
  },
  methods: {
    formatarProduto() {
      const form = new FormData();

      const files = this.$refs.fotos.files;
      for (let i = 0; i < files.length; i++) {
        form.append(files[i].name, files[i]);
      }

      form.append("id", this.produto.id);
      form.append("title", this.produto.title);
      form.append("price", this.produto.price);
      form.append("description", this.produto.description);
      form.append("category", this.produto.category);

      return form;
    },
    async adicionarEditarProduto(event) {
      const produto = this.formatarProduto();

      const button = event.currentTarget;

      if(this.produto.id == "" || this.produto.id == undefined || this.produto.id == null){
        await ProdutosService.post(produto).then((response) => {
          if (response.data !== undefined) {
            this.$emit('atualizaProdutos', "success")
          }
         }
        ).catch(error =>
          this.$emit('atualizaProdutos', "error")
        )
      }else{
        await ProdutosService.edit(produto, this.produto.id).then((response) => {
          if (response.data !== undefined) {
            this.$emit('atualizaProdutos', "success")
          }
         }
        ).catch(error =>
          this.$emit('atualizaProdutos', "error")
        )
      }

    }
  }
};
</script>



<style scoped>
.btn{
  color: #fff;
  margin-left: 60%;
}
</style>
