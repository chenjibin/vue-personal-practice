<template>
  <div>
    <table>
      <tr>
        <th v-for="listTh in grids">{{afterVal(listTh)}}</th>
      </tr>
    </table>
  </div>
</template>
<style lang="stylus">

</style>
<script>
  export default{
    data() {
      return {
        grids: [
          {
            val1: '收件方'
          },
          {
            shebei: '设备类别'
          },
          {
            count: '数量'
          },
          {
            val2: '开票方'
          }
        ]
      }
    },
    methods: {
      afterVal(listTh) {
        for (let i in listTh) {
          return listTh[i]
        }
      }
    }
  }
</script>
