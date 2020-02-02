<template>
  <div class="qr-container">
    <b-input-group class="my-3">
      <b-form-input v-model="inputValue"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="onGenerate">Generate QR</b-button>
      </b-input-group-append>
    </b-input-group>
    <qrcode :value="qrValue" :options="{ width: 300 }" tag="img"></qrcode>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: "",
      qrValue: "Hello Babe"
    };
  },

  methods: {
    onGenerate() {
      if (this.inputValue.length > 0) {
        this.qrValue = this.inputValue;
      }
    }
  }
};
</script>

<style scoped></style>
