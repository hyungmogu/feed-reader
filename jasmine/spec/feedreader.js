/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            // means contents in allFeeds shouldn't be empty
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('has no empty URL in allFeeds', function() {
            allFeeds.forEach(function(item, index){
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toBe(0);
            });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has no empty name in allFeeds', function(){
            allFeeds.forEach(function(item, index){
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toBe(0);
            });
         });

    });

    /* TODO: Write a new test suite named "The menu" */
    describe("The menu", function(){
         var self = this;

         beforeEach(function(done){
            self.regex = /\((.+)\)/g;
            $(".menu-icon-link").trigger("click");
            setTimeout(function(){
                done();
            }, 200);

         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
       it("changes visibility when menu icon is clicked", function(done){

            // TODO: How to hide menu
            // when the menu is shown, the class `menu-hidden` must be removed from <body>
            var valueOfTransform3dAfterClick =  $(".slide-menu").css("transform");
            var shiftFromScreenInStrAfterClick = (((self.regex.exec(valueOfTransform3dAfterClick))[1]).split(","))[4];
            var shiftFromScreenAfterClick = parseInt(shiftFromScreenInStrAfterClick);
            var classNameForBodyAfterClick = $("body").attr("class");

            expect(classNameForBodyAfterClick).not.toBe("menu-hidden");
            expect(shiftFromScreenAfterClick).toBe(0);
            done();
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        // when the menu is hidden, the class 'menu-hidden' must be attached to <body>
        // when the menu is hidden, div.slide-menu is shifted off from the screen by 12em
        it("keeps menu hidden by default",function(done){
            // TODO: find out how to extract the value of a class property using JQuery
            var valueOfTransform3d =  $(".slide-menu").css("transform");
            var shiftFromScreenInStr = (((self.regex.exec(valueOfTransform3d))[1]).split(","))[4];
            var shiftFromScreen = parseInt(shiftFromScreenInStr);
            var classNameForBody = $("body").attr("class");

            expect(classNameForBody).toBe("menu-hidden");
            expect(shiftFromScreen).toBeLessThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe("Initial Entries", function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         beforeEach(function(done){
            loadFeed(0,function(){
                done();
            })
         });

         it("has at least a single .entry element within the .feed container", function(done){
            var feedContainer = $(".feed");
            expect(feedContainer.length).toBeGreaterThan(0);
            done();
         });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var oldTitle;
         var oldEntryTitle;

         beforeEach(function(done){
            oldTitle = $(".header-title").text();
            oldEntryTitle = $(".feed a:first-child h2").text();
            loadFeed(1, function(){
                done();
            });
         });

         // when new feed is loaded by loadFeed function, .header-title is changed
         // when new feed is loaded by loadFeed function, the title and the content of the first entry are changed
         it ("changes when new feed is loaded by loadFeed function", function(done){
            var newTitle = $(".header-title").text();
            var newEntryTitle = $(".feed a:first-child h2").text();

            expect(newTitle).not.toBe(oldTitle);
            expect(newEntryTitle).not.toBe(oldEntryTitle);
            done();
         });

    });

}());
