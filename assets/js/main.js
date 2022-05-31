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
                for (var i = 0; i < menuItems.length; i++) {
                    menuItems[i].setAttribute('style', `height: ${this.clientHeight}px`);
                }
                if (menuItemChildren) {
                    if(this.clientHeight < menuItemChildren.clientHeight){
                        this.setAttribute('style', `height: ${this.clientHeight + menuItemChildren.clientHeight}px`);
                    }
                    if (this.clientHeight > 30) {
                        for (var i = 0; i < menuItems.length; i++) {
                            menuItems[i].setAttribute('style', `height: 30px`);
                        }
                    }
                }else{
                    window.location.href = '../../../../index.html';
                }
            })
        }
        // click đóng mở 
        function closeMenu(){
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
                        easing: "ease-out",
                        endDelay: 100,
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
        }
        menuBgBlack.addEventListener('click', closeMenu)
        menuClose.addEventListener('click', closeMenu)
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

// handle calendar
(function () {
    if (document.querySelector('.calendar-wrap')) {
        const date = new Date();
        let monthDayss;
        let newMonthDays;
        const checkInOut = document.querySelector('#check-in-out');
        const calendar = document.querySelector('.calendar-wrap');
        checkInOut.addEventListener('click', function () {
            calendar.classList.add('active');
        })
        let count = 0;
        const renderCalendar = () => {
            date.setDate(1);
            const monthDays = document.querySelector('.calendar__current-month .days');
            const nextMonthDays = document.querySelector('.calendar__next-month .days');
            const lastDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            const lastDayNextMonth = new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate();
            const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
            const firstDayIndex = date.getDay();
            const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ];
            document.querySelector('.calendar__current-month .date h6').innerText = `${months[date.getMonth()]} ${date.getFullYear()}`;
            document.querySelector('.calendar__next-month .date h6').innerText = `${months[date.getMonth() + 1]} ${date.getFullYear()}`;

            let currentDays = '';
            let nextDaysMonth = '';
            for (let i = firstDayIndex; i > 0; i--) {
                currentDays += `<p></p>`;
            }
            for (let i = 1; i <= lastDays; i++) {
                if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                    currentDays += `<p class='today'>${i}</p>`;
                } else {
                    currentDays += `<p>${i}</p>`
                }
            }
            monthDays.innerHTML = currentDays;
            for (let i = lastDayIndex; i > 0; i--) {
                nextDaysMonth += `<p></p>`;
            }
            for (let i = 1; i <= lastDayNextMonth; i++) {
                nextDaysMonth += `<p>${i}</p>`;
            }
            nextMonthDays.innerHTML = nextDaysMonth;
            monthDayss = Array.from(document.querySelectorAll('.calendar-wrap .days > p'));
            newMonthDays = monthDayss.filter(value => {
                return value.innerText !== '';
            })
            for(let i=0; i<newMonthDays.length; i++){
                newMonthDays[i].addEventListener('click', function(){
                    console.log(this)
                    let dateElement = this.parentElement.parentElement.querySelector('.month h6');
                    if(count === 0){
                        document.querySelector('#check-in-out').value = `${this.innerText} ${dateElement.innerText} - `;
                        let dayActive = document.querySelectorAll('.calendar-wrap .days .active');
                        if (dayActive) {
                            for (let i = 0; i < dayActive.length; i++) {
                                dayActive[i].classList.remove('active');
                            }
                        }
                        this.classList.add('active');
                        count++;
                    }else if(count === 1){
                        document.querySelector('#check-in-out').value = `${document.querySelector('#check-in-out').value} ${this.innerText} ${dateElement.innerText}`;
                        calendar.classList.remove('active');
                        this.classList.add('active');
                        count = 0;
                    }
                })
            }
        }
        window.addEventListener('resize', function () {
            handleRenderCalendar();
        })
        function handleRenderCalendar() {
            if (document.documentElement.offsetWidth <= 768) {
                document.querySelector('.calendar-wrap .prev').addEventListener('click', function () {
                    if (date.getMonth() > new Date().getMonth() || date.getFullYear() > new Date().getFullYear()) {
                        date.setMonth(date.getMonth() - 1);
                        renderCalendar();
                    }
                })
                document.querySelector('.calendar-wrap .next-mobile').addEventListener('click', function () {
                    document.querySelector('.calendar-wrap .prev').classList.add('active');
                    date.setMonth(date.getMonth() + 1);
                    renderCalendar();
                })
            } else {
                document.querySelector('.calendar-wrap .prev').addEventListener('click', function () {
                    if (date.getMonth() > new Date().getMonth() || date.getFullYear() > new Date().getFullYear()) {
                        date.setMonth(date.getMonth() - 2);
                        renderCalendar();
                    }
                })
                document.querySelector('.calendar-wrap .next').addEventListener('click', function () {
                    document.querySelector('.calendar-wrap .prev').classList.add('active');
                    date.setMonth(date.getMonth() + 2);
                    renderCalendar();
                })
            }
        }
        handleRenderCalendar();
        renderCalendar();
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
        roomItem.addEventListener('mouseleave', function(){
            roomItem.addEventListener('mouseenter', function(){
                document.documentElement.removeEventListener('click', handleClose)
            })
            function handleClose(){
                roomItem.classList.remove('active');
                document.documentElement.removeEventListener('click', handleClose)
            }
            document.documentElement.addEventListener('click', handleClose)
        })
    }
})();

