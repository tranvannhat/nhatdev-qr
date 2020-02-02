<template>
  <div class="qr-container">
    <!-- <p class="error">{{ error }}</p> -->
    <qrcode-capture
      class="qr--choose"
      @decode="onDecode"
      :multiple="false"
      :capture="false"
    />
    <b-input-group class="my-3" v-if="result.length > 0">
      <b-form-input v-model="result"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="onCopy(result)">Copy</b-button>
      </b-input-group-append>
    </b-input-group>
    <div class="detect-qr mb-3" v-if="detectQr.name">
      <p class="detect-title">AI Detect: QR WIFI</p>
      <p class="qr-element"><span>Name:</span>{{ detectQr.name }}</p>
      <p class="qr-element">
        <span>Password:</span>{{ detectQr.password
        }}<span class="copy" @click="onCopy(detectQr.password)">copy</span>
      </p>
      <p class="qr-element"><span>Type:</span>{{ detectQr.type }}</p>
    </div>
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

  computed: {
    detectQr() {
      if (
        this.result.indexOf("WIFI:") >= 0 &&
        this.result.indexOf("P:") >= 0 &&
        this.result.indexOf("S:") >= 0
      ) {
        // this qr wifi
        const arr = this.result.split(";");
        let name = arr[2].split(":")[1];
        let password = arr[1].split(":")[1];
        let type = arr[0].split(":")[2];
        return {
          name,
          password,
          type
        };
      }
      return this.result;
    }
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
    },

    onCopy(val) {
      this.$copyText(val).then(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      );
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
button.btn-primary {
  position: absolute;
  left: 10px;
  top: 10px;
}
.error {
  font-weight: bold;
  color: red;
}
.detect-qr {
  background-color: #c3e6cb;
  padding: 15px;
  border-radius: 10px;
  text-align: left;
}
.detect-title {
  font-weight: 600;
}
.qr-element {
  display: block;
  margin-bottom: 5px;
}
.qr-element span {
  font-weight: 600;
  padding-right: 5px;
}
.copy {
  cursor: pointer;
  color: chocolate;
  padding-left: 5px;
}
</style>
