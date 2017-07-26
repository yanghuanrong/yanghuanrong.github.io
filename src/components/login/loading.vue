<template>
	<div class="loader">Loading...</div>
</template>

<style>
.loader {
	overflow: hidden;
  font-size: 10px;
  text-indent: -9999em;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ffffff;
  background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  animation: load3 .4s infinite linear;
  display: inline-block;
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #FFF;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
}
.loader:after {
  background: #f73668;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: '';
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>