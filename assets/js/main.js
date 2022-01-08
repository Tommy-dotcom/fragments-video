$(document).ready(function() {
	const manager = new VideoManager();
	manager.init();
});

function VideoManager() {
	this.cellNumbers = 260;
	this.selectors = {
		garden: '#garden',
		aCell: '.cell'
	}
	this.videoZIndex = 1;
	this.videoCurrentTime = 0;

	this.init = () => {
		this.createVideoDom();
		this.peuplateGrid();
		this.listenCellHover();
	}

	/**
	* Create a video DOM element
	* Autoplay policy by Google : 
	* https://developer.chrome.com/blog/autoplay/
	**/
	this.createVideoDom = () => {
		var videoDom = document.createElement('video');
		$(videoDom).attr('src', 'assets/video/video.mp4');
		$(videoDom).prop('muted', true);
		$(videoDom).prop('autoplay', true);
        videoDom.pause();
	}

	/**
	* Create Cells in the grid, based on cellNumbers
	*/ 
	this.peuplateGrid = () => {
		const self = this;
		let content = "";

		for (let i = 1;i < self.cellNumbers; i++) {
			content += `<div class='cell' style='align-self:end; text-align:${self.getCellAlignment()};' id='div${i}'></div>`;
		}

		$(self.selectors.garden).html(content);
	}

	/**
	* Cell Hover Listener
	* simple algorithm explanation : 
	*    - if video already in cell, we trigger playing
	*    - else we create a video that autoplay at currentVideoTime value and we increment currentVideoTime of 10s 
	*/
	this.listenCellHover = () => {
		const self = this;
		let domElement;

		$(self.selectors.aCell).mouseenter(function() {
			const id = $(this).attr('id');
			let element = $(this);
			domElement = document.getElementById(id);
			
			if (domElement.firstChild) {
                var video = domElement.querySelector('video');
                video.play();
			} else {
				let video = `
					<video src='assets/video/video.mp4' muted autoplay
						style='width:${self.getRandomSize()}%;opacity:0;z-index:${self.videoZIndex}'
						id='video${id}'
					>
					</video>
				`;
				self.videoZIndex++;
				$(this).html(video);

                document.getElementById(`video${id}`).currentTime = self.videoCurrentTime;
                self.videoCurrentTime += 10;

                $(`#video${id}`).animate({
                    opacity: 1
                }, 500);
			}
		});

        $(self.selectors.aCell).mouseleave(function() {
            var video = domElement.querySelector('video');
            video.pause();
            self.videoCurrentTime = video.currentTime;
        });
	}

	/**
	* Get a random size int between three values
	* - 30
	* - 60
	* - 100
	**/
	this.getRandomSize = () => {
		const rand = Math.abs(Math.random());

		return rand > 0.4 ? (rand > 0.8 ? 100 : 60) : 30;
	}

	/**
	* Get a random alignement between three values
	* - center
	* - left
	* - right
	**/
	this.getCellAlignment = () => {
		const rand = Math.abs(Math.random());

		return rand > 0.33 ? (rand > 0.66 ? 'left' : 'right') : 'center';
	}
}