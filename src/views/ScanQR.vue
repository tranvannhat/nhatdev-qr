<template>
  <div>
    <p class="error">{{ error }}</p>
    <p class="decode-result" v-if="result.length > 0">
      Last result:
      <b>{{ result }}</b>
    </p>
    <qrcode-capture @decode="onDecode" />
    <qrcode-stream :camera="camera" @init="onInit" @decode="onDecode">
      <button @click="switchCamera">Switch Camera</button>
    </qrcode-stream>
  </div>
</template>

<script>
import { QrcodeStream, QrcodeCapture } from "vue-qrcode-reader";

export default {
  components: { QrcodeStream, QrcodeCapture },

  data() {
    return {
      camera: "rear",
      result: "",
      error: ""
    };
  },

  methods: {
    switchCamera() {
      switch (this.camera) {
        case "front":
          this.camera = "rear";
          break;
        case "rear":
          this.camera = "front";
          break;
      }
    },
    onDecode(result) {
      this.result = result;
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        const triedFrontCamera = this.camera === "front";
        const triedRearCamera = this.camera === "rear";
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          if (triedRearCamera) {
            this.error = "LỖI: Bạn không có camera sau";
          } else if (triedFrontCamera) {
            this.error = "LỖI: Bạn không có camera trước";
          } else {
            this.error = "ERROR: installed cameras are not suitable";
          }
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
      }
    }
  }
};
</script>

<style scoped>
button {
  position: absolute;
  left: 10px;
  top: 10px;
}
.error {
  font-weight: bold;
  color: red;
}
</style>
