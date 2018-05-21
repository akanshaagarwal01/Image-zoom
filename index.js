(function(){
	
	class originalImage {
		
		constructor(zf) {
			this._zoomFactor = zf;
			this._DOMElements = {};
			this.initializeDOMElements();
		}
		
		initializeDOMElements() {
			this._DOMElements = {
				origImgContainer : document.getElementById("origImgContainer"),
				origImg : document.getElementById("origImg"),
				zoomedImgContainer : document.getElementById("zoomedImgContainer"),
				zoomOverlay : document.getElementById("zoomOverlay"),
				origImgWidth : parseInt(getComputedStyle(origImg).width),
				origImgHeight : parseInt(getComputedStyle(origImg).height)
			};
			zoomOverlay.style.width = this._DOMElements.origImgWidth/this._zoomFactor;
			zoomOverlay.style.height = this._DOMElements.origImgHeight/this._zoomFactor;
			zoomedImgContainer.style.width = this._DOMElements.origImgWidth;
			zoomedImgContainer.style.height = this._DOMElements.origImgHeight;
			origImg.addEventListener("mousemove",this.showZoomedImg.bind(this));
			origImgContainer.addEventListener("mouseleave",this.hideZoomedImg.bind(this));
		}
		
		calcOverlayCoords(mouseLeft,mouseTop) {
			let left, top;
			let width = parseInt(getComputedStyle(this._DOMElements.zoomOverlay).width) ;
			let height = parseInt(getComputedStyle(this._DOMElements.zoomOverlay).height) ;
			left = mouseLeft - width/2 - 10;
			top = mouseTop - height/2 - 10;
			if(left < 0)
				left = 0;
			else if(left > (this._DOMElements.origImgWidth - width))
				left = this._DOMElements.origImgWidth - width;
			if(top < 0)
				top = 0;
			else if(top > (this._DOMElements.origImgHeight - height))
				top = this._DOMElements.origImgHeight - height;
			return {left,top};
		}
		
		showOverlay({left,top}) {
			this._DOMElements.zoomOverlay.style.display = "block";
			this._DOMElements.zoomOverlay.style.left = left;
			this._DOMElements.zoomOverlay.style.top = top;
		}
		
		showZoomedImg(event) {
			let {left,top} = this.calcOverlayCoords(event.offsetX, event.offsetY);
			this.showOverlay({left,top});
			this._DOMElements.zoomedImgContainer.style.display = "block";
			this._DOMElements.zoomedImgContainer.style.backgroundImage = `url(${this._DOMElements.origImg.src})`;
			this._DOMElements.zoomedImgContainer.style.backgroundSize = `${this._DOMElements.origImgWidth * this._zoomFactor}px ${this._DOMElements.origImgHeight * this._zoomFactor}px` ;
			this._DOMElements.zoomedImgContainer.style.backgroundPosition = `${-(left * this._zoomFactor)}px ${-(top * this._zoomFactor)}px`
		}
		
		hideZoomedImg() {
			this._DOMElements.zoomOverlay.style.display = "none";
			this._DOMElements.zoomedImgContainer.style.display = "none";
		}
	}
	
	let obj = new originalImage(3);
	
})();