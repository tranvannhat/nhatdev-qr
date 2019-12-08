<template>
  <div>
    <p class="error">{{ error }}</p>
    <p class="decode-result" v-if="result.length > 0">
      Result:
      <b>{{ result }}</b>
    </p>
    <qrcode-capture
      class="qr--choose"
      @decode="onDecode"
      :multiple="false"
      :capture="false"
    />
    <qrcode-stream :camera="camera" @init="onInit" @decode="onDecode">
      <button
        v-if="error === ''"
        class="btn btn-sm btn-primary"
        @click="switchCamera"
      >
        Switch Camera
      </button>
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
      console.log(111111);
      console.log(result);
      this.result = result;
    },

    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        const triedFrontCamera = this.camera === "front";
        const triedRearCamera = this.camera === "rear";
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: Need camera access permisson";
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
.qr--choose {
  border: 1px solid #ddd;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
}
button {
  position: absolute;
  left: 10px;
  bottom: 10px;
}
.error {
  font-weight: bold;
  color: red;
}
</style>
