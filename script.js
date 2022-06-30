'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const container = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const content = document.querySelectorAll('.operations__content');
const sliders = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dots');
// hitting on signup to open the page and clicking on rest of the screen to close page
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//scroll down on clicking learn more
//
//
//jquery code...jsfiddle
// $('btn--scroll-to').click(function () {
//   $('html,body').animate(
//     {
//       scrollTop: $('#section--1').offset().top,
//     },
//     'slow'
//   );
// });

//js
//console.log(window.pageYOffset);
//console.log(section1.getBoundingClientRect());
btnScrollTo.addEventListener('click', function (e) {
  //const DistanceTo = section1.getBoundingClientRect();
  // const DistanceToLeft =
  //   window.pageXOffset + section1.getBoundingClientRect().left;
  // const DistanceToTop =
  //   window.pageYOffset + section1.getBoundingClientRect().top;

  // window.scrollTo({
  //   left: DistanceToLeft,
  //   top: DistanceToTop,
  //   behavior: 'smooth',
  // });
  //window page y off set is the amount of dist we've scrolled from top
  //getBoundingClientRect.top gives dist from top of page to ele... .left gives dist from left
  //we add the amount of dist we've come down the page or the dist from top to our learn more button(window y offset) and the amount of dist rem. to get to our target..i.e button to section
  //we can also do s1coords.left plus pagex offset
  //s1coords.riht plus y offset..
  //ie current position on web page plus req position

  //updated version
  section1.scrollIntoView({ behavior: 'smooth' });
});

//nav links page navigators
// document.querySelectorAll('.nav__link').forEach(function (ele) {
//   ele.addEventListener('click', function (e) {
//     e.preventDefault();
//     //we have href of all links set to their target sections
//     //but we want to add our own scrolling features
//     //so default navigating props are removed
//     //we can get the href value from ele and use it in our own navigation..so the href is not changed
//     const navTarget = this.getAttribute('href');
//     const section = document.querySelector(navTarget);
//     console.log(navTarget);
//     section.scrollIntoView({ behavior: 'smooth' });
//   });
// });

//we can use event propogation in case of more links to stop creation of more func copies for every ele..
//so we csn target parent containing all links and then use event propogation to target element clicked and apply event to it
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //we've targetted the entire nav link bar and when ever have a click on any of the elements in links bar we can get it by target
  e.preventDefault();
  const clicked = e.target;
  if (clicked.classList.contains('nav__link')) {
    const navTarget = clicked.getAttribute('href');
    const section = document.querySelector(navTarget);
    console.log(navTarget);
    section.scrollIntoView({ behavior: 'smooth' });
  }
});

//tab switch contents
//we have 3 buttons to switch between (with class tabs) and 3 contents for 3 tabs (with class tabcontent) and one container that contains all the buttons and content in it

container.addEventListener('click', function (e) {
  // let entered = e.target;
  // if (entered.classList.contains('spanEle')) {
  //   entered = entered.parentNode;
  // }
  //if clicked ele is span then we make it button again
  //we can also do that in a simple way by closest method
  const entered = e.target.closest('.operations__tab');
  if (!entered) return;
  //if we click outside of box and not on any of the buttons it returns null since event handler is active thriughout the container...so we add this condition
  tabs.forEach(function (e) {
    e.classList.remove('operations__tab--active');
  });
  //removing all current active classes 1st and then making the clicked class active
  entered.classList.add('operations__tab--active');

  const activeContent = document.querySelector(
    `.operations__content--${entered.dataset.tab}`
  );
  //to select appropriate class of clicked ele..every content box has a content--number class...and every button has a datatab class with the same number that is on its container..
  //data elements can be accessed by dataset..so dataset and prop name tab returns the number from button..so we get that number and attach it to the content box class to get the content of that button
  //now we need to make it active
  //remove all active content boxes at 1st
  content.forEach(function (e) {
    e.classList.remove('operations__content--active');
  });
  activeContent.classList.add('operations__content--active');

  console.log(entered);
});

//fade out nav elements when one ele is hovered or focused
const mouseFunc = function (e, opacity) {
  const click = e.target;
  if (click.classList.contains('nav__link')) {
    const sibling = click.closest('.nav').querySelectorAll('.nav__link');
    //go to nav so we can select all elements
    const logo = click.closest('.nav').querySelector('img');
    //we can roll back to nav and query select ele instead of adding children and parents
    sibling.forEach(function (e) {
      if (e !== click) e.style.opacity = opacity;
    });
    logo.style.opacity = opacity;
  }
};
//nav links have all the links and they are in nav links class..but we also want open account button and logo img to work on these..so common parent to all these is the entire nav bar..so choose it
nav.addEventListener('mouseover', function (e) {
  mouseFunc(e, 0.5);
});
//opp to mouseover is mouseout..we cant use mouseenter as it doesnt support bubbling in event propogation and the event cant be passed further to parents
//the opacity is set to 0.5 and remains 0.5 even afer mouse is away from ele..so
nav.addEventListener('mouseout', function (e) {
  mouseFunc(e, 1);
});
//copy entire mouse over code and set opacity to 1);
//we cant directly call mouse func in event listener since we need to pass the event e ...so we have to take the call back func 1st and then pass the e as arg

