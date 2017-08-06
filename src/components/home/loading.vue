<template>
	<div class="loader">Loading...</div>
</template>

<style>
	.loader {
		font-size: 10px;
		position: relative;
		width: 20px;
		height: 20px;
		overflow: hidden;
		text-indent: -9999em;
		border-top: 2px solid rgba(0, 0, 0, 0.2);
		border-right: 2px solid rgba(0, 0, 0, 0.2);
		border-bottom: 2px solid rgba(0, 0, 0, 0.2);
		border-left: 2px solid #ffffff;
		-webkit-animation: load 1.1s infinite linear;
		animation: load 1.1s infinite linear;
	}
	
	.loader,
	.loader:after {
		border-radius: 50%;
		width: 20px;
		height: 20px;
	}
	
	@-webkit-keyframes load {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	
	@keyframes load8 {
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