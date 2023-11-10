class Slider {
    constructor(containerId, contentId, prevBtnId, nextBtnId, dotsContainerId) {
      this.container = document.getElementById(containerId);
      this.content = document.getElementById(contentId);
      this.prevBtn = document.getElementById(prevBtnId);
      this.nextBtn = document.getElementById(nextBtnId);
      this.dotsContainer = document.getElementById(dotsContainerId);
  
      this.xDown = null;
      this.yDown = null;
      this.touchThreshold = 50; // Kaydırma eşiği değerii
  
      this.content.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
      this.content.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
      this.content.addEventListener('touchend', this.handleTouchEnd.bind(this), false);
  
      this.currentIndex = 0;
      this.imageCount = this.content.children.length;
      
  
      this.prevBtn.addEventListener('click', () => this.showSlide(-1));
      this.nextBtn.addEventListener('click', () => this.showSlide(1));
      this.checkInitialState();
      this.createDots();
      this.activateDot(this.currentIndex); 
  
      this.prevBtn.disabled = true;
      this.prevBtn.classList.toggle('button-disabled', this.prevBtn.disabled);
  
    }
  
    checkInitialState() {
      // Eğer sadece bir öğe varsa, kaydırmaya ve navigasyon butonlarına gerek yok
      if (this.imageCount <= 1) {
        this.prevBtn.style.display = 'none';
        this.nextBtn.style.display = 'none';
        // Dot'ları gizlemek için dotsContainerId kullanılabilir:
        const dotsContainer = document.getElementById('dotsContainer');
        dotsContainer.style.display = 'none';
      }
    }
  
  
    showSlide(direction) {
      const nextIndex = this.currentIndex + direction;
  
      if (nextIndex >= 0 && nextIndex < this.imageCount) {
        // Eğer bir sonraki slayd varsa kaydır
        this.currentIndex = nextIndex;
      }
  
      const translateValue = -this.currentIndex * (this.content.offsetWidth + this.content.children[0].offsetLeft * 2);
  
      this.content.style.transform = `translateX(${translateValue}px)`;
  
      this.checkEnd();
      this.activateDot(this.currentIndex); // Aktif dot'ı güncelle
    }
  
    checkEnd() {
      this.prevBtn.disabled = this.currentIndex === 0;
      this.nextBtn.disabled = this.currentIndex === this.imageCount - 1;
      this.prevBtn.classList.toggle('button-disabled', this.prevBtn.disabled);
      this.nextBtn.classList.toggle('button-disabled', this.nextBtn.disabled);
    }
  
    createDots() {
      for (let i = 0; i < this.imageCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => this.showSlideToDot(i));
        this.dotsContainer.appendChild(dot);
      }
    }
  
    showSlideToDot(dotIndex) {
      const direction = dotIndex - this.currentIndex;
      this.showSlide(direction);
    }
  
    activateDot(dotIndex) {
      const dots = this.dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === dotIndex);
      });
    }
    handleTouchStart(evt) {
      this.xDown = evt.touches[0].clientX;
      this.yDown = evt.touches[0].clientY;
    }
  
    handleTouchMove(evt) {
      if (!this.xDown || !this.yDown) {
        return;
      }
  
      this.xUp = evt.touches[0].clientX;
      this.yUp = evt.touches[0].clientY;
  
      let xDiff = this.xDown - this.xUp;
      let yDiff = this.yDown - this.yUp;
  
      if (Math.abs(xDiff) + Math.abs(yDiff) > this.touchThreshold) {
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0) {
            this.showSlide(1); // Sağa kaydırma
          } else {
            this.showSlide(-1); // Sola kaydırma
          }
        }
        this.xDown = null;
        this.yDown = null;
      }
    }
  
    handleTouchEnd() {
      this.xDown = null;
      this.yDown = null;
    }
  }
  
  const mySlider = new Slider('slider-container', 'slider-content', 'prevBtn', 'nextBtn', 'dotsContainer');
  