// room list handle image
(function () {
    let contentThumb = document.querySelectorAll('.content__room-thumbnails-link');
    const contentThumbImg = document.querySelectorAll('.content__room-thumbnails-link img');
    const contentThumbBtnWrap = document.querySelectorAll('.content__room-btn');
    let contentThumbBtn = [];
    let contentBtn;
    let contentBtnParent;
    if (contentThumb[0]) {
        let width = contentThumbImg[0].clientWidth;
        window.addEventListener('resize', function(){
            width = contentThumbImg[0].clientWidth;
        })
        for (var i = 0; i < contentThumb.length; i++) {
            contentThumbBtnWrap[i].innerHTML = [...contentThumb[i].querySelectorAll('.content__room-thumbnails-link img')].map(() => {
                return `<i class="fas fa-circle"></i>`;
            }).join('');
        }
        for (var i = 0; i < contentThumbBtnWrap.length; i++) {
            contentThumbBtnWrap[i].querySelector('.content__room-btn i').classList.add('active');
            contentThumbBtn.push(contentThumbBtnWrap[i].querySelectorAll('.content__room-btn i'));
        }
        for (var i = 0; i < contentThumbBtn.length; i++) {
            contentBtn = [...contentThumbBtn[i]];
            contentBtn.forEach((element, index) => {
                element.addEventListener('click', function () {
                    contentBtnParent = this.parentElement;
                    contentBtnParent.querySelector('.content__room-btn i.active').classList.remove('active');
                    contentBtn = contentBtnParent.querySelectorAll('i');
                    this.classList.add('active');
                    contentThumb = contentBtnParent.parentElement.querySelector('.content__room-thumbnails-link');
                    contentThumb.style = `transform: translateX(-${width * index}px)`;
                })
            });
        }
    }
})();

// room list handle animation scroll
(function(){
    const roomWrap = document.querySelectorAll('.content__room-wrap');
    let count = 0;
    if(roomWrap[0]){
        for(var i=0; i<roomWrap.length; i++){
            roomWrap[i].style.opacity = '0';
        }
        function handleScroll(){
            if(document.documentElement.scrollTop >= roomWrap[count].offsetTop-600){
                roomWrap[count].animate([
                    {
                        transform: 'translateY(200px)',
                        opacity: 0
                    },
                    {
                        transform: 'translateY(0%)',
                        opacity: 1
                    }
                ],{
                    duration: 2000
                })
                roomWrap[count].style.opacity = '1';
                count++;
                if(count >= roomWrap.length){
                    window.removeEventListener('scroll', handleScroll)
                }
            }
        }
        window.addEventListener('scroll', handleScroll)
    }
})();