//STICKY NAVIGATION BAR
// const initialPos = section1.getBoundingClientRect().top;
// //get position of section 1 from top
// window.addEventListener('scroll', function (e) {
//   let scrolled = window.scrollY;
//   //distance we've scrolled from top
//   if (scrolled > initialPos) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
//   //when we scrolled past section 1...we make nav sticky and when we scroll back we make it normal again
// });
// //but scroll notices every slightest change/scroll ..so func is called too many times...we can instead use
//IntersectionObserverapi
const header = document.querySelector('.header');
const navPos = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  //this func is called along with observer var..we can check if the intersection is happening or not
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
  //if the intersection is false..then the nav bar is out of range...so we make it sticky..else we make it removed
};
const options = {
  root: null,
  //we dont need any other obj intersecting nav bar..we can make it sticky once it goes invisible in page
  //so root:null means when the obj is  visible or not  on viewport..null makes the intersection obj to viewport
  threshold: 0,
  //when obj is 0% visible wrt root..so when nav goes 100% out of page i,e we scroll down untill it is invisible
  rootMargin: `-${navPos}px`,
  //calc margin above threshold to start the sticky nav
  //we want to be visible navpos px above the threshold..i,e at the last 10% px of the 1st sec instead of start of 2nd sec...that 10% is calc. by nav pos and we mention it so we can see sticky nav right at end of 1st section
};
const observer = new IntersectionObserver(stickyNav, options);
observer.observe(header);

//REVEALING SECTIONS ON SCROLL
//intersection observer is best for it as we can know the % of section visible to viewport and decide to view section or hide it
//every section has hidden class to keep them hidden
const sections = document.querySelectorAll('.section');
//select all section to apply observer
const sectionView = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  //if it is not intersecting...dont do anything and return

  entry.target.classList.remove('section--hidden');
  //find section that is now visible and removing class from it
  //using destructuring we get values from entries obj
  observer.unobserve(entry.target);
  //since we are finished observing..we can now stop observing
};
const sectionOption = {
  root: null,
  //root set to viewport...ie section intersecting with viewport
  threshold: 0.15,
  //when section has atleast 15% space in viewport then make it visible
};
const sectionObserver = new IntersectionObserver(sectionView, sectionOption);
sections.forEach(function (e) {
  sectionObserver.observe(e);
  //enabling every section to observe
  e.classList.add('section--hidden');
  //sections hidden by default
});

//LOADING IMAGES ON SCROLL
//select imgs that only have datasrc
const allImgs = document.querySelectorAll('img[data-src');
const loadImg = function (entries, observer) {
  const [entry] = entries;
  //we have only one value in threshold..so only one is taken out..
  //when obj is returned it has intersecting property set to true when intersection occurs
  //just like above methods we only want to do something when intersecting..so
  if (!entry.isIntersecting) return;
  //if intersecting,..replace datasrc with src
  entry.target.src = entry.target.dataset.src;
  //we have the high resolution img at data src...so we apply it on our target
  //remove the lazy filter now
  //entry.target.classList.remove('lazy-img');
  //imgs load way too faster if we directly remove classes..we can check it with diferent loading speeds in network tab of dev  tools
  //so we use load event listener instead
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
    //now the lazy img is removed only once the img loads
  });
  imgObserver.unobserve(entry.target);
  //we cam unobserve now since all functionalities ar eadded
};

const imgOptions = {
  root: null,
  //null sets intersection point of our target to viewport
  threshold: 0,
  //threshold is percent of our target intersected with root...if we pass an arr..for when every value of arr becomes true...observer func is called and obj is returned
  rootMargin: '200px',
  //intersection happens 200px before we reach them..
};
const imgObserver = new IntersectionObserver(loadImg, imgOptions);
//new intersection observer obj is created...it accpets a call back func and a obj with preferred options
//just like event listener..we now need our target objects to be observed by the intersection observer and make changes ..
//just like add event listener we add observe on all target objs
//we have our intersection observer obj imgOserver..so we observe with it
allImgs.forEach(function (e) {
  imgObserver.observe(e);
});

//SLIDER
const s = document.querySelector('.slider');
s.style.overflow = 'visible';
//to place all slides beside each other
//to go to next slide..we use buttons
const leftBtn = document.querySelector('.slider__btn--left');
const rightBtn = document.querySelector('.slider__btn--right');
let currSlider = 0;
let maxSlides = sliders.length;

const slideView = function (current) {
  //select slider var declared on top
  sliders.forEach(function (s, i) {
    //s is current slider and i is index..check for each notes
    //we want 1st slider at 0..2nd at 100..then 300% etc..so we use transform and provide percentages in translate
    s.style.transform = `translate(${100 * (i - current)}%)`;
    //index*100 will make values go 0 100 200...so that can be our %
  });
};
slideView(0);
//starting with 1st slide

const nextSlide = function () {
  if (currSlider == maxSlides - 1) {
    currSlider = 0;
  } else {
    currSlider++;
  }
  slideView(currSlider);
  //if we reach max slide we again go to 0
};

const prevSlide = function () {
  if (currSlider === 0) {
    currSlider = maxSlides - 1;
  } else {
    currSlider--;
  }
  slideView(currSlider);
};
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);
//right and left arrow keys to move slides..
document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && prevSlide();
  //logical and..if all cond. are true it returns the last one
  e.key === 'ArrowRight' && nextSlide();
});
//creating dots
const createDots = function () {
  //we create them on the slides
  //we have ele sliders with all sliders
  sliders.forEach(function (s, i) {
    dots.insertAdjacentHTML(
      'beforeend'`<button class="dots__dot" data-slide="${i}"></button>`
    );
    //create dot buttons for every slide
  });
};
createDots();
