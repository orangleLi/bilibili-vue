export const search = {
  data () {
    return {
      defaultWord: null
    }
  },
  methods: {
    async getDefault () {
      let defaultWord = await this.$get('/default')
      this.defaultWord = defaultWord.data.show_name
      return this.defaultWord
    }
  }
}