// room detail handle booking
(function () {
    const roomDetailForm = document.querySelector('.room__detail-form-room');
    const roomDetailFormWrap = document.querySelector('.room__detail-form-room-wrap');
    const roomPersonForm = document.querySelector('.room__detail-form-person');
    const roomPersonFormWrap = document.querySelector('.room__detail-form-person-wrap');
    const minusBtn = document.querySelectorAll('.room__detail-form-wrap-number-minus');
    const plusBtn = document.querySelectorAll('.room__detail-form-wrap-number-plus');
    const roomNumberView = document.querySelector('.room__detail-form-room-number span');
    const personNumberView = document.querySelector('.room__detail-form-person-number span');
    const roomNumber = document.querySelector('.room__detail-form-room-wrap-number p');
    const adultNumber = document.querySelector('.adult .room__detail-form-person-wrap-number p');
    const childrenNumber = document.querySelector('.children .room__detail-form-person-wrap-number p');
    let room = 1;
    let adult = 1;
    let children = 0;
    if (document.querySelector('.room__detail-form')) {
        roomDetailForm.addEventListener('click', function () {
            roomDetailFormWrap.style.display = 'flex';
        })

        roomPersonForm.addEventListener('click', function () {
            roomPersonFormWrap.style.display = 'block';
        })

        for (var i = 0; i < plusBtn.length; i++) {
            plusBtn[i].addEventListener('click', function () {
                if (this === plusBtn[0]) {
                    room++;
                    if (room <= 1) {
                        room = 1;
                    }
                    roomNumber.innerText = `${room}`;
                    roomNumberView.innerText = room <= 1 ? `${room} room` : `${room} rooms`;
                } else if (this === plusBtn[1]) {
                    adult++;
                    if (adult <= 1) {
                        adult = 1;
                    }
                    adultNumber.innerText = `${adult}`;
                    personNumberView.innerText = `${adult} Adult , ${children} Children`;
                } else if (this === plusBtn[2]) {
                    children++;
                    if (children < 0) {
                        children = 0;
                    }
                    childrenNumber.innerText = `${children}`;
                    personNumberView.innerText = `${adult} Adult , ${children} Children`;
                }
            })
        }
        for (var i = 0; i < minusBtn.length; i++) {
            minusBtn[i].addEventListener('click', function () {
                if (this === minusBtn[0]) {
                    room--;
                    if (room <= 1) {
                        room = 1;
                    }
                    roomNumber.innerText = `${room}`;
                    roomNumberView.innerText = room <= 1 ? `${room} room` : `${room} rooms`;
                } else if (this === minusBtn[1]) {
                    adult--;
                    if (adult <= 1) {
                        adult = 1;
                    }
                    adultNumber.innerText = `${adult}`;
                    personNumberView.innerText = `${adult} Adult , ${children} Children`;
                } else if (this === minusBtn[2]) {
                    children--;
                    if (children < 0) {
                        children = 0;
                    }
                    childrenNumber.innerText = `${children}`;
                    personNumberView.innerText = `${adult} Adult , ${children} Children`;
                }
            })
        }
        roomDetailFormWrap.addEventListener('mouseleave', function () {
            roomDetailFormWrap.addEventListener('mouseenter', function(){
                window.removeEventListener('click', handleClose);
            })
            function handleClose() {
                roomDetailFormWrap.style.display = 'none';
                window.removeEventListener('click', handleClose);
            }
            window.addEventListener('click', handleClose);
        })

        roomPersonFormWrap.addEventListener('mouseleave', function(){
            roomPersonFormWrap.addEventListener('mouseenter', function(){
                window.removeEventListener('click', handleClose);
            })
            function handleClose() {
                roomPersonFormWrap.style.display = 'none';
                window.removeEventListener('click', handleClose);
            }
            window.addEventListener('click', handleClose);
        })
    }
})();

