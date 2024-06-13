const galleriesData = [
            {
                id: 1,
                images: [
                    "./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_1.jpg",
                    "./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_2.jpg",
                    "./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_3.jpg",
                    "./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_4.jpg",
                    "./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_5.jpg",
                    "./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_6.jpg",
                    "./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_7.jpg",
                    "./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_7.jpg","./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_7.jpg",
                    

                    
                ]
            },
            {
                id: 2,
                images: [
                    "./public/images/projects/01_Spoonfed/Nitish-Jain_Spoonfed_1.jpg"
                ]
            },
            {
                id: 3,
                images: [
                    "./imagesss/Nitish-Jain_Spoonfed_1.jpg"
                ]
            },
            {
                id: 4,
                images: [
                    "./imagesss/Nitish-Jain_Spoonfed_1.jpg"
                ]
            },
            {
                id: 5,
                images: [
                    "./imagesss/Nitish-Jain_Spoonfed_1.jpg"
                ]
            }
        ];

        galleriesData.forEach(galleryData => {
            const section = document.getElementById(`gallery${galleryData.id}`);
            section.innerHTML = `
            
                <div class="image_section gallery">
                    ${galleryData.images.map(src => `<a href="${src}"><img src="${src}" alt=""></a>`).join('')}
                </div>
                <div class="controls">
                    <div class="indicators" id="indicators${galleryData.id}"></div>
                    <div>
                    <button class="prev" data-gallery="${galleryData.id}"><i class="ri-arrow-left-s-line"></i></button>
                    <button class="next" data-gallery="${galleryData.id}"><i class="ri-arrow-right-s-line"></i></button>
                    </div>
                </div>
                
            `;

            lightGallery(section.querySelector('.image_section'));

            const imageSection = section.querySelector('.image_section');
            const indicators = section.querySelector(`#indicators${galleryData.id}`);
            const images = imageSection.getElementsByTagName('img');
            let currentIndex = 0;

            function updateIndicators() {
                indicators.innerHTML = '';
                for (let j = 0; j < images.length; j++) {
                    const indicator = document.createElement('div');
                    if (j === currentIndex) {
                        indicator.classList.add('indicate');
                    }
                    indicator.addEventListener('click', () => {
                        currentIndex = j;
                        updateGallery();
                    });
                    indicators.appendChild(indicator);
                }
            }

            function updateGallery() {
                const offset = currentIndex * (images[0].clientWidth + 10);
                imageSection.scrollTo({
                    left: offset,
                    behavior: 'smooth'
                });
                updateIndicators();
            }

            function navigate(direction) {
                if (direction === 'prev') {
                    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
                } else {
                    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
                }
                updateGallery();
            }

            section.querySelectorAll(`[data-gallery="${galleryData.id}"]`).forEach(button => {
                button.addEventListener('click', () => navigate(button.classList.contains('prev') ? 'prev' : 'next'));
            });

            window.addEventListener('resize', updateGallery);

            updateIndicators();
            updateGallery();
        })