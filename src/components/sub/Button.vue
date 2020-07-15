<template>
<div class="Button">
  <a>
    <button type="button" name="button">
      <span v-text="title" :style="`fontSize:${size}px`"></span>
    </button>
  </a>
</div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {

    }
  },
  props: ["title", "size"]
};
</script>
<style media="screen">
.Button a {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Button a button {
  width: 95%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  background: #09f;
  border-radius: 44px;
}

.Button a button span {
  text-align: center;
  color: #fff;
  font-weight: 600;
}
</style>
