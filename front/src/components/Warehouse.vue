<template>
  <div class="warehouse">
      <div class="container">
          <form class="warehouse-form" v-if="openEdit" @submit.prevent="update()">
              <input type="text" class="input warehouse-form__input" placeholder="Город" v-model="town">
              <input type="text" class="input warehouse-form__input" placeholder="Район" v-model="region">
              <input type="text" class="input warehouse-form__input" placeholder="Цена аренды" v-model="rent">
              <input type="submit" class="button warehouse-form__button" value="Изменить">
          </form>
          <div class="general__box-head warehouse__box">
              <div class="general__item-head warehouse__item warehouse__number">
                  №
              </div>
              <div class="general__item-head warehouse__item">
                  Назва города
              </div>
              <div class="general__item-head warehouse__item">
                  Район
              </div>
              <div v-if="user.isAdmin"  class="general__item-head warehouse__item">
                  Цена аренды
              </div>
              <div v-if="user.isAdmin"  class="general__item-head warehouse__item">
                  Сума товара
              </div>
              <div v-if="user.isAdmin"  class="general__item-head warehouse__item">
                  Редактировать
              </div>
              <div v-if="user.isAdmin"  class="general__item-head warehouse__item">
                  Удалить
              </div>
          </div>
          <div v-for="(todo, index) in todos" :key="todo.id" class="general__box warehouse__box">
              <div class="general__item warehouse__item warehouse__number">
                  {{index}}
              </div>
              <div class="general__item warehouse__item">
                  <router-link :to="{name: 'Town', params: {url: todo.id}}" class="warehouse__item--link">
                    {{todo.town}}
                  </router-link>
              </div>
              <div class="general__item warehouse__item">
                  {{todo.region}}
              </div>
              <div v-if="user.isAdmin"  class="general__item warehouse__item">
                  {{todo.rent}}
              </div>
              <div class="general__item warehouse__item">
                  <div v-for="amountProduct in amountProducts" :key="amountProduct.id" v-if="amountProduct.id == todo.id">
                      {{amountProduct.amountproduct}}
                  </div>
              </div>
              <div @click="editwarehouse(todo.id, todo.town, todo.region, todo.rent)" v-if="user.isAdmin" class="general__item warehouse__item edit">
                  Редактировать
              </div>
              <div v-if="user.isAdmin" @click="deleteWarehouse(todo.id)" class="general__item warehouse__item delete">
                  Удалить
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        todos: [],
        amountProducts: [],
        id: '',
        town: '',
        region: '',
        rent: '',
        openEdit: false
    }),
    mounted() {
        this.getWarehouses()
    },
    methods: {
        async getWarehouses () {
            try {   
                const result = await axios.get('/api/warehouses')
                this.todos = result.data.warehouse
                this.amountProducts = result.data.amountproduct[0]
            } catch (e) {
                alert('Сбой в системе')
            }
        },
        async deleteWarehouse(id) {
            if(this.$store.state.auth.newuser.user.isAdmin) {
                try {
                    await axios.delete(`/api/warehouse/${id}`)
                    this.getWarehouses()
                }
                catch (e) {
                    alert('Данный елемент не найден')
                }
            }
        },
        editwarehouse(id,town,region,rent) {
            this.id = id
            this.town = town
            this.region = region
            this.rent = rent
            this.openEdit = true
        },
        async update() {
            const formData = {
                id: this.id,
                town: this.town,
                region: this.region,
                rent: this.rent
            }

            if(this.$store.state.auth.newuser.user.isAdmin) {
                try {
                    await this.$store.dispatch('updatewarehouse',formData)
                    this.town = ''
                    this.region = ''
                    this.rent = ''
                    this.openEdit = false
                    this.getWarehouses()
                } catch (e) {
                    alert('Данный елемент не найден')
                }
            }
        }
    },
    computed: {
        user() {
            return this.$store.state.auth.newuser.user
        }
    }
}
</script>


<style lang="scss" scoped>
    .warehouse-form {
        margin-bottom: 30px;
        &__input {
            margin-right: 20px;
        }
    }
    .warehouse {
        margin: 30px 0px;
    }
    .warehouse__number {
        width: 20%;
    }
    .warehouse__item--link {
        color: #000;
        &:hover {
            color: #32a84f;
        }
    }
</style>