// scroll blog list
(function () {
    const blogListWrap = document.querySelectorAll('.blog__list-wrap');
    let count = 1;
    if (blogListWrap[1]) {
        for (var i = 1; i < blogListWrap.length; i++) {
            blogListWrap[i].style.opacity = '0';
        }
        function handleScroll() {
            if (document.documentElement.scrollTop >= blogListWrap[count].offsetTop - 500) {
                blogListWrap[count].animate([
                    {
                        transform: 'translateY(200px)',
                        opacity: 0
                    },
                    {
                        transform: 'translateY(0%)',
                        opacity: 1
                    }
                ], {
                    duration: 2000
                })
                blogListWrap[count].style.opacity = '1';
                count++;
                if (count >= blogListWrap.length) {
                    window.removeEventListener('scroll', handleScroll);
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
    }
})();

// handle about info number
(function () {
    const aboutInfoItem = document.querySelectorAll('.about__info-item p');
    let roomCount = 0;
    let staffsCount = 0;
    let locationsCount = 0;
    if (aboutInfoItem[0]) {
        const roomNum = new Number(aboutInfoItem[0].innerText);
        const staffsNum = new Number(aboutInfoItem[1].innerText);
        const locationsNum = new Number(aboutInfoItem[2].innerText);
        for (var i = 0; i < aboutInfoItem.length; i++) {
            aboutInfoItem[i].innerText = '';
        }
        function handleScroll() {
            if (document.documentElement.scrollTop >= aboutInfoItem[0].offsetTop - 500) {
                const setRoom = setInterval(function () {
                    aboutInfoItem[0].innerText = roomCount;
                    roomCount++;
                    if (roomCount > roomNum) {
                        clearInterval(setRoom);
                    }
                }, 2000 / roomNum);
                const setStaffs = setInterval(function () {
                    aboutInfoItem[1].innerText = staffsCount;
                    staffsCount++;
                    if (staffsCount > staffsNum) {
                        clearInterval(setStaffs);
                    }
                }, 2000 / staffsNum);
                const setLocations = setInterval(function () {
                    aboutInfoItem[2].innerText = locationsCount;
                    locationsCount++;
                    if (locationsCount > locationsNum) {
                        clearInterval(setLocations);
                    }
                }, 1000 / locationsNum)
                window.removeEventListener('scroll', handleScroll);
            }
        }
        window.addEventListener('scroll', handleScroll);
    }
})();

// handle click img out story
(function () {
    const storyImgBtn = document.querySelectorAll('.out__story-img-btn');
    let storyImgs = [];
    let imgs = [];
    let iconBtn = [];
    if (storyImgBtn[0]) {
        let width = document.querySelector('.out__story-img img').clientWidth;
        window.addEventListener('resize', function () {
            width = document.querySelector('.out__story-img img').clientWidth;
        })
        for (let i = 0; i < storyImgBtn.length; i++) {
            storyImgs.push(storyImgBtn[i].parentElement);
        }
        for (let i = 0; i < storyImgs.length; i++) {
            imgs.push(Array.from(storyImgs[i].querySelectorAll('.out__story-img img')));
        }
        for (let i = 0; i < imgs.length; i++) {
            storyImgBtn[i].innerHTML = imgs[i].map((value, index) => {
                if (imgs[i].length > 1) {
                    return `<i class="fas fa-circle ${index === 0 ? 'active' : ''}"></i>`;
                }
            }).join('');
        }
        for (let i = 0; i < storyImgBtn.length; i++) {
            iconBtn.push(Array.from(storyImgBtn[i].querySelectorAll('.out__story-img-btn i')));
        }
        for (let i = 0; i < iconBtn.length; i++) {
            iconBtn[i].forEach((element, index) => {
                element.addEventListener('click', function () {
                    element.parentElement.querySelector('.out__story-img-btn i.active').classList.remove('active');
                    element.classList.add('active');
                    imgs = element.parentElement.parentElement.querySelectorAll('.out__story-img img')
                    imgs[0].parentElement.classList.remove('active');
                    for (let i = 0; i < imgs.length; i++) {
                        imgs[i].style.opacity = 1;
                        setTimeout(function(){
                            imgs[i].style.transform = `translateX(-${width * index}px)`;
                        },100)
                    }
                })
            });
        }
    }
})();

// show services Spa
(function () {
    const spaServicesWrap = document.querySelectorAll('.spa__services-wrap-items');
    const spaServicesTitle = document.querySelectorAll('.spa__services-wrap-items h6');
    if (spaServicesWrap[0]) {
        let height = spaServicesTitle[0].clientHeight + 20;
        for (let i = 0; i < spaServicesWrap.length; i++) {
            spaServicesWrap[i].style.height = `${height}px`;
            spaServicesWrap[i].addEventListener('click', function () {
                for (let i = 0; i < spaServicesWrap.length; i++) {
                    spaServicesWrap[i].style.height = `${height}px`;
                }
                if (this.clientHeight <= height) {
                    this.style.height = `${height + this.querySelector('.spa__services-wrap-items p').clientHeight + 15}px`;
                } else {
                    this.style.height = `${height}px`;
                }
            })
        }
    }
})();

// handle services metting room
(function(){
    const roomMeetingWrap = document.querySelector('.room__meeting-desc-items');
    const roomMeetingItems = document.querySelectorAll('.room__meeting-desc-item');
    const roomMeetingBtn = document.querySelector('.room__meeting-desc-btn');
    if(roomMeetingWrap){
        let width = roomMeetingWrap.querySelector('.room__meeting-desc-item').clientWidth;
        let btnIndex = 0;
        let htmls = '';
        let clickBtns = roomMeetingBtn.querySelectorAll('i');
        if(document.documentElement.clientWidth >= 992){
            btnIndex = roomMeetingItems.length - 4;
        }else if(document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 992){
            btnIndex = roomMeetingItems.length - 3;
        }else if(document.documentElement.clientWidth < 768){
            btnIndex = roomMeetingItems.length - 1;
        }
        window.addEventListener('resize', function(){
            width = roomMeetingWrap.querySelector('.room__meeting-desc-item').clientWidth;
            htmls = '';
            if(document.documentElement.clientWidth >= 992){
                btnIndex = roomMeetingItems.length - 4;
            }else if(document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 992){
                btnIndex = roomMeetingItems.length - 3;
            }else if(document.documentElement.clientWidth < 768){
                btnIndex = roomMeetingItems.length - 1;
            }
            for(let i=0; i<=btnIndex; i++){
                htmls += `<i class="fas fa-circle ${i === 0 ? 'active' : ''}"></i>`;
            }
            roomMeetingBtn.innerHTML = htmls;
            clickBtns = roomMeetingBtn.querySelectorAll('i');
            clickBtns.forEach((element, index) => {
                element.addEventListener('click', function(){
                    roomMeetingBtn.querySelector('i.active').classList.remove('active');
                    element.classList.add('active');
                    roomMeetingWrap.style = `transform: translateX(-${width * index}px)`;
                })
            });
            roomMeetingWrap.style = `transform: translateX(-0px)`;
        })
        for(let i=0; i<=btnIndex; i++){
            htmls += `<i class="fas fa-circle ${i === 0 ? 'active' : ''}"></i>`;
        }
        roomMeetingBtn.innerHTML = htmls;
        clickBtns = roomMeetingBtn.querySelectorAll('i');
        clickBtns.forEach((element, index) => {
            element.addEventListener('click', function(){
                roomMeetingBtn.querySelector('i.active').classList.remove('active');
                element.classList.add('active');
                roomMeetingWrap.style = `transform: translateX(-${width * index}px)`;
            })
        });
    }
})();

// handle open Questions FAQ's
(function(){
    // code
    const questionItems = document.querySelectorAll('.faqs__questions-item');
    const questionTitles = document.querySelectorAll('.faqs__questions-item-title');
    if(questionItems[0]){
        let height = document.querySelector('.faqs__questions-item-title').clientHeight;
        window.addEventListener('resize', function(){
            height = document.querySelector('.faqs__questions-item-title').clientHeight;
            console.log(height)
        })
        for(let i=0; i<questionItems.length; i++){
            questionItems[i].style.height = `${height}px`;
        }
        for(let i=0; i<questionTitles.length; i++){
            questionTitles[i].addEventListener('click', function(){
                for(let i=0; i<questionItems.length; i++){
                    questionItems[i].style.height = `${height}px`;
                }
                if(document.querySelector('.faqs__questions-item-title.active')){
                    document.querySelector('.faqs__questions-item-title.active').classList.remove('active');
                }
                if(this.parentElement.clientHeight <= height){
                    this.classList.add('active');
                    this.parentElement.style.height = `${height + this.parentElement.querySelector('.faqs__questions-item p').clientHeight}px`;
                }else{
                    this.parentElement.style.height = `${height}px`;
                }
            })
        }
    }
})();

// handle scroll animation
(function(){
    function handleScroll(classElement){
        let index = 0;
        window.addEventListener('scroll', function(){
            if(classElement[0]){
                if(index < classElement.length && document.documentElement.scrollTop >= classElement[index].offsetTop - 600){
                    classElement[index].classList.add('active');
                    index++;
                }
            }
        })
    }
    handleScroll(document.querySelectorAll('.room__meeting-info-wrap'));
    handleScroll(document.querySelectorAll('.room__meeting-info-img'));
    handleScroll(document.querySelectorAll('.spa__services-img'));
    handleScroll(document.querySelectorAll('.spa__services-wrap'));
    handleScroll(document.querySelectorAll('.services__wrap'));
    handleScroll(document.querySelectorAll('.services__img'));
    handleScroll(document.querySelectorAll('.out__story-wrap'));
    handleScroll(document.querySelectorAll('.out__story-img'));
    handleScroll(document.querySelectorAll('.about__introduce-wrap'));
    handleScroll(document.querySelectorAll('.about__introduce-img-wrap'));
    handleScroll(document.querySelectorAll('.about__story-img-wrap'));
    handleScroll(document.querySelectorAll('.about__story-wrap'));
    handleScroll(document.querySelectorAll('.about__teams-wrap'));
    handleScroll(document.querySelectorAll('.room__meeting-floor-wrap'));
    handleScroll(document.querySelectorAll('.room__meeting-floor-img'));
    handleScroll(document.querySelectorAll('.experiences__wrap-img'));
    handleScroll(document.querySelectorAll('.experiences__wrap-text'));
    handleScroll(document.querySelectorAll('.contact__wrap-img'));
    handleScroll(document.querySelectorAll('.contact__form'));
})();