<template>
  <v-container
    id="regular-tables-view"
    fluid
    tag="section"
  >
    <v-dialog
      v-model="dialogRemover"
      max-width="300"
    >
      <v-card>
        <v-card-title>
          Deseja remover esse produto?

          <v-spacer />

          <v-icon
            aria-label="Close"
            @click="dialogRemover = false"
          >
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card-text class="pb-6 pt-12 text-center">
          <v-btn
            class="mr-3"
            text
            @click="dialogRemover = false"
          >
            Não
          </v-btn>

          <v-btn
            color="success"
            text
            @click="dialogRemover = false; removerItem()"
          >
            Sim
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <material-alert
      v-bind:color="returnRequest"
      dark
      v-if="notificacao"
    >
      {{returnRequestMessagem}}
    </material-alert>
    <view-intro
      heading="Tabela de Produtos"
    />
      <div class="text-center">
        <v-dialog
          v-model="modalAddProduto"
          width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ms-5"
              fab
              dark
              color="indigo"
              style="margin-left: 94% !important;"
              v-bind="attrs"
              @click.prevent="veioEditar = false, produto = {}"
              v-on="on"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{
                !veioEditar ?
                'Adicionar Produto' : 'Editar Produto'
              }}
            </v-card-title>

            <v-card-text>
              <ProdutoAdicionar :produto="produto" @atualizaProdutos="atualizaProdutos" />
            </v-card-text>

            <v-divider></v-divider>
          </v-card>
        </v-dialog>
      </div>
    <div v-if="produtos && produtos.length" key="produtos">
      <material-card
        icon="mdi-clipboard"
        icon-small
        title="Produtos"
        color="primary"
      >
        <v-simple-table>
          <thead>
            <tr>
              <th class="primary--text">
                ID
              </th>
              <th class="primary--text">
                Produto
              </th>
              <th class="primary--text">
                Categoria
              </th>
              <th class="text-right primary--text">
                Preço
              </th>
              <th class="primary--text">
                Editar
              </th>
              <th class="primary--text">
                Excluir
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(produto, index) in produtos" :key="index">
              <td>{{produto.id}}</td>
              <td>{{produto.title}}</td>
              <td>{{produto.category}}</td>
              <td class="text-right">
                {{produto.price}}
              </td>
              <td>
                <v-icon @click.prevent="editButton(produto)" color="#00aeff" dark>
                  mdi-auto-fix
                </v-icon>
              </td>
              <td>
                <v-icon @click.prevent="trashButton(produto)" color="#FF0000" dark>
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </material-card>
      <ProdutosPaginar :produtosTotal="produtosTotal" :produtosPorPagina="produtosPorPagina"/>
    </div>
    <div v-else-if="produtos && produtos.length === 0" key="sem-resultados">
      <p class="sem-resultados">Busca sem resultados. Tente buscar outro termo.</p>
    </div>
    <div class="py-3" />

  </v-container>
</template>

<script>
  import ProdutosService from "../services/services";
  import ProdutosPaginar from './pages/produtos/ProdutosPaginar.vue'
  import { serialize } from "../helpers/helpers";
  import ProdutoAdicionar from './pages/produtos/ProdutoAdicionar.vue'

  export default {
    name: 'Produtos',

    components: {
      ProdutosPaginar,
      ProdutoAdicionar
    },
    data() {
      return {
        produtos: null,
        produto: {},
        produtosPorPagina: 10,
        produtosTotal: 20,
        modalAddProduto: false,
        notificacao: false,
        returnRequest: "success",
        returnRequestMessagem: "",
        dialogRemover: false,
        veioEditar: false
      };
    },
    computed: {
      url() {
        const query = serialize(this.$route.query);
        return `/products?limit=${this.produtosPorPagina}`;
      }
    },
    created() {
      this.getProdutos()
    },
    methods: {
      getProdutos() {
        this.produtos = null;
        ProdutosService.get(this.url).then(response => {
          this.produtosTotal = Number(response.headers["x-total-count"]);
          this.produtos = response.data;
        });
      },

      atualizaProdutos(retorno){

        this.modalAddProduto = !this.modalAddProduto
        this.ativaNotificacao(retorno)
        if(retorno == 'success')
          this.returnRequestMessagem = 'Produto Adicionado com Sucesso.'
        else
          this.returnRequestMessagem = 'Ocorreu um erro ao adicionar um novo produto.'

        //aqui faria o update da nova lista de produtos se a api fosse com dados reais
        this.getProdutos()
      },

      trashButton(produto){
        this.dialogRemover = true; 
        this.produto = produto
      },

      editButton(produto){
        this.veioEditar = true
        this.modalAddProduto = true
        this.produto = produto
      },

      ativaNotificacao(retorno){
        this.notificacao = true
        this.returnRequest = retorno

        setTimeout(() => {
          this.notificacao = false
        }, 1500);
      },

      removerItem(){

        ProdutosService.delete(this.produto.id).then((response) => {
          this.ativaNotificacao("success")
          this.returnRequestMessagem = 'Produto removido com sucesso!'
          //aqui faria o update da nova lista de produtos se a api fosse com dados reais
          this.getProdutos()
        }
        ).catch(error =>{
          this.ativaNotificacao("error")
          this.returnRequestMessagem = 'Ocorreu um erro ao remover esse produto.'
        })
      
      }
    },
    watch: {
    url() {
      this.getProdutos();
    }
  },

  }
</script>
