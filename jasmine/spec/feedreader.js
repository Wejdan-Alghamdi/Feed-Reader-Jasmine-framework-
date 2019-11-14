/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* 
         * This test loops through allFeeds object and check (expect) that every feed is 
         * have a defigned url by using toBeDefigned() method
         * and every feed url is not empty by using toBe() matcher
         */
        it('Each feed has a url ', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* 
         * This test loops through allFeeds object and check (expect) that every feed is 
         * have a defigned name by using toBeDefigned() method
         * and every feed name is not empty by using toBe() matcher
         */
        it('Each feed has a name ', function () {
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });


    /*  New test suite named "The menu" */

    describe('The Menu', function () {

        /*
         * This test ensures the menu element is hidden by default by
         * check if the body element has a class (menu-hidden) by 
         * using hasClass() method and return the value to the exist
         * variable then expect that the value of the exist variable will be true 
         */
        it('It hidden by default', function () {
            let exist = $('body').hasClass('menu-hidden');
            expect(exist).toBe(true);
        });

        /* 
         * In this test ,I called the click() function on the menu icon 
         * to simulate the click action.Then use hasClass() method 
         * and toBe() matcher to check the existance of (menu-hidden) class
         */

        it('It display when clicked & it hide when clicked again', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* New test suite named "Initial Entries" */

    describe('Initial Entries', function () {

        /* 
         * In this test we need to use beforEach and asynchronous done() function
         * we will call the loadFeed (asynchronous function) on the beforeEach method to ensure that 
         * the test will run after the function is completed In the spec I use a jQuery 
         * to reach the entries then expect that the entries length wont be 0
         */
        beforeEach(function (done) {

            loadFeed(0, done);
        });
        it('There is at least a single entry element within the feed container', function (done) {
            let entries = $(' .entry');
            console.log(entries.length);
            expect(entries.length).not.toBe(0);
            done();
        });
    });

    /* New test suite named "New Feed Selection" */

    describe('New Feed Selection', function () {

        /*
         * In this test we need to use beforEach and asynchronous done() function
         * we will call the loadFeed (asynchronous function) on the beforeEach method to ensure that 
         * the test will run after the function is completed (here i used two IDs 1,2 to get different feed)
         * then In the test expect that the feed with id 1 is different from feed2 by using toBe() matcher
         */
        let feed1;
        let feed2;
        beforeEach(function (done) {
            loadFeed(1, function () {
                feed1 = $('feed');
                loadFeed(2, function () {
                    feed2 = $('feed');
                    done();
                });
            });
        });
        it('When a new feed is loaded, The content actually changes', function (done) {
            expect(feed1).not.toBe(feed2);
            done();
        });

    });
}());
