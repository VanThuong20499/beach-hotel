// play video
(function(){
    const video = document.querySelector('.content__video-video');
    const videoIcon = document.querySelector('.content__video-play');
    const playVideo = document.querySelector('.content__video-play-icon');
    const pauseVideo = document.querySelector('.content__video-pause-icon');
    const videoTitle = document.querySelector('.content__video-title');
    if(video){
        playVideo.addEventListener('click', function(){
            videoIcon.classList.add('active');
            videoTitle.style.transform = 'translateY(50%)';
            videoTitle.style.opacity = '0';
            video.play();
            video.loop = true;
        })
        pauseVideo.addEventListener('click', function(){
            videoIcon.classList.remove('active');
            videoTitle.style.transform = 'translateY(0%)';
            videoTitle.style.opacity = '1';
            video.pause()
        })
    }
})();

// slider rooms suites
(function(){
    const prevBtn = document.querySelector('.content__rooms-btn-prev');
    const nextBtn = document.querySelector('.content__rooms-btn-next');
    const contentItems = document.querySelectorAll('.content__rooms-wrap-item');
    const wrapItem = document.querySelector('.content__rooms-wrap-items');
    let myItems = [];
    let width = contentItems[0].clientWidth;
    let translateX = 0;
    let count = 0;
    if(contentItems){
        for(var i=0; i<contentItems.length; i++){
            myItems.push(contentItems[i]);
        }
        nextBtn.addEventListener('click', function(){
            handleSlider(1)
        });
        prevBtn.addEventListener('click', function(){
            handleSlider(-1)
        });
        function handleSlider(condition){
            if(condition === 1){
                // next
                translateX = translateX - width;
                wrapItem.style = `transform: translateX(${translateX}px);`;
            }else if(condition === -1){
                // prev
                translateX = translateX + width;
                wrapItem.style = `transform: translateX(${translateX}px);`;
            }
        }
    }
})();

// hover play bg video
(function(){
    const bgVideos = document.querySelectorAll('.content__play-video');
    const playWraps = document.querySelectorAll('.content__play-full-wrap');
    if(playWraps && bgVideos){
        for(var i=0; i<playWraps.length; i++){
            let _this = bgVideos[i];
            playWraps[i].addEventListener('mouseenter', function(){
                _this.play();
                _this.loop = true;
            })
            playWraps[i].addEventListener('mouseleave', function(){
                _this.pause();
            })
        }
    }
})();

// booking
(function(){
    const roomForm = document.querySelector('.content__booking-form-rooms');
    const roomItem = document.querySelector('.content__booking-form-rooms-items');
    const roomInput = document.querySelector('#content__booking-rooms');
    const adultsInput = document.querySelector('#content__booking-adults');
    const childrenInput = document.querySelector('#content__booking-childrens');
    const plusBtns = document.querySelectorAll('.content__booking-form-plus');
    const reductionBtns = document.querySelectorAll('.content__booking-form-reduction');
    if(roomForm){
        let rooms = roomInput.value;
        let adults = adultsInput.value;
        let childrens = childrenInput.value;
        for(var i=0; i<plusBtns.length; i++){
            plusBtns[i].addEventListener('click', function(){
                handleFormRoom(1, this);
            })
        }
        for(var i=0; i<reductionBtns.length; i++){
            reductionBtns[i].addEventListener('click', function(){
                handleFormRoom(-1, this);
            })
        }
        function handleFormRoom(value, _this){
            if(value === 1){
                // tang
                if(_this === plusBtns[0]){
                    rooms = roomInput.value;
                    rooms++;
                    roomInput.value = rooms;
                    document.querySelector('.content__booking-form-rooms span').innerText = `${rooms} Room , ${adults} Adult , ${childrens} Children`;
                }else if(_this === plusBtns[1]){
                    adults = adultsInput.value;
                    adults++;
                    adultsInput.value = adults;
                    document.querySelector('.content__booking-form-rooms span').innerText = `${rooms} Room , ${adults} Adult , ${childrens} Children`;
                }else if(_this === plusBtns[2]){
                    childrens = childrenInput.value;
                    childrens++;
                    childrenInput.value = childrens;
                    document.querySelector('.content__booking-form-rooms span').innerText = `${rooms} Room , ${adults} Adult , ${childrens} Children`;
                }
            }else if(value === -1){
                // giam
                if(_this === reductionBtns[0]){
                    rooms = roomInput.value;
                    rooms--;
                    if(rooms <= 0){
                        rooms = 1;
                    }
                    roomInput.value = rooms;
                    document.querySelector('.content__booking-form-rooms span').innerText = `${rooms} Room , ${adults} Adult , ${childrens} Children`;
                }else if(_this === reductionBtns[1]){
                    adults = adultsInput.value;
                    adults--;
                    if(adults <= 0){
                        adults = 1;
                    }
                    adultsInput.value = adults;
                    document.querySelector('.content__booking-form-rooms span').innerText = `${rooms} Room , ${adults} Adult , ${childrens} Children`;
                }else if(_this === reductionBtns[2]){
                    childrens = childrenInput.value;
                    childrens--;
                    if(childrens <= 0){
                        childrens = 0;
                    }
                    childrenInput.value = childrens;
                    document.querySelector('.content__booking-form-rooms span').innerText = `${rooms} Room , ${adults} Adult , ${childrens} Children`;
                }
            }
        }
        function handleInputForm(){
            rooms = roomInput.value;
            adults = adultsInput.value;
            childrens = childrenInput.value;
            document.querySelector('.content__booking-form-rooms span').innerText = `${rooms} Room , ${adults} Adult , ${childrens} Children`;
        }
        roomInput.addEventListener('input', handleInputForm);
        adultsInput.addEventListener('input', handleInputForm);
        childrenInput.addEventListener('input', handleInputForm);
        roomForm.addEventListener('click', function(){
            roomItem.classList.add('active');
        })
        roomItem.addEventListener('mouseleave', function(event){
            function handleClose(){
                roomItem.classList.remove('active');
                document.documentElement.removeEventListener('click', handleClose)
            }
            document.documentElement.addEventListener('click', handleClose)
        })
    }
})();