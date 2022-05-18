// handle menu
(function(){
    const menuItems = document.querySelectorAll('.menu__item');
    const menuClose = document.querySelector('.menu__close');
    const menuOpen = document.querySelector('.header__menu-left-btn')
    const menu = document.querySelector('#menu');
    const menuWrap = document.querySelector('.menu__wrap');
    const menuBgBlack = document.querySelector('.menu-bg-black');
    if(menu){
        // click hiển thị item
        for(var i=0; i<menuItems.length; i++){
            menuItems[i].addEventListener('click', function(){
                const menuItemChildren = this.querySelector('.menu__item-childrens');
                if(menuItemChildren){
                    for(var i=0; i<menuItems.length; i++){
                        menuItems[i].setAttribute('style', `height: ${this.clientHeight}px`);
                    }
                    this.setAttribute('style', `height: ${this.clientHeight + menuItemChildren.clientHeight}px`);
                }
            })
        }
        // click đóng mở 
        menuClose.addEventListener('click', function(){
            let myPromise = function(ms){
                return new Promise(function(resolve){
                    setTimeout(resolve, ms)
                })
            }

            myPromise()
                .then(() =>{
                    menuBgBlack.animate([
                        {
                            transform: 'translateX(0)'
                        },
                        {
                            transform: 'translateX(-100%)'
                        }
                    ],{
                        duration: 500,
                        easing: "ease-out"
                    });
                    setTimeout(function(){
                        menuBgBlack.style.opacity = 0;
                    },500)
                    return myPromise(500)
                })
                .then(() =>{
                    menuWrap.animate([
                        {
                            transform: 'translateX(0%)'
                        },
                        {
                            transform: 'translateX(-100%)'
                        }
                    ],{
                        duration: 1000,
                        easing: "ease-in"
                    })
                    setTimeout(function(){
                        menu.style.display = 'none';
                    }, 1000)
                })
        })
        menuOpen.addEventListener('click', function(){
            menu.style.display = 'flex';
            menuBgBlack.style.opacity = 0;
            menuWrap.animate([
                {
                    transform: 'translateX(-100%)'
                },
                {
                    transform: 'translateX(0)'
                }
            ],{
                duration: 500,
                easing: "ease-in"
            });
            setTimeout(function(){
                menuBgBlack.animate([
                    {
                        transform: 'translateX(-100%)'
                    },
                    {
                        transform: 'translateX(0)'
                    }
                ],{
                    duration: 1000,
                    easing: "ease-out"
                });
                menuBgBlack.style.opacity = 1;
            },500)
        })
    }
})();

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
    const prevBtnText = document.querySelector('.content__rooms-btn-prev p');
    const nextBtn = document.querySelector('.content__rooms-btn-next');
    const nextBtnText = document.querySelector('.content__rooms-btn-next p');
    const contentItems = document.querySelectorAll('.content__rooms-wrap-item');
    const contentItemsText = document.querySelectorAll('.content__rooms-wrap-desc-title a');
    let count = 0;
    if(contentItems[0]){
        contentItems[0].classList.add('active')
        contentItems[1].classList.add('right')
        contentItems[contentItems.length - 1].classList.add('left');
        prevBtnText.innerText = contentItemsText[contentItemsText.length - 1].innerText;
        nextBtnText.innerText = contentItemsText[1].innerText;
        nextBtn.addEventListener('click', function(){
            handleSlider(1)
        });
        prevBtn.addEventListener('click', function(){
            handleSlider(-1)
        });
        function handleSlider(condition){
            if(condition === 1){
                // next
                count++;
                if (count >= contentItems.length) {
                    count = 0;
                }
                document.querySelector('.content__rooms-wrap-item.active').classList.remove('active');
                document.querySelector('.content__rooms-wrap-item.left').classList.remove('left');
                document.querySelector('.content__rooms-wrap-item.right').classList.remove('right');
                contentItems[count].classList.add('active')
                contentItems[count + 1 >= contentItems.length ? 0 : count + 1].classList.add('right');
                contentItems[count - 1 < 0 ? contentItems.length - 1 : count - 1].classList.add('left');
                nextBtnText.innerText = contentItemsText[count + 1 >= contentItemsText.length ? 0 : count + 1].innerText;
                prevBtnText.innerText = contentItemsText[count - 1 < 0 ? contentItemsText.length - 1 : count - 1].innerText;
            }else if(condition === -1){
                // prev
                count--;
                if (count < 0) {
                    count = contentItems.length - 1;
                }
                document.querySelector('.content__rooms-wrap-item.active').classList.remove('active');
                document.querySelector('.content__rooms-wrap-item.left').classList.remove('left');
                document.querySelector('.content__rooms-wrap-item.right').classList.remove('right');
                contentItems[count].classList.add('active')
                contentItems[count + 1 >= contentItems.length ? 0 : count + 1].classList.add('right');
                contentItems[count - 1 < 0 ? contentItems.length - 1 : count - 1].classList.add('left');
                nextBtnText.innerText = contentItemsText[count + 1 >= contentItemsText.length ? 0 : count + 1].innerText;
                prevBtnText.innerText = contentItemsText[count - 1 < 0 ? contentItemsText.length - 1 : count - 1].innerText;
            }
        }
        if(document.documentElement.clientWidth <= 992){
            contentItems[0].classList.remove('active');
            contentItems[1].classList.remove('right');
            contentItems[contentItems.length - 1].classList.remove('left');
        }
        window.addEventListener('resize', function(){
            if(document.documentElement.clientWidth <= 992){
                contentItems[0].classList.remove('active');
                contentItems[1].classList.remove('right');
                contentItems[contentItems.length - 1].classList.remove('left');
            }else{
                contentItems[0].classList.add('active');
                contentItems[1].classList.add('right');
                contentItems[contentItems.length - 1].classList.add('left');
            }
        })
    }
})();

// hover play bg video
(function(){
    const bgVideos = document.querySelectorAll('.content__play-video');
    const playWraps = document.querySelectorAll('.content__play-full-wrap');
    if(playWraps[0] && bgVideos[0]){
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