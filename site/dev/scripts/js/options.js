      /* headroom options */
        var myElement = document.querySelector(".headroom--home");
                // construct an instance of Headroom, passing the element
        var headroom  = new Headroom(myElement,

            Headroom.options = {
                tolerance : {
                  up : 15,
                  down : 0
                },
                offset : 180,
                scroller: window,
                classes : {
                  pinned : 'headroom--pinned',
                  unpinned : 'headroom--unpinned',
                  top : 'headroom--top',
                  notTop : 'headroom--not-top',
                  initial : 'headroom'
                }
              });
                // initialise
        headroom.init();

        /* responsive nav options */

        var nav = responsiveNav(".navigation", { // Selector
        animate: true, // Boolean: Use CSS3 transitions, true or false
        transition: 284, // Integer: Speed of the transition, in milliseconds
        label: "", // String: Label for the navigation toggle
        insert: "", // String: Insert the toggle before or after the navigation
        customToggle: "trigger", // Selector: Specify the ID of a custom toggle
        closeOnNavClick: true, // Boolean: Close the navigation when one of the links are clicked
        openPos: "relative", // String: Position of the opened nav, relative or static
        navClass: "navigation", // String: Default CSS class. If changed, you need to edit the CSS too!
        navActiveClass: "js-nav-active", // String: Class that is added to <html> element when nav is active
            jsClass: "js", // String: 'JS enabled' class which is added to <html> element
                init: function(){}, // Function: Init callback
                open: function(){}, // Function: Open callback
                close: function(){} // Function: Close callback
                });

        /* smooth scroll options */

        smoothScroll.init({
                speed: 800, // Integer. How fast to complete the scroll in milliseconds
                easing: 'easeInOutCubic', // Easing pattern to use
                updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
                offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
                callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
                callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
                });

        /* waypoint options */

        var appearLeft = document.getElementsByClassName('about__text--left');
        for (var i = 0; i < appearLeft.length; i++) {
          new Waypoint({
            element: appearLeft[i],
            handler: function() {
            this.element.classList.add('waypoint-shown');
            this.destroy()
            },

          offset: "66%",

          })
        }

        var appearRight = document.getElementsByClassName('about__text--right');
        for (var i = 0; i < appearRight.length; i++) {
          new Waypoint({
            element: appearRight[i],
            handler: function() {
            this.element.classList.add('waypoint-shown');
            this.destroy()
            },

          offset: "66%",

          })
        }

        var skillCont = document.getElementsByClassName('skill__icon--container');

        for (var i = 0; i < skillCont.length; i++) {
          new Waypoint({
            element: skillCont[i],
            handler: function() {
            this.element.classList.add('waypoint-bounce');
            this.destroy()
            },

          offset: "70%",

          })
        }

        var skillCont = document.getElementsByClassName('btn--slice');

        for (var i = 0; i < skillCont.length; i++) {
          new Waypoint({
            element: skillCont[i],
            handler: function() {
            this.element.classList.add('btn--fill');
            this.destroy()
            },

          offset: "78%",

          })
        }
